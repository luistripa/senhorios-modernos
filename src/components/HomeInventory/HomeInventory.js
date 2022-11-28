import {Component, useState} from "react";

import "./HomeInventory.css"
import {Grid} from "@mui/material";
import {Box} from "@mui/joy";
import {DivisionCard} from "./Components/DivisionCard";
import AddCard from "../AddCard";
import DivisionModal from "./Components/DivisionModal";
import * as React from "react";
import NewHouseModal from "../MyHousesPage/HousesList/Components/NewHouseModal";
import NewDivisionModal from "./Components/NewDivisionModal";
import API from "../../api";
import NewHouseSnackbar from "../MyHousesPage/HousesList/Components/NewHouseSnackbar";

export class HomeInventory extends Component {
    houseId = 1;

    constructor(props) {
        super(props);

        this.state = {
            divisions: [
                //{id: 1, name: "Kitchen", icon: "/kitchen.png"},
                //{id: 2, name: "Bedroom", icon: "/bedroom.png"},
                //{id: 3, name: "Bathroom", icon: "/bathroom.png"},
                //{id: 4, name: "Living Room", icon: "/living-room.png"}
            ],
            newDivisionCreated: false,
            showModal: null
        }

    }

    //To-Do replace with 'this.props.houseId'
    componentDidMount() {
        API.get('/houses/' + '1' + '/inventory/list',
            {headers: {authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6Imx1aXNoIiwicGFzc3dvcmQiOiJwYXNzd29yZCIsImVtYWlsIjoibHVpc0BtYWlsLmNvbSJ9LCJpYXQiOjE2Njk1NzAyMzYsImV4cCI6MTY3MDE3NTAzNn0.CF8Mhub7zrzWlgRkKKeCaukPI66WsOf0bVmAt8Ia1jw"}})
            .then(response => {
                let divisionsList = response.data;
                this.setState({divisions: divisionsList})
            }).catch(reason => {
            console.log(reason)
        })
    }

    //To-Do replace with 'this.props.houseId'
    addDivision = (division) => {
        API.post('/houses/' + '1' + '/inventory', division, {headers: {authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6Imx1aXNoIiwicGFzc3dvcmQiOiJwYXNzd29yZCIsImVtYWlsIjoibHVpc0BtYWlsLmNvbSJ9LCJpYXQiOjE2Njk1NzAyMzYsImV4cCI6MTY3MDE3NTAzNn0.CF8Mhub7zrzWlgRkKKeCaukPI66WsOf0bVmAt8Ia1jw"}})
            .then(response => {
                this.state.newDivisionCreated = true;
                this.state.divisions.push(division);
                this.setState({divisions: this.state.divisions, newDivisionCreated: this.state.newDivisionCreated});

            }).catch(reason => {
            console.log(reason)
        })
    }

    closeSnackbar = () => {
        this.state.newHouseCreated = false;
        this.setState({newHouseCreated: this.state.newHouseCreated})
    }

    gridClicked = (division) => {
        console.log(division);
        this.setState({showModal: division})
    }

    render() {
        return (
            <>

                <div style={{padding: "3% 0 3% 0", display: 'flex', justifyContent:'center'}}>
                    <h1>House Inventory</h1>
                </div>
                <Box className={'homeInventory'} sx={{flexGrow: 1}}>
                    <Grid container
                          className={'grid-inventory'}
                          direction="row"
                          spacing={4}>
                        {this.state.divisions.map(
                            division => (
                                    <Grid item>
                                        <button type='button' onClick={() => this.gridClicked(division)}
                                                style={{
                                                    border: "0px",
                                                    backgroundColor: "transparent",
                                                    cursor: "pointer"
                                                }}>
                                            <DivisionCard key={division.id} name={division.name} image={division.icon}/>
                                        </button>
                                    </Grid>
                            )
                        )}
                        <DivisionModal name={this.state.showModal != null ? this.state.showModal.name : ""}
                                       icon={this.state.showModal != null ? this.state.showModal.icon : ""}
                                       open={this.state.showModal != null}
                                       close={() => this.setState({showModal: null})}/>
                    </Grid>
                </Box>
                <div style={{justifyContent: "center", display: "flex", marginTop:"5%"}}>
                    <NewDivisionModal functionCreate={this.addDivision}></NewDivisionModal>
                </div>
                {this.state.newDivisionCreated ? <NewHouseSnackbar close={this.closeSnackbar}></NewHouseSnackbar> : null}
            </>
        )
    }
}
