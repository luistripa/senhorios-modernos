import "./TODOList.css"
import * as React from 'react';
import {
    Checkbox,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Input,
    Box
} from '@mui/material';
import {Delete, Check, AddBox} from '@mui/icons-material';
import {useEffect, useState} from "react";

export function TODOList(){

    const [todoList, setTodoList] = useState([]);

    const [inputText, setInputText] = useState("");

    const [addItem, setAddItem] = useState(false);

    //TODO - Fazer sort aqui no useEffect
    useEffect(() => {
        setTodoList([
            {
                id: 0,
                name: "Clean Kitchen",
                isChecked: false
            },
            {
                id: 1,
                name: "Paint wall",
                isChecked: false
            },
            {
                id: 2,
                name: "Fix pipe",
                isChecked: false
            },
            {
                id: 3,
                name: "Do laundry",
                isChecked: true
            },
            {
                id: 4,
                name: "Buy washing machine",
                isChecked: true
            }
        ]);
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
        let newTodoList = [...todoList];
        newTodoList.push({
            id: todoList.length,
            name: string,
            isChecked: false
        });
        sortTodoList(newTodoList);
        setInputText("");
        setAddItem(false);
    }

    const handleAddButton = () => {
        setAddItem(!addItem);
    }

    const handleDelete= (value) => {
        let newTodoList = [];
        let i = 0;
        todoList.forEach(elem => {
            if (i !== value)
                newTodoList.push(elem);
            i++;
        })
        sortTodoList(newTodoList);
    }

    const handleToggle = (e, value) => {
        let newTodoList = [];
        let i = 0;
        todoList.forEach(elem => {
            if (i === value) {
                elem.isChecked = !elem.isChecked;
                if(elem.isChecked){
                    e.target.style.setProperty('text-decoration', 'line-through');
                }
                else{
                    e.target.style.removeProperty('text-decoration');
                }
            }
            newTodoList.push(elem);
            i++;
        })
        sortTodoList(newTodoList);
    };

    const sortTodoList = (list) => {
        const sortedList = list.sort((a, b) => Number(a.isChecked) - Number(b.isChecked));
        setTodoList(sortedList);
    }

    return(
        <Box sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
            <List>
                <ListItem
                    secondaryAction={
                        <IconButton edge="end" aria-label="addButton" onClick={() => handleAddButton()}>
                            <AddBox/>
                        </IconButton>
                    }
                />
                {addItem &&
                    <ListItem
                    secondaryAction={
                        <IconButton edge="end" aria-label="add">
                            <Check onClick={() => handleAdd(inputText)}/>
                        </IconButton>
                    }
                    >
                        <Input value={inputText} onChange={handleInput} onKeyDown={handleKeyDown}
                               sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
                               placeholder="Type new item "
                        />
                    </ListItem>
                }
                {[...Array(todoList.length).keys()].map((value) => {
                    const labelId = `checkbox-list-label-${value}`;

                    return (
                        <ListItem
                            key={value}
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(value)}>
                                    <Delete/>
                                </IconButton>
                            }
                            disablePadding
                        >
                            <ListItemButton role={undefined} onClick={e => handleToggle(e, value)} dense>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={todoList[value].isChecked !== false}
                                        inputProps={{'aria-labelledby': labelId}}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={todoList[value].name}/>
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );

}