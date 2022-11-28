import Calendar from "../Calendar/Calendar";
import moment from "moment/moment";
import {useEffect, useState} from "react";
import {NewEventDialog} from "../Calendar/NewEventDialog";
import EventDetailDialog from "../Calendar/EventDetailDialog";

import API from '../../api';
import {Container} from "@mui/material";

export function MyCalendar(props) {

    const [events, setEvents] = useState([]);
    const [houseList, setHouseList] = useState([]);

    // For new event dialog
    const [newEventDialogOpen, setNewEventDialogOpen] = useState(false);

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

    const handleOpenNewEventDialog = () => {
        setNewEventDialogOpen(true);
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
        setTimeout(() => { // Simulates backend request
            console.log("create", eventData);
            resolve();
        }, 1000)
    }

    const handleEventEdit = (resolve, reject, eventData) => {
        setTimeout(() => { // Simulates backend request
            console.log("edit", eventData);
            resolve();
        }, 1000);
    }

    const handleEventDelete = (resolve, reject, eventData) => {
        setTimeout(() => { // Simulates backend request
            console.log("delete", eventData);
            resolve();
        }, 1000);
    }

    return (
        <>
            <Container>
                <div>
                    <Calendar events={events}
                              onEventCreate={handleOpenNewEventDialog}
                              onEventDetail={(event) => handleOpenEventDetailDialog(event)}
                    />
                </div>


                <NewEventDialog open={newEventDialogOpen}
                                onClose={handleCloseNewEventDialog}
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