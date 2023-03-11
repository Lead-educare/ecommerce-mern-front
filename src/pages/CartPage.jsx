import React, {useEffect, useState} from 'react';
import MasterLayout from "../components/MasterLayout/MasterLayout";
import {FaCaretLeft, FaCaretRight, FaTrashAlt} from "react-icons/all";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {SetCartUpdateQuntity, SetCartRemoveItem} from "../redux/state-slice/cart-slice";
import store from "../redux/store/store";
import Checkout from "../components/Checkout/Checkout";

const CartPage = () => {
    const List = useSelector(state => state.cart.List);
    const [subtotal, setSubtotal]= useState(0);
    const [discount, setDiscount]= useState(1);
    const [coupon, setCoupon] = useState('');

    useEffect(()=>{
        let settotal=0;
        List.forEach((item)=>{
            settotal += item.price * item.quantity
        })
        setSubtotal(prev => settotal)

    }, [List])



    const updateCartHandler = (quantity, id) =>{
       store.dispatch( SetCartUpdateQuntity({quantity: quantity, id: id}));
    }
    const deleteItemHandler= (id) =>{
       if(window.confirm('Do you wanna delete?')){

        store.dispatch(SetCartRemoveItem(id))
       }
    }
    const couponHander = (e) =>{
        e.preventDefault();
       if(coupon.length > 0 && coupon === 'spring20'){
           setDiscount(.8)
           setCoupon('');
       }
    }
    return (
        <MasterLayout>
            <div className="container">
                {
                    /**
                     * <!-- HERO SECTION-->
                     */
                }
                <section className="py-5 bg-light">
                    <div className="container">
                        <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
                            <div className="col-lg-6">
                                <h1 className="h2 text-uppercase mb-0">Cart</h1>
                            </div>
                            <div className="col-lg-6 text-lg-end">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb justify-content-lg-end mb-0 px-0 bg-light">
                                        <li className="breadcrumb-item"><Link className="text-dark"
                                                                           to='/'>Home</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">Cart</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </section>
                {
                    List.length !== 0 ?(
                        <section className="py-5">
                            <h2 className="h5 text-uppercase mb-4">Shopping cart</h2>
                            <div className="row">
                                <div className="col-lg-8 mb-4 mb-lg-0">
                                    {
                                        /**
                                         * <!-- Cart Table-->
                                         */
                                    }
                                    <div className="table-responsive mb-4">
                                        <table className="table text-nowrap">
                                            <thead className="bg-light">
                                            <tr>
                                                <th className="border-0 p-3" scope="col"><strong
                                                    className="text-sm text-uppercase">Product</strong></th>
                                                <th className="border-0 p-3" scope="col"><strong
                                                    className="text-sm text-uppercase">Price</strong></th>
                                                <th className="border-0 p-3" scope="col"><strong
                                                    className="text-sm text-uppercase">Quantity</strong></th>
                                                <th className="border-0 p-3" scope="col"><strong
                                                    className="text-sm text-uppercase">Total</strong></th>
                                                <th className="border-0 p-3" scope="col"><strong
                                                    className="text-sm text-uppercase">Action</strong></th>
                                            </tr>
                                            </thead>
                                            <tbody className="border-0">
                                            {   List.length > 0 ? (
                                                List.map(item=>{

                                                    return (
                                                        <tr key={item._id}>

                                                            <th className="ps-0 py-3 border-light" scope="row">
                                                                <div className="d-flex align-items-center"><Link
                                                                    className="reset-anchor d-block animsition-link" to={`/product/${item.slug}`}><img
                                                                    src={item.photo}
                                                                    alt={item.title} width="70" /></Link>
                                                                    <div className="ms-3"><strong className="h6"><Link
                                                                        className="reset-anchor animsition-link" to={`/product/${item.slug}`}>{item.title}</Link></strong></div>
                                                                </div>
                                                            </th>
                                                            <td className="p-3 align-middle border-light">
                                                                <p className="mb-0 small">${item.price}</p>
                                                            </td>
                                                            <td className="p-3 align-middle border-light">
                                                                <div
                                                                    className="border d-flex align-items-center justify-content-between px-3">
                                                <span
                                                    className="small text-uppercase text-gray headings-font-family">Quantity</span>
                                                                    <div className="quantity">
                                                                        <button
                                                                            onClick={()=> updateCartHandler(item.quantity - 1, item._id)}
                                                                            className="dec-btn p-0"><FaCaretLeft /></button>
                                                                        <input
                                                                            onChange={(e)=> updateCartHandler(e.target.value, item._id)}
                                                                            className="form-control form-control-sm border-0 shadow-0 p-0"
                                                                            type="text" value={item.quantity} defaultValue={item.quantity} />
                                                                        <button
                                                                            onClick={()=> updateCartHandler(item.quantity + 1, item._id)}
                                                                            className="inc-btn p-0"><FaCaretRight /></button>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="p-3 align-middle border-light">
                                                                <p className="mb-0 small">${item.quantity * item.price}</p>
                                                            </td>
                                                            <td className="p-3 align-middle border-light">
                                                    <span
                                                        style={{cursor: 'pointer'}}
                                                        onClick={()=> deleteItemHandler(item._id)}
                                                        className="reset-anchor ">
                                                        <FaTrashAlt />
                                                    </span>
                                                            </td>
                                                        </tr>

                                                    )})): <h2 className="h5 text-uppercase mb-4">No Items</h2>
                                            }


                                            </tbody>
                                        </table>
                                    </div>
                                    {
                                        /**
                                         * <!-- Cart Nav-->
                                         */
                                    }
                                    <div className="bg-light px-4 py-3">
                                        <div className="row align-items-center text-center">
                                            <div className="col-md-6 mb-3 mb-md-0 text-md-start"><Link
                                                className="btn btn-link p-0 text-dark btn-sm" to='/shop'><i
                                                className="fas fa-long-arrow-alt-left me-2"> </i>Continue shopping</Link></div>
                                            <div className="col-md-6 text-md-end">
                                                {/*<a className="btn btn-outline-dark btn-sm"*/}
                                                {/*                                     href="checkout.html">Procceed to checkout<i*/}
                                                {/*className="fas fa-long-arrow-alt-right ms-2"></i></a>*/}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {
                                    /**
                                     * <!-- Order Total-->
                                     */
                                }
                                <div className="col-lg-4">
                                    <div className="card border-0 rounded-0 p-lg-4 bg-light">
                                        <div className="card-body">
                                            <h5 className="text-uppercase mb-4">Cart total</h5>
                                            <ul className="list-unstyled mb-0">
                                                <li className="d-flex align-items-center justify-content-between"><strong
                                                    className="text-uppercase small font-weight-bold">Subtotal</strong><span
                                                    className="text-muted small">${subtotal}</span></li>
                                                <li className="border-bottom my-2"></li>
                                                <li className="d-flex align-items-center justify-content-between mb-4"><strong
                                                    className="text-uppercase small font-weight-bold">Total</strong><span>${ Math.ceil(subtotal * discount)}</span>
                                                </li>
                                                {
                                                    discount === 1  ? (
                                                        <li>
                                                            <form onSubmit={couponHander} action="#">
                                                                <div className="input-group mb-0">
                                                                    <input
                                                                        onChange={(e)=>setCoupon(e.target.value)}
                                                                        className="form-control" type="text"
                                                                        value={coupon}
                                                                        placeholder="Enter your coupon" />
                                                                    <button className="btn btn-dark btn-sm w-100" type="submit"><i

                                                                        className="fas fa-gift me-2"></i>Apply coupon
                                                                    </button>
                                                                </div>
                                                            </form>
                                                        </li>
                                                    ) : ''
                                                }

                                            </ul>
                                        </div>
                                    </div>
                                    <Checkout total={Math.ceil(subtotal * discount)}/>
                                </div>
                            </div>
                        </section>
                    ) : (
                        <Link className={'btn btn-dark btn-sm w-30 mb-5'} to={'/shop'}>Back to Shopping</Link>
                    )
                }

            </div>

        </MasterLayout>
    );
};

export default CartPage;