import {useEffect, useState} from "react";
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
import {AccessTime, Build, CleaningServices, People, QuestionMark} from "@mui/icons-material";
import moment from "moment";
import {DatePicker, DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";


export default function EventDetailDialog(props) {

    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [editProcessing, setEditProcessing] = useState(false)
    const [deleteProcessing, setDeleteProcessing] = useState(false)

    const [eventHouseId, setEventHouseId] = useState("");
    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventType, setEventType] = useState("GENERIC");
    const [eventStartDate, setEventStartDate] = useState(moment().second(0).millisecond(0));
    const [eventEndDate, setEventEndDate] = useState(moment().add(1, "hour").second(0).millisecond(0));
    const [eventRepeat, setEventRepeat] = useState("NO");
    const [eventRepeatUntil, setEventRepeatUntil] = useState(null);

    useEffect(() => {
        setEventHouseId(props.event ? props.event.houseId : props.selectedHouse ? props.selectedHouse : "");
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
            houseId: eventHouseId,
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

    const handleEventHouseIdChange = (event) => {
        setEventHouseId(event.target.value);
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
                    <Container maxWidth={"sm"}>
                        <Typography variant={"h4"}>Edit event</Typography>
                        <hr/>
                        <br/>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <InputLabel id="event-house-label">House</InputLabel>
                                <Select labelId={"event-house-label"}
                                        value={eventHouseId}
                                        onChange={handleEventHouseIdChange}
                                        SelectDisplayProps={{style: {display: "flex", alignItems: "center"}}}
                                        variant={"outlined"}
                                        disabled={props.selectedHouse !== undefined}
                                        fullWidth>
                                    {props.houseList.map(house => (
                                        <MenuItem key={house.id} value={house.id}>{house.name}</MenuItem>
                                    ))}
                                </Select>
                            </Grid>
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
                    <Button variant={"contained"} size={"small"} color={"inherit"} onClick={props.handleCancel}>Cancel</Button>
                    <Button variant={"contained"} size={"small"} color={"error"} onClick={() => setDeleteConfirmOpen(true)}>Delete</Button>
                    <Button variant={"contained"} size={"small"} color={"primary"} onClick={handleEdit}>{editButton}</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={deleteConfirmOpen}>
                <DialogContent>Are you sure you want to delete this event?</DialogContent>
                <DialogActions>
                    <Button variant={"contained"} size={"small"} color={"inherit"} onClick={handleConfirmDialogCancel}>Cancel</Button>
                    <Button variant={"contained"} size={"small"} color={"error"} onClick={handleDelete}>{deleteButton}</Button>
                </DialogActions>
            </Dialog>
        </>

    );
}