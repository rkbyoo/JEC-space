import React, { useEffect, useRef } from 'react';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { TeamMember } from '../components/ui/TeamMember';
import { ArrowRight, Globe, Star, Rocket, Users, Award, Target, ShoppingCart, BarChart, Shield } from 'lucide-react';
import jecImage from '../components/images/jec-image.jpg';
import apImage from '../components/images/apImage.jpg';
import rkbImage from '../components/images/rkbImage.png';
import csImage from '../components/images/csImage.png';

const About = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (heroRef.current) {
        heroRef.current.style.backgroundPositionY = `${scrolled * 0.5}px`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToStory = () => {
    const storySection = document.getElementById('our-story');
    if (storySection) {
      storySection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <>
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url(${jecImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-gray-900"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in">
            About <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">JEC-Space</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 animate-fade-in-delay">
            The perfect place for Jecians to find everything related to their curriculum and their time at JEC, since 2025.
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="primary" onClick={scrollToStory}>Get Started</Button>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowRight size={24} className="text-blue-400 rotate-90" />
        </div>
      </div>

      {/* Our Story Section */}
      <Section id="our-story" className="bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block rounded-full bg-blue-900/20 px-3 py-1 text-sm text-blue-400 mb-2">Our Story</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Revolutionizing digital marketplaces</h2>
            <p className="text-gray-400 leading-relaxed">
              Founded in 2025, JEC-Space was created with a vision to transform
              how Jecians connect and trade within their community. Built by
              students for students, our founders recognized the need for a
              dedicated platform where Jecians could easily buy and sell
              anything related to their campus life.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Today, JEC-Space has become the go-to marketplace for Jecians,
              making it simple, safe, and convenient to exchange goods and
              services. Exclusively for the JEC community, we empower students
              to support each other through a trusted network built for their
              unique needs.
            </p>
          </div>
          <div className="relative">
            <div className="rounded-xl overflow-hidden shadow-2xl transform transition-transform hover:scale-105 duration-500">
              <img
                src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Team Collaboration"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </Section>

      {/* Core Values Section */}
      <Section className="bg-gray-950">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block rounded-full bg-blue-900/20 px-3 py-1 text-sm text-blue-400 mb-2">Our Values</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Core principles that drive our success</h2>
          <p className="text-gray-400">At JEC-Space, our values shape how we build products, serve our customers, and work together as a team.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { Icon: ShoppingCart, title: 'Customer First', desc: 'We prioritize our customers\' success, building solutions that directly address their needs and challenges in the digital marketplace.' },
            { Icon: Shield, title: 'Security', desc: 'We maintain the highest standards of security and reliability, ensuring our platform is always available and protected.' },
            { Icon: BarChart, title: 'Innovation', desc: 'We continuously innovate and improve our platform, staying ahead of market trends and technological advancements.' }
          ].map(({ Icon, title, desc }, idx) => (
            <div key={idx} className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl transition-all hover:bg-gray-800/50 hover:shadow-lg hover:shadow-blue-900/20">
              <div className="bg-blue-900/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Icon size={30} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
              <p className="text-gray-400">{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Mission & Vision Section */}
      <Section className="bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">
        <div className="absolute opacity-10 inset-0 pointer-events-none">
          <div className="absolute w-96 h-96 rounded-full bg-blue-500 blur-3xl -top-20 -right-20"></div>
          <div className="absolute w-96 h-96 rounded-full bg-purple-500 blur-3xl -bottom-20 -left-20"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
          {[
            { Icon: Target, title: 'Our Mission', text1: 'To empower every Jecian with a trusted, simple, and powerful platform to buy, sell, and connect within the JEC community.', text2: 'We\'re committed to building a safe, student-first marketplace that makes exchanging goods and services easy, reliable, and beneficial for everyone at JEC.' },
            { Icon: Star, title: 'Our Vision', text1: 'To become the heartbeat of the JEC community — a trusted space where every Jecian can effortlessly connect, buy, and sell within their campus life.', text2: 'We envision a vibrant ecosystem where students can easily exchange resources, support one another, and build lasting connections during their time at JEC.' }
          ].map(({ Icon, title, text1, text2 }, idx) => (
            <div key={idx} className="bg-gray-900/40 backdrop-blur-sm p-8 rounded-xl transition-all hover:bg-gray-800/40 hover:shadow-lg hover:shadow-blue-900/20">
              <div className="flex items-center mb-6">
                <div className="bg-blue-900/20 p-3 rounded-full mr-4">
                  <Icon size={24} className="text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">{title}</h3>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">{text1}</p>
              <p className="text-gray-300 leading-relaxed">{text2}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Team Section */}
      <Section className="bg-black">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block rounded-full bg-blue-900/20 px-3 py-1 text-sm text-blue-400 mb-2">Our Team</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Meet the innovators behind JEC-Space</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: 'Abhishek Prasad', role: 'Co-Founder and CEO', imgUrl: apImage },
            { name: 'Rakib Hussain', role: 'Co-Founder and CTO', imgUrl: rkbImage },
            { name: 'Chinmoy Sharma', role: 'Co-Founder and CMO', imgUrl: csImage }
          ].map((member, idx) => (
            <TeamMember key={idx} {...member} />
          ))}
        </div>
      </Section>
    </>
  );
};

export default About;
