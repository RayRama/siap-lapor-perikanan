import React from "react";
import { IIkan, columns } from "../data/ikan/column";
import { DataTable } from "../data/ikan/data-table";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "../helper/api/axios";
import { Toaster, toast } from "react-hot-toast";

export default function Ikan() {
  const [data, setData] = React.useState<IIkan[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const token = JSON.parse(localStorage.getItem("token") || "{}");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  React.useEffect(() => {
    async function getData() {
      try {
        await axios
          .get("/fishs", {
            headers: {
              token: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setData(res.data.data);
            console.log(res.data);
          })
          .catch((err) => {
            toast.error("Anda bukan admin", {
              icon: "❌",
            });
          });
      } catch (error) {
        toast.error("Gagal Mengambil Data", {
          icon: "❌",
        });
      }
    }

    getData();
  }, [token]);

  return (
    <div className="flex p-10 flex-col">
      <Toaster reverseOrder={false} position="top-center" />
      {location.pathname === "/dataikan" ? (
        <>
          {/* Content Title */}
          <div className="bg-white rounded-md w-full p-5">
            <h1 className="text-lg">
              <span className="font-bold">Data Ikan</span>
            </h1>
          </div>

          {/* Content */}
          <div className="bg-white rounded-md w-full h-auto p-5 mt-5">
            <DataTable columns={columns} data={data} />
          </div>

          {/* Button */}
          <div className="flex flex-row-reverse mt-5">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                if (user.isAdmin) {
                  navigate("tambahikan");
                } else {
                  toast.error("Anda bukan admin", {
                    icon: "❌",
                  });
                }
              }}
            >
              Tambah Data
            </button>
          </div>
        </>
      ) : (
        <Outlet />
      )}
    </div>
  );
}
