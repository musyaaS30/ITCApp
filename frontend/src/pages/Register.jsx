import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { TextInput } from '../components/TextInput';
import { Button } from '../components/Button';
import Swal from 'sweetalert2';
import api from '../utils/api';

export default function Register() {
  const location = useLocation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      if (location.state.name) setName(location.state.name);
      if (location.state.email) setEmail(location.state.email);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) return;

    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Konfirmasi Sandi Gagal',
        text: 'Kata sandi dan konfirmasi kata sandi tidak cocok.',
        confirmButtonColor: '#0f62fe',
        customClass: {
          popup: 'rounded-none border border-hairline shadow-none',
          confirmButton: 'rounded-none px-[16px] py-[12px] text-[14px] font-normal tracking-[0.16px]'
        }
      });
      return;
    }

    if (password.length < 8) {
      Swal.fire({
        icon: 'error',
        title: 'Sandi Terlalu Pendek',
        text: 'Kata sandi minimal harus 8 karakter.',
        confirmButtonColor: '#0f62fe',
        customClass: {
          popup: 'rounded-none border border-hairline shadow-none',
          confirmButton: 'rounded-none px-[16px] py-[12px] text-[14px] font-normal tracking-[0.16px]'
        }
      });
      return;
    }

    setIsLoading(true);
    try {
      await api.post('/auth/register', {
        name,
        email,
        password,
      });

      setIsLoading(false);

      Swal.fire({
        icon: 'success',
        title: 'Pendaftaran Berhasil',
        text: 'Akun Anda berhasil dibuat. Silakan masuk!',
        confirmButtonColor: '#0f62fe',
        customClass: {
          popup: 'rounded-none border border-hairline shadow-none',
          confirmButton: 'rounded-none px-[16px] py-[12px] text-[14px] font-normal tracking-[0.16px]'
        }
      }).then(() => {
        navigate('/login');
      });

    } catch (err) {
      setIsLoading(false);
      const errMsg = err.response?.data?.message || 'Gagal mendaftarkan akun. Silakan hubungi admin.';
      Swal.fire({
        icon: 'error',
        title: 'Registrasi Gagal',
        text: typeof errMsg === 'object' ? errMsg[0] : errMsg,
        confirmButtonColor: '#0f62fe',
        customClass: {
          popup: 'rounded-none border border-hairline shadow-none',
          confirmButton: 'rounded-none px-[16px] py-[12px] text-[14px] font-normal tracking-[0.16px]'
        }
      });
    }
  };

  return (
    <>
      <h2 className="text-[24px] mb-2 font-light">Daftar Akun Baru</h2>
      <p className="text-[14px] text-ink-muted mb-8">
        Sudah punya akun? <Link to="/login" className="text-primary hover:underline">Masuk</Link>
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <TextInput
          label="Nama Lengkap"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Budi Santoso"
          required
        />

        <TextInput
          label="Alamat Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nama@email.com"
          required
        />
        
        <TextInput
          label="Kata Sandi"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          helperText="Minimal 8 karakter."
          required
        />

        <TextInput
          label="Konfirmasi Kata Sandi"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
          required
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Memproses...' : 'Daftar Sekarang'}
        </Button>
      </form>
    </>
  );
}

