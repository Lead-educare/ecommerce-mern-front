import {useEffect, useState} from "react";
import { Outlet } from 'react-router-dom';
import { getToken} from "../../helper/SessionHelper";
import {AdminCheckRequest} from "../../APIRequest/APIAdminRequest";

const PrivateRoute = ()=>{

    const [ok, setOk] = useState(false);

    useEffect(()=>{
        const adminCheck = async () => {
            const { data } = await AdminCheckRequest()


            if (data?.ok) {
                setOk(true);
            } else {
                setOk(false);

            }
        }
        if(getToken()) adminCheck();
    }, []);





    return ok ? <Outlet /> : ''
}

export default PrivateRoute;