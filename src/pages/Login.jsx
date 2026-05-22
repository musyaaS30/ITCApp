import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextInput } from '../components/TextInput';
import { Button } from '../components/Button';
import { useAuthStore } from '../store/useAuthStore';
import Swal from 'sweetalert2';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    const result = await login(email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Gagal Masuk',
        text: result.message,
        confirmButtonColor: '#0f62fe',
        customClass: {
          popup: 'rounded-none border border-hairline',
          confirmButton: 'rounded-none uppercase tracking-carbon'
        }
      });
    }
  };

  return (
    <>
      <h2 className="text-[24px] mb-2 font-light">Masuk ke ITC System</h2>
      <p className="text-[14px] text-ink-muted mb-8">
        Belum punya akun? <Link to="/register" className="text-primary hover:underline">Daftar</Link>
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
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
          required
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Memproses...' : 'Masuk'}
        </Button>
      </form>

      <div className="mt-6 border-t border-hairline pt-6">
        <p className="text-[12px] text-ink-subtle">
          Gunakan <span className="font-semibold text-ink">admin@itc.com</span> (admin123) atau <span className="font-semibold text-ink">user@itc.com</span> (user123) untuk ujicoba.
        </p>
      </div>
    </>
  );
}
