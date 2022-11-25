import moment from "moment";

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

function removeTime(date) {
    return date.clone().hours(0).minutes(0).seconds(0).milliseconds(0);
}


/**
 *
 * @param {moment.Moment} day_date
 * @param all_events
 * @returns {*[]}
 */
export function getDayEvents(day_date, all_events) {
    let day_events = [];

    for (let event of all_events) {
        switch (event.repeat) {
            case "NO": {
                if (day_date.isBetween(removeTime(event.startDate), removeTime(event.endDate))) {
                    day_events.push(event);

                } else if (hasSameDay(day_date, event.startDate)) {
                    day_events.push(event);

                } else if (hasSameDay(day_date, event.endDate)) {
                    day_events.push(event);
                }
                break;
            }
            case "DAILY": {
                if (day_date.isSameOrAfter(removeTime(event.startDate)) && day_date.isSameOrBefore(event.repeatUntil)) {
                    // If event has started and event repeat hasn't ended
                    day_events.push(event);
                }
                break;
            }
            case "WEEKLY": {
                if (day_date.isSameOrAfter(removeTime(event.startDate)) && day_date.isSameOrBefore(event.repeatUntil)) {
                    // If inside event repeat
                    if (day_date.weekday() === event.startDate.weekday())
                        day_events.push(event);
                }
                break;
            }
            case "MONTHLY": {
                if (day_date.isSameOrAfter(removeTime(event.startDate)) && day_date.isSameOrBefore(event.repeatUntil)) {
                    // If inside event repeat
                    if (day_date.date() === event.startDate.date())
                        // If event has same date as day
                        day_events.push(event);
                }
                break;
            }
            case "YEARLY": {
                if (day_date.isSameOrAfter(removeTime(event.startDate)) && day_date.isSameOrBefore(event.repeatUntil)) {
                    // If inside event repeat
                    if (day_date.month() === event.startDate.month() && day_date.date() === event.startDate.date()) {
                        // If event has same date and month as day
                        day_events.push(event);
                    }
                }
                break;
            }
        }
    }
    return day_events;
}
