import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
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
// iOS UIPageViewController wrapper to finish its own setup before it can
// accept a page change.
function runAfterLayout(callback: () => void) {
    requestAnimationFrame(() => requestAnimationFrame(callback));
}

// Earlier versions of this component tried to keep only a small window
// of pages mounted, rebuilding it (and jumping the pager back to the
// middle) as the user approached either edge — an "infinite pager"
// technique. On iOS specifically, changing the PagerView's children at
// the same time as moving its current page turned out to be too
// unreliable with this library: the two operations raced or silently
// failed to apply in combination, in a few different ways depending on
// exactly when the rebuild happened (wrong page on launch, "today"
// permanently stuck, swiping hitting an invisible wall mid-session).
//
// Instead, a wide but fixed range of days (rendered once and never
// rebuilt) is used, matching the web app's own range: mostly forward-
// looking, covering a full rolling year ahead plus a month back for
// convenience. Within that range, navigating is just moving the
// pager's current page — never simultaneously changing what pages
// exist — the one operation this library handles reliably on both
// platforms. The trade-off is a fixed boundary at the ends of that
// range instead of unlimited scrolling, accepted since it comfortably
// covers realistic usage.
const DAYS_BACK = 30;
const DAYS_FORWARD = 370;
const PAGE_COUNT = DAYS_BACK + DAYS_FORWARD + 1;
const TODAY_INDEX = DAYS_BACK;

export const DayCarousel = forwardRef<DayCarouselHandle, Props>(
    function DayCarousel({ cityTable, onOffsetChange }, ref) {
        const pagerRef = useRef<PagerView>(null);

        useEffect(() => {
            // initialPage is unreliable on iOS for this library's
            // vertical orientation, so the correct page is set
            // explicitly right after mount rather than trusted
            // declaratively.
            runAfterLayout(() => {
                pagerRef.current?.setPage(TODAY_INDEX);
            });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        useImperativeHandle(ref, () => ({
            goToToday: () => {
                runAfterLayout(() => {
                    pagerRef.current?.setPage(TODAY_INDEX);
                });
            }
        }));

        const handlePageSelected = (event: {
            nativeEvent: { position: number };
        }) => {
            onOffsetChange?.(event.nativeEvent.position - TODAY_INDEX);
        };

        // Computed once — this array is never rebuilt after mount.
        const offsets = useMemo(
            () => Array.from({ length: PAGE_COUNT }, (_, i) => i - DAYS_BACK),
            []
        );

        return (
            <PagerView
                ref={pagerRef}
                style={styles.pager}
                orientation="vertical"
                initialPage={TODAY_INDEX}
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
