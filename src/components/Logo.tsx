import React from "react";

interface LogoProps {
  title: string;
}

export default function Logo(prop: LogoProps) {
  return (
    <div className="text-[#E0FE82] " >
      <div className="flex items-center gap-2">
        <h2 className="text-[40px] font-['Fruktur'] tracking-wider uppercase bg-gradient-to-r from-[#E0FE82] to-[#99E515] bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 mobile:text-[24px] font-bold">
          {prop.title}
        </h2>
        <div className="w-2 h-2 rounded-full bg-[#99E515] animate-pulse" />
      </div>
    </div>
  );
}
