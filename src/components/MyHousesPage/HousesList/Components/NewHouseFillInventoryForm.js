import {Component} from "react";
import {BsCloudUpload} from "react-icons/bs";
import * as React from "react";
import {HomeInventory} from "../../../HomeInventory/HomeInventory";

export class NewHouseFillInventoryForm extends Component {

     continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

     previous = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {
         const { values, handleChange } = this.props;
         return (
            <form className={'createHouse-form'}>
                <HomeInventory></HomeInventory>
            </form>
        );
     }
}

export default NewHouseFillInventoryForm