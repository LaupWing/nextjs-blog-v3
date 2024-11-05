import type { ComponentPropsWithoutRef, FC } from "react"
import clsx from "clsx"
import { GradientBorder } from "./GradientBorder"

interface TagProps extends ComponentPropsWithoutRef<"button"> {
    active: boolean
    onClick?: () => void
}

export const Tag: FC<TagProps> = ({ children, className, onClick, active }) => {
    const base_class =
        "inline-block scale-100 rounded-md px-1.5 py-0.5 font-medium transition-colors bg-gray-100 text-gray-700 hover:text-black disabled:bg-gray-200 disabled:text-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:text-white dark:disabled:bg-gray-600 dark:disabled:text-gray-500 focus:outline-none focus-visible:ring-accent-light focus-visible:ring disabled:cursor-not-allowed"

    return active ? (
        <GradientBorder className="!p-0.5 !rounded-md">
            <button onClick={onClick} className={clsx(base_class, className)}>
                {children}
            </button>
        </GradientBorder>
    ) : (
        <button
            onClick={onClick}
            className={clsx(base_class, className, "my-0.5")}
        >
            {children}
        </button>
    )
}
