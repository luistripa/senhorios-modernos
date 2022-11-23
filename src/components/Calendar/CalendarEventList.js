
import "./css/EventList.css"
import {Table, Chip, ListItem, ListItemText, Typography, TableBody, TableRow, Button, Badge} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import moment from "moment";
import {AccessTime, Build, CleaningServices, People, QuestionMark} from "@mui/icons-material";
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

    let separator = "";
    if (allDayEvents.length > 0 || finishTodayEvents.length > 0)
        separator = <hr/>

    return (
        <td className={'calendar-event-list-container'}>
            <div className={"event-controls-container"}>
                <Typography padding={0} color={"white"} overflow={"hidden"} textOverflow={"ellipsis"} whiteSpace={"nowrap"}>
                    {props.selectedDay.format("ddd MMM Do")}
                </Typography>
                <Button className={"event-add-button"} size={"small"} variant={"contained"} color={"primary"} onClick={props.handleCreate}>
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
                            secondary={"all day"}
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
                            secondary={"ends at " + event.endDate.format("HH:mm")}
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
                            secondary={event.startDate.format("HH:mm")}
                            secondaryTypographyProps={{color: "white", padding: "0"}}
                            title={event.name}
                        />
                    </ListItem>
                ))}
            </div>
        </td>
    );
}