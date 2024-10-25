// import { prisma } from "@/server/prisma";
// import { NextRequest, NextResponse } from "next/server";

// interface createEventRequestBody {
//     title: string;
//     description?: string;
//     eventDate: Date;
//     eventTime: string;
// }

// export async function POST(req: NextRequest) {
//     try {
//         const { title, description, eventDate, eventTime } : createEventRequestBody = await req.json() as createEventRequestBody;

//         if(!title || !eventDate || !eventTime) {
//             return NextResponse.json(
//                 { success: false, message: "Fields are required!" }
//             )
//         }

//         const event = await prisma.event.create({
//             data: {
//                 title : title,
//                 description : description,
//                 eventDate : eventDate,
//                 eventTime : eventTime
//             }
//         })

//     } catch (error) {
//         if(error instanceof Error) {
//             return NextResponse.json(
//                 { success: false, message: error.message }
//             )
//         } else {
//             return NextResponse.json(
//                 { success: false, message: "Unknown error while creating event..."}
//             )
//         }
//     }
// };
