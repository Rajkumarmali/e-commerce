import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Admin from '../admin/Admin'


const AdminRouters = () => {
    return (
        <Routes>
            <Route path='/*' element={<Admin />} />
        </Routes>
    )
}

export default AdminRouters
