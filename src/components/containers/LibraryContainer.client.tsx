"use client"
import type { ChangeEvent, FC } from "react"
import type { InjectedMeta, LibraryFrontmatter } from "@/types/frontmatters"

import { ChadIcon } from "@/components/ChadIcon"
import { IconSortAscending } from "@/components/Icons"
import { LibraryCard } from "@/components/cards/LibraryCard"
import { Tag } from "@/components/elements/Tag"
import {
    SortListBox,
    SortOption,
} from "@/components/elements/SortListBox.client"
import { ContentPlaceholder } from "@/components/sections/ContentPlaceholder"
import { getTags } from "@/lib/mdx-client"
import { useEffect, useState } from "react"

interface LibraryContainerProps {
    posts: Array<LibraryFrontmatter & InjectedMeta>
}

const sortOptions: Array<SortOption> = [
    {
        id: "name",
        name: "Sort by name",
        icon: IconSortAscending,
    },
    {
        id: "popular",
        name: "Sort by popularity",
        icon: ChadIcon,
    },
]

export const LibraryContainer: FC<LibraryContainerProps> = ({ posts }) => {
    const [sortOrder, setSortOrder] = useState<SortOption>(() => sortOptions[0])
    const [search, setSearch] = useState<string>("")
    const [filtered_posts, setFilteredPosts] = useState<
        Array<LibraryFrontmatter & InjectedMeta>
    >(() => [...posts])

    useEffect(() => {
        const result = posts
            .filter(
                (post) =>
                    post.title.toLowerCase().includes(search.toLowerCase()) ||
                    post.description
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    search
                        .toLowerCase()
                        .split(" ")
                        .every((tag) => post.tags.includes(tag)),
            )
            .sort((a, b) => {
                if (sortOrder.id === "name") {
                    return a.title.localeCompare(b.title)
                } else {
                    return b.likes! - a.likes!
                }
            })
        setFilteredPosts(result)
    }, [search, sortOrder])

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }
    const tags = getTags(posts)
    const toggleTag = (tag: string) => {
        if (search.includes(tag)) {
            setSearch((s) =>
                s
                    .split(" ")
                    .filter((t) => t !== tag)
                    .join(" "),
            )
        } else {
            setSearch((s) => (s !== "" ? `${s.trim()} ${tag}` : tag))
        }
    }
    const filtered_tags = getTags(filtered_posts)
    const tagFoundInSearch = (tag: string) => search.includes(tag)

    return (
        <>
            <input
                type="text"
                className="w-full rounded-md dark:bg-dark border border-gray-300 dark:border-gray-600 focus:border-accent-dark focus:outline-none focus:ring-0 dark:focus:border-accent-light mt-4"
                placeholder="Search..."
                data-fade="2"
                value={search}
                onChange={handleSearch}
            />
            <div
                className="mt-2 flex flex-wrap items-baseline justify-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                data-fade="3"
            >
                <span className="font-medium">Choose topic:</span>
                {tags.map((tag) => (
                    <Tag
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        disabled={!filtered_tags.includes(tag)}
                        active={tagFoundInSearch(tag)}
                    >
                        {tag}
                    </Tag>
                ))}
            </div>
            <div
                className="relative z-10 mt-6 flex flex-col items-end gap-4 text-gray-600 dark:text-gray-300 md:flex-row md:items-center md:justify-between"
                data-fade="4"
            >
                <SortListBox
                    className="ml-auto"
                    selected={sortOrder}
                    setSelected={setSortOrder}
                    options={sortOptions}
                />
            </div>
            <ul
                className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
                data-fade="5"
            >
                {filtered_posts.length > 0 ? (
                    filtered_posts.map((post) => (
                        <LibraryCard
                            key={post.slug}
                            snippet={post}
                            search={search}
                        />
                    ))
                ) : (
                    <ContentPlaceholder />
                )}
            </ul>
        </>
    )
}
