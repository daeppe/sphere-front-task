import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useUser } from '../../contexts/User';

export default function SignIn() {
    const navigate = useNavigate();
    const { isLoggedIn, signIn } = useUser();

    useEffect(() => {
        if (isLoggedIn()) {
            navigate('/dashboard');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn]);

    const userSchema = yup.object({
        email: yup.string().required('Campo obrigatório').email('Email inválido'),
        password: yup.string().min(6, 'Mínimo de 6 dígitos').required('Campo obrigatório')
    });

    const { register, handleSubmit, formState: { errors }
    } = useForm({
        resolver: yupResolver(userSchema)
    });

    const onSubmit = async (data) => {
        try {
            const output = await signIn(data);
            if (output) {
                localStorage.setItem('@SphereFrontTask:User', JSON.stringify(output.data));
                setTimeout(() => {
                    return navigate('/dashboard');
                }, 500);
            }
        } catch (error) {
            alert(error.response.data);
        }

    };

    return (<div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='textfield'>
                <p>Email</p>
                <input label="email" {...register('email')} />
                {errors.email?.message && <p>{errors.email?.message}</p>}
            </div>
            <div className='textfield'>
                <p>Senha</p>
                <input type='password' label="Password" {...register('password')} />
                {errors.password?.message && <p>{errors.password?.message}</p>}
            </div>
            <button type='submit'>Logar</button>
        </form>
        <Link to={'signup'}>Não possuo conta.</Link>
    </div>);
}