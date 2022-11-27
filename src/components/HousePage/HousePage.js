import {HouseDescription} from "../HouseDescription/HouseDescription";
import {TopBarAfterLogin} from "../TopBar/TopBarAfterLogin";
import {TODOList} from "../TODOList/TODOList";
import Calendar from "../Calendar/Calendar";
import {Grid, Table, TableBody, TableCell, TableRow} from "@mui/material";


export function HousePage() {

    const handleEventCreate = (resolve, reject, eventData) => {
        setTimeout(() => { // Simulates backend request
            console.log("create", eventData);
            resolve();
        }, 1000)
    }

    const handleEventEdit = (resolve, reject, eventData) => {
        setTimeout(() => { // Simulates backend request
            console.log("edit", eventData);
            resolve();
        }, 1000);
    }

    const handleEventDelete = (resolve, reject, eventData) => {
        setTimeout(() => { // Simulates backend request
            console.log("delete", eventData);
            resolve();
        }, 1000);
    }


    return(
        <>
            <TopBarAfterLogin/>
            <HouseDescription/>

            <Grid container>
                <Grid item sx={{width: "70vw"}}>
                    <Calendar events={[]}
                              onEventCreate={handleEventCreate}
                              onEventEdit={handleEventEdit}
                              onEventDelete={handleEventDelete}
                    />
                </Grid>
                <Grid item sx={{width: "30vw"}}>
                    <TODOList/>
                </Grid>
            </Grid>

            <div style={{width: "100%", height: "100%", marginTop: "50px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <table style={{tableLayout: "fixed", width: "95%"}}>
                    <tbody>
                    <tr style={{width: "100%"}}>
                        <td style={{width: "60%"}}>
                            <p style={{fontSize:"200%", fontWeight:"600", textAlign:"center"}}>Events</p>
                            <Calendar events={[]}
                                      onEventCreate={handleEventCreate}
                                      onEventEdit={handleEventEdit}
                                      onEventDelete={handleEventDelete}
                            />

                        </td>
                        <td style={{width: "40%", maxHeight: "400px"}}>
                            <p style={{fontSize:"200%", fontWeight:"600", textAlign:"center"}}>To Do List</p>
                            <TODOList/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}