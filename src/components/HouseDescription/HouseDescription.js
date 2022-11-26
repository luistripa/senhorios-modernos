import "./HouseDescription.css"

import casaAmarela from "../../static/casaamarela.jpeg"
import * as React from 'react';
import {Box, Divider, Grid, Typography} from '@mui/material';
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
                        <Grid container style={{backgroundColor: '#FFD8A9', borderRadius: 10, padding: 10}}>
                            <Grid item style={{flexDirection: 'column', width:'33%'}}>
                                <Grid item>
                                    <LocationOn fontSize="large"/>
                                </Grid>
                                <Grid item>
                                    {yellowHouse.address}
                                </Grid>
                            </Grid>
                            <Divider orientation="vertical" flexItem/>
                            <Grid item style={{flexDirection: 'column', width:'33%'}}>
                                <Grid item>
                                    <Groups fontSize="large"/>
                                </Grid>
                                <Grid item>
                                    {yellowHouse.capacity}
                                </Grid>
                            </Grid>
                            <Divider orientation="vertical" flexItem/>
                            <Grid item style={{flexDirection: 'column', width:'33%'}}>
                                <Grid item>
                                    <Bed fontSize="large"/>
                                </Grid>
                                <Grid item>
                                    {yellowHouse.typology}
                                </Grid>
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