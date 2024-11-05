import type { Metadata } from "next"

import NextTopLoader from "nextjs-toploader"
import { Inter } from "next/font/google"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { favicons } from "@/config"
import seo from "@/lib/seo"
import { ResetLoaderContainer } from "@/components/containers/ResetLoaderContainer.client"
// import { GoogleTagManager } from "@next/third-parties/google"
// import { Analytics } from "@vercel/analytics/react"

import "@/styles/globals.css"
import "@/styles/dracula.css"
import "@/styles/mdx.css"
import "react-tippy/dist/tippy.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    ...seo({}),
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                {favicons.map((favicon) => (
                    <link key={favicon.href} {...favicon} />
                ))}
            </head>
            <body className={`${inter.className} dark:bg-dark`}>
                <NextTopLoader />
                <Header />
                <ResetLoaderContainer id="skip-nav">
                    {children}
                </ResetLoaderContainer>
                <Footer />
                {/* <GoogleTagManager gtmId="GTM-N9XKNFZX" />
                <GoogleTagManager gtmId="G-JBM6Y5FDQK" /> */}
                {/* <Analytics /> */}
            </body>
        </html>
    )
}
