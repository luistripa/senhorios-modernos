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
        setEvents([
            {
                id: 1,
                houseId: 1,
                type: "MAINTENANCE",
                name: "Carpinteiro",
                description: "This is a description",
                startDate: moment("2022-11-23 19:00:00"),
                endDate: moment("2022-11-23 20:00:00"),
                repeat: "NO",
            },
            {
                id: 2,
                houseId: 1,
                type: "OCCUPATION",
                name: "Casal de turistas dasdasdasdasdasdasdasdas",
                description: "This is a description",
                startDate: moment("2022-11-22 19:00:00"),
                endDate: moment("2022-11-25 20:00:00"),
                repeat: "NO",
            },
            {
                id: 3,
                houseId: 1,
                type: "MAINTENANCE",
                name: "Canalisador",
                description: "This is a description",
                startDate: moment("2022-11-22 17:00:00"),
                endDate: moment("2022-11-22 18:00:00"),
                repeat: "MONTHLY",
                repeatUntil: moment("2023-02-22")
            },
            {
                id: 4,
                houseId: 1,
                type: "CLEANING",
                name: "Dona Elvira",
                description: "This is a description",
                startDate: moment("2022-11-25 17:00:00"),
                endDate: moment("2022-11-25 18:00:00"),
                repeat: "WEEKLY",
                repeatUntil: moment("2023-02-25"),
            },
        ])

        API.get('/houses/list', {headers: {authorization: sessionStorage.getItem('token')}})
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
            <Container maxWidth={"md"}>
                <h1>My Calendar</h1>
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