import {useEffect, useState} from "react";

import "./css/CalendarBoard.css"
import CalendarBoard from "./CalendarBoard";
import CalendarEventList from "./CalendarEventList";

import "./css/Calendar.css"


import {getDayEvents} from "./utils/date_utils";
import moment from "moment";


export default function Calendar(props) {

    const [selectedDay, setSelectedDay] = useState(moment());
    const [selectedDayEvents, setSelectedDayEvents] = useState([]);


    /**
     * When the user selects a different day, or the event list changes,
     * this will update the event list with the currently selected day's events
     */
    useEffect(() => {
        let dayEvents = getDayEvents(selectedDay, props.events);
        setSelectedDayEvents(dayEvents);

    }, [props.events, selectedDay])

    const handleEventCreate = (selectedDay) => {
        props.onEventCreate(selectedDay);
    }

    const handleEventDetail = (eventData) => {
        props.onEventDetail(eventData)
    }

    const handleEventDescription = (event) => {
        if (props.eventDescription)
            return props.eventDescription(event);
        return "";
    }

    return (
        <>
            <div id={"CalendarComponent-container"} className={'calendar-component-container'} style={{position: "relative"}}>
                <table className={'calendar-component-table'} style={{tableLayout: "fixed"}}>
                    <tbody>
                    <tr style={{width: "100%"}}>
                        <CalendarBoard
                            events={props.events}
                            onDaySelect={setSelectedDay}
                        />
                        <CalendarEventList selectedDay={selectedDay}
                                           events={selectedDayEvents}
                                           eventDescriptionDetail={handleEventDescription}
                                           handleCreate={handleEventCreate}
                                           handleDetail={handleEventDetail}
                        />
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
