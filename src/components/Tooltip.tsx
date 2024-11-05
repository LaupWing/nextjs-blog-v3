import type { ComponentPropsWithoutRef, ReactNode, FC } from "react"
import { TooltipProps, Tooltip as TippyTooltip } from "react-tippy"
import clsx from "clsx"
import * as RadixTooltip from "@radix-ui/react-tooltip"

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
    // return (
    //     // @ts-ignore
    //     <TippyTooltip
    //         trigger="mouseenter"
    //         interactive
    //         html={
    //             <div
    //                 className={clsx(
    //                     className,
    //                     "inline-block rounded-md bg-light dark:bg-dark p-2 text-gray-600 shadow-md dark:text-gray-200 border dark:border-gray-600"
    //                 )}
    //             >
    //                 {tipChildren}
    //             </div>
    //         }
    //         {...props}
    //     >
    //         {withUnderline ? (
    //             <span
    //                 className={clsx(spanClassName, "underline")}
    //                 style={{
    //                     textDecorationStyle: "dotted",
    //                 }}
    //             >
    //                 {children}
    //             </span>
    //         ) : (
    //             <>{children}</>
    //         )}
    //     </TippyTooltip>
    // )
    return (
        <RadixTooltip.Provider delayDuration={0}>
            <RadixTooltip.Root>
                <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
                <RadixTooltip.Portal>
                    <RadixTooltip.Content
                        className="inline-block rounded-md bg-light dark:bg-dark p-2 text-gray-600 shadow-md dark:text-gray-200 border dark:border-gray-600 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                        sideOffset={5}
                    >
                        {tipChildren}
                    </RadixTooltip.Content>
                </RadixTooltip.Portal>
            </RadixTooltip.Root>
        </RadixTooltip.Provider>
    )
}

export default Tooltip
