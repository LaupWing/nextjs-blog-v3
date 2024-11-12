"use client"
import type { ComponentPropsWithoutRef, FC } from "react"
import { useState, useEffect } from "react"
import { UnstyledLink } from "../links/UnstyledLink.client"
import clsx from "clsx"
import { IconGithub, IconRepoForked, IconStar } from "../Icons"
import { Accent } from "../elements/Accent"

interface GithubRepo {
    full_name: string
    description: string
    forks: number
    stargazers_count: number
    html_url: string
    owner: {
        avatar_url: string
        login: string
        html_url: string
    }
}

interface GithubCardProps extends ComponentPropsWithoutRef<"div"> {
    repo: string
}

export const GithubCard: FC<GithubCardProps> = ({ repo, className }) => {
    const [error, setError] = useState<false | string>(false)
    const [data, setData] = useState<GithubRepo>()

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`https://api.github.com/repos/${repo}`)
            const data = await res.json()
            setData(data)
        }
        fetchData()
    }, [])

    return !error && !data ? (
        <div className="not-prose">
            <UnstyledLink
                href={data!.html_url}
                className={clsx(
                    "!block max-w-xl not-prose px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 scale-100 transform-gpu hover:scale-[1.02] active:scale-[0.97] transition duration-100 animate-shadow",
                    className
                )}
            >
                <div className="flex items-center gap-2 text-sm md:text-base">
                    <IconGithub className="ml-0.5 shrink-0 text-[1.2em]" />
                    <Accent className="truncate overflow-ellipsis font-semibold">
                        {data!.full_name}
                    </Accent>
                </div>
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">
                    {data!.description}
                </p>
                <div className="mt-2 flex gap-3">
                    <div className="flex items-center gap-1 text-xs">
                        <IconStar className="shrink-0 text-[1.2em]" />
                        <span>{data!.stargazers_count.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                        <IconRepoForked className="shrink-0 text-[1.2em]" />
                        <span>{data!.forks.toLocaleString()}</span>
                    </div>
                </div>
            </UnstyledLink>
        </div>
    ) : (
        <div className="mx-auto !block max-w-xl not-prose px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 animate-pulse bg-gray-300 dark:bg-gray-600 h-[111px]" />
    )
}
