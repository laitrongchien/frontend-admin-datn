"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { login } from "@/store/features/authSlice";

const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [passwordShown, setPasswordShown] = useState(false);
  const { user, loading } = useAppSelector((state) => state.auth);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  useEffect(() => {
    if (user) {
      toast.success("Đăng nhập thành công");
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className="relative flex-center h-screen p-6 bg-[url('https://res.cloudinary.com/dufuwsrue/image/upload/v1715966233/rwd_img_wide_001_xigkl2.jpg')] bg-no-repeat bg-cover bg-center">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="bg-white md:w-[500px] p-10 rounded-lg shadow z-10">
        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-4">
          Đăng nhập
        </h1>
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="mb-8">
            <label htmlFor="email" className="block text-gray-900 mb-1">
              Email của bạn
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@gmail.com"
              className="form-input w-full"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-8">
            <label htmlFor="password" className="block text-gray-900 mb-1">
              Mật khẩu
            </label>
            <div className="relative">
              <input
                type={passwordShown ? "text" : "password"}
                id="password"
                name="password"
                placeholder="••••••••"
                className="form-input w-full"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
              {passwordShown ? (
                <FaRegEye
                  size={22}
                  color="#888"
                  className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer"
                  onClick={() => setPasswordShown(false)}
                />
              ) : (
                <FaRegEyeSlash
                  size={22}
                  color="#888"
                  className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer"
                  onClick={() => setPasswordShown(true)}
                />
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-primary hover:bg-blue-400 text-white py-2 rounded-lg mb-4 flex-center"
          >
            {loading ? (
              <TailSpin
                height="20"
                width="20"
                color="white"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            ) : (
              "Đăng nhập"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
