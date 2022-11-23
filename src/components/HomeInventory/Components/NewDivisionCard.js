import * as React from 'react';
import {BsPlusLg} from "react-icons/bs";
import Card from "@mui/joy/Card";
import BasicModal from "./Modal";
import {useState} from "react";
import './components.css';

export default function NewDivisionCard(props) {
    const [modalState, openModal] = useState(false);

    return (
        <div>
            <Card className={'addDivision-card'}>
                <button className={'addhouse-button'} onClick={() => {openModal(!modalState)}}>
                    <BasicModal modalState={modalState} functionCreate={props.functionCreate} />
                    <BsPlusLg className={'iconPlus'}></BsPlusLg>
                </button>
            </Card>
        </div>
    );
}

