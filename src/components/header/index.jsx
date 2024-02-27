import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Header(props) {
    // eslint-disable-next-line react/prop-types
    const { isLoggedIn, updateUser, user } = props;
    const [isChange, setIsChange] = useState(false);
    const [newPassword, setNewPassword] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function handlerAccept() {
        await updateUser({ ...user, password: newPassword });
        setNewPassword('');
        setIsChange(!isChange);
    }

    function handlerNewPassword(event) {
        setNewPassword(event.target.value);
    }

    function handlerChangePassword() {
        setIsChange(!isChange);
    }

    function handlerLogout() {
        localStorage.clear();
        navigate('/');

    }
    return (
        <header>
            <Link to={'/dashboard'}><button>Dashboard</button></Link>
            <Link to={'/task'}><button>Criar Tarefa</button></Link>
            <button onClick={handlerChangePassword}>Trocar Senha</button>
            {isChange && <><input type='password' onChange={handlerNewPassword} /><button onClick={handlerAccept}>OK</button></>}
            <button onClick={handlerLogout}>Logout</button>
        </header>
    );
}