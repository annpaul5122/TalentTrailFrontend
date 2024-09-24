import React from 'react';
import LoginHeader from '../components/login/LoginHeader';
import LoginForm from '../components/login/LoginForm';
import LoginText from '../components/login/LoginText';

const Login = () => {
    return(
        <div>
            <LoginHeader/>
            <LoginText/>
            <LoginForm/>
        </div>
    )
}

export default Login;