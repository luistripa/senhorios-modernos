import {Component} from "react";

import "./css/EventList.css"
import {Table, Chip, ListItem, ListItemText, Typography, TableBody, TableRow} from "@mui/material";

export default class CalendarEventList extends Component {

    /**
     * Creates a chip based on event type
     *
     * @param {string} eventType
     * @returns {JSX.Element}
     */
    createChipByEventType(eventType) {
        switch (eventType) {
            case "MAINTENANCE":
                return (<Chip color={"success"} label={"M"} size={"small"} sx={{marginRight: "5px"}}/>);
            case "OCCUPATION":
                return <Chip color={"error"} label={"O"} size={"small"} sx={{marginRight: "5px"}}/>;
            default:
                return <Chip color={"secondary"} label={"?"} size={"small"} sx={{marginRight: "5px"}}/>;
        }
    }

    buildEventItemSecondary(event) {
        return (
            <Typography component={"p"} fontSize={12} color={"white"}>
                {event.startDate.hour().toString().padStart(2, "0")}:{event.startDate.minute().toString().padStart(2, "0")}
            </Typography>
        );
    }

    render() {
        return (
            <td className={'calendar-event-list-container'}>
                <div className={'list'}>
                    <Table>
                        <TableBody>
                            {this.props.events.map(event => (
                                <TableRow key={event.id} hover={true}>
                                    <ListItem component={"td"}>
                                        {this.createChipByEventType(event.type)}
                                        <ListItemText
                                            primary={<Typography component={"p"}  color={"white"}>{event.name}</Typography>}
                                            secondary={this.buildEventItemSecondary(event)}
                                        />
                                    </ListItem>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </td>
        );
    }
}