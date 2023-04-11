import {appActions, RequestStatusType} from 'app/app.reducer'
import {AppThunk} from 'app/store';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {clearTasksAndTodolists} from 'common/actions/common.actions';
import {handleServerNetworkError} from 'common/utils/handle-server-network-error';
import {TaskType, todolistsApi, TodolistType} from 'features/TodolistsList/todolists.api';
import {createAppAsyncThunk, handleServerAppError} from "common/utils";
import {ResultCode} from "common/enums";


const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistType[] }, any>
('todo/fetchTodolists', async (param, {dispatch, rejectWithValue}) => {
    try {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        const res = await todolistsApi.getTodolists()

        dispatch(appActions.setAppStatus({status: 'succeeded'}))
        return {todolists: res.data}
    } catch (e) {
        handleServerNetworkError(e, dispatch);
        return rejectWithValue(null)
    }
})

const removeTodolist = createAppAsyncThunk<{ id: string }, { id: string }>
('todo/removeTodolist', async (param: { id: string }, {dispatch, rejectWithValue}) => {
    try {
        //изменим глобальный статус приложения, чтобы вверху полоса побежала
        dispatch(appActions.setAppStatus({status: 'loading'}))
        //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
        dispatch(todolistsActions.changeTodolistEntityStatus({id: param.id, entityStatus: 'loading'}))
        const res = await todolistsApi.deleteTodolist(param.id)
        if (res.data.resultCode === ResultCode.Success) {
            //скажем глобально приложению, что асинхронная операция завершена
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
            return {id: param.id}
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})

const initialState: TodolistDomainType[] = []


const slice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
            const newTodolist: TodolistDomainType = {...action.payload.todolist, filter: 'all', entityStatus: 'idle'}
            state.unshift(newTodolist)
        },
        changeTodolistTitle: (state, action: PayloadAction<{ id: string, title: string }>) => {
            const todo = state.find(todo => todo.id === action.payload.id)
            if (todo) {
                todo.title = action.payload.title
            }
        },
        changeTodolistFilter: (state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) => {
            const todo = state.find(todo => todo.id === action.payload.id)
            if (todo) {
                todo.filter = action.payload.filter
            }
        },
        changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>) => {
            const todo = state.find(todo => todo.id === action.payload.id)
            if (todo) {
                todo.entityStatus = action.payload.entityStatus
            }
        },
    },
    extraReducers: builder => {
        builder
            .addCase(clearTasksAndTodolists, () => {
                return []
            })
            .addCase(fetchTodolists.fulfilled, (state, action) => {
                return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
            })
            .addCase(removeTodolist.fulfilled, (state, action) => {
                const index = state.findIndex(todo => todo.id === action.payload.id)
                if (index !== -1) state.splice(index, 1)
            })
    }
})

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions
export const todoThunks = {fetchTodolists, removeTodolist}

// thunks


export const addTodolistTC = (title: string): AppThunk => {
    return (dispatch) => {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        todolistsApi.createTodolist(title)
            .then((res) => {
                dispatch(todolistsActions.addTodolist({todolist: res.data.data.item}))
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
            })
    }
}
export const changeTodolistTitleTC = (id: string, title: string): AppThunk => {
    return (dispatch) => {
        todolistsApi.updateTodolist(id, title)
            .then(() => {
                dispatch(todolistsActions.changeTodolistTitle({id, title}))
            })
    }
}

// types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
