import * as React from 'react';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import Calendar from "react-calendar";
import {FaRegCalendarAlt} from "react-icons/fa";
import {useState} from "react";
import PropTypes from "prop-types";
import 'react-calendar/dist/Calendar.css';

export default function CalendarPopUp({dateTask, updateDate, taskId}) {
    const [anchor, setAnchor] = React.useState(null);
    const [date, setDate] = useState(dateTask);


    const handleClick = (event) => {
        setAnchor(anchor ? null : event.currentTarget);
    };

    const open = Boolean(anchor);
    const id = taskId;

    const changeDate = (NewDate) => {
        setDate(NewDate);
    }

    const cancelDate = () => {
        setDate(dateTask);
        setAnchor(false);
    }

    const saveDate = () => {
        updateDate(id, date);
        setAnchor(false);
    }

    return (
        <div>
            <button aria-describedby={id}  onClick={handleClick}>
                <FaRegCalendarAlt/>
            </button>
            <BasePopup id={id} open={open} anchor={anchor}>
                <div className={"calendar-popup"}>
                    <Calendar onChange={changeDate} value={date}/>
                    <div>
                        <button className={"button-to-do-list"} name="Save" onClick={saveDate}>Save</button>
                        <button className={"button-to-do-list"} name="Cancel" onClick={cancelDate}>Cancel</button>
                    </div>
                </div>
            </BasePopup>
        </div>
    );
}

CalendarPopUp.propTypes = {
    dateTask: PropTypes.instanceOf(Date).isRequired,
    updateDate: PropTypes.func.isRequired,
    taskId: PropTypes.number.isRequired
};