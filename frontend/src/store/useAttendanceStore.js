import { create } from 'zustand';

export const useAttendanceStore = create((set) => ({
  sessions: [
    { id: '1', name: 'Pertemuan Rutin 1', date: '2026-05-05', status: 'completed' },
    { id: '2', name: 'Workshop Web Dev', date: '2026-05-08', status: 'completed' },
    { id: '3', name: 'Pertemuan Rutin 2', date: '2026-05-12', status: 'completed' },
    { id: '4', name: 'Sesi IoT & Robotik', date: '2026-05-15', status: 'completed' },
    { id: '5', name: 'Pertemuan Rutin 3', date: '2026-05-19', status: 'completed' },
    { id: '6', name: 'Workshop UI/UX Design', date: '2026-05-22', status: 'completed' },
    { id: '7', name: 'Pertemuan Rutin 4', date: '2026-05-26', status: 'active' },
    { id: '8', name: 'Hackathon Internal', date: '2026-06-02', status: 'active' },
  ],
  attendanceLogs: [
    { id: 101, studentName: 'Andi Pratama', time: '15:55:00', status: 'Hadir' },
    { id: 102, studentName: 'Budi Santoso', time: '16:10:00', status: 'Terlambat' },
    { id: 103, studentName: 'Citra Dewi', time: '15:58:00', status: 'Hadir' },
    { id: 104, studentName: 'Dimas Aditya', time: '16:15:00', status: 'Terlambat' },
    { id: 105, studentName: 'Eka Putri', time: '15:50:00', status: 'Hadir' },
    { id: 106, studentName: 'Fajar Ramadhan', time: '16:00:00', status: 'Hadir' },
    { id: 107, studentName: 'Gita Savitri', time: '15:57:00', status: 'Hadir' },
    { id: 108, studentName: 'Hadi Wijaya', time: '16:20:00', status: 'Terlambat' },
    { id: 109, studentName: 'Indah Permata', time: '15:52:00', status: 'Hadir' },
    { id: 110, studentName: 'Joko Susilo', time: '-', status: 'Tidak Hadir' },
    { id: 111, studentName: 'Kartika Sari', time: '15:59:00', status: 'Hadir' },
    { id: 112, studentName: 'Lukman Hakim', time: '16:05:00', status: 'Terlambat' },
    { id: 113, studentName: 'Maya Anggraeni', time: '15:48:00', status: 'Hadir' },
    { id: 114, studentName: 'Naufal Rizki', time: '-', status: 'Tidak Hadir' },
    { id: 115, studentName: 'Olivia Putri', time: '16:02:00', status: 'Hadir' },
    { id: 116, studentName: 'Putra Mahardika', time: '15:54:00', status: 'Hadir' },
    { id: 117, studentName: 'Qori Amalia', time: '16:08:00', status: 'Terlambat' },
    { id: 118, studentName: 'Rizky Fadilah', time: '15:56:00', status: 'Hadir' },
    { id: 119, studentName: 'Sinta Maharani', time: '-', status: 'Tidak Hadir' },
    { id: 120, studentName: 'Tegar Wibowo', time: '16:01:00', status: 'Hadir' },
  ],

  addLog: (log) => set((state) => ({
    attendanceLogs: [log, ...state.attendanceLogs]
  })),

  updateLogStatus: (logId, newStatus) => set((state) => ({
    attendanceLogs: state.attendanceLogs.map((log) =>
      log.id === logId ? { ...log, status: newStatus } : log
    )
  })),

  addSession: (session) => set((state) => ({
    sessions: [session, ...state.sessions]
  })),
}));
