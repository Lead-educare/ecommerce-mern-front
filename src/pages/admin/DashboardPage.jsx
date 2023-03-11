import React, {useEffect, useState} from 'react';
import MasterLayoutAdmin from "../../components/admin/MasterLayout/MasterLayoutAdmin";

const DashboardPage = () => {


    return (
        <MasterLayoutAdmin>
            <div className="container-fluid my-5">
                <div className="row">
                    <div className="col-12">
                        <h2>Welcome to dashboard</h2>
                    </div>
                </div>
            </div>
        </MasterLayoutAdmin>
    );
};

export default DashboardPage;