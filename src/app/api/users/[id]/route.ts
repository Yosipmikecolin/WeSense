import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "../../models/User";

export async function GET(_request: Request, context: { params: { id: string } }) {
  await connectDB();
  const user = await User.findById(context.params.id);
  if (!user) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
  }
  return NextResponse.json(user);
}

export async function PUT(request: Request, context: { params: { id: string } }) {
  await connectDB();
  const body = await request.json();
  const updatedUser = await User.findByIdAndUpdate(context.params.id, body, { new: true });
  if (!updatedUser) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
  }
  return NextResponse.json(updatedUser);
}

export async function DELETE(_request: Request, context: { params: { id: string } }) {
  await connectDB();
  const deletedUser = await User.findByIdAndDelete(context.params.id);
  if (!deletedUser) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
  }
  return NextResponse.json({ message: "Usuario eliminado" });
}
