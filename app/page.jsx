'use client'

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the AOS CSS
import '../styles/globals.css';

export const dynamic = 'force-dynamic'; 

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 500, // Animation duration (1 second)
      easing: 'ease-in-out', // Easing function
      once: false, // Ensures the animation runs only once
    });
  }, []);

  return (  
    <section className="w-full flex flex-col items-center justify-center text-center">
      <h1 className="head_text text_center" data-aos="fade-in">
        EyeReplace
        <br className="max-md:hidden"/>
      </h1>
      
      {/* Apply head_text and green_gradient to the same span */}
      <div data-aos="fade-up">
        <span className="head_text green_gradient block">Vision Powered Text Replacer</span>
      </div>

      <p className="desc text-center max-w-[700px] sm:max-w-[800px] mt-4" data-aos="fade-up" data-aos-delay="200">
        A revolutionary reading extension bringing equity to learning across the world.
      </p>

      {/* Embedded Video */}
      <div className="video-embed mt-8" data-aos="fade-in" data-aos-delay="300">
        <iframe 
          width="560" 
          height="315" 
          src="https://www.youtube.com/embed/ZPCfoCVCx3U?si=8hpWnLFhqujoUIbf" 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerPolicy="strict-origin-when-cross-origin" 
          allowFullScreen>
        </iframe>
      </div>

      {/* New Section - What Do We Do? */}
      <section className="w-full mt-10 flex flex-col items-center text-center" data-aos="fade-up">
        <h2 className="head_text green_gradient">What Do We Do?</h2>
        <p className="desc mt-4 what-we-do-description">
          At EyeReplace, we harness cutting-edge eye-tracking technology to make reading accessible for everyone. 
          We seamlessly replace difficult words with easier synonyms, same-level alternatives, or even images to help readers overcome hurdles. 
          Our app tailors the experience to the user, tracks progress, and offers personalized quizzes and flashcards for improved learning outcomes. 
          EyeReplace isn’t just about reading—it’s about creating an equitable learning journey for every reader.
        </p>
      </section>

      {/* Embedded Video */}
      <div className="video-embed mt-8" data-aos="fade-in">
        <iframe 
          width="560" 
          height="315" 
          src="https://www.youtube.com/embed/qobDEgCm01A?si=3vlAAOfWoPfkfLbe" 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerPolicy="strict-origin-when-cross-origin" 
          allowFullScreen>
        </iframe>
      </div>

      {/* New Section - Why Do We Do What We Do? */}
      <section className="w-full mt-10 flex flex-col items-center text-center" data-aos="fade-up">
        <h2 className="head_text green_gradient">Why Do We Do It?</h2>
        <p className="desc mt-4 why-we-do-description">
          At EyeReplace, we believe in fostering equity in education. Every learner, no matter their reading ability, deserves the opportunity to succeed. 
          We are committed to empowering young learners in the classroom by making reading more accessible and engaging. Whether it's helping children who struggle with reading, those learning English as a second language (ESL), or individuals with reading disabilities such as dyslexia, we aim to provide personalized support through our technology. 
          By bridging these gaps, we are not just enhancing literacy skills—we are helping shape confident, capable learners for a brighter future.
        </p>
      </section>
    </section>
  )
}

export default Home;
