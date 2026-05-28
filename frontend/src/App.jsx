import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Layouts loaded eagerly (small, always needed)
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy-loaded pages — each gets its own chunk, loaded on demand
const Landing = lazy(() => import('./pages/Landing'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const DaftarEkskul = lazy(() => import('./pages/DaftarEkskul'));
const VerifyOTP = lazy(() => import('./pages/VerifyOTP'));
const CompleteProfile = lazy(() => import('./pages/CompleteProfile'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const QRAttendance = lazy(() => import('./pages/QRAttendance'));
const OfficerScanner = lazy(() => import('./pages/OfficerScanner'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

// Minimal loading spinner matching the design system
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[300px]">
      <div className="w-6 h-6 border-[3px] border-primary border-t-transparent animate-spin rounded-full"></div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Pages */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Landing />} />
          </Route>

          {/* Auth Pages */}
          <Route element={<AuthLayout />}>
            <Route path="/daftar-ekskul" element={<DaftarEkskul />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/complete-profile" element={<CompleteProfile />} />
          </Route>

          {/* Protected Dashboard Pages */}
          <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/attendance/qr" element={<QRAttendance />} />
            <Route path="/officer/scanner" element={<OfficerScanner />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
