import './App.css'
import {AddingTaskComponent} from "./AddingTaskComponent.jsx";
import {ToDoTask} from "./ToDoTask.jsx";
import {useEffect, useState} from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
          const parsedTasks = JSON.parse(savedTasks);
          parsedTasks.forEach(task => {
              task.date = new Date(task.date);
          });
          setTasks(parsedTasks);
      }}, []);

  const addTask = (taskTitle) =>{
      const newTask = { id: tasks.length + 1, name: taskTitle, isDone: false, date: new Date()};
      setTasks([...tasks, newTask]);
      localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
  }

  const updateTask = (id, taskTitle) => {
      const updatedTasks = tasks.map(task => task.id === id ? { ...task, name: taskTitle } : task);
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  const deleteTask = (id) => {
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  const updateDate = (id, date) => {
      const updatedTasks = tasks.map(task => task.id === id ? { ...task, date: date } : task);
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  return (
    <>
      <AddingTaskComponent addTask={addTask}/>
      <div className="to-do-list">
        {tasks.map((task) => (
            <ToDoTask key={task.id} task={task.name} id={task.id} isDone={task.isDone} deleteTask={deleteTask}
                      updateTask={updateTask} dateTask={task.date} updateDate={updateDate}/>
        ))}
      </div>
    </>
  )
}

export default App
