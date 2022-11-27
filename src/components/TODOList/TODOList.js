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

export function TODOList(){

    const [todoList, setTodoList] = useState([]);

    const [inputText, setInputText] = useState("");

    const [addItem, setAddItem] = useState(false);

    const [isEmpty, setIsEmpty] = useState(false);

    //TODO - Fazer sort aqui no useEffect
    useEffect(() => {
        let todoList = [
            {
                id: 0,
                name: "Clean Kitchen",
                checked: false
            },
            {
                id: 1,
                name: "Paint wall",
                checked: false
            },
            {
                id: 2,
                name: "Fix pipe",
                checked: false
            },
            {
                id: 3,
                name: "Do laundry",
                checked: true
            },
            {
                id: 4,
                name: "Buy washing machine",
                checked: true
            },
            {
                id: 5,
                name: "Do laundry",
                checked: true
            },
            {
                id: 6,
                name: "Buy washing machine",
                checked: true
            },
            {
                id: 7,
                name: "Do laundry",
                checked: true
            },
            {
                id: 8,
                name: "Buy washing machine",
                checked: true
            },
            {
                id: 9,
                name: "Do laundry",
                checked: true
            },
            {
                id: 10,
                name: "Buy washing machine",
                checked: true
            },
            {
                id: 11,
                name: "Clean Kitchen",
                checked: false
            },
            {
                id: 12,
                name: "Paint wall",
                checked: false
            }
        ];

        sortTodoList(todoList)
    }, []);

    const handleInput = e => {
        setInputText(e.target.value);
    }

    const handleKeyDown = e => {
        if(e.key === 'Enter'){
            handleAdd(e.target.value)
        }
    }

    const handleAdd = (string) => {
        if(string !== ""){
            let newTodoList = [...todoList];
            newTodoList.splice(0, 0, {id: todoList.length, name: string, checked: false})

            sortTodoList(newTodoList);
            setInputText("");
        }
        setIsEmpty(false);
    }

    const handleAddButton = () => {
        setAddItem(!addItem);
    }

    const handleDelete= (id) => {
        let newTodoList = [];
        todoList.forEach(elem => {
            if (elem.id !== id)
                newTodoList.push(elem);
        })
        if(newTodoList.length === 0){
            setIsEmpty(true);
        }
        sortTodoList(newTodoList);
    }

    const handleToggle = (value) => {
        let newTodoList = [];
        let i = 0;
        todoList.forEach(elem => {
            if (i === value) {
                elem.checked = !elem.checked;
            }
            newTodoList.push(elem);
            i++;
        })
        sortTodoList(newTodoList);
    };

    const sortTodoList = (list) => {
        const sortedList = list.sort((a, b) => Number(a.checked) - Number(b.checked));
        setTodoList(sortedList);
    }

    return(
        <Table sx={{tableLayout: "fixed"}}>
            <TableBody>
                <TableRow>
                    <List component={"td"} sx={{padding: "0"}}>
                        <ListItem sx={{padding: "0"}}>
                            <Button variant="contained" aria-label="addButton" onClick={() => handleAddButton()}
                                    sx={{color: '#FBF9FF', backgroundColor:'#4B4E6D',  "&:hover": {
                                            backgroundColor: "#242038",
                                        }}}>
                                Add Item
                            </Button>
                        </ListItem>
                    </List>
                </TableRow>

                { addItem ? <TableRow>
                    <List component={"td"} sx={{padding: "0"}}>
                        <ListItem sx={{padding: "0"}}>
                            <IconButton>
                                <Check style={{color: '#4B4E6D'}} onClick={() => handleAdd(inputText)}/>
                            </IconButton>
                            <Input value={inputText} onChange={handleInput} onKeyDown={handleKeyDown}
                                   sx={{bgcolor: 'background.paper', width:'75%'}}
                                   style={{color: '#4B4E6D'}}
                                   placeholder="Type new item "
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
                : todoList.map((value, index, array) => (
                            <TableRow key={index}>
                                <List component={"td"} sx={{padding: "0"}}>
                                    <ListItem sx={{padding: "0"}}>
                                        <Checkbox
                                            style={{color: '#4B4E6D'}}
                                            checked={array[index].checked}
                                            onClick={() => handleToggle(index)}
                                        />
                                        <ListItemText primary={
                                            <Typography sx={value.checked ? {textDecoration: "line-through", opacity: "30%"} : {}} title={value.name} overflow={"hidden"} textOverflow={"ellipsis"} whiteSpace={"nowrap"}>
                                                {value.name}
                                            </Typography>
                                        }/>
                                        <IconButton aria-label="delete" onClick={() => handleDelete(value.id)}>
                                            <Delete style={{color: '#4B4E6D'}}/>
                                        </IconButton>
                                    </ListItem>
                                </List>
                            </TableRow>
                        ))
                }
            </TableBody>
        </Table>

    );

}