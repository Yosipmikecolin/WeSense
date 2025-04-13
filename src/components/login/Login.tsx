"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

const Login = () => {
  const [code, setCode] = useState("");
  const [token, setToken] = useState("");
  const [urlCaptcha, setUrlCaptcha] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useRouter();

  const loginBuddie = async (username: string, password: string) => {
    const _CAPTCHA = code;
    setCode("");

    const response_auth = await axios.post("/api/buddie", {
      captchacode: _CAPTCHA,
      method: "auth.requires_2fa",
      username,
      password,
    });

    const response_login = await axios.post("/api/buddie", {
      captchacode: _CAPTCHA,
      method: "auth.login",
      username,
      password,
    });

    const response_user = await axios.get(`/api/buddie?method=user.read`);
    setToken(response_user.data.csrf_token);

    // console.log("AUTH: ", response_auth.data);
    console.log("LOGIN: ", response_login.data);
    // console.log("USER: ", response_user.data);

    if (!response_login.data.login) {
      setUrlCaptcha("");
      getCaptcha();
      toast({
        title: "Error",
        description: "Captcha incorrecto",
        variant: "default",
      });
      setLoading(false);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username === "administrator@gmail.com" && password === "12345") {
      setLoading(true);
      const is_valid = await loginBuddie(
        "yosip.parrado@wesense.com.co",
        "Yp2025$pY"
      );
      if (is_valid) {
        localStorage.setItem("email", "administrator@gmail.com");
        setTimeout(() => {
          toast({
            title: "Acceso administrador",
            description: "administrator@gmail.com",
          });
          navigation.push("/administrator");
        }, 500);
      }
    } else if (username === "requiring@gmail.com" && password === "12345") {
      setLoading(true);

      const is_valid = await loginBuddie(
        "yosip.parrado@wesense.com.co",
        "Yp2025$pY"
      );
      if (is_valid) {
        localStorage.setItem("email", "requiring@gmail.com");
        setTimeout(() => {
          toast({
            title: "Acceso requirente",
            description: "requiring@gmail.com",
          });
          navigation.push("/requiring");
        }, 500);
      }
    } else if (username === "coordinator@gmail.com" && password === "12345") {
      setLoading(true);
      const is_valid = await loginBuddie(
        "yosip.parrado@wesense.com.co",
        "Yp2025$pY"
      );
      if (is_valid) {
        localStorage.setItem("email", "coordinator@gmail.com");
        setTimeout(() => {
          toast({
            title: "Acceso coordinador",
            description: "coordinator@gmail.com",
          });
          navigation.push("/coordinator");
        }, 500);
      }
    } else if (username === "awardee@gmail.com" && password === "12345") {
      setLoading(true);
      const is_valid = await loginBuddie(
        "yosip.parrado@wesense.com.co",
        "Yp2025$pY"
      );
      if (is_valid) {
        localStorage.setItem("email", "awardee@gmail.com");
        setTimeout(() => {
          toast({
            title: "Acceso adjudicatorio",
            description: "awardee@gmail.com",
          });
          navigation.push("/awardee");
        }, 500);
      }
    } else if (username === "contract@gmail.com" && password === "12345") {
      setLoading(true);
      const is_valid = await loginBuddie(
        "yosip.parrado@wesense.com.co",
        "Yp2025$pY"
      );
      if (is_valid) {
        localStorage.setItem("email", "contract@gmail.com");
        setTimeout(() => {
          toast({
            title: "Acceso adjudicatorio",
            description: "contract@gmail.com",
          });
          navigation.push("/contract");
        }, 500);
      }
    } else {
      toast({
        title: "Error",
        description: "Acceso denegado",
        variant: "default",
      });
    }
  };

  const getCaptcha = async () => {
    const captchaRes = await axios.get(
      `/api/buddie?method=auth.get_captcha_details`
    );
    setUrlCaptcha(captchaRes.data.image);
  };

  const reloadCaptcha = () => {
    setUrlCaptcha("");
    getCaptcha();
  };

  useEffect(() => {
    getCaptcha();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-3">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Iniciar sesión
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-700"
              >
                Usuario
              </label>
              <Input
                id="username"
                type="text"
                placeholder="Ingrese su usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>
            <div className="space-y-2">
              {urlCaptcha ? (
                <div className="flex flex-col text-center">
                  <img src={urlCaptcha} alt="Captcha" />
                  <button
                    className="mt-2 underline hover:text-green-500"
                    onClick={reloadCaptcha}
                  >
                    Reload captcha
                  </button>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
            <div className="space-y-2">
              <label
                htmlFor="code"
                className="text-sm font-medium text-gray-700"
              >
                Captcha
              </label>
              <Input
                id="code"
                type="code"
                placeholder="Ingrese el captcha"
                value={code}
                maxLength={5}
                onChange={(e) => setCode(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              variant={"primary"}
              className="w-full"
            >
              {loading ? <div className="loader-button" /> : "Iniciar sesión"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
