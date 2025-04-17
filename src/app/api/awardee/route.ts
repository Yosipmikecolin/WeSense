import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Awardee } from "../models/Awardee";
import { getDate } from "@/functions";

export async function GET() {
  await connectDB();
  const awardees = await Awardee.find();
  // const awardees = await Awardee.find({
  //   type_resolution: { $nin: ["Sin estado"] },
  // });
  return NextResponse.json(awardees);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  body["date"] = new Date().toLocaleDateString();
  body["date_limit"] = getISODate(body.date_limit);
  const newAwardee = await Awardee.create(body);
  return NextResponse.json(newAwardee, { status: 201 });
}

function getISODate(date: string) {
  const fecha = new Date(date);
  return fecha.toLocaleDateString();
}

export async function PUT(req: Request) {
  await connectDB();
  const body = await req.json();
  const data = {
    type_law: body.type_law,
    rit: body.rit,
    ruc: body.ruc,
    run: body.run,
    document: body.document,
    date_limit: body.date_limit,
    type_resolution: body.type_resolution,
    status: body.status,
    denied_note: body.denied_note,
    approved_note: body.approved_note,
    resolution: body.resolution,
  };

  const updatedAwardee = await Awardee.updateOne({ _id: body._id }, data);
  return NextResponse.json(updatedAwardee, { status: 201 });
}

export async function DELETE(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") || "";
  const deletedAwardee = await Awardee.deleteOne({ _id: id });
  return NextResponse.json(deletedAwardee, { status: 201 });
}
