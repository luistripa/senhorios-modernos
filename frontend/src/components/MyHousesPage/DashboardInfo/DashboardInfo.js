import {Component} from "react";
import "./DashboardInfo.css";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import {Icon, Typography} from "@mui/material";

export class DashboardInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            properties: [
                {id: 'rentedHouses', name: 'Occupied', total: 2, icon: ''},
                {id: 'emptyHouses', name: 'Empty', total: 5, icon: ''},
                {id: 'tasksToDo', name: 'To Do', total: 9, icon: ''},
                {id: 'eventsToday', name: 'Events Today', total: 0, icon: ''}
            ]
        }
    }

    render() {
        return (
            <>
                <div className={'divCardsProperties'} style={{display: 'flex', flexDirection:'row'}}>
                    {this.state.properties.map(prop => (
                        <Card className={'cardProperties'} sx={{minWidth: 275}}>
                            <CardContent>
                                <Icon src={prop.icon}/>
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    {prop.total}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {prop.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </>
        )
    }
}



