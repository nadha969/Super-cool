"use client";

import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';
import React from 'react';

interface PolicySection {
  id: string;
  title: string;
  content: React.ReactNode;
}

export default function RefundPolicy() {
  const sections: PolicySection[] = [
    {
      id: 'eligibility',
      title: '1. Return Eligibility',
      content: (
        <div className="space-y-4">
          <p>Customers may request a return or refund under the following strict conditions:</p>
          <ul className="grid sm:grid-cols-2 gap-3 list-none p-0 m-0">
            {[
              "The product is defective, damaged, or not functioning properly.",
              "The wrong product was delivered.",
              "The item received does not match the product description.",
              "The return request is submitted within 7 days of delivery.",
              "The item is completely unused, unaltered, and in pristine condition.",
              "Returned in its original packaging with all accessories, manuals, and original invoice."
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-sm">
                <span className="text-blue-600 font-bold text-base leading-none mt-0.5">•</span>
                <span className="text-slate-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: 'non-returnable',
      title: '2. Non-Returnable Items',
      content: (
        <div className="space-y-3">
          <p>The following items are strictly <span className="font-semibold text-rose-600">not eligible</span> for return or refund unless they were explicitly received damaged or defective at the time of delivery:</p>
          <div className="p-4 rounded-xl bg-rose-50/40 border border-rose-100">
            <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-600">
              <li><strong className="text-slate-800 font-medium">Installed or used</strong> air conditioning units and HVAC equipment</li>
              <li>Customized specifications or special-order configurations</li>
              <li>Products structural or electrical damage caused by improper installation or misuse</li>
              <li>Clearance event collections or items marked as final sale</li>
              <li>Consumables and smaller matching components/accessories</li>
              <li>Any product returned without original retail boxes or valid proof of purchase</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 'damaged-defective',
      title: '3. Damaged or Defective Products',
      content: (
        <div className="space-y-4">
          <p>If you receive a compromised, damaged, or defective item, please complete the following steps:</p>
          <div className="grid sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 border border-slate-200 rounded-xl bg-white shadow-sm">
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Step 1</div>
              <div className="text-sm font-semibold text-slate-900">Notify Us</div>
              <p className="text-xs text-slate-500 mt-1">Within 48 hours of your delivery time window.</p>
            </div>
            <div className="p-4 border border-slate-200 rounded-xl bg-white shadow-sm">
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Step 2</div>
              <div className="text-sm font-semibold text-slate-900">Share Media</div>
              <p className="text-xs text-slate-500 mt-1">Provide clear photos or video proof tracking the issue.</p>
            </div>
            <div className="p-4 border border-slate-200 rounded-xl bg-white shadow-sm">
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Step 3</div>
              <div className="text-sm font-semibold text-slate-900">Technical Inspection</div>
              <p className="text-xs text-slate-500 mt-1">Our support team will inspect and verify your claim.</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2">
            Once approved by our technician teams, we will extend a <strong className="text-slate-900 font-medium">Repair, Replacement, or Refund</strong> option as applicable under UAE Consumer Protection regulations.
          </p>
        </div>
      ),
    },
    {
      id: 'cancellation',
      title: '4. Cancellation Policy',
      content: (
        <ul className="list-disc list-inside space-y-2 text-slate-600">
          <li>Orders may be safely cancelled <strong className="text-slate-800">before shipment</strong> without incurring any penalty charges.</li>
          <li>Orders already mid-transit or actively processed may be subject to restocking or logistical transit deductions.</li>
          <li>Customized setups or special wholesale procurements cannot be canceled once formal validation is confirmed.</li>
        </ul>
      ),
    },
    {
      id: 'refund-process',
      title: '5. Refund Process',
      content: (
        <div className="space-y-4">
          <p>Approved funds are automatically returned through the original payment gateway channel utilized during purchase:</p>
          <div className="overflow-hidden border border-slate-200 rounded-xl">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-medium">
                  <th className="p-3">Payment Method</th>
                  <th className="p-3">Expected Delivery Timeline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr>
                  <td className="p-3 font-medium text-slate-900">Card Payments (Credit/Debit)</td>
                  <td className="p-3 text-blue-600 font-medium">7 – 14 Business Days</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-900">Bank Wire Transfers</td>
                  <td className="p-3 text-blue-600 font-medium">3 – 7 Business Days</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-900">Cash on Delivery (COD)</td>
                  <td className="p-3">Issued strictly via Bank Transfer only</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs bg-blue-50/50 text-blue-900 p-3 rounded-lg border-l-4 border-blue-500 italic">
            Note: Standard logistics, field installation, and specific handling fees are entirely non-refundable unless the return is caused due to an operational mistake on our end.
          </p>
        </div>
      ),
    },
    {
      id: 'shipping',
      title: '6. Return Shipping',
      content: (
        <p>
          Customers remain accountable for outbound return shipping fees unless the system is inspected to be functionally defective or misrouted. For protection against data or asset losses, we strongly advise coordinating return drop-offs via trackable professional courier networks.
        </p>
      ),
    },
    {
      id: 'warranty',
      title: '7. Warranty Limitations',
      content: (
        <div className="space-y-2">
          <p>
            Products offered cross-platform carry manufacturer warranties bounded by localized brand protocols and designated UAE distributor directives. 
          </p>
          <p className="font-semibold text-slate-900 text-sm mt-3 mb-1">Standard warranties explicitly exclude coverage for:</p>
          <ul className="grid grid-cols-2 gap-2 list-disc list-inside text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <li>Improper or third-party installation</li>
            <li>Electrical line/voltage fluctuations</li>
            <li>Misuse or negligent maintenance</li>
            <li>Normal structural wear and tear</li>
          </ul>
        </div>
      ),
    },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 90;
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
    <Header/>
      <div className="min-h-screen bg-slate-50/50 text-slate-700 antialiased font-sans selection:bg-blue-100 selection:text-blue-900 mt-20">
      {/* Header Container */}
      <div className="bg-white border-b border-slate-200 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Operations & Support
          </span>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mt-3">
            Refund & Return Policy
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-sm text-slate-500">
            <p>Company: <span className="font-medium text-slate-700">AC MART</span></p>
            <span className="hidden sm:inline text-slate-300">•</span>
          </div>
          <p className="mt-6 text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed">
            At AC MART, we value customer satisfaction and aim to provide a transparent and fair shopping experience in accordance with UAE Consumer Protection Laws. By placing an order on our website, you agree to the conditions outlined below.
          </p>
        </div>
      </div>

      {/* Main Section Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
          
          {/* Quick Nav Links Anchor */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-35 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <h2 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-4">
              Policy Structure
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

          {/* Policy Text Blocks */}
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
    <Footer/>
  </div>
  );
}