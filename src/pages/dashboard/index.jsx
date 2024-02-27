import { useEffect, useState } from 'react';
import Header from '../../components/header';
// import { useTask } from '../../contexts/Task';
import { useUser } from '../../contexts/User';
import { useNavigate } from 'react-router-dom';
import { useTask } from '../../contexts/Task';


export default function Dashboard() {
    const navigate = useNavigate();
    const { user, isLoggedIn, updateUser } = useUser();
    const { findTasks, toCompleteTask, deleteTask } = useTask();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate('/');
        }
        async function searchTasks() {
            if (isLoggedIn()) {
                setTasks(await findTasks());
            }
        }
        searchTasks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function handlerToComplete(task) {
        await toCompleteTask(task);
        setTimeout(() => {
            window.location.reload();
        }, 300);

    }

    async function hadlerDelete(taskId) {
        await deleteTask(taskId);
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }

    return (<>
        <Header user={user} updateUser={updateUser} isLoggedIn={isLoggedIn} />
        <h2>Dashboard</h2>
        <p>Olá {user.name}</p>

        <div>
            <div>
                <h3>Tarefas para concluir</h3>
                <ol>
                    {tasks.map((task) => {
                        if (task.isCompleted === false) {
                            return <li key={task.id}>
                                <p>{task.title}</p>
                                <p>{task.deadline}</p>
                                <p>{task.description}</p>
                                <p>{task.isCompleted ? 'Completo' : 'Incompleto'}</p>
                                <button onClick={() => handlerToComplete(task)}>Completar</button>
                                <button onClick={() => hadlerDelete(task.id)}>Deletar</button>
                            </li>;
                        }
                    })}
                </ol>
            </div>
            <div>
                <h3>Tarefas já concluidas</h3>
                <ol>
                    {tasks.map((task) => {
                        if (task.isCompleted === true) {
                            return <li key={task.id}>
                                <p>{task.title}</p>
                                <p>{task.deadline}</p>
                                <p>{task.description}</p>
                                <p>{task.isCompleted ? 'Completo' : 'Incompleto'}</p>
                            </li>;
                        }
                    })}
                </ol>
            </div>
        </div>
    </>
    );
}