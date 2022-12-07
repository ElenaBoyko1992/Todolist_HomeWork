import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Todolist/AddItemForm',
    component: AddItemForm,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof AddItemForm>;

const callBack = action('title')
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const AddItemFormExample : ComponentStory<typeof AddItemForm> = () => <AddItemForm addItem={callBack}/>;




