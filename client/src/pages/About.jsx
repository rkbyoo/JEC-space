import React, { useEffect, useRef } from 'react';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { TeamMember } from '../components/ui/TeamMember';
import { ArrowRight, Star, Target, ShoppingCart, BarChart, Shield, MessageCircle } from 'lucide-react';
import jecImage from '../assets/images/jec-image.jpg';
import apImage from '../assets/images/apImage.jpg';
import rkbImage from '../assets/images/rkbImage.png';
import csImage from '../assets/images/csImage.png';

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
            Welcome to <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">JEC-SPACE</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 animate-fade-in-delay">
            A common space where JEC students can connect, share, and access resources, making campus life more collaborative and convenient.
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="primary" onClick={scrollToStory}>Get Started</Button>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowRight size={24} className="text-blue-400 rotate-90" />
        </div>
      </div>

      {/* Features Section */}
      <Section className="bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block rounded-full bg-blue-900/20 px-3 py-1 text-sm text-blue-400 mb-2">Features</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">What makes JEC-SPACE special?</h2>
          <p className="text-gray-400">A collaborative platform for JECians to connect, share, and access resources with ease.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { Icon: ShoppingCart, title: 'Resource Sharing', desc: 'Post, browse, and interact with resources relevant to campus life.' },
            { Icon: Shield, title: 'User Authentication', desc: 'Secure signup, login, and OTP verification for all users.' },
            { Icon: BarChart, title: 'Admin Panel', desc: 'Manage users, products, and contact responses efficiently.' },
            { Icon: MessageCircle, title: 'Integrated Chatbot', desc: 'Get instant help and resolve doubts about the UI or platform features for a better user experience.' },
            { Icon: Star, title: 'Responsive UI', desc: 'Modern, mobile-friendly interface using Ant Design.' },
            { Icon: Target, title: 'Contact & Support', desc: 'Contact form for queries and complaints.' },
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

      {/* Our Story Section */}
      <Section id="our-story" className="bg-gradient-to-b from-gray-950 to-black">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block rounded-full bg-blue-900/20 px-3 py-1 text-sm text-blue-400 mb-2">Our Story</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">A space for JECians, by JECians</h2>
            <p className="text-gray-400 leading-relaxed">
              JEC-SPACE was created to transform how JEC students connect and share resources. Our goal is to make campus life more collaborative and convenient by providing a trusted platform for sharing, support, and communication.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Today, JEC-SPACE is the go-to digital space for JECians, empowering students to support each other and build lasting connections during their time at JEC.
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

      {/* Team Section */}
      <Section className="bg-black">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block rounded-full bg-blue-900/20 px-3 py-1 text-sm text-blue-400 mb-2">Our Team</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Meet the contributors of JEC-SPACE</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: 'Abhishek Prasad', role: 'Contributor', imgUrl: apImage },
            { name: 'Rakib Hussain', role: 'Contributor', imgUrl: rkbImage },
            { name: 'Chinmoy Sharma', role: 'Contributor', imgUrl: csImage }
          ].map((member, idx) => (
            <TeamMember key={idx} {...member} />
          ))}
        </div>
      </Section>
    </>
  );
};

export default About;
