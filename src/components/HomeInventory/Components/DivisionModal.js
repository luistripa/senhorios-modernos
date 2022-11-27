import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import * as React from "react";
import './components-homeinventory.css';
import {GrClose} from "react-icons/gr";
import DivisionItems from "./DivisionItems";

export default function DivisionModal(props) {

    return(
        <Modal
            open={props.open}>
            <Box className={'division-modal'}>
                <div className={'top-header-modal division-top-header'}>
                    <div className={'topdiv buttonClose'}>
                        <button onClick={props.close}><GrClose className={'close-icon'}/></button>
                    </div>
                </div>
                <Typography className={"modal-modal-title division-title"} variant="h4">
                    {props.name}
                </Typography>
                <div>
                    <DivisionItems></DivisionItems>
                </div>
            </Box>
        </Modal>
    );

}
