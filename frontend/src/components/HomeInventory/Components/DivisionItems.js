import {Form} from "react-bootstrap";
import {createRef, Component, useState, useEffect} from "react";
import * as React from "react";
import "./components-homeinventory.css";
import {
    Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from "@mui/material";
import API from "../../../api";
import DeleteIcon from '@mui/icons-material/Delete';

export function DivisionItems(props) {
    const [items, setItems] = useState([]);
    const [item, setItem] = useState(null);
    const [AddItemButtonShown, setAddItemButtonShown] = useState(true);
    const [AddItemFormShown, setAddItemFormShown] = useState(false);

    useEffect(() => {
        let token = sessionStorage.getItem("token");

        API.get('/houses/' + props.houseId + '/inventory/' + props.division.id + '/items/list',
            {headers: {authorization: token}})
            .then(response => {
                let itemsResp = response.data;
                setItems(itemsResp);
            }).catch(reason => {
            console.log(reason)
        })
    }, []);

    const addItem = (item) => {
        API.post('/houses/' + props.houseId + '/inventory/' + props.division.id + '/items', item, {headers: {authorization: sessionStorage.getItem('token')}})
            .then(response => {
                let tmp = [];
                items.map((i) => {
                    tmp.push(i);
                })
                tmp.push(item);
                setItems(tmp);
            })

            .catch(reason => console.error(reason))
    };

    const changeItem = (event, item, operationTypeQty) => {
        let newItem = {
            id: item.id,
            name: item.name,
            count: operationTypeQty === 'increase' ? item.count + 1 : item.count - 1
        }
        API.put('/houses/' + props.houseId + '/inventory/' + props.division.id + '/items/' + item.id, newItem, {headers: {authorization: sessionStorage.getItem('token')}})
            .then(response => {
                if (response.status === 200) {
                    let newItems = [];
                    items.forEach(i => {
                        if (i.id !== item.id)
                            newItems.push(i);
                        else
                            newItems.push(newItem);
                    })
                    setItems(newItems);
                }
            })
            .catch(reason => console.error(reason))
    };

    const deleteItem = (item) => {
        API.delete('/houses/' + props.houseId + '/inventory/' + props.division.id + '/items/' + item.id + '/delete', {headers: {authorization: sessionStorage.getItem('token')}})
            .then(response => {
                if (response.status === 200) {
                    console.log('success');
                    let newItems = [];
                    items.map((i) => {
                        if (i.id !== item.id)
                            newItems.push(i);
                    })
                    setItems(newItems);
                }
            }).catch(reason => {
            console.log(reason)
        })
    }

    const showTableOfItems = () => {
        return (<TableContainer component={Paper} style={{width: "100%", maxHeight: '47vmax'}}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Item</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map(item => {
                        return showItems(item);
                    })}
                </TableBody>
            </Table>
        </TableContainer>);
    };

    const showItems = (item) => {
        return (<>
            <tr>
                <td width={'50%'}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontSize: "15px",
                        color: 'black'
                    }}>{item.name}</div>
                </td>
                <td width={'50%'} style={{padding: '3%'}}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Button
                            className={"quantity-button"}
                            onClick={(event) => changeItem(event, item, "decrease")}
                            style={{fontSize: "15px", color:'#A2A3BB'}}
                        >
                            -
                        </Button>
                        <p className={"quantity-output-label"}
                           style={{fontSize: "15px", color: 'black'}}>{item.count}</p>
                        <Button
                            className={"quantity-button"}
                            onClick={(event) => changeItem(event, item, "increase")}
                            style={{fontSize: "15px", color:'#A2A3BB'}}
                        >
                            +
                        </Button>
                        <Button style={{color: 'grey'}} onClick={() => deleteItem(item)}><DeleteIcon/></Button>
                    </div>
                </td>

            </tr>
        </>);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addItem(item);
        setItem(null);
        document.getElementById("form-division-items").reset();

    }

    const handleChange = (event) => {
        let newItem = item == null ? {
            name: "", count: 0
        } : item;

        newItem[event.target.name] = event.target.value;
        setItem(newItem);
    }

    const showForm = () => {
        return (<>
            <div style={{display: "flex", justifyContent: 'center', marginTop: '8%'}}>
                <form
                    id={'form-division-items'}
                    className={"division-items-form"}
                    onSubmit={(event) => handleSubmit(event)}
                >
                    <Form.Group
                        controlId="formBasicProductName"
                        className={"division-item-group"}
                    >
                        <label style={{fontSize: "13px"}}>Item Name:</label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Item Name"
                            name="name"
                            required
                            onChange={(event) => handleChange(event)}
                        />
                    </Form.Group>
                    <Form.Group
                        controlId="formBasicQty"
                        className={"division-item-group"}
                    >
                        <label style={{fontSize: "13px"}} className={"division-item-label"}>Quantity:</label>
                        <Form.Control
                            type="number"
                            placeholder="How many?"
                            name="count"
                            required
                            onChange={(event) => handleChange(event)}
                        />
                    </Form.Group>

                    <button variant="primary" type="submit" style={{marginTop: '4%', fontSize: "15px"}}>
                        Add to Inventory
                    </button>
                </form>
            </div>
        </>);
    };

    return (
        <>
            <div className={"division-items"}>
                {items.length === 0 && AddItemButtonShown && (
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <div
                            style={{
                                display: "flex", flexDirection: "column", alignItems: "center",
                            }}
                        >
                            <img
                                style={{width: "69%", height: "94%", opacity: "80%"}}
                                src={"/interior_livingroom.png"}
                                loading="lazy"
                            />
                            <p className={"emptyListLabel"} style={{color: "grey", fontSize: "14px"}}>
                                Empty room!
                            </p>
                        </div>
                    </div>)}

                {items.length === 0 && !AddItemButtonShown &&
                    <div>{showForm()}</div>}

                {items.length !== 0 && AddItemButtonShown && (<>
                    <div>{showTableOfItems()}</div>
                </>)}

                {items.length !== 0 && !AddItemButtonShown && (<>
                    <div>{showTableOfItems()}</div>
                    <div>{showForm()}</div>
                </>)}

                {AddItemButtonShown && (<div className={"addItemBtnSection"}>
                    <button
                        style={{backgroundColor: "#A2A3BB", fontSize: "15px"}}
                        onClick={() => {
                            setAddItemFormShown(true);
                            setAddItemButtonShown(false);
                        }}
                    >
                        Add item
                    </button>
                    {items.length === 0 &&
                        <button
                            style={{backgroundColor: "#A2A3BB", fontSize: "15px"}}
                            onClick={() =>
                                props.deleteDivision(props.division)}
                        >
                            Delete Division
                        </button>}
                    {items.length !== 0 &&
                        <button
                            style={{backgroundColor: "#A2A3BB", fontSize: "15px"}}
                            onClick={props.handleClose}
                        >
                            Save
                        </button>}
                </div>)
                }

            </div>
        </>)

}
