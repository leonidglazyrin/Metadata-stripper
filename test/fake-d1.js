'use strict';

// A stand-in for Cloudflare's D1 HTTP API, backed by a real in-memory SQLite
// database (Node's node:sqlite) with migrations/ applied. The account tests
// run the production SQL without a network or a Cloudflare account.

const fs = require('fs');
const path = require('path');

const emit = process.emitWarning;
process.emitWarning = (w, ...rest) => { if (!String(w?.message ?? w).includes('SQLite')) emit.call(process, w, ...rest); };
const { DatabaseSync } = require('node:sqlite');
process.emitWarning = emit;

const MIGRATIONS = path.join(__dirname, '..', 'migrations');

function migrate(db) {
  for (const f of fs.readdirSync(MIGRATIONS).filter((n) => n.endsWith('.sql')).sort()) {
    db.exec(fs.readFileSync(path.join(MIGRATIONS, f), 'utf8'));
  }
}

function fakeD1({ accountId = 'acc_1', databaseId = 'db_1', apiToken = 'cf_token' } = {}) {
  const db = new DatabaseSync(':memory:');
  db.exec('PRAGMA foreign_keys = ON');
  migrate(db);
  const calls = [];
  let down = false;
  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`;

  async function fetchImpl(url, init = {}) {
    if (down) throw new TypeError('fetch failed');
    if (url !== endpoint) throw new Error(`unexpected ${url}`);
    if (init.headers?.Authorization !== `Bearer ${apiToken}`) {
      return Response.json({ success: false, errors: [{ code: 10000, message: 'Authentication error' }] }, { status: 403 });
    }
    const { sql, params = [] } = JSON.parse(init.body);
    calls.push({ sql, params });
    try {
      const stmt = db.prepare(sql);
      let results = [];
      let changes = 0;
      if (stmt.columns().length) {
        results = stmt.all(...params).map((r) => ({ ...r }));
        changes = /^\s*(insert|update|delete)/i.test(sql) ? results.length : 0;
      } else {
        changes = Number(stmt.run(...params).changes);
      }
      return Response.json({ success: true, errors: [], result: [{ success: true, results, meta: { changes } }] });
    } catch (e) {
      return Response.json({ success: false, errors: [{ code: 7500, message: e.message }] }, { status: 400 });
    }
  }

  return { accountId, databaseId, apiToken, db, calls, fetch: fetchImpl, setDown(v) { down = v; } };
}

module.exports = { fakeD1, migrate };
