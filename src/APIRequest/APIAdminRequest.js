import axios from "axios";
import {ErrorToast, SuccessToast} from "../helper/formHelper.js";
import {getToken, setToken, setUserDetails, setEmail, setOTP, setAuthInfo} from "../helper/SessionHelper.js";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice.js";
import store from "../redux/store/store.js";
import {GetCanceledTasks, GetCompletedTasks, GetNewTasks, GetProgressTasks} from "../redux/state-slice/task-slice.js";
import {GetAllInfo} from "../redux/state-slice/summary-slice.js";
import {GetProfile} from "../redux/state-slice/profile-slice.js";
import {ResetCategoryFormValue} from "../redux/state-slice/category-slice";



const baseURL= "https://ecommerc-mern-faisal.onrender.com/api/v1";
const AxiosHeader = {headers: {"token": getToken()}}

export function RegistrationRequest(email, firstName, lastName, mobile, password, photo) {
    store.dispatch(ShowLoader());

    const URL = `${baseURL}/register`;
    const PostBody = {
        email,
        firstName,
        lastName,
        mobile,
        password,
        photo
    };
    return axios.post(URL,PostBody)
        .then(res=>{
            store.dispatch(HideLoader());

            if(res.status === 200){
                if(res.data['status'] === 'fail'){
                    if(res.data['data']['keyPattern']['email']===1){
                        ErrorToast("Email Already Exist")
                        return  false;
                    }else {
                        ErrorToast("Something Went Wrong")
                        return  false;
                    }

                }else {
                    SuccessToast('Registration Success');
                    return true;
                }


            }else {
                ErrorToast("Something Went Wrong")
                return  false;
            }

        }).catch(err=>{
            store.dispatch(HideLoader());
            ErrorToast("Something Went Wrong")
            return  false;
        })

}
export function LoginRequest(email, password) {

    store.dispatch(ShowLoader());
    const URL = `${baseURL}/login`;
    const PostBody = {
        email,
        password
    };
    return axios.post(URL,PostBody)
        .then(res=>{
            store.dispatch(HideLoader());
            if(res.status === 200 && res.data['status'] === 'success'){
                setAuthInfo(JSON.stringify({
                    token: res.data['token'],
                    user: res.data['data']
                }));
                setUserDetails(res.data['data']);
                SuccessToast('Login Success');
                return true;
            }else {
                ErrorToast("Invalid Email or Password")
                return  false;
            }

        }).catch(err=>{
            store.dispatch(HideLoader());
            ErrorToast("Something Went Wrong");
            return  false;
        })

}




