import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextInput } from '../components/TextInput';
import { Button } from '../components/Button';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    // Proceed to OTP verification
    navigate('/verify-otp');
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

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Memproses...' : 'Lanjutkan'}
        </Button>
      </form>
    </>
  );
}
