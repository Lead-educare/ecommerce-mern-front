import React, {useEffect, useState} from 'react';
import product5Img from "../../assets/images/product-5.jpg";
import {useSelector} from "react-redux";
import {FillProductFormRequest} from "../../APIRequest/APIProductRequest";
import store from "../../redux/store/store";
import {SetCartList} from "../../redux/state-slice/cart-slice";
import {FaCaretLeft, FaCaretRight} from "react-icons/all";



const ProductViewModal = () => {
    const [quantity, setQuantity] = useState(1)
    const FormValue = useSelector(state=>state.product.FormValue);

    useEffect(()=>{
        if(FormValue._id){
            FillProductFormRequest(FormValue._id)
        }
    }, [FormValue._id])

    const addToCartHandler = () =>{
        store.dispatch(
            SetCartList( {
                _id: FormValue._id,
                title: FormValue.title,
                slug: FormValue.slug,
                description: FormValue.description,
                price: FormValue.price,
                category: FormValue.category.name,
                quantity: quantity,
                photo: FormValue.photo,
            })
        )
    }

    return (
        <div className="modal fade" id="productView" tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content overflow-hidden border-0">
                    <button className="btn-close p-4 position-absolute top-0 end-0 z-index-20 shadow-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                    <div className="modal-body p-0">
                        <div className="row align-items-stretch">
                            <div className="col-lg-6 p-lg-0"><a className="glightbox product-view d-block h-100 bg-cover bg-center" style={{background: `url(${FormValue.photo})`}} href={FormValue.photo} data-gallery="gallery1" data-glightbox="Red digital smartwatch"></a><a className="glightbox d-none" href="img/product-5-alt-1.jpg" data-gallery="gallery1" data-glightbox="Red digital smartwatch"></a><a className="glightbox d-none" href={product5Img} data-gallery="gallery1" data-glightbox="Red digital smartwatch"></a></div>
                            <div className="col-lg-6">
                                <div className="p-4 my-md-4">
                                    <ul className="list-inline mb-2">
                                        <li className="list-inline-item m-0"><i className="fas fa-star small text-warning"></i></li>
                                        <li className="list-inline-item m-0 1"><i className="fas fa-star small text-warning"></i></li>
                                        <li className="list-inline-item m-0 2"><i className="fas fa-star small text-warning"></i></li>
                                        <li className="list-inline-item m-0 3"><i className="fas fa-star small text-warning"></i></li>
                                        <li className="list-inline-item m-0 4"><i className="fas fa-star small text-warning"></i></li>
                                    </ul>
                                    <h2 className="h4">{FormValue.title}</h2>
                                    <p className="text-muted">${FormValue.price}</p>
                                    <p className="text-sm mb-4">{FormValue.description}</p>
                                    <div className="row align-items-stretch mb-4 gx-0">
                                        <div className="col-sm-7">
                                            <div className="border d-flex align-items-center justify-content-between py-1 px-3"><span className="small text-uppercase text-gray mr-4 no-select">Quantity</span>
                                                <div className="quantity">
                                                    <button
                                                        onClick={()=> setQuantity(prev=> prev - 1)}
                                                        className="dec-btn p-0"><FaCaretLeft />
                                                    </button>
                                                    <input onChange={(e)=> setQuantity(Number(e.target.value))} className="form-control border-0 shadow-0 p-0" type="text"  value={quantity} />
                                                    <button
                                                        onClick={()=> setQuantity(prev=> prev + 1)}
                                                        className="inc-btn p-0"><FaCaretRight />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-5"><p className="btn btn-dark btn-sm w-100 h-100 d-flex align-items-center justify-content-center px-0" onClick={()=>addToCartHandler()}>Add to cart</p></div>
                                    </div><a className="btn btn-link text-dark text-decoration-none p-0" href="#!"><i className="far fa-heart me-2"></i>Add to wish list</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductViewModal;