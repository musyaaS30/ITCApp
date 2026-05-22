import { useAuthStore } from '../store/useAuthStore';
import { Button } from '../components/Button';
import { User, Mail, Phone, BookOpen, Edit2 } from 'lucide-react';

export default function Profile() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-[24px] font-light mb-6">Profil Saya</h1>

      <div className="bg-canvas border border-hairline flex flex-col md:flex-row">
        <div className="p-8 border-b md:border-b-0 md:border-r border-hairline flex flex-col items-center justify-center min-w-[250px] bg-surface-1">
          <div className="w-24 h-24 bg-surface-2 rounded-none flex items-center justify-center mb-4">
            <User className="w-12 h-12 text-ink-subtle" />
          </div>
          <h2 className="text-[18px] font-medium text-ink text-center">{user?.name}</h2>
          <p className="text-[14px] text-ink-muted text-center mt-1">{user?.role === 'admin' ? 'Administrator' : 'Anggota ITC'}</p>
          
          <Button variant="tertiary" size="sm" className="mt-6 flex items-center">
            <Edit2 className="w-3 h-3 mr-2" /> Edit Foto
          </Button>
        </div>

        <div className="p-8 flex-1">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[16px] font-medium">Informasi Personal</h3>
            <Button variant="ghost" size="sm">Edit Data</Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-start">
              <Mail className="w-4 h-4 text-ink-muted mr-3 mt-1" />
              <div>
                <p className="text-[12px] text-ink-muted mb-0.5">Email</p>
                <p className="text-[14px] text-ink">{user?.email}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Phone className="w-4 h-4 text-ink-muted mr-3 mt-1" />
              <div>
                <p className="text-[12px] text-ink-muted mb-0.5">Nomor Telepon</p>
                <p className="text-[14px] text-ink">0812-3456-7890</p>
              </div>
            </div>

            <div className="flex items-start">
              <BookOpen className="w-4 h-4 text-ink-muted mr-3 mt-1" />
              <div>
                <p className="text-[12px] text-ink-muted mb-0.5">Pendidikan</p>
                <p className="text-[14px] text-ink">Kelas 11 RPL</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-hairline">
            <h3 className="text-[16px] font-medium mb-4">Alasan Bergabung ITC</h3>
            <p className="text-[14px] text-ink-muted leading-[1.5] bg-surface-1 p-4 border border-hairline">
              "Ingin mendalami web development, khususnya React dan Node.js untuk persiapan karir sebagai Software Engineer."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
