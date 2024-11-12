"use client"
import { useState, type FC } from "react"
import clsx from "clsx"
import { CHAD_PATH } from "@/lib/svg"
import { useParams } from "next/navigation"

interface LikeButtonProps {
    likes_by_user: number
    all_likes: number
}

export const LikeButton: FC<LikeButtonProps> = ({
    likes_by_user,
    all_likes,
}) => {
    const [_likes_by_user, setLikesByUser] = useState(likes_by_user)
    const [_all_likes, setAllLikes] = useState(all_likes)
    const params = useParams()

    const addLike = async () => {
        try {
            if (_likes_by_user === 5) return

            setLikesByUser(_likes_by_user + 1)
            setAllLikes(_all_likes + 1)

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/likes/${params.slug}/user`,
                {
                    method: "POST",
                }
            )
            const data = await res.json()

            if (data.message === "Max like count is 5") {
                return
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="flex items-center space-x-4">
            <button className="heart-button" onClick={addLike}>
                <LikeButtonHeart likes={_likes_by_user} />
            </button>
            <div className="bg-gradient-to-tr from-[#e6b521] via-[#fef485] to-[#ffda4c] dark:bg-clip-text dark:text-transparent">
                <span>{_all_likes}</span>
            </div>
        </div>
    )
}

interface LikeBUttonHeartProps {
    likes: number
}

const LikeButtonHeart: FC<LikeBUttonHeartProps> = ({ likes }) => {
    return (
        <div className="relative">
            <div className="absolute w-full text-center text-2xl">
                <div
                    className={clsx(
                        "absolute w-full opacity-0",
                        likes === 5 && "emoji-animate"
                    )}
                >
                    🥳
                </div>
            </div>
            <svg
                viewBox="0 0 231.18 354.53"
                className="heart-animate w-14"
                style={{ transformOrigin: "50% 50%" }}
            >
                <defs>
                    <linearGradient
                        id="gradient"
                        x1={"0%"}
                        y1={"0%"}
                        x2={"0%"}
                        y2={"100%"}
                    >
                        <stop
                            offset={"0%"}
                            style={{
                                stopColor: "currentColor",
                                stopOpacity: 1,
                            }}
                            className="text-[#e6b521]"
                        />
                        <stop
                            offset={"50%"}
                            style={{
                                stopColor: "currentColor",
                                stopOpacity: 1,
                            }}
                            className="text-[#fef485]"
                        />
                        <stop
                            offset={"100%"}
                            style={{
                                stopColor: "currentColor",
                                stopOpacity: 1,
                            }}
                            className="text-[#ffda4c]"
                        />
                    </linearGradient>
                    <clipPath id="clip-path" clipPathUnits={"userSpaceOnUse"}>
                        <path d={CHAD_PATH} />
                    </clipPath>
                </defs>
                <g clipPath="url(#clip-path)">
                    <rect
                        className="dark:text-gray-600 text-gray-400"
                        width={240}
                        height={360}
                        fill="currentColor"
                    />
                    <rect
                        x={0}
                        y={0}
                        width={240}
                        height={360}
                        fill="url(#gradient)"
                        style={{
                            transform: `translateY(${360 - likes * 72}px)`,
                            transition:
                                "transform 150ms cubic-bezier(0.64, 0.57, 0.67, 1.53)",
                        }}
                    />
                </g>
            </svg>
        </div>
    )
}
