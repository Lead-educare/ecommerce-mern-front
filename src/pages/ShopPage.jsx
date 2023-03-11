import React, {useEffect, useState} from 'react';
import MasterLayout from "../components/MasterLayout/MasterLayout";
import ProductViewModal from "../components/ProductViewModal/ProductViewModal";
import ProductCard from "../components/ProductCard/ProductCard";
import SelectSorting from "../components/SelectSorting/SelectSorting";
import MultiRangeSlider from "../components/PriceSlider/MulitRangeSlider";
import {ProductFilterListRequest, ProductListRequest, ProductTotalRequest} from "../APIRequest/APIProductRequest";
import {useSelector} from "react-redux";
import ReactPaginate from "react-paginate";
import {Link} from "react-router-dom";
import {CategoryListRequest} from "../APIRequest/APICategoryRequest";
const ShopPage = () => {
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(100);

    useEffect(()=>{

            ProductListRequest(false, 1);
            ProductTotalRequest();
            CategoryListRequest();


    }, [])

    useEffect(()=>{

            const getData = setTimeout(() => {
                if( min !== 0 || max !==100 ) {

                    ProductFilterListRequest({min, max});
                }
            }, 1000)
            return () => {
                clearTimeout(getData)
            }

    }, [min, max])

    const List = useSelector(state=>state.product.List);
    const ListTotal = useSelector(state=>state.product.ListTotal);
    const CatList = useSelector(state=>state.category.List)


    const handlePageClick = (e)=>{
        const pageNo = e.selected;
        ProductListRequest(false, e.selected +1)
    }


    const handlePriceRange = (e) =>{
        let min, max = 0;
        if(e.min !== min && e.min !== 0 || e.max !== max &&e.max !==100 ){

            const getData = setTimeout(() => {

                   ProductFilterListRequest(e);
                min = e.min
                max = e.max
            }, 5000)
            return () => {
                clearTimeout(getData)
            }
        }







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
                                <h1 className="h2 text-uppercase mb-0">Shop</h1>
                            </div>
                            <div className="col-lg-6 text-lg-end">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb justify-content-lg-end mb-0 px-0 bg-light">
                                        <li className="breadcrumb-item"><Link className="text-dark"
                                                                           to="/">Home</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">Shop</li>
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
                                <!-- Shop Sidebar-->
                                 */
                            }

                            <div className="col-lg-3 order-2 order-lg-1">
                                <div style={{marginBottom: '30px'}}>

                                <h5 className="text-uppercase mb-4">Categories</h5>
                                    <ul className={'list-group'}>


                                    {
                                        CatList.map(catItem=>(
                                    <li className='list-group-item bg-transparent border-0' key={catItem._id}>
                                    <Link to={`/category/${catItem.slug}`}className="py-2 px-4 mb-3 text-underline-hover"><strong
                                    className="small text-uppercase fw-bold">{catItem.name}</strong></Link>
                                    </li>

                                        ))
                                    }
                                    </ul>

                                </div>


                                <h6 className="text-uppercase mb-4 mt-7">Price range</h6>
                                <div className="price-range pt-2 mb-5">
                                    <div className='pb-4'>

                                            <MultiRangeSlider
                                                    min={0}
                                                    max={100}
                                                    onChange={({min, max})=>{
                                                        setMin(min)
                                                        setMax(max)
                                                    }
                                                    }
                                            />

                                    </div>
                                    <div className="row pt-4">
                                        <div className="col-6"><strong
                                            className="small text-uppercase">From</strong></div>
                                        <div className="col-6"><strong
                                            className="small  text-uppercase">To</strong></div>
                                    </div>
                                </div>




                            </div>
                            {
                                /*
                                <!-- Shop Listing-->
                                 */
                            }
                            <div className="col-lg-9 order-1 order-lg-2 mb-5 mb-lg-0">
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
                                        <ProductCard key={item._id} item={item} classNames={'col-lg-4 col-sm-6'} />
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

export default ShopPage;