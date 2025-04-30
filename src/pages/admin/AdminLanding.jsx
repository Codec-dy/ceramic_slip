import React from 'react'
import AdminTemplate from '../../components/admin/AdminTemplate'

const AdminLanding = () => {
  return (
    <AdminTemplate>
        <div className='flex flex-col items-center w-full gap-3'>
            <div className='flex flex-col justify-center items-center h-full w-full gap-7'>
            <h1 className='text-3xl font-bold text-center'>Welcome to the admin dashboard</h1>
              <p className='text-lg'>Select a Tab on the side bar to display</p>
            </div>
        </div>
    </AdminTemplate>
  )
}

export default AdminLanding