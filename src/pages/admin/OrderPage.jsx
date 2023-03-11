import React, {useEffect} from 'react';
import MasterLayoutAdmin from "../../components/admin/MasterLayout/MasterLayoutAdmin";
import {OrderListRequest} from "../../APIRequest/APIOrderRequest";
import {useSelector} from "react-redux";
import moment from "moment";

const OrderPage = () => {
    useEffect(()=>{
        OrderListRequest();
    }, []);

    const List = useSelector(state => state.order.List);
    return (
        <MasterLayoutAdmin>
            <div className='container-fluid my-5'>
            <div className='row'>
            <div className='col-md-12'>
                <div className="p-3 mt-2 mb-2 h4 bg-light">Orders</div>
                {
                    List?.map((order, index) =>{

                        return(
                            <div key={order._id} className='border shadow bg-light rounded-4 mb-5'>

                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Buyer</th>
                                        <th scope="col">Ordered</th>
                                        <th scope="col">Payment</th>
                                        <th scope="col">Quantity</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{order.status}</td>
                                        <td>{order?.buyer?.firstName}</td>
                                        <td>time</td>
                                        <td>{
                                            order?.payment?.success ? 'Success' : 'Failed'
                                        }</td>
                                        <td>{order?.products?.length} products</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div className="container">
                                    <div className="row m-2">
                                        {
                                            order?.products?.map(product =>(

                                        <div key={product._id} className="card mb-3">
                                            <div className="row g-0">
                                                <div className="col-md-4">
                                                    <img width={200} src={product.photo} alt={product.title}  />
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="card-body"><h5 className="card-title">{product?.title + " "}
                                                         ${product?.price}</h5><p className="card-text">{product?.description }</p></div>
                                                </div>
                                                <div className="d-flex justify-content-between"><p className="card-text"><small
                                                    className="text-muted">Listed a month ago</small></p></div>
                                            </div>
                                        </div>
                                            ))
                                        }

                                    </div>
                                </div>
                            </div>
                        )

                    })
                }

            </div>
            </div>
            </div>
        </MasterLayoutAdmin>
    );
};

export default OrderPage;