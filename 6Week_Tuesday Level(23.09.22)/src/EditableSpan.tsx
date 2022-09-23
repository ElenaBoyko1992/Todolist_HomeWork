import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableSpanPropsType = {
    value: string
    onChange: (newVal: string) => void
}

const EditableSpan = (props: EditableSpanPropsType) => {
    const [status, setStatus] = useState<boolean>(false)
    const [newValue, setNewValue] = useState<string>(props.value)

    const activateEditMode = () => {
        setStatus(true)
        setNewValue(props.value)
    }
    const activateViewMode = () => {
        setStatus(false)
        props.onChange(newValue)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            activateViewMode()
        }
    }
    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setNewValue(e.currentTarget.value)
    }

    return (
        status
            ? <input value={newValue}
                     autoFocus
                     onBlur={activateViewMode}
                     onChange={onChangeInput}
                     onKeyPress={onKeyDownHandler}
            />
            : <span onDoubleClick={activateEditMode}>{props.value}</span>
    )
};

export default EditableSpan;