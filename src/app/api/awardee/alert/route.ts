import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { AwardeeAlarmas } from "../../models/Awardee";

export async function GET() {
  await connectDB();
  const awardees = await AwardeeAlarmas.find();
  return NextResponse.json(awardees);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const newAwardee = await AwardeeAlarmas.create(body);
  return NextResponse.json(newAwardee, { status: 201 });
}

export async function PUT(req: Request) {
  await connectDB();
  const body = await req.json();
  const data = {
    alarmId: body.alarmId,
    alarmDateTime: body.alarmDateTime,
    alarmType: body.alarmType,
    alarmDescription: body.alarmDescription,
    actionTaken: body.actionTaken,
    resolutionStatus: body.resolutionStatus,
  };

  const updatedAwardee = await AwardeeAlarmas.updateOne(
    { _id: body._id },
    data
  );
  return NextResponse.json(updatedAwardee, { status: 201 });
}

export async function DELETE(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") || "";
  const deletedAwardee = await AwardeeAlarmas.deleteOne({ _id: id });
  return NextResponse.json(deletedAwardee, { status: 201 });
}
