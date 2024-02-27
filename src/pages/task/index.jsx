import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Header from '../../components/header';
import { useUser } from '../../contexts/User';
import { useNavigate } from 'react-router-dom';
import { useTask } from '../../contexts/Task';

import './style.css';

export default function Task() {
    const navigate = useNavigate();
    const { user, isLoggedIn, updateUser } = useUser();
    const { createTask } = useTask();
    const [dateMin, setDateMin] = useState(new Date());

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate('/');
        }
        dateYesterday();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function dateYesterday() {
        const dataAtual = new Date();
        const dia = dataAtual.getDate();
        const mes = dataAtual.getMonth() + 1;
        const ano = dataAtual.getFullYear();


        const novaData = new Date(ano, mes - 1, dia);

        setDateMin(novaData);
    }


    const userSchema = yup.object({
        title: yup.string().required('Campo obrigatório'),
        deadline: yup.date().required('Campo obrigatório').min(dateMin, 'A data deve ser igual ou posterior à data atual'),
        description: yup.string()
    });

    const { register, handleSubmit, formState: { errors }
    } = useForm({
        resolver: yupResolver(userSchema)
    });

    const onSubmit = async (data) => {
        try {
            const newTask = { ...data, isCompleted: false, user: user.id };
            await createTask(newTask);
            navigate('/dashboard');
        } catch (error) {
            alert(error.response.data);
        }

    };

    return (<>
        <Header user={user} isLoggedIn={isLoggedIn} updateUser={updateUser} />
        <div className='createtask'>
            <form onSubmit={handleSubmit(onSubmit)} className='card'>
                <div className="card-header">
                    <h2>Criar Tarefas</h2>
                </div>
                <div className='card-content'>
                    <p>Título</p>
                    <input label="title" {...register('title')} />
                    {errors.title?.message && <p>{errors.title?.message}</p>}
                </div>
                <div className='card-content'>
                    <p>Finalizar até</p>
                    <input type='date' label="deadline" {...register('deadline')} />
                    {errors.deadline?.message && <p>{errors.deadline?.message}</p>}
                </div>
                <div className='card-content'>
                    <p>Descrição</p>
                    <input label="description" {...register('description')} />
                    {errors.description?.message && <p>{errors.description?.message}</p>}
                </div>
                <div className="card-footer">
                    <button type='submit'>Criar</button>
                </div>
            </form>
        </div>
    </>
    );
}