import React, {useEffect, useState} from 'react';
import MasterLayout from "../components/MasterLayout/MasterLayout";
import ProductViewModal from "../components/ProductViewModal/ProductViewModal";
import ProductCard from "../components/ProductCard/ProductCard";
import SelectSorting from "../components/SelectSorting/SelectSorting";
import MultiRangeSlider from "../components/PriceSlider/MulitRangeSlider";
import {
    ProductFilterListRequest,
    ProductListByCategoryRequest,
    ProductListRequest,
    ProductTotalRequest
} from "../APIRequest/APIProductRequest";
import {useSelector} from "react-redux";
import ReactPaginate from "react-paginate";
import {Link, useParams} from "react-router-dom";
import {CategoryListRequest, FillCategoryFormRequestSlug} from "../APIRequest/APICategoryRequest";
const CategoryPageFront = () => {

    const {slug} = useParams();

    useEffect(()=>{

        ProductListByCategoryRequest(slug);
        FillCategoryFormRequestSlug(slug)

    }, [])


    const List = useSelector(state=>state.product.List);
    const ListTotal = useSelector(state=>state.product.ListTotal);
    const FormValue = useSelector(state => state.category.FormValue)



    const handlePageClick = (e)=>{
        const pageNo = e.selected;
        ProductListRequest(false, e.selected +1)
    }

    return (
        <MasterLayout>
            <ProductViewModal />

            <div className="container">
                {
                    /*
                    <!-- HERO SECTION-->
                     */
                }
                <section className="py-5 bg-light">
                    <div className="container">
                        <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
                            <div className="col-lg-6">
                                <h1 className="h2 text-uppercase mb-0">{FormValue.name}</h1>
                            </div>
                            <div className="col-lg-6 text-lg-end">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb justify-content-lg-end mb-0 px-0 bg-light">
                                        <li className="breadcrumb-item"><Link className="text-dark"
                                                                              to="/">Home</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">{FormValue.name}</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-5">
                    <div className="container p-0">
                        <div className="row">

                            {
                                /*
                                <!-- Shop Listing-->
                                 */
                            }
                            <div className="col-lg-12 order-1 order-lg-2 mb-5 mb-lg-0">
                                <div className="row mb-3 align-items-center">
                                    <div className="col-lg-6 mb-2 mb-lg-0">
                                        {/*<p className="text-sm text-muted mb-0">Showing 1–12 of 53 results</p>*/}
                                    </div>
                                    <div className="col-lg-6">
                                        <ul className="list-inline d-flex align-items-center justify-content-lg-end mb-0">
                                            <li className="list-inline-item text-muted me-3"><a
                                                className="reset-anchor p-0" href="#!"><i
                                                className="fas fa-th-large"></i></a></li>
                                            <li className="list-inline-item text-muted me-3"><a
                                                className="reset-anchor p-0" href="#!"><i className="fas fa-th"></i></a>
                                            </li>
                                            <li className="list-inline-item">
                                                <SelectSorting />
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="row">
                                    {
                                        List.map(item=>(
                                            <ProductCard key={item._id} item={item} />
                                        ))
                                    }
                                </div>


                                <div className='pagination justify-content-center justify-content-lg-end'>

                                    <ReactPaginate
                                        previousLabel="<"
                                        nextLabel=">"
                                        pageClassName="page-item"
                                        pageLinkClassName="page-link"
                                        previousClassName="page-item"
                                        previousLinkClassName="page-link"
                                        nextClassName="page-item"
                                        nextLinkClassName="page-link"
                                        breakLabel="..."
                                        breakClassName="page-item"
                                        breakLinkClassName="page-link"
                                        pageCount={Math.ceil(ListTotal/12)}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={handlePageClick}
                                        containerClassName="pagination"
                                        activeClassName="active"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </MasterLayout>
    );
};

export default CategoryPageFront;