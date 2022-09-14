import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    /*    let [tasks, setTasks] = useState([
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ]);
        let [filter, setFilter] = useState<FilterValuesType>("all");*/

    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"}
    ])

    const [tasks, setTasks] = useState({
        [todoListId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "MEAT", isDone: true},
            {id: v1(), title: "BREAD", isDone: true},
            {id: v1(), title: "WATER", isDone: false},
        ]
    })

    function removeTask(id: string, todoListId: string) {
        /*   let filteredTasks = tasks.filter(t => t.id != id);
           setTasks(filteredTasks);*/
       
    }

    function addTask(title: string) {
        /*        let task = {id: v1(), title: title, isDone: false};
                let newTasks = [task, ...tasks];
                setTasks(newTasks);*/
    }

    function changeStatus(taskId: string, isDone: boolean) {
        /*        let task = tasks.find(t => t.id === taskId);
                if (task) {
                    task.isDone = isDone;
                }

                setTasks([...tasks]);*/
    }


    /*    let tasksForTodolist = tasks;

        if (filter === "active") {
            tasksForTodolist = tasks.filter(t => t.isDone === false);
        }
        if (filter === "completed") {
            tasksForTodolist = tasks.filter(t => t.isDone === true);
        }*/

    function changeFilter(value: FilterValuesType, todoListId: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: value} : tl))
    }


    return (
        <div className="App">
            {/*                <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      filter={filter}
            />*/}
            {todoLists.map(tl => {
                let tasksForTodolist = tasks[tl.id];

                if (tl.filter === "active") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                }
                if (tl.filter === "completed") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                }

                return (
                    <Todolist
                        key={tl.id}
                        todoListId={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                    />
                )
            })}
        </div>
    );
}

export default App;
