import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    id: string
}
type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
}
type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    filter: FilterValuesType
    id: string
}
type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    id: string
}

type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListFilterAT | ChangeTodoListTitleAT

export const todolistsReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            let newTodolistId = v1();
            let newTodolist: TodolistType = {id: newTodolistId, title: action.title, filter: 'all'};
            return [...state, newTodolist]
        case 'CHANGE-TODOLIST-TITLE':
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title;
            }
            return ([...state]);
        case 'CHANGE-TODOLIST-FILTER':
            let newTl = state.find(tl => tl.id === action.id);
            if (newTl) {
                newTl.filter = action.filter;
            }
            return [...state]

        default:
            throw new Error('I don\'t understand this type')
    }
}
export const RemoveTodolistAC = (todolistId: string): RemoveTodoListAT => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodolistAC = (newTodolistTitle: string): AddTodoListAT => {
    return {type: 'ADD-TODOLIST', title: newTodolistTitle}
}
export const ChangeTodolistTitleAC = (id: string, newTodolistTitle: string): ChangeTodoListTitleAT => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title: newTodolistTitle}
}
export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodoListFilterAT => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter}
}