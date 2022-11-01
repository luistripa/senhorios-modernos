/**
 * Gets the first day of the month of the given date.
 *
 * @param {AdvancedDate} date
 */
export function getFirstDayOfMonth(date) {
    return new AdvancedDate(new Date(date.getFullYear(), date.getMonth(), 1));
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

    return new AdvancedDate(
        new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth(), firstDayOfMonth.getDate() - diffDays)
    );
}


export class AdvancedDate {

    /**
     * Creates a new AdvancedDate object.
     *
     * @param {undefined|Date} date
     */
    constructor(date) {
        if (date)
            this.date = date
        else
            this.date = new Date()
    }

    getDay() {
        return this.date.getDay();
    }

    getDate() {
        return this.date.getDate();
    }

    getMonth() {
        return this.date.getMonth();
    }

    getFullYear() {
        return this.date.getFullYear();
    }

    getTime() {
        return this.date.getTime();
    }

    getHours() {
        return this.date.getHours();
    }

    getMinutes() {
        return this.date.getMinutes();
    }

    getSeconds() {
        return this.date.getSeconds();
    }

    getMilliseconds() {
        return this.date.getMilliseconds();
    }

    setFullYear(year) {
        this.date.setFullYear(year);
        return this;
    }

    setMonth(month) {
        this.date.setMonth(month);
        return this;
    }

    setDate(date) {
        this.date.setDate(date);
        return this;
    }

    setHours(hours) {
        this.date.setHours(hours);
        return this;
    }

    setMinutes(minutes) {
        this.date.setMinutes(minutes);
        return this;
    }

    setSeconds(seconds) {
        this.date.setSeconds(seconds);
        return this;
    }

    setMilliseconds(milliseconds) {
        this.date.setMilliseconds(milliseconds);
        return this;
    }

    /**
     * Gets the name of the current month as a string
     *
     * @returns {string}
     */
    getMonthName() {
        switch (this.getMonth()) {
            case 0: return "January";
            case 1: return "February";
            case 2: return "March";
            case 3: return "April";
            case 4: return "May";
            case 5: return "June";
            case 6: return "July";
            case 7: return "August";
            case 8: return "September";
            case 9: return "October";
            case 10: return "November";
            case 11: return "December";
            default: throw new Error("Invalid month number: "+this.getMonth());
        }
    }

    /**
     * Gets the weekday code as if the week started on a monday.
     *
     * @returns {number}
     */
    weekDayMondayFirst() {
        switch(this.getDay()) {
            case 0: return 7;
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6: return this.getDay() - 1;
            default: return -1;
        }
    }

    /**
     * Add the specified number of days to the date object.
     *
     * @param {number} day_count
     */
    addDays(day_count) {
        let date = new Date(
            this.date.getFullYear(),
            this.date.getMonth(),
            this.date.getDate() + day_count,
            this.date.getHours(),
            this.date.getMinutes(),
            this.date.getSeconds(),
            this.date.getMilliseconds()
        );
        return new AdvancedDate(date);
    }

    /**
     * Subtract the specified number of days to the date object.
     *
     * @param {number} day_count
     */
    subDays(day_count) {
        let date = new Date(
            this.date.getFullYear(),
            this.date.getMonth(),
            this.date.getDate() - day_count,
            this.date.getHours(),
            this.date.getMinutes(),
            this.date.getSeconds(),
            this.date.getMilliseconds()
        );
        return new AdvancedDate(date);
    }

    /**
     * Add the specified number of months to the date object.
     *
     * @param {number} month_count
     */
    addMonths(month_count) {
        let date = new Date(
            this.date.getFullYear(),
            this.date.getMonth() + month_count,
            this.date.getDate(),
            this.date.getHours(),
            this.date.getMinutes(),
            this.date.getSeconds(),
            this.date.getMilliseconds()
        );
        return new AdvancedDate(date);
    }

    /**
     * Subtract the specified number of months to the date object.
     *
     * @param {number} month_count
     */
    subMonths(month_count) {
        let date = new Date(
            this.date.getFullYear(),
            this.date.getMonth() - month_count,
            this.date.getDate(),
            this.date.getHours(),
            this.date.getMinutes(),
            this.date.getSeconds(),
            this.date.getMilliseconds()
        );
        return new AdvancedDate(date);
    }

    /**
     * Checks if current date is in the same day as the passed date.
     *
     * @param {AdvancedDate} other_date
     * @returns {boolean}
     */
    hasSameDayAs(other_date) {
        return this.hasSameMonthAs(other_date) && this.date.getDate() === other_date.getDate();
    }

    /**
     * Checks if current date is in the same month as the passed date. Not necessarily the same day.
     *
     * @param {AdvancedDate} other_date
     * @returns {boolean}
     */
    hasSameMonthAs(other_date) {
        return this.date.getFullYear() === other_date.getFullYear() &&
            this.date.getMonth() === other_date.getMonth();
    }

    /**
     * Checks if current date has the same weekday as the passed date. Not necessarily the same day, month or year.
     *
     * @param {AdvancedDate} other_date
     * @returns {boolean}
     */
    hasSameWeekDayAs(other_date) {
        return this.date.getDay() === other_date.getDay();
    }

    /**
     * Checks if the current date is between the two passed dates.
     *
     * @param {AdvancedDate} other_date1
     * @param {AdvancedDate} other_date2
     */
    isBetween(other_date1, other_date2) {
        return (this.isAfter(other_date1) || this.hasSameDayAs(other_date1)) &&
            (this.isBefore(other_date2) || this.hasSameDayAs(other_date2));
    }

    /**
     * Checks if current date is after a given date.
     *
     * @param {AdvancedDate} other_date
     * @returns {boolean}
     */
    isAfter(other_date) {
        return this.getTime() > other_date.getTime();
    }

    /**
     * Checks if the current date is before a given date
     * @param {AdvancedDate} other_date
     * @returns {boolean}
     */
    isBefore(other_date) {
        return this.getTime() < other_date.getTime();
    }

    /**
     * Returns the internal representation of Date
     * @returns {Date}
     */
    toDate() {
        return this.date;
    }
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