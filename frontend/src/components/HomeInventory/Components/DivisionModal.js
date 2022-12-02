import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import * as React from "react";
import './components-homeinventory.css';
import {GrClose} from "react-icons/gr";
import DivisionItems from "./DivisionItems";

export default function DivisionModal(props) {

    const changeLabel = () => {
        let div = document.getElementById('divisionName');

        div.innerText = document.getElementById('new').value;

        let newDivision = {
            id: props.division.id,
            name: div.innerText,
            mediaId: div.mediaId,
        }
        props.editDivision(newDivision);
    };

    const showInput = () => {
        var text = document.getElementById("new");
        if (text.style.display === "none") {
            text.style.display = "block";
        } else {
            text.style.display = "none";
        }
    }

    return (
        <Modal
            open={props.open}>
            <Box className={'division-modal'}>
                <div className={'top-header-modal division-top-header'}>
                    <div className={'topdiv buttonClose'}>
                        <button onClick={props.close}><GrClose className={'close-icon'}/></button>
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <Typography id={'divisionName'} className={"modal-modal-title division-title"} variant="h4">
                        {props.division && props.division.name}
                    </Typography>
                    <input type="text" id="new" defaultValue="" style={{display:'none'}} onChange={changeLabel}/>
                </div>
                <div>
                    <DivisionItems deleteDivision={props.deleteDivision} handleClose={props.close}
                                   division={props.division}></DivisionItems>
                </div>
            </Box>
        </Modal>
    );

}
