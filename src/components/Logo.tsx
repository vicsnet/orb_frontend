import React from "react";

interface LogoProps {
  title: string;
}

export default function Logo(prop: LogoProps) {
  return (
    <div className="text-[#E0FE82] " >
      <h2 className="text-[40px] leading-5 font-normal uppercase logo mobile:text-[20px] mobile:leading-[20px]">{prop.title}</h2>
    </div>
  );
}
