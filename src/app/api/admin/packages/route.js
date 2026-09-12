import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectToDatabase from "@/lib/db";
import Package from "@/lib/models/Package";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');
    
    if (!session || session.value !== 'authenticated') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const packages = await Package.find({}, 'id title type duration pricing routePlan').lean();
    return NextResponse.json(packages);
  } catch (error) {
    console.error("API GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch packages" }, { status: 500 });
  }
}
