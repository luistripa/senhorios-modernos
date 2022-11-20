import {Component, useState} from "react";
import {
    Chip,
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

    const handleEventTypeChange = (event) => {
        setEventType(event.target.value);
    }

    const handleCreate = () => {
        let eventData = {
            name: document.getElementById("event-name").value,
            description: document.getElementById("event-description").value,
            type: eventType,
        }

        props.handleCreate(eventData)
    }

    return (
        <Dialog open={props.open}
                //container={() => document.getElementById("CalendarComponent-container")}
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
                <Chip label={"Cancel"} onClick={props.handleCancel}/>
                <Chip label={"Submit"} onClick={handleCreate} color={"primary"}/>
            </DialogActions>

        </Dialog>
    );
}