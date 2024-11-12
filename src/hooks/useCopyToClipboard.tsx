"use client"
import { useState } from "react"

type CopiedValue = string | null
type CopyFn = (text: string) => Promise<boolean>

const useCopyToClipboard = (): [CopyFn, CopiedValue] => {
    const [copiedText, setCopiedText] = useState<CopiedValue>(null)

    const copy: CopyFn = async (text) => {
        if (!navigator?.clipboard) {
            return false
        }

        try {
            await navigator.clipboard.writeText(text)
            setCopiedText(text)
            return true
        } catch (e) {
            setCopiedText(null)
            return false
        }
    }

    return [copy, copiedText]
}
export default useCopyToClipboard
