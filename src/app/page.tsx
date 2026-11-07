import { Providers } from "@/components/qodix/Providers";
import { Navbar } from "@/components/qodix/Navbar";
import { Hero } from "@/components/qodix/Hero";
import { About } from "@/components/qodix/About";
import { Services } from "@/components/qodix/Services";
import { Work } from "@/components/qodix/Work";
import { Capabilities } from "@/components/qodix/Capabilities";
import { Process } from "@/components/qodix/Process";
import { WhyQodix, Engagement } from "@/components/qodix/Engagement";
import { Voices } from "@/components/qodix/Voices";
import { Faq } from "@/components/qodix/Faq";
import { Contact } from "@/components/qodix/Contact";
import { Footer } from "@/components/qodix/Footer";
import { Marquee } from "@/components/qodix/Marquee";

export default function Home() {
  return (
    <Providers>
      <a
        href="#main"
        className="label-micro sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[95] focus:border focus:border-white focus:bg-ink focus:px-4 focus:py-3 focus:text-white"
      >
        SKIP TO CONTENT
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <About />
        <Marquee
          words={[
            { text: "BUILDING", outline: false },
            { text: "BEYOND", outline: true },
            { text: "DIGITAL", outline: false },
          ]}
          className="border-y border-line"
        />
        <Services />
        <Work />
        <Capabilities />
        <Process />
        <Marquee
          words={[
            { text: "WEBSITES", outline: false },
            { text: "SOFTWARE", outline: true },
            { text: "AI", outline: false },
            { text: "PRODUCTS", outline: true },
          ]}
          reverse
          className="border-y border-line"
        />
        <WhyQodix />
        <Engagement />
        <Voices />
        <Faq />
        <Contact />
      </main>

      <Footer />
    </Providers>
  );
}
