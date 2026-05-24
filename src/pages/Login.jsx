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
        confirmButtonColor: '#0f62fe', // IBM Blue
        customClass: {
          // Flat geometry: 0px borders, no soft shadows
          popup: 'rounded-none border border-hairline shadow-none',
          // Button spec: 14px, 12px 16px padding, 0.16px tracking
          confirmButton: 'rounded-none px-[16px] py-[12px] text-[14px] font-normal tracking-[0.16px]' 
        }
      });
    }
  };

  return (
    <div className="font-sans text-ink">
      {/* Headline: Menggunakan typography.display-md 
        42px, weight 300 (light), line-height 1.20, tracking 0
      */}
      <h2 className="text-[42px] font-light leading-[1.20] tracking-normal mb-4 text-ink">
        Masuk
      </h2>
      
      {/* Body: Menggunakan typography.body
        16px, weight 400, line-height 1.50, letter-spacing 0.16px 
      */}
      <p className="text-[16px] font-normal leading-[1.50] tracking-[0.16px] text-ink-muted mb-8">
        Belum punya akun? <Link to="/register" className="text-primary hover:underline transition-colors">Daftar</Link>
      </p>

      {/* Spacing system: base unit 4px -> 24px gap */}
      <form onSubmit={handleSubmit} className="space-y-[24px]">
        {/* Pastikan komponen TextInput di dalamnya memiliki rounded-none dan border bawah 1px */}
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

        {/* Button CTA: typography.button
          14px, weight 400, line-height 1.29, letter-spacing 0.16px, padding 12px 16px, 0px radius
        */}
        <Button 
          type="submit" 
          className="w-full rounded-none bg-primary hover:bg-[#0043ce] text-white px-[16px] py-[12px] text-[14px] font-normal tracking-[0.16px] transition-colors" 
          disabled={isLoading}
        >
          {isLoading ? 'Memproses...' : 'Masuk'}
        </Button>
      </form>

      {/* Divider: hairline color dengan margin kelipatan 4px */}
      <div className="mt-8 border-t border-hairline pt-6">
        {/* Caption: typography.caption
          12px, weight 400, line-height 1.33, letter-spacing 0.32px
        */}
        <p className="text-[12px] font-normal leading-[1.33] tracking-[0.32px] text-ink-subtle">
          Gunakan <span className="font-semibold text-ink">admin@itc.com</span> (admin123) atau <span className="font-semibold text-ink">user@itc.com</span> (user123) untuk ujicoba.
        </p>
      </div>
    </div>
  );
}