import { FC } from "react"
import { UnstyledLink, UnstyledLinkProps } from "./UnstyledLink.client"
import { Button } from "../buttons/Button"
import { ButtonVariant } from "../buttons/Button"

interface ButtonLinkProps extends UnstyledLinkProps {
    variant?: ButtonVariant
}

export const ButtonLink: FC<ButtonLinkProps> = ({
    children,
    className,
    variant = "default",
    ...props
}) => {
    return (
        <Button className={className} variant={variant}>
            <UnstyledLink {...props}>{children}</UnstyledLink>
        </Button>
    )
}
