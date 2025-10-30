import type { Metadata } from "next";
import ContactPage from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact Popy Library | Popy Publications",
  description:
    "Get in touch with Popy Library for order support, partnership inquiries, or general questions.",
};

const Contact = () => {
  return <ContactPage />;
};

export default Contact;