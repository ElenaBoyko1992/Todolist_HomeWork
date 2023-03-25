import {Dispatch} from 'redux'
import {RequestStatusType, setAppStatusAC} from '../../app/app-reducer'
import {authAPI, LoginParamsType} from '../../api/todolists-api'
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils'
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        //используем название c AC для совместимости с остальным кодом (чтобы не переписывать), по факту же
        //это AC-ом не является
        //state здесь по факту stateDraft, т.к. с ним работает библиотека immerjs. Типизировать его также как и
        // initialState не нужно (типизируются автоматически)
        // return можно не писать
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    }
})

export const authReducer = slice.reducer; //authReducer нужен для передачи его в рутовый редьюсер файла store.ts
export const setIsLoggedInAC = slice.actions.setIsLoggedInAC; //достаем AC (он теперь образуется автоматически)


// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: true}))
                dispatch(setAppStatusAC({ status: 'succeeded' }))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: false}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}



