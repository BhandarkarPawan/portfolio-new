import Hero from "@/components/hero/Hero";
import Thesis from "@/components/sections/Thesis";
import Platform from "@/components/sections/Platform";
import Experience from "@/components/sections/Experience";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import Toolkit from "@/components/sections/Toolkit";
import Writing from "@/components/sections/Writing";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Thesis />
      <Platform />
      <Experience />
      <About />
      <Work />
      <Toolkit />
      <Writing />
      <Contact />
    </main>
  );
}
