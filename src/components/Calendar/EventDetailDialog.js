import {useEffect, useState} from "react";
import {
    Box,
    Chip, CircularProgress,
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
import {AccessTime, Build, CleaningServices, People, QuestionMark} from "@mui/icons-material";
import moment from "moment";
import {DatePicker, DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";


export default function EventDetailDialog(props) {

    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [editProcessing, setEditProcessing] = useState(false)
    const [deleteProcessing, setDeleteProcessing] = useState(false)

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

    const handleEdit = () => {
        let eventData = {
            id: props.event.id,
            name: eventName,
            description: eventDescription,
            type: eventType,
            startDate: eventStartDate,
            endDate: eventEndDate,
            repeat: eventRepeat,
            repeatUntil: eventRepeatUntil
        }

        setEditProcessing(true);
        new Promise((resolve, reject) => props.handleEdit(resolve, reject, eventData))
            .then(handleCancel)
            .catch(handleEditFailed)
    }

    const handleDelete = () => {
        setDeleteProcessing(true);
        new Promise((resolve, reject) => props.handleDelete(resolve, reject, props.event))
            .then(handleCancel)
            .catch(handleDeleteFailed)
    }

    const handleCancel = () => {
        setTimeout(() => { // Avoids setting the button back to 'Edit' just before closing the dialog
            setEditProcessing(false);
        }, 200)
        handleConfirmDialogCancel();
        props.onClose();
    }

    const handleConfirmDialogCancel = () => {
        setDeleteConfirmOpen(false);
        setDeleteProcessing(false);
    }

    const handleEditFailed = () => {
        setEditProcessing(false);
    }

    const handleDeleteFailed = () => {
        setTimeout(() => setDeleteProcessing(false), 200);
        setDeleteConfirmOpen(false);
    }

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

    let editButton;
    if (editProcessing) editButton = <Box sx={{display: "flex"}}><CircularProgress color={"inherit"} size={20}/></Box>;
    else editButton = "Edit";

    let deleteButton;
    if (deleteProcessing) deleteButton = <Box sx={{display: "flex"}}><CircularProgress color={"inherit"} size={20}/></Box>;
    else deleteButton = "Yes";

    return (
        <>
            <Dialog open={props.open}
                    sx={{position: "absolute"}}
                    onClose={() => props.handleCancel()}
                    scroll={"paper"}
                    fullWidth
            >
                <DialogContent>
                    <Typography variant={"h6"}>New Event</Typography>
                    <hr/>
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField label={"Event Name"}
                                           value={eventName}
                                           onChange={handleEventNameChange}
                                           variant={"outlined"} fullWidth/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label={"Description"}
                                           value={eventDescription}
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
                                    <MenuItem value={"GENERIC"}><QuestionMark/><span> Generic</span></MenuItem>
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
                            <Grid item xs={12} visibility={eventRepeat === "NO" ? "hidden" : "visible"}>
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
                    </form>
                </DialogContent>
                <DialogActions>
                    <Chip label={"Cancel"} onClick={props.handleCancel}/>
                    <Chip label={"Delete"} onClick={() => setDeleteConfirmOpen(true)} color={"error"}/>
                    <Chip label={editButton}
                          onClick={handleEdit}
                          color={"primary"}
                    />
                </DialogActions>
            </Dialog>

            <Dialog open={deleteConfirmOpen}>
                <DialogContent>Are you sure you want to delete this event?</DialogContent>
                <DialogActions>
                    <Chip label={"Cancel"}
                          onClick={handleConfirmDialogCancel}
                    />
                    <Chip label={deleteButton}
                          color={"error"}
                          onClick={handleDelete}
                    />
                </DialogActions>
            </Dialog>
        </>

    );
}