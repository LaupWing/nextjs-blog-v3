"use client"
import type { FC } from "react"

import { useMemo } from "react"
import { getMDXComponent } from "mdx-bundler/client"
import { MDXComponents } from "@/components/MDXComponents"

interface ContentProps {
    code: string
}
export const Content: FC<ContentProps> = ({ code }) => {
    const Component = useMemo(() => getMDXComponent(code), [code])

    return (
        <article className="mdx xl:col-span-1 mt-4 projects prose mx-auto w-full !max-w-[80%] transition-colors dark:prose-invert">
            <Component
                components={
                    {
                        ...MDXComponents,
                    } as any
                }
            />
        </article>
    )
}
