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

        // Get house list (for calendar modals)
        API.get('/houses/list', {headers: {authorization: token}})
            .then(response => {
                let houses = response.data;
                setHouseList(houses);
            })
            .catch(reason => console.error(reason));

        // Get all events to show in the calendar
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
                    let newEvent = response.data;

                    newEvent.startDate = moment(newEvent.startDate)
                    newEvent.endDate = moment(newEvent.endDate)
                    newEvent.repeatUntil = moment(newEvent.repeatUntil)

                    let newEvents = [];
                    events.forEach(event => {
                        if (event.id !== newEvent.id)
                            newEvents.push(event);
                    })
                    newEvents.push(newEvent);

                    setEvents(newEvents)
                    setErrorSnackbarMessage(undefined);
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
                    setErrorSnackbarMessage(undefined);
                    setSuccessSnackbarMessage("Event edited successfully")
                    resolve();
                }
            })
            .catch(reason => {
                setErrorSnackbarMessage("Failed to edit event: " + reason.toString());
                setSuccessSnackbarMessage(undefined)
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
                    setErrorSnackbarMessage(undefined);
                    setSuccessSnackbarMessage("Event delete successfully")
                    resolve();
                }
            })
            .catch(reason => {
                setErrorSnackbarMessage("Failed to delete event: " + reason.toString());
                setSuccessSnackbarMessage(undefined)
            })
    }

    const handleEventDescription = (event) => {
        let elem = houseList.find(house => house.id === event.houseId)
        return elem.name ? `(${elem.name})` : "unknown house";
    }

    return (
        <>
            <Container>
                <div>
                    <Calendar events={events}
                              onEventCreate={handleOpenNewEventDialog}
                              onEventDetail={(event) => handleOpenEventDetailDialog(event)}
                              eventDescription={handleEventDescription}
                    />
                    <Snackbar open={successSnackbarMessage !== undefined} autoHideDuration={6000} onClose={() => setSuccessSnackbarMessage(undefined)}>
                        <Alert onClose={() => setSuccessSnackbarMessage(undefined)} severity={"success"} variant={"filled"}>{successSnackbarMessage}</Alert>
                    </Snackbar>
                    <Snackbar open={errorSnackbarMessage !== undefined} onClose={() => setErrorSnackbarMessage(undefined)}>
                        <Alert onClose={() => setErrorSnackbarMessage(undefined)} severity={"error"} variant={"filled"}>{errorSnackbarMessage}</Alert>
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
            <br/>
        </>

    );
}