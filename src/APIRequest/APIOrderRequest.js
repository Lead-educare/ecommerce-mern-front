import store from "../redux/store/store";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice";
import axios from "axios";
import {ErrorToast, SuccessToast} from "../helper/formHelper";
import {getToken} from "../helper/SessionHelper";
import {SetOrderList} from "../redux/state-slice/order-slice";

const baseURL= "https://ecommerc-mern-faisal.onrender.com/api/v1";
const AxiosHeader = {headers: {"token": getToken()}}


export async function OrderUpdateRequest(PostBody, orderId) {
    try {
        store.dispatch(ShowLoader())
        let URL = baseURL+"/order-status/"+orderId;

        const result = await axios.post(URL,PostBody,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200) {
            SuccessToast("Request Successful");
            return true;
        }
        else {
            ErrorToast("Request Fail ! Try Again")
            return false;
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return  false
    }
}

export async function OrderListRequest(all=false) {
    try {
        store.dispatch(ShowLoader())
        let URL;

        if(all){
            URL = baseURL+"/all-orders";
        }else{
            URL = baseURL+"/orders";
        }
        const result = await axios.get(URL, AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200 && result.data['status'] === "success") {
            store.dispatch(SetOrderList(result.data['data']))
        } else {
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}
