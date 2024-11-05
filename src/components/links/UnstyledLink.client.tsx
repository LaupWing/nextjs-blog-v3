"use client"
import clsx from "clsx"
import Link, { LinkProps } from "next/link"
import { useParams, usePathname } from "next/navigation"
import { ComponentPropsWithRef, FC, ReactNode } from "react"

export interface UnstyledLinkProps
    extends ComponentPropsWithRef<"a">,
        LinkProps {
    href: string
    children: ReactNode
    openNewTab?: boolean
    className?: string
}

export const UnstyledLink: FC<UnstyledLinkProps> = ({
    children,
    href,
    openNewTab,
    className,
    ...props
}) => {
    const pathname = usePathname()
    const params = useParams()
    let _href = href
    if (href.includes("#")) {
        _href = `${pathname}${href}`
    }
    const isNewTab =
        openNewTab !== undefined
            ? openNewTab
            : href && !href.startsWith("/") && !href.startsWith("#")

    if (!isNewTab) {
        return (
            <Link
                href={`/${params.lang}/${_href}`}
                className={className}
                {...props}
            >
                {children}
            </Link>
        )
    }

    return (
        <a
            target="_blank"
            rel="noopener noreferrer"
            href={href}
            {...props}
            className={clsx(className, "cursor-newtab")}
        >
            {children}
        </a>
    )
}
