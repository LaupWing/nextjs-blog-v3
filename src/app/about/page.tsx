import { TechIcons } from "@/components/TechIcons.client"
import { Accent } from "@/components/elements/Accent"
import { CloudinaryImage } from "@/components/images/CloudinaryImage.client"
import { CustomLink } from "@/components/links/CustomLink"

const About = () => {
    return (
        <section className="custom-container min-h-screen py-20">
            <h2 className="dark:text-white" data-fade="0">
                About
            </h2>
            <h1 className="mt-1" data-fade="1">
                <Accent>Loc Nguyen</Accent>
            </h1>
            <div className="mt-4">
                <CloudinaryImage
                    className="float-right ml-6 w-40 md:w-72"
                    public_id="techblog/laup_d5azzz"
                    alt="Bike"
                    width={1200}
                    height={1200}
                    data-fade="2"
                />
                <article className="prose dark:prose-invert">
                    <p data-fade="3">
                        Hello! I'm Loc Nguyen, and my passion for programming
                        has been with me since my early years. Although I
                        attended IT universities, the broad curriculum didn't
                        quite align with my main interest – coding. Determined
                        to pursue my passion, I took the self-taught route,
                        starting with YouTube tutorials. Web development
                        captured my heart, and I dove into building websites
                        independently.
                    </p>
                    <p data-fade="4">
                        As coding became second nature, I decided to broaden my
                        skills. I enrolled in a university program focused on
                        web design called{" "}
                        <CustomLink href="https://www.hva.nl/opleidingen/communication-and-multimedia-design">
                            Communication Multimedia Design
                        </CustomLink>
                        . Here, I not only delved deeper into coding but also
                        recognized the significance of soft skills like
                        communication, time management, and teamwork. I continue
                        to refine these skills daily, understanding their
                        crucial role in a developer's success.
                    </p>
                    <p data-fade="5">
                        With 5 years of experience as a web developer
                        post-graduation, I've worked with various technologies.
                        My expertise lies in{" "}
                        <CustomLink href="https://vuejs.org/">
                            Vue.js
                        </CustomLink>
                        ,{" "}
                        <CustomLink href="https://nextjs.org/">
                            React/Next.js
                        </CustomLink>
                        ,{" "}
                        <CustomLink href="https://nodejs.org/en">
                            Node.js
                        </CustomLink>
                        , and{" "}
                        <CustomLink href="https://laravel.com/">
                            PHP/Laravel
                        </CustomLink>
                        , primarily focusing on frontend frameworks. While my
                        proficiency in backend frameworks like Node.js and
                        especially Laravel spans 2 years, I've dedicated each
                        day within that timeframe to backend programming. I'm
                        also keen on expanding my knowledge in DevOps and cloud
                        technologies.
                    </p>
                    <p data-fade="6">
                        This website serves as a platform for blogging and
                        showcasing my projects. I believe that articulating my
                        learnings enhances retention, and I'm eager to share my
                        knowledge. Feel free to reach out, and I'll be delighted
                        to assist you!
                    </p>
                    <div className="flex flex-col" data-fade="7">
                        <h3>Current Favorite Tech Stack</h3>
                        <figure className="mt-1 flex-1 flex flex-wrap">
                            <TechIcons
                                className="pl-1"
                                techs={[
                                    "laravel",
                                    "nextjs",
                                    "vue",
                                    "react",
                                    "tailwindcss",
                                    "typescript",
                                    "php",
                                    "mysql",
                                ]}
                            />
                        </figure>
                    </div>
                    <div className="flex flex-col" data-fade="8">
                        <h3>Technologies I'm proficient in</h3>
                        <figure className="mt-1">
                            <TechIcons
                                data-fade="8"
                                className="pl-1"
                                techs={[
                                    "firebase",
                                    "react",
                                    "vue",
                                    "nextjs",
                                    "tailwindcss",
                                    "typescript",
                                    "javascript",
                                    "nodejs",
                                    "mongodb",
                                    "laravel",
                                    "wordpress",
                                    "php",
                                    "mysql",
                                    "git",
                                    "gatsby",
                                    "solidity",
                                    "redux",
                                ]}
                            />
                        </figure>
                    </div>
                </article>
            </div>
        </section>
    )
}
export default About
