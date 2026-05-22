import { create } from 'zustand';

export const useAttendanceStore = create((set) => ({
  sessions: [
    { id: '1', name: 'Pertemuan Rutin 1', date: '2026-05-10', status: 'active' },
    { id: '2', name: 'Workshop Web Dev', date: '2026-05-05', status: 'completed' },
  ],
  attendanceLogs: [
    { id: 101, studentName: 'Siswa ITC', time: '16:05:00', status: 'Hadir' },
    { id: 102, studentName: 'Budi Santoso', time: '16:10:00', status: 'Terlambat' },
  ],

  addLog: (log) => set((state) => ({
    attendanceLogs: [log, ...state.attendanceLogs]
  })),
}));
