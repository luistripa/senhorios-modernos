import {responsiveFontSizes} from "@mui/material";
import {createMuiTheme} from "@material-ui/core";

const theme = responsiveFontSizes(createMuiTheme({
    typography: {
        fontFamily: [
            'Roboto',
            'Raleway',
            'Open Sans',
        ].join(','),
        h1: {
            fontSize: '5rem',
            fontFamily: 'Raleway',
        },
        h2: {
            fontSize: '3.5rem',
            fontFamily: 'Open Sans',
            fontStyle: 'bold',
        },
        h3: {
            fontSize: '2.5rem',
            fontFamily: 'Roboto',
        },
    },
    palette: {
        ghost_white: {
            main: '#FBF9FF',
        },
        manatee: {
            main: '#A2A3BB',
        },
        rhythm: {
            main: '#7A82AB',
        },
        independence: {
            main: '#4B4E6D',
        },
        dark_purple: {
            main: '#242038',
        }
    }
}));

export default theme;
