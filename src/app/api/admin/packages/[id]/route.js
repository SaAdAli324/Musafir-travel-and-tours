import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectToDatabase from "@/lib/db";
import Package from "@/lib/models/Package";

export async function PUT(request, context) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');
    
    if (!session || session.value !== 'authenticated') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const body = await request.json();

    await connectToDatabase();
    
    // Only allow updating pricing, routePlan, and duration
    const updateData = {};
    if (body.pricing) updateData.pricing = body.pricing;
    if (body.routePlan) updateData.routePlan = body.routePlan;
    if (body.duration) updateData.duration = body.duration;

    const updatedPackage = await Package.findOneAndUpdate(
      { id },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedPackage) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Package updated successfully", package: updatedPackage });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "Failed to update package" }, { status: 500 });
  }
}
