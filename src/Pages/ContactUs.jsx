import React from 'react';
import { ArrowRight, User, Mail, MessageSquare } from 'lucide-react'; // Optional: install lucide-react or use SVGs

function ContactUs() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 py-12 font-sans">
      <div className="max-w-3xl w-full bg-white rounded-[32px] shadow-xl border border-gray-100 overflow-hidden"> 
        <div className="p-8 md:p-12 text-center">
          
          {/* Header Icon/Badge */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 text-[#1d3f94] rounded-2xl mb-6">
            <MessageSquare size={32} />
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Let's Connect!
          </h1>
          
          <p className="text-gray-600 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
            PropBot is built and managed by a dedicated developer. To discuss business, 
            support, or custom inquiries, please visit my official professional portfolio.
          </p>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
              <User className="mx-auto mb-2 text-[#1d3f94]" size={20} />
              <span className="text-sm font-semibold text-gray-700">About Me</span>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
              <Mail className="mx-auto mb-2 text-[#1d3f94]" size={20} />
              <span className="text-sm font-semibold text-gray-700">Email Direct</span>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
              <MessageSquare className="mx-auto mb-2 text-[#1d3f94]" size={20} />
              <span className="text-sm font-semibold text-gray-700">Live Chat</span>
            </div>
          </div>

          {/* The Main Action Button */}
          <a 
            href="https://rahulgope.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 w-full md:w-auto px-10 py-4 bg-[#1d3f94] hover:bg-[#163172] text-white font-bold text-lg rounded-full transition-all transform hover:scale-105 shadow-lg"
          >
            Visit My Portfolio
            <ArrowRight size={20} />
          </a>

          <p className="mt-6 text-sm text-gray-400 italic">
            Redirecting to my Portfolio
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;