import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Users, Calendar, CheckCircle, Clock, Check, AlertCircle, QrCode } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import api from '../utils/api';

export default function Dashboard() {
  const { user } = useAuthStore();
  
  // Member States
  const [hasAttendedToday, setHasAttendedToday] = useState(false);
  const [todayDetails, setTodayDetails] = useState(null);
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  
  // Admin States
  const [adminStats, setAdminStats] = useState({
    totalMembers: 0,
    todayAbsents: 0,
    recentLogs: [],
  });

  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      if (user?.role === 'admin') {
        const response = await api.get('/attendance/admin/stats');
        setAdminStats(response.data);
      } else {
        // Fetch today's status
        const todayRes = await api.get('/attendance/today');
        setHasAttendedToday(todayRes.data.attended);
        setTodayDetails(todayRes.data.details);

        // Fetch history
        const historyRes = await api.get('/attendance/history');
        setAttendanceHistory(historyRes.data);
      }
    } catch (err) {
      console.error('Gagal mengambil data dasbor:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent animate-spin rounded-full mb-4"></div>
        <p className="text-[14px] text-ink-muted">Memuat data dasbor...</p>
      </div>
    );
  }

  // Define static schedule for display
  const activeSessions = [
    { id: '1', name: 'Pertemuan Rutin ITC', date: 'Hari ini', status: 'active' },
    { id: '2', name: 'Workshop IoT & Robotik', date: 'Jumat, 5 Juni 2026', status: 'upcoming' },
  ];

  // Dynamic Chart Data mapping based on actual or mock values
  const chartData = [
    { name: 'Pertemuan 1', hadir: 38 },
    { name: 'Pertemuan 2', hadir: 42 },
    { name: 'Pertemuan 3', hadir: 40 },
    { name: 'Hari ini', hadir: user?.role === 'admin' ? adminStats.todayAbsents : (hasAttendedToday ? 1 : 0) },
  ];

  return (
    <div className="space-y-6 font-sans text-ink">
      <h1 className="text-[28px] font-light mb-6">Dasbor</h1>

      {/* Admin View */}
      {user?.role === 'admin' && (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-canvas border border-hairline p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[14px] text-ink-muted">Presensi Hari Ini</h3>
                <CheckCircle className="w-5 h-5 text-semantic-success" />
              </div>
              <p className="text-[32px] font-light">{adminStats.todayAbsents} Anggota</p>
            </div>
            
            <div className="bg-canvas border border-hairline p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[14px] text-ink-muted">Total Anggota Terdaftar</h3>
                <Users className="w-5 h-5 text-primary" />
              </div>
              <p className="text-[32px] font-light">{adminStats.totalMembers} Siswa</p>
            </div>

            <div className="bg-canvas border border-hairline p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[14px] text-ink-muted">Tingkat Kehadiran</h3>
                <Clock className="w-5 h-5 text-ink-muted" />
              </div>
              <p className="text-[32px] font-light">
                {adminStats.totalMembers > 0 
                  ? `${Math.round((adminStats.todayAbsents / adminStats.totalMembers) * 100)}%`
                  : '0%'
                }
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart Section */}
            <div className="lg:col-span-2 bg-canvas border border-hairline p-6">
              <h3 className="text-[16px] font-medium mb-6">Grafik Kehadiran Mingguan</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#525252' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#525252' }} />
                    <Tooltip 
                      cursor={{ fill: '#f4f4f4' }}
                      contentStyle={{ borderRadius: '0px', border: '1px solid #e0e0e0', boxShadow: 'none' }}
                    />
                    <Bar dataKey="hadir" name="Kehadiran" fill="#0f62fe" radius={[0, 0, 0, 0]} barSize={32} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Scan Logs Feed */}
            <div className="bg-canvas border border-hairline p-6 flex flex-col h-[382px]">
              <h3 className="text-[16px] font-medium mb-4">Aktivitas Absensi Terbaru</h3>
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
                {adminStats.recentLogs.length > 0 ? (
                  adminStats.recentLogs.map((log) => (
                    <div key={log.id} className="flex justify-between items-center text-[13px] border-b border-hairline pb-2">
                      <div>
                        <span className="font-medium text-ink block">{log.studentName}</span>
                        <span className="text-[11px] text-ink-muted block">Presensi Sukses</span>
                      </div>
                      <span className="text-ink-muted font-mono">{log.time}</span>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <AlertCircle className="w-8 h-8 text-ink-subtle mb-2" />
                    <p className="text-[12px] text-ink-muted">Belum ada absensi masuk hari ini.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Member View */}
      {user?.role === 'member' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Attendance Status & History */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* QR-Based Attendance Status Card */}
            <div className={`p-6 border ${hasAttendedToday ? 'bg-[#def8e9] border-[#24a148]' : 'bg-canvas border-hairline'}`}>
              <div className="flex items-start gap-4">
                {hasAttendedToday ? (
                  <div className="p-3 bg-[#24a148] text-white rounded-none shrink-0">
                    <Check className="w-6 h-6" />
                  </div>
                ) : (
                  <div className="p-3 bg-[#f4f4f4] border border-hairline text-ink shrink-0">
                    <QrCode className="w-6 h-6" />
                  </div>
                )}

                <div className="flex-1">
                  <h3 className="text-[18px] font-semibold mb-1">
                    {hasAttendedToday ? 'Presensi Anda Terdaftar' : 'Presensi via QR Code'}
                  </h3>
                  <p className="text-[14px] text-ink-muted leading-relaxed">
                    {hasAttendedToday 
                      ? `Anda telah tercatat hadir hari ini pada pukul ${formatTime(todayDetails?.attendedAt)}. Terima kasih atas kehadiran Anda!`
                      : 'Anda belum tercatat hadir hari ini. Silakan buka tab "QR Absensi" di sidebar dan tunjukkan QR Code Anda kepada petugas untuk melakukan presensi.'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Attendance History */}
            <div className="bg-canvas border border-hairline p-6">
              <h3 className="text-[16px] font-semibold mb-4">Riwayat Kehadiran Anda</h3>
              <div className="overflow-x-auto">
                {attendanceHistory.length > 0 ? (
                  <table className="w-full text-left border-collapse text-[14px]">
                    <thead>
                      <tr className="border-b border-hairline text-ink-muted">
                        <th className="py-2.5 font-medium">Tanggal</th>
                        <th className="py-2.5 font-medium">Waktu</th>
                        <th className="py-2.5 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceHistory.map((log) => (
                        <tr key={log.id} className="border-b border-hairline hover:bg-surface-1">
                          <td className="py-3">{formatDate(log.attendedAt)}</td>
                          <td className="py-3 font-mono">{formatTime(log.attendedAt)}</td>
                          <td className="py-3">
                            <span className="inline-block bg-semantic-success/15 text-semantic-success text-[12px] px-2 py-0.5 font-medium">
                              Hadir
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center py-12">
                    <AlertCircle className="w-8 h-8 text-ink-subtle mx-auto mb-2" />
                    <p className="text-[14px] text-ink-muted">Anda belum memiliki riwayat absensi.</p>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Schedule & Quick Info */}
          <div className="space-y-6">
            
            <div className="bg-canvas border border-hairline p-6">
              <h3 className="text-[16px] font-semibold mb-6">Jadwal IT Club</h3>
              <div className="space-y-4">
                {activeSessions.map((session) => (
                  <div key={session.id} className="border-l-2 border-primary pl-4 py-1">
                    <h4 className="text-[14px] font-medium text-ink">{session.name}</h4>
                    <p className="text-[12px] text-ink-muted mt-1">{session.date}</p>
                    {session.status === 'active' && (
                      <span className="inline-block mt-2 bg-primary/10 text-primary text-[11px] px-2 py-0.5 font-medium">
                        Sedang Berlangsung
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-canvas border border-hairline p-6 text-[13px] text-ink-muted leading-relaxed">
              <h4 className="font-semibold text-ink mb-2">Panduan Absensi</h4>
              <p className="mb-2">1. Buka menu <strong>"QR Absensi"</strong> di sidebar navigasi.</p>
              <p className="mb-2">2. QR Code unik Anda akan tampil secara otomatis di layar.</p>
              <p>3. Tunjukkan QR Code tersebut kepada petugas piket untuk dipindai dan mencatat kehadiran Anda.</p>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
