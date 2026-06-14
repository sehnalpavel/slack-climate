import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Amenities from "@/components/Amenities";
import Rooms from "@/components/Rooms";
import Gallery from "@/components/Gallery";
import Surroundings from "@/components/Surroundings";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import BookingSection from "@/components/BookingSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Amenities />
        <Rooms />
        <Gallery />
        <Surroundings />
        <Pricing />
        <Faq />
        <BookingSection />
      </main>
      <Footer />
    </>
  );
}
