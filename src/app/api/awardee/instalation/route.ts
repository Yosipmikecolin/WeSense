import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { AwardeeInstalacion } from "../../models/Awardee";

export async function GET() {
  await connectDB();
  const awardees = await AwardeeInstalacion.find();
  return NextResponse.json(awardees);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  console.log("DATA: ", body)
  const newAwardee = await AwardeeInstalacion.create(body);
  return NextResponse.json(newAwardee, { status: 201 });
}

export async function PUT(req: Request) {
  await connectDB();
  const body = await req.json();
  const data = {
    deviceStatus: body.deviceStatus,
    installationLocation: body.installationLocation,
    deviceType: body.deviceType,
    serialNumber: body.serialNumber,
    installationDate: body.installationDate,
  };

  const updatedAwardee = await AwardeeInstalacion.updateOne(
    { _id: body._id },
    data
  );
  return NextResponse.json(updatedAwardee, { status: 201 });
}

export async function DELETE(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") || "";
  const deletedAwardee = await AwardeeInstalacion.deleteOne({ _id: id });
  return NextResponse.json(deletedAwardee, { status: 201 });
}
