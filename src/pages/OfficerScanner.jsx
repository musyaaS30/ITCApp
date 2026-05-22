import { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useAttendanceStore } from '../store/useAttendanceStore';
import Swal from 'sweetalert2';
import { Camera, CheckCircle } from 'lucide-react';

export default function OfficerScanner() {
  const [scanResult, setScanResult] = useState(null);
  const { addLog } = useAttendanceStore();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: { width: 250, height: 250 },
      fps: 10,
    });

    scanner.render(
      (decodedText) => {
        // Dummy verification
        if (decodedText.startsWith('ITC-ATT-')) {
          setScanResult(decodedText);
          scanner.pause();
          
          Swal.fire({
            icon: 'success',
            title: 'Berhasil',
            text: 'Kehadiran tercatat.',
            timer: 2000,
            showConfirmButton: false,
            customClass: { popup: 'rounded-none border border-hairline' }
          }).then(() => {
            addLog({
              id: Date.now(),
              studentName: 'Anggota Scan',
              time: new Date().toLocaleTimeString(),
              status: 'Hadir'
            });
            setScanResult(null);
            scanner.resume();
          });
        }
      },
      (error) => {
        // ignore errors during continuous scanning
      }
    );

    return () => {
      scanner.clear().catch(console.error);
    };
  }, [addLog]);

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h1 className="text-[24px] font-light mb-6">Pemindai Kehadiran</h1>
        <div className="bg-canvas border border-hairline p-4">
          <div id="reader" className="w-full"></div>
          {/* Note: html5-qrcode injects its own UI which we might need to style via CSS overrides in index.css */}
        </div>
      </div>

      <div>
        <h2 className="text-[16px] font-medium mb-4 mt-2">Status Pemindaian</h2>
        
        {scanResult ? (
          <div className="bg-semantic-success/10 border border-semantic-success p-6 flex flex-col items-center justify-center text-center mb-6">
            <CheckCircle className="w-12 h-12 text-semantic-success mb-4" />
            <h3 className="text-[18px] text-ink font-medium">Scan Berhasil</h3>
            <p className="text-[14px] text-ink-muted mt-2">Data kehadiran telah disimpan ke dalam sistem.</p>
          </div>
        ) : (
          <div className="bg-surface-1 border border-hairline p-6 flex flex-col items-center justify-center text-center mb-6 h-[180px]">
            <Camera className="w-8 h-8 text-ink-subtle mb-4" />
            <p className="text-[14px] text-ink-muted">Menunggu pemindaian QR Code...</p>
          </div>
        )}

        <div className="bg-canvas border border-hairline p-4">
          <h3 className="text-[14px] font-medium border-b border-hairline pb-2 mb-4">Aktivitas Terbaru</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-[12px]">
              <span className="font-medium text-ink">Budi Santoso</span>
              <span className="text-ink-muted">16:10:05</span>
            </div>
            <div className="flex justify-between items-center text-[12px]">
              <span className="font-medium text-ink">Andi Wijaya</span>
              <span className="text-ink-muted">16:08:22</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
