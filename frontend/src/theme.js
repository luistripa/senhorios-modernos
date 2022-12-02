import {createStyles, responsiveFontSizes} from "@mui/material";

const theme = responsiveFontSizes(createStyles({
    typography: {
        fontFamily: [
            'Exo',
        ].join(','),
        h1: {
            fontSize: '5rem',
            fontFamily: 'Exo',
        },
        h2: {
            fontSize: '3.5rem',
            fontFamily: 'Exo',
            fontStyle: 'bold',
        },
        h3: {
            fontSize: '2.5rem',
            fontFamily: 'Exo',
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
