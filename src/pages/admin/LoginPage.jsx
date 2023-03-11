import React, {useEffect} from 'react';
import Login from "../../components/admin/Login/Login";
import {getToken} from "../../helper/SessionHelper";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate()
    useEffect(  ()=>{
            if (getToken()) {
               navigate('/dashboard')
            }
    }, [])
    return (
        <Login />
    );
};

export default LoginPage;