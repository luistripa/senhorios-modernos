import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import * as React from "react";
import {useState} from "react";
import NewDivisionForm from "./NewDivisionForm";
import './components-homeinventory.css';
import {GrClose} from "react-icons/gr";
import Card from "@mui/joy/Card";

export default function NewDivisionModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Card >
                <button onClick={handleOpen}>
                    Add New
                </button>
            </Card>
            <Modal
                open={open}
                onClose={handleClose}>
                <Box className={'addDivision-modal'}>
                    <div className={'top-header-modal'}>
                        <div className={'topdiv iconHouse'}>
                            <Avatar sx={{bgcolor: '#7A82AB'}} className={'house-icon-card'} alt="Create division icon"
                                    src="/home-icon.png"/>
                        </div>
                        <div className={'topdiv buttonClose'}>
                            <button onClick={handleClose}><GrClose className={'close-icon'}/></button>
                        </div>
                    </div>
                    <Typography className={"modal-modal-title"} variant="h4">
                        Create Division
                    </Typography>
                    <NewDivisionForm handleClose={handleClose}
                                     functionCreate={props.functionCreate}></NewDivisionForm>
                </Box>
            </Modal>
        </div>
    );

}
