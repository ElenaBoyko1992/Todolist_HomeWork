import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Task} from "./Task";
import {action} from "@storybook/addon-actions";


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Todolist/Task',
    component: Task,
} as ComponentMeta<typeof Task>;

const changeTaskStatusCallback = action('Status changed inside Task')
const changeTaskTitleCallback = action('Title changed inside Task')
const removeTaskCallback = action('Remove button inside Task was clicked')

const baseArgs = {
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTask: removeTaskCallback
}


// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneExample = Template.bind({}) //здесь bind создает клон функции Template
TaskIsDoneExample.args = {
    ...baseArgs,
    task: {id: '1', title: "JS", isDone: true},
    todolistId: 'todolistId1'
}

export const TaskIsNotDoneExample = Template.bind({}) //здесь bind создает клон функции Template
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {id: '1', title: "JS", isDone: false},
    todolistId: 'todolistId1'
}


