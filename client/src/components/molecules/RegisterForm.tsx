import { useAtom } from "jotai";
import { ChangeEvent } from "react";
import { dataUserAtom } from "../../store";
import Input from "../atoms/Input";
export default function RegisterForm() {
  const [dataUser, setDataUser] = useAtom(dataUserAtom);

  return (
    <form action="" className="space-y-5">
      <Input
        type="email"
        placeholder="Masukan Username Anda"
        label="Username"
        value={dataUser.username}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setDataUser({ ...dataUser, username: e.target.value })
        }
      />
      <Input
        type="text"
        placeholder="Masukan Email Anda"
        label="Email"
        value={dataUser.email}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setDataUser({ ...dataUser, email: e.target.value })
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
