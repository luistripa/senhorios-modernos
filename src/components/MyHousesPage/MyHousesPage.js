import React from 'react';
import {EventsList} from "./EventsList/EventsList";
import {HousesList} from "./HousesList/HousesList";
import {MyHousesHeader} from "./Header/MyHousesHeader";
import {DashboardInfo} from "./DashboardInfo/DashboardInfo";
import './MyHousesPage.css';

export default function MyHousesPage() {

    return (
        <div>
            <MyHousesHeader/>
            <div className={'containerHousesList'}>
                <HousesList/>
            </div>
            <div className={'containerEventsList'}>
                <EventsList/>
            </div>
        </div>
    )
}

