import {Component} from "react";
import * as React from "react";
import {BsCloudUpload} from "react-icons/bs";

export default class NewDivisionForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name:'', icon:''};

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.functionCreate(this.state);
        this.props.openCloseModal();
    }

    onIconChange = event => {
        if (event.target.files && event.target.files[0]) {
            let ic = event.target.files[0];
            this.setState({
                icon: URL.createObjectURL(ic)
            });
        }
    };


    render (){
        return (
            <form className={'createDivision-form'} onSubmit={(event) => this.handleSubmit(event)}>
                <div className={'input'}>
                    <input required type="text" className={'input-field'} defaultValue={this.state.name} name={'name'} onChange={(event) => this.handleChange(event)}/>
                    <label className={'input-label'}>Name:</label><br/>
                </div>
                <div className={'input'}>
                    <label className={'input-label'}>Division icon:</label>
                    <div className={'input icon'}>
                        <label htmlFor="input-icon" className="custom-file-upload">
                            <BsCloudUpload style={{paddingRight:'15px'}}/>Upload
                        </label>
                        <input required type="file" id="input-icon" className={'input-field'} defaultValue={this.state.icon} name={'icon'} onChange={(event) => this.onIconChange(event)} />
                    </div>
                </div>
                <div style={{marginTop: "1.5rem"}}>
                    <input type='submit' className={'submitBtn'} value="Create"/>
                </div>
            </form>
        );
    }
}
