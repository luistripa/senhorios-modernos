import {Component} from "react";
import DayLine from "./DayLine";
import {getFirstDayOfCalendar} from "./utils/date_utils";

import "./css/CalendarBoard.css"
import {AdvancedDate} from "./utils/AdvancedDate";

export default class CalendarBoard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentDate: new AdvancedDate(), // Represents the current day (a.k.a.: Today)
            selectedDay: new AdvancedDate(),
            currentMonth: new AdvancedDate().setDate(15), // Used just to identify the current month. No operations should be done on this state
            events: this.props.events
        }
    }

    previousMonth() {
        this.setState({
            selectedDay: undefined,
            currentMonth: this.state.currentMonth.subMonths(1)
        });
    }

    nextMonth() {
        this.setState({
            selectedDay: undefined,
            currentMonth: this.state.currentMonth.addMonths(1)
        });
    }

    processEvent(event) {
        if (event.type === "SELECT") {
            let date = event.date
            if (this.state.currentMonth.hasSameMonthAs(date)) {
                let selectedDate = AdvancedDate.fromDate(date);
                this.setState({
                    selectedDay: selectedDate
                })
            } else {
                this.setState({
                    selectedDay: AdvancedDate.fromDate(date),
                    currentMonth: AdvancedDate.fromDate(date)
                });
            }
            this.props.onDaySelect(date, [])
        }
    }

    render() {
        let firstDayOfCalendar = getFirstDayOfCalendar(this.state.currentMonth);

        return (
            <td className={"calendar-board-container"}>
                <div className={"calendar-top-controls-container"}>
                    <div className={'calendar-month-control-container'} onClick={() => this.previousMonth()}>-</div>
                    <div className={'calendar-current-month-container'}>
                        <div className={'month-name'}>{this.state.currentMonth.getMonthName()}</div>
                        <div className={'month-year'}>{this.state.currentMonth.getFullYear()}</div>
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
                        startDay={firstDayOfCalendar.addDays(7)}
                        selectedDay={this.state.selectedDay}
                        processEvent={(event) => this.processEvent(event)}/>
                    <DayLine
                        currentMonth={this.state.currentMonth}
                        events={this.state.events}
                        startDay={firstDayOfCalendar.addDays(14)}
                        selectedDay={this.state.selectedDay}
                        processEvent={(event) => this.processEvent(event)}/>
                    <DayLine
                        currentMonth={this.state.currentMonth}
                        events={this.state.events}
                        startDay={firstDayOfCalendar.addDays(21)}
                        selectedDay={this.state.selectedDay}
                        processEvent={(event) => this.processEvent(event)}/>
                    <DayLine
                        currentMonth={this.state.currentMonth}
                        events={this.state.events}
                        startDay={firstDayOfCalendar.addDays(28)}
                        selectedDay={this.state.selectedDay}
                        processEvent={(event) => this.processEvent(event)}/>
                    <DayLine
                        currentMonth={this.state.currentMonth}
                        events={this.state.events}
                        startDay={firstDayOfCalendar.addDays(35)}
                        selectedDay={this.state.selectedDay}
                        processEvent={(event) => this.processEvent(event)}/>
                </div>
            </td>
        )
    }
}
