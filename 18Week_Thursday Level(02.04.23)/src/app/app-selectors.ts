import { AppRootStateType } from 'app/store';

export const selectApp = (state: AppRootStateType) => state.app

export const selectIsInitialized = (state: AppRootStateType) => selectApp(state).isInitialized
export const selectStatus = (state: AppRootStateType) => selectApp(state).status