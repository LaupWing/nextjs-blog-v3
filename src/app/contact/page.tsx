"use client"
import { Button } from "@/components/buttons/Button"
import { Accent } from "@/components/elements/Accent"
import { FC, FormEvent, useRef, useState } from "react"
import useWindowSize from "react-use/lib/useWindowSize"
import Confetti from "react-confetti"
import { DNA } from "react-loader-spinner"

interface CustomElements extends HTMLFormControlsCollection {
    message: HTMLTextAreaElement
    email: HTMLInputElement
    name: HTMLInputElement
}

interface CustomForm extends HTMLFormElement {
    readonly elements: CustomElements
}

const Contact = () => {
    const form_ref = useRef<HTMLFormElement>(null)
    const [email_error, setEmailError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e: FormEvent<CustomForm>) => {
        e.preventDefault()
        setLoading(true)
        const res = await fetch("/api/contact", {
            method: "POST",
            body: JSON.stringify({
                email: e.currentTarget.elements.email.value,
                message: e.currentTarget.elements.message.value,
                name: e.currentTarget.elements.name.value,
            }),
        })
        const data = await res.json()
        setLoading(false)
        if (data.message === "invalid email") {
            setEmailError(true)
        } else if (data.message === "success") {
            setSuccess(true)
            form_ref.current!.reset()
        }
    }

    return (
        <>
            {loading && <ContactLoader />}
            {success && (
                <ContactSuccessModal
                    onClick={() => {
                        setSuccess(false)
                    }}
                />
            )}
            <section className="custom-container max-w-lg py-12">
                <h1 className="text-3xl md:text-5xl" data-fade="0">
                    <Accent>Contact</Accent>
                </h1>
                <p className="text-gray-500" data-fade="1">
                    Unlock exciting possibilities! Interested in a project or
                    tutoring? Reach out using the contact form and let's embark
                    on this journey together!
                </p>
                <form
                    className="mt-4 flex w-full flex-col items-start gap-4"
                    ref={form_ref}
                    onSubmit={handleSubmit}
                >
                    <div className="w-full" data-fade="2">
                        <input
                            type="text"
                            id="name"
                            required
                            placeholder="Name"
                            className="w-full rounded-md dark:bg-dark border border-gray-300 dark:border-gray-600 focus:border-accent-dark focus:outline-none focus:ring-0 dark:focus:border-accent-light"
                        />
                    </div>
                    <div className="w-full" data-fade="3">
                        <input
                            type="email"
                            id="email"
                            required
                            placeholder="Email"
                            className={
                                "w-full rounded-md dark:bg-dark border focus:border-accent-dark focus:outline-none focus:ring-0 dark:focus:border-accent-light" +
                                (email_error
                                    ? " border-red-400"
                                    : "border-gray-300 dark:border-gray-600")
                            }
                        />
                        {email_error && (
                            <span className="text-red-400 ml-1 font-bold uppercase text-xs">
                                Email is invalid
                            </span>
                        )}
                    </div>
                    <div className="w-full" data-fade="4">
                        <textarea
                            required
                            id="message"
                            className="w-full rounded-md dark:bg-dark border border-gray-300 dark:border-gray-600 focus:border-accent-dark focus:outline-none focus:ring-0 dark:focus:border-accent-light resize-none"
                            placeholder="Message"
                            rows={10}
                        ></textarea>
                    </div>
                    <div data-fade="5">
                        <Button
                            className="mr-auto"
                            variant="gradient-animation"
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </section>
        </>
    )
}
export default Contact

interface ContactSuccessModalProps {
    onClick: () => void
}

const ContactSuccessModal: FC<ContactSuccessModalProps> = ({ onClick }) => {
    const { width, height } = useWindowSize()
    return (
        <div className="fixed z-[1000] top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
            <Confetti width={width} height={height} />
            <div className="bg-white rounded-md p-4 z-50">
                <h1 className="text-2xl text-gray-600">
                    Message has been sent!
                </h1>
                <p className="text-gray-500">
                    Thank you for reaching out! I will get back to you as soon
                    as possible.
                </p>
                <Button className="mt-4" onClick={onClick}>
                    Close
                </Button>
            </div>
        </div>
    )
}

const ContactLoader = () => {
    return (
        <div className="fixed z-[1000] top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
            <DNA
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            />
        </div>
    )
}
