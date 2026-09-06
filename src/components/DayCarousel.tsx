import React, {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState
} from 'react';
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
// range, so memory/render cost stays constant regardless of how many
// days of data exist.
//
// Whenever the user reaches an edge page (or "today" jumps the window
// directly), the pager needs to snap back to the middle page. That snap
// is done imperatively via setPageWithoutAnimation() rather than by
// remounting the PagerView, because both approaches turned out to race
// with the native view firing its own extra onPageSelected callback for
// that programmatic page change — which this code would otherwise
// misread as a second real user swipe, silently landing one day off
// (most visibly: "back to today" landing on yesterday). The
// ignoreNextEventRef below discards exactly one onPageSelected event
// right after each programmatic recenter, with a short timeout as a
// safety net in case no such event ever arrives on a given platform —
// so a real swipe is never permanently swallowed if this guess is wrong.
export const DayCarousel = forwardRef<DayCarouselHandle, Props>(
    function DayCarousel({ cityTable, onOffsetChange }, ref) {
        const pagerRef = useRef<PagerView>(null);
        const [centerOffset, setCenterOffset] = useState(0);
        const ignoreNextEventRef = useRef(false);
        const ignoreTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
            null
        );

        useEffect(() => {
            onOffsetChange?.(centerOffset);
        }, [centerOffset]);

        useEffect(
            () => () => {
                if (ignoreTimeoutRef.current) {
                    clearTimeout(ignoreTimeoutRef.current);
                }
            },
            []
        );

        const recenter = useCallback(() => {
            ignoreNextEventRef.current = true;
            if (ignoreTimeoutRef.current) {
                clearTimeout(ignoreTimeoutRef.current);
            }
            // Safety net: if the platform never fires a follow-up event
            // for this programmatic page change, don't block real swipes
            // forever waiting for one.
            ignoreTimeoutRef.current = setTimeout(() => {
                ignoreNextEventRef.current = false;
            }, 400);

            requestAnimationFrame(() => {
                pagerRef.current?.setPageWithoutAnimation(1);
            });
        }, []);

        useImperativeHandle(ref, () => ({
            goToToday: () => {
                setCenterOffset(0);
                recenter();
            }
        }));

        const handlePageSelected = (event: {
            nativeEvent: { position: number };
        }) => {
            const { position } = event.nativeEvent;

            if (ignoreNextEventRef.current) {
                ignoreNextEventRef.current = false;
                if (ignoreTimeoutRef.current) {
                    clearTimeout(ignoreTimeoutRef.current);
                }
                return;
            }

            if (position === 0) {
                setCenterOffset((prev) => prev - 1);
                recenter();
            } else if (position === 2) {
                setCenterOffset((prev) => prev + 1);
                recenter();
            }
        };

        const offsets = [centerOffset - 1, centerOffset, centerOffset + 1];

        return (
            <PagerView
                ref={pagerRef}
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
