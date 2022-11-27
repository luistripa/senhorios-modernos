import {useEffect, useState} from "react";
import {DayLine} from "./DayLine";
import {getFirstDayOfCalendar, hasSameMonth} from "./utils/date_utils";

import "./css/CalendarBoard.css"
import moment from "moment";
import {ArrowBack, ArrowForward} from "@mui/icons-material";
import {Button, Chip} from "@mui/material";

export default function CalendarBoard(props) {

    const [selectedDay, setSelectedDay] = useState(moment()); // Holds the selected day
    const [currentMonth, setCurrentMonth] = useState(moment().date(15)); // Used to know which month we're in
    const [events, setEvents] = useState([]);

    useEffect(() => setEvents(props.events), [props.events]);

    const handlePreviousMonth = () => {
        setSelectedDay(undefined);
        setCurrentMonth(currentMonth.clone().subtract(1, "month"));
    }

    const handleNextMonth = () => {
        setSelectedDay(undefined);
        setCurrentMonth(currentMonth.clone().add(1, "month"));
    }

    const handleDaySelect = (date) => {
        if (hasSameMonth(currentMonth, date))
            setSelectedDay(date.clone());
        else {
            setSelectedDay(date.clone());
            setCurrentMonth(date.clone().date(15));
        }
        props.onDaySelect(date.clone());
    }

    let firstDayOfCalendar = getFirstDayOfCalendar(currentMonth);

    return (
        <td className={"calendar-board-container"}>
            <div style={{position: "absolute", width: "100%"}}>
                <div>
                    <div className={"calendar-top-controls-container"}>
                        <div style={{position: "absolute", display: "flex", width: "100%"}}>
                            <Button className={"calendar-month-control-container"} color={"inherit"} onClick={handlePreviousMonth}>
                                <ArrowBack/>
                            </Button>
                            <div className={'calendar-current-month-container'}>
                                <div className={'month-name'}>{currentMonth.startOf("month").format("MMMM")}</div>
                                <div className={'month-year'}>{currentMonth.year()}</div>
                            </div>
                            <Button className={"calendar-month-control-container"} color={"inherit"} onClick={handleNextMonth}>
                                <ArrowForward/>
                            </Button>
                        </div>

                    </div>
                    <div className={"calendar-weekdays-container"}>
                        <div className={"weekday"}><div className={'content'}>Mon.</div></div>
                        <div className={"weekday"}><div className={'content'}>Tue.</div></div>
                        <div className={"weekday"}><div className={'content'}>Wed.</div></div>
                        <div className={"weekday"}><div className={'content'}>Thu.</div></div>
                        <div className={"weekday"}><div className={'content'}>Fri.</div></div>
                        <div className={"weekday"}><div className={'content'}>Sat.</div></div>
                        <div className={"weekday"}><div className={'content'}>Sun.</div></div>
                    </div>
                </div>
                <div className={"calendar-days-container"}>
                    <DayLine
                        currentMonth={currentMonth}
                        events={events}
                        startDay={firstDayOfCalendar}
                        selectedDay={selectedDay}
                        onDaySelect={handleDaySelect}/>
                    <DayLine
                        currentMonth={currentMonth}
                        events={events}
                        startDay={firstDayOfCalendar.clone().add(7, "day")}
                        selectedDay={selectedDay}
                        onDaySelect={handleDaySelect}/>
                    <DayLine
                        currentMonth={currentMonth}
                        events={events}
                        startDay={firstDayOfCalendar.clone().add(14, "day")}
                        selectedDay={selectedDay}
                        onDaySelect={handleDaySelect}/>
                    <DayLine
                        currentMonth={currentMonth}
                        events={events}
                        startDay={firstDayOfCalendar.clone().add(21, "day")}
                        selectedDay={selectedDay}
                        onDaySelect={handleDaySelect}/>
                    <DayLine
                        currentMonth={currentMonth}
                        events={events}
                        startDay={firstDayOfCalendar.clone().add(28, "day")}
                        selectedDay={selectedDay}
                        onDaySelect={handleDaySelect}/>
                    <DayLine
                        currentMonth={currentMonth}
                        events={events}
                        startDay={firstDayOfCalendar.clone().add(35, "day")}
                        selectedDay={selectedDay}
                        onDaySelect={handleDaySelect}/>
                </div>
            </div>


        </td>
    )
}
