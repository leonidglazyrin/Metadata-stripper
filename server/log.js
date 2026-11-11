'use strict';

// Small console logger so the terminal running the server shows every
// download and strip as it happens. Colors only when writing to a TTY.

const color = process.stdout.isTTY && !process.env.NO_COLOR;
const paint = (code, s) => (color ? `\x1b[${code}m${s}\x1b[0m` : s);

function size(bytes) {
  if (bytes == null || Number.isNaN(bytes)) return '?';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
}

function duration(ms) {
  return ms < 1000 ? `${Math.round(ms)}ms` : `${(ms / 1000).toFixed(1)}s`;
}

function stamp() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

function line(tag, status, msg) {
  const st = status === 'ok' ? paint('32', 'OK  ') : status === 'fail' ? paint('31', 'FAIL') : paint('33', '... ');
  const out = `${paint('90', stamp())} ${paint('36', tag.padEnd(8))} ${st} ${msg}`;
  (status === 'fail' ? console.error : console.log)(out);
}

module.exports = {
  size,
  duration,
  start: (tag, msg) => line(tag, 'start', msg),
  ok: (tag, msg) => line(tag, 'ok', msg),
  fail: (tag, msg) => line(tag, 'fail', msg),
  info: (msg) => console.log(`${paint('90', stamp())} ${msg}`),
};
