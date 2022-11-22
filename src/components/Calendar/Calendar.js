import {Component, useState} from "react";

import "./css/CalendarBoard.css"
import CalendarBoard from "./CalendarBoard";
import CalendarEventList from "./CalendarEventList";

import "./css/Calendar.css"

import {NewEventDialog} from "./NewEventDialog";

import {getDayEvents} from "./utils/date_utils";
import EventDetailDialog from "./EventDetailDialog";
import moment from "moment";


export default function Calendar(props) {

    const [selectedDay, setSelectedDay] = useState(moment());
    const [selectedDayEvents, setSelectedDayEvents] = useState([]);

    // For new event dialog
    const [newEventDialogOpen, setNewEventDialogOpen] = useState(false);

    // For event detail dialog
    const [eventDetailDialogOpen, setEventDetailDialogOpen] = useState(false);
    const [eventDetailDialogEvent, setEventDetailDialogEvent] = useState(null);


    const onDaySelect = (day) => {
        let dayEvents = getDayEvents(day, props.events);
        setSelectedDayEvents(dayEvents);
        setSelectedDay(day)
    }

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
        props.onEventCreate(resolve, reject, eventData);
    }

    const handleEventEdit = (resolve, reject, eventData) => {
        props.onEventEdit(resolve, reject, eventData)
    }

    const handleEventDelete = (resolve, reject, eventData) => {
        props.onEventDelete(resolve, reject, eventData);
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
                        <CalendarEventList selectedDay={selectedDay}
                                           events={selectedDayEvents}
                                           handleCreate={handleOpenNewEventDialog}
                                           handleDetail={handleOpenEventDetailDialog}
                        />
                    </tr>
                    </tbody>
                </table>
                <NewEventDialog open={newEventDialogOpen}
                                onClose={handleCloseNewEventDialog}
                                handleCreate={handleEventCreate}
                                handleCancel={() => setNewEventDialogOpen(false)}
                />
                <EventDetailDialog open={eventDetailDialogOpen}
                                   onClose={handleCloseEventDetailDialog}
                                   event={eventDetailDialogEvent}
                                   handleEdit={handleEventEdit}
                                   handleDelete={handleEventDelete}
                                   handleCancel={() => setEventDetailDialogOpen(false)}
                />
            </div>
        </>
    )
}
