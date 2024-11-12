import type { FC } from "react"
import type { TweetProps } from "react-twitter-widgets"
import clsx from "clsx"
import { Tweet } from "react-twitter-widgets"

interface TweetCardProps extends TweetProps {
    className?: string
}

export const TweetCard: FC<TweetCardProps> = ({ tweetId, className }) => {
    return (
        <div className={clsx("not-prose w-[99%]", className)}>
            <Tweet tweetId={tweetId} />
        </div>
    )
}
