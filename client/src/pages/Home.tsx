import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import axios from "../helper/api/axios";
import { IProduksiReport } from "../store";

export default function Home() {
  const [dataReport, setDataReport] = React.useState<IProduksiReport[]>([]);
  const year = new Date().getFullYear();
  const [month, setMonth] = React.useState<number>(new Date().getMonth() + 1);

  const fullMonth = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  // async function getProductionReports() {
  //   await axios
  //     .get(`/productions/report?month=${month}&year=${year}`, {
  //       headers: {
  //         token: `Bearer ${JSON.parse(localStorage.getItem("token") || "{}")}`,
  //       },
  //     })
  //     .then((res) => {
  //       res.data.map((item: any) => {
  //         setDataReport((prev) => [
  //           ...prev,
  //           {
  //             tanggal: `Tgl ${item._id}`,
  //             Produksi: item.total,
  //           },
  //         ]);
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  const getProductionReports = async () => {
    try {
      const response = await axios.get(
        `/productions/report?month=${month}&year=${year}`,
        {
          headers: {
            token: `Bearer ${JSON.parse(
              localStorage.getItem("token") || "{}"
            )}`,
          },
        }
      );
      const newData = response.data.map((item: any) => ({
        tanggal: `Tgl ${item._id}`,
        Produksi: item.total,
      }));
      setDataReport(newData);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getProductionReports();
  }, [month]);

  return (
    <div className="flex flex-col p-10 ">
      <div className="w-full p-5 bg-white rounded-md">
        <h1 className="text-2xl font-bold">
          Laporan Produksi Bulan {fullMonth[month - 1]} {year}
        </h1>
      </div>
      <div className="flex flex-col p-5 mt-5 bg-white rounded-md w-full">
        <div className="flex flex-row-reverse mb-10">
          <select
            className="w-1/4 p-2 rounded-md block appearance-none  bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 shadow leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setMonth(parseInt(e.target.value))}
            value={month}
          >
            {fullMonth.map((item, index) => (
              <option value={index + 1}>{item}</option>
            ))}
          </select>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            width={500}
            height={300}
            data={dataReport}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={20}
          >
            <XAxis
              dataKey="tanggal"
              scale="point"
              padding={{ left: 10, right: 10 }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar
              dataKey="Produksi"
              fill="#8884d8"
              background={{ fill: "#eee" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
