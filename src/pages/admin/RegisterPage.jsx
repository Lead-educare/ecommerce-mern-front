import React, {useEffect} from 'react';
import Register from "../../components/admin/Register/Register";
import {useNavigate} from "react-router-dom";
import {getToken} from "../../helper/SessionHelper";

const RegisterPage = () => {
    const navigate = useNavigate()
    useEffect(  ()=>{
        if (getToken()) {
            navigate('/dashboard')
        }

    }, [])
    return (
            <Register />
    );
};

export default RegisterPage;