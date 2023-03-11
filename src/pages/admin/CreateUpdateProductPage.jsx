import React, {useEffect, useRef, useState} from 'react';
import MasterLayoutAdmin from "../../components/admin/MasterLayout/MasterLayoutAdmin";
import {useNavigate} from "react-router-dom";
import {
    CreateProductRequest,
    FillProductFormRequest,
    ProductCategoryDropDownRequest
} from "../../APIRequest/APIProductRequest";
import {ErrorToast, getBase64, IsEmpty} from "../../helper/formHelper";
import {useSelector} from "react-redux";
import store from "../../redux/store/store";
import {OnChangeProductInput} from "../../redux/state-slice/product-slice";

const CreateUpdateProductPage = () => {
    let FormValue=useSelector((state)=>(state.product.FormValue));


    let navigate = useNavigate();
    let [ObjectID,SetObjectID]=useState(0);
    let userImgView, userImgRef = useRef();

    useEffect(()=>{
        (async () => {
            await ProductCategoryDropDownRequest();
        })();

        let params= new URLSearchParams(window.location.search);
        let id=params.get('id');
        if(id!==null){
            SetObjectID(id);
            (async () => {
                await FillProductFormRequest(id)
            })();
        }

    },[]);

    let ProductCategoryDropDown=useSelector((state)=>(state.product.ProductCategoryDropDown));

    const PreviewImage = ()=>{
        let ImgFile = userImgRef.files[0];
        getBase64(ImgFile)
            .then(base64=>{
                userImgView.src = base64;
                store.dispatch(OnChangeProductInput({Name:"photo",Value:base64}))
            })
    }


    const SaveChange = async () => {
        if(IsEmpty(FormValue.title)){
            ErrorToast("Product Title Required !")
        }
        else if(IsEmpty(FormValue.slug)){
            ErrorToast("Product Slug Required !")
        }
        else if(IsEmpty(FormValue.category)){
            ErrorToast("Product Category Required !")
        }
        else if(IsEmpty(FormValue.price)){
            ErrorToast("Product Price Required !")
        }
        else if(IsEmpty(FormValue.quantity)){
            ErrorToast("Product Quantity Required !")
        }
        else if(IsEmpty(FormValue.photo)){
            ErrorToast("Product photo Required !")
        }


        else {
            if(await CreateProductRequest(FormValue,ObjectID)){
                navigate("/productList")
            }
        }
    }


    return (
        <MasterLayoutAdmin>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <h5 >Save Product Type</h5>
                                    <hr className="bg-light"/>

                                    <div className="col-4 p-2">
                                        <label className="form-label">Product Title</label>
                                        <input onChange={(e)=>{store.dispatch(OnChangeProductInput({Name:"title",Value:e.target.value}))}} value={FormValue.title} className="form-control form-control-sm" type="text"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Product Slug</label>
                                        <input onChange={(e)=>{store.dispatch(OnChangeProductInput({Name:"slug",Value:e.target.value}))}} value={FormValue.slug} className="form-control form-control-sm" type="text"/>
                                    </div>




                                    <div className="col-4 p-2">
                                        <label className="form-label">Product Category</label>
                                        <select onChange={(e)=>{store.dispatch(OnChangeProductInput({Name:"category",Value:e.target.value}))}} value={FormValue.category} className="form-select form-select-sm">
                                            <option value="">Select Type</option>
                                            {
                                                ProductCategoryDropDown.map((item,i)=>{
                                                    return( <option key={i.toLocaleString()} value={item._id}>{item.name}</option>)

                                                })
                                            }
                                        </select>
                                    </div>


                                    <div className="col-4 p-2">
                                        <label className="form-label">Product Price</label>
                                        <input onChange={(e)=>{store.dispatch(OnChangeProductInput({Name:"price",Value:e.target.value}))}} value={FormValue.price} className="form-control form-control-sm" type="number"/>
                                    </div>

                                    <div className="col-4 p-2">
                                        <label className="form-label">Product Quantity</label>
                                        <input onChange={(e)=>{store.dispatch(OnChangeProductInput({Name:"quantity",Value:e.target.value}))}} value={FormValue.quantity} className="form-control form-control-sm" type="number"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Product Photo</label>
                                        <input onChange={PreviewImage}  ref={(input)=>userImgRef=input} className="form-control form-control-sm" type="file"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Product Description</label>
                                        <textarea onChange={(e)=>{store.dispatch(OnChangeProductInput({Name:"description",Value:e.target.value}))}} value={FormValue.description}  rows={5} className='form-control animated fadeInUp'>
                                        </textarea>
                                    </div>
                                    <div className="col-4 p-2 overflow-hidden" style={{height: '300px'}}>
                                        <label className="form-label d-block">Product Image Preview</label>
                                        <img height={300} width={"auto"} ref={(input)=>userImgView=input} src={FormValue.photo}  />
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <button onClick={SaveChange} className="btn btn-sm my-3 btn-success">Save Change</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </MasterLayoutAdmin>
    );
};

export default CreateUpdateProductPage;