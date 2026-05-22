import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { LayoutDashboard, User, QrCode, LogOut, Settings } from 'lucide-react';

export default function DashboardLayout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex bg-surface-1">
      {/* Sidebar */}
      <aside className="w-[256px] bg-canvas border-r border-hairline hidden md:flex flex-col">
        <div className="h-[48px] border-b border-hairline flex items-center px-6">
          <span className="font-semibold text-[14px]">ITC System</span>
        </div>
        
        <nav className="flex-1 py-4">
          <ul className="space-y-1">
            <li>
              <Link to="/dashboard" className="flex items-center px-6 py-3 text-[14px] text-ink hover:bg-surface-1 hover:text-primary border-l-4 border-transparent hover:border-primary transition-colors">
                <LayoutDashboard className="w-4 h-4 mr-3" /> Dasbor
              </Link>
            </li>
            <li>
              <Link to="/profile" className="flex items-center px-6 py-3 text-[14px] text-ink hover:bg-surface-1 hover:text-primary border-l-4 border-transparent hover:border-primary transition-colors">
                <User className="w-4 h-4 mr-3" /> Profil
              </Link>
            </li>
            {user?.role === 'member' && (
              <li>
                <Link to="/attendance/qr" className="flex items-center px-6 py-3 text-[14px] text-ink hover:bg-surface-1 hover:text-primary border-l-4 border-transparent hover:border-primary transition-colors">
                  <QrCode className="w-4 h-4 mr-3" /> QR Absensi
                </Link>
              </li>
            )}
            {user?.role === 'admin' && (
              <>
                <li>
                  <Link to="/officer/scanner" className="flex items-center px-6 py-3 text-[14px] text-ink hover:bg-surface-1 hover:text-primary border-l-4 border-transparent hover:border-primary transition-colors">
                    <QrCode className="w-4 h-4 mr-3" /> Pemindai Petugas
                  </Link>
                </li>
                <li>
                  <Link to="/admin" className="flex items-center px-6 py-3 text-[14px] text-ink hover:bg-surface-1 hover:text-primary border-l-4 border-transparent hover:border-primary transition-colors">
                    <Settings className="w-4 h-4 mr-3" /> Admin Dasbor
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        <div className="p-4 border-t border-hairline">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-2 py-2 text-[14px] text-ink hover:text-semantic-error transition-colors"
          >
            <LogOut className="w-4 h-4 mr-3" /> Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-[48px] bg-canvas border-b border-hairline flex items-center px-6 justify-between md:justify-end">
          <div className="md:hidden">
            <span className="font-semibold text-[14px]">ITC System</span>
          </div>
          <div className="flex items-center text-[14px]">
            <span className="text-ink-muted mr-2">Halo,</span>
            <span className="font-medium text-ink">{user?.name}</span>
          </div>
        </header>
        
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-[1056px] mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
