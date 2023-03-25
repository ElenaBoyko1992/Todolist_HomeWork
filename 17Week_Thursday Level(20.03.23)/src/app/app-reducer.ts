import {Dispatch} from 'redux'
import {authAPI} from '../api/todolists-api'
import {setIsLoggedInAC} from '../features/Login/auth-reducer'
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        //используем название c AC для совместимости с остальным кодом (чтобы не переписывать), по факту же
        //это AC-ом не является
        //state здесь по факту stateDraft, т.к. с ним работает библиотека immerjs. Типизировать его также как и
        // initialState не нужно (типизируются автоматически)
        // return писать не нужно
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const appReducer = slice.reducer; //authReducer нужен для передачи его в рутовый редьюсер файла store.ts

export const setAppInitializedAC = slice.actions.setAppInitializedAC; //достаем AC (он теперь образуется автоматически)
export const setAppErrorAC = slice.actions.setAppErrorAC; //достаем AC (он теперь образуется автоматически)
export const setAppStatusAC = slice.actions.setAppStatusAC; //достаем AC (он теперь образуется автоматически)

//thunks
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}));
        } else {

        }
        dispatch(setAppInitializedAC({isInitialized: true}));
    })
}

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
