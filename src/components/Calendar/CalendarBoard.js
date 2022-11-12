import {Component} from "react";
import DayLine from "./DayLine";
import {getFirstDayOfCalendar, hasSameMonth} from "./utils/date_utils";

import "./css/CalendarBoard.css"
import moment from "moment";

export default class CalendarBoard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentDate: moment(), // Represents the current date (a.k.a.: Today)
            selectedDay: moment(),
            currentMonth: moment().date(15), // Used just to identify the current month. No operations should be done on this state
            events: this.props.events
        }
    }

    previousMonth() {
        this.setState({
            selectedDay: undefined,
            currentMonth: this.state.currentMonth.clone().subtract(1, "month"),
        });
    }

    nextMonth() {
        this.setState({
            selectedDay: undefined,
            currentMonth: this.state.currentMonth.clone().add(1, "month"),
        });
    }

    processEvent(event) {
        if (event.type === "SELECT") {
            let date = event.date
            if (hasSameMonth(this.state.currentMonth, date)) {
                this.setState({
                    selectedDay: date.clone()
                })
            } else {
                this.setState({
                    selectedDay: date.clone(),
                    currentMonth: date.clone()
                });
            }
            this.props.onDaySelect(date.clone(), [])
        }
    }

    render() {
        let firstDayOfCalendar = getFirstDayOfCalendar(this.state.currentMonth);

        return (
            <td className={"calendar-board-container"}>
                <div className={"calendar-top-controls-container"}>
                    <div className={'calendar-month-control-container'} onClick={() => this.previousMonth()}>-</div>
                    <div className={'calendar-current-month-container'}>
                        <div className={'month-name'}>{this.state.currentMonth.startOf("month").format("MMMM")}</div>
                        <div className={'month-year'}>{this.state.currentMonth.year()}</div>
                    </div>
                    <div className={'calendar-month-control-container'} onClick={() => this.nextMonth()}>+</div>
                </div>
                <div className={"calendar-weekdays-container"}>
                    <div className={"weekday"}><div className={'content'}>Mon.</div></div>
                    <div className={"weekday"}><div className={'content'}>Tue.</div></div>
                    <div className={"weekday"}><div className={'content'}>Wed.</div></div>
                    <div className={"weekday"}><div className={'content'}>Thu.</div></div>
                    <div className={"weekday"}><div className={'content'}>Fri.</div></div>
                    <div className={"weekday"}><div className={'content'}>Sat.</div></div>
                    <div className={"weekday"}><div className={'content'}>Sun.</div></div>
                </div>
                <div className={"calendar-days-container"}>
                    <DayLine
                        currentMonth={this.state.currentMonth}
                        events={this.state.events}
                        startDay={firstDayOfCalendar}
                        selectedDay={this.state.selectedDay}
                        processEvent={(event) => this.processEvent(event)}/>
                    <DayLine
                        currentMonth={this.state.currentMonth}
                        events={this.state.events}
                        startDay={firstDayOfCalendar.clone().add(7, "day")}
                        selectedDay={this.state.selectedDay}
                        processEvent={(event) => this.processEvent(event)}/>
                    <DayLine
                        currentMonth={this.state.currentMonth}
                        events={this.state.events}
                        startDay={firstDayOfCalendar.clone().add(14, "day")}
                        selectedDay={this.state.selectedDay}
                        processEvent={(event) => this.processEvent(event)}/>
                    <DayLine
                        currentMonth={this.state.currentMonth}
                        events={this.state.events}
                        startDay={firstDayOfCalendar.clone().add(21, "day")}
                        selectedDay={this.state.selectedDay}
                        processEvent={(event) => this.processEvent(event)}/>
                    <DayLine
                        currentMonth={this.state.currentMonth}
                        events={this.state.events}
                        startDay={firstDayOfCalendar.clone().add(28, "day")}
                        selectedDay={this.state.selectedDay}
                        processEvent={(event) => this.processEvent(event)}/>
                    <DayLine
                        currentMonth={this.state.currentMonth}
                        events={this.state.events}
                        startDay={firstDayOfCalendar.clone().add(35, "day")}
                        selectedDay={this.state.selectedDay}
                        processEvent={(event) => this.processEvent(event)}/>
                </div>
            </td>
        )
    }
}
