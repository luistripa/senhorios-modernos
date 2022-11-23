import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import * as React from "react";
import {useState} from "react";
import NewDivisionForm from "./NewDivisionForm";
import './components.css';
import {GrClose} from "react-icons/gr";

export default function NewDivisionModal(props) {

    return(<Modal
            open={props.modalState}>
                <Box className={'addDivision-modal'}>
                    <div className={'top-header-modal'}>
                        <div className={'top iconHouse'}>
                            <Avatar sx={{ bgcolor: '#7A82AB' }} className={'house-icon-card'} alt="Create division icon" src="home-icon.png" />
                        </div>
                        <div className={'top buttonClose'}>
                            <button onClick={props.openCloseModal}><GrClose className={'close-icon'}/></button>
                        </div>
                    </div>
                    <Typography className={"modal-modal-title"} variant="h4">
                        Create Division
                    </Typography>
                    <NewDivisionForm openCloseModal={props.openCloseModal} functionCreate={props.functionCreate}></NewDivisionForm>
                    </Box>
            </Modal>
    );

}
