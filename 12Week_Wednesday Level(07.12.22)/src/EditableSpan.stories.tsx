import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "./EditableSpan";


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Todolist/EditableSpan',
    component: EditableSpan,
/*    argTypes: {
        onClick: {
            description: 'Button inside form clicked'
        }
    },*/
} as ComponentMeta<typeof EditableSpan>;


// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanExample = Template.bind({}) //здесь bind создает клон функции Template
EditableSpanExample.args = {
    value: 'Start value',
    onChange: action('Editable span value changed')
}




