import React, {useEffect, useState} from 'react';
import MasterLayoutAdmin from "../../components/admin/MasterLayout/MasterLayoutAdmin";
import {CategoryListRequest, DeleteCategoryRequest} from "../../APIRequest/APICategoryRequest";
import {Link} from 'react-router-dom';
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/all";
import {useSelector} from "react-redux";
import moment from "moment";
import {DeleteAlert} from "../../helper/DeleteTodoAlert";

const CategoryList = () => {
    let [searchKeyword,setSearchKeyword]=useState("0");
    let [perPage,setPerPage]=useState(20);

    useEffect(()=>{
        (async () => {
            await CategoryListRequest();
        })();
    },[])


    let DataList=useSelector((state)=>(state.category.List));

    const DeleteItem = async (id) => {
        let Result = await DeleteAlert();
        if(Result.isConfirmed){
            let DeleteResult= await DeleteCategoryRequest(id)
            if(DeleteResult){
                await CategoryListRequest();
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
                                            <h5>Category List</h5>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="table-responsive table-section">
                                                <table className="table ">
                                                    <thead className="sticky-top bg-white">
                                                    <tr>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">#No</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Created</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</td>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        DataList.map((item,i)=>
                                                            <tr key={item._id}>
                                                                <td><p className="text-small text-start">{i+1}</p></td>
                                                                <td><p className="text-small text-start">{item.name}</p></td>
                                                                <td><p className="text-small text-start">{moment(item.createdAt).format('MMMM Do YYYY')}</p></td>
                                                                <td>
                                                                    <Link to={`/createupdateCategory?id=${item._id}`} className="btn text-info btn-outline-light p-2 mb-0 btn-sm">
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

export default CategoryList;