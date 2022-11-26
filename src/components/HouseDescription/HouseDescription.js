import "./HouseDescription.css"

import casaAmarela from "../../static/casaamarela.jpeg"
import * as React from 'react';
import {Box, Grid, Typography} from '@mui/material';
import {LocationOn, Groups, Bed} from '@mui/icons-material';
import {useEffect, useState} from "react";

export function HouseDescription() {

    const [yellowHouse, setYellowHouse] = useState({});

    useEffect(() => {
        setYellowHouse(
        {
            name:"Casa Amarela",
            address: "Rua Amarela",
            capacity:"4",
            typology:"T3",
            img: casaAmarela
        }
    );
    }, []);

    return(
        <React.Fragment>
            <Grid container padding={10}>
                <Grid item xs={6} padding={10} sx={{display: "flex", alignItems: "center"}}>
                    <Grid container>
                        <Typography variant={"h2"}>
                            {yellowHouse.name}
                        </Typography>
                        <Grid container direction="row" alignItems="stretch">
                            <Grid item marginRight={2}>
                                <LocationOn fontSize="large"/>
                            </Grid>
                            <Grid item fontSize="large" sx={{display: "flex", alignItems: "center"}}>
                                {yellowHouse.address}
                            </Grid>
                        </Grid>
                        <Grid container direction="row" alignItems="stretch">
                            <Grid item marginRight={2}>
                                <Groups fontSize="large"/>
                            </Grid>
                            <Grid item fontSize="large" sx={{display: "flex", alignItems: "center"}}>
                                {yellowHouse.capacity}
                            </Grid>
                        </Grid>
                        <Grid container direction="row" alignItems="stretch">
                            <Grid item marginRight={2}>
                                <Bed fontSize="large"/>
                            </Grid>
                            <Grid item fontSize="large" sx={{display: "flex", alignItems: "center"}}>
                                {yellowHouse.typology}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Box
                        component="img"
                        src={yellowHouse.img}
                        alt="HousePhoto"
                        sx={{width: "100%", borderRadius: "10px 10px 10px 10px"}}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}