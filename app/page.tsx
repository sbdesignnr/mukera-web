import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Faq } from "@/components/Faq";
import { Reviews } from "@/components/Reviews";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <div id="o-nas" />
      <About />
      <Services />
      <Contact />
      <Reviews />
      <Faq />
    </main>
  );
}
