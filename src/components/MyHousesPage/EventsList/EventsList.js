import {Component} from "react";
import "./EventsList.css"
import * as React from "react";
import Timeline from "./Components/Timeline.js";
import moment from "moment";

export class EventsList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            eventsToday: [{
                title: 'House Keeping',
                isToday: true,
                description: '09h-10h',
                color: "green",
                tags: ["Casa das Cores"]
            },
                {
                    title: 'Check-out',
                    isToday: true,
                    description: '12h-13h',
                    tags: ["Casa das Janelas"]
                },
                {
                    title: 'Maintenance',
                    isToday: true,
                    description: '14h-17h',
                    tags: ["Casa das Janelas"]
                },
                {
                    title: 'Fix lamps',
                    isToday: true,
                    description: '10h-10h15',
                    tags: ["Casa das Panelas"]
                },
                {
                    title: 'Buy new microwave',
                    isToday: true,
                    description: '17h-18h',
                    tags: ["Casa das Cores"]
                },
            ], eventsTomorrow: [
                {
                    title: 'Fix fridge',
                    isToday: false,
                    description: '09h-10h30',
                    tags: ["Casa XYZ"]
                }],
            isTodayShown: true,
            lineColor: 'grey'
        }
    }

    getDirection(event) {
        return (this.state.isTodayShown ? (
                this.state.eventsToday.indexOf(event) % 2 === 0 ? "left" : "right") :
            this.state.eventsTomorrow.indexOf(event) % 2 === 0 ? "left" : "right");
    }

    getTime() {
        console.log('direction')
        return (this.state.isTodayShown ? 'Today, ' + moment().format(" MMMM Do") :
            'Tomorrow, ' + moment().add(1, 'days').format(" MMMM Do"));
    }

    showEvents = (event, totalEvents) => {
        return (<Timeline
                direction={this.getDirection(event)}
                icon="clock outline"
                title={event.title}
                time={this.getTime()}
                description={event.description}
                tags={event.tags}
                lineColor={this.state.lineColor}
                lineHeight={totalEvents}
            />)
    }

    render() {
        const totalEventsToday = this.state.eventsToday.length;
        const totalEventsTomorrow = this.state.eventsTomorrow.length;
        const lineHeight = this.state.isTodayShown ? totalEventsToday : totalEventsTomorrow;
        const height = `${lineHeight * 190}px`;

        return (
            <>
                {this.state.isTodayShown ? <h1> Today's Events</h1> : <h1> Tomorrow's Events</h1>}
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div style={{display: "flex", justifyContent: "flex-end", marginRight: "13%"}}>
                        <button onClick={() => this.setState({isTodayShown: !this.state.isTodayShown})}>Tomorrow
                        </button>
                    </div>
                    <div className="Timeline-line" style={{height, background: this.state.lineColor}}/>

                    {this.state.isTodayShown &&
                        this.state.eventsToday.map(event => {
                            if (event.isToday == this.state.isTodayShown) {
                                return this.showEvents(event, totalEventsToday);
                            }
                        })
                    }

                    {!this.state.isTodayShown &&
                        this.state.eventsTomorrow.map(event => {
                            if (event.isToday == this.state.isTodayShown) {
                                return this.showEvents(event, totalEventsTomorrow);
                            }
                        })}

                </div>
            </>
        )
    }
}



