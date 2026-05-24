import React from "react";

const AnimatedBorder = () => {
  return (
    <>
      {/* Garis Atas (Kiri ke Kanan) */}
      <span className="absolute top-[-1px] left-[-1px] h-[2px] w-0 bg-primary transition-all duration-[200ms] ease-linear group-hover:w-[calc(100%+2px)]"></span>

      {/* Garis Kanan (Atas ke Bawah) */}
      <span className="absolute top-[-1px] right-[-1px] w-[2px] h-0 bg-primary transition-all duration-[200ms] ease-linear delay-[200ms] group-hover:h-[calc(100%+2px)]"></span>

      {/* Garis Bawah (Kanan ke Kiri) */}
      <span className="absolute bottom-[-1px] right-[-1px] h-[2px] w-0 bg-primary transition-all duration-[200ms] ease-linear delay-[400ms] group-hover:w-[calc(100%+2px)]"></span>

      {/* Garis Kiri (Bawah ke Atas) */}
      <span className="absolute bottom-[-1px] left-[-1px] w-[2px] h-0 bg-primary transition-all duration-[200ms] ease-linear delay-[600ms] group-hover:h-[calc(100%+2px)]"></span>
    </>
  );
};

export default AnimatedBorder;
