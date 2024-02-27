import { useEffect, useState } from 'react';
import Header from '../../components/header';
import { useUser } from '../../contexts/User';
import { useNavigate } from 'react-router-dom';
import { useTask } from '../../contexts/Task';

import './style.css';


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
        <div className='container'>
            <h2>Dashboard</h2>
            <p>Olá {user.name}</p>

            <div className='tasks'>
                <div>
                    <h3>Tarefas para concluir</h3>
                    <ul>
                        {tasks.map((task) => {
                            if (task.isCompleted === false) {
                                return <li key={task.id} className='cardtask'>
                                    <p className='title'>{task.title}</p>
                                    <p className='deadline'><strong>Até: </strong>{task.deadline}</p>
                                    <p className='description'><strong>Descrição:</strong><br />{task.description}</p>
                                    <p className='status'>{task.isCompleted ? 'Completo' : 'Incompleto'}</p>
                                    <button onClick={() => handlerToComplete(task)}>Completar</button>
                                    <button onClick={() => hadlerDelete(task.id)}>Deletar</button>
                                </li>;
                            }
                        })}
                    </ul>
                </div>
                <div>
                    <h3>Tarefas já concluidas</h3>
                    <ul>
                        {tasks.map((task) => {
                            if (task.isCompleted === true) {
                                return <li key={task.id} className='cardtask'>
                                    <p className='title'>{task.title}</p>
                                    <p className='deadline'><strong>Até: </strong>{task.deadline}</p>
                                    <p className='description'><strong>Descrição:</strong><br />{task.description}</p>
                                    <p className='status'>{task.isCompleted ? 'Completo' : 'Incompleto'}</p>
                                    <button onClick={() => hadlerDelete(task.id)}>Deletar</button>
                                </li>;
                            }
                        })}
                    </ul>
                </div>
            </div>
        </div >
    </>
    );
}