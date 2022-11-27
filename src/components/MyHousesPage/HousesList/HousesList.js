import {Component, useState} from "react";
import "./HousesList.css"
import {Grid} from '@mui/material';
import {Box} from "@mui/joy";
import {GradientCover} from "./Components/HouseCard";
import NewHouseSnackbar from "./Components/NewHouseSnackbar";
import AddCard from "../../AddCard";
import * as React from "react";
import NewHouseModal from "./Components/NewHouseModal";
import API from "../../../api";

export class HousesList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newHouseCreated: false,
            houses: [],
        }
    }

    componentDidMount() {
        API.get('/houses/list',
            {headers: {authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6Imx1aXNoIiwicGFzc3dvcmQiOiJwYXNzd29yZCIsImVtYWlsIjoibHVpc0BtYWlsLmNvbSJ9LCJpYXQiOjE2Njk1NzAyMzYsImV4cCI6MTY3MDE3NTAzNn0.CF8Mhub7zrzWlgRkKKeCaukPI66WsOf0bVmAt8Ia1jw"}})
            .then(response => {
                let housesList = response.data;
                this.setState({houses: housesList})
            }).catch(reason => {
            console.log(reason)
        })
    }


    createNewHouse = (house) => {
        API.post('/houses', house, {headers: {authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6Imx1aXNoIiwicGFzc3dvcmQiOiJwYXNzd29yZCIsImVtYWlsIjoibHVpc0BtYWlsLmNvbSJ9LCJpYXQiOjE2Njk1NzAyMzYsImV4cCI6MTY3MDE3NTAzNn0.CF8Mhub7zrzWlgRkKKeCaukPI66WsOf0bVmAt8Ia1jw"}})
        .then(response => {
            this.state.newHouseCreated = true;
            this.state.houses.push(house);
            this.setState({houses: this.state.houses, newHouseCreated: this.state.newHouseCreated});

        }).catch(reason => {
            console.log(reason)
        })

    }

    closeSnackbar = () => {
        this.state.newHouseCreated = false;
        this.setState({newHouseCreated: this.state.newHouseCreated})
    }

    render() {
        return (
            <>
                <div style={{padding: "3% 0 3% 0"}}>
                    <h1>My properties</h1>
                </div>
                <Box sx={{flexGrow: 1}} flexDirection={"column"}>
                    <Grid container
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          spacing={2}>
                        {this.state.houses.map(
                            house => (<GradientCover key={house.id} name={house.name} address={house.address}
                                                     image={house.image}/>)
                        )}
                    </Grid>
                </Box>
                <div style={{justifyContent: "center", display: "flex"}}>
                    <NewHouseModal functionCreate={this.createNewHouse}></NewHouseModal>
                </div>
                {this.state.newHouseCreated ? <NewHouseSnackbar close={this.closeSnackbar}></NewHouseSnackbar> : null}
            </>
        )
    }
}

