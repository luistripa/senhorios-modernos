
import {BASE_URL} from "../../../api"

export function DivisionCard(props) {


    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100px", height: "100px", borderRadius: "50%", backgroundColor: "#4B4E6D"}}>
                <img alt={""} style={{width: "70px", height: "70px"}} src={BASE_URL + "media/"+props.image}/>
            </div>

            <div>
                <div style={{display: "flex", justifyContent: "center"}}>
                    {props.name}
                </div>
            </div>
        </div>
    )
        /*
        return (
            <Card className={'division-card'}>
                <div>
                    <CardCover style={{width: "70%", height: "70%"}}>
                        <img className={'division-image'}
                             src={BASE_URL + "media/"+this.props.image}
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
                    </div>
                </CardContent>
            </Card>

        )*/
}