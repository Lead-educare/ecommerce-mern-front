import React from 'react';
import catImg from "../../assets/images/cat-img-2.jpg";
import {FaExpand} from 'react-icons/fa'
import {BsSuitHeart} from 'react-icons/bs'
import store from "../../redux/store/store";
import {OnChangeProductInput} from "../../redux/state-slice/product-slice";
import {Link} from 'react-router-dom'
import {SetCartList, SetCartListCount} from "../../redux/state-slice/cart-slice";
import {useSelector} from "react-redux";

const ProductCard = (props) => {

    const {item, classNames} = props || {};

    const addToCartHandler = (items) =>{
        store.dispatch(
            SetCartListCount( {
                _id: items._id,
                title: items.title,
                slug: items.slug,
                description: items.description,
                price: items.price,
                category: items.category.name,
                photo: items.photo,
            })
        )
    }
    return (
        <div className={classNames || 'col-xl-3 col-lg-4 col-sm-6'}>
            <div className="product text-center">
                <div className="position-relative mb-3">
                    <div className="badge text-white bg-"></div><Link className="d-block" to={`/product/${item.slug}`}><img className="img-fluid w-100" src={item.photo} alt={item.title} /></Link>
                    <div className="product-overlay">
                        <ul className="mb-0 list-inline">
                            <li className="list-inline-item m-0 p-0"><span className="btn btn-sm btn-outline-dark" ><BsSuitHeart /></span></li>
                            <li className="list-inline-item m-0 p-0"><span className="btn btn-sm btn-dark" onClick={()=> addToCartHandler(item)}>Add to cart</span></li>
                            <li className="list-inline-item me-0"><span
                                onClick={()=>store.dispatch(OnChangeProductInput({Name:"_id",Value:item._id}))}
                                className="btn btn-sm btn-outline-dark" href="#productView" data-bs-toggle="modal"><FaExpand /></span></li>
                        </ul>
                    </div>
                </div>
                <h6> <Link className="reset-anchor" to={`/product/${item.slug}`}>{item.title}</Link></h6>
                <p className="small text-muted">${item.price}</p>
            </div>
        </div>
    );
};

export default ProductCard;