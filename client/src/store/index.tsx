import { atom } from "jotai";

interface IAuth {
  token?: string;
}

const initialAuth: IAuth = {
  token: undefined,
};

export const authAtom = atom<IAuth>(initialAuth);
