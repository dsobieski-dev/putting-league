# Notes for Claude: Putting League Scorecard

An installable offline web app (PWA) for a golf putting league, served by GitHub Pages from `main` at https://dsobieski-dev.github.io/putting-league/. All league data lives in the browser storage of the club's device. There is no server.

## Release rules (every push)
1. **Update `CHANGELOG.md`.** Add a new entry at the top: `## X.Y.Z — YYYY-MM-DD`, then `### Summary` (short bullets saying what each change does), then `### Details` (in-depth: how it works, storage keys, API calls, edge cases, how to use it).
2. **Bump the version in both places:** `APP_VERSION` in `index.html` and `VERSION` in `sw.js`. Without the `sw.js` bump, installed devices never see the update.
3. **New static files:** if a file is added that the app needs offline, add it to `FILES` in `sw.js`.
4. **Never commit league data:** no backups, player names or scores. This repo is public. Off-device backups go to a separate *private* repo.
5. **Commit author:** `dsobieski-dev <dsobieski-dev@users.noreply.github.com>`.
6. **Workflow:** work on a branch, then ask before pushing to `main`, since `main` is the live site.
7. **Wording:** text people see in the app says **"Cloud"** (cloud backup, the cloud, cloud storage), never "GitHub". GitHub is named only in the README's setup steps for the backup repo and token, and in the app's address. Code, ids and storage keys may keep `gh`/GitHub names.

## Sync design (3.0.0+)
- **Shared file:** `sync/league.json` in the private backup repo: `{format: 'putting-league-sync', version, updatedAt, updatedBy: 'Primary'|'Secondary', data: {players, meetings, scores, config}, deleted: {"collection/id": time}}`.
- **Stamps:** every write must go through `localDb` (`set`/`update`/`delete`/`replaceAll`) so records get `_u` (an increasing ISO time) and `_by` (device id, `puttingLeague.device`), and deletions are recorded in `store._deleted`. `applySync()` is only for merged or downloaded data and never stamps.
- **Merge:** `mergeLeague()` is newest-wins per record. Ties go to the deletion, then the higher `_by`, then canonical JSON. It must stay deterministic.
- **Upload:** always send the `sha`. On 409/422, re-download, merge and retry (`syncNow`). Never overwrite the shared file without a sha, except a restore repairing a damaged file (`syncNow({ repair: true })`).
- **Practice mode:** `ghGet().sync === false`. Nothing is uploaded or downloaded and no dated copies are made. `offChanges` triggers the Replace/Keep/Cancel choice when sync is turned back on.
- **Wording:** devices are only ever "Primary league device" / "Secondary league device" in app text and docs.

## Layout
- `index.html`: the whole app (HTML, CSS, JS). `localDb` is the storage adapter. Handicap math is `handicap()`.
- `sw.js`: offline cache, cache-first. A new `VERSION` triggers the "Reload to update" bar.
- `vendor/xlsx.full.min.js`: SheetJS 0.20.3, used only for spreadsheet import.
- `fonts/`, `icons/`, `manifest.webmanifest`: offline assets and install details.

## Browser storage keys
- `puttingLeague.v1`: league data
- `puttingLeague.meta`: backup and change times
- `puttingLeague.github`: cloud settings and token, plus sync state (`role`, `sync`, `joined`, `lastSyncAt`, `offChanges`). Device-only, never in backups.
- `puttingLeague.device`: this device's sync id.
- `puttingLeague.ui`: display preferences

## Testing
- Serve the folder under `/putting-league/` and drive it with Playwright, covering offline, persistence, bad input, backup and restore, import, start over, and the v(N-1) → vN upgrade.
- `api.github.com` must be mocked with `page.route`.
