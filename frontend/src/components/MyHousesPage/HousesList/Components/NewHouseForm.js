import {Component} from "react";
import * as React from "react";
import './components-houselist.css';
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";

export class NewHouseForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '', address: '', capacity: 0, typology: '', image: 'img'
        };
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.functionCreate(this.state);
        this.props.handleClose();
    }


    removeCapacity = capacity => {
        let newCapacity = parseInt(capacity) - 1;
        this.setState({capacity: newCapacity});
    }

    addCapacity = capacity => {
        let newCapacity = parseInt(capacity) + 1;
        this.setState({capacity: newCapacity});
    }

    render() {
        return (
            <form className={'createHouse-form'} onSubmit={(event) => this.handleSubmit(event)}>
                <div className={'input'}>
                    <input required type="text" className={'input-field'} name={'name'} value={this.state.name}
                           onChange={(event) => this.handleChange(event)}/>
                    <label className={'input-label'}>Name:</label><br/>
                </div>
                <div className={'input'}>
                    <input required type="text" className={'input-field'} name={'address'} value={this.state.address}
                           onChange={(event) => this.handleChange(event)}/>
                    <label className={'input-label'}>Address:</label><br/>
                </div>
                <div className={'input'}>
                    <div>
                        <select required defaultValue={this.state.typology} className={'input-field'} name={'typology'}
                                onChange={(event) => this.handleChange(event)}>
                            <option value=""></option>
                            <option value="T1">T1</option>
                            <option value="T2">T2</option>
                            <option value="T3">T3</option>
                            <option value="T4">T4</option>
                            <option value="T5">T5</option>
                            <option value="T6">T6</option>
                        </select></div>
                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Tooltip title="Number of Rooms">
                            <IconButton color="primary" aria-label="info icon" component="label">
                                <InfoIcon/>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <label className={'input-label'}>Typology:</label><br/>
                </div>
                <div className={'input'}>
                    <div className={'capacity-input'}>
                        <button type='button' className={'capacity-button'}
                                onClick={() => this.removeCapacity(this.state.capacity)}>-
                        </button>
                        <input type="text" className={'capacity-output-label'} name={'capacity'}
                               value={this.state.capacity} onChange={(event) => this.handleChange(event)}></input>
                        <button type='button' className={'capacity-button'}
                                onClick={() => this.addCapacity(this.state.capacity)}>+
                        </button>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Tooltip title="Maximum number of persons the house is design to hold">
                            <IconButton color="primary" aria-label="info icon" component="label">
                                <InfoIcon/>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <label className={'input-label'}>Capacity:</label>
                </div>
                <div className={'btn'} style={{display: 'flex', justifyContent: 'center', marginTop: "5%"}}>
                    <button type='submit' className={'addhouse-button'}>
                        Create
                    </button>
                </div>
            </form>
        )
            ;
    }

}
