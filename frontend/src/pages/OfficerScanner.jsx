import { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';
import { useAttendanceStore } from '../store/useAttendanceStore';
import Swal from 'sweetalert2';
import { Camera, CheckCircle } from 'lucide-react';
import api from '../utils/api';

export default function OfficerScanner() {
  const webcamRef = useRef(null);
  const [scanResult, setScanResult] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const { addLog } = useAttendanceStore();

  // Konfigurasi Kamera Belakang
  const videoConstraints = {
    width: { ideal: 720 },
    height: { ideal: 720 }, // Meminta rasio mendekati kotak jika hardware mendukung
    facingMode: "environment"
  };

  const capture = useCallback(() => {
    if (isPaused) return;

    const imageSrc = webcamRef.current?.getCanvas();
    if (imageSrc) {
      const canvas = imageSrc;
      const ctx = canvas.getContext('2d');
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      
      // Membaca QR Code dari data gambar
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code && code.data.startsWith('ITC-ATT-')) {
        handleSuccess(code.data);
      }
    }
  }, [isPaused]);

  // Loop untuk scanning frame demi frame
  useEffect(() => {
    const interval = setInterval(capture, 300); // Scan setiap 300ms
    return () => clearInterval(interval);
  }, [capture]);

  const handleSuccess = async (decodedText) => {
    setIsPaused(true);
    setScanResult(decodedText);
    
    try {
      const response = await api.post('/attendance/scan', {
        qrCodeValue: decodedText
      });
      
      const { studentName, message } = response.data;

      Swal.fire({
        icon: 'success',
        title: 'Verifikasi Absensi Sukses',
        text: `${studentName} berhasil diabsen oleh petugas!`,
        timer: 3000,
        showConfirmButton: true,
        confirmButtonColor: '#0f62fe',
        customClass: { 
          popup: 'rounded-none border border-hairline shadow-none',
          confirmButton: 'rounded-none px-[16px] py-[12px] text-[14px] font-normal tracking-[0.16px]'
        }
      }).then(() => {
        addLog({
          id: Date.now(),
          studentName: studentName,
          time: new Date().toLocaleTimeString('id-ID'),
          status: 'Hadir'
        });
        setScanResult(null);
        setIsPaused(false);
      });
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Kode QR tidak valid atau gagal diverifikasi.';
      Swal.fire({
        icon: 'error',
        title: 'Verifikasi Absensi Gagal',
        text: typeof errMsg === 'object' ? errMsg[0] : errMsg,
        confirmButtonColor: '#0f62fe',
        customClass: { 
          popup: 'rounded-none border border-hairline shadow-none',
          confirmButton: 'rounded-none px-[16px] py-[12px] text-[14px] font-normal tracking-[0.16px]'
        }
      }).then(() => {
        setScanResult(null);
        setIsPaused(false);
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h1 className="text-[24px] font-light mb-6">Pemindai Kehadiran</h1>
        <div className="bg-canvas border border-hairline p-4">
          {/* Container Kamera - Dibuat kotak dengan aspect-square */}
          <div className="relative w-full max-w-sm mx-auto aspect-square overflow-hidden rounded-sm bg-black">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              // object-cover memastikan video tidak gepeng saat di-crop menjadi kotak
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Overlay Garis Scan */}
            {!isPaused && (
              <div className="absolute inset-8 md:inset-12 border-2 border-dashed border-semantic-success/50 pointer-events-none animate-pulse"></div>
            )}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-[16px] font-medium mb-4 mt-2">Status Pemindaian</h2>
        
        {scanResult ? (
          <div className="bg-semantic-success/10 border border-semantic-success p-6 flex flex-col items-center justify-center text-center mb-6">
            <CheckCircle className="w-12 h-12 text-semantic-success mb-4" />
            <h3 className="text-[18px] text-ink font-medium">Scan Berhasil</h3>
            <p className="text-[14px] text-ink-muted mt-2">{scanResult}</p>
          </div>
        ) : (
          <div className="bg-surface-1 border border-hairline p-6 flex flex-col items-center justify-center text-center mb-6 h-[180px]">
            <Camera className="w-8 h-8 text-ink-subtle mb-4" />
            <p className="text-[14px] text-ink-muted">Mengarahkan kamera ke QR Code...</p>
          </div>
        )}

        <div className="bg-canvas border border-hairline p-4">
          <h3 className="text-[14px] font-medium border-b border-hairline pb-2 mb-4">Aktivitas Terbaru</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-[12px]">
              <span className="font-medium text-ink">Budi Santoso</span>
              <span className="text-ink-muted">16:10:05</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}