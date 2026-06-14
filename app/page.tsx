import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Amenities from "@/components/Amenities";
import Gallery from "@/components/Gallery";
import Pricing from "@/components/Pricing";
import Surroundings from "@/components/Surroundings";
import BookingSection from "@/components/BookingSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Gallery />
        <Amenities />
        <Surroundings />
        <Pricing />
        <BookingSection />
      </main>
      <Footer />
    </>
  );
}
