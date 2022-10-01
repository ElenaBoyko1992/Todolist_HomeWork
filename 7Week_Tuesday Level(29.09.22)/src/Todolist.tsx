import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {DeleteOutlineOutlined} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export function Todolist(props: PropsType) {
    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title);
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <DeleteOutlineOutlined/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div style={{padding: '10px 0px'}}>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id);
                    }


                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                            checked={t.isDone}
                            onChange={onChangeHandler}
                            style={{padding: '3px'}}
                        />
                        <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
                        <IconButton onClick={onClickHandler} style={{padding: "0px 0px 4px 4px"}}>
                            <DeleteOutlineOutlined fontSize={"small"}/>
                        </IconButton>
                    </div>
                })
            }
        </div>
        <div>
            <Button variant="contained" onClick={onAllClickHandler}
                    color={props.filter === 'all' ? "secondary" : "primary"} size={"small"}
                    style={{margin: "3px"}}
            >
                All
            </Button>
            <Button variant="contained" onClick={onActiveClickHandler}
                    color={props.filter === 'active' ? "secondary" : "primary"} size={"small"}
                    style={{margin: "3px"}}>
                Active
            </Button>
            <Button variant="contained" onClick={onCompletedClickHandler}
                    color={props.filter === 'completed' ? "secondary" : "primary"} size={"small"}
                    style={{margin: "3px"}}>
                Completed
            </Button>
        </div>
    </div>
}


