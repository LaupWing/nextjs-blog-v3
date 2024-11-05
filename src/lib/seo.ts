import type { Metadata } from "next"
import { default_meta } from "@/config"

interface SeoProps extends Partial<typeof default_meta> {
    date?: string
    template_title?: string
    is_blog?: boolean
    banner?: string
    canonical?: string
    as_path?: string
}

export default function (props: SeoProps) {
    const meta = {
        ...default_meta,
        ...props,
    }

    const full_url = meta.as_path
        ? `${process.env.SITE_URL}/${meta.as_path}`
        : process.env.SITE_URL

    return {
        title: {
            default: meta.title,
            template: `%s | ${meta.title}`,
        },
        robots: meta.robots,
        description: meta.description,
        twitter: {
            card: "summary_large_image",
            site: "@laupwing",
            title: meta.title,
            description: meta.description,
            images: [meta.banner],
        },
        openGraph: {
            url: full_url,
            images: [
                {
                    url: meta.banner,
                    width: 1200,
                    height: 600,
                },
            ],
            type: meta.type,
            title: meta.title,
            siteName: meta.siteName,
            description: meta.description,
            ...(props.date
                ? {
                      publishedTime: props.date,
                      authors: ["Laup Wing"],
                  }
                : {}),
        },
        alternates: {
            canonical: meta.canonical ? meta.canonical : full_url,
        },
    } as Metadata
}
