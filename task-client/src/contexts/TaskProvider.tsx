import axios from "axios";
import { useEffect, useState } from "react";
import TaskContext from "./TaskContext";

export const TaskProvider = (props) => {

    const [ tasks, setTasks ] = useState([]);
    const baseUrl = "http://localhost:4000/api/tasks";

    useEffect(() => {
        async function fetchData() {
            await getAllTasks();
        }
        fetchData();
    }, []);

    function getAllTasks() {
        return axios.get(baseUrl).then(response => setTasks(response.data));
    }

    function getTask(id) {
        return tasks.find(task => task._id === id);
    }

    function addTask(task) {        
    
        return axios.post(baseUrl, task)
            .then(response => {
                getAllTasks();
                return new Promise(resolve => resolve(response.data));
            }
        );
    }

    function editTask(id, task) {

        return axios.put(`${baseUrl}/${id}`, task)
        .then(response => {
          getAllTasks();
          return new Promise((resolve) => resolve(response.data));
        });
    }

    function deleteTask(id) {
        axios.delete(`${baseUrl}/${id}`)
        .then((response) => {
            getAllTasks();
            return new Promise((resolve) => resolve(response.data));
        });
    }

    return (
        <TaskContext.Provider value={{
            tasks,
            getTask,
            addTask,
            editTask,
            deleteTask
        }}>
            { props.children }
        </TaskContext.Provider>
    )
};