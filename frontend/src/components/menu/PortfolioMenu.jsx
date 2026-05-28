import { ArrowRight } from 'lucide-react'
import React from 'react'
import { Button } from '../Button'

const PortfolioMenu = () => {
  return (
    <section className="py-8 md:py-[48px] px-[3%]">
        <div className="max-w-full mx-auto bg-[#E8E0FF] flex flex-col md:flex-row items-center overflow-hidden">
          {/* Ilustrasi Sisi Kiri - Muncul hanya di Desktop besar */}
          <div className="hidden lg:block w-[260px] border-r border-[#3B69FF]/20 bg-white/30 p-8 self-stretch">
            <div className="space-y-4">
              <div className="h-2 w-20 bg-[#3B69FF]/20 rounded" />
              <div className="h-2 w-32 bg-[#3B69FF]/40 rounded" />
              <div className="h-2 w-24 bg-[#3B69FF]/20 rounded" />
            </div>
          </div>

          {/* Konten Teks */}
          <div className="flex-1 p-6 md:p-8 text-center md:text-left">
            <h2 className="text-base md:text-xl lg:text-xl font-bold text-black leading-tight mb-3">
              Eksplorasi Pencapaian dan Inovasi Digital Siswa RPL & ITCLUB
            </h2>
            <p className="text-sm md:text-base text-gray-800 leading-relaxed">
              Lihat portofolio proyek dan deretan prestasi yang telah diraih
              oleh siswa kami di tingkat regional maupun nasional.
            </p>
          </div>

          {/* Area Tombol */}
          <div className="p-4 md:p-6 w-full md:w-auto flex justify-center">
            <Button
              variant="secondary"
              className="w-full md:w-auto bg-transparent border-[#3B69FF] text-[#3B69FF] hover:bg-[#3B69FF] hover:text-white transition-all group flex items-center justify-center gap-3 px-6 py-3 md:px-8 md:py-2 text-base md:text-lg border font-medium"
            >
              Lihat Portofolio
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
  )
}

export default PortfolioMenu
