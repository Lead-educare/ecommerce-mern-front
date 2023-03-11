import React, {useEffect, useState} from 'react';
import MasterLayout from "../components/MasterLayout/MasterLayout";
import {FaCaretLeft, FaCaretRight} from "react-icons/all";
import ProductCard from "../components/ProductCard/ProductCard";
import {useParams} from "react-router-dom";
import {FillProductFormRequest, ProductListRequest} from "../APIRequest/APIProductRequest";
import {useSelector} from "react-redux";
import {SetCartList} from "../redux/state-slice/cart-slice";
import store from "../redux/store/store";
import {SuccessToast} from "../helper/formHelper";

const ProductDetailPage = () => {
    const {slug} = useParams();
    const [quantity, setQuantity] = useState(1)
    const FormValue = useSelector(state => state.product.FormValue);
    const List = useSelector(state => state.product.List)


    useEffect(()=>{
        FillProductFormRequest("0", slug)
    }, []);
    useEffect(()=>{
        if(FormValue._id){
             ProductListRequest(false, 0, {
                 productId: FormValue._id,
                 categoryId: FormValue?.category?._id
             })
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
        <MasterLayout>
            <section className="py-5">
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-lg-6">
                            {
                                /**
                                 *   <!-- PRODUCT SLIDER-->
                                 */
                            }

                            <div className="row m-sm-0">
                                <div className="col-sm-2 p-sm-0 order-2 order-sm-1 mt-2 mt-sm-0 px-xl-2">
                                {/*    <div*/}
                                {/*        className="swiper product-slider-thumbs swiper-initialized swiper-vertical swiper-pointer-events swiper-thumbs">*/}
                                {/*        <div className="swiper-wrapper" id="swiper-wrapper-b81c47b72efc7347"*/}
                                {/*             aria-live="polite"*/}
                                {/*             style={{transform: 'translate3d(0px, 0px, 0px); transition-duration: 0ms'}}*/}
                                {/*        >*/}
                                {/*            <div*/}
                                {/*                className="swiper-slide h-auto swiper-thumb-item mb-3 swiper-slide-visible swiper-slide-active"*/}
                                {/*                style={{height: '433px'}} role="group" aria-label="1 / 4"><img*/}
                                {/*                className="w-100"*/}
                                {/*                src="https://d19m59y37dris4.cloudfront.net/boutique/2-0/img/product-detail-1.023bc49d.jpg"*/}
                                {/*                alt="..." /></div>*/}
                                {/*            <div*/}
                                {/*                className="swiper-slide h-auto swiper-thumb-item mb-3 swiper-slide-visible swiper-slide-next"*/}
                                {/*                style={{height: '433px'}} role="group" aria-label="2 / 4"><img*/}
                                {/*                className="w-100"*/}
                                {/*                src="https://d19m59y37dris4.cloudfront.net/boutique/2-0/img/product-detail-2.62056b28.jpg"*/}
                                {/*                alt="..." /></div>*/}
                                {/*            <div*/}
                                {/*                className="swiper-slide h-auto swiper-thumb-item mb-3 swiper-slide-visible"*/}
                                {/*                style={{height: '433px'}} role="group" aria-label="3 / 4"><img*/}
                                {/*                className="w-100"*/}
                                {/*                src="https://d19m59y37dris4.cloudfront.net/boutique/2-0/img/product-detail-3.4edd674c.jpg"*/}
                                {/*                alt="..." /></div>*/}
                                {/*            <div*/}
                                {/*                className="swiper-slide h-auto swiper-thumb-item mb-3 swiper-slide-visible swiper-slide-thumb-active"*/}
                                {/*                style={{height: '433px'}} role="group" aria-label="4 / 4"><img*/}
                                {/*                className="w-100"*/}
                                {/*                src="https://d19m59y37dris4.cloudfront.net/boutique/2-0/img/product-detail-4.072fd9d4.jpg"*/}
                                {/*                alt="..." /></div>*/}
                                {/*        </div>*/}
                                {/*        <span className="swiper-notification" aria-live="assertive"*/}
                                {/*              aria-atomic="true"></span></div>*/}
                                </div>
                                <div className="col-sm-10 order-1 order-sm-2">

                                    <div
                                        className="swiper product-slider swiper-initialized swiper-horizontal swiper-pointer-events">
                                        <div className="swiper-wrapper" id="swiper-wrapper-29696aa88b734ec3"
                                             aria-live="polite"
                                             style={{transform: 'translate3d(-1509px, 0px, 0px); transition-duration: 0ms'}}>
                                            <div className="swiper-slide h-auto" style={{width: '503px'}} role="group"
                                                 aria-label="1 / 4"><a className="glightbox product-view"
                                                                       href={FormValue.photo}
                                                                       data-gallery="gallery2"
                                                                       data-glightbox="Product item 1"><img
                                                className="img-fluid"
                                                src={FormValue.photo}
                                                alt={FormValue.title} /></a></div>
                                            <div className="swiper-slide h-auto" style={{width: '503px'}}role="group"
                                                 aria-label="2 / 4"><a className="glightbox product-view"
                                                                       href="img/product-detail-2.62056b28.jpg"
                                                                       data-gallery="gallery2"
                                                                       data-glightbox="Product item 2"><img
                                                className="img-fluid"
                                                src="https://d19m59y37dris4.cloudfront.net/boutique/2-0/img/product-detail-2.62056b28.jpg"
                                                alt="..." /></a></div>
                                            <div className="swiper-slide h-auto swiper-slide-prev" style={{width: '503px'}}
                                                 role="group" aria-label="3 / 4"><a className="glightbox product-view"
                                                                                    href="img/product-detail-3.4edd674c.jpg"
                                                                                    data-gallery="gallery2"
                                                                                    data-glightbox="Product item 3"><img
                                                className="img-fluid"
                                                src="https://d19m59y37dris4.cloudfront.net/boutique/2-0/img/product-detail-3.4edd674c.jpg"
                                                alt="..." /></a></div>
                                            <div className="swiper-slide h-auto swiper-slide-active"
                                                 style={{width: '503px'}} role="group" aria-label="4 / 4"><a
                                                className="glightbox product-view"
                                                href="img/product-detail-4.072fd9d4.jpg" data-gallery="gallery2"
                                                data-glightbox="Product item 4"><img className="img-fluid"
                                                                                     src="https://d19m59y37dris4.cloudfront.net/boutique/2-0/img/product-detail-4.072fd9d4.jpg"
                                                                                     alt="..." /></a></div>
                                        </div>
                                        <span className="swiper-notification" aria-live="assertive"
                                              aria-atomic="true"></span></div>
                                </div>
                            </div>
                        </div>
                        {
                            /**
                             *   <!-- PRODUCT Details-->
                             */
                        }

                        <div className="col-lg-6">
                            <ul className="list-inline mb-2 text-sm">
                                <li className="list-inline-item m-0"><i className="fas fa-star small text-warning"></i>
                                </li>
                                <li className="list-inline-item m-0 1"><i
                                    className="fas fa-star small text-warning"></i></li>
                                <li className="list-inline-item m-0 2"><i
                                    className="fas fa-star small text-warning"></i></li>
                                <li className="list-inline-item m-0 3"><i
                                    className="fas fa-star small text-warning"></i></li>
                                <li className="list-inline-item m-0 4"><i
                                    className="fas fa-star small text-warning"></i></li>
                            </ul>
                            <h1>{FormValue.title}</h1>
                            <p className="text-muted lead">$250</p>
                            <p className="text-sm mb-4">{FormValue.description}</p>
                            <div className="row align-items-stretch mb-4">
                                <div className="col-sm-5 pr-sm-0">
                                    <div
                                        className="border d-flex align-items-center justify-content-between py-1 px-3 bg-white border-white">
                                        <span className="small text-uppercase text-gray mr-4 no-select">Quantity</span>
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
                                <div className="col-sm-3 pl-sm-0"><p
                                    onClick={()=>addToCartHandler()}
                                    className="btn btn-dark btn-sm btn-block h-100 d-flex align-items-center justify-content-center px-0"
                                    >Add to cart</p></div>
                            </div>

                            <ul className="list-unstyled small d-inline-block">

                                <li className="px-3 py-2 mb-1 bg-white text-muted"><strong
                                    className="text-uppercase text-dark">Category:</strong><a
                                    className="reset-anchor ms-2" href="#!">{FormValue.category.name}</a></li>


                            </ul>
                        </div>
                    </div>
                    {
                        /**
                         *   <!-- Details Tab-->
                         */
                    }

                    <ul className="nav nav-tabs border-0" id="myTab" role="tablist">
                        <li className="nav-item"><a className="nav-link text-uppercase active" id="description-tab"
                                                    data-bs-toggle="tab" href="#description" role="tab"
                                                    aria-controls="description" aria-selected="true">Description</a>
                        </li>
                        <li className="nav-item"><a className="nav-link text-uppercase" id="reviews-tab"
                                                    data-bs-toggle="tab" href="#reviews" role="tab"
                                                    aria-controls="reviews" aria-selected="false">Reviews</a></li>
                    </ul>
                    <div className="tab-content mb-5" id="myTabContent">
                        <div className="tab-pane fade active show" id="description" role="tabpanel"
                             aria-labelledby="description-tab">
                            <div className="p-4 p-lg-5 bg-white">
                                <h6 className="text-uppercase">Product description </h6>
                                <p className="text-muted text-sm mb-0">
                                    {FormValue.description}
                                </p>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
                            <div className="p-4 p-lg-5 bg-white">
                                <div className="row">
                                    <div className="col-lg-8">
                                        <div className="d-flex mb-3">
                                            <div className="flex-shrink-0"><img className="rounded-circle"
                                                                                src="https://d19m59y37dris4.cloudfront.net/boutique/2-0/img/customer-1.2909e6e3.png"
                                                                                alt="" width="50" /></div>
                                            <div className="ms-3 flex-shrink-1">
                                                <h6 className="mb-0 text-uppercase">Jason Doe</h6>
                                                <p className="small text-muted mb-0 text-uppercase">20 May 2020</p>
                                                <ul className="list-inline mb-1 text-xs">
                                                    <li className="list-inline-item m-0"><i
                                                        className="fas fa-star text-warning"></i></li>
                                                    <li className="list-inline-item m-0"><i
                                                        className="fas fa-star text-warning"></i></li>
                                                    <li className="list-inline-item m-0"><i
                                                        className="fas fa-star text-warning"></i></li>
                                                    <li className="list-inline-item m-0"><i
                                                        className="fas fa-star text-warning"></i></li>
                                                    <li className="list-inline-item m-0"><i
                                                        className="fas fa-star-half-alt text-warning"></i></li>
                                                </ul>
                                                <p className="text-sm mb-0 text-muted">Lorem ipsum dolor sit amet,
                                                    consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                                                    labore et dolore magna aliqua.</p>
                                            </div>
                                        </div>
                                        <div className="d-flex">
                                            <div className="flex-shrink-0"><img className="rounded-circle"
                                                                                src="https://d19m59y37dris4.cloudfront.net/boutique/2-0/img/customer-2.f49623e8.png"
                                                                                alt="" width="50" /></div>
                                            <div className="ms-3 flex-shrink-1">
                                                <h6 className="mb-0 text-uppercase">Jane Doe</h6>
                                                <p className="small text-muted mb-0 text-uppercase">20 May 2020</p>
                                                <ul className="list-inline mb-1 text-xs">
                                                    <li className="list-inline-item m-0"><i
                                                        className="fas fa-star text-warning"></i></li>
                                                    <li className="list-inline-item m-0"><i
                                                        className="fas fa-star text-warning"></i></li>
                                                    <li className="list-inline-item m-0"><i
                                                        className="fas fa-star text-warning"></i></li>
                                                    <li className="list-inline-item m-0"><i
                                                        className="fas fa-star text-warning"></i></li>
                                                    <li className="list-inline-item m-0"><i
                                                        className="fas fa-star-half-alt text-warning"></i></li>
                                                </ul>
                                                <p className="text-sm mb-0 text-muted">Lorem ipsum dolor sit amet,
                                                    consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                                                    labore et dolore magna aliqua.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        /**
                         *   <!-- Related PRODUCT -->
                         */
                    }

                    <h2 className="h5 text-uppercase mb-4">Related products</h2>
                    <div className="row">

                        {
                            List.map(item=>(
                                 <ProductCard key={item._id} item={item} classNames='col-lg-3 col-sm-6' />
                            ))
                        }


                    </div>
                </div>
            </section>



        </MasterLayout>
    );
};

export default ProductDetailPage;