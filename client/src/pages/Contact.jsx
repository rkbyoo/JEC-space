import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Twitter } from 'lucide-react';
import { SendResponse } from '../apicalls/contact';
import { message } from "antd";
import { useDispatch } from 'react-redux';
import { SetLoader } from '../redux/loadersSlice';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    dispatch(SetLoader(true));
    e.preventDefault();
    try {
      const response = await SendResponse(formData);
      message.success("Your response is recorded!");
      setSubmitted(true);
    } catch (error) {
      message.error(error?.response?.data?.message || "Failed to send response");
    }
    dispatch(SetLoader(false));
  };

  const handleBack = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Contact JEC-Space</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a question or place a complaint ? Fill out the form below and we'll get back to you soon.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-800/50 p-8 rounded-2xl shadow-xl flex items-center justify-center min-h-[400px]">
            {submitted ? (
              <div className="w-full flex flex-col items-center justify-center">
                <h2 className="text-2xl font-semibold mb-4 text-green-400">Your response is recorded!</h2>
                <button
                  onClick={handleBack}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 py-2 px-6 rounded-lg font-medium transition duration-200"
                >
                  Back to Contact Form
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 w-full">
                {['name', 'email', 'subject'].map((field) => (
                  <div key={field}>
                    <label htmlFor={field} className="block text-sm font-medium mb-2 capitalize">
                      {field}
                    </label>
                    <input
                      id={field}
                      name={field}
                      type={field === 'email' ? 'email' : 'text'}
                      value={formData[field]}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                ))}

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    required
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 py-3 px-6 rounded-lg font-medium transition duration-200"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <InfoCard title="Get in Touch" items={[
              { icon: Mail, text: 'jecspace1@gmail.com' },
              { icon: Phone, text: 'Currently under setup' },
              { icon: MapPin, text: 'Jorhat Engineering College, Garmur, Jorhat, Assam. PIN-785007 ' },
            ]} />

            <InfoCard title="Follow Us">
              <div className="flex space-x-6">
                {[Linkedin, Github, Twitter].map((Icon, index) => (
                  <a key={index} href="#" className="hover:text-blue-500 transition">
                    <Icon className="w-8 h-8" />
                  </a>
                ))}
              </div>
            </InfoCard>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable InfoCard Component
function InfoCard({ title, items, children }) {
  return (
    <div className="bg-gray-800/50 p-8 rounded-2xl shadow-xl">
      {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
      {items && (
        <div className="space-y-4">
          {items.map(({ icon: Icon, text }, index) => (
            <div key={index} className="flex items-center space-x-4">
              <Icon className="w-6 h-6 text-blue-500" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      )}
      {children}
    </div>
  );
}

export default Contact;
