import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextInput } from '../components/TextInput';
import { Button } from '../components/Button';
import Swal from 'sweetalert2';

export default function CompleteProfile() {
  const [formData, setFormData] = useState({
    phone: '',
    gender: '',
    grade: '',
    major: '',
    reason: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);

    Swal.fire({
      icon: 'success',
      title: 'Profil Lengkap',
      text: 'Pendaftaran selesai, silakan masuk.',
      confirmButtonColor: '#0f62fe',
      customClass: { popup: 'rounded-none border border-hairline', confirmButton: 'rounded-none' }
    }).then(() => {
      navigate('/login');
    });
  };

  return (
    <>
      <h2 className="text-[24px] mb-8 font-light">Lengkapi Profil</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <TextInput
          label="Nomor HP / WhatsApp"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="081234567890"
          required
        />

        <div className="flex flex-col w-full">
          <label className="text-[12px] text-ink-muted mb-1 tracking-carbon">Jenis Kelamin</label>
          <select 
            name="gender" 
            value={formData.gender} 
            onChange={handleChange}
            className="bg-surface-1 text-ink text-[16px] tracking-carbon py-[11px] px-[16px] border-b border-hairline focus:outline-none focus:border-b-2 focus:border-b-primary rounded-none"
            required
          >
            <option value="" disabled>Pilih Jenis Kelamin</option>
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col w-full">
            <label className="text-[12px] text-ink-muted mb-1 tracking-carbon">Kelas</label>
            <select 
              name="grade" 
              value={formData.grade} 
              onChange={handleChange}
              className="bg-surface-1 text-ink text-[16px] tracking-carbon py-[11px] px-[16px] border-b border-hairline focus:outline-none focus:border-b-2 focus:border-b-primary rounded-none"
              required
            >
              <option value="" disabled>Pilih</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
          </div>
          
          <div className="flex flex-col w-full">
            <label className="text-[12px] text-ink-muted mb-1 tracking-carbon">Jurusan</label>
            <select 
              name="major" 
              value={formData.major} 
              onChange={handleChange}
              className="bg-surface-1 text-ink text-[16px] tracking-carbon py-[11px] px-[16px] border-b border-hairline focus:outline-none focus:border-b-2 focus:border-b-primary rounded-none"
              required
            >
              <option value="" disabled>Pilih</option>
              <option value="RPL">RPL</option>
              <option value="TKJ">TKJ</option>
              <option value="MM">MM</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col w-full">
          <label className="text-[12px] text-ink-muted mb-1 tracking-carbon">Alasan Masuk ITC</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="bg-surface-1 text-ink text-[16px] tracking-carbon py-[11px] px-[16px] border-b border-hairline focus:outline-none focus:border-b-2 focus:border-b-primary rounded-none resize-none h-24"
            placeholder="Tuliskan alasan Anda..."
            required
          ></textarea>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Menyimpan...' : 'Selesai'}
        </Button>
      </form>
    </>
  );
}
