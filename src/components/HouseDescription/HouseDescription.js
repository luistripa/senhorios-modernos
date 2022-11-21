import "./HouseDescription.css"

import casaAmarela from "../../static/casaamarela.jpeg"
import * as React from 'react';
import {Box, ListItemIcon, Stack, Typography} from '@mui/material';
import {Signpost, Home, Groups, Bed} from '@mui/icons-material';
import {useState} from "react";

export function HouseDescription(props) {

    const [yellowHouse, setYellowHouse] = useState( {
        name:"Casa Amarela",
        address: "Rua Amarela",
        capacity:"4",
        typology:"T3",
        img: casaAmarela
    });

    return(
        <React.Fragment>
            <Box
                component="img"
                src={yellowHouse.img}
                alt="HousePhoto"
                sx={{width: 500, height: 300}}
                style={{float: "right"}}
            />
            <Stack spacing={2} style={{float: "left"}}>
                <Typography>
                    <Home/> Name
                </Typography>
            </Stack>
        </React.Fragment>
    );
}