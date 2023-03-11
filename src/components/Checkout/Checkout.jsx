import React from 'react';
import {getToken, getUserDetails} from "../../helper/SessionHelper";
import {useNavigate} from "react-router-dom";
import Payment from "../Payment/Payment";
import {useSelector} from "react-redux";
const Checkout = ({total}) => {
    const navigate = useNavigate();

    return (
        <>
            {
                !getUserDetails() ? (
                    <button
                        className="btn btn-outline-dark btn-sm"
                        onClick={() =>
                            navigate("/login", {
                                state: "/cart",
                            })
                        }
                    >
                        Login to checkout
                    </button>
                ) : (
                    <div className='card border-0 rounded-0 p-lg-4 bg-light'>
                        <label>Deliver Address</label>
                        <textarea readOnly={true} defaultValue={getUserDetails()[0]['address']} rows={2} className='form-control animated fadeInUp'>
                                        </textarea>
                        <button
                            className="btn btn-outline-warning"
                            onClick={() => window.location = '/profile'}
                        >
                            Update address
                        </button>
                        <Payment total={total} />
                    </div>



                )
            }
            
        </>
    );
};

export default Checkout;