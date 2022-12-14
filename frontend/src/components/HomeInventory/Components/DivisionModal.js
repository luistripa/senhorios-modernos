import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import * as React from "react";
import './components-homeinventory.css';
import {GrClose} from "react-icons/gr";
import {DivisionItems} from "./DivisionItems";

export default function DivisionModal(props) {

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
                </div>
                <div>
                    <DivisionItems deleteDivision={props.deleteDivision} handleClose={props.close}
                                   division={props.division} houseId={props.houseId}></DivisionItems>
                </div>
            </Box>
        </Modal>
    );

}
