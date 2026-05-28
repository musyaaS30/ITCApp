import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import QRCode from 'react-qr-code';
import { RefreshCw } from 'lucide-react';
import { Button } from '../components/Button';

export default function QRAttendance() {
  const { user } = useAuthStore();
  const [qrValue, setQrValue] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);

  const generateQR = () => {
    const timestamp = new Date().getTime();
    setQrValue(`ITC-ATT-${user?.id}-${timestamp}`);
    setTimeLeft(30);
  };

  useEffect(() => {
    generateQR();
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          generateQR();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)]">
      <div className="bg-canvas border border-hairline p-8 max-w-sm w-full text-center">
        <h2 className="text-[20px] font-medium mb-2">QR Absensi Anda</h2>
        <p className="text-[14px] text-ink-muted mb-8 leading-[1.5]">
          Tunjukkan QR Code ini kepada petugas atau arahkan ke alat pemindai.
        </p>

        <div className="bg-white p-4 inline-block border border-hairline mb-6">
          {qrValue ? (
            <QRCode value={qrValue} size={200} level="H" />
          ) : (
            <div className="w-[200px] h-[200px] bg-surface-1 animate-pulse"></div>
          )}
        </div>

        <div className="flex items-center justify-center text-[14px] text-ink-muted mb-6">
          <RefreshCw className={`w-4 h-4 mr-2 ${timeLeft < 5 ? 'text-semantic-error animate-spin' : ''}`} />
          <span>Diperbarui dalam <strong>{timeLeft}</strong> detik</span>
        </div>

        <Button variant="secondary" className="w-full" onClick={generateQR}>
          Perbarui Sekarang
        </Button>
      </div>
    </div>
  );
}
