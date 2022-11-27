import {Component, useEffect, useState} from "react";
import {
    Box, Button,
    Chip, CircularProgress, Container,
    Dialog,
    DialogActions,
    DialogContent,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import {AccessTime, ArrowForward, Build, CleaningServices, People, QuestionMark} from "@mui/icons-material";
import {DatePicker, DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import moment from "moment/moment";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";


export function NewEventDialog(props) {

    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventType, setEventType] = useState("GENERIC");
    const [eventStartDate, setEventStartDate] = useState(moment().second(0).millisecond(0));
    const [eventEndDate, setEventEndDate] = useState(moment().add(1, "hour").second(0).millisecond(0));
    const [eventRepeat, setEventRepeat] = useState("NO");
    const [eventRepeatUntil, setEventRepeatUntil] = useState(null);

    useEffect(() => {
        setEventName(props.event ? props.event.name : "");
        setEventDescription(props.event ? props.event.description : "");
        setEventType(props.event ? props.event.type : "GENERIC");
        setEventStartDate(props.event ? props.event.startDate : moment().second(0).millisecond(0));
        setEventEndDate(props.event ? props.event.endDate : moment().add(1, "hour").second(0).millisecond(0));
        setEventRepeat(props.event ? props.event.repeat : "NO");
        setEventRepeatUntil(props.event ? props.event.repeatUntil : "");
    }, [props.event])

    const [createProcessing, setCreateProcessing] = useState(false);

    const handleEventNameChange = (event) => {
        setEventName(event.target.value);
    }

    const handleEventDescriptionChange = (event) => {
        setEventDescription(event.target.value);
    }

    const handleEventTypeChange = (event) => {
        setEventType(event.target.value);
    }

    const handleEventStartDateChange = (date) => {
        setEventStartDate(date);
    }

    const handleEventEndDateChange = (date) => {
        setEventEndDate(date);
    }

    const handleEventRepeatChange = (event) => {
        setEventRepeat(event.target.value);
    }

    const handleEventRepeatUntilChange = (date) => {
        setEventRepeatUntil(date);
    }

    const handleCreate = () => {
        let eventData = {
            name: eventName,
            description: eventDescription,
            type: eventType,
            startDate: eventStartDate,
            endDate: eventEndDate,
            repeat: eventRepeat,
            repeatUntil: eventRepeatUntil
        }

        setCreateProcessing(true);

        new Promise((resolve, reject) => props.handleCreate(resolve, reject, eventData))
            .then(handleCancel)
            .catch(handleCreateFailed)

    }

    const handleCreateFailed = () => {
        setCreateProcessing(false);
    }

    const handleCancel = () => {
        setTimeout(() => { // Avoids setting the button back to 'Create' just before closing the dialog
            setCreateProcessing(false);
        }, 200)
        props.onClose();
    }

    let createButton;
    if (createProcessing) createButton = <Box sx={{display: "flex"}}><CircularProgress color={"inherit"} size={20}/></Box>;
    else createButton = "Create";

    return (
        <Dialog open={props.open}
                sx={{position: "absolute"}}
                onClose={() => props.handleCancel()}
                scroll={"paper"}
                fullWidth

        >
            <DialogContent>
                <Container>
                    <Typography variant={"h4"}>Create new event</Typography>
                    <hr/>
                    <br/>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField label={"Event Name"}
                                       onChange={handleEventNameChange}
                                       variant={"outlined"} fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label={"Description"}
                                       onChange={handleEventDescriptionChange}
                                       variant={"outlined"} fullWidth multiline rows={4}/>
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel id="event-type-label">Event Type</InputLabel>
                            <Select labelId={"event-type-label"}
                                    value={eventType}
                                    onChange={handleEventTypeChange}
                                    SelectDisplayProps={{style: {display: "flex", alignItems: "center"}}}
                                    variant={"outlined"}
                                    fullWidth>
                                <MenuItem value={"GENERIC"}><AccessTime/><span> Generic</span></MenuItem>
                                <MenuItem value={"CLEANING"}><CleaningServices/><span> Cleaning</span></MenuItem>
                                <MenuItem value={"MAINTENANCE"}><Build/><span> Maintenance</span></MenuItem>
                                <MenuItem value={"OCCUPATION"}><People/><span> Occupation</span></MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DateTimePicker label={"Start Date&Time"}
                                                inputFormat={"DD/MM/YYYY HH:mm"}
                                                onChange={handleEventStartDateChange}
                                                value={eventStartDate}
                                                renderInput={(params) => <TextField {...params}/>}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DateTimePicker label={"End Date&Time"}
                                                inputFormat={"DD/MM/YYYY HH:mm"}
                                                onChange={handleEventEndDateChange}
                                                value={eventEndDate}
                                                renderInput={(params) => <TextField {...params}/>}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel id="event-repeat-label">Repeat</InputLabel>
                            <Select labelId={"event-repeat-label"}
                                    value={eventRepeat}
                                    onChange={handleEventRepeatChange}
                                    SelectDisplayProps={{style: {display: "flex", alignItems: "center"}}}
                                    variant={"outlined"}
                                    fullWidth>
                                <MenuItem value={"NO"}>Never</MenuItem>
                                <MenuItem value={"DAILY"}>Daily</MenuItem>
                                <MenuItem value={"WEEKLY"}>Weekly</MenuItem>
                                <MenuItem value={"MONTHLY"}>Monthly</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} display={eventRepeat === "NO" ? "none" : "block"}>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DatePicker label={"Repeat Until"}
                                            inputFormat={"DD/MM/YYYY"}
                                            onChange={handleEventRepeatUntilChange}
                                            value={eventRepeatUntil}
                                            renderInput={(params) => <TextField {...params}/>}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                </Container>
            </DialogContent>
            <DialogActions>
                <Button variant={"contained"} size={"small"} color={"inherit"} onClick={handleCancel}>Cancel</Button>
                <Button variant={"contained"} size={"small"} color={"primary"} onClick={handleCreate}>{createButton}</Button>
            </DialogActions>

        </Dialog>
    );
}