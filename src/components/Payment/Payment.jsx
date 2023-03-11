import React, {useEffect, useState} from 'react';
import axios from "axios";
import {getToken, getUserDetails} from "../../helper/SessionHelper";
import * as toast from "cogo-toast";
import {useSelector} from "react-redux";
import DropIn from "braintree-web-drop-in-react";

const Payment = ({total}) => {
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    const List = useSelector(state => state.cart.List);
    const AxiosHeader = {headers: {"token": getToken()}}


    useEffect(() => {
        if (getToken()) {
            getClientToken();
        }
    }, [getToken()]);

    const getClientToken = async () => {
        try {
            const { data } = await axios.get("https://ecommerc-mern-faisal.onrender.com/api/v1/braintree/token");
            // console.log(data)
            setClientToken(data.clientToken);
        } catch (err) {
            console.log(err);
        }
    };
    const handleBuy = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            //   console.log("nonce => ", nonce);
            const { data } = await axios.post("https://ecommerc-mern-faisal.onrender.com/api/v1/braintree/payment", {
                nonce,
                cart: List,
                total
            }, AxiosHeader);
            console.log("handle buy response => ", data);
            setLoading(false);
            window.location = '/order'
            toast.success("Payment successful");
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    return (
        <>
        <div className="mt-3">
            {!clientToken || !List?.length ? (
                ""
            ) : (
                <>
                    <DropIn
                        options={{
                            authorization: clientToken,
                            paypal: {
                                flow: "vault",
                            },
                        }}
                        onInstance={(instance) => setInstance(instance)}
                    />
                    <button
                        onClick={handleBuy}
                        className="btn btn-primary col-12 mt-2"
                        disabled={!getUserDetails()[0]?.address || !instance || loading}
                    >
                        {loading ? "Processing..." : "Buy"}
                    </button>
                </>
            )}
        </div>

        </>
    );
};

export default Payment;