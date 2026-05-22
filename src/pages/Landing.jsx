import { Link } from "react-router-dom";
import {
  ArrowRight,
  Code,
  Palette,
  Smartphone,
  GraduationCap,
} from "lucide-react";
import { Button } from "../components/Button";
import blueIlustration from "../assets/abstrak-image.jpg";
import PortfolioMenu from "../components/menu/PortfolioMenu";
import blueIlustration2 from "../assets/blue-ilustration.jpg";

export default function Landing() {
  const articles = [
    {
      id: 1,
      title: "Anak RPL? Ini Tempatmu!",
      description:
        "Kamu udah belajar coding di kelas, sekarang saatnya bikin sesuatu yang bisa dipamerin. Di sini kita fokus bikin portofolio nyata — mulai dari website sampai aplikasi mobile.",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
      link: "/rpl-info",
    },
    {
      id: 2,
      title: "Bukan RPL tapi Pengen Masuk? Gas!",
      description:
        "Dari jurusan MP, AKL, atau BR? Gapapa! IT Club bukan eksklusif buat RPL aja. Kalau kamu penasaran sama dunia desain atau digital, yuk langsung gabung.",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
      link: "/non-rpl-info",
    },
    {
      id: 3,
      title: "Dibimbing Langsung Sama Kak Alumni",
      description:
        "Belajar bareng kakak alumni yang udah kerja di startup dan perusahaan tech. Dapet insight dunia kerja, bukan cuma teori dari buku.",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
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
            <div className="bg-canvas border border-hairline p-[24px] hover:border-primary transition-all hover:bg-surface-1 group">
              <img
                src="https://plus.unsplash.com/premium_vector-1734405758703-2d4c7bd07328?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
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

            {/* Card 2 */}
            <div className="bg-canvas border border-hairline p-[24px] hover:border-primary transition-all hover:bg-surface-1 group">
              <img
                src="https://plus.unsplash.com/premium_vector-1753481715818-e399c4f3bb7f?q=80&w=956&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="w-[80px] aspect-square object-cover mb-2"
              />
              <h3 className="text-[20px] lg:text-[24px] mb-4">UI/UX Design</h3>
              <p className="text-[14px] text-ink-muted leading-[1.5]">
                Belajar desain pakai Figma dan Canva. Bikin tampilan aplikasi
                yang nggak cuma bagus, tapi juga enak dipakai.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-canvas border border-hairline p-[24px] hover:border-primary transition-all hover:bg-surface-1 group">
              <img
                src="https://plus.unsplash.com/premium_vector-1761061737269-363f55b8518c?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="w-[80px] aspect-square object-cover mb-2"
              />
              <h3 className="text-[20px] lg:text-[24px] mb-4">Robotik</h3>
              <p className="text-[14px] text-ink-muted leading-[1.5]">
                Penasaran sama Arduino dan sistem otomatis? Di sini kita rakit
                dan program robot bareng — seru banget, serius!
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-canvas border border-hairline p-[24px] hover:border-primary transition-all hover:bg-surface-1 group">
              <Smartphone className="w-8 h-8 text-primary mb-6" />
              <h3 className="text-[20px] lg:text-[24px] mb-4">
                Project Portofolio
              </h3>
              <p className="text-[14px] text-ink-muted leading-[1.5]">
                Ngerjain proyek nyata yang bisa masuk CV. Pas lulus nanti, kamu
                udah punya sesuatu buat dipamerin ke HRD.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Requirement / Info Section */}
      <section className="relative py-20 px-[5%] overflow-hidden">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <img
            src={blueIlustration2}
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center mb-12">
            <div>
              <h2 className="text-[52px] md:text-[62px] font-medium mb-6 leading-tight text-ink">
                Emang Buat <br /> Siapa Aja?
              </h2>
            </div>

            <div className="bg-white/50 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/20 shadow-xl">
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="p-2 bg-black rounded-lg mr-4 mt-1 shrink-0">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-lg text-ink-muted">
                    <strong className="text-ink">
                      Utamanya sih buat anak RPL,
                    </strong>{" "}
                    tapi kalau kamu dari jurusan lain (BR, MP, AKL) dan pengen
                    belajar IT, pintu kita selalu terbuka!
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Article Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div
                key={article.id}
                className="group cursor-pointer flex flex-col"
              >
                <div className="aspect-[16/9] overflow-hidden rounded-3xl mb-6 shadow-lg border border-white/20">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-2xl md:text-3xl font-bold leading-snug mb-3 group-hover:underline transition-colors text-ink">
                    {article.title}
                  </h3>
                  <p className="text-ink-muted text-sm md:text-base leading-relaxed line-clamp-3">
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
