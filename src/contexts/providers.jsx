/* eslint-disable react/prop-types */

import TaskProvider from './Task';
import UserProvider from './User';

export const Providers = ({ children }) => {
    return (
        <UserProvider>
            <TaskProvider>
                {children}
            </TaskProvider>
        </UserProvider>
    );
};