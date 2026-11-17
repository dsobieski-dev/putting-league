# Putting League Scorecard

Score entry and handicaps for a putting league. It installs as an app on a tablet or laptop and works with no internet.

**App address:** https://dsobieski-dev.github.io/putting-league/

## Install on the club's device (needs internet once)

**Android tablet (Chrome)**
1. Open the app's web address in Chrome.
2. Tap **Install app** at the top of the page. If the button isn't shown, open Chrome's menu (⋮) and choose **Install app** or **Add to Home screen**.
3. Open it from the home screen icon. From now on it works offline.

**Windows laptop (Chrome or Edge)**
1. Open the app's web address in Chrome or Edge.
2. Click **Install app** at the top of the page, or the install icon at the right end of the address bar.
3. Open it from the Start menu or desktop shortcut. From now on it works offline.

Use the installed app, not a browser tab. The browser is less likely to clear an installed app's data.

## Getting updates

1. Connect the device to the internet (Wi-Fi is fine) and **open the installed app**. It checks for a new version every time it opens while online.
2. When a new version has downloaded, a bar appears at the top: **"A new version of the app is ready."** Tap **Reload to update**.
3. That's it. Players, scores and rules are kept. The new version number shows under **Rules & backup → App version**.

To check right away, use **Rules & backup → Check for updates**. If no bar appears, close the app fully and open it again while online. What changed in each version is listed in [CHANGELOG.md](CHANGELOG.md).

## Where the data lives

All players, scores and rules are stored only on the club's device.

- **Backup file:** go to **Rules & backup → Download backup** after each meeting, and copy the file off the device (USB stick, email, cloud folder).
- **Cloud backup** (recommended): copies happen automatically whenever the device is online. See below.
- **Reminder:** the app shows one when scores have been saved and the last backup is more than 7 days old.
- **New device:** to move to one, install the app there and use **Restore from backup** or **Restore from the cloud**.

## Set up cloud backup (one time, about 5 minutes)

Backups go to a **separate private repository**, never this public one. League names and scores must not be public.

1. **Create the backup repository.** On GitHub, choose **New repository** and name it `putting-league-backups`. Choose **Private**, tick **Add a README file**, and choose **Create repository**.
2. **Create an access token** that can only touch that repository:
   1. Open GitHub → your profile picture → **Settings** → **Developer settings** → **Personal access tokens** → **Fine-grained tokens** → **Generate new token**.
   2. **Token name:** "Putting league device". **Expiration:** 1 year, and note the date.
   3. **Repository access:** **Only select repositories**, then `putting-league-backups`.
   4. **Permissions** → **Repository permissions** → **Contents:** **Read and write**. Leave everything else as is.
   5. Choose **Generate token** and copy it. It starts with `github_pat_`.
3. **Connect the app.** On the club's device, while online, open **Rules & backup → Cloud backup**:
   1. Enter `dsobieski-dev/putting-league-backups` and paste the token.
   2. Choose **Save and test**. It should say "Connected. Backed up …".
   3. Keep "Back up automatically" ticked.

After that, the device backs up by itself whenever it's online and something has changed. If it says the token was rejected, it has probably expired: make a new one (step 2) and save it again.

**If the device is lost or stolen,** revoke the token on GitHub (same page as step 2) so nobody can use it. The token is stored only on the device and is never included in backup files.

## Delete a player

**Players → Delete** removes someone who won't be coming back. It asks first.

- Their past scores stay in meeting results, shown with their name and a **former** label.
- They're removed from score entry, handicaps and the player list.
- To undo, restore a backup made before the delete.
- For someone who might come back, use **Mark inactive** instead.

## Import players from a spreadsheet

**Players → Import from spreadsheet…** reads Excel (.xlsx or .xls) or CSV files.

- It looks for a column called **Name** or **Player**, or **First Name** + **Last Name**. Otherwise it uses the first column.
- It shows the list first, with names already on the roster and duplicates skipped. Inactive players can be ticked to reactivate.
- Only the first worksheet is read.

## Start over

Two options sit under **Rules & backup → Start over**:

- **Start a new season:** clears scores and meetings, and keeps players and rules.
- **Erase everything:** clears players, scores and rules.

Both download a backup first, and also send it to the cloud if cloud backup is set up and the device is online. Both need a typed confirmation word.

## Handicap formula (adjustable under Rules & backup)

- Average of each player's last 5 gross scores
- Handicap = (average − par 36) × 80%, always rounded **down** to a whole stroke, never below 0
- Players need 3 rounds before they get a handicap
- Net = gross − handicap. Lowest net wins.
- Each saved score keeps the handicap used that day, so changing the rules never rewrites past results.

## Files

- `index.html`: the whole app
- `sw.js`: offline support. Bump `VERSION` on every release, together with `APP_VERSION` in `index.html`.
- `CHANGELOG.md`: what changed in each version
- `manifest.webmanifest`, `icons/`: install details
- `fonts/`: Barlow Condensed and Inter, under the SIL Open Font License (`fonts/OFL-*.txt`)
- `vendor/xlsx.full.min.js`: SheetJS 0.20.3 spreadsheet reader, Apache License 2.0 (`vendor/LICENSE-SheetJS`)
