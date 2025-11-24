import { createFileRoute } from "@tanstack/react-router";
import ContactForm from "../components/ContactForm";

export const Route = createFileRoute("/contact")({
    component: Contact,
});

function Contact() {
    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="mb-2 text-2xl font-bold">Contact Us</h1>
            <p className="mb-4">
                Please fill out the form below to get in touch.
            </p>
            <ContactForm />
        </div>
    );
}
