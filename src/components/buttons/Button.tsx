import type { ComponentPropsWithoutRef, FC } from "react"
import clsx from "clsx"
import { GradientBorder } from "../elements/GradientBorder"
import { UnstyledLink } from "../links/UnstyledLink.client"

export type ButtonVariant = "default" | "gradient-animation"

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
    is_loading?: boolean
    href?: string
    variant?: ButtonVariant
}

export const Button: FC<ButtonProps> = ({
    children,
    className,
    disabled: button_disabled,
    is_loading,
    href,
    variant = "default",
    ...props
}) => {
    const disabled = is_loading || button_disabled

    const variants: Record<ButtonVariant, string> = {
        default:
            "py-2 border border-gray-300 dark:border-gray-600 focus:outline-none focus-visible:ring focus-visible:ring-accent shadow-sm hover:scale-[1.03] active:scale-[0.97] motion-safe:transform-gpu motion-reduce:hover:scale-100 transition duration-100",
        "gradient-animation": "bg-white py-[7px]",
    }

    const classNameComputed = clsx(
        "rounded font-bold px-4 scale-100 bg-light dark:bg-dark text-gray-600 disabled:bg-gray-200 dark:text-gray-200 dark:disabled:bg-gray-700 ",
        variants[variant],
        className,
    )

    const ButtonComponent = href ? (
        <UnstyledLink href={href}>
            <button
                {...props}
                disabled={disabled}
                className={classNameComputed}
            >
                {children}
            </button>
        </UnstyledLink>
    ) : (
        <button {...props} disabled={disabled} className={classNameComputed}>
            {children}
        </button>
    )

    return variant === "gradient-animation" ? (
        <GradientBorder>
            {href ? (
                <UnstyledLink href={href}>
                    <button
                        {...props}
                        disabled={disabled}
                        className={classNameComputed}
                    >
                        {children}
                    </button>
                </UnstyledLink>
            ) : (
                <button
                    {...props}
                    disabled={disabled}
                    className={classNameComputed}
                >
                    {children}
                </button>
            )}
        </GradientBorder>
    ) : href ? (
        <UnstyledLink href={href}>
            <button
                {...props}
                disabled={disabled}
                className={classNameComputed}
            >
                {children}
            </button>
        </UnstyledLink>
    ) : (
        <button {...props} disabled={disabled} className={classNameComputed}>
            {children}
        </button>
    )
}
