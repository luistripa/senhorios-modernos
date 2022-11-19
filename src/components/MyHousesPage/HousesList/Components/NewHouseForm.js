import {Component} from "react";
import * as React from "react";
import './components.css';
import NewHouseSnackbar from "./NewHouseSnackbar";

export class NewHouseForm extends Component{
    constructor(props) {
        super(props);

        this.state = {
            name:'', address:'', capacity:'', typology:'', image:''};
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.functionCreate(this.state);
    }

    onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            this.setState({
                image: URL.createObjectURL(img)
            });
        }
    };

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
                    <input required type="text" className={'input-field'} name={'capacity'} value={this.state.capacity} onChange={(event) => this.handleChange(event)} />
                    <label className={'input-label'}>Capacity:</label><br/>
                </div>
                <div className={'input'}>
                    <input required type="file" className={'input-field'} name={'image'} onChange={(event) => this.onImageChange(event)} />
                    <label className={'input-label'}>Upload Image:</label><br/><br/>
                </div>
                <div className={'btn'}>
                    <input type="submit" className={'createBtn'} value="Create" />
                </div>
            </form>
        )}
}