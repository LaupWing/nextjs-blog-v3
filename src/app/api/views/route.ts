import { prisma } from "@/lib/prisma"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const slug = searchParams.get("slug")!
    const views = await prisma.view.count({
        where: {
            ContentMeta: {
                slug: slug,
            },
        },
    })
    await new Promise((resolve) => setTimeout(resolve, 10000))
}
