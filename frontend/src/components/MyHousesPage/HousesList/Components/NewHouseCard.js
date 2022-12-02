import * as React from 'react';
import {BsPlusLg} from "react-icons/bs";
import Card from "@mui/joy/Card";
import NewHouseModal from "./NewHouseModal";
import {useState} from "react";
import './AddCard.css';

export default function NewHouseCard(props) {
    const [modalState, openModal] = useState(false);

    return (
        <div>
            <Card className={'add-card'}>
                <button onClick={() => {openModal(!modalState)}}>
                    <NewHouseModal modalState={modalState} functionCreate={props.functionCreate} />
                    <BsPlusLg className={'iconPlus'}></BsPlusLg>
                </button>
            </Card>
        </div>
    );
}


