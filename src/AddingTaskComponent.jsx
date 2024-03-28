import React from 'react';
import PropTypes from "prop-types";
import {CiCirclePlus} from "react-icons/ci";

export function AddingTaskComponent({ addTask }) {
    const [taskTitle, setTaskTitle] = React.useState('');
    const add = () => {
        console.log(taskTitle);
        if(taskTitle.trim() !== ''){
            addTask(taskTitle);
            setTaskTitle('');
        }
    }

    return (
        <>
            <button className={"button-to-do-list"} onClick={add}>
                <CiCirclePlus />
            </button>
            <input value={taskTitle}
                   onChange={(e) =>
                       setTaskTitle(e.target.value)}
            />
        </>
    );
}

AddingTaskComponent.propTypes = {
    addTask: PropTypes.func.isRequired
};