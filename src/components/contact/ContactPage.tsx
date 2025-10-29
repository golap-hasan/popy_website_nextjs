import ContactHero from "./Hero";
import ContactForm from "./ContactForm";
import Locations from "./Locations";
// import FAQ from "./FAQ";

const ContactPage = () => {
  return (
    <main>
      <ContactHero />
      <ContactForm />
      <Locations />
      {/* <FAQ /> */}
    </main>
  );
};

export default ContactPage;
