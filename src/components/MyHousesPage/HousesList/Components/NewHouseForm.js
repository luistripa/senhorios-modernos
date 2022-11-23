import NewHouseSnackbar from "./NewHouseSnackbar";
import {Component} from "react";
import NewHousePropertiesForm from "./NewHousePropertiesForm";
import NewHouseFillInventoryForm from "./NewHouseFillInventoryForm";

export default class NewHouseForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            step: 1,
            name: '',
            address: '',
            image: '',
            typology: '',
            capacity: ''
        }
    }

    // go back to previous step
    prevStep = () => {
        const { step } = this.state;
        this.setState({ step: step - 1 });
    }

    // Proceed to next step
    nextStep = () => {
        console.log(this.state.step)
        this.setState({
            step: this.state.step + 1
        });
        console.log(this.state.step)
    };

    // handle field change
    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    }

    render(){
        const {step} = this.state;
        const {name, address, capacity, typology, inventory} = this.state;
        const values = {name, address, capacity, typology, inventory};


        switch (step) {
            case 1:
                console.log("1")
                return (
                    <NewHousePropertiesForm
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={values}/>
                );
            case 2:
                console.log("2")
                return (
                    <NewHouseFillInventoryForm
                        prevStep = {this.prevStep}
                        handleChange = {this.handleChange}
                        nextStep = {this.nextStep}
                        values={values}/>
                );
            case 3:
                return (
                    <NewHouseSnackbar/>
                )
            default:
                // do nothing
        }
    }
}