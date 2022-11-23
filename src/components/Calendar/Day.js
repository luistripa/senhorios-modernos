import {getDayEvents, hasSameDay, hasSameMonth} from "./utils/date_utils";
import {useEffect, useState} from "react";
import moment from "moment";


export function Day(props) {

    const handleSelectDay = () => {
        props.onDaySelect(props.date);
    }

    let day_class;

    if (props.selectedDay && hasSameDay(props.date, props.selectedDay))
        day_class = "day selected";
    else if (!hasSameMonth(props.date, props.currentMonth))
        day_class = "day other-month";
    else
        day_class = "day";

    let events_line = "no_events";

    if (getDayEvents(props.date, props.events).length !== 0)
        events_line = "with-events";

    return (
        <div className={day_class} onClick={handleSelectDay}>
            <div className={'content'}>
                <p className={'day-text'}>{props.date.date()}</p>
                <div className={events_line}></div>
            </div>
        </div>
    )
}

export default Day;