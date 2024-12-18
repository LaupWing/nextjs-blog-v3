import type { ContentType, PickFrontmatter } from "@/types/frontmatters"
import { prisma } from "./prisma"
import { NextRequest } from "next/server"
import { createHash } from "crypto"

interface OpenGraphType {
    site_name: string
    description: string
    template_title?: string
    logo?: string
    banner?: string
    is_blog?: boolean
}

export const openGraph = ({
    site_name,
    template_title,
    description,
    banner,
    logo = `${process.env.SITE_URL}/images/logo.png`,
    is_blog = false,
}: OpenGraphType): string => {
    const og_logo = encodeURIComponent(logo)
    const og_sitename = encodeURIComponent(site_name.trim())
    const og_template_title = template_title
        ? encodeURIComponent(template_title.trim())
        : undefined
    const og_description = encodeURIComponent(description.trim())

    if (is_blog) {
        const og_banner = banner ? encodeURIComponent(banner.trim()) : undefined

        return `${process.env.SITE_URL}/api/og/blog?templateTitle=${og_template_title}&banner=${og_banner}`
    }

    return `${
        process.env.SITE_URL
    }/api/og/gradient?siteName=${og_sitename}&description=${og_description}&logo=${og_logo}${
        og_template_title ? `&templateTitle=${og_template_title}` : ""
    }`
}

export const getFromSessionStorage = (key: string) => {
    if (typeof sessionStorage !== "undefined") {
        return sessionStorage.getItem(key)
    }
    return null
}

export const attachContentMeta = async <T extends ContentType>(
    frontmatters: Array<PickFrontmatter<T>>
) => {
    const results = []

    for (const frontmatter of frontmatters) {
        const data = await prisma.contentMeta.upsert({
            where: {
                slug: frontmatter.slug,
            },
            update: {
                slug: frontmatter.slug,
            },
            create: {
                slug: frontmatter.slug,
            },
            include: {
                _count: {
                    select: {
                        Like: true,
                        View: true,
                    },
                },
            },
        })

        results.push({
            ...frontmatter,
            views: data._count.View,
            likes: data._count.Like,
        })
        prisma.$disconnect()
    }

    return results
}

export function generateSessionId(req: NextRequest): string {
    const ip_address = req.headers.get("x-forwarded-for") || "0.0.0.0"
    const salt = process.env.IP_ADDRESS_SALT || "SOME_SALT"

    const current_user_id = createHash("md5")
        .update(ip_address + salt, "utf8")
        .digest("hex")

    return current_user_id
}
