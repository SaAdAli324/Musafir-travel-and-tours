import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Package from "@/lib/models/Package";
import packagesData from "@/data/packages.json";

export async function GET() {
  try {
    await connectToDatabase();
    
    // Clear existing packages
    await Package.deleteMany({});
    
    // Insert from JSON
    await Package.insertMany(packagesData);

    return NextResponse.json({ message: "Database seeded successfully", count: packagesData.length });
  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 });
  }
}
