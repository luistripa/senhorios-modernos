

import "./HomeInventory.css"
import {Component} from "react";


export class HomeInventoryAddDivision extends Component {

    render() {
        return (
            <div
                className={'division'}
                onClick={() => this.props.addDivision()}>Add Division</div>
        )
    }
}