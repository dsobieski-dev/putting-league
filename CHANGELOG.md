# Changelog

Newest release first. Each release has a short **Summary** of what changed, followed by **Details** on how each change works.

---

## 2.2.0 — 2026-11-18

### Summary
- **Install hint on iPad:** iPad and iPhone don't offer an Install button, so the app now explains how to add it to the Home Screen.
- **Backups on iPad use the Share sheet:** **Download backup** and **Download scores (CSV)** open the Share sheet, so you can choose Save to Files, AirDrop or Mail.
- **Update check on return:** the app also checks for updates when it comes back on screen after an hour or more. Installed apps often resume instead of restarting, especially on iPad.
- **iPad Home Screen icon and name:** a proper Home Screen icon, with the app named "Putting League".

### Details

#### Install hint (iPad and iPhone)
- **When it shows:** when the app is open in Safari but not installed. iPadOS reports itself as a Mac, so the app treats "Mac with a touch screen" as an iPad.
- **What it says:** a bar at the top reads "To install on this iPad: tap the Share button, then Add to Home Screen…". It also warns that scores typed into the browser tab stay separate from the installed app.
- **Dismissing:** **Got it** hides the bar for good on that device (stored in `puttingLeague.ui`).
- **Where it never shows:** in the installed app, on Android, and on Windows.

#### Saving files on iPad and iPhone
- **How it works:** `saveFile()` now uses the Share sheet (Web Share with a file) on iPad and iPhone when Safari can share that file. Plain downloads are unreliable inside a Home Screen app there.
  - On Android and Windows nothing changes: files download as before.
  - If Safari can't share the file, it falls back to a normal download.
- **If the Share sheet is closed without choosing anything:**
  - **Download backup:** shows "Not saved…". The backup reminder stays, and the last-backup date isn't updated.
  - **Download scores (CSV):** shows "Not saved".
  - **Start a new season / Erase everything:** stops and clears nothing, because the safety backup wasn't saved.
- **After saving a backup through the Share sheet:** the message suggests also copying it off the iPad, for example to iCloud Drive or by email.

#### Update check when the app returns
- **When:** each time the app becomes visible again (`visibilitychange`) while online, at most once an hour, it asks for the latest version (`registration.update()`). A new version shows the usual **Reload to update** bar.
- **Why:** before, the check ran only when the app started, which iPad apps rarely do.

#### iPad Home Screen
- **Icon:** new `icons/apple-touch-icon-180.png`, 180×180, square with no transparent corners. iPad rounds the corners itself and would show black where an icon is transparent. It's added to the offline cache.
- **Name and display:** `apple-mobile-web-app-capable`, `apple-mobile-web-app-title` ("Putting League") and status bar tags make the Home Screen app open full screen under a short name.

#### Docs and version
- **README:** iPad install steps, saving backups through the Share sheet, and how to force-close the app to get an update.
- **Version:** `APP_VERSION` 2.2.0, service worker `VERSION` `v2.2.0`.
- **Testing limit:** behavior was tested by simulating an iPad in Chromium: identity string, touch screen, and a stand-in Share sheet. It hasn't yet been checked on a real iPad.

---

## 2.1.0 — 2026-11-17

### Summary
- **Delete a player:** a new **Delete** button on the Players tab removes someone who won't be coming back. Their past scores stay in meeting results, marked as a former player.
- **Cloud backup:** the backup section and all of its messages now say "Cloud" instead of naming the storage service.

### Details

#### Delete a player (Players tab)
- **Where:** each player row has **Delete** next to Rename and Mark inactive, for active and inactive players alike.
- **Confirmation:** clicking it opens a confirmation under that row, naming the player and saying how many past scores they have. **Delete player** goes ahead; **Cancel** changes nothing. Starting a rename, switching tabs or toggling inactive players also cancels it.
- **What happens:**
  1. Each of the player's saved scores is stamped with their name (`playerName` on the score).
  2. The player is removed from the player list.
  3. Any unsaved score typed for them is discarded.
