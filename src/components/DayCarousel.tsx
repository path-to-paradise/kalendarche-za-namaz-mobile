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

// Waits two animation frames instead of one before running a page-jump.
// A single frame isn't reliably enough time for react-native-pager-view's
// iOS UIPageViewController wrapper (managing many child view controllers)
// to finish its own setup before it can accept a page change.
function runAfterLayout(callback: () => void) {
    requestAnimationFrame(() => requestAnimationFrame(callback));
}

// Renders a fixed window of WINDOW_RADIUS days on either side of a
// "window center" offset (15 pages total) instead of one page per day
// in the whole data range, so memory/render cost stays bounded
// regardless of how many days of data exist.
//
// Getting the pager to land on a specific non-zero page reliably on iOS
// has been the hard part: initialPage isn't honored, and
// setPageWithoutAnimation() silently does nothing (the app would launch
// showing a day WINDOW_RADIUS in the past — i.e. still sitting on
// native page 0 — rather than today). setPage() (the animated variant)
// is used instead, since the non-animated one appears to be the
// specifically broken one on iOS.
//
// Just as important: the app's own belief about which day is showing
// is never updated optimistically before that page change is
// confirmed. Previously, tapping "today" immediately hid the button
// (assuming success) even when the page never actually moved, which
// looked like the button "breaking" — permanently disappearing while
// the wrong day stayed on screen. Now the offset is only ever updated
// from a genuine onPageSelected event, so if a page-jump silently
// fails, the app's state (and the today button) still correctly
// reflects what's actually on screen instead of lying about it.
const WINDOW_RADIUS = 7;
const PAGE_COUNT = WINDOW_RADIUS * 2 + 1;
const EDGE_MARGIN = 2;

export const DayCarousel = forwardRef<DayCarouselHandle, Props>(
    function DayCarousel({ cityTable, onOffsetChange }, ref) {
        const pagerRef = useRef<PagerView>(null);
        const [windowCenter, setWindowCenter] = useState(0);

        useEffect(() => {
            runAfterLayout(() => {
                pagerRef.current?.setPage(WINDOW_RADIUS);
            });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        useImperativeHandle(ref, () => ({
            goToToday: () => {
                setWindowCenter(0);
                runAfterLayout(() => {
                    pagerRef.current?.setPage(WINDOW_RADIUS);
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
                runAfterLayout(() => {
                    pagerRef.current?.setPage(WINDOW_RADIUS);
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
