import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import StackRing from "@/components/StackRing";
import About from "@/components/About";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main id="top">
      <Hero />
      <Projects />
      <StackRing />
      <About />
      <Resume />
      <Contact />
      <Footer />
    </main>
  );
}
