import Calendar from "../Calendar/Calendar";
import moment from "moment/moment";
import {useEffect, useState} from "react";
import axios from 'axios';

export function MyCalendar(props) {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        setEvents([
            {
                id: 1,
                type: "MAINTENANCE",
                name: "Carpinteiro",
                description: "This is a description",
                startDate: moment("2022-11-23 19:00:00"),
                endDate: moment("2022-11-23 20:00:00"),
                repeat: "NO",
            },
            {
                id: 2,
                type: "OCCUPATION",
                name: "Casal de turistas dasdasdasdasdasdasdasdas",
                description: "This is a description",
                startDate: moment("2022-11-22 19:00:00"),
                endDate: moment("2022-11-25 20:00:00"),
                repeat: "NO",
            },
            {
                id: 3,
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
                type: "CLEANING",
                name: "Dona Elvira",
                description: "This is a description",
                startDate: moment("2022-11-25 17:00:00"),
                endDate: moment("2022-11-25 18:00:00"),
                repeat: "WEEKLY",
                repeatUntil: moment("2023-02-25"),
            },
        ])
    }, [])

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
        <div style={{width: "50%"}}>
            <Calendar events={events}
                      onEventCreate={handleEventCreate}
                      onEventEdit={handleEventEdit}
                      onEventDelete={handleEventDelete}
            />
        </div>
    );
}