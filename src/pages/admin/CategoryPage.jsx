import React, {useEffect, useRef, useState} from 'react';
import MasterLayoutAdmin from "../../components/admin/MasterLayout/MasterLayoutAdmin";
import {useNavigate} from "react-router-dom";
import {ErrorToast, IsEmpty} from "../../helper/formHelper";
import {Container, Row} from "react-bootstrap";
import {OnChangeCategoryInput} from "../../redux/state-slice/category-slice";
import {useSelector} from "react-redux";
import store from "../../redux/store/store";
import {CreateCategoryRequest, FillCategoryFormRequest} from "../../APIRequest/APICategoryRequest";

const CategoryPage = () => {

    let FormValue = useSelector(state => state.category.FormValue);

    let navigate = useNavigate();
    let [ObjectID,SetObjectID]=useState(0);

    useEffect(()=>{
        let params= new URLSearchParams(window.location.search);
        let id=params.get('id');
        if(id!==null){
            SetObjectID(id);
            (async () => {
                await FillCategoryFormRequest(id);
            })();
        }

    },[])


    const SaveChange = async () =>{

        if(IsEmpty(FormValue.name)){
            ErrorToast('Category Name must not be empty')
        }else {
           if(await CreateCategoryRequest(FormValue,ObjectID)){
                navigate('/categoryList')
           }
        }
    }

    return (
        <MasterLayoutAdmin>

        <Container fluid={true} className="content-body">
            <Row className="d-flex justify-content-center">
                <div className="col-12 col-lg-8  col-sm-12 col-md-8  p-2">
                    <div className="card">
                        <div className="card-body">
                            <h4>Category</h4>
                            <br/>
                            <input onChange={(e)=>{
                                store.dispatch(OnChangeCategoryInput({
                                    name: 'name',
                                    Value: e.target.value
                                }))
                            } }
                                   value={FormValue.name}
                                   placeholder="Category Name" className="form-control animated fadeInUp" type="text"/>
                            <br/>
                            <button onClick={SaveChange} className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </Row>
        </Container>

        </MasterLayoutAdmin>
    );
};

export default CategoryPage;