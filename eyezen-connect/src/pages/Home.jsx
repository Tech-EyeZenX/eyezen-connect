import { About } from "../components/About";
import { Benifit } from "../components/Benifit";
import { Essential } from "../components/Essential";
import FAQSection from "../components/FAQ";
import Footer from "../components/Footer";
import { Hero } from "../components/Hero";
import { Methodology } from "../components/Methodology";
import { Solution } from "../components/Solution";
import { TestMonial } from "../components/Testimonial";

export  function Home(){
    return (
        <div className="flex-col  items-center justify-center w-full">
            <Hero/>
            <About/>
            <Solution/>
            <Essential/>
            <Benifit/>
            <Methodology/>
            <TestMonial/>
            <FAQSection/>
            <Footer/>
        </div>
    )
}