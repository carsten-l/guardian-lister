import { createFileRoute } from '@tanstack/react-router'
import ContactForm from '../components/ContactForm';

export const Route = createFileRoute('/contact')({
  component: Contact,
})

function Contact() {
  return (
    <div>
      <h1>Contact Us</h1>
      <p>Please fill out the form below to get in touch.</p>
      <ContactForm /> 
    </div>
  )
}
