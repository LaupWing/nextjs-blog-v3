import type { ComponentPropsWithoutRef, FC } from "react"

interface PreProps extends ComponentPropsWithoutRef<"pre"> {}

export const Pre: FC<PreProps> = (props) => {
    return (
        <pre {...props}>
            {props.children}
            <style jsx>{`
                pre {
                    position: relative;
                    padding-top: 2.5rem;
                }
            `}</style>
        </pre>
    )
}
