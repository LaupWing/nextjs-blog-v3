import type { ComponentPropsWithoutRef, ReactNode, FC } from "react"
import { TooltipProps, Tooltip as TippyTooltip } from "react-tippy"
import clsx from "clsx"

type TooltipTextProps = {
    tipChildren?: ReactNode
    children?: ReactNode
    className?: string
    spanClassName?: string
    withUnderline?: boolean
} & TooltipProps &
    Omit<ComponentPropsWithoutRef<"div">, "children" | "className">

export const Tooltip: FC<TooltipTextProps> = ({
    tipChildren = null,
    children = null,
    className,
    spanClassName,
    withUnderline = false,
    ...props
}) => {
    return (
        // @ts-ignore
        <TippyTooltip
            trigger="mouseenter"
            interactive
            html={
                <div
                    className={clsx(
                        className,
                        "inline-block rounded-md bg-light dark:bg-dark p-2 text-gray-600 shadow-md dark:text-gray-200 border dark:border-gray-600"
                    )}
                >
                    {tipChildren}
                </div>
            }
            {...props}
        >
            {withUnderline ? (
                <span
                    className={clsx(spanClassName, "underline")}
                    style={{
                        textDecorationStyle: "dotted",
                    }}
                >
                    {children}
                </span>
            ) : (
                <>{children}</>
            )}
        </TippyTooltip>
    )
}

export default Tooltip
