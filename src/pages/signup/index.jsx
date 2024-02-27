import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useUser } from '../../contexts/User';

export default function SignUp() {
    const navigate = useNavigate();
    const { isLoggedIn, signUp } = useUser();

    useEffect(() => {

        if (isLoggedIn()) {
            navigate('/dashboard');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const userSchema = yup.object({
        name: yup.string().required('Campo obrigatório'),
        email: yup.string().required('Campo obrigatório').email('Email inválido'),
        password: yup.string().min(6, 'Mínimo de 6 dígitos').required('Campo obrigatório')
    });

    const { register, handleSubmit, formState: { errors }
    } = useForm({
        resolver: yupResolver(userSchema)
    });

    const onSubmit = async (data) => {
        try {
            const output = await signUp(data);
            if (output) {
                return navigate('/');
            }
        } catch (error) {
            alert(error.response.data);
        }

    };

    return (<div className='signin-signup'>
        <form onSubmit={handleSubmit(onSubmit)} className='card'>
            <div className="card-header">
                <h2>Cadastre-se</h2>
            </div>
            <div className='card-content'>
                <p>Nome</p>
                <input label="name" {...register('name')} />
                {errors.name?.message && <p>{errors.name?.message}</p>}
            </div>
            <div className='card-content'>
                <p>Email</p>
                <input label="email" {...register('email')} />
                {errors.email?.message && <p>{errors.email?.message}</p>}
            </div>
            <div className='card-content'>
                <p>Senha</p>
                <input type='password' label="Password" {...register('password')} />
                {errors.password?.message && <p>{errors.password?.message}</p>}
            </div>
            <div className="card-footer">
                <button className='submit' type='submit'>Cadastrar</button>
                <Link to={'/'}>Já possuo conta.</Link>
            </div>
        </form>
    </div>);
}