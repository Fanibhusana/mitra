import Hero from "../components/Hero";
import Features from "../components/Features.jsx";
import HowItWorks from "../components/HowItWorks.jsx";
import Testimonials from "../components/Testimonials.jsx";
import JoinUs from "../components/JoinUs.jsx";
import Footer from "../components/Footer.jsx";
import FeaturedCharities from "../components/FeaturedCharities.jsx";
import Navbar from "../components/Navbar.jsx";

function Home() {
    return (
        <div  className={"bg-background"}>
            <Hero />
            <Features />
            <HowItWorks/>
            <FeaturedCharities/>
            <Testimonials/>
            <JoinUs/>
            <Footer/>
        </div>
    );
}

export default Home;
