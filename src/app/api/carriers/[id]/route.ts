import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Carrier } from "../../models/Carrier";

export async function GET(_req: Request, context: { params: { id: string } }) {
  await connectDB();
  const user = await Carrier.findById(context.params.id);
  if (!user) return NextResponse.json({ error: "Portador no encontrado" }, { status: 404 });
  return NextResponse.json(user);
}

export async function PUT(req: Request, context: { params: { id: string } }) {
  await connectDB();
  const body = await req.json();
  const updatedUser = await Carrier.findByIdAndUpdate(context.params.id, body, { new: true });
  if (!updatedUser) return NextResponse.json({ error: "Portador no encontrado" }, { status: 404 });
  return NextResponse.json(updatedUser);
}

export async function DELETE(_req: Request, context: { params: { id: string } }) {
  await connectDB();
  const deletedUser = await Carrier.findByIdAndDelete(context.params.id);
  if (!deletedUser) return NextResponse.json({ error: "Portador no encontrado" }, { status: 404 });
  return NextResponse.json({ message: "Portador eliminado" });
}
