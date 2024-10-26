import { prisma } from "@/server/prisma";
import { verifyToken } from "@/utils/generateToken";
import { NextRequest, NextResponse } from "next/server";


interface updateEventRequestBody {
    title?: string;
    description?: string;
    eventDate?: string;
    eventTime?: string;
}

export async function POST(req: NextRequest) {
    try {
        let userId;
        const token = req.cookies.get("token")?.value;
        if(token) {
            const requestedUser = verifyToken(token);
            userId = requestedUser?.userId;
        }

        const { searchParams } = new URL(req.url);
        const eventId = searchParams.get("id");

        if(!eventId) {
            return NextResponse.json(
                { success: false, message: "Event Id is required"},
                { status: 400 }
            );
        }

        const { title, description, eventDate, eventTime } : updateEventRequestBody = await req.json();

        const updatedEvent = await prisma.event.update({
            where : { id: Number(eventId), userId: userId },
            data : { title, description, eventDate, eventTime }
        });

        if(!updatedEvent) {
            return NextResponse.json(
                { success: false, message: "Error while updating event" }
            )
        }

        return NextResponse.json(
            { success: true, message: "Event updated successfully!", updatedEvent },
            { status: 200 }
        )

    } catch (error) {
        if(error instanceof Error) {
            return NextResponse.json(
                { success: false, message: error.message }
            )
        } else {
            return NextResponse.json(
                { success: false, message: "Unknown error while updating event" }
            )
        }
    }
};
