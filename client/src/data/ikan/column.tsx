"use client";

import { ColumnDef } from "@tanstack/react-table";

export type IIkan = {
  _id: string;
  name: string;
  image: string;
};

export const columns: ColumnDef<IIkan>[] = [
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "image",
    header: "Gambar",
  },
];
