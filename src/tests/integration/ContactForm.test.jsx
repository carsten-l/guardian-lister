import { render } from "vitest-browser-react";
import { page } from "@vitest/browser/context";
import { describe, it, expect } from "vitest";
import ContactForm from "../../components/ContactForm"; // adjust path

describe("ContactForm", () => {
    it("renders all fields with correct structure", async () => {
        render(<ContactForm />);

        // Use page queries instead of screen
        const nameInput = page.getByLabelText(/name/i);
        const emailInput = page.getByLabelText(/email/i);
        const messageInput = page.getByLabelText(/message/i);

        await expect.element(nameInput).toBeInTheDocument();
        await expect.element(emailInput).toBeInTheDocument();
        await expect.element(messageInput).toBeInTheDocument();
    });

    it("shows errors when submitting empty fields", async () => {
        render(<ContactForm />);

        await page.getByRole("button", { name: /submit/i }).click();

        await expect.element(page.getByText(/name is required/i)).toBeVisible();
        await expect
            .element(page.getByText(/email is required/i))
            .toBeVisible();
        await expect
            .element(page.getByText(/message is required/i))
            .toBeVisible();
    });

    it("shows error for invalid email", async () => {
        render(<ContactForm />);

        await page.getByLabelText(/email/i).fill("invalid-email");
        await page.getByRole("button", { name: /submit/i }).click();

        await expect.element(page.getByText(/invalid email/i)).toBeVisible();
    });

    it("shows error for short message", async () => {
        render(<ContactForm />);

        await page.getByLabelText(/message/i).fill("short");
        await page.getByRole("button", { name: /submit/i }).click();

        await expect
            .element(
                page.getByText(
                    /Your message must be a minimum of 10 characters/i,
                ),
            )
            .toBeVisible();
    });

    it("submits successfully when all validations pass", async () => {
        render(<ContactForm />);

        await page.getByLabelText(/name/i).fill("John Doe");
        await page.getByLabelText(/email/i).fill("john@example.com");
        await page.getByLabelText(/message/i).fill("This is a valid message");

        await page.getByRole("button", { name: /submit/i }).click();

        await expect.element(page.getByLabelText(/email/i)).not.toHaveValue();
        await expect.element(page.getByLabelText(/name/i)).not.toHaveValue();
        await expect.element(page.getByLabelText(/message/i)).not.toHaveValue();
    });
});
