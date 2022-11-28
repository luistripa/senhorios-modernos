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


    useEffect(() => {
        onDaySelect(selectedDay);
    }, [props.events])


    const onDaySelect = (day) => {
        let dayEvents = getDayEvents(day, props.events);
        setSelectedDayEvents(dayEvents);
        setSelectedDay(day)
    }

    const handleEventCreate = (selectedDay) => {
        props.onEventCreate(selectedDay);
    }

    const handleEventDetail = (eventData) => {
        props.onEventDetail(eventData)
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
