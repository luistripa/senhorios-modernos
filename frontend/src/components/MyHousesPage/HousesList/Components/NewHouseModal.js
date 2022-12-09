import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import * as React from "react";
import {NewHouseForm} from "./NewHouseForm";
import './components-houselist.css';
import Card from "@mui/joy/Card";
import {GrClose} from "react-icons/gr";
import AddIcon from '@mui/icons-material/Add';
export default function NewHouseModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Card className={'addhouse-card'}>
                <button className={'addhouse-button'} onClick={handleOpen} style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                    Add New <AddIcon style={{paddingLeft:'4px'}}/>
                </button>
            </Card>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title-house-list"
                aria-describedby="modal-modal-description-house-list">
                <Box className={'addHouse-modal'}>
                    <div className={'top-header-modal'}>
                        <div className={'top iconHouse'}>
                            <Avatar sx={{bgcolor: '#7A82AB'}} className={'house-icon-card'} alt="Create house icon"
                                    src="home-icon.png"/>
                        </div>
                        <div className={'top buttonClose'} >
                            <button style={{backgroundColor: "transparent"}} onClick={() => handleClose()}><GrClose className={'close-icon'}/></button>
                        </div>
                    </div>
                    <Typography className={"modal-modal-title-house-list"} variant="h4">
                        Create House
                    </Typography>
                    <NewHouseForm functionCreate={props.functionCreate} handleClose={handleClose}></NewHouseForm>
                </Box>
            </Modal>
        </div>
    );
}

//<NewHousePropertiesForm functionCreate={props.functionCreate} setSubmitted={setSubmitted}></NewHousePropertiesForm>
//                     {submitted == true? <NewHouseFillInventoryForm></NewHouseFillInventoryForm> : null}
//