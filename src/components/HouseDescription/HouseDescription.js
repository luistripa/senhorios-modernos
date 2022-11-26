import "./HouseDescription.css"

import casaAmarela from "../../static/casaamarela.jpeg"
import * as React from 'react';
import {Divider, Grid, Typography} from '@mui/material';
import {LocationOn} from '@mui/icons-material';
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
        <div style={{backgroundRepeat: 'no-repeat', backgroundSize:'cover', backgroundPosition:'0% 75%',
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${casaAmarela})`}}>
            <Grid container padding={10}>
                <Grid item padding={10}>
                    <Grid container>
                        <Typography variant={"h2"} marginBottom={"5%"} style={{color:"#FFD8A9", fontWeight:"600"}}>
                            {yellowHouse.name}
                        </Typography>
                        <Grid container style={{backgroundColor: '#FFD8A9', borderRadius: 10, padding: 10}}>
                            <Grid item style={{flexDirection: 'column', width:'33%'}}>
                                <Grid item>
                                    <LocationOn style={{fontSize:'200%', fontWeight:"800"}}/>
                                </Grid>
                                <Grid item>
                                    {yellowHouse.address}
                                </Grid>
                            </Grid>
                            <Divider orientation="vertical" flexItem/>
                            <Grid item style={{flexDirection: 'column', width:'33%'}}>
                                <Grid item style={{fontSize:'200%', fontWeight:"800"}}>
                                    {yellowHouse.capacity}
                                </Grid>
                                <Grid item>
                                    Capacity
                                </Grid>
                            </Grid>
                            <Divider orientation="vertical" flexItem/>
                            <Grid item style={{flexDirection: 'column', width:'33%'}}>
                                <Grid item style={{fontSize:'200%', fontWeight:"800"}}>
                                    {yellowHouse.typology}
                                </Grid>
                                <Grid item>
                                    Typology
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}