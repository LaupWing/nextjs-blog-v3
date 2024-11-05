import type { ComponentPropsWithoutRef, FC } from "react"
import { InjectedMeta, LibraryFrontmatter } from "@/types/frontmatters"
import clsx from "clsx"
import { UnstyledLink } from "../links/UnstyledLink.client"
import { Accent } from "../elements/Accent"
import { TechIcons, TechListType } from "../TechIcons.client"
import Highlighter from "react-highlight-words"
import { ChadIcon } from "../ChadIcon"

interface LibraryCardProps extends ComponentPropsWithoutRef<"li"> {
    snippet: LibraryFrontmatter & InjectedMeta
    search?: string
}

export const LibraryCard: FC<LibraryCardProps> = ({
    className,
    snippet,
    search,
}) => {
    return (
        <li
            className={clsx(
                "h-full rounded-md shadow border border-gray-300 bg-light dark:border-gray-600 dark:bg-dark scale-100 hover:scale-[1.04] active:scale-[0.97] motion-safe:transform-gpu transition duration-100 motion-reduce:hover:scale-100 animate-shadow",
                className
            )}
        >
            <UnstyledLink
                href={`/library/${snippet.slug}`}
                className="block h-full rounded-md focus:outline-none focus-visible:ring focus-visible:ring-accent-light"
            >
                <div className="p-4 h-full flex flex-col">
                    <h4 className="text-gray-800 dark:text-gray-100">
                        <Highlighter
                            searchWords={search ? [...search.split(" ")] : []}
                            autoEscape
                            textToHighlight={snippet.title}
                        />
                    </h4>
                    <div className="mt-auto flex flex-col">
                        <div className="mt-1 flex items-center justify-start gap-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                            <div className="flex items-center gap-1">
                                <div className="dark:gradient-animation-slow p-1">
                                    <ChadIcon className="inline-block text-base w-5" />
                                </div>
                                <Accent>{snippet.likes} likes</Accent>
                            </div>
                            <span>•</span>
                            <TechIcons
                                techs={
                                    snippet.tags.split(
                                        ","
                                    ) as Array<TechListType>
                                }
                            />
                        </div>

                        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                            {snippet.description}
                        </p>
                    </div>
                </div>
            </UnstyledLink>
        </li>
    )
}
