import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { carriers } from "@/utils";
import { Carrier } from "../../models/Carrier";

export async function GET() {
  await connectDB();

  try {
    const inserted = await Carrier.insertMany(carriers);
    return NextResponse.json({
      message: "Portadores migrados",
      data: inserted,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al migrar portadores", details: error },
      { status: 500 }
    );
  }
}
