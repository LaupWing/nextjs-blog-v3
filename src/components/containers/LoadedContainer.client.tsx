"use client"
import type { FC, PropsWithChildren, ComponentPropsWithoutRef } from "react"
import { useEffect, useState } from "react"

export const LoadedContainer: FC<
    PropsWithChildren & ComponentPropsWithoutRef<"div">
> = ({ children, ...props }) => {
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setLoaded(true)
    }, [])

    return (
        <div className={loaded ? "fade-in-start" : ""} {...props}>
            {children}
        </div>
    )
}
