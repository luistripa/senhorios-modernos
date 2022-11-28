import * as React from 'react';
import {BsPlusLg} from "react-icons/bs";
import Card from "@mui/joy/Card";
import {useState} from "react";
import NewHouseModal from "./MyHousesPage/HousesList/Components/NewHouseModal";
import NewDivisionModal from "./HomeInventory/Components/NewDivisionModal"
import './AddCard.css';

export default function AddCard(props) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [modalState, openModal] = useState(false);

    let modal;
    if (props.subject === 'house') {
        modal = <NewHouseModal modalState={modalState} functionCreate={props.functionCreate} openCloseModal={openCloseModal}/>;
    } else if (props.subject === 'division'){
        modal = <NewDivisionModal modalState={modalState} functionCreate={props.functionCreate} openCloseModal={openCloseModal}/>;
    }

    function openCloseModal(){
        openModal(!modalState);
    }

    return (
        <div>
                <button className={'add-button'} onClick={openCloseModal}>
                    Add New
                </button>
                {modal}
        </div>
    );
}

