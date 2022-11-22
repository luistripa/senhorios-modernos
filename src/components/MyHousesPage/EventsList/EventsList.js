import {Component} from "react";
import "./EventsList.css"
import * as React from "react";
import Timeline from "./Components/Timeline.js";

export class EventsList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            events: [{title: 'House Keeping', isLeft: true, time: 'Today, Nov 25th', description: '09h-10h', color: "green", tags: ["Casa das Cores"]},
                {title: 'Check-out', isLeft: false, time: 'Today, Nov 25th', description: '12h-13h', color: "yellow", tags: ["Casa das Janelas"]},
                {title: 'Maintenance', isLeft: true, time: 'Today, Nov 25th', description: '14h-17h', color: "yellow", tags: ["Casa das Janelas"]}
            ]
        }
    }


    render() {
        return (
            <>
                <h1>Today's Events</h1>
                <div style={{display: 'flex', alignItems: 'flex-end'}}>
                    <button>Tomorrow</button>
                </div>
                <div>
                    {this.state.events.map( event => {
                        return (<>
                            <Timeline
                            direction={event.isLeft? "left" : "right"}
                            icon="user"
                            title={event.title}
                            time={event.time}
                            description={event.description}
                            color={event.color}
                            tags={event.tags}
                            lineHeight={4}
                        />
                        </>)
                    })}
                </div>
            </>
        )
    }
}



