# Putting League Scorecard

Score entry and handicaps for a putting league. It installs as an app on a tablet or laptop and works with no internet.

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

## Where the data lives

All players, scores and rules are stored only on that device. Nothing is sent anywhere.

- After each meeting, go to **Rules & backup → Download backup** and copy the file off the device (USB stick, email, cloud folder).
- The app shows a reminder when scores have been saved and the last backup is more than 7 days old.
- To move to a new device, install the app there and use **Restore from backup**.

## Handicap formula (adjustable under Rules & backup)

- Average of each player's last 5 gross scores
- Handicap = (average − par 36) × 80%, always rounded **down** to a whole stroke, never below 0
- Players need 3 rounds before they get a handicap
- Net = gross − handicap. Lowest net wins.
- Each saved score keeps the handicap used that day, so changing the rules never rewrites past results.

## Updates

When a new version is published, the device picks it up the next time it's online and shows **Reload to update**. Saved data is kept.

## Files

- `index.html`: the whole app
- `sw.js`: offline support. Bump `VERSION` on every release.
- `manifest.webmanifest`, `icons/`: install details
- `fonts/`: Barlow Condensed and Inter, under the SIL Open Font License (`fonts/OFL-*.txt`)
