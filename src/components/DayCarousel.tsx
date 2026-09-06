import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
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

// Renders a fixed window of WINDOW_RADIUS days on either side of a
// "window center" offset (15 pages total) instead of one page per day
// in the whole data range, so memory/render cost stays bounded
// regardless of how many days of data exist.
//
// A minimal 3-page window (recentering on every single swipe) turned
// out to be too fragile: react-native-pager-view can fire an extra
// confirmation onPageSelected event after a programmatic page change,
// and a naive handler misreads that as a second real swipe — landing
// one day off, or (once guarded with a blunt "ignore the next event"
// timeout) occasionally swallowing a genuine swipe instead.
//
// With a wider window, ordinary browsing — a few days in either
// direction, or jumping to today from nearby — never touches the
// recentering logic at all: the pager's own index is read directly
// off each event and trusted as-is. Recentering only happens near the
// window's edge, and instead of guessing whether a given event is
// "real", the reported offset is always recomputed from the CURRENT
// window center — so an extra confirmation event for a programmatic
// change lands on the same, already-correct offset and does nothing,
// rather than being misread as further navigation.
const WINDOW_RADIUS = 7;
const PAGE_COUNT = WINDOW_RADIUS * 2 + 1;
const EDGE_MARGIN = 2;

export const DayCarousel = forwardRef<DayCarouselHandle, Props>(
    function DayCarousel({ cityTable, onOffsetChange }, ref) {
        const pagerRef = useRef<PagerView>(null);
        const [windowCenter, setWindowCenter] = useState(0);

        useEffect(() => {
            onOffsetChange?.(windowCenter);
            // Only report the initial offset on mount — subsequent
            // reports happen directly inside handlePageSelected/goToToday.
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        useImperativeHandle(ref, () => ({
            goToToday: () => {
                setWindowCenter(0);
                onOffsetChange?.(0);
                requestAnimationFrame(() => {
                    pagerRef.current?.setPageWithoutAnimation(WINDOW_RADIUS);
                });
            }
        }));

        const handlePageSelected = (event: {
            nativeEvent: { position: number };
        }) => {
            const { position } = event.nativeEvent;
            const newOffset = windowCenter - WINDOW_RADIUS + position;
            onOffsetChange?.(newOffset);

            const nearStart = position <= EDGE_MARGIN;
            const nearEnd = position >= PAGE_COUNT - 1 - EDGE_MARGIN;
            if (nearStart || nearEnd) {
                setWindowCenter(newOffset);
                requestAnimationFrame(() => {
                    pagerRef.current?.setPageWithoutAnimation(WINDOW_RADIUS);
                });
            }
        };

        const offsets = Array.from(
            { length: PAGE_COUNT },
            (_, i) => windowCenter - WINDOW_RADIUS + i
        );

        return (
            <PagerView
                ref={pagerRef}
                style={styles.pager}
                orientation="vertical"
                initialPage={WINDOW_RADIUS}
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
