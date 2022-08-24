import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "HTML&CSS", isDone: true},
        {id: 3, title: "JS", isDone: true},
        {id: 4, title: "ReactJS", isDone: false},
        {id: 5, title: "ReactJS", isDone: false},
        {id: 6, title: "ReactJS", isDone: false}
    ]);
    let [filter, setFilter] = useState<FilterValuesType>('all')

    let tasksForTodoList = tasks;

    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }


    const removeTask = (taskID: number) => {
        let filteredTasks = tasks.filter(t => t.id !== taskID)
        setTasks(filteredTasks)
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />

        </div>
    );
}

export default App;
