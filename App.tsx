import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Workbench from './Workbench';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ManageChunks from './pages/admin/ManageChunks';
import ManageAtoms from './pages/admin/ManageAtoms';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Workbench />} />
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="chunks" element={<ManageChunks />} />
          <Route path="atoms" element={<ManageAtoms />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
