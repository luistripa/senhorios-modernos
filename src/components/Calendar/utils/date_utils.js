import {AdvancedDate} from "./AdvancedDate";

/**
 * Gets the first day of the month of the given date.
 *
 * @param {AdvancedDate} date
 */
export function getFirstDayOfMonth(date) {
    console.log(AdvancedDate.fromDate(new Date(date.getFullYear(), date.getMonth(), 1)))
    return AdvancedDate.fromDate(new Date(date.getFullYear(), date.getMonth(), 1));
}


/**
 * Gets the first day as displayed in a standard 7-day calendar,
 * which may be the first day of the month or a few days before, depending on the weekday.
 *
 * This function assumes the weeks start on a monday.
 *
 * @param {AdvancedDate} date
 */
export function getFirstDayOfCalendar(date) {
    let firstDayOfMonth = getFirstDayOfMonth(date);


    let diffDays = firstDayOfMonth.weekDayMondayFirst();

    return AdvancedDate.fromDate(
        new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth(), firstDayOfMonth.getDate() - diffDays)
    );
}


/**
 *
 * @param {AdvancedDate} day_date
 * @param events
 * @returns {*[]}
 */
export function getDayEvents(day_date, events) {
    let day_events = [];

    for (let event of events) {
        if (event.repeat === "NO") {
            if (day_date.hasSameDayAs(event.startDate))
                day_events.push(event);

        } else if (event.repeat === "DAILY") {
            if (day_date.isAfter(event.startDate) || day_date.hasSameDayAs(event.startDate)) {
                if (event.endDate && day_date.isBetween(event.startDate, event.endDate))
                    day_events.push(event);
            }

        } else if (event.repeat === "WEEKLY") {
            if (day_date.isBetween(event.startDate, event.endDate) && day_date.hasSameWeekDayAs(event.startDate))
                day_events.push(event);

        } else if (event.repeat === "MONTHLY") {
            if (day_date.isBetween(event.startDate, event.endDate) && day_date.hasSameDayAs(event.startDate))
                day_events.push(event);
        }
        // End date < day_date and ( (repeat DAILY) or (repeat WEEKLY and startDate.weekday == day.weekDay) )
    }

    return day_events
}