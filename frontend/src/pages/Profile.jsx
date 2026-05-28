import { useState, useRef, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Button } from '../components/Button';
import { TextInput } from '../components/TextInput';
import { User, Mail, Phone, BookOpen, Edit2, Camera, Save, X } from 'lucide-react';
import Swal from 'sweetalert2';

const DEFAULT_PROFILE = {
  phone: '0812-3456-7890',
  education: 'Kelas 11 RPL',
};

export default function Profile() {
  const { user } = useAuthStore();
  const fileInputRef = useRef(null);

  // Photo state
  const [photoUrl, setPhotoUrl] = useState(null);

  // Edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Profile data state
  const [profileData, setProfileData] = useState(DEFAULT_PROFILE);
  const [editData, setEditData] = useState(DEFAULT_PROFILE);

  // Load saved data on mount (per-user)
  useEffect(() => {
    if (!user?.id) return;
    const savedPhoto = localStorage.getItem(`itc_profile_photo_${user.id}`);
    if (savedPhoto) setPhotoUrl(savedPhoto);
    else setPhotoUrl(null);

    const savedData = localStorage.getItem(`itc_profile_data_${user.id}`);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setProfileData(parsed);
      setEditData(parsed);
    } else {
      setProfileData(DEFAULT_PROFILE);
      setEditData(DEFAULT_PROFILE);
    }
  }, [user?.id]);

  // --- Photo handlers ---
  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Compress image via canvas before storing
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      const MAX_SIZE = 200;
      let w = img.width;
      let h = img.height;
      if (w > h) { h = Math.round(h * MAX_SIZE / w); w = MAX_SIZE; }
      else { w = Math.round(w * MAX_SIZE / h); h = MAX_SIZE; }

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      const compressed = canvas.toDataURL('image/jpeg', 0.7);

      URL.revokeObjectURL(objectUrl);
      setPhotoUrl(compressed);
      localStorage.setItem(`itc_profile_photo_${user.id}`, compressed);
      Swal.fire({
        icon: 'success',
        title: 'Foto Diperbarui',
        text: 'Foto profil Anda berhasil diperbarui.',
        confirmButtonColor: '#0f62fe',
        customClass: {
          popup: 'rounded-none border border-hairline shadow-none',
          confirmButton: 'rounded-none px-[16px] py-[12px] text-[14px] font-normal tracking-[0.16px]'
        }
      });
    };
    img.src = objectUrl;
  };

  // --- Edit Data handlers ---
  const handleStartEdit = () => {
    setEditData({ ...profileData });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditData({ ...profileData });
    setIsEditing(false);
  };

  const handleSaveEdit = () => {
    setProfileData({ ...editData });
    localStorage.setItem(`itc_profile_data_${user.id}`, JSON.stringify(editData));
    setIsEditing(false);
    Swal.fire({
      icon: 'success',
      title: 'Data Diperbarui',
      text: 'Informasi personal Anda berhasil disimpan.',
      confirmButtonColor: '#0f62fe',
      customClass: {
        popup: 'rounded-none border border-hairline shadow-none',
        confirmButton: 'rounded-none px-[16px] py-[12px] text-[14px] font-normal tracking-[0.16px]'
      }
    });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-[24px] font-light mb-6">Profil Saya</h1>

      <div className="bg-canvas border border-hairline flex flex-col md:flex-row">
        {/* Left: Photo & Name */}
        <div className="p-8 border-b md:border-b-0 md:border-r border-hairline flex flex-col items-center justify-center min-w-[250px] bg-surface-1">
          <div className="w-24 h-24 bg-surface-2 rounded-none flex items-center justify-center mb-4 overflow-hidden relative">
            {photoUrl ? (
              <img src={photoUrl} alt="Foto Profil" className="w-full h-full object-cover" />
            ) : (
              <User className="w-12 h-12 text-ink-subtle" />
            )}
          </div>
          <h2 className="text-[18px] font-medium text-ink text-center">{user?.name}</h2>
          <p className="text-[14px] text-ink-muted text-center mt-1">{user?.role === 'admin' ? 'Administrator' : 'Anggota ITC'}</p>
          
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
          <Button variant="tertiary" size="sm" className="mt-6 flex items-center" onClick={handlePhotoClick}>
            <Camera className="w-3 h-3 mr-2" /> Edit Foto
          </Button>
        </div>

        {/* Right: Personal Info */}
        <div className="p-8 flex-1">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[16px] font-medium">Informasi Personal</h3>
            {!isEditing ? (
              <Button variant="ghost" size="sm" onClick={handleStartEdit}>
                <Edit2 className="w-3 h-3 mr-2 inline" /> Edit Data
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
                  <X className="w-3 h-3 mr-1 inline" /> Batal
                </Button>
                <Button size="sm" onClick={handleSaveEdit} className="bg-primary hover:bg-[#0043ce] text-white">
                  <Save className="w-3 h-3 mr-1 inline" /> Simpan
                </Button>
              </div>
            )}
          </div>

          {isEditing ? (
            /* Edit Mode */
            <div className="space-y-5">
              <TextInput
                label="Email"
                type="email"
                value={user?.email || ''}
                disabled
                helperText="Email tidak dapat diubah"
              />
              <TextInput
                label="Nomor Telepon"
                type="tel"
                value={editData.phone}
                onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                placeholder="08xx-xxxx-xxxx"
              />
              <TextInput
                label="Pendidikan"
                type="text"
                value={editData.education}
                onChange={(e) => setEditData({ ...editData, education: e.target.value })}
                placeholder="Contoh: Kelas 11 RPL"
              />
            </div>
          ) : (
            /* Display Mode */
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
                  <p className="text-[14px] text-ink">{profileData.phone}</p>
                </div>
              </div>

              <div className="flex items-start">
                <BookOpen className="w-4 h-4 text-ink-muted mr-3 mt-1" />
                <div>
                  <p className="text-[12px] text-ink-muted mb-0.5">Pendidikan</p>
                  <p className="text-[14px] text-ink">{profileData.education}</p>
                </div>
              </div>
            </div>
          )}

          {/* Alasan Bergabung — only for members */}
          {user?.role !== 'admin' && (
            <div className="mt-8 pt-6 border-t border-hairline">
              <h3 className="text-[16px] font-medium mb-4">Alasan Bergabung ITC</h3>
              <p className="text-[14px] text-ink-muted leading-[1.5] bg-surface-1 p-4 border border-hairline">
                "Ingin mendalami web development, khususnya React dan Node.js untuk persiapan karir sebagai Software Engineer."
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
