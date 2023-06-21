import { useAtom } from "jotai";
import { LoginAsset } from "../assets";
import Button from "../components/atoms/Button";
import LoginForm from "../components/molecules/LoginForm";
import { authAtom, dataUserAtom } from "../store";
import axios from "../helper/api/axios";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const [dataUser, setDataUser] = useAtom(dataUserAtom);
  const [auth, setAuth] = useAtom(authAtom);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || "/";
  async function handleLogin() {
    setIsLoading(true);
    try {
      await axios
        .post("auth/login", {
          username: dataUser.username,
          password: dataUser.password,
        })
        .then((res) => {
          toast.success("Login Berhasil", { icon: "👏" });
          setAuth({
            token: res.data.accessToken,
          });
          localStorage.setItem("token", JSON.stringify(res.data.accessToken));

          setDataUser({
            ...dataUser,
            password: "",
          });

          localStorage.setItem("user", JSON.stringify(res.data));
          setIsLoading(false);
          setTimeout(() => {
            navigate(from, { replace: true });
          }, 2000);
        })
        .catch((err) => {
          toast.error(err.response.data);
          setIsLoading(false);
        });
    } catch (error) {
      toast.error("Login Gagal");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    console.log(auth.token);
  }, [auth]);

  return (
    <div className="flex w-full h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      {/* Right Side */}
      <div className="w-1/2 bg-blue-600 flex flex-col justify-between p-10">
        <div className="text-white font-bold flex flex-col">
          Berbagi Suara Anda
          <span>Untuk Kelestarian Ikan</span>
        </div>
        <div className="self-center">
          <LoginAsset />
        </div>
        <div className="text-white text-center">
          Daftar Dan Dukung Konservasi Laut
        </div>
      </div>
      {/* Left Side */}
      <div className="w-1/2 bg-[#E4F6FF] flex flex-col justify-center items-center space-y-5">
        <div className="text-black font-bold text-3xl">
          Selamat Datang Kembali
        </div>
        <p className="text-gray text-xs font-light">
          Masukkan detail akun Anda
        </p>
        <LoginForm />
        <div className="flex flex-row w-[300px]">
          <input type="checkbox" name="" id="" />
          <p className="text-black text-xs font-light ml-2">Remember Me?</p>
        </div>
        <Button
          title={isLoading ? "Loading..." : "Login"}
          onClick={() => handleLogin()}
          disabled={isLoading}
          className="w-[300px] bg-[#3742FA] text-white p-2 rounded-md"
        />
        <div className="text-black">
          Belum punya akun?{" "}
          <span className="text-blue-600">
            <a href="/register">Daftar Disini</a>
          </span>
        </div>
      </div>
    </div>
  );
}
