"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const users = [
  { id: 1, name: "Juan Pérez" },
  { id: 2, name: "María García" },
  { id: 3, name: "Carlos Rodríguez" },
];

export default function EventForm() {
  const [formData, setFormData] = useState({
    type: "",
    date: "",
    note: "",
    user: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Creación de eventos e incidencias</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Tipo de evento</Label>
            <Input id="type" name="type" onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Fecha de incidencia</Label>
            <Input
              id="date"
              name="date"
              type="date"
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="note">Nota</Label>
            <Textarea id="note" name="note" onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="user">Usuario</Label>
            <Select
              name="user"
              onValueChange={(value) =>
                setFormData({ ...formData, user: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un usuario" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id.toString()}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" variant={"primary"}>
            Crear Incidencia
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
