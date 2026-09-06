import type { Language } from './strings';

export type PrayerNameStyleKey = 'default' | 'arabic' | 'descriptive';

export type PrayerNames = {
    fajr: string;
    sunrise: string;
    duha: string;
    dhuhr: string;
    jumah: string;
    asr: string;
    maghrib: string;
    isha: string;
    tahajjud: string;
};

// Three sets of prayer-row labels per language, so users can pick
// whichever naming convention their mosque/community uses. Jumah always
// overrides the Dhuhr label on Fridays, regardless of style or language.
export const PRAYER_NAME_STYLES: Record<Language, Record<PrayerNameStyleKey, PrayerNames>> = {
    bg: {
        default: {
            fajr: 'Сабах',
            sunrise: 'Изгрев',
            duha: 'Духа',
            dhuhr: 'Пладнина',
            jumah: 'Джумая',
            asr: 'Икинди',
            maghrib: 'Акшам',
            isha: 'Еция / Витр',
            tahajjud: 'Техадж-джуд'
        },
        arabic: {
            fajr: 'Феджър',
            sunrise: 'Изгрев',
            duha: 'Духа',
            dhuhr: 'Зухур',
            jumah: 'Джумая',
            asr: 'Асър',
            maghrib: 'Магриб',
            isha: 'Иша / Витр',
            tahajjud: 'Тахаджуд'
        },
        descriptive: {
            fajr: 'Зора',
            sunrise: 'Изгрев',
            duha: 'Духа',
            dhuhr: 'Обяд',
            jumah: 'Джумая',
            asr: 'Следобяд',
            maghrib: 'Залез',
            isha: 'Нощ / Витр',
            tahajjud: 'Тахаджуд'
        }
    },
    en: {
        default: {
            fajr: 'Fajr',
            sunrise: 'Sunrise',
            duha: 'Duha',
            dhuhr: 'Dhuhr',
            jumah: 'Jumah',
            asr: 'Asr',
            maghrib: 'Maghrib',
            isha: 'Isha / Witr',
            tahajjud: 'Tahajjud'
        },
        arabic: {
            fajr: 'Fajr',
            sunrise: 'Sunrise',
            duha: 'Duha',
            dhuhr: 'Dhuhr',
            jumah: 'Jumah',
            asr: 'Asr',
            maghrib: 'Maghrib',
            isha: 'Isha / Witr',
            tahajjud: 'Tahajjud'
        },
        descriptive: {
            fajr: 'Dawn',
            sunrise: 'Sunrise',
            duha: 'Duha',
            dhuhr: 'Noon',
            jumah: 'Jumah',
            asr: 'Afternoon',
            maghrib: 'Sunset',
            isha: 'Night / Witr',
            tahajjud: 'Tahajjud'
        }
    }
};
