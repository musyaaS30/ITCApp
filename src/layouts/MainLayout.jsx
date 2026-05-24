import { Outlet, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col md:mx-40">
      {/* Top Nav */}
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-inverse-canvas text-inverse-ink-muted py-[64px] px-[5%]">
        <div className="max-w-[1056px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-inverse-ink font-semibold mb-4 text-[14px]">ITC</h4>
            <p className="text-[12px]">Sistem manajemen presensi dan keanggotaan Information Technology Club.</p>
          </div>
          <div>
            <h4 className="text-inverse-ink font-semibold mb-4 text-[14px]">Tautan</h4>
            <ul className="space-y-2 text-[12px]">
              <li><Link to="/">Beranda</Link></li>
              <li><Link to="/login">Masuk</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
