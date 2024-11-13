import type { Metadata } from "next"
import { IconClock, IconHistory } from "@/components/Icons"
import { Accent } from "@/components/elements/Accent"
import { Likes } from "@/components/elements/Likes.client"
import { Views } from "@/components/elements/Views.client"
import { CloudinaryImage } from "@/components/images/CloudinaryImage.client"
import { UnstyledLink } from "@/components/links/UnstyledLink.client"
import { TableContents } from "@/components/sections/TableContents.client"
import { Content } from "@/components/sections/Content.client"
import { getFileBySlug, getFiles } from "@/lib/mdx"
import { BlogFrontmatter } from "@/types/frontmatters"
import { format } from "date-fns"
import { FC } from "react"
import seo from "@/lib/seo"

export const dynamicParams = false

export const revalidate = 0

export async function generateStaticParams() {
    const posts = await getFiles("blog")

    return posts.map((p) => ({
        slug: p.replace(/\.mdx/, ""),
    }))
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const { slug } = await props.params
    const post = await fetchPost(slug)
    const { frontmatter } = post

    const OG_BANNER_LINK = `https://res.cloudinary.com/laupwing/image/upload/f_auto,c_fill,ar_12:8,w_1200/${frontmatter.banner}`

    return {
        ...seo({
            is_blog: true,
            banner: OG_BANNER_LINK,
            template_title: frontmatter.title,
            title: frontmatter.title,
            description: frontmatter.description,
        }),
    }
}

const fetchPost = async (slug: string) => {
    const post = await getFileBySlug("blog", slug)
    return post as {
        code: string
        frontmatter: BlogFrontmatter
    }
}

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

const SingleBlogPage = async (props: PageProps) => {
    const { slug } = await props.params
    const post = await fetchPost(slug)
    const { frontmatter, code } = post

    return (
        <main className="custom-container">
            <Hero frontmatter={frontmatter} slug={slug} />
            <hr className="dark:border-gray-600" />
            <section className="lg:grid pt-4 pb-8 lg:grid-cols-[auto,250px] lg:gap-8">
                <Content code={code} />
                <aside className="py-4">
                    <div className="sticky top-24">
                        <TableContents slug={frontmatter.slug} />
                        <div className="flex items-center justify-center py-8">
                            <Likes slug={frontmatter.slug} />
                        </div>
                    </div>
                </aside>
            </section>
        </main>
    )
}

export default SingleBlogPage

interface HeroProps {
    frontmatter: BlogFrontmatter
    slug: string
}

const Hero: FC<HeroProps> = async ({ frontmatter, slug }) => {
    const COMMIT_HISTORY_LINK = `https://github.com/LaupWing/tech-blog/commits/main/src/contents/blog/${frontmatter.slug}.mdx`

    return (
        <div className="pb-4">
            <CloudinaryImage
                public_id={frontmatter.banner}
                alt="Bike"
                width={1400}
                height={(1400 * 2) / 5}
                aspect={{
                    height: 2,
                    width: 5,
                }}
            />
            <h1 className="mt-4 dark:text-light">{frontmatter.title}</h1>
            <p>{frontmatter.description}</p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Writton on{" "}
                {format(new Date(frontmatter.publishedAt), "MMMM dd, yyyy")} by
                Laup Wing
            </p>
            {frontmatter.lastUpdated && (
                <div className="mt-2 flex flex-wrap gap-2 text-sm text-gray-700 dark:text-gray-200">
                    <p>
                        Last updated{" "}
                        {format(
                            new Date(frontmatter.lastUpdated),
                            "MMMM dd, yyyy"
                        )}
                        .
                    </p>
                    <UnstyledLink
                        href={COMMIT_HISTORY_LINK}
                        className="inline-flex items-center gap-1 rounded-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-accent-light focus:outline-none focus-visible:ring focus-visible:ring-accent-dark"
                    >
                        <IconHistory className="text-lg" />
                        <span>See changes</span>
                    </UnstyledLink>
                </div>
            )}
            <div className="mt-6 flex items-center justify-start gap-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-1">
                    <IconClock className="inline-block text-base" />
                    <Accent>{frontmatter.readingTime.text}</Accent>
                </div>
                <div className="flex items-center gap-1">
                    <Views slug={slug} />
                </div>
            </div>
        </div>
    )
}
