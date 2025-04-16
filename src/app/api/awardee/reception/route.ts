import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { AwardeeRecepcion } from "../..//models/Awardee";

export async function GET() {
  await connectDB();
  const awardees = await AwardeeRecepcion.find();
  return NextResponse.json(awardees);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const newAwardee = await AwardeeRecepcion.create(body);
  return NextResponse.json(newAwardee, { status: 201 });
}

export async function PUT(req: Request) {
  await connectDB();
  const body = await req.json();
  console.log("DATA: ", body);
  const data = {
    caseNumber: body.caseNumber,
    receptionDate: body.receptionDate,
    documentType: body.documentType,
    documentContent: body.documentContent,
  };

  const updatedAwardee = await AwardeeRecepcion.updateOne(
    { _id: body._id },
    data
  );
  return NextResponse.json(updatedAwardee, { status: 201 });
}

export async function DELETE(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") || "";
  const deletedAwardee = await AwardeeRecepcion.deleteOne({ _id: id });
  return NextResponse.json(deletedAwardee, { status: 201 });
}
