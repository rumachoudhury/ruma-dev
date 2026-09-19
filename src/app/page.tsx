import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import StackRing from "@/components/StackRing";
import About from "@/components/About";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main id="top">
      <Hero />
      <Projects />
      <StackRing />
      <About />
      <Resume />
      <Contact />
    </main>
  );
}
