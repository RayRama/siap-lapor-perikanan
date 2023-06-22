import axios from "../helper/api/axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

export default function TambahIkan() {
  const [namaIkan, setNamaIkan] = React.useState<string>("");
  const [linkGambar, setLinkGambar] = React.useState<string>("");
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token") || "{}");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  async function addData() {
    try {
      await axios
        .post(
          "/fishs",
          {
            name: namaIkan,
            image: linkGambar,
          },
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          toast.success("Data Berhasil Ditambahkan", { icon: "👏" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Anda bukan admin", {
            icon: "❌",
          });
        });
    } catch (error) {
      console.log(error);
      toast.error("Data Gagal Ditambahkan");
    }
  }

  React.useEffect(() => {
    if (!user.isAdmin) {
      navigate("/dataikan");
    }
  }, []);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />

      {/* Content Title */}
      <div className="bg-white rounded-md w-full p-5">
        <h1 className="text-lg">
          <span className="font-bold">Data Ikan - Tambah Ikan</span>
        </h1>
      </div>

      {/* Content */}
      <div className="bg-white rounded-md w-full h-auto p-5 mt-5">
        {/* input nama ikan */}
        <div className="flex flex-row gap-3">
          <div className="flex flex-col w-full">
            <label className="text-sm font-bold text-black tracking-wide">
              Nama Ikan
            </label>
            <input
              className="text-base p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text"
              placeholder="Masukkan Nama Ikan"
              value={namaIkan}
              onChange={(e) => setNamaIkan(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-sm font-bold text-black tracking-wide">
              Link Gambar
            </label>
            <input
              className="text-base p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text"
              placeholder="Masukkan Link Gambar Ikan"
              value={linkGambar}
              onChange={(e) => setLinkGambar(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="flex flex-row mt-5 justify-between">
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate("..")}
        >
          Kembali
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => addData()}
        >
          Tambah Data
        </button>
      </div>
    </div>
  );
}
