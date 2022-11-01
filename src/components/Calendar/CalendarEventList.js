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
                            <tr>
                                <td className={'event'}>Evento 1</td>
                            </tr>
                            <tr>
                                <td className={'event'}>Evento 2</td>
                            </tr>
                            <tr>
                                <td className={'event'}>Evento 3</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </td>
        );
    }
}