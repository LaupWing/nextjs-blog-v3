import type { ContentType, PickFrontmatter } from "@/types/frontmatters"

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
    return await Promise.all(
        frontmatters.map(async (frontmatter) => {
            const res = await fetch(
                `${process.env.API_URL}/content/${frontmatter.slug}`
            )
            const data = await res.json()

            return {
                ...frontmatter,
                views: data.views,
                likes: data.likes,
            }
        })
    )
}
