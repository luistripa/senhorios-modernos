import {Component} from "react";
import * as React from "react";
import {BsCloudUpload} from "react-icons/bs";
import Card from "@mui/joy/Card";

export default class NewDivisionForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '', icon: ''
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

    onIconChange = event => {
        if (event.target.files && event.target.files[0]) {
            let ic = event.target.files[0];
            this.setState({
                icon: URL.createObjectURL(ic)
            });
        }
    };

    /*chooseIconDivision = () => {
        return (
            <>
                <p>hello world!</p>
                <div className="dropdown">
                    <button className="btn btn-success
                    dropdown-toggle" type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false">
                        Country Flags
                    </button>

                    <ul className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton">
                        <li className="dropdown-item">
                            <img src=
                                     "https://media.geeksforgeeks.org/wp-content/uploads/20200630132503/iflag.jpg"
                                 width="20" height="15"/>India</li>
                        <li className="dropdown-item">
                            <img src=
                                     "https://media.geeksforgeeks.org/wp-content/uploads/20200630132504/uflag.jpg"
                                 width="20" height="15"/> USA</li>
                        <li className="dropdown-item">
                            <img src=
                                     "https://media.geeksforgeeks.org/wp-content/uploads/20200630132502/eflag.jpg"
                                 width="20" height="15"/> England</li>
                        <li className="dropdown-item">
                            <img src=
                                     "https://media.geeksforgeeks.org/wp-content/uploads/20200630132500/bflag.jpg"
                                 width="20" height="15"/> Brazil</li>
                    </ul>
                </div>
            </>
    )
    }
*/
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
                            <input type="file" id="input-icon" className={'input-field'}
                                   defaultValue={this.state.icon} name={'icon'}
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
