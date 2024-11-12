"use client"
import type { ComponentPropsWithoutRef, FC } from "react"

import useCopyToClipboard from "@/hooks/useCopyToClipboard"
import { useRef, useState } from "react"
import { IconCheckCircle, IconClipboard } from "../Icons"

interface CustomCodeProps extends ComponentPropsWithoutRef<"code"> {}

export const CustomCode: FC<CustomCodeProps> = ({
    className,
    children,
    ...props
}) => {
    const textRef = useRef<HTMLDivElement>(null)
    const [isCopied, setIsCopied] = useState<boolean>(false)
    const [copy] = useCopyToClipboard()

    const language = className?.includes("language")
        ? className.replace("language-", "").replace(" code-highlight", "")
        : null

    return (
        <code {...props} data-code-type={language && "code-block"}>
            {language ? (
                <div ref={textRef} className="overflow-x-auto">
                    {children}
                </div>
            ) : (
                <span>{children}</span>
            )}
            {language && (
                <div className="absolute left-6 top-0 rounded-b-md border border-t-0 border-gray-600 px-3 py-1">
                    <span className="select-none gradient-animation bg-clip-text font-medium text-transparent">
                        {language}
                    </span>
                </div>
            )}
            {language && (
                <button
                    onClick={() => {
                        copy(textRef?.current?.textContent ?? "").then(() => {
                            setIsCopied(true)
                            setTimeout(() => setIsCopied(false), 1500)
                        })
                    }}
                    className="absolute right-2 top-2 hidden rounded border border-gray-600 p-2 text-lg transition-colors hover:bg-gray-700 md:block"
                >
                    {isCopied ? (
                        <IconCheckCircle className="text-green-400" />
                    ) : (
                        <IconClipboard />
                    )}
                </button>
            )}
        </code>
    )
}
