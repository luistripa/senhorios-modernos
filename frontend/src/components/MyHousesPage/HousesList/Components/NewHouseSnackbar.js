import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {Component} from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default class NewHouseSnackbar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: true
        }
    }

    handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({open: false});
        this.props.close();
    }

    render() {
        return (
            <Stack spacing={2} sx={{width: '100%'}}>
                <Snackbar open={this.state.open}
                          autoHideDuration={6000}
                          onClose={(event, reason) => this.handleClose(event, reason)}
                          anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
                    <Alert style={{fontSize: "15px"}} onClose={(event, reason) => this.handleClose(event, reason)}
                           severity="success" sx={{width: '100%'}}>
                        Success!
                    </Alert>
                </Snackbar>
            </Stack>

        );
    }
}
