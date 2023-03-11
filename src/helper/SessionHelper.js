

class SessionHelper {
    setToken(token){
        localStorage.setItem('token', token);
    }
    setAuthInfo(auth){
        localStorage.setItem('auth', auth);
    }

    getAuthInfo(){
     return JSON.parse(localStorage.getItem('auth'))
    }
    getToken(){
       return getAuthInfo()?.token;
    }

    setUserDetails(UserDetails){
        localStorage.setItem("UserDetails", JSON.stringify(UserDetails))
    }
    getUserDetails(){
       return JSON.parse(localStorage.getItem('UserDetails'));
    }

    removeSessions(){
        localStorage.clear();
        window.location.href='login'
    }
    setEmail(Email){
        localStorage.setItem("Email",Email)
    }
    getEmail(){
        return localStorage.getItem("Email")
    }
    setOTP(OTP){
        localStorage.setItem("OTP",OTP)
    }
    getOTP(){
        return localStorage.getItem("OTP")
    }

}



export const {
    setToken,
    getToken,
    removeSessions,
    setUserDetails,
    getUserDetails,
    setEmail,
    getEmail,
    setOTP,
    getOTP,
    setAuthInfo,
    getAuthInfo
} = new SessionHelper();