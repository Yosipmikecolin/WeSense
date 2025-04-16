import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { AwardeeResolucion } from "../../models/Awardee";

export async function GET() {
  await connectDB();
  const awardees = await AwardeeResolucion.find();
  return NextResponse.json(awardees);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const newAwardee = await AwardeeResolucion.create(body);
  return NextResponse.json(newAwardee, { status: 201 });
}

export async function PUT(req: Request) {
  await connectDB();
  const body = await req.json();
  const data = {
    resolutionNumber: body.resolutionNumber,
    issuanceDate: body.issuanceDate,
    resolutionType: body.resolutionType,
    resolutionContent: body.resolutionContent,
    implementationStatus: body.implementationStatus,
  };

  const updatedAwardee = await AwardeeResolucion.updateOne(
    { _id: body._id },
    data
  );
  return NextResponse.json(updatedAwardee, { status: 201 });
}

export async function DELETE(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") || "";
  const deletedAwardee = await AwardeeResolucion.deleteOne({ _id: id });
  return NextResponse.json(deletedAwardee, { status: 201 });
}
