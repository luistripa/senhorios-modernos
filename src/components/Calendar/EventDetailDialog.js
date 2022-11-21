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
import {Build, People, QuestionMark} from "@mui/icons-material";


export default function EventDetailDialog(props) {

    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventType, setEventType] = useState("");

    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

    const [editProcessing, setEditProcessing] = useState(false)
    const [deleteProcessing, setDeleteProcessing] = useState(false)

    useEffect(() => {
        setEventName(props.event ? props.event.name : "");
        setEventDescription(props.event ? props.event.description : "");
        setEventType(props.event ? props.event.type : "");
    }, [props.event])

    const handleEdit = () => {
        let eventData = {
            name: document.getElementById("event-name").value,
            description: document.getElementById("event-description").value,
            type: eventType,
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
        setDeleteConfirmOpen(false);
        props.onClose();
    }

    const handleEditFailed = () => {
        setEditProcessing(false);
    }

    const handleDeleteFailed = () => {
        setDeleteProcessing(false);
        setDeleteConfirmOpen(false);
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
                                <TextField id={"event-name"}
                                           label={"Event Name"}
                                           value={eventName}
                                           onChange={event => setEventName(event.target.value)}
                                           variant={"outlined"} fullWidth/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField id={"event-description"}
                                           label={"Description"}
                                           value={eventDescription}
                                           onChange={event => setEventDescription(event.target.value)}
                                           variant={"outlined"} fullWidth multiline rows={4}/>
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel id="event-type-label">Event Type</InputLabel>
                                <Select id={"event-type"}
                                        labelId={"event-type-label"}
                                        value={eventType}
                                        onChange={event => setEventType(event.target.value)}
                                        variant={"outlined"}
                                        fullWidth>
                                    <MenuItem value={"GENERIC"}><QuestionMark/> Generic</MenuItem>
                                    <MenuItem value={"MAINTENANCE"}><Build/> Maintenance</MenuItem>
                                    <MenuItem value={"OCCUPATION"}><People/> Occupation</MenuItem>
                                </Select>
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
                          onClick={handleCancel}
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