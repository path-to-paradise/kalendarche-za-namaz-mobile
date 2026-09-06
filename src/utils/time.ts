export function timeStringToMinutes(timeString: string): number {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
}

export function minutesToTimeString(totalMinutes: number): string {
    const normalizedMinutes =
        ((Math.round(totalMinutes) % (24 * 60)) + 24 * 60) % (24 * 60);
    const hours = Math.floor(normalizedMinutes / 60);
    const minutes = normalizedMinutes % 60;

    return `${hours}:${String(minutes).padStart(2, '0')}`;
}

export function addMinutesToTimeString(
    timeString: string,
    minutesToAdd: number
): string {
    return minutesToTimeString(timeStringToMinutes(timeString) + minutesToAdd);
}

// Duha begins once the sun has fully risen. Bulgaria follows the Diyanet
// (Turkish) tradition, which places this ~45 minutes after sunrise.
export const DUHA_MINUTES_AFTER_SUNRISE = 45;

export function calculateTehajjudPrayer(
    maghribPrayerTime: string | undefined,
    nextDayFajrPrayerTime: string | undefined
): string {
    if (!maghribPrayerTime || !nextDayFajrPrayerTime) {
        return '—';
    }

    const maghribInMinutes = timeStringToMinutes(maghribPrayerTime);
    const nextDayFajrInMinutes =
        timeStringToMinutes(nextDayFajrPrayerTime) + 24 * 60;

    const nightDurationInMinutes = nextDayFajrInMinutes - maghribInMinutes;
    const lastThirdOfTheNightStartsAtInMinutes =
        nextDayFajrInMinutes - nightDurationInMinutes / 3;

    return minutesToTimeString(lastThirdOfTheNightStartsAtInMinutes);
}

export function combineDateAndTime(date: Date, timeString?: string): Date | null {
    if (!timeString?.includes(':')) {
        return null;
    }

    const [hours, minutes] = timeString.split(':').map(Number);
    const combined = new Date(date);
    combined.setHours(hours, minutes, 0, 0);

    return combined;
}
