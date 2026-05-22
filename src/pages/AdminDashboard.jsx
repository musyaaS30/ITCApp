import { useState } from 'react';
import { useAttendanceStore } from '../store/useAttendanceStore';
import { Button } from '../components/Button';
import { TextInput } from '../components/TextInput';
import { Download, Search, Plus, Filter } from 'lucide-react';

export default function AdminDashboard() {
  const { attendanceLogs, sessions } = useAttendanceStore();
  const [activeTab, setActiveTab] = useState('logs');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-[24px] font-light">Dasbor Administrator</h1>
        <div className="flex space-x-2">
          <Button variant="secondary" className="flex items-center">
            <Download className="w-4 h-4 mr-2" /> Export Data
          </Button>
          <Button className="flex items-center">
            <Plus className="w-4 h-4 mr-2" /> Sesi Baru
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-hairline">
        <button 
          onClick={() => setActiveTab('logs')}
          className={`px-6 py-3 text-[14px] font-medium tracking-carbon focus:outline-none ${activeTab === 'logs' ? 'text-ink border-b-2 border-primary' : 'text-ink-muted hover:text-ink'}`}
        >
          Log Kehadiran
        </button>
        <button 
          onClick={() => setActiveTab('sessions')}
          className={`px-6 py-3 text-[14px] font-medium tracking-carbon focus:outline-none ${activeTab === 'sessions' ? 'text-ink border-b-2 border-primary' : 'text-ink-muted hover:text-ink'}`}
        >
          Sesi Pertemuan
        </button>
      </div>

      {/* Content */}
      <div className="bg-canvas border border-hairline mt-4">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-hairline flex flex-col md:flex-row gap-4 justify-between bg-surface-1">
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-3 text-ink-subtle" />
            <input 
              type="text" 
              placeholder="Cari nama atau ID..." 
              className="w-full bg-canvas text-[14px] py-2 pl-10 pr-4 border border-hairline focus:outline-none focus:border-primary"
            />
          </div>
          <Button variant="ghost" className="flex items-center bg-canvas border border-hairline text-ink">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          {activeTab === 'logs' && (
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-hairline bg-surface-1">
                  <th className="py-3 px-4 text-[12px] font-semibold text-ink">ID</th>
                  <th className="py-3 px-4 text-[12px] font-semibold text-ink">Nama Anggota</th>
                  <th className="py-3 px-4 text-[12px] font-semibold text-ink">Waktu</th>
                  <th className="py-3 px-4 text-[12px] font-semibold text-ink">Status</th>
                  <th className="py-3 px-4 text-[12px] font-semibold text-ink text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {attendanceLogs.map((log) => (
                  <tr key={log.id} className="border-b border-hairline hover:bg-surface-1">
                    <td className="py-3 px-4 text-[14px] text-ink-muted">{log.id}</td>
                    <td className="py-3 px-4 text-[14px] text-ink">{log.studentName}</td>
                    <td className="py-3 px-4 text-[14px] text-ink-muted">{log.time}</td>
                    <td className="py-3 px-4 text-[14px]">
                      <span className={`px-2 py-1 text-[12px] ${log.status === 'Hadir' ? 'bg-semantic-success/10 text-semantic-success' : 'bg-semantic-warning/10 text-semantic-warning'}`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="text-primary hover:underline text-[12px]">Edit</button>
                    </td>
                  </tr>
                ))}
                {attendanceLogs.length === 0 && (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-ink-muted text-[14px]">Belum ada data kehadiran.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}

          {activeTab === 'sessions' && (
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-hairline bg-surface-1">
                  <th className="py-3 px-4 text-[12px] font-semibold text-ink">ID Sesi</th>
                  <th className="py-3 px-4 text-[12px] font-semibold text-ink">Nama Pertemuan</th>
                  <th className="py-3 px-4 text-[12px] font-semibold text-ink">Tanggal</th>
                  <th className="py-3 px-4 text-[12px] font-semibold text-ink">Status</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((session) => (
                  <tr key={session.id} className="border-b border-hairline hover:bg-surface-1">
                    <td className="py-3 px-4 text-[14px] text-ink-muted">SES-{session.id}</td>
                    <td className="py-3 px-4 text-[14px] text-ink">{session.name}</td>
                    <td className="py-3 px-4 text-[14px] text-ink-muted">{session.date}</td>
                    <td className="py-3 px-4 text-[14px]">
                      <span className={`px-2 py-1 text-[12px] ${session.status === 'active' ? 'bg-primary/10 text-primary' : 'bg-surface-2 text-ink-muted'}`}>
                        {session.status === 'active' ? 'Aktif' : 'Selesai'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
        {/* Pagination Dummy */}
        <div className="p-4 border-t border-hairline flex justify-between items-center">
          <span className="text-[12px] text-ink-muted">Menampilkan 1-10 dari 50 data</span>
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm" disabled>Sebelumnnya</Button>
            <Button variant="secondary" size="sm">1</Button>
            <Button variant="ghost" size="sm">2</Button>
            <Button variant="ghost" size="sm">3</Button>
            <Button variant="ghost" size="sm">Selanjutnya</Button>
          </div>
        </div>

      </div>
    </div>
  );
}
