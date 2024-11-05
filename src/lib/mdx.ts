import type {
    ContentType,
    Frontmatter,
    PickFrontmatter,
} from "@/types/frontmatters"
import { readFileSync, readdirSync } from "fs"
import matter from "gray-matter"
import { bundleMDX } from "mdx-bundler"
import { join } from "path"
import readingTime from "reading-time"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrism from "rehype-prism-plus"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import { checkIfLangExists } from "./helper.server"
import { Locale } from "@/i18.config"

export async function getFileBySlug(
    type: ContentType,
    slug: string,
    lang: Locale,
) {
    const language = (await checkIfLangExists(lang, type))
        ? lang
        : process.env.DEFAULT_LANG!
    const source = readFileSync(
        join(process.cwd(), "src", "contents", type, language, `${slug}.mdx`),
        "utf8",
    )

    const { code, frontmatter } = await bundleMDX({
        source,
        mdxOptions(options) {
            options.remarkPlugins = [
                ...(options?.remarkPlugins ?? []),
                remarkGfm,
            ]
            options.rehypePlugins = [
                ...(options?.rehypePlugins ?? []),
                rehypeSlug,
                rehypePrism,
                [
                    rehypeAutolinkHeadings,
                    {
                        properties: {
                            className: ["hash-anchor"],
                        },
                    },
                ],
            ]
            return options
        },
    })

    return {
        code,
        frontmatter: {
            wordCount: source.split(/\s+/gu).length,
            readingTime: readingTime(source),
            slug: slug || null,
            ...frontmatter,
        },
    }
}

export async function getAllFilesFrontmatter<T extends ContentType>(
    type: T,
    lang: Locale,
) {
    const language = (await checkIfLangExists(lang, type))
        ? lang
        : process.env.DEFAULT_LANG!

    const files = readdirSync(
        join(process.cwd(), "src", "contents", type, language),
    )

    return files.reduce((allPosts: Array<PickFrontmatter<T>>, postSlug) => {
        const source = readFileSync(
            join(process.cwd(), "src", "contents", type, language, postSlug),
            "utf8",
        )
        const { data } = matter(source)

        const res = [
            {
                ...(data as PickFrontmatter<T>),
                slug: postSlug.replace(".mdx", ""),
                readingTime: readingTime(source),
            },
            ...allPosts,
        ]
        return res
    }, [])
}

export function getRecent<T extends Frontmatter>(
    contents: Array<T>,
    limit = 4,
) {
    const sorted_contents = contents.sort((a, b) => {
        return (
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
        )
    })

    return sorted_contents.slice(0, limit)
}

export async function getFiles(type: ContentType) {
    return readdirSync(join(process.cwd(), "src", "contents", type))
}
