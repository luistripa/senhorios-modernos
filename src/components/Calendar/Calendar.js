import {Component, useState} from "react";

import "./css/CalendarBoard.css"
import CalendarBoard from "./CalendarBoard";
import CalendarEventList from "./CalendarEventList";

import "./css/Calendar.css"

import {NewEventDialog} from "./NewEventDialog";

import {getDayEvents} from "./utils/date_utils";
import EventDetailDialog from "./EventDetailDialog";


export default function Calendar(props) {

    const [selectedDayEvents, setSelectedDayEvents] = useState([]);

    // For new event dialog
    const [newEventDialogOpen, setNewEventDialogOpen] = useState(false);

    // For event detail dialog
    const [eventDetailDialogOpen, setEventDetailDialogOpen] = useState(false);
    const [eventDetailDialogEvent, setEventDetailDialogEvent] = useState(null);


    const onDaySelect = (day) => {
        let dayEvents = getDayEvents(day, props.events);
        setSelectedDayEvents(dayEvents);
    }

    const handleOpenNewEventDialog = () => {
        setNewEventDialogOpen(true);
    }

    const handleOpenEventDetailDialog = (event) => {
        console.log(event)
        setEventDetailDialogEvent(event);
        setEventDetailDialogOpen(true);
    }

    const handleEventCreate = (eventData) => {
        setNewEventDialogOpen(false);
        console.log(eventData);
    }

    const handleEventEdit = (eventData) => {
        console.log(eventData);
        setEventDetailDialogOpen(false);
    }

    const handleEventDelete = (event) => {
        console.log("delete", event)
        setEventDetailDialogOpen(false);
    }

    return (
        <>
            <div id={"CalendarComponent-container"} className={'calendar-component-container'} style={{position: "relative"}}>
                <table className={'calendar-component-table'} style={{tableLayout: "fixed"}}>
                    <tbody>
                    <tr style={{width: "100%"}}>
                        <CalendarBoard
                            events={props.events}
                            onDaySelect={onDaySelect}
                        />
                        <CalendarEventList events={selectedDayEvents}
                                           handleCreate={handleOpenNewEventDialog}
                                           handleDetail={handleOpenEventDetailDialog}
                        />
                    </tr>
                    </tbody>
                </table>
                <NewEventDialog open={newEventDialogOpen}
                                handleCreate={handleEventCreate}
                                handleCancel={() => setNewEventDialogOpen(false)}
                />
                <EventDetailDialog open={eventDetailDialogOpen}
                                   event={eventDetailDialogEvent}
                                   handleEdit={handleEventEdit}
                                   handleDelete={handleEventDelete}
                                   handleCancel={() => setEventDetailDialogOpen(false)}
                />
            </div>
        </>
    )
}
