import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Package from "@/lib/models/Package";

export async function GET() {
  try {
    await connectToDatabase();
    const packages = await Package.find({}).lean();
    return NextResponse.json(packages);
  } catch (error) {
    console.error("Error fetching packages:", error);
    return NextResponse.json({ error: "Failed to fetch packages" }, { status: 500 });
  }
}
