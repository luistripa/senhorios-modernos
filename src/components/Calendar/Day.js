import {Component} from "react";
import {getDayEvents, hasSameDay, hasSameMonth} from "./utils/date_utils";


class Day extends Component {

    selectDay() {
        this.props.processEvent(
            {
                type: "SELECT",
                date: this.props.date,
            }
        )
    }

    render() {
        let day_class;

        if (this.props.selectedDay && hasSameDay(this.props.date, this.props.selectedDay))
            day_class = "day selected";
        else if (!hasSameMonth(this.props.date, this.props.currentMonth))
            day_class = "day other-month";
        else
            day_class = "day";

        let events_line = "no_events";

        if (getDayEvents(this.props.date, this.props.events).length !== 0)
            events_line = "with-events";

        return (
            <div className={day_class} onClick={() => this.selectDay()}>
                <div className={'content'}>
                    <p className={'day-text'}>{this.props.date.date()}</p>
                    <div className={events_line}></div>
                </div>
            </div>
        )
    }
}

export default Day;