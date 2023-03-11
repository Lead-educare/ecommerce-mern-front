import {useEffect, useState} from "react";
import { Outlet } from 'react-router-dom';
import { getToken} from "../../helper/SessionHelper";
import { AuthCheckRequest} from "../../APIRequest/APIAdminRequest";

const PrivateRoute = ()=>{

    const [ok, setOk] = useState(false);

    useEffect(()=>{
        const authCheck = async () => {
            const { data } = await AuthCheckRequest()


            if (data?.ok) {
                setOk(true);
            } else {
                setOk(false);

            }
        }
        if(getToken()) authCheck();
    }, []);





        return ok ? <Outlet /> : ''
}

export default PrivateRoute;