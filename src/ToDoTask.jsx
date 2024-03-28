import React, { useState } from 'react';
import PropTypes from "prop-types";
import {FaEdit} from "react-icons/fa";
import {FaTrashCan} from "react-icons/fa6";
import {IoIosCheckbox} from "react-icons/io";
import {MdCheckBoxOutlineBlank} from "react-icons/md";
import CalendarPopUp from "./CalendarPopUp.jsx";
import { format } from 'date-fns';

export function ToDoTask({ deleteTask, updateTask, task, id, isDone, dateTask, updateDate }) {
    const [editing, setEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(task);
    const [checked, setChecked] = useState(isDone);
    const [date, setDate] = useState(dateTask);

    const edit = () => {
        setEditing(true);
    }

    const save = () => {
        updateTask(id, editedTask);
        setEditing(false);
    }

    const cancel = () => {
        setEditedTask(task);
        setEditing(false);
    }

    const deleteT = () => {
        deleteTask(id);
    }

    const toggleCheck = () => {
        setChecked(!checked);
    }

    const updateD = (id, newDate) => {
        updateDate(id, newDate);
        setDate(newDate);
    }


    return (
        <div>
            <div className={checked ? "to-do-task checked" : "to-do-task"}>
                <button onClick={toggleCheck}>
                    {checked ? (
                        <IoIosCheckbox />
                    ) : (
                        <MdCheckBoxOutlineBlank />
                    )}
                </button>
                {editing ? (
                    <input
                        type="text"
                        value={editedTask}
                        onChange={(e) => setEditedTask(e.target.value)}
                    />
                ) : (
                    <div>
                        <p>{task}</p>
                        <p>{format(dateTask, 'dd/MM/yyyy')}</p>
                    </div>
                )}
                {editing ? (
                    <div>
                        <button onClick={save}>Save</button>
                        <button onClick={cancel}>Cancel</button>
                    </div>
                ) : (
                    <>
                        <button name="Edit" onClick={edit}>
                            <FaEdit />
                        </button>
                        <CalendarPopUp dateTask={dateTask} taskId={id} updateDate={updateD}></CalendarPopUp>
                        <button name="Delete" onClick={deleteT}>
                            <FaTrashCan />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

ToDoTask.propTypes = {
    deleteTask: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
    task: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isDone: PropTypes.bool.isRequired,
    dateTask: PropTypes.instanceOf(Date).isRequired,
    updateDate: PropTypes.func.isRequired
};
