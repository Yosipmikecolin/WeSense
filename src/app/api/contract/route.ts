import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Contract } from "../models/Contract";

export async function GET() {
  await connectDB();
  const contracts = await Contract.find();
  return NextResponse.json(contracts);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const new_contract = await Contract.create(body);
  return NextResponse.json(new_contract, { status: 201 });
}

export async function PUT(req: Request) {
  await connectDB();
  const body = await req.json();
  const data = {
    date: body.date,
    note: body.note,
    type: body.type,
    user: body.user,
  };

  const updatedAwardee = await Contract.updateOne({ _id: body._id }, data);
  return NextResponse.json(updatedAwardee, { status: 201 });
}
