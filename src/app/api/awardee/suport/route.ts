import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { AwardeeSoporte } from "../../models/Awardee";

export async function GET() {
  await connectDB();
  const awardees = await AwardeeSoporte.find();
  return NextResponse.json(awardees);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const newAwardee = await AwardeeSoporte.create(body);
  return NextResponse.json(newAwardee, { status: 201 });
}

export async function PUT(req: Request) {
  await connectDB();
  const body = await req.json();
  const data = {
    ticketId: body.ticketId,
    openingDate: body.openingDate,
    issueType: body.issueType,
    issueDescription: body.issueDescription,
    actionsTaken: body.actionsTaken,
    ticketStatus: body.ticketStatus,
  };

  const updatedAwardee = await AwardeeSoporte.updateOne(
    { _id: body._id },
    data
  );
  return NextResponse.json(updatedAwardee, { status: 201 });
}

export async function DELETE(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") || "";
  const deletedAwardee = await AwardeeSoporte.deleteOne({ _id: id });
  return NextResponse.json(deletedAwardee, { status: 201 });
}
