import {TasksStateType, TodolistType} from '../App';
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

type RemoveTaskAT = ReturnType<typeof removeTaskAC>
type AddTaskAT = ReturnType<typeof addTaskAC>
type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>

type ActionsType =
    RemoveTaskAT
    | AddTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT
    | AddTodolistActionType
    | RemoveTodolistActionType;

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(
                    t => t.id !== action.taskId
                )
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        case 'CHANGE-TASK-STATUS':
            const stateCopy = {...state}
            stateCopy[action.todolistId] = stateCopy[action.todolistId].map(t => t.id === action.taskId ? {
                ...t,
                isDone: action.isDone
            } : t)
            return stateCopy
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = stateCopy[action.todolistId].map(t => t.id === action.taskId ? {
                ...t,
                title: action.title
            } : t)
            return stateCopy
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string,) => ({
    type: 'REMOVE-TASK', taskId, todolistId
} as const)

export const addTaskAC = (title: string, todolistId: string) => ({
    type: 'ADD-TASK', title, todolistId
} as const)

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => ({
    type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId
} as const)

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => ({
    type: 'CHANGE-TASK-TITLE', taskId, title, todolistId
} as const)