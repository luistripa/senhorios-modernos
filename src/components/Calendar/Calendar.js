import {Component} from "react";

import "./css/CalendarBoard.css"
import CalendarBoard from "./CalendarBoard";
import CalendarEventList from "./CalendarEventList";

import "./css/Calendar.css"
import {getDayEvents} from "./utils/date_utils";


export default class Calendar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedDayEvents: []
        }
    }

    /**
     * Event handler for day select in the calendar board.
     *
     * @param {moment.Moment} day The selected day
     */
    onDaySelect(day) {
        let dayEvents = getDayEvents(day, this.props.events);
        this.setState({selectedDayEvents: dayEvents})
    }

    render() {
        return (
            <div className={'calendar-component-container'}>
                <table className={'calendar-component-table'}>
                    <tbody>
                    <tr style={{width: "100%"}}>
                        <CalendarBoard
                            events={this.props.events}
                            onDaySelect={(date) => this.onDaySelect(date)}
                        />
                        <CalendarEventList events={this.state.selectedDayEvents}/>
                    </tr>
                    </tbody>
                </table>
            </div>

        )
    }
}
