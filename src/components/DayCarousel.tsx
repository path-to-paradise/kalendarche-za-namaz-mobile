import React, {
    forwardRef,
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
// range. When the user swipes to an edge page, the window silently
// re-centers and the pager resets to the middle page without animation —
// the classic "infinite pager" technique. This keeps memory/render cost
// constant regardless of how many days of data exist, unlike the web
// app's original one-page-per-day Swiper instance.
export const DayCarousel = forwardRef<DayCarouselHandle, Props>(
    function DayCarousel({ cityTable, onOffsetChange }, ref) {
        const pagerRef = useRef<PagerView>(null);
        const [centerOffset, setCenterOffset] = useState(0);
        const isFirstRender = useRef(true);

        useEffect(() => {
            onOffsetChange?.(centerOffset);

            if (isFirstRender.current) {
                isFirstRender.current = false;
                return;
            }
            pagerRef.current?.setPageWithoutAnimation(1);
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
