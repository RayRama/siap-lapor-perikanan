import { useAtom } from "jotai";
import { RegisterAsset } from "../assets";
import Button from "../components/atoms/Button";
import RegisterForm from "../components/molecules/RegisterForm";
import { dataUserAtom } from "../store";
import axios from "../helper/api/axios";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Register() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataUser, setDataUser] = useAtom(dataUserAtom);
  const navigate = useNavigate();

  // create a regex to check email and only accept lower case
  const emailChecker = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$");

  async function handleRegister() {
    if (!dataUser.email || !dataUser.password || !dataUser.username) {
      toast.error("Data tidak boleh kosong", {
        icon: "❌",
      });
      return;
    }

    if (!emailChecker.test(dataUser.email)) {
      toast.error("Format email salah", {
        icon: "❌",
      });
      return;
    }

    setLoading(true);
    try {
      await axios.post("/auth/register", dataUser).then((res) => {
        toast.success("Berhasil Mendaftar", {
          icon: "✅",
        });

        setLoading(false);

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      });
    } catch (error) {
      console.log(error);
      toast.error("Gagal Mendaftar", {
        icon: "❌",
      });
      setLoading(false);
    }
  }

  return (
    <div className="flex w-full h-screen">
      <Toaster reverseOrder={false} position="top-center" />
      {/* Right Side */}
      <div className="w-1/2 bg-blue-600 md:flex flex-col justify-between p-10 hidden">
        <div className="text-white font-bold flex flex-col">
          Berbagi Suara Anda
          <span>Untuk Kelestarian Ikan</span>
        </div>

        <div className="self-center">
          <RegisterAsset />
        </div>
        <div className="text-white text-center">
          Daftar Dan Dukung Konservasi Laut
        </div>
      </div>
      {/* Left Side */}
      <div className="md:w-1/2 w-full bg-[#E4F6FF] flex flex-col justify-center items-center space-y-5">
        <div className="text-black font-bold text-3xl text-center">
          Buat Akun Baru Anda
        </div>
        <p className="text-gray text-xs font-light text-center">
          Lengkapi form di bawah dengan menggunakan data Anda yang valid
        </p>
        <RegisterForm />
        <Button
          title={loading ? "Loading..." : "Register"}
          onClick={() => handleRegister()}
          className="w-[300px] bg-[#3742FA] text-white p-2 rounded-md"
        />
        <div className="text-black">
          Sudah punya akun?{" "}
          <span className="text-blue-600">
            <a href="/login">Masuk Disini</a>
          </span>
        </div>
      </div>
    </div>
  );
}
