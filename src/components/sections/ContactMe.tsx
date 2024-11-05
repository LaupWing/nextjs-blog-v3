import { ButtonLink } from "../links/ButtonLink"

export const ContactMe = () => {
    return (
        <div className="flex flex-col my-8 gap-4 items-start custom-container">
            <div className="flex flex-col">
                <h2 className="text-sm uppercase text-gray-800">Contact me</h2>
                <p className="text-gray-500">
                    Interested in a project or tutoring? Click on the 'Contact
                    Me' button to explore collaboration and learning
                    opportunities.
                </p>
            </div>

            <ButtonLink variant="gradient-animation" href="/contact">
                Contact Me
            </ButtonLink>
        </div>
    )
}
