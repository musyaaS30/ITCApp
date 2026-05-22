import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import Swal from 'sweetalert2';

export default function VerifyOTP() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // Allow only last char if they type fast
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length < 6) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);

    Swal.fire({
      icon: 'success',
      title: 'Email Terverifikasi',
      text: 'Silakan lengkapi profil Anda.',
      confirmButtonColor: '#0f62fe',
      customClass: { popup: 'rounded-none border border-hairline', confirmButton: 'rounded-none' }
    }).then(() => {
      navigate('/complete-profile');
    });
  };

  return (
    <>
      <h2 className="text-[24px] mb-2 font-light">Verifikasi Email</h2>
      <p className="text-[14px] text-ink-muted mb-8 leading-[1.5]">
        Kami telah mengirimkan 6 digit kode OTP ke email Anda. Masukkan kode tersebut di bawah ini.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex justify-between space-x-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-[20px] bg-surface-1 border-b border-hairline focus:outline-none focus:border-b-2 focus:border-b-primary"
            />
          ))}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading || otp.join('').length < 6}>
          {isLoading ? 'Memverifikasi...' : 'Verifikasi'}
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <button className="text-[14px] text-primary hover:underline bg-transparent border-none cursor-pointer">
          Kirim Ulang Kode
        </button>
      </div>
    </>
  );
}
