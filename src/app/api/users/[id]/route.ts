import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "../../models/User";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const user = await User.findById(params.id);
  if (!user) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
  }
  return NextResponse.json(user);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const body = await req.json();
  const updatedUser = await User.findByIdAndUpdate(params.id, body, { new: true });
  if (!updatedUser) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
  }
  return NextResponse.json(updatedUser);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const deletedUser = await User.findByIdAndDelete(params.id);
  if (!deletedUser) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
  }
  return NextResponse.json({ message: "Usuario eliminado" });
}
