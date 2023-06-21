import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { IProduksi, columns } from "../data/produksi/column";
import React from "react";
import { DataTable } from "../data/produksi/data-table";
import axios from "../helper/api/axios";

export default function Produksi() {
  const [data, setData] = React.useState<IProduksi[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const token = JSON.parse(localStorage.getItem("token") || "{}");

  React.useEffect(() => {
    async function getData(): Promise<IProduksi[]> {
      try {
        await axios
          .get("/productions", {
            headers: {
              token: `Bearer ${token}`,
            },
          })
          .then((res) => {
            res.data.data.map(async (item1: any) => {
              // setTempData((prev) => [...prev, item1]);
              await axios
                .get("/productionContents", {
                  headers: {
                    token: `Bearer ${token}`,
                  },
                })
                .then((res2) => {
                  res2.data.map(async (item2: any) => {
                    await axios
                      .get(`/fishs/find/${item2.fish_id}`, {
                        headers: {
                          token: `Bearer ${token}`,
                        },
                      })
                      .then((res3) => {
                        if (item1.productionContent === item2._id) {
                          setData((prev) => [
                            ...prev,
                            {
                              name: item1.productionName,
                              fishName: res3.data.name,
                              weight: item2.weight,
                              quantity: item2.quantity,
                              date: item1.date.split("T")[0],
                            },
                          ]);
                        }
                      });
                  });
                });
            });
          });
        return Promise.resolve([]);
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    }
    getData();
  }, [token]);

  return (
    <div className="flex p-10 flex-col">
      {location.pathname === "/dataproduksi" ? (
        <>
          {/* Content Title */}
          <div className="bg-white rounded-md w-full p-5">
            <h1 className="text-lg">
              <span className="font-bold">Data Produksi</span>
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
              onClick={() => navigate("tambahproduksi")}
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
