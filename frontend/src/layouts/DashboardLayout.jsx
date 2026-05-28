import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { LayoutDashboard, User, QrCode, LogOut, Menu, Settings, X } from 'lucide-react'; // X ditambahkan di sini
import { useState } from 'react';

export default function DashboardLayout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex bg-surface-1">
      {/* Overlay Background untuk mobile saat sidebar terbuka */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar Utama */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 w-[256px] bg-canvas border-r border-hairline flex flex-col
          transform transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="h-[48px] border-b border-hairline flex items-center justify-between px-6">
          <span className="font-semibold text-[14px]">ITC System</span>
          {/* Tombol Close (Hanya tampil di mobile) */}
          <button onClick={closeSidebar} className="md:hidden text-ink hover:text-semantic-error">
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1">
            <li>
              <Link to="/dashboard" onClick={closeSidebar} className="flex items-center px-6 py-3 text-[14px] text-ink hover:bg-surface-1 hover:text-primary border-l-4 border-transparent hover:border-primary transition-colors">
                <LayoutDashboard className="w-4 h-4 mr-3" /> Dasbor
              </Link>
            </li>
            <li>
              <Link to="/profile" onClick={closeSidebar} className="flex items-center px-6 py-3 text-[14px] text-ink hover:bg-surface-1 hover:text-primary border-l-4 border-transparent hover:border-primary transition-colors">
                <User className="w-4 h-4 mr-3" /> Profil
              </Link>
            </li>
            {user?.role === 'member' && (
              <li>
                <Link to="/attendance/qr" onClick={closeSidebar} className="flex items-center px-6 py-3 text-[14px] text-ink hover:bg-surface-1 hover:text-primary border-l-4 border-transparent hover:border-primary transition-colors">
                  <QrCode className="w-4 h-4 mr-3" /> QR Absensi
                </Link>
              </li>
            )}
            {user?.role === 'admin' && (
              <>
                <li>
                  <Link to="/officer/scanner" onClick={closeSidebar} className="flex items-center px-6 py-3 text-[14px] text-ink hover:bg-surface-1 hover:text-primary border-l-4 border-transparent hover:border-primary transition-colors">
                    <QrCode className="w-4 h-4 mr-3" /> Pemindai Petugas
                  </Link>
                </li>
                <li>
                  <Link to="/admin" onClick={closeSidebar} className="flex items-center px-6 py-3 text-[14px] text-ink hover:bg-surface-1 hover:text-primary border-l-4 border-transparent hover:border-primary transition-colors">
                    <Settings className="w-4 h-4 mr-3" /> Admin Dasbor
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        <div className="p-4 border-t border-hairline bg-canvas">
          <button 
            onClick={() => {
              closeSidebar();
              handleLogout();
            }}
            className="flex items-center w-full px-2 py-2 text-[14px] text-ink hover:text-semantic-error transition-colors"
          >
            <LogOut className="w-4 h-4 mr-3" /> Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-[48px] bg-canvas border-b border-hairline flex items-center px-4 md:px-6 justify-between md:justify-end">
          {/* Bagian kiri header mobile (Hamburger + Judul) */}
          <div className="md:hidden flex items-center gap-3">
            <button onClick={toggleSidebar} className="text-ink hover:text-primary transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-semibold text-[14px]">ITC System</span>
          </div>
          
          {/* Bagian profil user (Kanan) */}
          <div className="flex items-center text-[14px]">
            <span className="text-ink-muted mr-2">Halo,</span>
            <span className="font-medium text-ink">{user?.name}</span>
          </div>
        </header>
        
        {/* Tambahkan sedikit penyesuaian padding untuk layar mobile */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="max-w-[1056px] mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}