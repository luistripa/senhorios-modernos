import {HouseDescription} from "../HouseDescription/HouseDescription";
import {TODOList} from "../TODOList/TODOList";
import Calendar from "../Calendar/Calendar";
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogActions, Alert
} from "@mui/material";
import {HomeInventory} from "../HomeInventory/HomeInventory";
import * as React from "react";
import {useEffect, useState} from "react";
import {NewEventDialog} from "../Calendar/NewEventDialog";
import EventDetailDialog from "../Calendar/EventDetailDialog";
import {useNavigate, useParams} from "react-router-dom";

import API from "../../api";
import moment from "moment";
import Snackbar from "@mui/material/Snackbar";

export function HousePage() {

    let {houseId} = useParams();

    const navigate = useNavigate()

    const [house, setHouse] = useState(undefined);
    const [houseList, setHouseList] = useState([]);


    const [todoItems, setTodoItems] = useState([]);
    const [events, setEvents] = useState([]);

    const [successSnackbarMessage, setSuccessSnackbarMessage] = useState(undefined);
    const [errorSnackbarMessage, setErrorSnackbarMessage] = useState(undefined);

    // For new event dialog
    const [newEventDialogOpen, setNewEventDialogOpen] = useState(false);
    const [newEventDialogSelectedDay, setNewEventDialogSelectedDay] = useState(moment());

    // For event detail dialog
    const [eventDetailDialogOpen, setEventDetailDialogOpen] = useState(false);
    const [eventDetailDialogEvent, setEventDetailDialogEvent] = useState(null);

    // Delete House Dialog
    const [openDeleteHouseDialog, setDeleteHouseDialog] = React.useState(false);

    useEffect(() => {

        // Get House Info
        API.get('/houses/'+houseId, {headers: {authorization: sessionStorage.getItem('token')}})
            .then(response => {
                let house = response.data;
                setHouse(house);
            })
            .catch(reason => console.error(reason));

        // Get house list (for calendar modals)
        API.get('/houses/list', {headers: {authorization: sessionStorage.getItem('token')}})
            .then(response => {
                let houses = response.data;
                setHouseList(houses);
            })
            .catch(reason => console.error(reason));

        // Get todo items
        API.get(`/houses/${houseId}/todo`, {headers: {authorization: sessionStorage.getItem('token')}})
            .then(response => {
                let todoItems = response.data;
                todoItems.map(todoItem => {
                    todoItem.checked = todoItem.checked ? true : false;
                });
                setTodoItems(todoItems);
            })
            .catch(reason => console.error(reason))

        // Get events
        API.get(`houses/${houseId}/events/list`, {headers: {authorization: sessionStorage.getItem('token')}})
            .then(response => {
                let events = response.data;
                events.map(event => {
                    event.startDate = moment(event.startDate);
                    event.endDate = moment(event.endDate);
                    event.repeatUntil = event.repeatUntil ? moment(event.repeatUntil) : null;
                    return event;
                })
                setEvents(events);
            })

        // TODO: GET house divisions

    }, [])

    const handleOpenDeleteHouseDialog = () => {
        setDeleteHouseDialog(true);
    };

    const handleCloseDeleteHouseDialog = () => {
        setDeleteHouseDialog(false);
    };

    const handleOpenNewEventDialog = (selectedDay) => {
        setNewEventDialogSelectedDay(selectedDay);
        setNewEventDialogOpen(true);
    }

    const handleCloseNewEventDialog = () => {
        setNewEventDialogOpen(false);
    }

    const handleOpenEventDetailDialog = (event) => {
        setEventDetailDialogEvent(event);
        setEventDetailDialogOpen(true);
    }

    const handleCloseEventDetailDialog = (event) => {
        setEventDetailDialogEvent(null);
        setEventDetailDialogOpen(false);
    }

    const handleHouseDelete = (resolve) => {
        API.delete(`/houses/${houseId}`, {headers: {authorization: sessionStorage.getItem("token")}})
            .then(response => {
                if (response.status === 200) {
                    navigate('/my-houses');
                    setErrorSnackbarMessage(undefined);
                    setSuccessSnackbarMessage("House deleted successfully")
                    resolve();
                }
            })
            .catch(reason => {
                setErrorSnackbarMessage("Failed to delete house: " + reason.toString());
                setSuccessSnackbarMessage(undefined)
            })
    }

    const handleEventCreate = (resolve, reject, eventData) => {
        API.post(`/houses/${eventData.houseId}/events`, eventData, {headers: {authorization: sessionStorage.getItem("token")}})
            .then(response => {
                if (response.status === 200) {
                    let newEvents = [];
                    events.forEach(event => {
                        if (event.id !== eventData.id)
                            newEvents.push(event);
                    })
                    newEvents.push(eventData);
                    setEvents(newEvents)
                    setErrorSnackbarMessage(undefined);
                    setSuccessSnackbarMessage("Event created successfully")
                    resolve();
                }
            })
            .catch(reason => {
                setErrorSnackbarMessage("Failed to create event: " + reason.toString());
                setSuccessSnackbarMessage(null)
            })
    }

    const handleEventEdit = (resolve, reject, eventData) => {
        API.put(`/houses/${eventData.houseId}/events/${eventData.id}`, eventData, {headers: {authorization: sessionStorage.getItem("token")}})
            .then(response => {
                if (response.status === 200) {
                    let newEvents = [];
                    events.forEach(event => {
                        if (event.id !== eventData.id)
                            newEvents.push(event);
                        else
                            newEvents.push(eventData);
                    })
                    setEvents(newEvents)
                    setErrorSnackbarMessage(undefined);
                    setSuccessSnackbarMessage("Event edited successfully")
                    resolve();
                }
            })
            .catch(reason => {
                setErrorSnackbarMessage("Failed to edit event: " + reason.toString());
                setSuccessSnackbarMessage(undefined)
            })
    }

    const handleEventDelete = (resolve, reject, eventData) => {
        API.delete(`/houses/${eventData.houseId}/events/${eventData.id}`, {headers: {authorization: sessionStorage.getItem("token")}})
            .then(response => {
                if (response.status === 200) {
                    let newEvents = [];
                    events.forEach(event => {
                        if (event.id !== eventData.id)
                            newEvents.push(event);
                    })
                    setEvents(newEvents)
                    setErrorSnackbarMessage(undefined);
                    setSuccessSnackbarMessage("Event deleted successfully")
                    resolve();
                }
            })
            .catch(reason => {
                setErrorSnackbarMessage("Failed to delete event: " + reason.toString());
                setSuccessSnackbarMessage(undefined)
            })
    }

    const handleTodoItemCreate = (todoItem) => {
        console.log(todoItem)
        API.post(`/houses/${houseId}/todo`, todoItem, {headers: {authorization: sessionStorage.getItem("token")}})
            .then(response => {
                if(response.status === 200){
                    let newTodoList = [...todoItems];
                    let newItem = response.data
                    newItem.checked = newItem.checked ? true : false;
                    newTodoList.splice(0, 0, newItem)
                    setTodoItems(newTodoList);
                    setErrorSnackbarMessage(undefined);
                    setSuccessSnackbarMessage("Item created successfully");
                }
            })
            .catch(reason => {
                setErrorSnackbarMessage("Failed to create an item: " + reason.toString());
                setSuccessSnackbarMessage(undefined)
            })
    }

    const handleTodoItemEdit = (todoItem) => {
        API.put(`/houses/${houseId}/todo/${todoItem.id}`, todoItem, {headers: {authorization: sessionStorage.getItem("token")}})
            .then(response => {
                if (response.status === 200) {
                    let newTodoList = [];
                    todoItems.forEach(item => {
                        if (item.id !== todoItem.id)
                            newTodoList.push(item);
                        else
                            newTodoList.push(todoItem);
                    })
                    setTodoItems(newTodoList);
                    setErrorSnackbarMessage(undefined);
                    setSuccessSnackbarMessage("Item edited successfully");
                }
            })
            .catch(reason => {
                setErrorSnackbarMessage("Failed to edit item: " + reason.toString());
                setSuccessSnackbarMessage(undefined)
            })
    }

    const handleTodoItemDelete = (todoItem) => {
        API.delete(`/houses/${houseId}/todo/${todoItem.id}/delete`, {headers: {authorization: sessionStorage.getItem("token")}})
            .then(response => {
                if (response.status === 200) {
                    let newTodoList = [];
                    todoItems.forEach(item => {
                        if (item.id !== todoItem.id)
                            newTodoList.push(item);
                    })
                    setTodoItems(newTodoList);
                    setErrorSnackbarMessage(undefined);
                    setSuccessSnackbarMessage("Item deleted successfully");
                }
            })
            .catch(reason => {
                setErrorSnackbarMessage("Failed to delete item: " + reason.toString());
                setSuccessSnackbarMessage(undefined)
            })
    }

    return(
        <>
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
                            <Calendar events={events}
                                      onEventCreate={handleOpenNewEventDialog}
                                      onEventDetail={(event) => handleOpenEventDetailDialog(event)}
                            />
                        </TableCell>
                        <TableCell sx={{width: "30%", verticalAlign: "top", borderBottom:"none"}}>
                            <Box sx={{width: '100%', overflowY: 'scroll', maxHeight: "calc(calc(100vw * 0.42) - 16px)", minHeight: "calc(calc(100vw * 0.42) - 16px)"}}>
                                <TODOList items={todoItems}
                                          onItemAdd={handleTodoItemCreate}
                                          onItemEdit={handleTodoItemEdit}
                                          onItemDelete={handleTodoItemDelete}
                                />
                            </Box>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <br/>
            <HomeInventory/>
            <Box textAlign='center' marginTop="5%">
                <Button variant="contained" aria-label="deleteHouseButton" onClick={handleOpenDeleteHouseDialog} color={"error"}>
                    Delete House
                </Button>
                <Dialog
                    open={openDeleteHouseDialog}
                    onClose={handleCloseDeleteHouseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Are you sure you want to delete this house?"}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={handleCloseDeleteHouseDialog} sx={{color: '#4B4E6D'}}>
                            Close
                        </Button>
                        <Button variant='contained' color={"error"}
                                onClick={handleHouseDelete} autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>

            <NewEventDialog open={newEventDialogOpen}
                            onClose={handleCloseNewEventDialog}
                            selectedDay={newEventDialogSelectedDay}
                            selectedHouse={house ? house.id : undefined}
                            houseList={houseList}
                            handleCreate={handleEventCreate}
                            handleCancel={() => setNewEventDialogOpen(false)}
            />
            <EventDetailDialog open={eventDetailDialogOpen}
                               onClose={handleCloseEventDetailDialog}
                               selectedHouse={house ? house.id : undefined}
                               houseList={houseList}
                               event={eventDetailDialogEvent}
                               handleEdit={handleEventEdit}
                               handleDelete={handleEventDelete}
                               handleCancel={() => setEventDetailDialogOpen(false)}
            />

            <Snackbar open={successSnackbarMessage !== undefined} autoHideDuration={6000} onClose={() => setSuccessSnackbarMessage(undefined)}>
                <Alert onClose={() => setSuccessSnackbarMessage(undefined)} severity={"success"} variant={"filled"}>{successSnackbarMessage}</Alert>
            </Snackbar>
            <Snackbar open={errorSnackbarMessage !== undefined} onClose={() => setErrorSnackbarMessage(undefined)}>
                <Alert onClose={() => setErrorSnackbarMessage(undefined)} severity={"error"} variant={"filled"}>{errorSnackbarMessage}</Alert>
            </Snackbar>
        </>
    );
}