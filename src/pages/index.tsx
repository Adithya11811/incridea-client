import About from "../components/about";
import Image from "next/image";
import { useRef } from "react";
import Hero from "../components/hero";
// import { LocomotiveScrollProvider } from "react-locomotive-scroll";
// import "locomotive-scroll/dist/locomotive-scroll.css";
import EventsReel from "../components/eventsPeek/reel";
import { HomePageFooter } from "../components/footer";
import dynamic from "next/dynamic";
const CountDown = dynamic(() => import("../components/countdown"), {
  ssr: false,
});

import SmoothScroll from "../components/smoothscroll";
import { useScroll,useTransform } from "framer-motion";

const Home = () => {
  const containerRef = useRef(null);
  let { scrollYProgress } = useScroll();
  let y = useTransform(scrollYProgress, [0, 1], ['0%', '-100%']);
  return (
    <div className="overflow-x-hidden">
      {/* <LocomotiveScrollProvider
        options={{
          smooth: true,
          smartphone: {
            smooth: true,
          },
          tablet: {
            smooth: true,
          },
        }}
        watch={[]}
        containerRef={containerRef}> */}
        <SmoothScroll>
        <main data-scroll-container ref={containerRef}>
          {/* 1. Hero Section */}
          <Hero />

          <div data-scroll-section className="relative -mt-2  ">
            <div className="relative pt-[200px] w-full flex justify-center items-center bg-gradient-to-b from-[#46aacf]  via-[#075985] to-[#2d6aa6]">
              {/* 2. Countdown Section */}
              <Image
                src="/assets/png/waterflare.png"
                height={1000}
                width={1000}
                alt="flare"
                className="absolute pointer-events-none opacity-40 z-50 top-0 right-0"
              />
              <CountDown />
            </div>
            {/* 3. About Section */}
            <div className=" bg-gradient-to-b   from-[#2d6aa6] -mt-2   to-[#052749]">
              <About />
              {/* 4. Core Events Section */}
              <EventsReel translateX={y} />
            </div>
            {/* 5. Footer Section */}
            <section className="-mt-2 bg-[#052749]">
              <HomePageFooter />
            </section>
          </div>
        </main>
        </SmoothScroll>
      {/* </LocomotiveScrollProvider> */}
    </div>
  );
};

export default Home;
