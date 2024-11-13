import { prisma } from "@/lib/prisma"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const slug = searchParams.get("slug")!
    const likes = await prisma.like.count({
        where: {
            ContentMeta: {
                slug: slug,
            },
        },
    })

    return new Response(likes.toString())
}
