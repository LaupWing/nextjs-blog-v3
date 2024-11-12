import type { FC, PropsWithChildren } from "react"

export const SplitImage: FC<PropsWithChildren> = ({ children }) => {
    return <div className="grid grid-cols-2 items-start gap-4">{children}</div>
}
