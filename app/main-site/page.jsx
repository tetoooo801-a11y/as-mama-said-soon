import SmoothScroll from "@/components/SmoothScroll";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Results from "@/components/Results";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Collaborations from "@/components/Collaborations";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Results />
        <About />
        <Collaborations />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
