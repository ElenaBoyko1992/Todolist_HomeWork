import React, {useCallback, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {

    FilterValuesType,
    todolistsActions, todoThunks
} from 'features/TodolistsList/todolists.reducer'
import {tasksThunks} from 'features/TodolistsList/tasks.reducer'
import {Grid, Paper} from '@mui/material'
import {AddItemForm} from 'common/components'
import {Todolist} from './Todolist/Todolist'
import {Navigate} from 'react-router-dom'
import {useAppDispatch} from 'common/hooks/useAppDispatch';
import {selectIsLoggedIn} from 'features/auth/auth.selectors';
import {selectTasks} from 'features/TodolistsList/tasks.selectors';
import {selectTodolists} from 'features/TodolistsList/todolists.selectors';
import {TaskStatuses} from 'common/enums';


type PropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {
    const todolists = useSelector(selectTodolists)
    const tasks = useSelector(selectTasks)
    const isLoggedIn = useSelector(selectIsLoggedIn)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return;
        }
        const thunk = todoThunks.fetchTodolists(null)
        dispatch(thunk)
    }, [])

    const removeTask = useCallback(function (id: string, todolistId: string) {
        const thunk = tasksThunks.removeTask({taskId: id, todolistId})
        dispatch(thunk)
    }, [])

    const addTask = useCallback(function (title: string, todolistId: string) {
        dispatch(tasksThunks.addTask({title, todolistId}))
    }, [])

    const changeStatus = useCallback(function (taskId: string, status: TaskStatuses, todolistId: string) {
        dispatch(tasksThunks.updateTask({taskId, domainModel: {status}, todolistId}))
    }, [])

    const changeTaskTitle = useCallback(function (taskId: string, title: string, todolistId: string) {
        dispatch(tasksThunks.updateTask({taskId, domainModel: {title}, todolistId}))
    }, [])

    const changeFilter = useCallback(function (filter: FilterValuesType, id: string) {
        dispatch(todolistsActions.changeTodolistFilter({id, filter}))
    }, [])

    const removeTodolist = useCallback(function (id: string) {
        const thunk = todoThunks.removeTodolist({id})
        dispatch(thunk)
    }, [])

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        dispatch(todoThunks.changeTodolistTitle({id, title}))
    }, [])

    const addTodolist = useCallback((title: string) => {
        const thunk = todoThunks.addTodolist({title})
        dispatch(thunk)
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]

                    return <Grid item key={tl.id}>
                        <Paper style={{padding: '10px'}}>
                            <Todolist
                                todolist={tl}
                                tasks={allTodolistTasks}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                                demo={demo}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}
