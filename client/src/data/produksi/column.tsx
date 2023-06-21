"use client";

import { ColumnDef } from "@tanstack/react-table";

export type IProduksi = {
  name: string;
  fishName: string;
  weight: number;
  quantity: number;
  date: string;
};

export const columns: ColumnDef<IProduksi>[] = [
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "fishName",
    header: "Nama Ikan",
  },
  {
    accessorKey: "weight",
    header: "Berat (KG)",
  },
  {
    accessorKey: "quantity",
    header: "Kuantitas",
  },
  {
    accessorKey: "date",
    header: "Tanggal Produksi",
  },
];
