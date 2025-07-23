import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Admin/Dashboard';
import AdminProfile from './pages/Admin/AdminProfile';
import AdminProjects from './pages/Admin/AdminProjects';
import AdminBlogs from './pages/Admin/AdminBlogs';
import AdminMessage from './pages/Admin/AdminMessage';
import AdminSettings from './pages/Admin/AdminSettings';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
          </Route>

          {/* Protected admin routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="blogs" element={<AdminBlogs />} />
            <Route path="messages" element={<AdminMessage />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Redirect invalid paths */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;