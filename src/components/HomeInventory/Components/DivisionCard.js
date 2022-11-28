import {Component} from "react";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";

export class DivisionCard extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
                <Card className={'division-card'}>
                    <div>
                        <CardCover style={{width: "70%", height: "70%"}}>
                            <img className={'division-image'}
                                 src={this.props.image}
                                 alt={this.props.name}
                                 loading="lazy"/>
                        </CardCover>
                        <CardCover
                            style = {{backgroundColor: "#4B4E6D", borderRadius: "50%", zIndex: "-1"}}
                        />
                    </div>
                    <CardContent style={{ padding: '8rem 0rem', justifyContent: "flex-end", whiteSpace: "nowrap"}}>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <Typography level="h2" fontSize="lg" textColor="black" mb={1}>
                                {this.props.name}
                            </Typography>
                            <button><img src={'/edit_button.png'}/></button>
                        </div>
                    </CardContent>
                </Card>

        )
    }
}