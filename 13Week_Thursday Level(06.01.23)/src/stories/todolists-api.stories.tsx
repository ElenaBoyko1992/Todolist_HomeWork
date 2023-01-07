import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then(res => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const title = 'New List'

    useEffect(() => {
        todolistAPI.createTodolist(title)
            .then(res => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todoId = '57e3a433-bc0e-4155-93d7-09ce9dbf6fe8'

    useEffect(() => {
        todolistAPI.deleteTodolist(todoId)
            .then(res => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = '92b4a84c-b8a7-4ede-98b5-74521bb5b640'
        const title = 'New Title'

        todolistAPI.updateTodolist(todoId, title)
            .then(res => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')

    const getTasks = () => {
        todolistAPI.getTasks(todolistId)
            .then(res => setState(res.data))
    }

    return <div>{JSON.stringify(state)}
        <input placeholder={"TodolistId"} value={todolistId}
               onChange={(e) => {
                   setTodolistId(e.currentTarget.value)
               }}/>
        <button onClick={getTasks}>get tasks</button>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [taskTitle, setTaskTitle] = useState('')

    const createTask = () => {
        todolistAPI.createTask(todolistId, taskTitle)
            .then(res => setState(res.data))
    }

    return <div>{JSON.stringify(state)}
        <input placeholder={"TodolistId"} value={todolistId}
               onChange={(e) => {
                   setTodolistId(e.currentTarget.value)
               }}/>
        <input placeholder={"Task Title"} value={taskTitle}
               onChange={(e) => {
                   setTaskTitle(e.currentTarget.value)
               }}/>
        <button onClick={createTask}>createTask</button>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [taskId, setTaskId] = useState('')

    const deleteTask = () => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then(res => setState(res.data))
    }

    return <div>{JSON.stringify(state)}
        <input placeholder={"TodolistId"} value={todolistId}
               onChange={(e) => {
                   setTodolistId(e.currentTarget.value)
               }}/>
        <input placeholder={"Task Id"} value={taskId}
               onChange={(e) => {
                   setTaskId(e.currentTarget.value)
               }}/>
        <button onClick={deleteTask}>deleteTask</button>
    </div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [taskDescription, setTaskDescription] = useState<string>('')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')


    const updateTask = () => {
        todolistAPI.updateTask(todolistId, taskId, {
            title: taskTitle,
            description: taskDescription,
            completed: false,
            status: status,
            priority: priority,
            startDate: startDate,
            deadline: deadline
        })
            .then(res => setState(res.data))
    }

    return <div>{JSON.stringify(state)}
        <input placeholder={"TaskId"} value={taskId}
               onChange={(e) => {
                   setTaskId(e.currentTarget.value)
               }}/>
        <input placeholder={"TodolistId"} value={todolistId}
               onChange={(e) => {
                   setTodolistId(e.currentTarget.value)
               }}/>
        <input placeholder={"Task Title"} value={taskTitle}
               onChange={(e) => {
                   setTaskTitle(e.currentTarget.value)
               }}/>
        <input placeholder={"Description"} value={taskDescription}
               onChange={(e) => {
                   setTaskDescription(e.currentTarget.value)
               }}/>
        <input placeholder={"status"} value={status} type={'number'}
               onChange={(e) => {
                   setStatus(+e.currentTarget.value)
               }}/>
        <input placeholder={"priority"} value={priority} type={'number'}
               onChange={(e) => {
                   setPriority(+e.currentTarget.value)
               }}/>
        <button onClick={updateTask}>updateTask</button>
    </div>
}

