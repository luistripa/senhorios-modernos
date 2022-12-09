import {getDayEvents, hasSameDay, hasSameMonth} from "./utils/date_utils";
import moment from "moment";

export function Day(props) {

    const handleSelectDay = () => {
        props.onDaySelect(props.date);
    }

    let day_class = "day";

    if (props.selectedDay && hasSameDay(props.date, props.selectedDay))
        day_class += " selected";
    else if (!hasSameMonth(props.date, props.currentMonth))
        day_class += " other-month";

    // If day is today
    if (hasSameDay(props.date, moment()))
        day_class += " today";

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