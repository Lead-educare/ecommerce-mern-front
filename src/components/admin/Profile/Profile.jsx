import React, {useEffect, useRef} from 'react';
import {useNavigate} from "react-router-dom";
import {ErrorToast, getBase64, IsEmail, IsEmpty, IsMobile} from "../../../helper/formHelper.js";
import {GetProfileDetails, ProfileUpdateRequest} from "../../../APIRequest/APIAdminRequest";
import {useSelector} from "react-redux";

const Profile = () => {
    let emailRef,firstNameRef,lastNameRef,mobileRef,passwordRef,userImgRef,userImgView, addressRef=useRef();
    const navigate = useNavigate();

    useEffect(()=>{
        GetProfileDetails();
    }, [])

    const PreviewImage = ()=>{
        let ImgFile = userImgRef.files[0];
        console.log(ImgFile)
        getBase64(ImgFile)
            .then(base64=>{
                userImgView.src = base64;
            })
    }

    const ProfileData  = useSelector(state=> state.profile.value)


    const UpdateMyProfile = () =>{
        let email=emailRef.value;
        let firstName=firstNameRef.value;
        let lastName=lastNameRef.value;
        let mobile=mobileRef.value;
        let password= passwordRef.value;
        let photo=userImgView.src;
        let address = addressRef.value;


        if(!IsEmail(email)){
            ErrorToast("Valid Email Address Required !")
        }
        else if(IsEmpty(firstName)){
            ErrorToast("First Name Required !")
        }
        else if(IsEmpty(lastName)){
            ErrorToast("Last Name Required !")
        }
        else if(!IsMobile(mobile)){
            ErrorToast("Valid Mobile  Required !")
        }
        else if(IsEmpty(password)){
            ErrorToast("Password Required !")
        }   else if(IsEmpty(address)){
            ErrorToast("Address Required !")
        }
        else{
            ProfileUpdateRequest(email,firstName,lastName,mobile,password,photo, address)
                .then(result =>{
                    if(result===true){
                        navigate('/dashboard')
                    }

                })
        }
    }



    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="container-fluid">
                                <img  ref={(input)=>userImgView=input} className="icon-nav-img-lg" src={ProfileData['photo']} alt=""/>
                                <hr/>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <label>Profile Picture</label>
                                        <input onChange={PreviewImage}  ref={(input)=>userImgRef=input} placeholder="User Email" className="form-control animated fadeInUp" type="file"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Email Address</label>
                                        <input key={Date.now()} defaultValue={ProfileData['email']}  readOnly={true}  ref={(input)=>emailRef=input} placeholder="User Email" className="form-control animated fadeInUp" type="email"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>First Name</label>
                                        <input  key={Date.now()} defaultValue={ProfileData['firstName']} ref={(input)=>firstNameRef=input} placeholder="First Name" className="form-control animated fadeInUp" type="text"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Last Name</label>
                                        <input key={Date.now()} defaultValue={ProfileData['lastName']}  ref={(input)=>lastNameRef=input} placeholder="Last Name" className="form-control animated fadeInUp" type="text"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Mobile</label>
                                        <input key={Date.now()} defaultValue={ProfileData['mobile']} ref={(input)=>mobileRef=input} placeholder="Mobile" className="form-control animated fadeInUp" type="mobile"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Password</label>
                                        <input key={Date.now()} defaultValue={'******'}  ref={(input)=>passwordRef=input} placeholder="User Password" className="form-control animated fadeInUp" type="password"/>
                                    </div>
                                    <div className="col-6 p-2">
                                        <label>Address</label>
                                        <textarea key={Date.now()} defaultValue={ProfileData['address']} ref={(input)=>addressRef=input} rows={5} className='form-control animated fadeInUp'>
                                        </textarea>

                                    </div>
                                    <div className="col-12">
                                        <div className="col-4 p-2 px-0">
                                            <button onClick={UpdateMyProfile}  className="btn w-100 float-end btn-primary animated fadeInUp">Update</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Profile;