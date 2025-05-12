
import React from 'react';

const AboutUs = () => {
  return (
    <section id="about-us" className="container mx-auto px-4 py-16">
      <div className="bg-black bg-opacity-80 text-white p-10 rounded-2xl shadow-lg max-w-4xl mx-auto backdrop-blur-md">
        <h2 className="text-4xl font-bold text-center text-cyan-400 mb-6 tracking-wide">About Us</h2>
        <p className="text-lg leading-8 text-gray-300 text-justify">
          Welcome to <span className="text-cyan-300 font-semibold">Dressberry</span> — where fashion fuses with the future. We're not just another online store. We're a digital lifestyle hub built for the bold, the visionary, and the style-forward.
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-300 text-justify">
          Born from a passion for sleek aesthetics and smart technology, Dressberry curates top-tier fashion and lifestyle essentials — from shoes that walk like whispers to home décor that sparks conversation. Every product is handpicked to echo tomorrow's trends, today.
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-300 text-justify">
          Powered by innovation and guided by taste, our mission is simple: <span className="text-cyan-300 font-semibold">redefine e-commerce through elegance, immersion, and experience</span>. Join us as we step into a realm where style meets sci-fi.
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-300 text-justify italic">
          This isn't just shopping — it's Dressberry. The future of fashion lives here.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
