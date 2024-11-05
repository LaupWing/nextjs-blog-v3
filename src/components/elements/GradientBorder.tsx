import type { FC, PropsWithChildren } from "react"

export const GradientBorder: FC<PropsWithChildren & { className?: string }> = ({
    children,
    className = "",
}) => {
    return (
        <div
            className={
                "gradient-animation-border shadow hover:scale-[1.03] active:scale-[0.97] motion-safe:transform-gpu motion-reduce:hover:scale-100 transition duration-100 scale-100 " +
                className
            }
        >
            {children}
        </div>
    )
}
