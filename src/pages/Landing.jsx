import { Link } from "react-router-dom";
import {
  ArrowRight,
  Code,
  Palette,
  Smartphone,
  GraduationCap,
} from "lucide-react";
import { Button } from "../components/Button";
import PortfolioMenu from "../components/menu/PortfolioMenu";

import blueIlustration from "../assets/abstrak-image.webp";
import blueIlustration2 from "../assets/blue-ilustration.webp";

import webIcon from "../assets/illustrations/webImage.webp";
import designIcon from "../assets/illustrations/designImage.webp";
import roboticIcon from "../assets/illustrations/roboticImage.webp";
import portfolioIcon from "../assets/illustrations/portfolioImage.webp";

import rplStudentIllustration from "../assets/articles/rplStudentIllustration.webp";
import nonRplStudentIllustration from "../assets/articles/nonRplStudentIllustration.webp";
import mentorIllustration from "../assets/articles/mentorIllustration.webp";
import AnimatedBorder from "../components/AnimatedBorder";

export default function Landing() {
  const articles = [
    {
      id: 1,
      title: "Anak RPL? Ini Tempatmu!",
      description:
        "Kamu udah belajar coding di kelas, sekarang saatnya bikin sesuatu yang bisa dipamerin. Di sini kita fokus bikin portofolio nyata — mulai dari website sampai aplikasi mobile.",
      image: rplStudentIllustration,
      link: "/rpl-info",
    },
    {
      id: 2,
      title: "Bukan RPL tapi Pengen Masuk? Gas!",
      description:
        "Dari jurusan MP, AKL, atau BR? Gapapa! IT Club bukan eksklusif buat RPL aja. Kalau kamu penasaran sama dunia desain atau digital, yuk langsung gabung.",
      image: nonRplStudentIllustration,
      link: "/non-rpl-info",
    },
    {
      id: 3,
      title: "Belajar Bareng Senior & Kakel",
      description:
        "Nggak belajar sendirian! Kamu bakal dibimbing bareng kakak kelas dan alumni yang siap bantu dari dasar sampai bisa bikin project sendiri.",
      image: mentorIllustration,
      link: "/mentors",
    },
  ];

  return (
    <div className="bg-canvas">
      {/* Hero Section */}
      <section className="pt-[76px] pb-[76px] px-[3%] border-b border-hairline">
        <div className="max-w-full mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Left: Text Content */}
          <div className="flex-1">
            <h1 className="text-[22px] text-primary md:text-[46px] font-light leading-[1.17] tracking-tight mb-6">
              Yuk, Wujudkan <br /> Ide Digitalmu!
            </h1>
            <p className="text-[18px] text-ink-muted mb-8 max-w-[700px] leading-[1.5]">
              Halo! Selamat datang di{" "}
              <strong>IT Club SMK Negeri 12 Jakarta</strong> — komunitas seru
              buat kamu yang pengen belajar coding, desain, sampai robotik
              bareng temen-temen yang sama-sama semangat di dunia teknologi.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/register">
                <Button
                  size="lg"
                  className="flex items-center w-full justify-center"
                >
                  Gabung Sekarang <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  variant="tertiary"
                  size="lg"
                  className="w-full justify-center"
                >
                  Presensi Anggota
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: Image */}
          <div className="flex-1 w-full">
            <img
              loading="lazy"
              src={blueIlustration}
              alt="IT Club Hero"
              className="w-full h-auto rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* Portofolio Section */}
      <PortfolioMenu />

      {/* Feature Grid - Core Programs */}
      <section className="py-12 px-[5%]">
        <div className="max-w-full mx-auto">
          <div className="mb-12">
            <h2 className="text-[32px] font-light mb-2">Kita Fokus di Sini</h2>
            <p className="text-ink-muted">
              Program-program ini dirancang biar kamu punya portofolio keren
              sebelum lulus.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="relative bg-canvas border border-hairline p-[24px] transition-all hover:bg-surface-1 group cursor-pointer">
              <AnimatedBorder />
              <div className="relative z-10">
                <img
                  loading="lazy"
                  src={webIcon}
                  alt="webIcon"
                  className="w-[80px] aspect-square object-cover mb-2"
                />
                <h3 className="text-[20px] lg:text-[24px] mb-4">
                  Web Development
                </h3>
                <p className="text-[14px] text-ink-muted leading-[1.5]">
                  Dari HTML, CSS, sampai JavaScript dan framework kekinian. Kita
                  bikin website beneran, bukan cuma tugas sekolah.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative bg-canvas border border-hairline p-[24px] transition-all hover:bg-surface-1 group cursor-pointer">
              <AnimatedBorder />
              <div className="relative z-10">
                <img
                  loading="lazy"
                  src={designIcon}
                  alt="designIcon"
                  className="w-[80px] aspect-square object-cover mb-2"
                />
                <h3 className="text-[20px] lg:text-[24px] mb-4">
                  UI/UX Design
                </h3>
                <p className="text-[14px] text-ink-muted leading-[1.5]">
                  Belajar desain pakai Figma dan Canva. Bikin tampilan aplikasi
                  yang nggak cuma bagus, tapi juga enak dipakai.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative bg-canvas border border-hairline p-[24px] transition-all hover:bg-surface-1 group cursor-pointer">
              <AnimatedBorder />
              <div className="relative z-10">
                <img
                  loading="lazy"
                  src={roboticIcon}
                  alt="roboticIcon"
                  className="w-[80px] aspect-square object-cover mb-2"
                />
                <h3 className="text-[20px] lg:text-[24px] mb-4">Robotik</h3>
                <p className="text-[14px] text-ink-muted leading-[1.5]">
                  Penasaran sama Arduino dan sistem otomatis? Di sini kita rakit
                  dan program robot bareng — seru banget, serius!
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="relative bg-canvas border border-hairline p-[24px] transition-all hover:bg-surface-1 group cursor-pointer">
              <AnimatedBorder />
              <div className="relative z-10">
                <img
                  loading="lazy"
                  src={portfolioIcon}
                  alt="portfolioIcon"
                  className="w-[80px] aspect-square object-cover mb-2"
                />
                <h3 className="text-[20px] lg:text-[24px] mb-4">
                  Project Portofolio
                </h3>
                <p className="text-[14px] text-ink-muted leading-[1.5]">
                  Ngerjain proyek nyata yang bisa masuk CV. Pas lulus nanti,
                  kamu udah punya sesuatu buat dipamerin ke HRD.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirement / Info Section */}
      <section className="relative py-24 px-[5%] overflow-hidden">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <img
            loading="lazy"
            src={blueIlustration2}
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/20"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
            <div>
              <h2 className="text-[52px] md:text-[62px] font-medium mb-6 leading-tight text-ink">
                Emang{" "}
                <span className="relative inline-block px-2">
                  <span className="absolute inset-0 bg-canvas -skew-y-2 -z-10 rounded-md"></span>
                  <span className="relative z-10">Buat</span>
                </span>{" "}
                <br />
                <span className="relative inline-block px-2 mt-2">
                  <span className="absolute inset-0 bg-canvas skew-y-2 -z-10 rounded-md"></span>
                  <span className="relative z-10">Siapa</span>
                </span>{" "}
                Aja?
              </h2>
            </div>

            {/* Info Card - Glassmorphism dipertajam */}
            <div className="bg-canvas p-8 md:p-10 rounded-sm border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
              <div className="flex items-start gap-5">
                <div className="p-3 bg-gray-900 rounded-2xl shrink-0 shadow-lg mt-1">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  <strong className="text-gray-900 font-bold">
                    Utamanya sih buat anak RPL,
                  </strong>{" "}
                  tapi kalau kamu dari jurusan lain (BR, MP, AKL) dan pengen
                  belajar IT, pintu kita selalu terbuka!
                </p>
              </div>
            </div>
          </div>

          {/* Article Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div
                key={article.id}
                className="group cursor-pointer flex flex-col bg-canvas border border-white/50 rounded-sm p-4 transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:bg-surface-1 border-hairline hover:border-primary "
              >
                {/* Image Container */}
                <div className="aspect-[16/9] overflow-hidden rounded-sm mb-6 bg-gray-100">
                  <img
                    loading="lazy"
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Text Container */}
                <div className="px-3 pb-4 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold leading-snug mb-3 text-gray-900 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed line-clamp-3">
                    {article.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary text-white py-[96px] px-[3%]">
        <div className="max-w-full mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0">
            <h2 className="text-[32px] md:text-[42px] font-light mb-4">
              Siap Mulai Perjalanan Digitalmu?
            </h2>
            <p className="text-[18px] text-white/80">
              Langkah pertama itu yang paling susah — tapi kita bakal bantu kamu
              dari awal!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/register">
              <Button className="bg-white text-primary hover:bg-surface-1 active:bg-surface-2 border-none">
                Daftar Akun Baru
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-8 px-[3%] border-t border-hairline text-center text-ink-muted text-sm">
        <p>© 2025 IT Club SMK Negeri 12 Jakarta. All rights reserved.</p>
      </footer>
    </div>
  );
}
