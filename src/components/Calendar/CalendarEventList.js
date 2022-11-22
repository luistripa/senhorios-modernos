
import "./css/EventList.css"
import {Table, Chip, ListItem, ListItemText, Typography, TableBody, TableRow} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import moment from "moment";
import {AccessTime, Build, CleaningServices, People, QuestionMark} from "@mui/icons-material";
import {hasSameDay} from "./utils/date_utils";

export default function CalendarEventList(props) {

    /**
     * Creates a chip based on event type
     *
     * @param {string} eventType
     * @returns {JSX.Element}
     */
    const createChipByEventType = (eventType) => {
        switch (eventType) {
            case "CLEANING":
                return (
                    <Chip color={"secondary"}
                          label={<CleaningServices sx={{fontSize: "18px"}}/>}
                          size={"small"} sx={{display: "flex", alignItems: "center", justifyContent: "center", marginRight: "5px"}}
                    />
                )
            case "MAINTENANCE":
                return (
                    <Chip color={"success"}
                          label={<Build sx={{fontSize: "18px"}}/>}
                          size={"small"} sx={{display: "flex", alignItems: "center", justifyContent: "center", marginRight: "5px"}}
                    />
                );
            case "OCCUPATION":
                return <Chip color={"error"} label={<People fontSize={"small"}/>} size={"small"} sx={{display: "flex", alignItems: "center", justifyContent: "center", marginRight: "5px"}}/>;
            default:
                return <Chip color={"secondary"} label={<AccessTime/>} size={"small"} sx={{display: "flex", alignItems: "center", justifyContent: "center", marginRight: "5px"}}/>;
        }
    }

    const buildEventItemSecondary = (event) => {
        return (
            <Typography component={"p"} fontSize={12} color={"white"}>
                {event.startDate.hour().toString().padStart(2, "0")}:{event.startDate.minute().toString().padStart(2, "0")}
            </Typography>
        );
    }

    let todayAtMidnight = props.selectedDay.clone().hour(0).minute(0).second(0).millisecond(0);
    let todayMaxDate = props.selectedDay.clone().hour(23).minute(59).second(59).millisecond(999);

    let allDayEvents = [];
    let finishTodayEvents = [];
    let todayEvents = [];


    props.events.forEach(event => {
        if (event.repeat === "NO") {
            if (event.startDate < todayAtMidnight) {
                if (event.endDate <= todayMaxDate)
                    finishTodayEvents.push(event);
                else
                    allDayEvents.push(event);
            } else {
                todayEvents.push(event);
            }
        } else {
            if (hasSameDay(event.startDate, event.endDate)) { // Internal event (with repeat)
                todayEvents.push(event);

            } else {
                if (event.startDate < todayAtMidnight) {
                    if (event.endDate <= todayMaxDate)
                        finishTodayEvents.push(event);
                    else
                        allDayEvents.push(event);
                } else {
                    todayEvents.push(event);
                }
            }
        }
    })

    todayEvents.sort((a, b) => {
        if (a.startDate > b.startDate)
            return 1;
        else if (a.startDate < b.startDate)
            return -1;
        else
            return 0
    })

    let separator = "";
    if (allDayEvents.length > 0 || finishTodayEvents.length > 0)
        separator = <hr/>

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
                        {allDayEvents.map(event => (
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
                                        secondary={"all day"}
                                        secondaryTypographyProps={{style: {color: "white"}}}
                                        title={event.name}
                                    />
                                </ListItem>
                            </TableRow>
                        ))}
                        {finishTodayEvents.map(event => (
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
                                        secondary={"ends at " + event.endDate.format("HH:mm")}
                                        secondaryTypographyProps={{style: {color: "white"}}}
                                        title={event.name}
                                    />
                                </ListItem>
                            </TableRow>
                        ))}

                        {separator}

                        {todayEvents.map(event => (
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
                                        secondary={event.startDate.format("HH:mm")}
                                        secondaryTypographyProps={{style: {color: "white"}}}
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