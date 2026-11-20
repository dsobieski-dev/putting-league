# Putting League Scorecard

Score entry and handicaps for a putting league. It installs as an app on a tablet or laptop and works with no internet.

**App address:** https://dsobieski-dev.github.io/putting-league/

## Install on a league device (needs internet once)

**Android tablet (Chrome)**
1. Open the app's web address in Chrome.
2. Tap **Install app** at the top of the page. If the button isn't shown, open Chrome's menu (⋮) and choose **Install app** or **Add to Home screen**.
3. Open it from the home screen icon. From now on it works offline.

**Windows laptop (Chrome or Edge)**
1. Open the app's web address in Chrome or Edge.
2. Click **Install app** at the top of the page, or the install icon at the right end of the address bar.
3. Open it from the Start menu or desktop shortcut. From now on it works offline.

**iPad (Safari, iPadOS 16.4 or later)**
1. Open the app's web address in **Safari**.
2. Tap the **Share** button (the square with an arrow, at the top), then **Add to Home Screen**, then **Add**. The app shows a reminder bar with these steps until you tap **Got it**. iPad has no Install button, because Apple doesn't let websites show one.
3. Open it from the new Home Screen icon. From now on it works offline.

Use the installed app, not a browser tab. The browser is less likely to clear an installed app's data. On iPad this matters even more: data in the Home Screen app is kept separately from Safari, so scores typed into a Safari tab won't appear in the app. Install first, then enter everything in the installed app.

## Getting updates

1. Connect the device to the internet (Wi-Fi is fine) and **open the installed app**. It checks for a new version every time it opens while online.
2. When a new version has downloaded, a bar appears at the top: **"A new version of the app is ready."** Tap **Reload to update**.
3. That's it. Players, scores and rules are kept. The new version number shows under **Rules & backup → App version**.

To check right away, use **Rules & backup → Check for updates**. If no bar appears, close the app fully and open it again while online. On iPad, swipe up from the bottom, hold, then swipe the app away. The app also checks again when it comes back on screen after an hour or more. What changed in each version is listed in [CHANGELOG.md](CHANGELOG.md).

## Where the data lives

The league uses two devices: the **Primary league device**, which enters scores, and the **Secondary league device**, used by another officer to review data and as a spare if the Primary has a problem. Each device keeps the league data on itself, so it works with no internet. Cloud sync keeps the two the same.

- **Cloud sync** (recommended): whenever a device is online, it shares its changes and picks up the other device's. See the next two sections.
- **Dated cloud backups:** while sync is on, the app also keeps a dated copy in the cloud at most twice a day. **Restore from the cloud** lists them.
- **Backup file:** **Rules & backup → Download backup** saves a copy you control (USB stick, email, cloud folder). On iPad, the Share sheet opens instead: choose **Save to Files** (iCloud Drive keeps a copy off the iPad), AirDrop or Mail. **Download scores (CSV)** works the same way.
- **Reminder:** the app shows one when scores have been saved, the last backup is more than 7 days old, and the device hasn't synced in the last week.
- **Replacing a device:** install the app on the new one and connect it to the cloud (below). It downloads the league data.

## Set up cloud backup and sync (one time, about 5 minutes)

Everything goes to a **separate private repository**, never this public one. League names and scores must not be public.

1. **Create the backup repository.** On GitHub, choose **New repository** and name it `putting-league-backups`. Choose **Private**, tick **Add a README file**, and choose **Create repository**.
2. **Create an access token** that can only touch that repository. Make one token per league device, so either can be cut off alone if it's lost.
   1. Open GitHub → your profile picture → **Settings** → **Developer settings** → **Personal access tokens** → **Fine-grained tokens** → **Generate new token**.
   2. **Token name:** "Primary league device" (or "Secondary league device"). **Expiration:** 1 year, and note the date.
   3. **Repository access:** **Only select repositories**, then `putting-league-backups`.
   4. **Permissions** → **Repository permissions** → **Contents:** **Read and write**. Leave everything else as is.
   5. Choose **Generate token** and copy it. It starts with `github_pat_`.
3. **Connect the app.** On the league device, while online, open **Rules & backup → Cloud backup & sync**:
   1. Enter `dsobieski-dev/putting-league-backups` and paste the token.
   2. Choose **Save and test**. It should say "Connected to …", and then "Synced".
   3. Check **This device is the** shows the right choice: **Primary league device** or **Secondary league device**.

If it says the token was rejected, it has probably expired: make a new one (step 2) and save it again.

**If a device is lost or stolen,** revoke its token on GitHub (same page as step 2) so nobody can use it. Tokens are stored only on the device and are never included in backup files.

## Primary and Secondary league devices

**Setting up the Secondary league device** (the Primary is already connected):
1. Install the app on it (see "Install on a league device").
2. Make a second token named "Secondary league device" (step 2 above), then connect the app with it (step 3).
3. Choose **Secondary league device**.
4. If the Secondary already has some data, for example test players, the app asks how to combine it with the cloud data. Choose **Use the cloud data**. A backup file of the Secondary's old data downloads first.

**Day to day:**
- **Both devices can enter and change data.** Changes are shared whenever a device is online: when the app opens, when it comes back online, a few seconds after each change, every 2 minutes while it's open, or when you tap **Sync now**.
- **The chip at the top** shows the state:
  - **Synced 3 min ago:** up to date as of then.
  - **Not synced: offline:** no internet right now.
  - **Sync problem:** tap it for details.
  - **Sync off: practice mode:** see below.
- **Before a meeting:** open the app on the device you'll use while it's online, so it has the latest data. **After the meeting:** open it online again so the other device gets the new scores.
- **Same record changed on both devices before they synced** (for example the same player's score for the same date): the most recent change wins on both devices. The device whose change was replaced shows a message saying which records. Keep both devices' date and time set automatically, because "most recent" relies on their clocks.
- **Whole-league actions reach both devices:** **Start a new season**, **Erase everything**, **Restore from backup** and **Restore from the cloud** apply to the other device too when it next syncs. The app says so before you confirm.

## Trying out rule changes (practice mode)

To test handicap settings without touching live data:
1. On either device, go to **Rules & backup → Cloud backup & sync** and set **Automatic sync** to **Off (practice mode)**. The chip turns amber and Enter scores shows a warning, so nobody enters real scores by mistake.
2. Change rules, enter test scores, or even use **Start over**. Nothing leaves this device, and no cloud copies are made.
3. Set **Automatic sync** back to **On**. The app asks what to do with the changes:
   - **Replace this device's data with the live data** (usual choice): throws the test changes away and downloads the current live data.
   - **Keep the changes made here and share them:** for real work done while sync was off. This also shares anything cleared with Start over.
   - **Cancel:** sync stays off.

You can also change the rules back by hand, but **Replace** is quicker and exact.

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

Both download a backup first, and also save a dated cloud copy if sync is on and the device is online. Both need a typed confirmation word. With sync on, they clear the other league device too when it next syncs. In practice mode, they only clear this device.

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
