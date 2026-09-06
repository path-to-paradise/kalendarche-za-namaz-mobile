import { RAMADAN_PERIODS } from '../data/ramadanPeriods';
import { getDaysBetween } from './dateHelpers';
import type { Strings } from '../i18n/strings';

export function getRamadanPeriod(fullDate: Date) {
    return RAMADAN_PERIODS.find(
        (period) => fullDate >= period.start && fullDate <= period.end
    );
}

export function getEidInfo(fullDate: Date): { dayNumber: number } | null {
    for (const period of RAMADAN_PERIODS) {
        const dayOffset = getDaysBetween(period.eidStart, fullDate);
        if (dayOffset >= 0 && dayOffset < period.eidDays) {
            return { dayNumber: dayOffset + 1 };
        }
    }

    return null;
}

export type RamadanBanner = { type: 'eid' | 'ramadan'; label: string } | null;

export function getRamadanBanner(fullDate: Date, strings: Strings): RamadanBanner {
    const eidInfo = getEidInfo(fullDate);
    if (eidInfo) {
        const label = eidInfo.dayNumber === 1 ? strings.eidDay1 : strings.eidDay2;
        return { type: 'eid', label };
    }

    const ramadanPeriod = getRamadanPeriod(fullDate);
    if (ramadanPeriod) {
        const dayNumber = getDaysBetween(ramadanPeriod.start, fullDate) + 1;
        const totalDays =
            getDaysBetween(ramadanPeriod.start, ramadanPeriod.end) + 1;

        let label = strings.ramadanDay(dayNumber);
        if (dayNumber === 1) {
            label = strings.ramadanStart;
        } else if (dayNumber === totalDays) {
            label = `${strings.ramadanLastDayPrefix}${label}`;
        }

        return { type: 'ramadan', label };
    }

    return null;
}
