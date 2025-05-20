import { About } from "../components/About";
import { Benifit } from "../components/Benifit";
import { Essential } from "../components/Essential";
import { Hero } from "../components/Hero";
import { Solution } from "../components/Solution";

export  function Home(){
    return (
        <div className="flex-col  items-center justify-center w-full">
            <Hero/>
            <About/>
            <Solution/>
            <Essential/>
            <Benifit/>
        </div>
    )
}