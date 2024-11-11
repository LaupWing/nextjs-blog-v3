import { LoadedContainer } from "@/components/containers/LoadedContainer.client"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <LoadedContainer id="skip-nav">{children}</LoadedContainer>
}
