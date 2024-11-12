"use client"
import { FormEvent, useRef, useState } from "react"
import { Button } from "../buttons/Button"
import { Rings } from "react-loader-spinner"

interface CustomElements extends HTMLFormControlsCollection {
    email: HTMLInputElement
}

interface CustomForm extends HTMLFormElement {
    readonly elements: CustomElements
}

export const Subscribe = () => {
    const form_ref = useRef<HTMLFormElement>(null)
    const [loading, setLoading] = useState(false)
    const handleSubmit = async (e: FormEvent<CustomForm>) => {
        e.preventDefault()
        setLoading(true)
        console.log(
            JSON.stringify({
                email: e.currentTarget.elements.email.value,
                message: "New Subscriber",
                name: "New Subscriber",
            })
        )
        // const res = await fetch("/api/contact", {
        //     method: "POST",
        //     body: JSON.stringify({
        //         email: e.currentTarget.elements.email.value,
        //         message: "New Subscriber",
        //         name: "New Subscriber",
        //     }),
        // })
        // await res.json()
        setLoading(false)
    }

    return (
        <>
            {loading && (
                <div className="bg-black/20 fixed flex justify-center items-center inset-0 z-50">
                    <Rings color="#b102b7" width={50} height={50} />
                </div>
            )}
            <form
                ref={form_ref}
                onSubmit={handleSubmit}
                className="flex my-8 flex-col custom-container gap-4"
            >
                <div className="flex flex-col">
                    <h2 className="text-sm uppercase text-gray-800">
                        Subscribe
                    </h2>
                    <p className="text-gray-500">
                        Subscribe to my newsletter to get regular content not
                        published on my site.
                    </p>
                </div>
                <div className="flex flex-col items-start sm:flex-row sm:items-end gap-2">
                    <div className="flex gap-1 flex-col w-full max-w-[300px]">
                        <label
                            htmlFor="email"
                            className="uppercase tracking-wider text-sm font-bold text-gray-600 dark:text-gray-400"
                        >
                            Email
                        </label>
                        <input
                            className="py-2 px-2 w-full rounded text-black bg-gray-100 border-2 border-gray-300"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                        />
                    </div>
                    <Button variant="gradient-animation">Submit</Button>
                </div>
            </form>
        </>
    )
}