- **After deleting:**
  - **Results** still show their past scores, with their name and a **former** label. Rankings and winners of past meetings don't change.
  - **CSV export** shows their name.
  - **Gone from:** score entry, the Handicaps tab and the player list. Other players' handicaps don't change, because each handicap uses only that player's own scores.
- **Undo:** restore a backup made before the delete. A cloud backup runs automatically after the change, as for any other change.
- **Same name later:** importing or adding the same name later creates a new player with a fresh history.
- **Fix:** saving a meeting date where only a former player still has scores no longer removes that meeting's record.

#### Cloud wording
- **Section and labels:** the section on the Rules & backup tab is now **Cloud backup**. The fields read **Cloud storage location (owner/name)** and **Access token**, and the token placeholder says "Paste the access token".
- **Buttons:** **Back up to the cloud now** and **Restore from the cloud…**. The status line reads "Cloud backup: …" and "Last cloud backup: …".
- **Messages:** every status, error and confirmation message says "the cloud" or "cloud storage", including the Start over notes and the restore label "(cloud)".
- **Unchanged underneath:** backups are still stored in the league's private GitHub repository. Settings already saved on the device keep working, since the storage keys didn't change. The README names GitHub only in its setup steps.
- **Version:** `APP_VERSION` 2.1.0, service worker `VERSION` `v2.1.0`.

---

## 2.0.1 — 2026-11-15

### Summary
- Renamed the "GitHub backup" section on the Rules & backup tab to **Online backup**.

### Details
- **Screen text:** the section heading now reads **Online backup**. The status line reads "Online backup: …" and "Last online backup: …".
- **Messages:** the offline message, the remove-token message and the *Erase everything* warning say "online backup" instead of "GitHub backup".
- **Unchanged:** the buttons **Back up to GitHub now** and **Restore from GitHub…** still name GitHub, because that's where the backups are stored. How backups work is unchanged, and so are the settings already saved on a device.
- **README:** the setup section is now "Set up online backup", and it still explains that backups are stored in a private GitHub repository.
- **Version:** `APP_VERSION` 2.0.1, service worker `VERSION` `v2.0.1`.

---

## 2.0.0 — 2026-11-15

### Summary
- **GitHub backup:** copies the league's data to a private GitHub repository automatically whenever the device is online, and can restore it onto any device.
- **Show or hide inactive players:** inactive players are hidden on the Players tab by default. A checkbox shows them again.
- **Import players from a spreadsheet:** reads a player list from Excel (.xlsx or .xls) or a CSV file. You check the list before anything is added.
- **Start over:** *Start a new season* clears scores but keeps players and rules. *Erase everything* returns the app to blank. Both make a backup first.
- **App version and Check for updates:** shown on the Rules & backup tab.
- **Fix:** the first time the app was opened, it reloaded itself about a second later, which could wipe something being typed. It no longer does.

### Details

#### GitHub backup (Rules & backup → GitHub backup)
- **Setup:** enter the backup repository as `owner/name`, or paste its GitHub address, plus a fine-grained access token. **Save and test** then:
  1. reads the repository (`GET /repos/{owner}/{name}`) and refuses it unless it is **private**, because league names and scores must never be public;
  2. makes a first backup, which proves the token can write.
- **Where the settings live:** the repository, token and auto-backup choice are stored on this device only, in browser storage key `puttingLeague.github`. They are never put in backup files, and *Erase everything* keeps them. **Remove token from this device** deletes the token.
- **What a backup is:** each one is a new file, `backups/putting-league-backup-YYYY-MM-DD-HHMMSS.json`, in the backup repository. It's added through the GitHub contents API (`PUT /repos/{owner}/{name}/contents/...`) with a commit message such as "Backup: 12 players, 48 scores". The file has the same format as **Download backup**. Text is encoded as UTF-8 so accented names survive.
- **Automatic backups:** on by default, and they run:
  - about 4 seconds after any change is saved;
  - when the device comes back online;
  - when the app opens.

  One runs only if data changed since the last GitHub backup. If one fails, for example because the device is offline or the token has expired, the app waits 10 minutes before trying again automatically and shows the reason under the GitHub section. A GitHub backup also counts for the "last backup" reminder.
