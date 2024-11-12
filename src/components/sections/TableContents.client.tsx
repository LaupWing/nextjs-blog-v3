"use client"
import { FC, useRef, useEffect, useState } from "react"
import { UnstyledLink } from "../links/UnstyledLink.client"
import clsx from "clsx"
import useScrollSpy from "@/hooks/useScrollSpy"

export type HeadingScrollSpy = Array<{
    id: string
    level: number
    text: string
}>

interface TableOfContentsProps {
    slug: string
}

export const TableContents: FC<TableOfContentsProps> = ({ slug }) => {
    const lastPosition = useRef<number>(0)
    const [toc, setToc] = useState<HeadingScrollSpy>()
    const minLevel =
        toc?.reduce((min, item) => (item.level < min ? item.level : min), 10) ??
        0

    const activeSection = useScrollSpy()

    useEffect(() => {
        const container = document.getElementById("toc-container")
        const activeLink = document.getElementById(`link-${activeSection}`)

        if (container && activeLink) {
            const cTop = container.scrollTop
            const cBottom = cTop + container.clientHeight

            const lTop = activeLink.offsetTop - container.offsetTop
            const lBottom = lTop + activeLink.clientHeight

            const isTotal = lTop >= cTop && lBottom <= cBottom

            const isScrollingUp = lastPosition.current > window.scrollY
            lastPosition.current = window.scrollY

            if (isTotal) {
                const offset = 25
                const top = isScrollingUp
                    ? lTop - container.clientHeight + offset
                    : lTop - offset

                container.scrollTo({
                    top,
                    behavior: "smooth",
                })
            }
        }
    }, [activeSection])

    useEffect(() => {
        const headings = document.querySelectorAll(".mdx h1, .mdx h2, .mdx h3")

        const headingsArray: HeadingScrollSpy = []

        headings.forEach((heading) => {
            const id = heading.id
            const level = +heading.tagName.replace("H", "")
            const text = heading.textContent + ""

            headingsArray.push({
                id,
                level,
                text,
            })

            setToc(headingsArray)
        })
    }, [slug])

    return (
        <div
            id="toc-container"
            className="hidden max-h-[calc(100vh-9rem-113px)] overflow-auto pb-4 lg:block"
        >
            <h3 className="text-gray-900 dark:text-gray-100 md:text-xl">
                Table of Contents
            </h3>
            <div className="mt-4 flex flex-col space-y-2 text-sm">
                {toc
                    ? toc.map(({ id, level, text }) => (
                          <TOCLink
                              id={id}
                              key={id}
                              activeSection={activeSection}
                              level={level}
                              minLevel={minLevel}
                              text={text}
                          />
                      ))
                    : null}
            </div>
        </div>
    )
}

interface TOCLinkProps {
    id: string
    level: number
    minLevel: number
    text: string
    activeSection: string | null
}

const TOCLink: FC<TOCLinkProps> = ({
    id,
    level,
    minLevel,
    text,
    activeSection,
}) => {
    return (
        <UnstyledLink
            href={`#${id}`}
            id={`link-${id}`}
            className={clsx(
                "font-medium hover:text-gray-700 focus:outline-none dark:hover:text-gray-200 focus-visible:text-gray-700 dark:focus-visible:text-gray-200",
                activeSection === id
                    ? "text-gray-900 dark:text-gray-100"
                    : "text-gray-400 dark:text-gray-500"
            )}
            style={{
                marginLeft: (level - minLevel) * 16,
            }}
        >
            {text}
        </UnstyledLink>
    )
}
