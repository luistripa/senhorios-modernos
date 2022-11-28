import {Component} from "react";
import "./HousesList.css"
import {Grid} from '@mui/material';
import {Box} from "@mui/joy";
import {GradientCover} from "./Components/HouseCard";
import NewHouseSnackbar from "./Components/NewHouseSnackbar";
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
        let token = sessionStorage.getItem("token");
        API.get('/houses/list',
            {headers: {authorization: token }})
            .then(response => {
                let housesList = response.data;
                this.setState({houses: housesList})
            }).catch(reason => {
            console.log(reason)
        })
    }


    createNewHouse = (house) => {
        let token = sessionStorage.getItem("token");
        API.post('/houses', house, {headers: {authorization: token}})
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
                            house => (
                                <GradientCover key={house.id} house={house}/>
                            )
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

