import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Education from "@/components/Education"
import Skills from "@/components/Skills"
import Projects from "@/components/Projects"
import Experience from "@/components/Experience"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main className="overflow-x-hidden">

      <Navbar />

      <Hero />

      <About />

      <Education />

      <Skills />

      <Projects />

      <Experience />

      <Contact />

      <Footer />

    </main>
  )
}