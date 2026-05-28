import { useState, useMemo } from 'react';
import { useAttendanceStore } from '../store/useAttendanceStore';
import { Button } from '../components/Button';
import { Download, Search, Plus, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import Swal from 'sweetalert2';

const ITEMS_PER_PAGE = 10;

const SWAL_CLASSES = {
  popup: 'rounded-none border border-hairline shadow-none',
  confirmButton: 'rounded-none px-[16px] py-[12px] text-[14px] font-normal tracking-[0.16px]',
  cancelButton: 'rounded-none px-[16px] py-[12px] text-[14px] font-normal tracking-[0.16px]',
};

export default function AdminDashboard() {
  const { attendanceLogs, sessions, updateLogStatus, addSession } = useAttendanceStore();
  const [activeTab, setActiveTab] = useState('logs');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Semua');

  // Reset page when switching tabs, search, or filter
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSearchQuery('');
    setActiveFilter('Semua');
    setShowFilter(false);
  };

  // --- Filtered data ---
  const filteredData = useMemo(() => {
    const data = activeTab === 'logs' ? attendanceLogs : sessions;
    let result = data;

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((item) => {
        if (activeTab === 'logs') {
          return item.studentName.toLowerCase().includes(q) || String(item.id).includes(q);
        } else {
          return item.name.toLowerCase().includes(q) || `SES-${item.id}`.toLowerCase().includes(q);
        }
      });
    }

    // Status filter
    if (activeFilter !== 'Semua') {
      result = result.filter((item) => {
        if (activeTab === 'logs') {
          return item.status === activeFilter;
        } else {
          return activeFilter === 'Aktif' ? item.status === 'active' : item.status === 'completed';
        }
      });
    }

    return result;
  }, [activeTab, attendanceLogs, sessions, searchQuery, activeFilter]);

  // --- Pagination ---
  const totalItems = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, safeCurrentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  // --- Filter options ---
  const filterOptions = activeTab === 'logs'
    ? ['Semua', 'Hadir', 'Terlambat', 'Tidak Hadir']
    : ['Semua', 'Aktif', 'Selesai'];

  // --- Export CSV ---
  const handleExport = () => {
    let csvContent = '';
    if (activeTab === 'logs') {
      csvContent = 'ID,Nama Anggota,Waktu,Status\n';
      filteredData.forEach((log) => {
        csvContent += `${log.id},"${log.studentName}",${log.time},${log.status}\n`;
      });
    } else {
      csvContent = 'ID Sesi,Nama Pertemuan,Tanggal,Status\n';
      filteredData.forEach((s) => {
        const statusLabel = s.status === 'active' ? 'Aktif' : 'Selesai';
        csvContent += `SES-${s.id},"${s.name}",${s.date},${statusLabel}\n`;
      });
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activeTab === 'logs' ? 'log_kehadiran.csv' : 'sesi_pertemuan.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    Swal.fire({
      icon: 'success',
      title: 'Export Berhasil',
      text: `Data ${activeTab === 'logs' ? 'log kehadiran' : 'sesi pertemuan'} berhasil diunduh.`,
      confirmButtonColor: '#0f62fe',
      customClass: SWAL_CLASSES,
    });
  };

  // --- New Session Modal ---
  const handleNewSession = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Buat Sesi Baru',
      html: `
        <div style="text-align:left;">
          <label style="display:block;font-size:12px;color:#525252;margin-bottom:4px;">Nama Pertemuan</label>
          <input id="swal-session-name" type="text" placeholder="Contoh: Pertemuan Rutin 5" 
            style="width:100%;padding:11px 16px;border:none;border-bottom:1px solid #e0e0e0;font-size:14px;background:#f4f4f4;outline:none;margin-bottom:16px;" />
          <label style="display:block;font-size:12px;color:#525252;margin-bottom:4px;">Tanggal</label>
          <input id="swal-session-date" type="date" 
            style="width:100%;padding:11px 16px;border:none;border-bottom:1px solid #e0e0e0;font-size:14px;background:#f4f4f4;outline:none;margin-bottom:16px;" />
          <label style="display:block;font-size:12px;color:#525252;margin-bottom:4px;">Status</label>
          <select id="swal-session-status"
            style="width:100%;padding:11px 16px;border:none;border-bottom:1px solid #e0e0e0;font-size:14px;background:#f4f4f4;outline:none;">
            <option value="active">Aktif</option>
            <option value="completed">Selesai</option>
          </select>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Simpan',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#0f62fe',
      customClass: SWAL_CLASSES,
      preConfirm: () => {
        const name = document.getElementById('swal-session-name').value.trim();
        const date = document.getElementById('swal-session-date').value;
        const status = document.getElementById('swal-session-status').value;
        if (!name || !date) {
          Swal.showValidationMessage('Nama dan tanggal wajib diisi');
          return false;
        }
        return { name, date, status };
      },
    });

    if (formValues) {
      const newId = String(Date.now());
      addSession({ id: newId, ...formValues });
      Swal.fire({
        icon: 'success',
        title: 'Sesi Dibuat',
        text: `Sesi "${formValues.name}" berhasil ditambahkan.`,
        confirmButtonColor: '#0f62fe',
        customClass: SWAL_CLASSES,
      });
    }
  };

  // --- Edit Log Status Modal ---
  const handleEditLog = async (log) => {
    const { value: newStatus } = await Swal.fire({
      title: 'Edit Status Kehadiran',
      html: `
        <div style="text-align:left;">
          <p style="font-size:14px;color:#161616;margin-bottom:16px;">Anggota: <strong>${log.studentName}</strong></p>
          <label style="display:block;font-size:12px;color:#525252;margin-bottom:4px;">Status</label>
          <select id="swal-log-status"
            style="width:100%;padding:11px 16px;border:none;border-bottom:1px solid #e0e0e0;font-size:14px;background:#f4f4f4;outline:none;">
            <option value="Hadir" ${log.status === 'Hadir' ? 'selected' : ''}>Hadir</option>
            <option value="Terlambat" ${log.status === 'Terlambat' ? 'selected' : ''}>Terlambat</option>
            <option value="Tidak Hadir" ${log.status === 'Tidak Hadir' ? 'selected' : ''}>Tidak Hadir</option>
          </select>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Simpan',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#0f62fe',
      customClass: SWAL_CLASSES,
      preConfirm: () => {
        return document.getElementById('swal-log-status').value;
      },
    });

    if (newStatus) {
      updateLogStatus(log.id, newStatus);
      Swal.fire({
        icon: 'success',
        title: 'Status Diperbarui',
        text: `Status ${log.studentName} diubah menjadi "${newStatus}".`,
        confirmButtonColor: '#0f62fe',
        customClass: SWAL_CLASSES,
      });
    }
  };

  // --- Status badge style helper ---
  const getLogStatusClass = (status) => {
    switch (status) {
      case 'Hadir': return 'bg-semantic-success/10 text-semantic-success';
      case 'Terlambat': return 'bg-semantic-warning/10 text-semantic-warning';
      case 'Tidak Hadir': return 'bg-semantic-error/10 text-semantic-error';
      default: return 'bg-surface-2 text-ink-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-[24px] font-light">Dasbor Administrator</h1>
        <div className="flex space-x-2">
          <Button variant="secondary" className="flex items-center" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" /> Export Data
          </Button>
          <Button className="flex items-center" onClick={handleNewSession}>
            <Plus className="w-4 h-4 mr-2" /> Sesi Baru
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-hairline">
        <button 
          onClick={() => handleTabChange('logs')}
          className={`px-6 py-3 text-[14px] font-medium tracking-carbon focus:outline-none ${activeTab === 'logs' ? 'text-ink border-b-2 border-primary' : 'text-ink-muted hover:text-ink'}`}
        >
          Log Kehadiran
        </button>
        <button 
          onClick={() => handleTabChange('sessions')}
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
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              placeholder="Cari nama atau ID..." 
              className="w-full bg-canvas text-[14px] py-2 pl-10 pr-4 border border-hairline focus:outline-none focus:border-primary"
            />
          </div>
          <div className="relative">
            <Button
              variant="ghost"
              className={`flex items-center bg-canvas border border-hairline text-ink ${activeFilter !== 'Semua' ? '!border-primary !text-primary' : ''}`}
              onClick={() => setShowFilter(!showFilter)}
            >
              <Filter className="w-4 h-4 mr-2" /> Filter
              {activeFilter !== 'Semua' && (
                <span className="ml-2 bg-primary text-white text-[11px] px-1.5 py-0.5">{activeFilter}</span>
              )}
            </Button>
            {showFilter && (
              <div className="absolute right-0 top-full mt-1 bg-canvas border border-hairline shadow-md z-20 min-w-[160px]">
                {filterOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => { setActiveFilter(option); setShowFilter(false); setCurrentPage(1); }}
                    className={`block w-full text-left px-4 py-2.5 text-[13px] hover:bg-surface-1 transition-colors ${
                      activeFilter === option ? 'text-primary font-medium bg-primary/5' : 'text-ink'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
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
                {paginatedData.map((log) => (
                  <tr key={log.id} className="border-b border-hairline hover:bg-surface-1">
                    <td className="py-3 px-4 text-[14px] text-ink-muted">{log.id}</td>
                    <td className="py-3 px-4 text-[14px] text-ink">{log.studentName}</td>
                    <td className="py-3 px-4 text-[14px] text-ink-muted font-mono">{log.time}</td>
                    <td className="py-3 px-4 text-[14px]">
                      <span className={`px-2 py-1 text-[12px] ${getLogStatusClass(log.status)}`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button onClick={() => handleEditLog(log)} className="text-primary hover:underline text-[12px]">Edit</button>
                    </td>
                  </tr>
                ))}
                {paginatedData.length === 0 && (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-ink-muted text-[14px]">
                      {searchQuery || activeFilter !== 'Semua' ? 'Tidak ada data yang cocok dengan pencarian/filter.' : 'Belum ada data kehadiran.'}
                    </td>
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
                {paginatedData.map((session) => (
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
                {paginatedData.length === 0 && (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-ink-muted text-[14px]">
                      {searchQuery || activeFilter !== 'Semua' ? 'Tidak ada sesi yang cocok dengan pencarian/filter.' : 'Belum ada sesi pertemuan.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-hairline flex flex-col sm:flex-row justify-between items-center gap-3">
          <span className="text-[12px] text-ink-muted">
            {totalItems > 0 
              ? `Menampilkan ${startIndex + 1}-${endIndex} dari ${totalItems} data` 
              : 'Tidak ada data'}
          </span>
          {totalPages > 1 && (
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="sm"
                disabled={safeCurrentPage === 1}
                onClick={() => setCurrentPage(safeCurrentPage - 1)}
              >
                <ChevronLeft className="w-3 h-3 mr-1 inline" /> Sebelumnya
              </Button>
              {getPageNumbers().map((page) => (
                <Button
                  key={page}
                  variant={page === safeCurrentPage ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={page === safeCurrentPage ? '!bg-primary !text-white' : ''}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="ghost"
                size="sm"
                disabled={safeCurrentPage === totalPages}
                onClick={() => setCurrentPage(safeCurrentPage + 1)}
              >
                Selanjutnya <ChevronRight className="w-3 h-3 ml-1 inline" />
              </Button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
