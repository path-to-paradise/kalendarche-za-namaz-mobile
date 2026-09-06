export function isSameDay(dateA: Date, dateB: Date): boolean {
    return (
        dateA.getFullYear() === dateB.getFullYear() &&
        dateA.getMonth() === dateB.getMonth() &&
        dateA.getDate() === dateB.getDate()
    );
}

export function getRelativeDate(daysOffset: number, from: Date = new Date()): Date {
    const date = new Date(from);
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + daysOffset);
    return date;
}

export function isToday(dateToBeCompared: Date): boolean {
    return isSameDay(dateToBeCompared, new Date());
}

export function isYesterday(dateToBeCompared: Date): boolean {
    return isSameDay(dateToBeCompared, getRelativeDate(-1));
}

export function isTomorrow(dateToBeCompared: Date): boolean {
    return isSameDay(dateToBeCompared, getRelativeDate(1));
}

export function getDaysBetween(fromDate: Date, toDate: Date): number {
    const oneDayInMs = 24 * 60 * 60 * 1000;
    return Math.round((toDate.getTime() - fromDate.getTime()) / oneDayInMs);
}
