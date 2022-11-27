import {Component} from "react";
import "./EventsList.css"
import * as React from "react";
import Timeline from "./Components/Timeline.js";
import moment from "moment";
import API from "../../../api";
import {getDayEvents, hasSameDay} from "../../Calendar/utils/date_utils";

export class EventsList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            eventsToday: [], eventsTomorrow: [], housesList: [],
            isTodayShown: true,
            lineColor: 'grey'
        }
    }

    componentDidMount() {
        API.get('/houses/list',
            {headers: {authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6Imx1aXNoIiwicGFzc3dvcmQiOiJwYXNzd29yZCIsImVtYWlsIjoibHVpc0BtYWlsLmNvbSJ9LCJpYXQiOjE2Njk1NzAyMzYsImV4cCI6MTY3MDE3NTAzNn0.CF8Mhub7zrzWlgRkKKeCaukPI66WsOf0bVmAt8Ia1jw"}})
            .then(response => {
                let houses = response.data;
                this.setState({housesList: houses})
            }).catch(reason => {
            console.log(reason)
        })

        API.get('/events/today',
            {headers: {authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6Imx1aXNoIiwicGFzc3dvcmQiOiJwYXNzd29yZCIsImVtYWlsIjoibHVpc0BtYWlsLmNvbSJ9LCJpYXQiOjE2Njk1NzAyMzYsImV4cCI6MTY3MDE3NTAzNn0.CF8Mhub7zrzWlgRkKKeCaukPI66WsOf0bVmAt8Ia1jw"}})
            .then(response => {
                let eventsTodayResponse = response.data;
                eventsTodayResponse.map((event) => {
                    event.startDate = moment(event.startDate);
                    event.endDate = moment(event.endDate);
                    event.repeatUntil = event.repeatUntil ? moment(event.repeatUntil) : null;
                });

                let eventsToday = getDayEvents(moment(), eventsTodayResponse);
                console.log(eventsToday);
                let eventsTodaySort = eventsToday.sort((a, b) => moment(a.startDate) > moment(b.startDate) ? 1 : -1);
                this.setState({eventsToday: eventsTodaySort})
            }).catch(reason => {
            console.log(reason)
        })


    }


    getDirection(event) {
        return (this.state.isTodayShown ? (
                this.state.eventsToday.indexOf(event) % 2 === 0 ? "left" : "right") :
            this.state.eventsTomorrow.indexOf(event) % 2 === 0 ? "left" : "right");
    }

    getDate() {
        return (this.state.isTodayShown ? 'Today, ' + moment().format(" MMMM Do") :
            'Tomorrow, ' + moment().add(1, 'days').format(" MMMM Do"));
    }

    getTime(event) {
        let day_date = moment();
        let todayAtMidnight = day_date.clone().hour(0).minute(0).second(0).millisecond(0);
        let todayMaxDate = day_date.clone().hour(23).minute(59).second(59).millisecond(999);

        if (event.repeat === "NO") {
            if (event.startDate < todayAtMidnight) {
                if (event.endDate <= todayMaxDate)
                    return moment(event.endDate).format('HH:mm');
                else
                    return "All day";
            } else {
                return moment(event.startDate).format('HH:mm');
            }
        } else {
            if (hasSameDay(event.startDate, event.endDate)) { // Internal event (with repeat)
                return moment(event.startDate).format('HH:mm');
            } else {
                if (event.startDate < todayAtMidnight) {
                    if (event.endDate <= todayMaxDate)
                        return moment(event.endDate).format('HH:mm');
                    else
                        return "All day";
                } else {
                    return moment(event.startDate).format('HH:mm');
                }
            }

        }
    }


    getHouseById(id) {
        for (let house of this.state.housesList) {
            if (house.id === id)
                return house;
        }

        return null;
    }

    showEvents = (event, totalEvents) => {
        return (<Timeline key={event.id}
                          direction={this.getDirection(event)}
                          icon="clock outline"
                          title={event.name}
                          date={this.getDate()}
                          time={this.getTime(event)}
                          house={this.getHouseById(event.houseId)}
                          lineColor={this.state.lineColor}
                          lineHeight={totalEvents}
        />)
    }

    render() {
        const totalEventsToday = this.state.eventsToday.length;
        const totalEventsTomorrow = this.state.eventsTomorrow.length;
        const maxEventsHeight = Math.max(totalEventsToday, totalEventsTomorrow) * 100;
        const lineHeight = this.state.isTodayShown ? totalEventsToday : totalEventsTomorrow;
        const height = `${lineHeight * 150}px`;

        return (
            <>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: "4%"}}>
                    {this.state.isTodayShown ? <h1> Today's Events</h1> : <h1> Tomorrow's Events</h1>}
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div style={{display: "flex", justifyContent: "flex-end", marginRight: "13%"}}>
                        <button onClick={() => this.setState({isTodayShown: !this.state.isTodayShown})}>
                            {this.state.isTodayShown ? "Tomorrow" : "Today"}
                        </button>
                    </div>
                    <div className="Timeline-line" style={{height, background: this.state.lineColor}}/>
                    <div style={{position: 'absolute', width: '100%', minHeight: `${maxEventsHeight}px`}}>
                        {this.state.isTodayShown && totalEventsToday == 0
                        }

                        {this.state.isTodayShown &&
                            this.state.eventsToday.map(event => {
                                return this.showEvents(event, totalEventsToday);
                            })
                        }

                        {!this.state.isTodayShown &&
                            this.state.eventsTomorrow.map(event => {
                                return this.showEvents(event, totalEventsTomorrow);

                            })}
                    </div>
                </div>
            </>
        )
    }
}



