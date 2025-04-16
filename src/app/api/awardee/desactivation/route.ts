import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { AwardeeDesactivacion } from "../../models/Awardee";

export async function GET() {
  await connectDB();
  const awardees = await AwardeeDesactivacion.find();
  return NextResponse.json(awardees);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const newAwardee = await AwardeeDesactivacion.create(body);
  return NextResponse.json(newAwardee, { status: 201 });
}

export async function PUT(req: Request) {
  await connectDB();
  const body = await req.json();
  const data = {
    deviceId: body.deviceId,
    deactivationDate: body.deactivationDate,
    deactivationReason: body.deactivationReason,
    deviceStatus: body.deviceStatus,
    comments: body.comments,
  };

  const updatedAwardee = await AwardeeDesactivacion.updateOne(
    { _id: body._id },
    data
  );
  return NextResponse.json(updatedAwardee, { status: 201 });
}

export async function DELETE(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") || "";
  const deletedAwardee = await AwardeeDesactivacion.deleteOne({ _id: id });
  return NextResponse.json(deletedAwardee, { status: 201 });
}
