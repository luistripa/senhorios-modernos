export class AdvancedDate {

    /**
     * Creates an AdvancedDate object
     *
     * @param {number} [year]
     * @param {number} [month]
     * @param {number} [day]
     * @param {number} [hours]
     * @param {number} [minutes]
     * @param {number} [seconds]
     * @param {number} [milliseconds]
     */
    constructor(year, month, day, hours, minutes, seconds, milliseconds) {
        if (year === undefined || month === undefined || day === undefined || hours === undefined ||
            minutes === undefined || !seconds === undefined || milliseconds === undefined)
            this.date = new Date()
        else
            this.date = new Date(year, month, day, hours, minutes, seconds, milliseconds)
    }

    /**
     * Creates a new AdvancedDate object using an existing Data object.
     *
     * @param {Date} date
     */
    static fromDate(date) {
        return new AdvancedDate(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
            date.getMilliseconds()
        );
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
        return AdvancedDate.fromDate(date);
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
        return AdvancedDate.fromDate(date);
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
        return AdvancedDate.fromDate(date);
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
        return AdvancedDate.fromDate(date);
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

    toHoursAndMinutes() {
        return `${this.getHours()}:${this.getMinutes().toString().padStart(2, "0")}`
    }

    toString() {
        return this.date.toString();
    }
}