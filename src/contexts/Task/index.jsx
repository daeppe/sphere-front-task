/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext } from 'react';
import api from '../../services/api';

const TaskContext = createContext();

export default function TaskProvider({ children }) {
    const user = JSON.parse(localStorage.getItem('@SphereFrontTask:User'));

    function createTask() { }

    async function findCompletedTask() {
        const tasks = [];

        await api.get(`/task/findtaskcompleted/${user.id}`).then(response => {
            tasks.push(...response.data);
        });

        return tasks;
    }

    async function findNotCompletedTask() {
        const tasks = [];

        await api.get(`/task/findtasknotcompleted/${user.id}`).then(response => {
            tasks.push(...response.data);
        });
        return tasks;
    }

    async function findTasks() {
        const allTasks = [];

        const tasksCompleted = await findCompletedTask();
        const tasksNotCompleted = await findNotCompletedTask();


        allTasks.push(...tasksCompleted);
        allTasks.push(...tasksNotCompleted);

        return allTasks;
    }

    function toCompleteTask(task) {
        api.patch('/task/tocomplete', { ...task, user: user.id }).then(async () => {
            await findTasks();
        });
    }

    function deleteTask(taskId) {
        console.log(taskId);
        api.delete(`/task/delete/${taskId}`).catch(err => console.log(err));
    }

    return (
        <TaskContext.Provider value={
            {
                createTask,
                findTasks,
                toCompleteTask,
                deleteTask
            }}>
            {children}
        </TaskContext.Provider>
    );
}

export const useTask = () => useContext(TaskContext);
