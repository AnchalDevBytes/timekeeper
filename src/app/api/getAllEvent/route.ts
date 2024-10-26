import { prisma } from "@/server/prisma";
import { verifyToken } from "@/utils/generateToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest) {
    try {
        let userId;
        const token = req.cookies.get("token")?.value;
        if(token) {
            const requestedUser = verifyToken(token);
            userId = requestedUser?.userId
        }

        const events = await prisma.event.findMany({
            where : { userId : userId }
        });
        
        if(!events) {
            return NextResponse.json(
                { success: false, message: "Error while retrieving events" }
            );
        }

        return NextResponse.json(
            { success: true, message: "successfully retrieve all events!", events },
            { status: 200 }
        );

    } catch (error) {
        if(error instanceof Error) {
            return NextResponse.json(
                { success: false, message: error.message }
            )
        } else {
            return NextResponse.json(
                { success: false, message: "Unknown error while retrieving events..." }
            )
        }
    }
};
