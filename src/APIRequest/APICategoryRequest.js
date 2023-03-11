import store from "../redux/store/store";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice";
import axios from "axios";
import {ErrorToast, SuccessToast} from "../helper/formHelper";
import {
    OnChangeCategoryInput,
    ResetCategoryFormValue,
    SetCategoryList,
    SetCategoryListTotal
} from "../redux/state-slice/category-slice";
import {getToken} from "../helper/SessionHelper";

const baseURL= "https://ecommerc-mern-faisal.onrender.com/api/v1";
const AxiosHeader = {headers: {"token": getToken()}}


export async function CreateCategoryRequest(PostBody,ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = baseURL+"/categoryCreate";
        if(ObjectID!==0){
            URL = baseURL+"/categoryUpdate/"+ObjectID;
        }
        const result = await axios.post(URL,PostBody,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200 && result.data['status'] === "success") {
            SuccessToast("Request Successful");
            store.dispatch(ResetCategoryFormValue())
            return true;
        }
        else if(result.status === 400 && result.data['status'] === "fail") {

            ErrorToast("Category Already Exist")
            return false;

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
export async function FillCategoryFormRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = baseURL+"/categorybyId/"+ObjectID;
        const result = await axios.get(URL)

        store.dispatch(HideLoader())
        if (result.status === 200 && result.data['status'] === "success") {
            let FormValue=result.data['data'];
            store.dispatch(OnChangeCategoryInput({name:"name",Value:FormValue['name']}));
            return  true;
        } else {
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
export async function FillCategoryFormRequestSlug(slug) {
    try {
        store.dispatch(ShowLoader())
        let URL = baseURL+"/products-by-category/"+slug;
        const result = await axios.get(URL)

        store.dispatch(HideLoader())
        if (result.status === 200 && result.data['status'] === "success") {
            let FormValue=result.data['data']['category'];
            store.dispatch(OnChangeCategoryInput({name:"name",Value:FormValue[0]['name']}));
            store.dispatch(OnChangeCategoryInput({name:"slug",Value:FormValue[0]['slug']}));
            return true;
        } else {
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
export async function CategoryListRequest() {
    try {
        store.dispatch(ShowLoader())
        let URL = baseURL+"/categories";
        const result = await axios.get(URL)
        store.dispatch(HideLoader())
        if (result.status === 200 && result.data['status'] === "success") {
           store.dispatch(SetCategoryList(result.data['data']))
        } else {
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}
export async function DeleteCategoryRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = baseURL+"/category/"+ObjectID;
        let result = await axios.delete(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200 && result.data['status'] === "associate") {
            ErrorToast(result.data['data'])
            return  false;
        }
        if (result.status === 200 && result.data['status'] === "success") {
            SuccessToast("Request Successful");
            return  true
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