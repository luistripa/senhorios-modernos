import {useEffect, useState} from "react";

import "./HomeInventory.css"
import {Alert} from "@mui/material";
import {DivisionCard} from "./Components/DivisionCard";
import DivisionModal from "./Components/DivisionModal";
import * as React from "react";
import NewDivisionModal from "./Components/NewDivisionModal";
import API from "../../api";
import Snackbar from "@mui/material/Snackbar";

export function HomeInventory(props) {
    const [divisions, setDivisions] = useState([]);
    const [newDivisionCreated, setNewDivisionCreated] = useState(false);
    const [divisionDeleted, setDivisionDeleted] = useState(false);
    const [division, setDivision] = useState(null);

    const [successSnackbarMessage, setSuccessSnackbarMessage] = useState(undefined);
    const [errorSnackbarMessage, setErrorSnackbarMessage] = useState(undefined);

    useEffect(() => {
        setDivisions(props.divisions);
    }, [props.divisions]);

    const addDivision = (division) => {
        let formData = new FormData()
        formData.append('photo', division.icon)

        API.post('/media/', formData, {headers: {authorization: sessionStorage.getItem('token')}})
            .then(response => {
                let photoInfo = response.data;

                division.mediaId = photoInfo.id;
                API.post('/houses/' + props.houseId + '/inventory', division, {headers: {authorization: sessionStorage.getItem('token')}})
                    .then(response => {
                        console.log(response.data)
                        let tmp = [];
                        divisions.map((div) => {
                            tmp.push(div);
                        })
                        tmp.push(division);
                        setDivisions(tmp);
                        setSuccessSnackbarMessage("Created successfully!");
                    }).catch(reason => {
                    console.log(reason)
                })
            })
            .catch(reason => console.error(reason))


    }

    const deleteDivision = (division) => {
        setDivision(null);
        API.delete('/houses/' + props.houseId + '/inventory/' + division.id + '/delete', {headers: {authorization: sessionStorage.getItem('token')}})
            .then(response => {
                if (response.status === 200) {
                    let newDivisions = [];
                    divisions.forEach(div => {
                        if (div.id !== division.id)
                            newDivisions.push(div);
                    })
                    setDivisions(newDivisions);
                    setSuccessSnackbarMessage("Deleted successfully!")
                }
            }).catch(reason => {
            console.log(reason)
        })
    }

    const editDivision = (division) => {
        console.log('entrou ', division);
        API.put('/houses/' + props.houseId + '/inventory/' + division.id, division, {headers: {authorization: sessionStorage.getItem('token')}})
            .then(response => {
                if (response.status === 200) {
                    let newDivisions = [];
                    divisions.forEach(div => {
                        if (div.id !== division.id)
                            newDivisions.push(div);
                        else
                            newDivisions.push(division);
                    })
                    setDivisions(newDivisions);
                    setSuccessSnackbarMessage("Changed successfully!")
                }
            }).catch(reason => {
            console.log(reason)
        })
    }

    const openDivision = (division) => {
        setDivision(division);
    }

    return (
        <>
            <div style={{padding: "3% 0 3% 0", display: 'flex', justifyContent: 'center'}}>
                <h1>House Inventory</h1>
            </div>

            <div style={{display: "flex", justifyContent: "center"}}>
                <div style={{width: "80%", display: "flex", justifyContent: "center", overflowX: "scroll"}}>
                    {divisions.map( division => (
                        <div onClick={() => openDivision(division)}
                             style={{
                                 float: "left",
                                 width: "20%",
                                 margin: "0 2%",
                                 border: "0px",
                                 backgroundColor: "transparent",
                                 cursor: "pointer"
                             }}>
                            <DivisionCard key={division.id} name={division.name} image={division.mediaId}/>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{justifyContent: "center", display: "flex", marginTop: "5%"}}>
                <NewDivisionModal functionCreate={addDivision}></NewDivisionModal>
            </div>
            <DivisionModal division={division}
                           open={division != null}
                           close={() => setDivision(null)}
                           deleteDivision={division != null ? deleteDivision : null}
                           editDivision={division != null ? editDivision : null}/>
            <Snackbar open={successSnackbarMessage !== undefined} autoHideDuration={6000}
                      onClose={() => setSuccessSnackbarMessage(undefined)}>
                <Alert style={{fontSize: "15px"}} onClose={() => setSuccessSnackbarMessage(undefined)} severity={"success"}
                       variant={"filled"}>{successSnackbarMessage}</Alert>
            </Snackbar>
            <Snackbar open={errorSnackbarMessage !== undefined} onClose={() => setErrorSnackbarMessage(undefined)}>
                <Alert style={{fontSize: "15px"}} onClose={() => setErrorSnackbarMessage(undefined)} severity={"error"}
                       variant={"filled"}>{errorSnackbarMessage}</Alert>
            </Snackbar>
        </>
    )
}
