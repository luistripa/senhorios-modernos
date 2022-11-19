import * as React from 'react';
import Box from '@mui/material/Box';
import {NewHouseForm} from './NewHouseForm';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {BsPlusLg} from "react-icons/bs";
import Card from "@mui/joy/Card";
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';


export default function BasicModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Card className={'addhouse-card'}>
                <button className={'addhouse-button'} onClick={handleOpen}>
                    <BsPlusLg className={'iconPlus'}></BsPlusLg>
                </button>
            </Card>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box className={'addHouse-modal'}>
                    <Avatar sx={{ bgcolor: '#7A82AB' }} className={'house-icon-card'} alt="Create house icon" src="home-icon.png" />
                    <Typography className={"modal-modal-title"} variant="h4">
                        Create House
                    </Typography>
                    <NewHouseForm functionCreate={props.functionCreate}></NewHouseForm>
                </Box>
            </Modal>
        </div>
    );
}


