import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="h-[48px] bg-canvas border-b border-hairline flex items-center px-[5%] justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-8">
        <Link to="/" className="text-ink font-semibold text-[14px]">
          ITC System
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-[14px] text-ink hover:text-primary">
            Beranda
          </Link>
          <Link
            to="/activities"
            className="text-[14px] text-ink hover:text-primary"
          >
            Kegiatan
          </Link>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Link to="/login" className="text-[14px] text-primary hover:underline">
          Masuk
        </Link>
        <Link
          to="/register"
          className="bg-primary text-white text-[14px] py-[8px] px-[16px] hover:bg-blue-hover"
        >
          Daftar
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
