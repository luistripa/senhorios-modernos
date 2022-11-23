import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import * as React from "react";
import {useState} from "react";
import NewHouseForm from "./NewHouseForm";
import {GrClose} from "react-icons/gr";

export default function NewHouseModal(props) {
    const [submitted, setSubmitted] = useState(false);

    return(<Modal
            open={props.modalState}>
            <Box className={'addHouse-modal'}>
                <div className={'top-header-modal'}>
                    <div className={'top iconHouse'}>
                        <Avatar sx={{ bgcolor: '#7A82AB' }} className={'house-icon-card'} alt="Create house icon" src="home-icon.png" />
                    </div>
                    <div className={'top buttonClose'}>
                        <button onClick={props.openCloseModal}><GrClose className={'close-icon'}/></button>
                    </div>
                </div>
                <Typography className={"modal-modal-title"} variant="h4">
                    Create House
                </Typography>
                <NewHouseForm openCloseModal={props.openCloseModal} functionCreate={props.functionCreate}></NewHouseForm>
            </Box>
            </Modal>
    );

}

//<NewHousePropertiesForm functionCreate={props.functionCreate} setSubmitted={setSubmitted}></NewHousePropertiesForm>
//                     {submitted == true? <NewHouseFillInventoryForm></NewHouseFillInventoryForm> : null}
//