import {Component} from "react";
import "./HousesList.css"
import {Grid} from '@mui/material';
import {Box} from "@mui/joy";
import {GradientCover} from "./Components/HouseCard";
import NewHouseSnackbar from "./Components/NewHouseSnackbar";
import AddCard from "../../AddCard";


export class HousesList extends Component{

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

    //alert success qd cria casa
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

    render() {
        return (
            <>
                <Box sx={{ flexGrow: 1 }}>
                <Grid container
                       direction="row"
                       justifyContent="center"
                       alignItems="center"
                        spacing={2}>
                    {this.state.houses.map(
                        house => (<GradientCover key={house.id} name={house.name} address={house.address} image={house.image}/>)
                    )}
                    <Grid item>
                        <AddCard subject={'house'} functionCreate={this.createNewHouse}></AddCard>
                    </Grid>
                </Grid>
                </Box>
                {console.log(this.state)}
                {this.state.newHouseCreated ? <NewHouseSnackbar></NewHouseSnackbar> : null}
            </>
        )
    }
}



