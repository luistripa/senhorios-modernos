import Day from "./Day";


export function DayLine(props) {

    return (
        <div className={"day-line"}>
            <Day
                currentMonth={props.currentMonth}
                events={props.events}
                date={props.startDay.clone()}
                selectedDay={props.selectedDay}
                onDaySelect={props.onDaySelect}/>
            <Day
                currentMonth={props.currentMonth}
                events={props.events}
                date={props.startDay.clone().add(1, "day")}
                selectedDay={props.selectedDay}
                onDaySelect={props.onDaySelect}/>
            <Day
                currentMonth={props.currentMonth}
                events={props.events}
                date={props.startDay.clone().add(2, "day")}
                selectedDay={props.selectedDay}
                onDaySelect={props.onDaySelect}/>
            <Day
                currentMonth={props.currentMonth}
                events={props.events}
                date={props.startDay.clone().add(3, "day")}
                selectedDay={props.selectedDay}
                onDaySelect={props.onDaySelect}/>
            <Day
                currentMonth={props.currentMonth}
                events={props.events}
                date={props.startDay.clone().add(4, "day")}
                selectedDay={props.selectedDay}
                onDaySelect={props.onDaySelect}/>
            <Day
                currentMonth={props.currentMonth}
                events={props.events}
                date={props.startDay.clone().add(5, "day")}
                selectedDay={props.selectedDay}
                onDaySelect={props.onDaySelect}/>
            <Day
                currentMonth={props.currentMonth}
                events={props.events}
                date={props.startDay.clone().add(6, "day")}
                selectedDay={props.selectedDay}
                onDaySelect={props.onDaySelect}/>
        </div>
    )
}
