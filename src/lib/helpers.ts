import type { ContentType, PickFrontmatter } from "@/types/frontmatters"
import { prisma } from "./prisma"

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
    const slug = frontmatters[0].slug
    console.log(frontmatters[0].slug)
    console.log(
        await prisma.contentMeta.upsert({
            where: {
                slug,
            },
            update: {
                slug,
            },
            create: {
                slug,
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
    )
    return await Promise.all(
        frontmatters.map(async (frontmatter) => {
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
            return {
                ...frontmatter,
                views: data._count.View,
                likes: data._count.Like,
            }
        })
    )
    // return await Promise.all(
    //     frontmatters.map(async (frontmatter) => {
    //         const res = await fetch(
    //             `${process.env.API_URL}/content/${frontmatter.slug}`
    //         )
    //         const data = await res.json()

    //         return {
    //             ...frontmatter,
    //             views: data.views,
    //             likes: data.likes,
    //         }
    //     })
    // )
}
