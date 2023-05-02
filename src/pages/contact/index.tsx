import React from "react";
import { SeoModel } from "@/api";
import { Accordion, Breadcrumb, PageLayout } from "@/components";
import ContactForm from "@/components/Form/ContactForm";

const Contact = () => {

    return (
        <PageLayout id='contact-page' seo={contactPageSeo}>
            <div className="head wrapper">
                <div className="head-content">
                    <Breadcrumb links={[
                        {
                            title: 'Contact',
                            href: '/contact'
                        }
                    ]} />
                    <h1>Centre d'aide</h1>
                </div>
            </div>

            <div className="help wrapper">
                <div className="help-content">
                    <div className="faq">
                        <div className="faq-content">
                            <Accordion 
                                title={"Comment j'accède aux tutoriels premium ?"}
                                text={"Comme ça."}
                            />
                        </div>
                    </div>
                    <div className="contact">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}

const contactPageSeo: SeoModel = {
    metaTitle: 'devCourses',
    metaDescription: 'This is my website',
    sharedImage: {
        _id: "websiteSharedImage",
        url: "/home-shared-image.png",
        alt: "Image of this website",
        width: 1080,
        height: 720
    },
    pageType: 'website'
}

export default Contact;