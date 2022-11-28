import "./TODOList.css"
import * as React from 'react';
import {
    Checkbox,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Input,
    Table,
    TableBody,
    TableRow,
    Button
} from '@mui/material';
import {Delete, Check, ListAlt} from '@mui/icons-material';
import {useEffect, useState} from "react";
import Typography from "@mui/joy/Typography";

export function TODOList(props){

    const [todoList, setTodoList] = useState([]);

    const [inputText, setInputText] = useState("");

    const [inputTextEdit, setInputTextEdit] = useState("");

    const [addItem, setAddItem] = useState(false);

    const [isEmpty, setIsEmpty] = useState(false);

    const [editItemId, setEditItemId] = useState(undefined);

    useEffect(() => {
        setTodoList(props.items)

        if (props.items.length === 0)
            setIsEmpty(true);
        sortTodoList(props.items)
    }, [props.items]);

    // Handles changes from the create item input
    const handleInput = e => {
        setInputText(e.target.value);
    }

    // Handles changes from the edit item input
    const handleInputEdit = e => {
        setInputTextEdit(e.target.value);
    }

    // Handle enter keydown for add input
    const handleKeyDown = e => {
        if(e.key === 'Enter'){
            handleAdd(e.target.value)
        }
    }

    // Adds a new item to the todo list
    const handleAdd = (string) => {
        if(string !== ""){
            let newTodoList = [...todoList];
            newTodoList.splice(0, 0, {id: todoList.length, name: string, checked: false})

            sortTodoList(newTodoList);
            setInputText("");
        }
        setIsEmpty(false);
        setAddItem(false);

        props.onItemAdd({name: string, checked:false})
    }

    // Handle enter keydown or input blur for edit input
    const handleKeyDownEdit = (e, value) => {
        if(e.key === 'Enter' || e.type === "blur"){
            handleEdit(value);
        }
    };

    // Edits an existing item in the todo list
    const handleEdit = (value) => {
        let newTodoList = [];
        todoList.forEach(elem => {
            if(elem.id === value.id){
                elem.name = inputTextEdit
            }
            newTodoList.push(elem);
        })
        setTodoList(newTodoList);
        setEditItemId(undefined);

        props.onItemEdit(value);
    }

    // Toggles item add menu
    const handleAddButton = () => {
        setAddItem(!addItem);
    }

    const handleDelete= (value) => {
        let newTodoList = [];
        todoList.forEach(elem => {
            if (elem.id !== value.id)
                newTodoList.push(elem);
        })
        if(newTodoList.length === 0){
            setIsEmpty(true);
        }
        sortTodoList(newTodoList);
        props.onItemDelete(value)
    }

    // Handles the todo check box change
    const handleToggle = (value) => {
        let newTodoList = [];
        todoList.forEach(elem => {
            if (elem.id === value.id) {
                elem.checked = !elem.checked;
            }
            newTodoList.push(elem);
        })
        sortTodoList(newTodoList);
    };

    // Opens edit input on item click
    const handleClick = (value) => {
        setEditItemId(value.id);
        setInputTextEdit(value.name);
    }

    const sortTodoList = (list) => {
        const sortedList = list.sort((a, b) => Number(a.checked) - Number(b.checked));
        setTodoList(sortedList);
    };

    return(
        <Table sx={{tableLayout: "fixed"}}>
            <TableBody>
                <TableRow sx={{justifyContent: "center", display: 'flex'}}>
                    <List component={"td"} sx={{padding: "0"}}>
                        <ListItem sx={{padding: "0"}}>
                            <Button variant="contained" aria-label="addButton" onClick={() => handleAddButton()}
                                    sx={{color: '#FBF9FF', backgroundColor:'#4B4E6D',  "&:hover": {
                                            backgroundColor: "#242038"
                                        }}}>
                                Add Item
                            </Button>
                        </ListItem>
                    </List>
                </TableRow>

                { addItem ? <TableRow>
                    <List component={"td"} sx={{padding: "0"}}>
                        <ListItem sx={{padding: "0"}}>
                            <IconButton onClick={() => handleAdd(inputText)}>
                                <Check style={{color: '#4B4E6D'}} />
                            </IconButton>
                            <Input value={inputText} autoFocus={true} onChange={handleInput} onKeyDown={handleKeyDown}
                                   sx={{bgcolor: 'background.paper', width:'80%'}}
                                   placeholder="Type new item"
                            />
                        </ListItem>
                    </List>
                </TableRow> : undefined}

                { isEmpty ? <TableRow>
                        <List component={"td"} sx={{padding: "0"}}>
                            <ListItem sx={{padding: "0"}}>
                                <div style={{width: "100%", marginTop: "5%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <Typography color={"lightgray"} display={"flex"} justifyContent={"center"}>
                                        <ListAlt/>
                                        <span>Empty List</span>
                                    </Typography>
                                </div>
                            </ListItem>
                        </List>
                    </TableRow>
                : todoList.map((value, _index, _) => (
                            <TableRow key={_index}>
                                <List component={"td"} sx={{padding: "0"}}>
                                    <ListItem sx={{padding: "0"}}>
                                        <Checkbox
                                            style={{color: '#4B4E6D'}}
                                            checked={value.checked}
                                            onClick={() => handleToggle(value)}
                                        />
                                        {editItemId === value.id ? <>
                                                <ListItemText primary={
                                                    <Input value={inputTextEdit} autoFocus={true} onChange={handleInputEdit} onKeyDown={(e) => handleKeyDownEdit(e, value)}
                                                           onBlur={(e) => handleKeyDownEdit(e, value)}
                                                           sx={{bgcolor: 'background.paper', width:'100%'}}
                                                    />
                                                }/>
                                                <IconButton onClick={() => handleEdit(value)}>
                                                    <Check style={{color: '#4B4E6D'}}/>
                                                </IconButton>
                                            </>
                                        : <>
                                                <ListItemText primary={
                                                <Typography sx={value.checked ? {textDecoration: "line-through", opacity: "30%"} : {}} title={value.name}
                                                            overflow={"hidden"} textOverflow={"ellipsis"} whiteSpace={"nowrap"} onClick={() => handleClick(value)}>
                                                    {value.name}
                                                </Typography>
                                                }/>
                                                <IconButton aria-label="delete" onClick={() => handleDelete(value)}>
                                                    <Delete style={{color: '#4B4E6D'}}/>
                                                </IconButton>
                                            </>
                                        }
                                    </ListItem>
                                </List>
                            </TableRow>
                        ))
                }
            </TableBody>
        </Table>

    );

}