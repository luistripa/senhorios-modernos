import {Component} from "react";

import "./css/CalendarBoard.css"
import CalendarBoard from "./CalendarBoard";
import CalendarEventList from "./CalendarEventList";

import "./css/Calendar.css"


export default class Calendar extends Component {

    /**
     * Event handler for day select in the calendar board.
     *
     * @param {AdvancedDate} day The selected day
     * @param {*[]} events The events for the selected day. May be out of order.
     */
    selectDay(day, events) {

    }

    render() {
        return (
            <div className={'calendar-component-container'}>
                <table className={'calendar-component-table'}>
                    <tbody>
                    <tr style={{width: "100%"}}>
                        <CalendarBoard events={this.props.events} onDaySelect={() => this.selectDay()}/>
                        <CalendarEventList/>
                    </tr>
                    </tbody>
                </table>
            </div>

        )
    }
}
