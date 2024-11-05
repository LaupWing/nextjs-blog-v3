"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { IconMoon, IconSun } from "../Icons"

const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
}

export const ThemeButton = () => {
    const [darkMode, setDarkMode] = useState(false)

    const toggleSwitch = () => {
        setDarkMode(!darkMode)
        localStorage.setItem("theme", darkMode ? "light" : "dark")
    }
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [darkMode])

    useEffect(() => {
        if (localStorage.getItem("theme") === "dark") {
            setDarkMode(true)
        } else {
            setDarkMode(false)
        }
    }, [])

    return (
        <button
            suppressHydrationWarning
            className={`flex p-1 w-16 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-600 pointer ${
                darkMode ? "justify-start" : "justify-end"
            }`}
            onClick={toggleSwitch}
        >
            <motion.div
                className="rounded-full w-7 h-7 bg-white flex items-center justify-center"
                layout
                transition={spring}
            >
                {darkMode ? (
                    <IconMoon className="text-blue-800 fill-current" />
                ) : (
                    <IconSun className="text-yellow-400 fill-current" />
                )}
            </motion.div>
        </button>
    )
}
