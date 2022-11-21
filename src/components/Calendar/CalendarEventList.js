
import "./css/EventList.css"
import {Table, Chip, ListItem, ListItemText, Typography, TableBody, TableRow, Button, Modal, Box} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default function CalendarEventList(props) {

    /**
     * Creates a chip based on event type
     *
     * @param {string} eventType
     * @returns {JSX.Element}
     */
    const createChipByEventType = (eventType) => {
        switch (eventType) {
            case "MAINTENANCE":
                return (<Chip color={"success"} label={"M"} size={"small"} sx={{marginRight: "5px"}}/>);
            case "OCCUPATION":
                return <Chip color={"error"} label={"O"} size={"small"} sx={{marginRight: "5px"}}/>;
            default:
                return <Chip color={"secondary"} label={"?"} size={"small"} sx={{marginRight: "5px"}}/>;
        }
    }

    const buildEventItemSecondary = (event) => {
        return (
            <Typography component={"p"} fontSize={12} color={"white"}>
                {event.startDate.hour().toString().padStart(2, "0")}:{event.startDate.minute().toString().padStart(2, "0")}
            </Typography>
        );
    }

    return (
        <td className={'calendar-event-list-container'}>
            <div className={"event-controls-container"}>
                <div style={{color: "white", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{props.selectedDay.format("ddd MMM Do")}</div>
                <Chip className={"event-add-button"}
                      label={<AddIcon fontSize={"small"}/>}
                      size={"medium"}
                      onClick={props.handleCreate}
                />
            </div>
            <div className={'list'}>
                <Table sx={{tableLayout: "fixed"}}>
                    <TableBody>
                        {props.events.map(event => (
                            <TableRow key={event.id} hover={true}>
                                <ListItem className={"event"} component={"td"} onClick={() => props.handleDetail(event)}>
                                    {createChipByEventType(event.type)}
                                    <ListItemText
                                        primary={
                                            <Typography
                                                component={"p"}
                                                color={"white"}
                                                sx={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}
                                            >
                                                {event.name}
                                            </Typography>
                                        }
                                        secondary={buildEventItemSecondary(event)}
                                        title={event.name}
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