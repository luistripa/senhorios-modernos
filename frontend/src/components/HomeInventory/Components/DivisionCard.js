
import {BASE_URL} from "../../../api"

export function DivisionCard(props) {


    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100px", height: "100px", borderRadius: "50%", backgroundColor: "#4B4E6D"}}>
                <img alt={""} style={{width: "70px", height: "70px"}} src={BASE_URL + "media/"+props.image}/>
            </div>

            <div>
                <div style={{display: "flex", justifyContent: "center", fontSize:'14px'}}>
                    {props.name}
                </div>
            </div>
        </div>
    )
}