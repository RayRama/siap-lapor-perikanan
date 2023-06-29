import React from "react";
import { IIkan, columns } from "../data/ikan/column";
import { DataTable } from "../data/ikan/data-table";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "../helper/api/axios";
import { Toaster, toast } from "react-hot-toast";

export default function Ikan() {
  const [data, setData] = React.useState<IIkan[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const token = JSON.parse(localStorage.getItem("token") || "{}");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  React.useEffect(() => {
    setLoading(true);
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
            setLoading(false);
            // console.log(res.data);
          })
          .catch((err) => {
            toast.error("Gagal Mengambil Data", {
              icon: "❌",
            });
            setLoading(false);
          });
      } catch (error) {
        toast.error("Gagal Mengambil Data", {
          icon: "❌",
        });
        setLoading(false);
      }
    }

    getData();
  }, [token]);

  return (
    <div className="flex flex-col md:p-10 p-5 md:mt-0 mt-20">
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
            {loading ? (
              <div className="flex justify-center items-center">
                <h1 className="text-lg">Loading...</h1>
              </div>
            ) : (
              <DataTable columns={columns} data={data} />
            )}
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
