import {HouseDescription} from "../HouseDescription/HouseDescription";
import {TopBarAfterLogin} from "../TopBar/TopBarAfterLogin";
import {TODOList} from "../TODOList/TODOList";
import Calendar from "../Calendar/Calendar";
import {Table, TableBody, TableCell, TableRow, Box} from "@mui/material";

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


            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{width: "70%"}}>
                            <p style={{fontSize:"200%", fontWeight:"600", textAlign:"center"}}>Events</p>
                        </TableCell>
                        <TableCell sx={{width: "30%"}}>
                            <p style={{fontSize:"200%", fontWeight:"600", textAlign:"center"}}>To Do List</p>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{width: "70%"}}>
                            <Calendar events={[]}
                                      onEventCreate={handleEventCreate}
                                      onEventEdit={handleEventEdit}
                                      onEventDelete={handleEventDelete}
                            />
                        </TableCell>
                        <TableCell sx={{width: "30%", verticalAlign: "top"}}>
                            <Box sx={{width: '100%', overflowY: 'scroll', maxHeight: "calc(calc(100vw * 0.42) - 16px)", minHeight: "calc(calc(100vw * 0.42) - 16px)"}}>
                                <TODOList/>
                            </Box>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </>
    );
}