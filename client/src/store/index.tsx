import { atom } from "jotai";

interface IAuth {
  token?: string;
}

interface IDataUser {
  username: string;
  password: string;
  email: string;
}

export interface IProduksiReport {
  tanggal: string;
  Produksi: number;
}

const initialAuth: IAuth = {
  token: undefined,
};

const initialDataUser: IDataUser = {
  username: "",
  password: "",
  email: "",
};

const initialProduksiReport: IProduksiReport = {
  tanggal: "",
  Produksi: 0,
};

export const authAtom = atom<IAuth>(initialAuth);
export const dataUserAtom = atom<IDataUser>(initialDataUser);
export const produksiReportAtom = atom<IProduksiReport>(initialProduksiReport);
