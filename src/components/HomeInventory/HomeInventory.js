import {Component, useState} from "react";

import "./HomeInventory.css"
import {Grid} from "@mui/material";
import {Box} from "@mui/joy";
import {DivisionCard} from "./Components/DivisionCard";
import AddCard from "../AddCard";
import DivisionModal from "./Components/DivisionModal";
import * as React from "react";

export class HomeInventory extends Component {

    constructor(props) {
        super(props);

        this.state = {
            divisions: [
                {id: 1, name: "Kitchen", icon: "/kitchen.png"},
                {id: 2, name: "Bedroom", icon: "/bedroom.png"},
                {id: 3, name: "Bathroom", icon: "/bathroom.png"},
                {id: 4, name: "Living Room", icon: "/living-room.png"}
            ],
            showModal: null
        }

    }


    addDivision = (division) => {
        let last_division = this.state.divisions[this.state.divisions.length - 1];
        let new_division = {
            id: last_division.id + 1,
            name: division.name,
            icon: division.icon
        }
        this.state.divisions.push(new_division)
        this.setState({divisions: this.state.divisions})
    }

    gridClicked = e => division => {
        e.preventDefault();
        this.setState({showModal: division})
    }

    render() {
        return (
            <>
                <div style={{padding: "3% 0 3% 0"}}>
                    <h1>House Inventory</h1>
                </div>
                <Box className={'homeInventory'} sx={{ flexGrow: 1 }}>
                    <Grid container
                          className={'grid-inventory'}
                          direction="row"
                          spacing={4}>
                        {this.state.divisions.map(
                            division => (
                                <>
                                <Grid item>
                                    <button onClick={() => this.gridClicked(division)} style={{
                                        border: "0px",
                                        backgroundColor: "transparent",
                                        cursor: "pointer"}}>
                                        <DivisionCard key={division.id} name={division.name} image={division.icon}/>
                                    </button>
                                </Grid>
                                </>
                                )
                        )}
                                    <DivisionModal name={this.state.showModal != null ? this.state.showModal.name : ""}
                                                   icon={this.state.showModal != null ? this.state.showModal.icon : ""}
                                                   open={this.state.showModal != null}
                                                   close={() => this.setState({showModal: null})}/>
                        <Grid item>
                            <AddCard subject={'division'} functionCreate={this.addDivision}/>
                        </Grid>
                    </Grid>
                </Box>
            </>
        )
    }
}
