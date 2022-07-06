import React from 'react'
import Applicationlist from '../Components/AdminApplicationList/Applicationlist'
import Header from '../Components/AdminHeader/Header/Header'
import Siderbar from '../Components/AdminHeader/SideBar/SideBar'

function AdminApplication() {
  return (
    <div>
        <Header/>
        <div style={{display:"flex"}}>
            <Siderbar/>
            <Applicationlist/>
        </div>
    </div>
  )
}

export default AdminApplication