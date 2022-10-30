import {Component} from "react";

import "./HomeInventory.css"

export class HomeInventory extends Component {

    render() {
        return (
            <>
                <div>Home Inventory</div>
                <div className={'division-container'}>
                    <HomeInventoryDivision name={'Kitchen'}/>
                    <HomeInventoryDivision name={'Bedroom'}/>
                    <HomeInventoryDivision name={'WC'}/>
                    <HomeInventoryDivision name={'+ Division'}/>
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