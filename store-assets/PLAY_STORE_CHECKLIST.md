# Google Play publishing checklist

## Already done (in this repo)

- [x] `eas.json` build profiles configured (development/preview/production)
- [x] EAS project linked (`@rifatcholakov/kalendarche-za-namaz-mobile`,
      project ID in `app.json` → `extra.eas.projectId`)
- [x] `android.package` set: `bg.pathtoparadise.kalendarchezanamaz`
- [x] `android.versionCode` set (starts at 1; `eas.json`'s production
      profile has `autoIncrement: true`, so EAS bumps it automatically on
      every production build after this)
- [x] Proper adaptive icon: foreground/background/monochrome layers
      generated from the app's actual icon (previously this was Expo's
      generic placeholder graphic) — `assets/android-icon-*.png`
- [x] Play Store icon (512×512 32-bit PNG) — `store-assets/play-store-icon-512.png`
- [x] Feature graphic (1024×500, required by the store listing) —
      `store-assets/feature-graphic.png`
- [x] Privacy policy drafted (bg + en) — `store-assets/privacy-policy.md`
- [x] Store listing copy drafted (bg + en, short + full description) —
      `store-assets/store-listing.md`

## Still needed — things only you can do

### 1. Google Play Console developer account
If you don't already have one: https://play.google.com/console/signup
— a one-time $25 registration fee, tied to your own Google account. I
can't create this for you (it needs your payment details and identity).

### 2. Host the privacy policy somewhere public
Play Console requires a **live URL**, not just a file. Easiest options:
- Enable GitHub Pages for this repo (Settings → Pages → deploy from a
  branch/folder) and point it at `store-assets/privacy-policy.md`, or
  convert it to `privacy-policy.html` first for a nicer render.
- Or add a `/privacy-policy` page to the already-deployed web app
  (`kalendarche-za-namaz.path-to-paradise.workers.dev`) and link that
  instead, since that infrastructure already exists.

I didn't enable GitHub Pages myself since it's a repo-settings change —
happy to do it if you'd like, just say so.

### 3. Build the production Android App Bundle
From this project directory:
```bash
npx eas-cli build --platform android --profile production
```
This runs on Expo's cloud build servers (no Android Studio needed
locally). On first run it will ask permission to generate and manage a
signing keystore for you — say yes (this is Google's recommended
approach, called Play App Signing). It'll give you a download link for
the resulting `.aab` file when done.

### 4. Create the app in Play Console
- Play Console → "Create app" → fill in name, default language
  (Bulgarian), app/game type, free/paid.
- Complete the required sections under "Set up your app": privacy
  policy URL (from step 2), app access, ads (none), content ratings
  (questionnaire below), target audience, news app (no), COVID-19
  contact tracing (no), Data safety (below), government app (no).

### 5. Content rating questionnaire
Answers should be straightforward for this app — no violence, no user-
generated content, no gambling, no location sharing, no user
communication features. This should land it at "Everyone" / equivalent
low-risk rating across all regional rating systems.

### 6. Data safety form
Since the app collects **no data at all** (see privacy policy — no
network requests, no analytics, only on-device local storage of
preferences that never leaves the device):
- "Does your app collect or share any of the required user data types?"
  → **No**
- This should let you complete the Data safety section without
  declaring any data collection categories.

### 7. Store listing
- Paste in the short/full descriptions from `store-listing.md` (bg
  listing first, then add an English listing via "Manage translations"
  if you want the English text to appear for English-speaking devices).
- Upload `play-store-icon-512.png` as the app icon.
- Upload `feature-graphic.png` as the feature graphic.
- **Screenshots (required, at least 2 phone screenshots)** — I can't
  generate these myself since I don't have a device/simulator to run
  the app on. Take a few from your own phone once you're running the
  app (Settings screen, a normal day view, maybe the city picker) and
  upload those.
- Category: Lifestyle (suggested in `store-listing.md`, change if you
  prefer).
- Contact email (required) and website (optional).

### 8. Upload the build and submit
- Play Console → Production (or start with "Internal testing" / "Closed
  testing" to try it with a small group first, which is recommended for
  a first release) → upload the `.aab` from step 3 → complete rollout
  → submit for review.
- Google's review typically takes a few hours to a few days for a new
  app.

## Notes

- The EAS project is under the `rifatcholakov` Expo account (per your
  choice) — this only affects who manages builds/credentials, not the
  public Play Store listing, which is owned by whichever Google account
  you use for Play Console.
- `eas.json`'s production profile builds an `.aab` (Android App Bundle),
  which is what Play Store requires now (not a raw `.apk`).
- If you want to test the production build on your own device before
  submitting, use the `preview` profile instead (builds an installable
  `.apk` you can sideload):
  ```bash
  npx eas-cli build --platform android --profile preview
  ```
