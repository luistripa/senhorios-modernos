import {HouseDescription} from "../HouseDescription/HouseDescription";
import {TopBarAfterLogin} from "../TopBar/TopBarAfterLogin";
import {TODOList} from "../TODOList/TODOList";
import Calendar from "../Calendar/Calendar";
import {Table, TableBody, TableCell, TableRow, Box, Button} from "@mui/material";
import {HomeInventory} from "../HomeInventory/HomeInventory";
import * as React from "react";

export function HousePage() {

    //TODO - Fazer o onClick para apagar a casa!

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
                        <TableCell sx={{width: "70%", borderBottom:"none"}}>
                            <p style={{fontSize:"200%", fontWeight:"600", textAlign:"center"}}>Events</p>
                        </TableCell>
                        <TableCell sx={{width: "30%", borderBottom:"none"}}>
                            <p style={{fontSize:"200%", fontWeight:"600", textAlign:"center"}}>To Do List</p>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{width: "70%", borderBottom:"none"}}>
                            <Calendar events={[]}
                                      onEventCreate={handleEventCreate}
                                      onEventEdit={handleEventEdit}
                                      onEventDelete={handleEventDelete}
                            />
                        </TableCell>
                        <TableCell sx={{width: "30%", verticalAlign: "top", borderBottom:"none"}}>
                            <Box sx={{width: '100%', overflowY: 'scroll', maxHeight: "calc(calc(100vw * 0.42) - 16px)", minHeight: "calc(calc(100vw * 0.42) - 16px)"}}>
                                <TODOList/>
                            </Box>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <br/>
            <HomeInventory/>
            <Box textAlign='center' marginTop="5%">
                <Button variant="contained" aria-label="deleteHouseButton"
                        sx={{color: '#FBF9FF', backgroundColor:'#4B4E6D',
                            "&:hover": {
                                backgroundColor: "#242038"
                            }}}>
                    Delete House
                </Button>
            </Box>
        </>
    );
}