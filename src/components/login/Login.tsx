"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { toast } from "@/hooks/use-toast";

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
        toast({
          title: "Acceso administrador",
          className: "bg-green-100 text-green-600",
          description: "administrator@gmail.com",
          variant: "default",
        });
        navigation.push("/administrator");
      }, 500);
    } else if (username === "requiring@gmail.com" && password === "12345") {
      setLoading(true);
      localStorage.setItem("email", "requiring@gmail.com");
      setTimeout(() => {
        toast({
          title: "Acceso requirente",
          className: "bg-green-100 text-green-600",
          description: "requiring@gmail.com",
          variant: "default",
        });
        navigation.push("/requiring");
      }, 500);
    } else if (username === "coordinator@gmail.com" && password === "12345") {
      setLoading(true);
      localStorage.setItem("email", "coordinator@gmail.com");
      setTimeout(() => {
        toast({
          title: "Acceso coordinador",
          className: "bg-green-100 text-green-600",
          description: "coordinator@gmail.com",
          variant: "default",
        });
        navigation.push("/coordinator");
      }, 500);
    } else {
      toast({
        title: "Error",
        description: "Acceso denegado",
        variant: "default",
      });
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
            <Button type="submit" disabled={loading} variant={"primary"} className="w-full">
              {loading ? <div className="loader-button" /> : "Iniciar sesión"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
