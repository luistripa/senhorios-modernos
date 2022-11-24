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
    Divider,
} from '@mui/material';
import {Delete, Add} from '@mui/icons-material';
import {useEffect, useState} from "react";

export function TODOList(props){

    const [todoList, setTodoList] = useState([]);

    const [inputText, setInputText] = useState("");

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

    const handleToggle = (value) => {
        let newTodoList = [];
        let i = 0;
        todoList.forEach(elem => {
            if (i === value){
                elem.isChecked = !elem.isChecked;
            }
            newTodoList.push(elem);
            i++;
        })
        setTodoList(newTodoList);
    };

    const handleDelete= (value) => {
        let newTodoList = [];
        let i = 0;
        todoList.forEach(elem => {
            if (i !== value)
                newTodoList.push(elem);
            i++;
        })
        setTodoList(newTodoList);
    }

    const handleAdd = (string) => {
        let newTodoList = [...todoList];
        newTodoList.push({
            id: listIds().length,
            name: string,
            isChecked: false
        });
        setTodoList(newTodoList);
        setInputText("");
    }

    const handleInput = e=> {
        setInputText(e.target.value);
    }

    const listIds = () =>{
        let ids = [];
        todoList.forEach(elem => {
            ids.push(elem.id)
        })
        return ids;
    }

    return (
        <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
            {listIds().map((value) => {
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
                        <ListItemButton role={undefined} onClick={() => handleToggle(value)} dense>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={todoList[value].isChecked !== false}
                                    inputProps={{'aria-labelledby': labelId}}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={todoList[value].name} />
                        </ListItemButton>
                    </ListItem>
                );
            })}
            <ListItem
                secondaryAction={
                    <IconButton edge="end" aria-label="add">
                        <Add onClick={() => handleAdd(inputText)}/>
                    </IconButton>
            }
            >
                <Input value={inputText} onChange={handleInput}
                       sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
                       placeholder="Type new item "
                />
            </ListItem>
            <Divider/>
        </List>
    );
}