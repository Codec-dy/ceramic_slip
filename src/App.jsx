import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Form from './pages/Form.jsx'

import Admin from './pages/admin/Admin.jsx'
import AdminLanding from './pages/admin/AdminLanding.jsx'
import { ToastContainer } from 'react-toastify'
import Slips from './pages/admin/Slips.jsx'
import Settings from './pages/admin/Settings.jsx'
import AdminFormPreview from './pages/admin/AdminFormPreview.jsx'
import ProtectedRoute from './pages/admin/ProtectedRoute.jsx'
import Archived from './pages/admin/Archived.jsx'
import Pickup from './pages/admin/Pickup.jsx'
function App() {

  return (
    <div>
    <Routes>
    <Route path="/" element={<Form/>} />
    {/* Allow homepage to accept an id as a path param (e.g. /<id>) */}
    <Route path="/:editId" element={<Form/>} />
      <Route path="/admin/wp-admin" element={<Admin/>} />
      <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute>
                            <AdminLanding />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/dashboard/settings"
                    element={
                        <ProtectedRoute>
                            <Settings />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/dashboard/slips"
                    element={
                        <ProtectedRoute>
                            <Slips />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/dashboard/pickup"
                    element={
                        <ProtectedRoute>
                            <Pickup />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/dashboard/slips/preview/:id"
                    element={
                        <ProtectedRoute>
                            <AdminFormPreview />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/dashboard/completedslips"
                    element={
                        <ProtectedRoute>
                            <Archived />
                        </ProtectedRoute>
                    }
                />
            </Routes>
    <ToastContainer/>
    </div>
  )
}

export default App
