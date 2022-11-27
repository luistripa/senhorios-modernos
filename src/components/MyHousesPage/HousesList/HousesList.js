import {Component, useState} from "react";
import "./HousesList.css"
import {Grid} from '@mui/material';
import {Box} from "@mui/joy";
import {GradientCover} from "./Components/HouseCard";
import NewHouseSnackbar from "./Components/NewHouseSnackbar";
import AddCard from "../../AddCard";
import * as React from "react";
import NewHouseModal from "./Components/NewHouseModal";


export class HousesList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newHouseCreated: false,
            houses: [
                {id: 1, name: "Casa das Janelas", address: "Rua das Flores", image: "/casajanelas.jpeg"},
                {id: 2, name: "Casa das Cores", address: "Rua Preto e Branco", image: "/casacores.webp"},
            ],
        }
    }

    createNewHouse = (house) => {
        let last_house = this.state.houses[this.state.houses.length - 1];
        let new_house = {
            id: last_house.id + 1,
            name: house.name,
            address: house.address,
            image: house.image,
        }

        this.state.houses.push(new_house)
        this.state.newHouseCreated = true;
        this.setState({houses: this.state.houses, newHouseCreated: this.state.newHouseCreated})
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
                {console.log(this.state)}
                {this.state.newHouseCreated ? <NewHouseSnackbar close={this.closeSnackbar}></NewHouseSnackbar> : null}
            </>
        )
    }
}

