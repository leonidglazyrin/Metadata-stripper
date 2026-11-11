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
  preview?: { url: string; kind: 'image' | 'video' };
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
  const queue = useRef<Job<I>[]>([]);
  const running = useRef(new Map<string, AbortController>());
  const runnerRef = useRef(runner);
  runnerRef.current = runner;
  const urls = useRef(new Set<string>());

  const update = useCallback((id: string, patch: Partial<Job>) => {
    for (const u of [patch.preview?.url, patch.result?.url]) if (u) urls.current.add(u);
    setJobs((list) => list.map((j) => (j.id === id ? ({ ...j, ...patch } as Job<I>) : j)));
  }, []);

  const pump = useCallback(() => {
    while (running.current.size < concurrency && queue.current.length) {
      const job = queue.current.shift()!;
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
          running.current.delete(job.id);
          pump();
        });
    }
  }, [concurrency, update]);

  const add = useCallback(
    (items: { input: I; name: string; preview?: Job['preview'] }[]) => {
      const created = items.map<Job<I>>((it) => ({
        id: crypto.randomUUID(),
        input: it.input,
        name: it.name,
        preview: it.preview,
        status: 'waiting',
        progress: null,
        message: 'Waiting…',
      }));
      for (const j of created) if (j.preview) urls.current.add(j.preview.url);
      queue.current.push(...created);
      setJobs((list) => [...created.reverse(), ...list]);
      pump();
    },
    [pump],
  );

  const clear = useCallback(() => {
    queue.current = [];
    for (const c of running.current.values()) c.abort();
    running.current.clear();
    for (const u of urls.current) URL.revokeObjectURL(u);
    urls.current.clear();
    setJobs([]);
  }, []);

  // Abort in-flight work if the tool unmounts.
  useEffect(() => () => {
    for (const c of running.current.values()) c.abort();
  }, []);

  return { jobs, add, clear };
}
