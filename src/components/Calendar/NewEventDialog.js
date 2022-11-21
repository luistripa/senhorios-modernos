import {Component, useState} from "react";
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
import {ArrowForward, Build, People, QuestionMark} from "@mui/icons-material";


export function NewEventDialog(props) {

    const [eventType, setEventType] = useState('GENERIC');

    const [createProcessing, setCreateProcessing] = useState(false);

    const handleEventTypeChange = (event) => {
        setEventType(event.target.value);
    }

    const handleCreate = () => {
        let eventData = {
            name: document.getElementById("event-name").value,
            description: document.getElementById("event-description").value,
            type: eventType,
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
                <Typography variant={"h6"}>New Event</Typography>
                <hr/>
                <form>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField id={"event-name"} label={"Event Name"} variant={"outlined"} fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id={"event-description"} label={"Description"} variant={"outlined"} fullWidth multiline rows={4}/>
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel id="event-type-label">Event Type</InputLabel>
                            <Select id={"event-type"}
                                    labelId={"event-type-label"}
                                    value={eventType}
                                    onChange={handleEventTypeChange}
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
                <Chip label={"Cancel"} onClick={handleCancel}/>
                <Chip label={createButton} onClick={handleCreate} color={"primary"}/>
            </DialogActions>

        </Dialog>
    );
}