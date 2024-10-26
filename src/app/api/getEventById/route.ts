import { prisma } from "@/server/prisma";
import { verifyToken } from "@/utils/generateToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        let userId;
        const token = req.cookies.get("token")?.value;
        if(token) {
            const requestedUser = verifyToken(token);
            userId = requestedUser?.userId
        }
    
        const { searchParams } = new URL(req.url);
        const eventId = searchParams.get("id");
    
        if(!eventId) {
            return NextResponse.json(
                { success: false, message: "Event Id is required!" },
                { status: 400 }
            );
        }
    
        const event = await prisma.event.findUnique({
            where: { id: Number(eventId) }
        });
    
        if (!event || event.userId !== userId) {
            return NextResponse.json(
                { success: false, message: "Event not found" },
                { status: 404 }
            );
        }
    
        return NextResponse.json(
            { success: true, message: "Event fetched successfully", event },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { success: false, message: error.message }
            );
        } else {
            return NextResponse.json(
                { success: false, message: "Unknown error while fetching event..." }
            );
        }
    }
};
