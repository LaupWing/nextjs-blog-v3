"use client"
import type { FC } from "react"

import { LikeButton } from "../buttons/LikeButton.client"
import { useEffect, useState } from "react"
import { LikeButtonLoading } from "../buttons/LikeButtonLoading"

interface LikesProps {
    slug: string
}

export const Likes: FC<LikesProps> = ({ slug }) => {
    const [data, setData] = useState({
        all_likes: 0,
        likes_by_user: 0,
    })
    const [loading, setLoading] = useState(true)

    const fetchLikes = async () => {
        const res_all_likes = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/likes/${slug}`,
            {
                method: "GET",
            }
        )
        const data_all_likes = await res_all_likes.json()
        const res_user_likes = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/likes/${slug}/user`,
            {
                method: "GET",
            }
        )
        const data_user_likes = await res_user_likes.json()

        setData({
            all_likes: data_all_likes.likes,
            likes_by_user: data_user_likes.likes,
        })
        setLoading(false)
    }

    useEffect(() => {
        fetchLikes()
    }, [])

    return loading ? (
        <LikeButtonLoading />
    ) : (
        <LikeButton
            all_likes={data.all_likes}
            likes_by_user={data.likes_by_user}
        />
    )
}
