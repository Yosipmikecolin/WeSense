"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import toast from "react-hot-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "administrator@gmail.com" && password === "12345") {
      setLoading(true);
      localStorage.setItem("email", "administrator@gmail.com");
      setTimeout(() => {
        toast.success("Acceso administrador");
        navigation.push("/administrator");
      }, 1000);
    } else if (username === "requiring@gmail.com" && password === "12345") {
      setLoading(true);
      localStorage.setItem("email", "requiring@gmail.com");
      setTimeout(() => {
        toast.success("Acceso requirente");
        navigation.push("/requiring");
      }, 1000);
    } else if (username === "coordinator@gmail.com" && password === "12345") {
      setLoading(true);
      localStorage.setItem("email", "coordinator@gmail.com");
      setTimeout(() => {
        toast.success("Acceso coordinador");
        navigation.push("/coordinator");
      }, 1000);
    } else {
      toast.error("Acceso denegado");
    }
  };

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
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-green-200 hover:bg-green-300 text-green-800 font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform"
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