- **Restore from GitHub:** lists the 10 newest backups, newest first. Choosing one downloads it, runs the same checks as restoring a file, and shows the same **Replace with backup** confirmation before anything changes.
- **Errors explained in plain language:** a public repository, a wrong or expired token (401), a missing repository or no access (404), a missing write permission (403), and being offline.

#### Inactive players (Players tab)
- Inactive players are hidden from the list by default. **Show inactive players (N)** appears only when someone is inactive. It reveals them with their **Reactivate** link.
- The choice is remembered on the device (`puttingLeague.ui`). It's a display setting, not league data, so it isn't in backups.
- When players are hidden, the note under the list says how many.

#### Import players (Players tab → Import from spreadsheet…)
- **File types:**
  - `.xlsx` and `.xls` are read with SheetJS 0.20.3, bundled as `vendor/xlsx.full.min.js` under the Apache-2.0 license (`vendor/LICENSE-SheetJS`). It loads only when importing, and the offline cache stores it, so import works without internet.
  - `.csv` is read by a small built-in parser. It handles quoted names containing commas, `""` escapes, a byte-order mark, and `;` or tab separators.
- **Finding the names** (first worksheet only):
  1. a header called Name, Player, Player Name, Full Name, Golfer or Member;
  2. otherwise First Name + Last Name columns, joined;
  3. otherwise the first column, skipping its first row when that looks like a heading.
- **Preview before anything is added:** each name is marked:
  - **New** (ticked);
  - **Already on the list** (skipped);
  - **On the list (inactive)** (tick to reactivate);
  - **Duplicate in file** (skipped).

  Blank rows are skipped. Matching ignores upper and lower case, and names are trimmed to 60 characters. Up to 500 rows are read.
- The button says exactly what will happen, for example "Add 3 players and reactivate 1". **Cancel** adds nothing.

#### Start over (Rules & backup → Start over)
- **Start a new season:** removes all scores and meetings, and keeps players and handicap rules. Everyone starts with no handicap again.
- **Erase everything:** removes players, scores, meetings and rules. Rules return to par 36, 80%, last 5 rounds, 3 rounds before a handicap.
- **Confirmation:** each opens a panel saying what will be removed, with counts. The button stays disabled until `NEW SEASON` or `ERASE` is typed.
- **Before clearing:** a backup file always downloads. If GitHub backup is set up and the device is online, the old data also goes to GitHub.
- **After clearing:** the now-empty app is deliberately *not* auto-uploaded, so the newest GitHub backup still holds the old data.

#### Updates
- `APP_VERSION` in `index.html` and `VERSION` in `sw.js` are bumped together on every release (now `2.0.0` / `v2`).
- **How a device updates:** the installed app checks for a new version each time it's opened while online.
  1. A new version downloads in the background.
  2. A **Reload to update** bar appears.
  3. Tapping it switches over. League data is kept.
- **Check for updates** on the Rules & backup tab checks on demand.
- **Fix:** the page used to reload when the offline worker first took control on a brand-new install. It now reloads only for updates.

---

## 1.0.0 — 2026-11-14

### Summary
- First release: an installable app for entering putting league scores and working out handicaps. It works with no internet and keeps all data on the device, with backup files and a backup reminder.

### Details
- **Score entry:** one total per player per meeting. Scores must be whole numbers from 1 to 300. Letters, symbols and decimals are refused, and the player is named. Clearing a saved score asks before removing it.
- **Handicap:** average of the last 5 gross scores. Handicap = (average − par 36) × 80%, always rounded down, never below 0. Players need 3 rounds before they get one. Net = gross − handicap. Each saved score keeps the handicap used that day. All of this is adjustable on the Rules tab.
- **Storage:** all data is stored on the device in browser storage key `puttingLeague.v1`. The app asks the browser for persistent storage.
- **Backups:** backup download and restore, with a preview and confirmation. A reminder appears when scores have been saved since a backup more than 7 days old. CSV export of scores.
- **Offline:** a service worker caches the app, fonts and icons for offline use. Install prompt on Chrome and Edge. A **Reload to update** bar appears when a new version is available.
