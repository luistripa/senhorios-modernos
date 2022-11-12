import {Component} from "react";

import "./css/EventList.css"
import {Table} from "react-bootstrap";

export default class CalendarEventList extends Component {

    render() {
        return (
            <td className={'calendar-event-list-container'}>
                <div className={'list'}>
                    <Table striped hover>
                        <tbody>
                            {this.props.events.map(event => (
                                <tr key={event.id}>
                                    <td className={'event'}>{event.name} - {event.startDate.toHoursAndMinutes()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </td>
        );
    }
}