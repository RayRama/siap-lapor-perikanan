import React from "react";
import { IcMenu } from "../../assets";

export default function MenubarMobile({ setter }: any) {
  return (
    <nav className="md:hidden z-20 fixed top-0 left-0 right-0 h-[60px] bg-white flex [&>*]:my-auto px-4">
      <button
        className="text-4xl flex text-white"
        onClick={() => {
          setter((oldVal: boolean) => !oldVal);
        }}
      >
        <IcMenu />
      </button>
      <img
        src={require("../../assets/images/Logo.png")}
        alt="logo"
        width={30}
        height={30}
        className="ml-4"
      />
      <span className="font-bold ml-2">
        Siap Lapor <span className="text-[#3742FA]">Perikanan</span>
      </span>
    </nav>
  );
}
