import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

import { PrayerRow } from './PrayerRow';
import { useSettings } from '../settings/SettingsContext';
import type { DayPrayerTimes } from '../data/timeTable';
import {
    addMinutesToTimeString,
    calculateTehajjudPrayer,
    combineDateAndTime,
    DUHA_MINUTES_AFTER_SUNRISE
} from '../utils/time';
import { isToday, isTomorrow, isYesterday } from '../utils/dateHelpers';
import { getRamadanBanner } from '../utils/ramadan';

type Props = {
    date: Date;
    prayerTimes: DayPrayerTimes | null;
    nextDayFajr: string | undefined;
};

function isWithin(now: Date, start: Date | null, end: Date | null): boolean {
    if (!start || !end) return false;
    return now >= start && now < end;
}

export function DayCard({ date, prayerTimes, nextDayFajr }: Props) {
    const { theme, strings, prayerNames } = useSettings();
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        const interval = setInterval(() => setNow(new Date()), 30000);
        return () => clearInterval(interval);
    }, []);

    if (!prayerTimes) {
        return (
            <View style={styles.slide}>
                <View
                    style={[styles.dayCard, { backgroundColor: theme.surface }]}
                >
                    <Text style={{ color: theme.muted }}>—</Text>
                </View>
            </View>
        );
    }

    const { down, sunrise, dhuhr, asr, maghrib, isha } = prayerTimes;
    const duha = addMinutesToTimeString(sunrise, DUHA_MINUTES_AFTER_SUNRISE);
    const tehajjud = calculateTehajjudPrayer(maghrib, nextDayFajr);

    const isFriday = date.getDay() === 5;

    const nextCalendarDay = new Date(date);
    nextCalendarDay.setDate(nextCalendarDay.getDate() + 1);
    const nextDayFajrDate = combineDateAndTime(nextCalendarDay, nextDayFajr);

    const dayLabel = isToday(date)
        ? strings.dayToday
        : isYesterday(date)
        ? strings.dayYesterday
        : isTomorrow(date)
        ? strings.dayTomorrow
        : null;

    const weekday = date.toLocaleString(strings.dateLocale, { weekday: 'long' });
    const month = date.toLocaleString(strings.dateLocale, { month: 'long' });
    const capitalizedWeekday =
        weekday.charAt(0).toUpperCase() + weekday.slice(1);

    const banner = getRamadanBanner(date, strings);

    const intervals = {
        fajr: [
            combineDateAndTime(date, down),
            combineDateAndTime(date, sunrise)
        ] as const,
        duha: [combineDateAndTime(date, duha), combineDateAndTime(date, dhuhr)] as const,
        dhuhr: [combineDateAndTime(date, dhuhr), combineDateAndTime(date, asr)] as const,
        asr: [combineDateAndTime(date, asr), combineDateAndTime(date, maghrib)] as const,
        maghrib: [
            combineDateAndTime(date, maghrib),
            combineDateAndTime(date, isha)
        ] as const,
        isha: [combineDateAndTime(date, isha), nextDayFajrDate] as const
    };

    const isCurrent = (key: keyof typeof intervals) =>
        isWithin(now, intervals[key][0], intervals[key][1]);

    return (
        <View style={styles.slide}>
            <View style={[styles.dayCard, { backgroundColor: theme.surface }]}>
                {banner && (
                    <View
                        style={[
                            styles.banner,
                            banner.type === 'eid'
                                ? styles.eidBanner
                                : styles.ramadanBanner
                        ]}
                    >
                        <Text
                            style={[
                                styles.bannerText,
                                banner.type === 'eid'
                                    ? styles.eidBannerText
                                    : styles.ramadanBannerText
                            ]}
                        >
                            {banner.label.toUpperCase()}
                        </Text>
                    </View>
                )}

                <View style={styles.dateHeading}>
                    {dayLabel && (
                        <View
                            style={[
                                styles.dayBadge,
                                {
                                    backgroundColor: isToday(date)
                                        ? theme.primary
                                        : theme.surfaceAlt
                                }
                            ]}
                        >
                            <Text
                                style={[
                                    styles.dayBadgeText,
                                    {
                                        color: isToday(date) ? '#fff' : theme.primaryDark
                                    }
                                ]}
                            >
                                {dayLabel.toUpperCase()}
                            </Text>
                        </View>
                    )}
                    <Text style={[styles.date, { color: theme.text }]}>
                        {capitalizedWeekday}, {date.getDate()} {month}{' '}
                        {date.getFullYear()}
                    </Text>
                </View>

                <View style={styles.prayerList}>
                    <PrayerRow
                        name={prayerNames.fajr}
                        iconName="fajr"
                        startTime={down}
                        endTime={sunrise}
                        showNowBadge
                        isCurrent={isCurrent('fajr')}
                        nowLabel={strings.nowBadge}
                        theme={theme}
                    />
                    <PrayerRow
                        name={prayerNames.sunrise}
                        iconName="sunrise"
                        startTime={sunrise}
                        nowLabel={strings.nowBadge}
                        theme={theme}
                    />
                    <PrayerRow
                        name={prayerNames.duha}
                        iconName="duha"
                        startTime={duha}
                        endTime={dhuhr}
                        variant="voluntary"
                        showNowBadge
                        isCurrent={isCurrent('duha')}
                        nowLabel={strings.nowBadge}
                        theme={theme}
                    />
                    <PrayerRow
                        name={isFriday ? prayerNames.jumah : prayerNames.dhuhr}
                        iconName="sun"
                        startTime={dhuhr}
                        endTime={asr}
                        variant={isFriday ? 'jumah' : 'default'}
                        showNowBadge
                        isCurrent={isCurrent('dhuhr')}
                        nowLabel={strings.nowBadge}
                        theme={theme}
                    />
                    <PrayerRow
                        name={prayerNames.asr}
                        iconName="sun"
                        startTime={asr}
                        endTime={maghrib}
                        showNowBadge
                        isCurrent={isCurrent('asr')}
                        nowLabel={strings.nowBadge}
                        theme={theme}
                    />
                    <PrayerRow
                        name={prayerNames.maghrib}
                        iconName="sunset"
                        startTime={maghrib}
                        endTime={isha}
                        showNowBadge
                        isCurrent={isCurrent('maghrib')}
                        nowLabel={strings.nowBadge}
                        theme={theme}
                    />
                    <PrayerRow
                        name={prayerNames.isha}
                        iconName="isha"
                        startTime={isha}
                        endTime={nextDayFajr}
                        showNowBadge
                        isCurrent={isCurrent('isha')}
                        nowLabel={strings.nowBadge}
                        theme={theme}
                    />
                    <PrayerRow
                        name={prayerNames.tahajjud}
                        iconName="tehajjud"
                        startTime={tehajjud}
                        endTime={nextDayFajr}
                        variant="voluntary"
                        nowLabel={strings.nowBadge}
                        theme={theme}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14
    },
    dayCard: {
        width: '100%',
        maxWidth: 460,
        borderRadius: 24,
        padding: 16,
        shadowColor: '#0f2819',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.12,
        shadowRadius: 20,
        elevation: 4
    },
    banner: {
        alignSelf: 'stretch',
        alignItems: 'center',
        borderRadius: 999,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginBottom: 14
    },
    ramadanBanner: {
        backgroundColor: '#30d081'
    },
    eidBanner: {
        backgroundColor: '#ffb454'
    },
    bannerText: {
        fontWeight: '700',
        fontSize: 12,
        letterSpacing: 0.5
    },
    ramadanBannerText: {
        color: '#fff'
    },
    eidBannerText: {
        color: '#5c4200'
    },
    dateHeading: {
        alignItems: 'center',
        marginBottom: 14,
        gap: 6
    },
    dayBadge: {
        paddingVertical: 3,
        paddingHorizontal: 12,
        borderRadius: 999
    },
    dayBadgeText: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 0.5
    },
    date: {
        fontSize: 19,
        fontWeight: '600',
        textAlign: 'center'
    },
    prayerList: {
        gap: 7
    }
});
