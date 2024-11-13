import type { Metadata } from "next"
import { BlogsContainer } from "@/components/containers/BlogsContainer.client"
import { Accent } from "@/components/elements/Accent"
import { attachContentMeta } from "@/lib/helpers"
import { getAllFilesFrontmatter } from "@/lib/mdx"
import seo from "@/lib/seo"
import { Locale } from "@/i18.config"

export const revalidate = 60

const fetchBlogs = async (lang: Locale) => {
    const blogs = await getAllFilesFrontmatter("blog", lang)

    return await attachContentMeta<"blog">(blogs)
}

export const metadata: Metadata = {
    ...seo({
        as_path: "blog",
        title: "Blog Page",
        description:
            "Everything you related to web development regarding the technologies often used nowadays. Each week minimal 1 blog!",
    }),
}

const Blog = async ({ params: { lang } }: { params: { lang: Locale } }) => {
    const posts = await fetchBlogs(lang)

    return (
        <main>
            <section className="custom-container py-12">
                <h1 className="text-3xl md:text-5xl" data-fade="0">
                    <Accent>Blog</Accent>
                </h1>
                <p
                    className="mt-2 text-gray-600 dark:text-gray-300"
                    data-fade="1"
                >
                    Interesting tech findings.
                </p>
                <BlogsContainer posts={posts} />
            </section>
        </main>
    )
}
export default Blog
