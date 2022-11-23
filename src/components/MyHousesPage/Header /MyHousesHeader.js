import {Component} from "react";
import Avatar from "@mui/material/Avatar";
import "./MyHousesHeader.css";
import moment from "moment/moment";

export class MyHousesHeader extends Component {

    setImageByHour() {
        let image = '';
        let hour = moment.hour();

        if (hour >= 6 && hour < 9) {
            image = "/sunrise2.png";
        } else if (hour >= 9 && hour < 17) {
            image = "/daylight2.png";
        } else if (hour >= 17 && hour < 20) {
            image = "/sunset2.png";
        } else if ((hour >= 20 && hour <= 23) || (hour >= 0 && hour < 6)) {
            image = "/night2.png";
        }

        return image;
    }

    render() {
        let image = this.setImageByHour();
        return (
            <>
                <div className='myHousesHeader' style={{backgroundImage: `url(${image})`}}>
                    <div style={{display: "flex", justifyContent: "flex-start", padding: "6% 0% 0% 13%"}}>
                        <Avatar src={"/avatar.jpeg"} sx={{width: 200, height: 200}} style={{border: "5px solid white"}}>
                        </Avatar>
                    </div>
                </div>
            </>
        )
    }
}



