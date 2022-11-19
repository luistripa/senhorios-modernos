import {Component} from "react";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import {Grid} from "@mui/material";
import './components.css';

export class GradientCover extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <Grid item>
                <Card className={'house-card'}>
                    <CardCover>
                        <img src={this.props.image}
                             alt={this.props.name}
                             loading="lazy"/>
                    </CardCover>
                    <CardCover
                        sx={{
                            background:
                                "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)"
                        }}
                    />
                    <CardContent sx={{ justifyContent: "flex-end" }}>
                        <Typography level="h2" fontSize="lg" textColor="#fff" mb={1}>
                            {this.props.name}
                        </Typography>
                        <Typography
                            startDecorator={<LocationOnRoundedIcon />}
                            textColor="neutral.300"
                        >
                            {this.props.address}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
    }

}
