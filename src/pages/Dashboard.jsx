import { useAuthStore } from '../store/useAuthStore';
import { useAttendanceStore } from '../store/useAttendanceStore';
import { Users, Calendar, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const dummyChartData = [
  { name: 'Pertemuan 1', hadir: 40, izin: 5 },
  { name: 'Pertemuan 2', hadir: 42, izin: 3 },
  { name: 'Pertemuan 3', hadir: 38, izin: 8 },
  { name: 'Workshop', hadir: 45, izin: 2 },
];

export default function Dashboard() {
  const { user } = useAuthStore();
  const { sessions } = useAttendanceStore();

  return (
    <div className="space-y-6">
      <h1 className="text-[24px] font-light mb-6">Dasbor</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-canvas border border-hairline p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] text-ink-muted">Total Kehadiran</h3>
            <CheckCircle className="w-5 h-5 text-semantic-success" />
          </div>
          <p className="text-[32px] font-light">85%</p>
        </div>
        
        <div className="bg-canvas border border-hairline p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] text-ink-muted">Sesi Aktif</h3>
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <p className="text-[32px] font-light">{sessions.filter(s => s.status === 'active').length}</p>
        </div>

        <div className="bg-canvas border border-hairline p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] text-ink-muted">Total Anggota</h3>
            <Users className="w-5 h-5 text-ink-muted" />
          </div>
          <p className="text-[32px] font-light">124</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-canvas border border-hairline p-6">
          <h3 className="text-[16px] font-medium mb-6">Statistik Kehadiran (Bulan Ini)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dummyChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#525252' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#525252' }} />
                <Tooltip 
                  cursor={{ fill: '#f4f4f4' }}
                  contentStyle={{ borderRadius: '0px', border: '1px solid #e0e0e0', boxShadow: 'none' }}
                />
                <Bar dataKey="hadir" name="Hadir" fill="#0f62fe" radius={[0, 0, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Schedule Section */}
        <div className="bg-canvas border border-hairline p-6 flex flex-col">
          <h3 className="text-[16px] font-medium mb-6">Jadwal Terdekat</h3>
          <div className="flex-1 space-y-4">
            {sessions.map((session) => (
              <div key={session.id} className="border-l-2 border-primary pl-4 py-1">
                <h4 className="text-[14px] font-medium text-ink">{session.name}</h4>
                <p className="text-[12px] text-ink-muted mt-1">{session.date}</p>
                {session.status === 'active' && (
                  <span className="inline-block mt-2 bg-primary/10 text-primary text-[12px] px-2 py-0.5">Sedang Berlangsung</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
