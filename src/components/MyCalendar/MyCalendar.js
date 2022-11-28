import Calendar from "../Calendar/Calendar";
import moment from "moment/moment";
import {useEffect, useState} from "react";
import {NewEventDialog} from "../Calendar/NewEventDialog";
import EventDetailDialog from "../Calendar/EventDetailDialog";

import API from '../../api';
import {Alert, Container} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

export function MyCalendar(props) {

    const [events, setEvents] = useState([]);
    const [houseList, setHouseList] = useState([]);

    const [successSnackbarMessage, setSuccessSnackbarMessage] = useState(undefined);
    const [errorSnackbarMessage, setErrorSnackbarMessage] = useState(undefined);

    // For new event dialog
    const [newEventDialogOpen, setNewEventDialogOpen] = useState(false);
    const [newEventDialogSelectedDay, setNewEventDialogSelectedDay] = useState(moment());

    // For event detail dialog
    const [eventDetailDialogOpen, setEventDetailDialogOpen] = useState(false);
    const [eventDetailDialogEvent, setEventDetailDialogEvent] = useState(null);

    useEffect(() => {
        let token = sessionStorage.getItem('token');

        API.get('/events/all', {headers: {authorization: token}})
            .then(response => {
                let allEvents = response.data;
                allEvents.map(event => {
                    event.startDate = moment(event.startDate);
                    event.endDate = moment(event.endDate);
                    event.repeatUntil = moment(event.repeatUntil);
                })
                setEvents(allEvents)
            })
            .catch(reason => console.log(reason));

        API.get('/houses/list', {headers: {authorization: token}})
            .then(response => {
                let houses = response.data;
                setHouseList(houses);
            })
            .catch(reason => console.error(reason));
    }, [])

    const handleOpenNewEventDialog = (selectedDay) => {
        setNewEventDialogOpen(true);
        setNewEventDialogSelectedDay(selectedDay);
    }

    const handleCloseNewEventDialog = () => {
        setNewEventDialogOpen(false);
    }

    const handleOpenEventDetailDialog = (event) => {
        setEventDetailDialogEvent(event);
        setEventDetailDialogOpen(true);
    }

    const handleCloseEventDetailDialog = (event) => {
        setEventDetailDialogEvent(null);
        setEventDetailDialogOpen(false);
    }

    const handleEventCreate = (resolve, reject, eventData) => {
        API.post(`/houses/${eventData.houseId}/events`, eventData, {headers: {authorization: sessionStorage.getItem("token")}})
            .then(response => {
                if (response.status === 200) {
                    let newEvents = [];
                    events.forEach(event => {
                        if (event.id !== eventData.id)
                            newEvents.push(event);
                    })
                    newEvents.push(eventData);
                    setEvents(newEvents)
                    setErrorSnackbarMessage(null);
                    setSuccessSnackbarMessage("Event created successfully")
                    resolve();
                }
            })
            .catch(reason => {
                setErrorSnackbarMessage("Failed to create event: " + reason.toString());
                setSuccessSnackbarMessage(null)
            })
    }

    const handleEventEdit = (resolve, reject, eventData) => {
        API.put(`/houses/${eventData.houseId}/events/${eventData.id}`, eventData, {headers: {authorization: sessionStorage.getItem("token")}})
            .then(response => {
                if (response.status === 200) {
                    let newEvents = [];
                    events.forEach(event => {
                        if (event.id !== eventData.id)
                            newEvents.push(event);
                        else
                            newEvents.push(eventData);
                    })
                    setEvents(newEvents)
                    setErrorSnackbarMessage(null);
                    setSuccessSnackbarMessage("Event edited successfully")
                    resolve();
                }
            })
            .catch(reason => {
                setErrorSnackbarMessage("Failed to edit event: " + reason.toString());
                setSuccessSnackbarMessage(null)
            })
    }

    const handleEventDelete = (resolve, reject, eventData) => {
        API.delete(`/houses/${eventData.houseId}/events/${eventData.id}`, {headers: {authorization: sessionStorage.getItem("token")}})
            .then(response => {
                if (response.status === 200) {
                    let newEvents = [];
                    events.forEach(event => {
                        if (event.id !== eventData.id)
                            newEvents.push(event);
                    })
                    setEvents(newEvents)
                    setErrorSnackbarMessage(null);
                    setSuccessSnackbarMessage("Event delete successfully")
                    resolve();
                }
            })
            .catch(reason => {
                setErrorSnackbarMessage("Failed to delete event: " + reason.toString());
                setSuccessSnackbarMessage(null)
            })
    }

    return (
        <>
            <Container>
                <div>
                    <Calendar events={events}
                              onEventCreate={handleOpenNewEventDialog}
                              onEventDetail={(event) => handleOpenEventDetailDialog(event)}
                    />
                    <Snackbar open={successSnackbarMessage} autoHideDuration={6000} onClose={() => setSuccessSnackbarMessage(null)}>
                        <Alert onClose={() => setSuccessSnackbarMessage(null)} severity={"success"} variant={"filled"}>{successSnackbarMessage}</Alert>
                    </Snackbar>
                    <Snackbar open={errorSnackbarMessage} onClose={() => setErrorSnackbarMessage(null)}>
                        <Alert onClose={() => setErrorSnackbarMessage(null)} severity={"error"} variant={"filled"}>{errorSnackbarMessage}</Alert>
                    </Snackbar>
                </div>


                <NewEventDialog open={newEventDialogOpen}
                                onClose={handleCloseNewEventDialog}
                                selectedDay={newEventDialogSelectedDay}
                                selectedHouse={undefined}
                                houseList={houseList}
                                handleCreate={handleEventCreate}
                                handleCancel={() => setNewEventDialogOpen(false)}
                />
                <EventDetailDialog open={eventDetailDialogOpen}
                                   onClose={handleCloseEventDetailDialog}
                                   selectedHouse={undefined}
                                   houseList={houseList}
                                   event={eventDetailDialogEvent}
                                   handleEdit={handleEventEdit}
                                   handleDelete={handleEventDelete}
                                   handleCancel={() => setEventDetailDialogOpen(false)}
                />
            </Container>


        </>

    );
}