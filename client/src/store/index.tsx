import { atom } from "jotai";

interface IAuth {
  token?: string;
}

interface IDataUser {
  username: string;
  password: string;
  email: string;
}

const initialAuth: IAuth = {
  token: undefined,
};

const initialDataUser: IDataUser = {
  username: "",
  password: "",
  email: "",
};

export const authAtom = atom<IAuth>(initialAuth);
export const dataUserAtom = atom<IDataUser>(initialDataUser);
