import {Component} from "react";
import * as React from "react";
import './components.css';
import {BsCloudUpload} from "react-icons/bs";

/*export class NewHousePropertiesForm extends Component{
    constructor(props) {
        super(props);

        this.state = {
            name:'', address:'', capacity:0, typology:'', image:''};
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
       // this.props.functionCreate(this.state);
        this.props.setSubmitted(true);
    }

    onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            this.setState({
                image: URL.createObjectURL(img)
            });
        }
    };

    removeCapacity(capacity) {
        let newCapacity = parseInt(capacity)-1;
        this.setState({capacity: newCapacity});
    }

    addCapacity(capacity) {
        let newCapacity = parseInt(capacity)+1;
        this.setState({capacity: newCapacity});
    }

    render () {
        return (
            <form className={'createHouse-form'} onSubmit={(event) => this.handleSubmit(event)}>
                <div className={'input'}>
                    <input required type="text" className={'input-field'} name={'name'} value={this.state.name} onChange={(event) => this.handleChange(event)} />
                    <label className={'input-label'}>Name:</label><br/>
                </div>
                <div className={'input'}>
                    <input required type="text" className={'input-field'} name={'address'} value={this.state.address} onChange={(event) => this.handleChange(event)} />
                    <label className={'input-label'}>Address:</label><br/>
                </div>
                <div className={'input'}>
                    <select required value={this.state.typology} className={'input-field'} name={'typology'} onChange={(event) => this.handleChange(event)}>
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
                        <button className={'capacity-button'} onClick={() => this.removeCapacity(this.state.capacity)}>-</button>
                        <input type="text" className={'capacity-output-label'} name={'capacity'} value={this.state.capacity} onChange={(event) => this.handleChange(event)}></input>
                        <button className={'capacity-button'} onClick={() => this.addCapacity(this.state.capacity)}>+</button>
                    </div>
                </div>
                <div className={'input'}>
                    <label className={'input-label'}>Image:</label>
                    <div className={'input image'}>
                        <label htmlFor="input-image" className="custom-file-upload">
                            <BsCloudUpload style={{paddingRight:'15px'}}/>Upload image
                        </label>
                        <input required type="file" id="input-image" className={'input-field'} name={'image'} onChange={(event) => this.onImageChange(event)} />
                    </div>
                </div>
                <div className={'btn'}>
                    <input type='submit' className={'nextBtn'} value="Next" onClick={() => this.props.setSubmitted(true)}/>
                </div>
            </form>
        )}


}*/

export class NewHousePropertiesForm extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    removeCapacity = capacity => {
        let newCapacity = parseInt(capacity)-1;
        this.setState({capacity: newCapacity});
    }

    addCapacity = capacity => {
        let newCapacity = parseInt(capacity)+1;
        this.setState({capacity: newCapacity});
    }

    render (){
        const { values, handleChange } = this.props;

    return (
        <form className={'createHouse-form'}>
            <div className={'input'}>
                <input required type="text" className={'input-field'} defaultValue={values.name} onChange={handleChange('name')} />
                <label className={'input-label'}>Name:</label><br/>
            </div>
            <div className={'input'}>
                <input required type="text" className={'input-field'} defaultValue={values.address} onChange={handleChange('address')} />
                <label className={'input-label'}>Address:</label><br/>
            </div>
            <div className={'input'}>
                <select required defaultValue={values.typology} className={'input-field'} name={'typology'} onChange={handleChange('typology')}>
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
                    <button className={'capacity-button'} onClick={() => this.removeCapacity(values.capacity)}>-</button>
                    <input type="text" className={'capacity-output-label'} name={'capacity'} defaultValue={values.capacity} onChange={handleChange('capacity')}></input>
                    <button className={'capacity-button'} onClick={() => this.addCapacity(values.capacity)}>+</button>
                </div>
            </div>
            <div className={'input'}>
                <label className={'input-label'}>Image:</label>
                <div className={'input image'}>
                    <label htmlFor="input-image" className="custom-file-upload">
                        <BsCloudUpload style={{paddingRight:'15px'}}/>Upload
                    </label>
                    <input required type="file" id="input-image" className={'input-field'} name={'image'} onChange={(event) => this.onImageChange(event)} />
                </div>
            </div>
            <div className={'btn'}>
                <input type='submit' className={'nextBtn'} value="Next" onClick={this.continue}/>
            </div>
        </form>
    );
    }
}

export default NewHousePropertiesForm