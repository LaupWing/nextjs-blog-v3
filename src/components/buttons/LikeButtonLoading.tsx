import { CHAD_PATH } from "@/lib/svg"

export const LikeButtonLoading = () => {
    return (
        <div className="animate-pulse flex items-center space-x-4">
            <svg
                viewBox="0 0 231.18 354.53"
                className="text-gray-500 fill-current w-14"
            >
                <path d={CHAD_PATH} />
            </svg>
            <div className="text-gray-400 dark:text-gray-500 mt-1 text-lg font-medium">
                <span>...</span>
            </div>
        </div>
    )
}
