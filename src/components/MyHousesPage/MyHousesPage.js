import React from 'react';
import {EventsList} from "./EventsList/EventsList";
import {HousesList} from "./HousesList/HousesList";
import {MyHousesHeader} from "./Header /MyHousesHeader";
import {RentalsInfo} from "./RentalsInfo/RentalsInfo";
import './MyHousesPage.css';

export default function MyHousesPage() {

    return (
        <div>
            <MyHousesHeader/>
            <div className={'containerFirstPart'}>
                <div className={'containerRentalInfo'}>
                    <RentalsInfo/>
                </div>
                <div className={'containerHousesList'}>
                    <HousesList/>
                </div>
            </div>
            <div className={'containerSecondPart'}>
                <EventsList/>
            </div>
        </div>
    )
}

