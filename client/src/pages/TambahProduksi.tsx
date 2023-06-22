import React from "react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "../helper/api/axios";
import { IIkan } from "../data/ikan/column";

export default function TambahProduksi() {
  const navigate = useNavigate();
  const [dataIkan, setDataIkan] = React.useState([] as Array<IIkan>);
  const [namaProduksi, setNamaProduksi] = React.useState<string>("");
  const [jenisIkan, setJenisIkan] = React.useState<string>("");
  const [berat, setBerat] = React.useState<string>("");
  const [kuantitas, setKuantitas] = React.useState<string>("");
  const [tanggalProduksi, setTanggalProduksi] = React.useState<string>("");
  const token = JSON.parse(localStorage.getItem("token") || "{}");
  const [loading, setLoading] = React.useState<boolean>(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  async function addData() {
    setLoading(true);
    try {
      await axios
        .post(
          "/productionContents",
          {
            fish_id: jenisIkan,
            weight: parseInt(berat),
            quantity: parseInt(kuantitas),
          },
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        )
        .then(async (res) => {
          await axios
            .post(
              "/productions",
              {
                user_id: user._id,
                productionName: namaProduksi,
                productionContent: res.data._id,
                date: tanggalProduksi,
              },
              {
                headers: {
                  token: `Bearer ${token}`,
                },
              }
            )
            .then((res) => {
              toast.success("Data Berhasil Ditambahkan");
              setLoading(false);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      toast.error("Data Gagal Ditambahkan");
      console.log(error);
      setLoading(false);
    }
  }

  React.useEffect(() => {
    async function fetchIkan() {
      try {
        await axios
          .get("/fishs", {
            headers: {
              token: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setDataIkan(res.data.data);
          });
      } catch (error) {
        toast.error("Data Gagal Ditambahkan");
        console.log(error);
      }
    }
    fetchIkan();
  }, []);

  // React.useEffect(() => {
  //   console.log({ namaProduksi, jenisIkan, berat, kuantitas, tanggalProduksi });
  // }, [namaProduksi, jenisIkan, berat, kuantitas, tanggalProduksi]);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      {/* Content Title */}
      <div className="bg-white rounded-md w-full p-5">
        <h1 className="text-lg">
          <span className="font-bold">Data Produksi - Tambah Produksi</span>
        </h1>
      </div>

      {/* Content */}
      <div className="bg-white rounded-md w-full h-auto p-5 mt-5">
        {/* input nama ikan */}
        <div className="flex md:flex-row flex-col gap-3">
          <div className="flex flex-col w-full">
            <label className="text-sm font-bold text-black tracking-wide">
              Nama Produksi
            </label>
            <input
              className="text-base p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text"
              placeholder="Masukkan Nama Produksi"
              value={namaProduksi}
              onChange={(e) => setNamaProduksi(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-sm font-bold text-black tracking-wide">
              Jenis Ikan
            </label>
            {/* dropdown */}
            <div className="relative">
              <select
                className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                id="grid-state"
                value={jenisIkan}
                onChange={(e) => setJenisIkan(e.target.value)}
              >
                <option>Choose...</option>
                {dataIkan.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
            </div>
          </div>
        </div>
        {/* Berat dan kuantitas */}
        <div className="flex md:flex-row flex-col gap-3 mt-5">
          <div className="flex flex-col w-full">
            <label className="text-sm font-bold text-black tracking-wide">
              Berat (KG)
            </label>
            <input
              className="text-base p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text"
              placeholder="Masukkan Berat Produksi"
              value={berat}
              onChange={(e) => setBerat(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-sm font-bold text-black tracking-wide">
              Kuantitas
            </label>
            <input
              className="text-base p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text"
              placeholder="Masukkan Jumlah Ikan Yang Akan Diproduksi"
              value={kuantitas}
              onChange={(e) => setKuantitas(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col w-full mt-5">
          <label className="text-sm font-bold text-black tracking-wide">
            Tanggal Produksi
          </label>
          <input
            className="text-base p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="date"
            placeholder="Masukkan Tanggal Produksi"
            value={tanggalProduksi}
            onChange={(e) => setTanggalProduksi(e.target.value)}
          />
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
          disabled={loading}
        >
          Tambah Data
        </button>
      </div>
    </div>
  );
}
