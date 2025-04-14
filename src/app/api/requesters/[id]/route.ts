import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Requester } from "../../models/Requester"; 

type Params = {
  params: {
    id: string;
  };
};

export async function GET(_req: NextRequest, { params }: Params) {
  await connectDB();
  const user = await Requester.findById(params.id);
  if (!user) {
    return NextResponse.json({ error: "Requirente no encontrado" }, { status: 404 });
  }
  return NextResponse.json(user);
}

export async function PUT(req: NextRequest, { params }: Params) {
  await connectDB();
  const body = await req.json();
  const updatedUser = await Requester.findByIdAndUpdate(params.id, body, { new: true });
  if (!updatedUser) {
    return NextResponse.json({ error: "Requirente no encontrado" }, { status: 404 });
  }
  return NextResponse.json(updatedUser);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  await connectDB();
  const deletedUser = await Requester.findByIdAndDelete(params.id);
  if (!deletedUser) {
    return NextResponse.json({ error: "Requirente no encontrado" }, { status: 404 });
  }
  return NextResponse.json({ message: "Requirente eliminado" });
}
