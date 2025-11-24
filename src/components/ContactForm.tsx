import { useState } from "react"; 
import { z } from "zod/v4";

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
    message: z.string()
        .min(1, "Message is required")
        .min(10, "Your message must be a minimum of 10 characters")
})

export default function ContactForm() {

    const [errors, setErrors] = useState<FormErrors>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const result = contactSchema.safeParse(data)

        if (!result.success) {
            const errors = z.treeifyError(result.error )
            console.error(errors)
            setErrors(errors.properties as FormErrors);
        } else {
            setErrors(null);
            console.log("Form submitted successfully", result.data);
            form.reset();
        }
    }


        

  return (
    <form onSubmit={handleSubmit} noValidate>
        <div className="formgroup">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" />
            <p className="error">{errors && errors?.name?.errors[0]}</p>
        </div>
        <div className="formgroup">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
            <p className="error">{errors && errors?.email?.errors[0]}</p>
        </div>
        <div className="formgroup">
            <label htmlFor="message">Message</label>
            <textarea  id="message" name="message" ></textarea>
            <p className="error">{errors && errors?.message?.errors[0]}</p>

        </div>
        <button type="submit">Submit</button>
    </form>

    );
}