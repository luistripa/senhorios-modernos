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
} from '@mui/material';
import {Delete, Add} from '@mui/icons-material';
import {useEffect, useState} from "react";

export function TODOList(props){

    const [checked, setChecked] = useState([-1]);

    const [todoList, setTodoList] = useState([]);

    const [inputText, setInputText] = useState("");

    useEffect(() => {
        setTodoList([
            "Clean Kitchen",
            "Paint wall",
            "Fix pipe",
        ]);
    }, []);

    const handleToggle = (value) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleDelete = (value) => {
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
        if(string === ""){

        }
        let newTodoList = [...todoList];
        newTodoList.push(string);
        setTodoList(newTodoList);
        setInputText("");
    }

    const handleInput = e=> {
        setInputText(e.target.value);
    }

    return (
        <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
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
                        <ListItemButton role={undefined} onClick={() => handleToggle(value)} dense>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={todoList[value]} />
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
        </List>
    );
}