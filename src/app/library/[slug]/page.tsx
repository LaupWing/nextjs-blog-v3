import type { FC } from "react"
import type { TechListType } from "@/components/TechIcons.client"
import { TechIcons } from "@/components/TechIcons.client"
import { Likes } from "@/components/elements/Likes.client"
import { Views } from "@/components/elements/Views.client"
import { getFileBySlug, getFiles } from "@/lib/mdx"
import { LibraryFrontmatter } from "@/types/frontmatters"
import { Content } from "@/components/sections/Content.client"
import { TableContents } from "@/components/sections/TableContents.client"
import { Metadata } from "next"
import seo from "@/lib/seo"

export const dynamicParams = false

export let revalidate = 0

export async function generateStaticParams() {
    const posts = await getFiles("library")

    return posts.map((p) => ({
        slug: p.replace(/\.mdx/, ""),
    }))
}

const fetchPost = async (slug: string) => {
    const post = await getFileBySlug("library", slug)
    return post as {
        code: string
        frontmatter: LibraryFrontmatter
    }
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const { slug } = await props.params
    const post = await fetchPost(slug)
    const { frontmatter } = post

    return {
        ...seo({
            title: frontmatter.title,
            description: frontmatter.description,
            banner: `${process.env.API_URL}/og/gradient?title=${frontmatter.title}&description=${frontmatter.description}`,
        }),
    }
}

interface PageProps {
    params: Promise<{ slug: string }>
}

const SingleLibraryPage = async (props: PageProps) => {
    const { slug } = await props.params
    const post = await fetchPost(slug)
    const { frontmatter, code } = post
    return (
        <main className="custom-container">
            <Hero frontmatter={frontmatter} />
            <hr className="dark:border-gray-600" />
            <section className="lg:grid pt-4 pb-8 lg:grid-cols-[auto,250px] w-full lg:gap-8">
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
export default SingleLibraryPage

interface HeroProps {
    frontmatter: LibraryFrontmatter
}

const Hero: FC<HeroProps> = ({ frontmatter }) => {
    return (
        <div className="border-b pb-4 dark:border-gray-600">
            <h1 className="dark:text-white">{frontmatter.title}</h1>
            <p className="mt-2 text-sm border-gray-600 dark:text-gray-300">
                {frontmatter.description}
            </p>
            <div className="mt-2 flex items-center justify-start gap-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                <Views slug={frontmatter.slug} />
                <span>•</span>
                <TechIcons
                    techs={frontmatter.tags.split(",") as Array<TechListType>}
                />
            </div>
        </div>
    )
}
