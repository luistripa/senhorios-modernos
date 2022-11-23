import {Component} from "react";
import "./RentalsInfo.css";

export class RentalsInfo extends Component {

    getTotalHousesRented() {
        return 5;
    }

    getTotalHousesEmpty() {
        return 2;
    }

    render() {
        return (
            <>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div className={'divInfoLeft'} style={{backgroundColor: 'green'}}>
                    </div>
                    <div className={'divInfoRight'} style={{backgroundColor: '#D5DFD9'}}>
                        <p className={'totalInfo'}>{this.getTotalHousesEmpty()}</p><br/>
                        <p className={'descInfo'}>Empty</p>
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div className={'divInfoLeft'} style={{backgroundColor: 'red'}}>
                    </div>
                    <div className={'divInfoRight'} style={{backgroundColor: '#FCCDC3'}}>
                        <p className={'totalInfo'}> {this.getTotalHousesRented()}</p><br/>
                        <p className={'descInfo'}>Rented</p>
                    </div>
                </div>
            </>
        )
    }
}



