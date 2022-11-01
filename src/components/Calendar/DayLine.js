import {Component} from "react";
import Day from "./Day";


class DayLine extends Component {

    render() {
        return (
            <div className={"day-line"}>
                <Day
                    currentMonth={this.props.currentMonth}
                    events={this.props.events}
                    date={this.props.startDay}
                    selectedDay={this.props.selectedDay}
                    processEvent={(event) => this.props.processEvent(event)}/>
                <Day
                    currentMonth={this.props.currentMonth}
                    events={this.props.events}
                    date={this.props.startDay.addDays(1)}
                    selectedDay={this.props.selectedDay}
                    processEvent={(event) => this.props.processEvent(event)}/>
                <Day
                    currentMonth={this.props.currentMonth}
                    events={this.props.events}
                    date={this.props.startDay.addDays(2)}
                    selectedDay={this.props.selectedDay}
                    processEvent={(event) => this.props.processEvent(event)}/>
                <Day
                    currentMonth={this.props.currentMonth}
                    events={this.props.events}
                    date={this.props.startDay.addDays(3)}
                    selectedDay={this.props.selectedDay}
                    processEvent={(event) => this.props.processEvent(event)}/>
                <Day
                    currentMonth={this.props.currentMonth}
                    events={this.props.events}
                    date={this.props.startDay.addDays(4)}
                    selectedDay={this.props.selectedDay}
                    processEvent={(event) => this.props.processEvent(event)}/>
                <Day
                    currentMonth={this.props.currentMonth}
                    events={this.props.events}
                    date={this.props.startDay.addDays(5)}
                    selectedDay={this.props.selectedDay}
                    processEvent={(event) => this.props.processEvent(event)}/>
                <Day
                    currentMonth={this.props.currentMonth}
                    events={this.props.events}
                    date={this.props.startDay.addDays(6)}
                    selectedDay={this.props.selectedDay}
                    processEvent={(event) => this.props.processEvent(event)}/>
            </div>
        )
    }
}

export default DayLine;