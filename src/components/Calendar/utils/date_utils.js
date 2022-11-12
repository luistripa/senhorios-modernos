import moment from "moment";


/**
 *
 * @param {moment.Moment} moment1
 * @param {moment.Moment} moment2
 */
export function hasSameMonth(moment1, moment2) {
    return moment1.year() === moment2.year() && moment1.month() === moment2.month();
}

/**
 *
 * @param {moment.Moment} moment1
 * @param {moment.Moment} moment2
 */
export function hasSameDay(moment1, moment2) {
    return hasSameMonth(moment1, moment2) && moment1.date() === moment2.date();
}

/**
 * Gets the first day of the month of the given date.
 *
 * @param {moment.Moment} date
 */
export function getFirstDayOfMonth(date) {
    return moment(moment(date).format("YYYY-MM-01"));
}


/**
 * Gets the first day as displayed in a standard 7-day calendar,
 * which may be the first day of the month or a few days before, depending on the weekday.
 *
 * This function assumes the weeks start on a monday.
 *
 * @param {moment.Moment} date
 */
export function getFirstDayOfCalendar(date) {
    let firstDayOfMonth = getFirstDayOfMonth(date);

    let diffDays = firstDayOfMonth.startOf("isoWeek").weekday();

    return firstDayOfMonth.subtract(diffDays-1, "day");
}


/**
 *
 * @param {moment.Moment} day_date
 * @param events
 * @returns {*[]}
 */
export function getDayEvents(day_date, events) {
    let day_events = [];

    for (let event of events) {
        if (event.repeat === "NO") {
            if (hasSameDay(day_date, event.startDate))
                day_events.push(event);

        } else if (event.repeat === "DAILY") {
            if (event.endDate) {
                if (day_date.isBetween(event.startDate, event.endDate) || hasSameDay(day_date, event.startDate))
                    day_events.push(event)
            }

        } else if (event.repeat === "WEEKLY") {
            if (day_date.weekday() === event.startDate.weekday()) {
                if (day_date.isBetween(event.startDate, event.endDate) || hasSameDay(day_date, event.startDate))
                    day_events.push(event);
            }

        } else if (event.repeat === "MONTHLY") {
            if (day_date.isBetween(event.startDate, event.endDate) || hasSameDay(day_date, event.startDate)) {
                if (day_date.date() === event.startDate.date())
                    day_events.push(event);
            }
        }
        // End date < day_date and ( (repeat DAILY) or (repeat WEEKLY and startDate.weekday == day.weekDay) )
    }

    // TODO: Order events

    return day_events
}