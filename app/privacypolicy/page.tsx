"use client";
import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';
import React from 'react';

interface PolicySection {
  id: string;
  title: string;
  content: React.ReactNode;
}

export default function PrivacyPolicy() {
  const sections: PolicySection[] = [
    {
      id: 'collection',
      title: '1. Information We Collect',
      content: (
        <div className="space-y-4">
          <p>When you use our website, we may collect the following information:</p>
          <div className="grid md:grid-cols-2 gap-4 mt-2">
            <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100">
              <h4 className="font-semibold text-blue-900 mb-2">Personal Information</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                <li>Full name, email address, and phone number</li>
                <li>Billing and shipping addresses</li>
                <li>Payment details</li>
                <li>Company information (if applicable)</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <h4 className="font-semibold text-slate-900 mb-2">Technical Information</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                <li>IP address and browser type</li>
                <li>Device information and usage data</li>
                <li>Cookies and tracking technologies</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'usage',
      title: '2. How We Use Your Information',
      content: (
        <div className="space-y-2">
          <p>We use your information to fulfill our commitments to you and improve your overall experience:</p>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 list-disc list-inside text-slate-600">
            <li>Process and deliver orders</li>
            <li>Provide reliable customer support</li>
            <li>Send order confirmations and updates</li>
            <li>Improve website performance</li>
            <li>Prevent fraud and unauthorized access</li>
            <li>Send promotional offers (with consent)</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'payment',
      title: '3. Payment Information',
      content: (
        <p>
          All online payments are processed securely through third-party payment gateways. 
          <strong className="text-slate-900 font-medium"> We do not store complete credit or debit card information on our servers.</strong> All payment transactions are fully encrypted using modern, secure standard protocols.
        </p>
      ),
    },
    {
      id: 'sharing',
      title: '4. Sharing of Information',
      content: (
        <div className="space-y-3">
          <p>We value your trust. <span className="font-semibold text-blue-600">We do not sell or rent your personal information to anyone.</span> However, we may share essential data with:</p>
          <ul className="list-disc list-inside space-y-1 text-slate-600 pl-2">
            <li>Trusted delivery and logistics providers</li>
            <li>Secure payment gateway providers</li>
            <li>IT infrastructure and hosting service providers</li>
            <li>Government or legal authorities if required strictly under UAE law</li>
          </ul>
          <p className="text-sm italic text-slate-500 bg-slate-50 p-3 rounded-lg border-l-4 border-slate-300">
            All authorized third parties are legally and contractually obligated to protect your information to the same standards we uphold.
          </p>
        </div>
      ),
    },
    {
      id: 'cookies',
      title: '5. Cookies Policy',
      content: (
        <p>
          Our website uses cookies to improve overall functionality, analyze visitor traffic patterns, and remember your individual preferences. You maintain full control and can choose to disable cookies through your personal browser settings; however, note that doing so may prevent certain dynamic website features from functioning properly.
        </p>
      ),
    },
    {
      id: 'security',
      title: '6. Data Security',
      content: (
        <p>
          We implement industry-standard technical and organizational security measures built to safeguard your personal data against unauthorized access, accidental loss, misuse, alteration, or disclosure. Despite our rigorous layers of defense, please note that no internet-based platform can ever guarantee absolute, unbreachable security.
        </p>
      ),
    },
    {
      id: 'rights',
      title: '7. Your Rights',
      content: (
        <div className="space-y-3">
          <p>Subject to applicable UAE laws and regulatory requirements, you hold the right to request to:</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            {['Access Data', 'Correct Info', 'Delete Data', 'Withdraw Consent'].map((right, idx) => (
              <div key={idx} className="p-3 text-sm font-medium border border-slate-200 rounded-lg text-slate-700 bg-white shadow-sm">
                {right}
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-500 mt-2">
            Any requests regarding these rights can be submitted directly through our official corporate contact channels.
          </p>
        </div>
      ),
    },
    {
      id: 'third-party',
      title: '8. Third-Party Links',
      content: (
        <p>
          Our website may occasionally feature links to external, third-party websites. Please be aware that we are not responsible for the independent privacy practices, guidelines, or content found on those external platforms.
        </p>
      ),
    },
    {
      id: 'retention',
      title: '9. Retention of Information',
      content: (
        <p>
          We safely retain customer information only for the duration necessary to fully complete transactions, reliably comply with our legal and tax obligations, resolve outstanding disputes, and enforce our formal agreements.
        </p>
      ),
    },
    {
      id: 'changes',
      title: '10. Changes to This Policy',
      content: (
        <p>
          We reserve the standard right to update this Privacy Policy at any time. When updates occur, changes will be posted transparently on this page alongside a modified effective date displayed prominently at the top.
        </p>
      ),
    },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 90; // account for possible sticky header offsets
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
<div>
      <Header />    
<div className="min-h-screen bg-slate-50/50 text-slate-700 antialiased font-sans selection:bg-blue-100 selection:text-blue-900">      {/* Hero Header Section */}
    {/* Top Heading Section */}
<div className="border-b border-slate-200 bg-white mt-20">
  <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
    
    <div className="max-w-3xl">
      
      <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
        Legal & Privacy
      </p>

      <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
        Privacy Policy
      </h1>

      <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
        At AC MART, we respect your privacy and are committed to protecting
        your personal information in accordance with applicable UAE laws and
        regulations. This Privacy Policy explains how we collect, use,
        disclose, and protect your information when you use our website,
        products, and services.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-500">
        <span>AC MART</span>

        <span className="h-1 w-1 rounded-full bg-slate-300"></span>

        <span>UAE Privacy Standards</span>

        <span className="h-1 w-1 rounded-full bg-slate-300"></span>

        <span>Effective May 2026</span>
      </div>

    </div>

  </div>
</div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
          
          {/* Quick-links Sidebar Navigation */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-34 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <h2 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-4">
              Table of Contents
            </h2>
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="w-full text-left text-sm py-2 px-3 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-200 font-medium block truncate"
                >
                  {section.title.split('. ')[1] || section.title}
                </button>
              ))}
            </nav>
          </aside>

          {/* Dynamic Sections */}
          <main className="lg:col-span-8 space-y-10">
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 md:p-10 space-y-10">
              {sections.map((section, index) => (
                <div 
                  key={section.id} 
                  id={section.id} 
                  className={`scroll-mt-10 ${index !== 0 ? 'pt-10 border-t border-slate-100' : ''}`}
                >
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-4 hover:text-blue-600 transition-colors duration-200">
                    {section.title}
                  </h3>
                  <div className="text-slate-600 leading-relaxed space-y-4 text-[15px]">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>
            
          </main>

        </div>
      </div>
    </div>
            <Footer />

      </div>
  );
}