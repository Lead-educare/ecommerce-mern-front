import React, {Fragment, useEffect, useState} from 'react';
import {DeleteProductRequest, ProductListRequest} from "../../APIRequest/APIProductRequest";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {AiOutlineDelete, AiOutlineEdit, AiOutlineEye} from "react-icons/all";
import {DeleteAlert} from "../../helper/DeleteTodoAlert"
import MasterLayoutAdmin from "../../components/admin/MasterLayout/MasterLayoutAdmin";


const ProductList = () => {

    useEffect(()=>{
        (async () => {
            await ProductListRequest(true);
        })();
    },[])

    let DataList=useSelector((state)=>(state.product.List));


    const DeleteItem = async (id) => {
        let Result = await DeleteAlert();
        if(Result.isConfirmed){
            let DeleteResult= await DeleteProductRequest(id)
            if(DeleteResult){
                await ProductListRequest(true);
            }
        }
    }


    return (
        <MasterLayoutAdmin>
            <div className="container-fluid my-5">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-4">
                                            <h5> Product List</h5>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="table-responsive table-section">
                                                <table className="table ">
                                                    <thead className="sticky-top bg-white">
                                                    <tr>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Title</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Description</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Price</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Category</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Quantity</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</td>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        DataList.map((item,i)=>
                                                            <tr key={item._id}>
                                                                <td><p className="text-small text-start">{item.title}</p></td>
                                                                <td><p className="text-small text-start">{item.description}</p></td>
                                                                <td><p className="text-small text-start">${item.price}</p></td>
                                                                <td><p className="text-small text-start">{item.category.name}</p></td>
                                                                <td><p className="text-small text-start">{item.quantity}</p></td>
                                                                <td>
                                                                    <Link to={`/createUpdateProduct?id=${item._id}`} className="btn text-info btn-outline-light p-2 mb-0 btn-sm">
                                                                        <AiOutlineEdit size={15} />
                                                                    </Link>
                                                                    <button onClick={DeleteItem.bind(this,item._id)} className="btn btn-outline-light text-danger p-2 mb-0 btn-sm ms-2">
                                                                        <AiOutlineDelete size={15} />
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
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

export default ProductList;