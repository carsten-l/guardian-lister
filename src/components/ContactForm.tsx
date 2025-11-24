import { useState } from "react";
import { z } from "zod/v4";
import { Field, Input, Textarea, Button } from "@fluentui/react-components";

type FormErrors = {
    name?: { errors: string[] };
    email?: { errors: string[] };
    message?: { errors: string[] };
} | null;

const contactSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email({
        error: (issue) =>
            issue.input === "" ? "Email is required" : "Invalid email",
    }),
    message: z
        .string()
        .min(1, "Message is required")
        .min(10, "Your message must be a minimum of 10 characters"),
});

export default function ContactForm() {
    const [errors, setErrors] = useState<FormErrors>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const result = contactSchema.safeParse(data);

        if (!result.success) {
            const errors = z.treeifyError(result.error);
            console.error(errors);
            setErrors(errors.properties as FormErrors);
        } else {
            setErrors(null);
            console.log("Form submitted successfully", result.data);
            setName("");
            setEmail("");
            setMessage("");
        }
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            <Field
                label="Name"
                validationMessage={errors?.name?.errors[0]}
                required
            >
                <Input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(_, data) => setName(data.value)}
                />
            </Field>

            <Field
                label="Email"
                validationMessage={errors?.email?.errors[0]}
                required
            >
                <Input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(_, data) => setEmail(data.value)}
                />
            </Field>

            <Field
                label="Message"
                validationMessage={errors?.message?.errors[0]}
                required
            >
                <Textarea
                    name="message"
                    value={message}
                    onChange={(_, data) => setMessage(data.value)}
                />
            </Field>
            <Button type="submit">Submit</Button>
        </form>
    );
}
