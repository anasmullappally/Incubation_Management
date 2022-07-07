import React from 'react'
import Header from '../Components/AdminHeader/Header/Header'
import Siderbar from '../Components/AdminHeader/SideBar/SideBar'
import Recordtrack from '../Components/AdminRecordTrack/Recordtrack'

function AdminRecordings() {
    return (

        <div>
            <Header />
            <div style={{ display: "flex" }}>
                <Siderbar />
                <Recordtrack />
            </div>
        </div>
    )
}

export default AdminRecordings