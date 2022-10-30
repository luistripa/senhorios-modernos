import {Component} from "react";

import "./HomeInventory.css"
import {HomeInventoryAddDivision} from "./HomeInventoryAddDivision";

export class HomeInventory extends Component {

    constructor(props) {
        super(props);

        this.state = {
            divisions: [
                {id: 1, name: "Ketchen", image: "?"},
                {id: 2, name: "Bedroom", image: "?"},
                {id: 3, name: "WC", image: "?"}
            ]
        }
    }

    addDivision() {
        let last_division = this.state.divisions[this.state.divisions.length-1];

        let new_division = {
            id: last_division.id+1,
            name: "teste",
            image: "?"
        }
        console.log(this.state.divisions)
        this.state.divisions.push(new_division)

        this.setState({
            divisions: this.state.divisions
        })
    }

    render() {
        return (
            <>
                <div>Home Inventory</div>
                <div className={'division-container'}>
                    {
                        this.state.divisions.map(
                            division => (<HomeInventoryDivision key={division.id} name={division.name}/>)
                        )
                    }
                    <HomeInventoryAddDivision addDivision={() => this.addDivision()}/>
                </div>
            </>
        )
    }
}

class HomeInventoryDivision extends Component {

    constructor(props) {
        super(props);

        this.state = {
            counter: 0
        }
    }

    incCounter() {
        this.setState({counter: this.state.counter+1})
    }

    render() {
        return (
            <div
                className={'division'}
                onClick={() => this.incCounter()}>{this.props.name} {this.state.counter}</div>
        )
    }
}