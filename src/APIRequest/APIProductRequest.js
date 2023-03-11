import {getToken} from "../helper/SessionHelper";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice";
import store from "../redux/store/store";
import axios from "axios";
import {
    OnChangeProductInput,
    ResetProductFormValue,
    SetProductCategoryDropDown,
    SetProductList,
    SetProductListTotal
} from "../redux/state-slice/product-slice";
import {ErrorToast, SuccessToast} from "../helper/formHelper";


const BaseURL= "https://ecommerc-mern-faisal.onrender.com/api/v1";
const AxiosHeader = {headers: {"token": getToken()}};

export async function CreateProductRequest(PostBody,ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/createProduct"
        if(ObjectID!==0){
            URL = BaseURL+"/updateProducts/"+ObjectID;
        }
        const result = await axios.post(URL,PostBody,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200 && result.data['status'] === "success") {
            SuccessToast("Request Successful");
            store.dispatch(ResetProductFormValue())
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
        return false
    }
}
export async function ProductCategoryDropDownRequest() {
    try {
        store.dispatch(ShowLoader());
        let URL = BaseURL+"/categories";
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200) {
            if (result.data['status'] === "success") {
                if (result.data['data'].length > 0) {
                    store.dispatch(SetProductCategoryDropDown(result.data['data']))
                } else {
                    store.dispatch(SetProductCategoryDropDown([]));
                    ErrorToast("No Product Category Found");
                }
            } else {
                ErrorToast("Something Went Wrong")
            }
        } else {
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}
export async function ProductListRequest(all=false, pageNo=null, releated=[], slug='') {
    try {
        store.dispatch(ShowLoader());
        let URL;
        if(all === true){
            URL = BaseURL+"/products";
        }
        else if(releated.length === 0 && all == false && pageNo > 0){

            URL = BaseURL+"/list-products/"+pageNo;
        }else if(slug.length > 0){
            URL = BaseURL+"/list-products/"+pageNo;
        }
        else {
            const {productId, categoryId} = releated;
            URL = `${BaseURL}/related-products/${productId}/${categoryId}`
        }

        const result = await axios.get(URL)
        store.dispatch(HideLoader())
        if (result.status === 200 && result.data['status'] === "success") {
            if (result.data['data'].length > 0) {
                store.dispatch(SetProductList(result.data['data']))
            } else {
                store.dispatch(SetProductList([]))
                ErrorToast("No Data Found")
            }
        } else {
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}
export async function ProductListByCategoryRequest( slug='') {
    try {
        store.dispatch(ShowLoader());
        let URL = BaseURL+"/products-by-category/"+slug;


        const result = await axios.get(URL)
        store.dispatch(HideLoader())
        if (result.status === 200 && result.data['status'] === "success") {
            if (result.data['data']['products'].length > 0) {
                store.dispatch(SetProductList(result.data['data']['products']))
            } else {
                store.dispatch(SetProductList([]))
                ErrorToast("No Data Found")
            }
        } else {
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}
export async function ProductFilterListRequest(minmax) {
    try {
        store.dispatch(ShowLoader());
         const   URL = BaseURL+"/filtered-products";

        const result = await axios.post(URL, minmax)
        store.dispatch(HideLoader())
        if (result.status === 200 && result.data['status'] === "success") {
            if (result.data['data'].length > 0) {
                const resultCount = result.data['data'].length;
                store.dispatch(SetProductList(result.data['data']))
                store.dispatch(SetProductListTotal(resultCount))
            } else {
                store.dispatch(SetProductList([]))
                ErrorToast("No Data Found")
            }
        } else {
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}
export async function ProductTotalRequest( ) {
    try {
        store.dispatch(ShowLoader());
        let URL = BaseURL+"/product-count";

        const result = await axios.get(URL)
        store.dispatch(HideLoader())

        if (result.status === 200 && result.data['status'] === "success") {
            if (result.data['data'] > 0) {
                store.dispatch(SetProductListTotal(result.data['data']))

            } else {
                store.dispatch(SetProductListTotal(0))
                ErrorToast("No Data Found")
            }
        } else {
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}
export async function DeleteProductRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/product/"+ObjectID;
        const result = await axios.delete(URL,AxiosHeader)
        store.dispatch(HideLoader());
        if (result.status === 200 && result.data['status'] === "associate") {
            ErrorToast(result.data['data'])
            return  false;
        }
        else if (result.status === 200 && result.data['status'] === "success") {
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
export async function FillProductFormRequest(ObjectID, slug=null) {
    try {
        store.dispatch(ShowLoader())
        let URL;
        if(ObjectID !== '0'){
         URL = BaseURL+"/productbyId/"+ObjectID;
        }else {
         URL = BaseURL+"/product/"+slug;

        }
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200 && result.data['status'] === "success") {
            let FormValue=result.data['data'];
            store.dispatch(OnChangeProductInput({Name:"title",Value:FormValue['title']}));
            store.dispatch(OnChangeProductInput({Name:"slug",Value:FormValue['slug']}));
            store.dispatch(OnChangeProductInput({Name:"description",Value:FormValue['description']}));
            store.dispatch(OnChangeProductInput({Name:"price",Value:FormValue['price']}));
            store.dispatch(OnChangeProductInput({Name:"quantity",Value:FormValue['quantity']}));
            store.dispatch(OnChangeProductInput({Name:"photo",Value:FormValue['photo']}));
            store.dispatch(OnChangeProductInput({Name:"category",Value:FormValue['category']}));
            store.dispatch(OnChangeProductInput({Name:"description",Value:FormValue['description']}));
            store.dispatch(OnChangeProductInput({Name:"_id",Value:FormValue['_id']}));
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


