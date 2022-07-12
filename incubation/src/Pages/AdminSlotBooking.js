import React from 'react'
import Header from '../Components/AdminHeader/Header/Header'
import Siderbar from '../Components/AdminHeader/SideBar/SideBar'
import SlotBooking from '../Components/SlotBooking/SlotBooking'

function AdminSlotBooking() {
    return (
        <div>
            <Header />
            <div style={{ display: "flex" }}>
                <Siderbar />
                <SlotBooking />
            </div>
        </div>


    )
}

export default AdminSlotBooking