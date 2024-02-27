import { Routes as Switch, Route } from 'react-router-dom';
import SignIn from '../pages/signin';
import Dashboard from '../pages/dashboard';
import SignUp from '../pages/signup';
import Task from '../pages/task';


export default function Routes() {
    return (
        <Switch>
            <Route exact path='/' element={<SignIn />} />
            <Route exact path='/signup' element={<SignUp />} />
            <Route exact path='/task' element={<Task />} />
            <Route exact path='/dashboard' element={<Dashboard />} />
        </Switch>
    );
}