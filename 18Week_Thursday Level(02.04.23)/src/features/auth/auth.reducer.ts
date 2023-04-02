import {authAPI, LoginParamsType} from 'api/todolists-api'
import {handleServerAppError, handleServerNetworkError} from 'utils/error-utils'
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk} from 'app/store';
import {appActions} from 'app/app-reducer';
import {todolistsActions} from "features/TodolistsList/todolists-reducer";

// First, create the thunk
export const login = createAsyncThunk(
    'auth/login',
    async (data: any, thunkAPI) => {
        try {
            const response = await authAPI.login(data)

            if (response.data.resultCode === 0) {
                thunkAPI.dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
                thunkAPI.dispatch(appActions.setAppStatus({status: 'succeeded'}))
            } else {
                handleServerAppError(response.data, thunkAPI.dispatch)
            }
        } catch (error: any) {
            handleServerNetworkError(error, thunkAPI.dispatch)
        }
    }
)

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    },
    // extraReducers: builder => {
    //     builder
    //         .addCase(login.fulfilled, (state, action) => {
    //
    //             if (action.payload.resultCode === 0) {
    //                 state.isLoggedIn = true
    //             } else {
    //                 handleServerAppError(action.payload, dispatch)
    //             }
    //         })
    // }
})

export const authReducer = slice.reducer
export const authActions = slice.actions


// thunks
// export const loginTC = (data: LoginParamsType): AppThunk => (dispatch) => {
//     dispatch(appActions.setAppStatus({status: 'loading'}))
//     authAPI.login(data)
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
//                 dispatch(appActions.setAppStatus({status: 'succeeded'}))
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }
//         })
//         .catch((error) => {
//             handleServerNetworkError(error, dispatch)
//         })
// }

export const logoutTC = (): AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(authActions.setIsLoggedIn({isLoggedIn: false}))
                dispatch(todolistsActions.clearTodosData())
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
            return res
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

