"use client"
import { ComponentPropsWithoutRef, FC } from "react"
import clsx from "clsx"
import { Tooltip } from "./Tooltip"
import {
    IconFirebase,
    IconGatsby,
    IconGit,
    IconJavascript,
    IconLaravel,
    IconMarkdown,
    IconMongodb,
    IconNextDotJs,
    IconNodeDotJs,
    IconPhp,
    IconReact,
    IconRedux,
    IconSolidity,
    IconSql,
    IconTailwindcss,
    IconTypescript,
    IconVercel,
    IconVue,
    IconWordpress,
} from "./Icons"

export type TechListType = keyof typeof techList

export interface TechIconsProps extends ComponentPropsWithoutRef<"ul"> {
    techs: Array<TechListType>
}

export const TechIcons: FC<TechIconsProps> = ({ className, techs }) => {
    return (
        <ul
            className={clsx(
                className,
                "flex flex-wrap text-gray-700 dark:text-gray-200 flex-1 gap-4"
            )}
        >
            {techs.map((tech) => {
                if (!techList[tech]) {
                    return null
                }
                const current = techList[tech]

                return (
                    <Tooltip
                        key={current.name}
                        className="flex"
                        tipChildren={<p>{current.name}</p>}
                    >
                        <li className="text-xl list-none">
                            <current.icon size={30} />
                        </li>
                    </Tooltip>
                )
            })}
        </ul>
    )
}

const techList = {
    react: {
        icon: IconReact,
        name: "React",
    },
    nextjs: {
        icon: IconNextDotJs,
        name: "Next.js",
    },
    tailwindcss: {
        icon: IconTailwindcss,
        name: "Tailwind CSS",
    },
    javascript: {
        icon: IconJavascript,
        name: "Javascript",
    },
    mysql: {
        icon: IconSql,
        name: "MySQL",
    },
    php: {
        icon: IconPhp,
        name: "PHP",
    },
    typescript: {
        icon: IconTypescript,
        name: "Typescript",
    },
    nodejs: {
        icon: IconNodeDotJs,
        name: "Node.js",
    },
    firebase: {
        icon: IconFirebase,
        name: "Firebase",
    },
    mongodb: {
        icon: IconMongodb,
        name: "MongoDB",
    },
    swr: {
        icon: IconVercel,
        name: "SWR",
    },
    redux: {
        icon: IconRedux,
        name: "Redux",
    },
    laravel: {
        icon: IconLaravel,
        name: "Laravel",
    },
    mdx: {
        icon: IconMarkdown,
        name: "MDX",
    },
    git: {
        icon: IconGit,
        name: "Git",
    },
    gatsby: {
        icon: IconGatsby,
        name: "Gatsby",
    },
    wordpress: {
        icon: IconWordpress,
        name: "Wordpress",
    },
    vue: {
        icon: IconVue,
        name: "Vue",
    },
    solidity: {
        icon: IconSolidity,
        name: "Solidity",
    },
}
