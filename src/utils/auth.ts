// import { NextRequest, NextResponse } from "next/server";
// import { verifyToken } from "@/utils/generateToken";

// export async function validateUser (req: NextRequest) {
//     const authHeader = req.headers.get("Authorization") || "";

//     try {
//         const user = await verifyToken(authHeader);
//         if(!user) {
//             return NextResponse.json(
//                 { success: false, message: "You are not Authorized" },
//                 { status : 403 }
//             )
//         }

//     } catch (error) {
//         if(error instanceof Error) {
//             return NextResponse.json(
//                 { success: false , message: error.message },
//                 { status: 500 }
//             )
//         } else {
//             return NextResponse.json(
//                 { success: false, message: "Unknown error while verify jwt..."},
//                 { status: 500 }
//             )
//         }
//     }
// }
