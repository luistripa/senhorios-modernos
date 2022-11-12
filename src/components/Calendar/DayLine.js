import {Component} from "react";
import Day from "./Day";


class DayLine extends Component {

    render() {
        return (
            <div className={"day-line"}>
                <Day
                    currentMonth={this.props.currentMonth}
                    events={this.props.events}
                    date={this.props.startDay.clone()}
                    selectedDay={this.props.selectedDay}
                    processEvent={(event) => this.props.processEvent(event)}/>
                <Day
                    currentMonth={this.props.currentMonth}
                    events={this.props.events}
                    date={this.props.startDay.clone().add(1, "day")}
                    selectedDay={this.props.selectedDay}
                    processEvent={(event) => this.props.processEvent(event)}/>
                <Day
                    currentMonth={this.props.currentMonth}
                    events={this.props.events}
                    date={this.props.startDay.clone().add(2, "day")}
                    selectedDay={this.props.selectedDay}
                    processEvent={(event) => this.props.processEvent(event)}/>
                <Day
                    currentMonth={this.props.currentMonth}
                    events={this.props.events}
                    date={this.props.startDay.clone().add(3, "day")}
                    selectedDay={this.props.selectedDay}
                    processEvent={(event) => this.props.processEvent(event)}/>
                <Day
                    currentMonth={this.props.currentMonth}
                    events={this.props.events}
                    date={this.props.startDay.clone().add(4, "day")}
                    selectedDay={this.props.selectedDay}
                    processEvent={(event) => this.props.processEvent(event)}/>
                <Day
                    currentMonth={this.props.currentMonth}
                    events={this.props.events}
                    date={this.props.startDay.clone().add(5, "day")}
                    selectedDay={this.props.selectedDay}
                    processEvent={(event) => this.props.processEvent(event)}/>
                <Day
                    currentMonth={this.props.currentMonth}
                    events={this.props.events}
                    date={this.props.startDay.clone().add(6, "day")}
                    selectedDay={this.props.selectedDay}
                    processEvent={(event) => this.props.processEvent(event)}/>
            </div>
        )
    }
}

export default DayLine;