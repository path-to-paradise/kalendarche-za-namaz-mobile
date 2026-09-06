# Времето за намаз (mobile)

A React Native / Expo port of the [Kalendarche-Za-Namaz](https://github.com/path-to-paradise/kalendarche-za-namaz) prayer-times web app, built to run natively on Android and iOS.

## Features

- Prayer times (Fajr, Sunrise, Duha, Dhuhr/Jumah, Asr, Maghrib, Isha/Witr, Tahajjud) for 48 Bulgarian cities
- Infinite vertical swipe between days, with a "back to today" shortcut
- Light / dark / system theme, with 10 selectable accent colors
- Three prayer-naming styles (default, Arabic, descriptive)
- Bulgarian and English language support, including city names
- Ramadan day counter and Eid al-Fitr banners
- Live "now" highlighting of the current prayer

## Data

Prayer-time data (`src/data/timeTable/*.json`) is bundled directly into the app rather than fetched at runtime, so the app works fully offline from first launch. This means the yearly data refresh (currently automated via GitHub Actions in the web repo) needs a new app build/release each year — copy the updated `time-table/*.json` files from the web repo into `src/data/timeTable/` and publish an update.

## Running the app

```bash
npm install
npx expo start
```

Scan the QR code with the Expo Go app (Android/iOS), or press `a` / `i` in the terminal to launch an Android emulator / iOS simulator if you have one configured.

```bash
npm run android   # start and open on a connected Android device/emulator
npm run ios       # start and open on the iOS simulator (macOS only)
```

## Project structure

```
App.tsx                     # entry point, providers, and screen composition
src/
  components/                # UI: Header, DayCard, PrayerRow, carousel, modals
  data/                      # bundled prayer-time JSON, city list, Ramadan dates
  i18n/                      # bg/en UI strings and prayer-name label sets
  settings/                  # SettingsContext (AsyncStorage-backed app state)
  theme/                     # color theme + light/dark palette definitions
  utils/                     # date/time math ported from the web app's app.js
```

## Notes on the port

- The web app rendered one page per day (up to 365) in a single Swiper instance. This app instead keeps only 3 pages mounted at a time in a `react-native-pager-view`, re-centering the window as you swipe — an "infinite pager" pattern that scales to any date range without the render/GPU cost the web version had to work around.
- Business logic (Tahajjud calculation, Ramadan/Eid period lookup, date-relative labels) is ported line-for-line from `app.js` in the web repo, so the two apps should never disagree on a prayer time.
