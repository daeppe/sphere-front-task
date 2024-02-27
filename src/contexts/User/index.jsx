/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';
import api from '../../services/api';

const UserContext = createContext();

export default function UserProvider({ children }) {
    const [user, setUser] = useState('');

    function isLoggedIn() {
        const user = JSON.parse(localStorage.getItem('@SphereFrontTask:User'));
        if (user) {
            setUser(user);
            return true;
        }
        return false;
    }

    function signIn(data) {
        return api.post('/user/login', data);
    }


    function signUp(data) {
        return api.post('/user/create', data);
    }

    function updateUser(data) {
        return api.patch('/user/update', data);
    }

    return (
        <UserContext.Provider value={{ signIn, signUp, updateUser, user, isLoggedIn }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);