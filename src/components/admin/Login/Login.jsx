import React, { useRef} from 'react';
import {useNavigate, Link, useLocation} from "react-router-dom";
import {ErrorToast, IsEmail, IsEmpty} from "../../../helper/formHelper.js";
import {LoginRequest} from "../../../APIRequest/APIAdminRequest";

const Login = () => {
    let passRef,emailRef=useRef();
    const navigate = useNavigate();
    const location = useLocation();
    console.log('navigate',navigate)
    const loginSubmit = () => {
        const email = emailRef.value;
        const password = passRef.value;


        if(!IsEmail(email)){
            ErrorToast('Invalid Email Address');
        }else if(IsEmpty(password)){
            ErrorToast('Password Required');
        }else {
            LoginRequest(email, password)
                .then(res =>{
                    if(res === true){
                        location.state ? navigate(location.state) : window.location='/dashboard'
                    }
                })
        }

    }
    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-6 center-screen">
                        <div className="card w-90  p-4">
                            <div className="card-body">
                                <h4>SIGN IN</h4>
                                <br/>
                                <input ref={(input)=>emailRef=input} placeholder="User Email" className="form-control animated fadeInUp" type="email"/>
                                <br/>
                                <input ref={(input)=>passRef=input} placeholder="User Password" className="form-control animated fadeInUp" type="password"/>
                                <br/>
                                <button
                                    onClick={loginSubmit}
                                    className="btn w-100 animated fadeInUp float-end btn-primary">Next</button>
                                <hr/>
                                <div className="float-end mt-3">

                                    <span>
                                        <Link className="text-center ms-3 h6 animated fadeInUp" to="/registration">Sign Up </Link>
                                        <span className="ms-1">|</span>
                                        <Link className="text-center ms-3 h6 animated fadeInUp" to="/sendotp">Forget Password</Link>
                                    </span>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;