export function GetTasksbyStatus(status) {

    store.dispatch(ShowLoader());
    const URL = `${baseURL}/tasksbystatus/${status}`;

     axios.get(URL, AxiosHeader)
        .then(res=>{
            store.dispatch(HideLoader());
            if(res.status === 200){
                if(status === 'New'){
                    store.dispatch(GetNewTasks(res.data['data']))
                }else if(status === 'Progress'){
                    store.dispatch(GetProgressTasks(res.data['data']))
                }else if(status === 'Completed'){
                    store.dispatch(GetCompletedTasks(res.data['data']))
                }else if(status === 'Canceled'){
                    store.dispatch(GetCanceledTasks(res.data['data']))
                }
            }else {
                ErrorToast("Something went wrong");
            }
        }).catch(err=>{
            store.dispatch(HideLoader());
            ErrorToast("Something Went Wrong");
        })

}
export function GetDashboardGroupedData() {

    store.dispatch(ShowLoader());
    const URL = `${baseURL}/tasksCountonStatus`;

     axios.get(URL, AxiosHeader)
        .then(res=>{
            store.dispatch(HideLoader());
            if(res.status === 200){
                store.dispatch(GetAllInfo(res.data['data']))
            }else {
                ErrorToast("Something went wrong");
            }
        }).catch(err=>{
            store.dispatch(HideLoader());
            ErrorToast("Something Went Wrong");
        })

}
export function DeleteRequest(id) {
    store.dispatch(ShowLoader());
    const URL = `${baseURL}/deleteTask/${id}`;

     return axios.get(URL, AxiosHeader)
        .then(res=>{
            store.dispatch(HideLoader());

            if(res.status === 200){
                SuccessToast('Task deleted successfully')
                return true;
            }else {
                ErrorToast("Something went wrong");
                return false;
            }
        }).catch(err=>{
            store.dispatch(HideLoader());
            ErrorToast("Something Went Wrong");
            return false;
        })

}
export function UpdateStatusRequest(id, status) {
    store.dispatch(ShowLoader());
    const URL = `${baseURL}/updateTaskStatus/${id}/${status}`;
    return axios.get(URL, AxiosHeader)
        .then(res=>{
            store.dispatch(HideLoader());
            if(res.status === 200){
                SuccessToast('Status is updated successfully')
                return  true;
            }else {
                ErrorToast("Something went wrong");
                return false;
            }
        }).catch(err=>{
        store.dispatch(HideLoader());
        ErrorToast("Something Went Wrong");
        return false;
    })

}
export function UpdateTextRequest(name, text, id) {
    store.dispatch(ShowLoader());
    const URL = `${baseURL}/updateTaskText/${id}`;

    const postBody = {}
    postBody[name] = text

    return axios.post(URL, postBody, AxiosHeader)
        .then(res=>{
            store.dispatch(HideLoader());
            if(res.status === 200){
                SuccessToast('Task is updated successfully')
                return  true;
            }else {
                ErrorToast("Something went wrong");
                return false;
            }
        }).catch(err=>{
        store.dispatch(HideLoader());
        ErrorToast("Something Went Wrong");
        return false;
    })

}
export function GetProfileDetails() {

    store.dispatch(ShowLoader());
    const URL = `${baseURL}/profileDetails`;

    axios.get(URL, AxiosHeader)
        .then(res=>{
            store.dispatch(HideLoader());
            if(res.status === 200){

                store.dispatch(GetProfile(res.data['data']))
            }else {
                ErrorToast("Something went wrong");
            }
        }).catch(err=>{
        store.dispatch(HideLoader());
        ErrorToast("Something Went Wrong");
    })

}
export function ProfileUpdateRequest(email,firstName,lastName,mobile,password,photo, address) {
    store.dispatch(ShowLoader());
    const URL = `${baseURL}/profile`;

    const postBody = {
        email,
        firstName,
        lastName,
        mobile,
        password,
        photo,
        address
    }

    const userDetails = {
        email,
        firstName,
        lastName,
        mobile,
        photo,
        address
    }

    return axios.put(URL, postBody, AxiosHeader)
        .then(res=>{
            store.dispatch(HideLoader());
            if(res.status === 200){
                SuccessToast('Profile is updated successfully');
                setUserDetails([userDetails])
                return true;
            }else {
                ErrorToast("Something went wrong");
                return false;
            }
        }).catch(err=>{
        store.dispatch(HideLoader());
        ErrorToast("Something Went Wrong");
        return false;
    })

}

export function AuthCheckRequest(){
    store.dispatch(ShowLoader());
    return axios.get(`${baseURL}/auth-check`, AxiosHeader)
        .then(res =>{
            store.dispatch(HideLoader());
            return res;
        }).catch(err=>{
            store.dispatch(HideLoader());
            return false;
        })
}
export function AdminCheckRequest(){
    store.dispatch(ShowLoader());
    return axios.get(`${baseURL}/admin-check`, AxiosHeader)
        .then(res =>{
            store.dispatch(HideLoader());
            return res;
        }).catch(err=>{
            store.dispatch(HideLoader());
            return false;
        })
}



// Recover Password Step 01 Send OTP
export function RecoverVerifyEmailRequest(email){

    store.dispatch(ShowLoader())
    let URL=baseURL+"/RecoverVerifyEmail/"+email;
    return axios.get(URL).then((res)=>{
        store.dispatch(HideLoader())

        if(res.status===200){

            if(res.data['status']==="fail"){
                ErrorToast("No user found");
                return false;
            }
            else{
                setEmail(email)
                SuccessToast("A 6 Digit verification code has been sent to your email address. ");
                return true;
            }
        }
        else{
            ErrorToast("Something Went Wrong");
            return false;
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false;
    });
}
export function RecoverVerifyOTPRequest(email,OTP){
    store.dispatch(ShowLoader())
    let URL=baseURL+"/RecoverVerifyOTP/"+email+"/"+OTP;
    return axios.get(URL).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){
            if(res.data['status']==="fail"){
                ErrorToast(res.data['data']);
                return false;
            }
            else{
                setOTP(OTP)
                SuccessToast("Code Verification Success");
                return true;
            }
        }
        else{
            ErrorToast("Something Went Wrong")
            return false;
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false;
    });
}
export function RecoverResetPassRequest(email,OTP,password){

    store.dispatch(ShowLoader())
    const URL=baseURL+"/recoverResetPass";
    const PostBody={email:email,otp:OTP,password:password}


    return axios.post(URL,PostBody).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){

            if(res.data['status']==="fail"){
                ErrorToast(res.data['data']);
                return false;
            }
            else{
                setOTP(OTP)
                SuccessToast("NEW PASSWORD CREATED");
                return true;
            }
        }
        else{
            ErrorToast("Something Went Wrong")
            return false;
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false;
    });
}