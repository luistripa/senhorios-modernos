import moment from "moment";
import data from "bootstrap/js/src/dom/data";


/**
 *
 * @param {moment.Moment} moment1
 * @param {moment.Moment} moment2
 */
export function hasSameMonth(moment1, moment2) {
    return moment1.format("YYYY-MM") === moment2.format("YYYY-MM");
}

/**
 *
 * @param {moment.Moment} moment1
 * @param {moment.Moment} moment2
 */
export function hasSameDay(moment1, moment2) {
    return moment1.format("YYYY-MM-DD") === moment2.format("YYYY-MM-DD");
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
            if (hasSameDay(day_date, event.startDate)) {
                day_events.push(event);
            } else if (hasSameDay(day_date, event.endDate)) {
                day_events.push(event);
            } else if (day_date.isBetween(event.startDate, event.endDate)) {
                day_events.push(event)
            }

        } else if (event.repeat === "DAILY") {
            if (!event.repeatUntil || (event.repeatUntil && event.repeatUntil.isSameOrAfter(day_date))) {
                if (hasSameDay(day_date, event.startDate)) {
                    day_events.push(event);
                } else if (hasSameDay(day_date, event.endDate)) {
                    day_events.push(event);
                } else if (day_date.isBetween(event.startDate, event.endDate)) { // TODO: Fix this
                    day_events.push(event);
                }
            }

        } else if (event.repeat === "WEEKLY") {
            if (!event.repeatUntil || (event.repeatUntil && event.repeatUntil.isSameOrAfter(day_date))) {
                if (day_date.weekday() === event.startDate.weekday()) {
                    day_events.push(event);
                } else if (day_date.isBetween(event.startDate, event.endDate)) { // TODO: Fix this
                    day_events.push(event);
                }
            }

        } else if (event.repeat === "MONTHLY") {
            if (!event.repeatUntil || (event.repeatUntil && event.repeatUntil.isSameOrAfter(day_date))) {
                if (day_date.format("DD") === event.startDate.format("DD") && day_date.isSameOrAfter(event.startDate)) {
                    day_events.push(event);
                } else if (day_date.isBetween(event.startDate, event.endDate)) { // TODO: Fix this
                    day_events.push(event);
                }
            }
        }
    }

    // TODO: Order events

    return day_events
}