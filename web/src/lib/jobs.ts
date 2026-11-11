import { useCallback, useEffect, useRef, useState } from 'react';

export type JobStatus = 'waiting' | 'active' | 'done' | 'error';

export interface Job<I = unknown> {
  id: string;
  input: I;
  name: string;
  status: JobStatus;
  /** 0..1 for a determinate bar, null for an indeterminate one */
  progress: number | null;
  message: string;
  /** Thumbnail image URL (a photo, or one frame of a video) */
  preview?: string;
  result?: { url: string; filename: string };
}

export type Update = (patch: Partial<Job>) => void;
export type Runner<I> = (job: Job<I>, update: Update, signal: AbortSignal) => Promise<void>;

/**
 * A small client-side work queue: runs at most `concurrency` jobs at once,
 * lets each job report progress, and aborts everything on clear().
 */
export function useJobs<I>(runner: Runner<I>, concurrency = 2) {
  const [jobs, setJobs] = useState<Job<I>[]>([]);
  const jobsRef = useRef(jobs);
  jobsRef.current = jobs;
  const queue = useRef<Job<I>[]>([]);
  const running = useRef(new Map<string, AbortController>());
  /** Running jobs that don't count against `concurrency`. */
  const unqueued = useRef(new Set<string>());
  const runnerRef = useRef(runner);
  runnerRef.current = runner;
  const urls = useRef(new Set<string>());

  const update = useCallback((id: string, patch: Partial<Job>) => {
    for (const u of [patch.preview, patch.result?.url]) if (u) urls.current.add(u);
    setJobs((list) => list.map((j) => (j.id === id ? ({ ...j, ...patch } as Job<I>) : j)));
  }, []);

  const start = useCallback(
    (job: Job<I>) => {
      const ctrl = new AbortController();
      running.current.set(job.id, ctrl);
      update(job.id, { status: 'active' });
      runnerRef
        .current(job, (p) => update(job.id, p), ctrl.signal)
        .catch((e: unknown) => {
          if (ctrl.signal.aborted) return;
          update(job.id, { status: 'error', message: e instanceof Error ? e.message : String(e), progress: null });
        })
        .finally(() => {
          // The same row may have been started again since (retry, remount).
          if (running.current.get(job.id) === ctrl) {
            running.current.delete(job.id);
            unqueued.current.delete(job.id);
          }
          pump();
        });
    },
    // pump is defined below and only called from callbacks.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [update],
  );

  function pump() {
    while (running.current.size - unqueued.current.size < concurrency && queue.current.length) start(queue.current.shift()!);
  }

  /**
   * Add rows. By default each one waits its turn in the queue. `immediate`
   * runs it now without taking a slot (work already going on elsewhere, e.g.
   * a server job picked up after a reload); a given `status` of 'error' or
   * 'done' only shows the row.
   */
  const add = useCallback(
    (
      items: {
        input: I;
        name: string;
        preview?: Job['preview'];
        id?: string;
        immediate?: boolean;
        status?: 'error' | 'done';
        message?: string;
        result?: Job['result'];
      }[],
    ) => {
      const created = items.map<Job<I>>((it) => ({
        id: it.id ?? crypto.randomUUID(),
        input: it.input,
        name: it.name,
        preview: it.preview,
        status: it.status ?? 'waiting',
        progress: null,
        message: it.message ?? 'Waiting…',
        result: it.result,
      }));
      for (const j of created) if (j.preview) urls.current.add(j.preview);
      setJobs((list) => [...[...created].reverse(), ...list]);
      created.forEach((j, i) => {
        if (items[i].status) return;
        if (items[i].immediate) {
          unqueued.current.add(j.id);
          start(j);
        } else queue.current.push(j);
      });
      pump();
      return created.map((j) => j.id);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [start],
  );

  const remove = useCallback((id: string) => {
    queue.current = queue.current.filter((j) => j.id !== id);
    running.current.get(id)?.abort();
    running.current.delete(id);
    unqueued.current.delete(id);
    setJobs((list) => {
      const j = list.find((x) => x.id === id);
      for (const u of [j?.preview, j?.result?.url]) {
        if (!u) continue;
        if (u.startsWith('blob:')) URL.revokeObjectURL(u);
        urls.current.delete(u);
      }
      return list.filter((x) => x.id !== id);
    });
  }, []);

  /** Put a failed job back in the queue. */
  const retry = useCallback(
    (id: string) => {
      const job = jobsRef.current.find((j) => j.id === id);
      if (!job || job.status !== 'error' || queue.current.some((j) => j.id === id)) return;
      const reset = { status: 'waiting', progress: null, message: 'Waiting…' } as const;
      queue.current.push({ ...job, ...reset });
      update(id, reset);
      pump();
    },
    [update],
  );

  const clear = useCallback(() => {
    queue.current = [];
    for (const c of running.current.values()) c.abort();
    running.current.clear();
    unqueued.current.clear();
    for (const u of urls.current) if (u.startsWith('blob:')) URL.revokeObjectURL(u);
    urls.current.clear();
    setJobs([]);
  }, []);

  // Abort in-flight work if the tool unmounts.
  useEffect(() => () => {
    for (const c of running.current.values()) c.abort();
  }, []);

  const setPreview = useCallback((id: string, url: string) => update(id, { preview: url }), [update]);

  const patch = useCallback((id: string, p: Partial<Job>) => update(id, p), [update]);

  return { jobs, add, remove, retry, clear, setPreview, update: patch };
}
