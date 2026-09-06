import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { StyleSheet } from 'react-native';
import PagerView from 'react-native-pager-view';

import { DayCard } from './DayCard';
import type { PrayerTimeTable, DayPrayerTimes } from '../data/timeTable';
import { getRelativeDate } from '../utils/dateHelpers';

export type DayCarouselHandle = {
    goToToday: () => void;
};

type Props = {
    cityTable: PrayerTimeTable;
    onOffsetChange?: (offset: number) => void;
};

function getPrayerTimesForDate(
    table: PrayerTimeTable,
    date: Date
): DayPrayerTimes | null {
    const month = String(date.getMonth() + 1);
    const day = String(date.getDate());
    return table[month]?.[day] ?? null;
}

// Renders only 3 pages at a time (yesterday/today/tomorrow relative to a
// moving center offset) instead of one page per day in the whole data
// range. When the user swipes to an edge page, the window re-centers and
// the pager needs to land back on the middle page — the classic
// "infinite pager" technique. That reset is done by remounting the
// PagerView (via `key={centerOffset}`) rather than calling its
// setPageWithoutAnimation() imperatively: the imperative call raced with
// the new children being laid out and could land one page off (e.g. the
// "back to today" button visibly landing on yesterday). A fresh mount
// always starts exactly at initialPage, so there's nothing to race.
export const DayCarousel = forwardRef<DayCarouselHandle, Props>(
    function DayCarousel({ cityTable, onOffsetChange }, ref) {
        const [centerOffset, setCenterOffset] = useState(0);

        useEffect(() => {
            onOffsetChange?.(centerOffset);
        }, [centerOffset]);

        useImperativeHandle(ref, () => ({
            goToToday: () => setCenterOffset(0)
        }));

        const handlePageSelected = (event: {
            nativeEvent: { position: number };
        }) => {
            const { position } = event.nativeEvent;
            if (position === 0) {
                setCenterOffset((prev) => prev - 1);
            } else if (position === 2) {
                setCenterOffset((prev) => prev + 1);
            }
        };

        const offsets = [centerOffset - 1, centerOffset, centerOffset + 1];

        return (
            <PagerView
                key={centerOffset}
                style={styles.pager}
                orientation="vertical"
                initialPage={1}
                onPageSelected={handlePageSelected}
            >
                {offsets.map((offset) => {
                    const date = getRelativeDate(offset);
                    const nextDate = getRelativeDate(offset + 1);
                    const prayerTimes = getPrayerTimesForDate(cityTable, date);
                    const nextDayPrayerTimes = getPrayerTimesForDate(
                        cityTable,
                        nextDate
                    );

                    return (
                        <DayCard
                            key={offset}
                            date={date}
                            prayerTimes={prayerTimes}
                            nextDayFajr={nextDayPrayerTimes?.down}
                        />
                    );
                })}
            </PagerView>
        );
    }
);

const styles = StyleSheet.create({
    pager: {
        flex: 1
    }
});
