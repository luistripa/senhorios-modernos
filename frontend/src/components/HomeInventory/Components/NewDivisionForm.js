import {Component} from "react";
import * as React from "react";
import {BsCloudUpload} from "react-icons/bs";
import Card from "@mui/joy/Card";

export default class NewDivisionForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '', icon: null,
        };

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.functionCreate({name: this.state.name, icon: new FormData(event.target).get('icon')});
        this.props.handleClose();
    }

    onIconChange = event => {
        if (event.target.files && event.target.files[0]) {
            let ic = event.target.files[0];
            this.setState({
                icon: URL.createObjectURL(ic)
            });
        }
    };

    render()
        {
            return (
                <form className={'createDivision-form'} onSubmit={(event) => this.handleSubmit(event)}>
                    <div className={'input'}>
                        <input required type="text" className={'input-field'} defaultValue={this.state.name}
                               name={'name'}
                               onChange={(event) => this.handleChange(event)}/>
                        <label className={'input-label'}>Name:</label><br/>
                    </div>

                    <div className={'input'}>
                        <label className={'input-label'}>Division icon:</label>
                        <div className={'input icon'}>
                            <label htmlFor="input-image" className="custom-file-upload">
                                <BsCloudUpload/>Upload
                            </label>
                            <input type="file" id="input-image" className={'input-field'} name={'icon'}
                                   onChange={(event) => this.onIconChange(event)}/>
                        </div>
                    </div>
                    <Card>
                        <button type='submit' className={'addhouse-button'} >
                            Create
                        </button>
                    </Card>
                </form>
            );
        }
    }
