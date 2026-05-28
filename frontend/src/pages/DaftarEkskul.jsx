import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextInput } from '../components/TextInput';
import { Button } from '../components/Button';
import Swal from 'sweetalert2';
import api from '../utils/api';

export default function DaftarEkskul() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [className, setClassName] = useState('');
  const [division, setDivision] = useState('Web Development');
  const [reasonJoin, setReasonJoin] = useState('');
  const [divisionReason, setDivisionReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !className || !reasonJoin || !division || !divisionReason) {
      Swal.fire({
        icon: 'error',
        title: 'Formulir Belum Lengkap',
        text: 'Harap lengkapi seluruh field yang disediakan.',
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
      const response = await api.post('/registrations', {
        fullName,
        email,
        className,
        division,
        reasonJoin,
        divisionReason,
      });

      setIsLoading(false);

      Swal.fire({
        icon: 'success',
        title: 'Registrasi Ekskul Berhasil',
        text: 'Silakan lanjutkan untuk membuat akun login Anda!',
        confirmButtonColor: '#0f62fe',
        customClass: {
          popup: 'rounded-none border border-hairline shadow-none',
          confirmButton: 'rounded-none px-[16px] py-[12px] text-[14px] font-normal tracking-[0.16px]'
        }
      }).then(() => {
        // Redirect to Register and pass name and email
        navigate('/register', { 
          state: { 
            name: fullName, 
            email: email 
          } 
        });
      });

    } catch (err) {
      setIsLoading(false);
      const errMsg = err.response?.data?.message || 'Terjadi kesalahan pada server. Silakan coba lagi.';
      Swal.fire({
        icon: 'error',
        title: 'Pendaftaran Gagal',
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
    <div className="font-sans text-ink">
      <h2 className="text-[32px] font-light leading-[1.20] tracking-normal mb-2 text-ink">
        Pendaftaran IT Club
      </h2>
      <p className="text-[14px] leading-[1.50] tracking-[0.16px] text-ink-muted mb-8">
        Lengkapi formulir pendaftaran ekskul IT Club SMKN 12 Jakarta sebelum membuat akun login.
      </p>

      <form onSubmit={handleSubmit} className="space-y-[24px]">
        <TextInput
          label="Nama Lengkap"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Masukkan nama lengkap"
          required
        />

        <TextInput
          label="Alamat Email (Digunakan untuk login nanti)"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nama@email.com"
          required
        />

        <TextInput
          label="Kelas"
          type="text"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          placeholder="Contoh: XI RPL 1"
          required
        />

        <div className="flex flex-col w-full">
          <label className="text-[12px] text-ink-muted mb-1 tracking-carbon">
            Pilihan Divisi
          </label>
          <select
            value={division}
            onChange={(e) => setDivision(e.target.value)}
            className="bg-surface-1 text-ink text-[16px] tracking-carbon py-[11px] px-[16px] w-full border-b border-hairline focus:outline-none focus:border-b-2 focus:border-b-primary rounded-none cursor-pointer"
          >
            <option value="Web Development">Web Development</option>
            <option value="Robotik">Robotik</option>
            <option value="Desain">Desain</option>
          </select>
        </div>

        <div className="flex flex-col w-full">
          <label className="text-[12px] text-ink-muted mb-1 tracking-carbon">
            Alasan Bergabung IT Club
          </label>
          <textarea
            value={reasonJoin}
            onChange={(e) => setReasonJoin(e.target.value)}
            placeholder="Tuliskan alasan Anda tertarik bergabung dengan IT Club..."
            rows={3}
            className="bg-surface-1 text-ink text-[16px] tracking-carbon py-[11px] px-[16px] w-full border-b border-hairline focus:outline-none focus:border-b-2 focus:border-b-primary rounded-none resize-none"
            required
          />
        </div>

        <div className="flex flex-col w-full">
          <label className="text-[12px] text-ink-muted mb-1 tracking-carbon">
            Mengapa Memilih Divisi Tersebut?
          </label>
          <textarea
            value={divisionReason}
            onChange={(e) => setDivisionReason(e.target.value)}
            placeholder="Tuliskan alasan atau ketertarikan Anda pada divisi yang Anda pilih..."
            rows={3}
            className="bg-surface-1 text-ink text-[16px] tracking-carbon py-[11px] px-[16px] w-full border-b border-hairline focus:outline-none focus:border-b-2 focus:border-b-primary rounded-none resize-none"
            required
          />
        </div>

        <Button 
          type="submit" 
          className="w-full rounded-none bg-primary hover:bg-[#0043ce] text-white px-[16px] py-[12px] text-[14px] font-normal tracking-[0.16px] transition-colors" 
          disabled={isLoading}
        >
          {isLoading ? 'Mengirim Data...' : 'Kirim & Lanjutkan Pendaftaran Akun'}
        </Button>
      </form>

      <div className="mt-8 border-t border-hairline pt-6 text-center">
        <p className="text-[14px] text-ink-muted">
          Sudah punya akun? <Link to="/login" className="text-primary hover:underline font-semibold">Masuk di sini</Link>
        </p>
      </div>
    </div>
  );
}
