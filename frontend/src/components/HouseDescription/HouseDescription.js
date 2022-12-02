import "./HouseDescription.css"

import casaAmarela from "../../static/casaamarela.jpeg"
import * as React from 'react';
import {Divider, Grid, Typography} from '@mui/material';
import {LocationOn} from '@mui/icons-material';
import {useEffect, useState} from "react";

export function HouseDescription(props) {

    const [house, setHouse] = useState({});

    useEffect(() => {
        setHouse(props.house);

    }, [props.house]);

    //TODO - Meter a imagem vinda do backend
    return(
        <div style={{backgroundRepeat: 'no-repeat', backgroundSize:'cover', backgroundPosition:'0% 75%',
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${casaAmarela})`}}>
            <Grid container padding={10}>
                <Grid item padding={10}>
                    <Grid container>
                        <Typography variant={"h2"} marginBottom={"5%"} style={{color:"#FBF9FF", fontWeight:"600"}}>
                            {house ? house.name : ""}
                        </Typography>
                        <Grid container style={{backgroundColor: '#FBF9FF', borderRadius: 10, padding: 10}}>
                            <Grid item style={{display: "flex", flexDirection: "column", alignItems: "center", width: "33%", justifyContent:"center"}}>
                                <Grid item>
                                    <LocationOn style={{fontSize:'200%', fontWeight:"900"}}/>
                                </Grid>
                                <Grid item marginTop='2%'>
                                    {house ? house.address : ""}
                                </Grid>
                            </Grid>
                            <Divider orientation="vertical"  style={{height:'100%'}} flexItem/>
                            <Grid item style={{display: "flex", flexDirection: "column", alignItems: "center", width: "33%", justifyContent:"center"}}>
                                <Grid item style={{fontSize:'200%', fontWeight:"900"}}>
                                    {house ? house.capacity : ""}
                                </Grid>
                                <Grid item marginTop='5%'>
                                    Capacity
                                </Grid>
                            </Grid>
                            <Divider orientation="vertical" style={{height:'100%'}} flexItem/>
                            <Grid item style={{display: "flex", flexDirection: "column", alignItems: "center", width: "33%", justifyContent:"center"}}>
                                <Grid item style={{fontSize:'200%', fontWeight:"900"}}>
                                    {house ? house.typology : ""}
                                </Grid>
                                <Grid item marginTop='5%'>
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