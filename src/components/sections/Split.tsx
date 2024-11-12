import type { FC, PropsWithChildren } from "react"

export const Split: FC<PropsWithChildren> = ({ children }) => {
    return <div className="!mb-0 flex flex-col space-y-4">{children}</div>
}
