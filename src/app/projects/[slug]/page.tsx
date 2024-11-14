import type { FC } from "react"
import type { ProjectFrontmatter } from "@/types/frontmatters"
import type { Metadata } from "next"

import { IconGithub, IconLink } from "@/components/Icons"
import { Likes } from "@/components/elements/Likes.client"
import { CloudinaryImage } from "@/components/images/CloudinaryImage.client"
import { CustomLink } from "@/components/links/CustomLink"
import { Content } from "@/components/sections/Content.client"
import { TableContents } from "@/components/sections/TableContents.client"
import { getFileBySlug, getFiles } from "@/lib/mdx"
import { Views } from "@/components/elements/Views.client"
import seo from "@/lib/seo"
import { TechIcons, TechListType } from "@/components/TechIcons.client"

export const dynamicParams = false
export let revalidate = 0

const fetchProject = async (slug: string) => {
    const post = await getFileBySlug("projects", slug)

    return post as {
        code: string
        frontmatter: ProjectFrontmatter
    }
}

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const post = await fetchProject((await props.params).slug)
    const { frontmatter } = post

    return {
        ...seo({
            title: frontmatter.title,
            description: frontmatter.description,
        }),
    }
}

const SingleProjectPage = async (props: PageProps) => {
    const { frontmatter, code } = await fetchProject((await props.params).slug)

    return (
        <section className="custom-container">
            <Hero frontmatter={frontmatter} slug={frontmatter.slug} />
            <hr className="mt-4 dark:border-gray-600" />
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
        </section>
    )
}
export default SingleProjectPage

export async function generateStaticParams() {
    const posts = await getFiles("projects")

    return posts.map((p) => ({
        slug: p.replace(/\.mdx/, ""),
    }))
}

interface HeroProps {
    frontmatter: ProjectFrontmatter
    slug: string
}

const Hero: FC<HeroProps> = ({ frontmatter, slug }) => {
    return (
        <div>
            <div className="relative">
                <CloudinaryImage
                    public_id={frontmatter.banner}
                    alt={frontmatter.title}
                    width={1440}
                    height={750}
                />
                <TechIcons
                    className="absolute bottom-4 left-4"
                    techs={frontmatter.techs.split(",") as Array<TechListType>}
                />
            </div>
            <h1 className="dark:text-white mt-4">{frontmatter.title}</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {frontmatter.description}
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-start gap-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                <Views slug={slug} />

                {(frontmatter.github || frontmatter.link) && " - "}
                {frontmatter.github && (
                    <div className="inline-flex items-center gap-2">
                        <IconGithub className="text-lg text-gray-800 dark:text-light" />
                        <CustomLink href={frontmatter.github} className="mt-1">
                            Repository
                        </CustomLink>
                    </div>
                )}
                {frontmatter.link && (
                    <div className="inline-flex items-center gap-2">
                        <IconLink className="text-lg text-gray-800 dark:text-light" />
                        <CustomLink href={frontmatter.link} className="mt-1">
                            Open Live Site
                        </CustomLink>
                    </div>
                )}
            </div>
        </div>
    )
}
