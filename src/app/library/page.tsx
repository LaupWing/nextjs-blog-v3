import { LibraryContainer } from "@/components/containers/LibraryContainer.client"
import { Accent } from "@/components/elements/Accent"
import { getAllFilesFrontmatter } from "@/lib/mdx"
import { Metadata } from "next"
import seo from "@/lib/seo"
import { attachContentMeta } from "@/lib/helpers"
import { Locale } from "@/i18.config"

const fetchLibrary = async (lang: Locale) => {
    const library = await getAllFilesFrontmatter("library", lang)

    return await attachContentMeta<"library">(library)
}

export const metadata: Metadata = {
    ...seo({
        as_path: "library",
        title: "Library Page",
        description:
            "Here's a collection of code snippets from various technologies that I have used before. Feel free to make use of them!",
    }),
}

interface PageProps {
    params: {
        lang: Locale
    }
}

const Library = async (page_props: PageProps) => {
    const posts = await fetchLibrary(page_props.params.lang)

    return (
        <section className="custom-container py-12">
            <h1 className="text-3xl md:text-5xl" data-fade="0">
                <Accent>Library</Accent>
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300" data-fade="1">
                Here's a collection of code snippets from various technologies
                that I have used before. Feel free to make use of them!
            </p>
            <LibraryContainer posts={posts} />
        </section>
    )
}
export default Library
