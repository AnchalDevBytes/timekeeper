import { prisma } from "@/server/prisma";
import { verifyToken } from "@/utils/generateToken";
import { NextRequest, NextResponse } from "next/server";

interface createEventRequestBody {
    title: string;
    description?: string;
    eventDate: string;
    eventTime: string;
}

export async function POST(req: NextRequest) {
    try {
        let userId;
        const token = req.cookies.get("token")?.value;
        if(token) {
            const requestedUser = verifyToken(token);
            userId = requestedUser?.userId
        }
        
        const { title, description, eventDate, eventTime } : createEventRequestBody = await req.json();

        if(!title || !eventDate || !eventTime) {
            return NextResponse.json(
                { success: false, message: "Fields are required!" }
            )
        }

        const overlappingEvent = await prisma.event.findFirst({
            where : {
                userId,
                eventDate : eventDate,
                eventTime : eventTime
            },
        });

        if(overlappingEvent) {
            return NextResponse.json({
                success : false,
                message : "An event is already exists at this time",
            });
        }

        const event = await prisma.event.create({
            data: {
                title : title,
                description : description,
                eventDate : eventDate,
                eventTime : eventTime,
                userId : userId
            }
        });

        if(!event) {
            return NextResponse.json({
                success: false,
                message: "Error while creating event"
            })
        }

        return NextResponse.json(
            { success: true, message: "Event created successfully!", event : event },
            { status: 200 }
        )

    } catch (error) {
        if(error instanceof Error) {
            return NextResponse.json(
                { success: false, message: error.message }
            )
        } else {
            return NextResponse.json(
                { success: false, message: "Unknown error while creating event..."}
            )
        }
    }
};
