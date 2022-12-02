import {Component} from "react";
import * as React from "react";
import './components-houselist.css';
import {BsCloudUpload} from "react-icons/bs";

export class NewHousePropertiesForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            capacity: 0
        }
    }

    continue = e => {
        e.preventDefault();
        this.props.functionCreate(this.props.values);
        this.props.nextStep();
    };

    console = () => {
        console.log("imprimiu");
    }

    render() {
        const {values, handleChange} = this.props;

        const removeCapacity = (event) => {
            let newCapacity = parseInt(this.state.capacity) - 1;
            this.setState({capacity: newCapacity});
            handleChange('capacity', event);
        }

        const addCapacity = (event) => {
            let newCapacity = parseInt(this.state.capacity) + 1;
            handleChange('image', event);
            this.setState({capacity: newCapacity});
        }
        return (
            <form className={'createHouse-form'}>
                <div className={'input'}>
                    <input required type="text" className={'input-field'} defaultValue={values.name}
                           onChange={handleChange('name')}/>
                    <label className={'input-label'}>Name:</label><br/>
                </div>
                <div className={'input'}>
                    <input required type="text" className={'input-field'} defaultValue={values.address}
                           onChange={handleChange('address')}/>
                    <label className={'input-label'}>Address:</label><br/>
                </div>
                <div className={'input'}>
                    <select required defaultValue={values.typology} className={'input-field'} name={'typology'}
                            onChange={handleChange('typology')}>
                        <option value=""></option>
                        <option value="T1">T1</option>
                        <option value="T2">T2</option>
                        <option value="T3">T3</option>
                        <option value="T4">T4</option>
                        <option value="T5">T5</option>
                        <option value="T6">T6</option>
                    </select>
                    <label className={'input-label'}>Typology:</label><br/>
                </div>
                <div className={'input'}>
                    <label className={'input-label'}>Capacity:</label>
                    <div className={'capacity-input'}>
                        <button type='button' className={'capacity-button'} onClick={(event) => removeCapacity()}>-</button>
                        <label required type="text" className={'capacity-output-label'}>{this.state.capacity}</label>
                        <button type='button' className={'capacity-button'} onClick={(event) => addCapacity()}>+</button>
                    </div>
                </div>
                <div className={'input'}>
                    <label className={'input-label'}>Image:</label>
                    <div className={'input image'}>
                        <label htmlFor="input-image" className="custom-file-upload">
                            <BsCloudUpload style={{paddingRight: '15px'}}/>Upload
                        </label>
                        <input required type="file" id="input-image" className={'input-field'} name={'image'}
                               onChange={(event) => handleChange('image')}/>
                    </div>
                </div>
                <div className={'btn'}>
                    <input type='submit' value="Next" onClick={this.continue}
                           onSubmit={this.console}/>
                </div>
            </form>
        );
    }
}

export default NewHousePropertiesForm