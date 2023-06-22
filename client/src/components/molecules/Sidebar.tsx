import React from "react";
import { IcClose, IcFish, IcHome, IcLogout, IcProduct } from "../../assets";
import SidebarItem from "../atoms/SidebarItem";
import { useAtom } from "jotai";
import { authAtom } from "../../store";
import ModalOverlay from "../atoms/ModalOverlay";

export default function Sidebar({
  show,
  setter,
}: {
  show: boolean;
  setter: any;
}) {
  const [, setAuth] = useAtom(authAtom);
  const className =
    "bg-white md:w-[320px] w-[250px] flex-none transition-[margin-left] fixed md:static ease-in-out duration-500 z-40";

  const appendClass = show ? " ml-0" : "ml-[-250px] md:ml-0";

  function logoutHandle() {
    setAuth({
      token: undefined,
    });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
  return (
    <>
      <div className={`${className} ${appendClass}`}>
        <div
          className={`${
            show ? "" : "hidden"
          } -mr-12 absolute right-0 top-0 pt-2 md:hidden opacity-100`}
        >
          <button
            type="button"
            onClick={() => {
              setter((oldVal: boolean) => !oldVal);
            }}
            className="ml-1 flex h-10 w-10 items-center justify-center focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <IcClose />
          </button>
        </div>
        <div className="fixed md:w-[320px] w-[250px] h-full px-5 bg-white">
          <div className="pt-5 pb-sm sticky top-0 flex justify-between flex-col h-full space-y-5">
            <div className="flex flex-row items-center">
              <img
                src={require("../../assets/images/Logo.png")}
                alt="logo"
                width={40}
                height={40}
                className="mr-4"
              />
              <span className="font-bold">
                Siap Lapor <span className="text-[#3742FA]">Perikanan</span>
              </span>
            </div>
            <div className="flex-grow space-y-2">
              {[
                {
                  name: "Beranda",
                  route: "/",
                  icon: <IcHome />,
                },
                {
                  name: "Ikan",
                  route: "/dataikan",
                  icon: <IcFish />,
                },
                {
                  name: "Produksi",
                  route: "/dataproduksi",
                  icon: <IcProduct />,
                },
              ].map((item, index) => {
                return (
                  <SidebarItem
                    key={index}
                    name={item.name}
                    route={item.route}
                    icon={item.icon}
                    setter={setter}
                  />
                );
              })}
            </div>
            <div className="flex flex-col border-t-2">
              <div className="pb-4 mt-2 space-y-2">
                <div
                  className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer text-base font-medium hover:bg-gray-100`}
                  onClick={() => logoutHandle()}
                >
                  <div className="w-6 h-6 pr-8">
                    <IcLogout />
                  </div>
                  <div>Logout</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {show ? <ModalOverlay setter={setter} /> : <></>}
    </>
  );
}
