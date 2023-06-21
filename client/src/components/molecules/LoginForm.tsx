import { useAtom } from "jotai";
import { ChangeEvent } from "react";
import { dataUserAtom } from "../../store";
import Input from "../atoms/Input";

export default function LoginForm() {
  const [dataUser, setDataUser] = useAtom(dataUserAtom);

  return (
    <form action="" className="space-y-5">
      <Input
        type="text"
        placeholder="Masukan Username Anda"
        label="Username"
        value={dataUser.username}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setDataUser({ ...dataUser, username: e.target.value })
        }
      />
      <Input
        type="password"
        placeholder="Masukan Password Anda"
        label="Password"
        value={dataUser.password}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setDataUser({ ...dataUser, password: e.target.value })
        }
      />
    </form>
  );
}
