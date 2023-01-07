import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': '2fee79fc-25e6-48d9-8e58-608ff8543884',
    },
})

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(
            `todo-lists/${todolistId}`,
            {title: title}
        )
    },

    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
    },

    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})
    },

    deleteTodolist(todoId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoId}`)
    },


    getTasks(todolistId: string) {
        return instance.get<GetTasksType>(`todo-lists/${todolistId}/tasks`)
    },

    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
    },

    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },

    updateTask(todolistId: string, taskId: string, properties: UpdateTaskPropertiesType) {
        return instance.put<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, properties)
    }
}

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type  ResponseType<D = {}> = {
    data: D
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}

type TaskType = {
    addedDate: string
    deadline: null | string
    description: null | string
    id: string
    order: number
    priority: number
    startDate: null | string
    status: number
    title: string
    todoListId: string
}

type GetTasksType = {
    error: null | number
    items: TaskType[]
    totalCount: number
}
type UpdateTaskPropertiesType = {
    title: string,
    description: string,
    completed: boolean,
    status: number,
    priority: number,
    startDate: string,
    deadline: string
}

