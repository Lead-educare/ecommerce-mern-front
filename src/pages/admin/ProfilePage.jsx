import React from 'react';
import MasterLayoutAdmin from "../../components/admin/MasterLayout/MasterLayoutAdmin";
import Profile from "../../components/admin/Profile/Profile";

const ProfilePage = () => {
    return (
        <MasterLayoutAdmin>
            <Profile />
        </MasterLayoutAdmin>
    );
};

export default ProfilePage;