import React, {useEffect} from 'react';
import catImg from "../assets/images/cat-img-1.jpg";
import ProductCard from "../components/ProductCard/ProductCard";
import MasterLayout from "../components/MasterLayout/MasterLayout";
import ProductViewModal from "../components/ProductViewModal/ProductViewModal";
import {useSelector} from "react-redux";
import {ProductListRequest} from "../APIRequest/APIProductRequest";
import {CategoryListRequest} from "../APIRequest/APICategoryRequest";
import {Link} from "react-router-dom";
import {FaStopwatch} from "react-icons/fa";


const HomePage = () => {

    useEffect(()=>{
       ProductListRequest(false, 1)
        CategoryListRequest()

    }, [])

    const List = useSelector(state => state.product.List);
    const CatList = useSelector(state => state.category.List)

    return (
        <MasterLayout>

            <ProductViewModal />

            {/* <!-- HERO SECTION--> */}
            <div className="container">
                <section className="hero pb-3 bg-cover bg-center d-flex align-items-center" style={{background: catImg}}>
                    <div className="container py-5">
                        <div className="row px-4 px-lg-5">
                            <div className="col-lg-6">
                                <p className="text-muted small text-uppercase mb-2">New Inspiration 2020</p>
                                <h1 className="h2 text-uppercase mb-3">20% off on new season</h1><a className="btn btn-dark" href="shop.html">Browse collections</a>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- CATEGORIES SECTION--> */}
                <section className="pt-5">
                    <header className="text-center">
                        <p className="small text-muted small text-uppercase mb-1">Carefully created collections</p>
                        <h2 className="h5 text-uppercase mb-4">Browse our categories</h2>
                    </header>
                    <div className="row">
                        {
                            CatList.map(item=>(

                                <div key={item._id} className="col-md-4"><Link className="category-item" to={`/category/${item.slug}`}><img className="img-fluid" src={catImg} alt=""/><strong className="category-item-title">{item.name}</strong></Link>
                                </div>
                            ))
                        }

                    </div>
                </section>
                {/* <!-- TRENDING PRODUCTS--> */}
                <section className="py-5">
                    <header>
                        <p className="small text-muted small text-uppercase mb-1">Made the hard way</p>
                        <h2 className="h5 text-uppercase mb-4">Top trending products</h2>
                    </header>
                    <div className="row">
                        {
                            List?.map(item=>
                                <ProductCard key={item._id} item={item} />
                            )
                        }


                    </div>
                </section>
                {/* <!-- SERVICES--> */}
                <section className="py-5 bg-light">
                    <div className="container">
                        <div className="row text-center gy-3">
                            <div className="col-lg-4">
                                <div className="d-inline-block">
                                    <div className="d-flex align-items-end">
                                        <svg className="svg-icon svg-icon-big svg-icon-light">
                                            <use xlinkHref="#delivery-time-1"> </use>
                                        </svg>
                                        <div className="text-start ms-3">
                                            <h6 className="text-uppercase mb-1">Free shipping</h6>
                                            <p className="text-sm mb-0 text-muted">Free shipping worldwide</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="d-inline-block">
                                    <div className="d-flex align-items-end">
                                        <svg className="svg-icon svg-icon-big svg-icon-light">
                                            <use xlinkHref="#helpline-24h-1"> </use>
                                        </svg>
                                        <div className="text-start ms-3">
                                            <h6 className="text-uppercase mb-1">24 x 7 service</h6>
                                            <p className="text-sm mb-0 text-muted">Free shipping worldwide</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="d-inline-block">
                                    <div className="d-flex align-items-end">
                                        <svg className="svg-icon svg-icon-big svg-icon-light">
                                            <use xlinkHref="#label-tag-1"> </use>
                                        </svg>
                                        <FaStopwatch />
                                        <div className="text-start ms-3">
                                            <h6 className="text-uppercase mb-1">Festivaloffers</h6>
                                            <p className="text-sm mb-0 text-muted">Free shipping worldwide</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- NEWSLETTER--> */}
                <section className="py-5">
                    <div className="container p-0">
                        <div className="row gy-3">
                            <div className="col-lg-6">
                                <h5 className="text-uppercase">Let's be friends!</h5>
                                <p className="text-sm text-muted mb-0">Nisi nisi tempor consequat laboris nisi.</p>
                            </div>
                            <div className="col-lg-6">
                                <form action="#">
                                    <div className="input-group">
                                        <input className="form-control form-control-lg" type="email" placeholder="Enter your email address" aria-describedby="button-addon2" />
                                        <button className="btn btn-dark" id="button-addon2" type="submit">Subscribe</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </MasterLayout>
    );
};

export default HomePage;