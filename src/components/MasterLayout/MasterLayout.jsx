import React, {useEffect, useState} from 'react';
import {BsSuitHeart} from "react-icons/bs";
import {FaDollyFlatbed, FaRegUser} from "react-icons/fa";
import {Link, NavLink} from "react-router-dom";
import {getToken} from "../../helper/SessionHelper";
import {useSelector} from "react-redux";

const MasterLayout = (props) => {
    const List = useSelector(state => state.cart.List);
    const [totalQnty, setTotalQnty] = useState(0)


    useEffect(()=>{
        let qnt = 0
        List.forEach(item=>{
            qnt += item.quantity
        })
        setTotalQnty(()=>qnt)
    }, [List])

    return (
        <div className="page-holder">

            <header className="header bg-white">
                <div className="container px-lg-3">
                    <nav className="navbar navbar-expand-lg navbar-light py-3 px-lg-0"><Link className="navbar-brand" to='/'><span className="fw-bold text-uppercase text-dark">Fashionary</span></Link>
                        <button className="navbar-toggler navbar-toggler-end" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto">

                                <li className="nav-item">
                                    <NavLink className={`nav-link ${
                                        (isActive)=> isActive ? 'active' : ''
                                    }`} to='/'>
                                        Home
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className={`nav-link ${
                                        (isActive)=> isActive ? 'active' : ''
                                    }`} to='/shop'>
                                        Shop
                                    </NavLink>
                                </li>


                            </ul>
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item"><Link to={'/cart'} className="nav-link"><span className='text-gray'> <FaDollyFlatbed /></span> Cart <small className="fw-normal text-gray">({totalQnty})</small></Link></li>
                                <li className="nav-item"><a className="nav-link" href="#!"> <span><BsSuitHeart /></span><small className="fw-normal text-gray"> (0)</small></a></li>
                                <li className="nav-item">

                                    {
                                        getToken()? (
                                            <a className="nav-link" href={'/dashboard'}>
                                                <span className='text-gray'><FaRegUser /></span>
                                                Dashboard
                                            </a>
                                        ):(
                                            <Link className="nav-link" to={'/login'}>
                                                <span className='text-gray'><FaRegUser /></span>
                                                Login
                                            </Link>
                                        )
                                    }

                                    </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
            {props.children}


            <footer className="bg-dark text-white">
                <div className="container py-4">
                    <div className="row py-5">
                        <div className="col-md-4 mb-3 mb-md-0">
                            <h6 className="text-uppercase mb-3">Customer services</h6>
                            <ul className="list-unstyled mb-0">
                                <li><a className="footer-link" href="#!">Help &amp; Contact Us</a></li>
                                <li><a className="footer-link" href="#!">Returns &amp; Refunds</a></li>
                                <li><a className="footer-link" href="#!">Online Stores</a></li>
                                <li><a className="footer-link" href="#!">Terms &amp; Conditions</a></li>
                            </ul>
                        </div>
                        <div className="col-md-4 mb-3 mb-md-0">
                            <h6 className="text-uppercase mb-3">Company</h6>
                            <ul className="list-unstyled mb-0">
                                <li><a className="footer-link" href="#!">What We Do</a></li>
                                <li><a className="footer-link" href="#!">Available Services</a></li>
                                <li><a className="footer-link" href="#!">Latest Posts</a></li>
                                <li><a className="footer-link" href="#!">FAQs</a></li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <h6 className="text-uppercase mb-3">Social media</h6>
                            <ul className="list-unstyled mb-0">
                                <li><a className="footer-link" href="#!">Twitter</a></li>
                                <li><a className="footer-link" href="#!">Instagram</a></li>
                                <li><a className="footer-link" href="#!">Tumblr</a></li>
                                <li><a className="footer-link" href="#!">Pinterest</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-top pt-4" style={{borderColor: "#1d1d1d !important"}}>
                        <div className="row">
                            <div className="col-md-6 text-center text-md-start">
                                <p className="small text-muted mb-0">&copy; 2021 All rights reserved.</p>
                            </div>
                            <div className="col-md-6 text-center text-md-end">
                                <p className="small text-muted mb-0">Template designed by <a className="text-white reset-anchor" href="https://bootstrapious.com/p/boutique-bootstrap-e-commerce-template">Bootstrapious</a></p>

                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default MasterLayout;