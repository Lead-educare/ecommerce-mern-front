import React, {useRef} from 'react';
import {Container, Navbar} from "react-bootstrap";
import {Link, NavLink} from "react-router-dom";
import {AiOutlineCheckCircle, AiOutlineEdit, AiOutlineLogout, AiOutlineMenuUnfold, AiOutlineUser} from "react-icons/ai";
import {BsHourglass, BsListNested} from "react-icons/bs";
import {FaProductHunt, MdOutlineCancelPresentation, RiDashboardLine} from "react-icons/all";
import Logo from '../../../assets/images/logo.svg';
import {removeSessions, getUserDetails} from "../../../helper/SessionHelper";
import './MasterLayoutAdmin.css'
import {AdminCheckRequest, AuthCheckRequest} from "../../../APIRequest/APIAdminRequest";

const MasterLayoutAdmin = (props) => {
    let contentRef,sideNavRef=useRef();



    const MenuBarClickHandler = () => {
        let sideNav = sideNavRef;
        let content = contentRef;
        if (sideNav.classList.contains("side-nav-open")) {
            sideNav.classList.add("side-nav-close");
            sideNav.classList.remove("side-nav-open");
            content.classList.add("content-expand");
            content.classList.remove("content");
        } else {
            sideNav.classList.remove("side-nav-close");
            sideNav.classList.add("side-nav-open");
            content.classList.remove("content-expand");
            content.classList.add("content");
        }
    };

    const logoutSubmit = () =>{
        removeSessions()
    }


    return (
        <>
            <Navbar  className="fixed-top px-0 shadow-sm ">
                <Container fluid={true} className={'container-admin'}>
                    <Navbar.Brand >
                        <div className='d-flex'>


                        <a className="icon-nav m-0 h5" onClick={MenuBarClickHandler}><AiOutlineMenuUnfold/></a>
                        <Link className='mx-4' to='/dashboard'>

                            <span className="fw-bold text-uppercase text-dark">Fashionary</span>
                        </Link>
                        <a className='mx-4 d-flex align-content-center' target='_blank' href='/'>
                            <p className="fw-bold text-uppercase text-dark">Go to Live site</p>
                        </a>
                        </div>
                    </Navbar.Brand>
                    <div className="float-right h-auto d-flex">
                        <div className="user-dropdown">
                            <img className="icon-nav-img icon-nav" src={getUserDetails()[0].photo} alt={getUserDetails()[0].firstName} />
                            <div className="user-dropdown-content ">
                                <div className="mt-4 text-center">
                                    <img className="icon-nav-img" src={getUserDetails()[0].photo} alt={getUserDetails()[0].firstName} />
                                    <h6>{getUserDetails()[0].firstName}</h6>
                                    <hr className="user-dropdown-divider p-0"/>
                                </div>
                                <NavLink to="/profile" className="side-bar-item">
                                    <AiOutlineUser className="side-bar-item-icon" />
                                    <span className="side-bar-item-caption">Profile</span>
                                </NavLink>
                                <a onClick={logoutSubmit} className="side-bar-item">
                                    <AiOutlineLogout className="side-bar-item-icon" />
                                    <span className="side-bar-item-caption">Logout</span>
                                </a>
                            </div>
                        </div>
                    </div>

                </Container>
            </Navbar>

            <div ref={(div) =>{sideNavRef=div}} className="side-nav-open">

                <Navbar className={ "nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"}>
                    {


                        getUserDetails()[0]['role'] === 1 ? (
                            <>

                                <NavLink className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2" } >
                                    <a href="#submenu2" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-dark">
                                        <RiDashboardLine className="side-bar-item-icon" /> <span
                                        className="ms-1 d-none d-sm-inline">Category</span> </a>
                                    <NavLink className="collapse nav flex-column ms-3" id="submenu2" data-bs-parent="#menu">
                                        <NavLink className='py-1'>
                                            <Link to='/createUpdateCategory' className="text-dark"> <span
                                                className="d-none d-sm-inline fs-7 ">Create Update</span></Link>
                                        </NavLink>
                                        <NavLink className='py-1'>
                                            <Link to='/categoryList' className=" text-dark"> <span
                                                className="d-none d-sm-inline fs-7">Category List</span></Link>
                                        </NavLink>
                                    </NavLink>

                                </NavLink>
                                <NavLink className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2" } >
                                    <a href="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-dark">

                                        <FaProductHunt className="side-bar-item-icon" />

                                        <span
                                            className="ms-1 d-none d-sm-inline">Product</span> </a>
                                    <NavLink className="collapse nav flex-column ms-3" id="submenu1" data-bs-parent="#menu">
                                        <NavLink className='py-1'>
                                            <Link to='/createUpdateProduct' className="text-dark"> <span
                                                className="d-none d-sm-inline fs-7 ">Create Update</span></Link>
                                        </NavLink>
                                        <NavLink className='py-1'>
                                            <Link to='/productList' className=" text-dark"> <span
                                                className="d-none d-sm-inline fs-7">Product List</span></Link>
                                        </NavLink>
                                    </NavLink>

                                </NavLink>
                                <NavLink className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2" } to='/order'>

                                    <FaProductHunt className="side-bar-item-icon" />

                                    <span
                                        className="ms-1 d-none d-sm-inline fs-7">Order</span>
                                </NavLink>
                                <NavLink className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2" } to='/orderList'>

                                    <FaProductHunt className="side-bar-item-icon" />

                                    <span
                                        className="ms-1 d-none d-sm-inline fs-7">OrderList</span>
                                </NavLink>

                            </>
                        ) : (
                            <NavLink className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2" } to='/order'>

                                <FaProductHunt className="side-bar-item-icon" />

                                <span
                                    className="ms-1 d-none d-sm-inline fs-7">Order</span>
                            </NavLink>
                        )
                    }



                </Navbar>







            </div>

            <div ref={(div) => contentRef = div} className="content">
                {props.children}
            </div>
        </>
    );
};

export default MasterLayoutAdmin;