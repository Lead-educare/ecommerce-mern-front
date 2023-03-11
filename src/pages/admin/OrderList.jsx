import React, {useEffect} from 'react';
import MasterLayoutAdmin from "../../components/admin/MasterLayout/MasterLayoutAdmin";
import {OrderListRequest, OrderUpdateRequest} from "../../APIRequest/APIOrderRequest";
import {useSelector} from "react-redux";
import {UpdateStatusAlert} from "../../helper/UpdateAlert";

const OrderList = () => {
    useEffect(()=>{
        OrderListRequest(true);
    }, []);

    const List = useSelector(state => state.order.List);

    const statusHandler = async (id) =>{
        const val = await UpdateStatusAlert();
        if(val !== undefined){
            if(val === 'NotProcessed'){
            OrderUpdateRequest({status: "Not Processed"}, id)

            }else{
            OrderUpdateRequest({status: val}, id)

            }
        }
        await OrderListRequest(true);
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
                                        <div className="col-4"><h5>Category List</h5></div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="table-responsive table-section">
                                                <table className="table ">
                                                    <thead className="sticky-top bg-white">
                                                    <tr>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">#No</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">OrderId</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Product Count</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Buyer Name</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Email</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</td>
                                                    </tr>
                                                    </thead>
                                                    <tbody>

                                                    {
                                                        List?.map((order, index)=>(

                                                    <tr key={order._id}>
                                                        <td><p className="text-small text-start">{index+1}</p></td>
                                                        <td><p className="text-small text-start">{order._id}.</p>
                                                        </td>
                                                        <td><p className="text-small text-start">{order.status}</p></td>
                                                        <td><p className="text-small text-start">{order.products.length} products</p></td>
                                                        <td><p className="text-small text-start">{order.buyer.firstName} {order.buyer.lastName}</p></td>
                                                        <td><p className="text-small text-start">{order.buyer.email} </p></td>
                                                        <td><button
                                                            onClick={()=>statusHandler(order._id)}
                                                            className="btn text-info btn-outline-light p-2 mb-0 btn-sm">
                                                            <svg stroke="currentColor" fill="currentColor"
                                                                 stroke-width="0" viewBox="0 0 1024 1024" height="15"
                                                                 width="15" xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path>
                                                            </svg>
                                                        </button>

                                                        </td>
                                                    </tr>
                                                        ))
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

export default OrderList;