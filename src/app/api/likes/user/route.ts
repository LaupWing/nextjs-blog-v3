import { generateSessionId } from "@/lib/helpers"
import { prisma } from "@/lib/prisma"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const slug = searchParams.get("slug")!
    const session_id = generateSessionId(request)
    if (!session_id) {
        return new Response("0")
    }
    const likes = await prisma.like.count({
        where: {
            session_id,
            ContentMeta: {
                slug,
            },
        },
    })
    return new Response(likes.toString())
}
