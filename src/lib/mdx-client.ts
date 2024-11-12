"use client"
import { FrontmatterWithTags } from "@/types/frontmatters"
import { countBy, map, sortBy, toPairs } from "lodash"

export function getTags<T extends Array<FrontmatterWithTags>>(contents: T) {
    const tags = contents.reduce(
        (accTags: string[], content) => [
            ...accTags,
            ...content.tags.split(","),
        ],
        []
    )
    return map(sortBy(toPairs(countBy(tags)), 1), 0).reverse()
}
