import {Component} from "react";

import './HomeInventory.css'

export class HomeInventoryDivision extends Component {

    render() {
        return (
            <div className={'division'}>{this.props.name}</div>
        )
    }
}