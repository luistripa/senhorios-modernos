
import "./css/EventList.css"
import {Table, Chip, ListItem, ListItemText, Typography, TableBody, TableRow, Button, Badge} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import moment from "moment";
import {AccessTime, Build, CleaningServices, People, QuestionMark, Search} from "@mui/icons-material";
import {hasSameDay} from "./utils/date_utils";
import Avatar from "@mui/material/Avatar";

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
                    <Avatar sx={{width: "30px", height: "30px", backgroundColor: "darkorchid", marginRight: "5px"}}>
                        <CleaningServices/>
                    </Avatar>
                )
            case "MAINTENANCE":
                return (
                    <Avatar sx={{width: "30px", height: "30px", backgroundColor: "green", marginRight: "5px"}}>
                        <Build/>
                    </Avatar>
                );
            case "OCCUPATION":
                return (
                    <Avatar sx={{width: "30px", height: "30px", backgroundColor: "red", marginRight: "5px"}}>
                        <People/>
                    </Avatar>
                );
            default:
                return (
                    <Avatar sx={{width: "30px", height: "30px", backgroundColor: "gray", marginRight: "5px"}}>
                        <AccessTime/>
                    </Avatar>
                );
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

    const createTodayEventSecondary = (event) => {
        let description = props.eventDescriptionDetail(event)
        if (description !== "") {
            return event.startDate.format("HH:mm") + " - " + props.eventDescriptionDetail(event);
        }
        return event.startDate.format("HH:mm")
    }

    const createFinishTodayEventSecondary = (event) => {
        let description = props.eventDescriptionDetail(event)
        if (description !== "") {
            return "ends at " + event.endDate.format("HH:mm") + " - " + props.eventDescriptionDetail(event);
        }
        return "ends at " + event.endDate.format("HH:mm")
    }

    const createAllDayEventSecondary = (event) => {
        let description = props.eventDescriptionDetail(event)
        if (description !== "") {
            return "all day - " + props.eventDescriptionDetail(event);
        }
        return "all day"
    }

    let separator = "";
    if (allDayEvents.length > 0 || finishTodayEvents.length > 0)
        separator = <hr/>

    return (
        <td className={'calendar-event-list-container'}>
            <div className={"event-controls-container"}>
                <Typography padding={0} color={"white"} overflow={"hidden"} textOverflow={"ellipsis"} whiteSpace={"nowrap"}>
                    {props.selectedDay.format("ddd MMM Do")}
                </Typography>
                <Button className={"event-add-button"}
                        size={"small"} variant={"contained"} color={"primary"}
                        onClick={() => props.handleCreate(props.selectedDay.hours(moment().hours()).minutes(moment().minutes()).seconds(moment().seconds()))}>
                    <AddIcon fontSize={"small"}/>
                </Button>

            </div>
            <div className={'list'}>
                {allDayEvents.map(event => (
                    <ListItem key={event.id} className={"event"} onClick={() => props.handleDetail(event)}>
                        {createChipByEventType(event.type)}
                        <ListItemText
                            primary={
                                <Typography component={"p"} fontWeight={"bold"} color={"white"} overflow={"hidden"}
                                            textOverflow={"ellipsis"} whiteSpace={"nowrap"} padding={0}>
                                    {event.name}
                                </Typography>
                            }
                            primaryTypographyProps={{color: "white", padding: "0"}}
                            secondary={createAllDayEventSecondary(event)}
                            secondaryTypographyProps={{color: "white", padding: "0"}}
                            title={event.name}
                        />
                    </ListItem>
                ))}
                {finishTodayEvents.map(event => (
                    <ListItem key={event.id} className={"event"} onClick={() => props.handleDetail(event)}>
                        {createChipByEventType(event.type)}
                        <ListItemText
                            primary={
                                <Typography component={"p"} fontWeight={"bold"} color={"white"} overflow={"hidden"}
                                            textOverflow={"ellipsis"} whiteSpace={"nowrap"} padding={0}>
                                    {event.name}
                                </Typography>
                            }
                            primaryTypographyProps={{color: "white", padding: "0"}}
                            secondary={createFinishTodayEventSecondary(event)}
                            secondaryTypographyProps={{color: "white", padding: "0"}}
                            title={event.name}
                        />
                    </ListItem>
                ))}

                {separator}

                {todayEvents.map(event => (
                    <ListItem key={event.id} className={"event"} onClick={() => props.handleDetail(event)}>
                        {createChipByEventType(event.type)}
                        <ListItemText
                            primary={
                                <Typography component={"p"} fontWeight={"bold"} color={"white"} overflow={"hidden"}
                                            textOverflow={"ellipsis"} whiteSpace={"nowrap"} padding={0}>
                                    {event.name}
                                </Typography>
                            }
                            secondary={createTodayEventSecondary(event)}
                            secondaryTypographyProps={{color: "white", padding: "0"}}
                            title={event.name}
                        />
                    </ListItem>
                ))}

                {allDayEvents.length + finishTodayEvents.length + todayEvents.length === 0 ? (
                    <div style={{width: "100%", marginTop: "5%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <Typography color={"lightgray"} display={"flex"} justifyContent={"center"}>
                            <Search/>
                            <span>No events today...</span>
                        </Typography>
                    </div>
                ) : undefined }
            </div>
        </td>
    );
}