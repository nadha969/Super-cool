"use client";
import React, { useState } from 'react';
import { 
  FileText, ShieldCheck, DollarSign, ShoppingBag, 
  Truck, Wrench, ShieldAlert, RotateCcw, UserCheck, 
  AlertTriangle, Copyright, Scale, Lock, ChevronRight 
} from 'lucide-react';
import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';


export default function TermsAndConditions() {
  const [activeSection, setActiveSection] = useState('general');

  const sections = [
    { id: 'general', title: '1. General', icon: FileText },
    { id: 'products', title: '2. Products & Services', icon: ShieldCheck },
    { id: 'pricing', title: '3. Pricing & Payment', icon: DollarSign },
    { id: 'orders', title: '4. Orders & Acceptance', icon: ShoppingBag },
    { id: 'delivery', title: '5. Delivery Policy', icon: Truck },
    { id: 'installation', title: '6. Installation Services', icon: Wrench },
    { id: 'warranty', title: '7. Warranty', icon: ShieldAlert },
    { id: 'returns', title: '8. Returns & Refunds', icon: RotateCcw },
    { id: 'customer', title: '9. Customer Responsibilities', icon: UserCheck },
    { id: 'liability', title: '10. Limitation of Liability', icon: AlertTriangle },
    { id: 'intellectual', title: '11. Intellectual Property', icon: Copyright },
    { id: 'governing', title: '12. Governing Law', icon: Scale },
    { id: 'privacy', title: '13. Privacy', icon: Lock },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
 <div>
    <Header/>
       <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-blue-500 selection:text-white">
   
{/* Hero Heading */}
<section className="relative overflow-hidden border-b border-slate-200 bg-white mt-20">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_30%)]" />

  <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
    <div className="max-w-3xl">
      
      <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600">
        Legal Information
      </div>

      <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
        Terms & Conditions
      </h1>

      <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
        Please read these Terms & Conditions carefully before using our website,
        purchasing products, or requesting installation services from AC MART.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-500">
        <span>AC MART</span>
        <span className="h-1 w-1 rounded-full bg-slate-300"></span>
        <span>UAE Consumer Standards</span>
        <span className="h-1 w-1 rounded-full bg-slate-300"></span>
        <span>Updated Policies</span>
      </div>
    </div>
  </div>
</section>
      {/* Main Content Layout */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 ">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          
          {/* Sticky Navigation Sidebar */}
          <aside className="hidden lg:col-span-4 lg:block xl:col-span-3">
            <nav className="sticky top-8 space-y-1 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
              <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Table of Contents
              </p>
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 shadow-sm'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                      <span className="truncate">{section.title.split('. ')[1]}</span>
                    </div>
                    {isActive && <ChevronRight className="h-4 w-4 text-blue-600" />}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Documentation Body */}
          <main className="bg-white px-6 py-10 shadow-sm ring-1 ring-slate-200/80 sm:rounded-2xl sm:px-10 lg:col-span-8 xl:col-span-9">
            
            {/* Intro */}
            <div className="prose prose-slate max-w-none border-b border-slate-100 pb-8">
              <p className="text-base leading-7 text-slate-600">
                Welcome to <strong className="font-semibold text-slate-900">AC MART</strong>. By accessing or using our website, you agree to comply with and be bound by the following Terms & Conditions. Please read them carefully before using our website or placing an order.
              </p>
            </div>

            {/* Sections */}
            <div className="mt-8 space-y-12">
              
              {/* 1. General */}
              <section id="general" className="scroll-mt-12 group">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-slate-900">1. General</h2>
                </div>
                <div className="mt-4 text-slate-600 space-y-4">
                  <p>These Terms & Conditions govern:</p>
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 pl-4 list-disc marker:text-blue-500">
                    <li>Website usage</li>
                    <li>Product purchases</li>
                    <li>Installation services</li>
                    <li>Warranty and returns</li>
                    <li>Customer responsibilities</li>
                  </ul>
                  <p className="bg-slate-50 p-4 rounded-xl border-l-4 border-blue-500 text-sm italic">
                    We reserve the right to modify these terms at any time without prior notice.
                  </p>
                </div>
              </section>

              {/* 2. Products & Services */}
              <section id="products" className="scroll-mt-12">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <ShieldCheck className="h-5 w-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-slate-900">2. Products & Services</h2>
                </div>
                <div className="mt-4 text-slate-600 space-y-4">
                  <p>We sell air conditioning and HVAC-related products including but not limited to:</p>
                  <div className="grid grid-cols-2 gap-3 rounded-xl border border-slate-100 p-4 bg-slate-50/50">
                    {['Split AC units', 'Ducted AC systems', 'VRF/VRV systems', 'Package units', 'Chillers', 'HVAC accessories & parts'].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
                        {item}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-slate-500">
                    All product specifications, images, capacities, and pricing displayed on the website are subject to change without notice. Product images are for illustration purposes only and may vary slightly from actual products.
                  </p>
                </div>
              </section>

              {/* 3. Pricing & Payment */}
              <section id="pricing" className="scroll-mt-12">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-slate-900">3. Pricing & Payment</h2>
                </div>
                <div className="mt-4 text-slate-600 space-y-3">
                  <ul className="space-y-2 list-none">
                    <li className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500"></span>
                      <span>All prices are displayed in <strong className="text-slate-900">AED (United Arab Emirates Dirham)</strong>.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500"></span>
                      <span>Prices may include or exclude VAT as specified dynamically on checkout.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500"></span>
                      <span>Full payment must be received before order processing unless otherwise agreed.</span>
                    </li>
                  </ul>
                  <p>We accept secure online payments through approved payment gateways. In case of pricing errors, we reserve the right to cancel or revise affected orders.</p>
                </div>
              </section>

              {/* 4. Orders & Acceptance */}
              <section id="orders" className="scroll-mt-12">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <ShoppingBag className="h-5 w-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-slate-900">4. Orders & Acceptance</h2>
                </div>
                <div className="mt-4 text-slate-600 space-y-4">
                  <p>Submitting an order does not guarantee acceptance. We reserve the right to:</p>
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 pl-4 list-disc marker:text-blue-500">
                    <li>Reject or cancel orders</li>
                    <li>Limit quantities</li>
                    <li>Refuse service</li>
                    <li>Verify customer information before processing</li>
                  </ul>
                  <p className="text-sm font-medium text-slate-700 bg-amber-50 border border-amber-200/60 rounded-xl p-3.5">
                    Orders are confirmed only after successful payment and configuration/order verification.
                  </p>
                </div>
              </section>

              {/* 5. Delivery Policy */}
              <section id="delivery" className="scroll-mt-12">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <Truck className="h-5 w-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-slate-900">5. Delivery Policy</h2>
                </div>
                <div className="mt-4 text-slate-600 space-y-4">
                  <p>Delivery timelines are estimates and may vary depending on product availability, location within the UAE, and standard logistics conditions.</p>
                  
                  <div className="rounded-xl border border-slate-200 overflow-hidden text-sm">
                    <div className="bg-slate-50 px-4 py-2.5 font-semibold text-slate-900 border-b border-slate-200">Customer Obligations</div>
                    <div className="p-4 space-y-1.5 bg-white">
                      <p>• Ensure correct and complete delivery address.</p>
                      <p>• Assure full site accessibility for transit vehicles.</p>
                      <p>• Maintain customer availability during the scheduled delivery window.</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-500">
                    * Additional charges may apply for remote areas, required crane lifting, or special structural handling requirements. Risk and ownership transfer to the customer immediately upon delivery.
                  </p>
                </div>
              </section>

              {/* 6. Installation Services */}
              <section id="installation" className="scroll-mt-12">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <Wrench className="h-5 w-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-slate-900">6. Installation Services</h2>
                </div>
                <div className="mt-4 text-slate-600 space-y-4">
                  <p>Installation services, if provided, are explicitly subject to site inspection, technical feasibility, and additional structural/material requirements.</p>
                  
                  <p className="font-semibold text-slate-900 text-sm">Standard installation does NOT include:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-4 text-sm">
                    {['Electrical structural work', 'Duct modifications', 'Core cutting / Core drilling', 'Drain piping beyond standard limits', 'Ceiling repair or structural civil work'].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 text-slate-600">
                        <span className="text-red-500 font-bold">✕</span> {item}
                      </div>
                    ))}
                  </div>
                  <p className="bg-slate-50 p-4 rounded-xl text-xs text-slate-500">
                    Customers are uniquely responsible for obtaining any required building approvals or community management NOCs prior to work commencement.
                  </p>
                </div>
              </section>

              {/* 7. Warranty */}
              <section id="warranty" className="scroll-mt-12">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <ShieldAlert className="h-5 w-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-slate-900">7. Warranty</h2>
                </div>
                <div className="mt-4 text-slate-600 space-y-4">
                  <p>Products include localized manufacturer warranties subject directly to UAE regional distributor policies. <span className="font-semibold text-red-600">Warranty does not cover:</span></p>
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 pl-4 list-disc marker:text-red-400">
                    <li>Improper field installation</li>
                    <li>Electrical surges/fluctuations</li>
                    <li>Misuse or structural negligence</li>
                    <li>Unauthorized technical repairs</li>
                    <li>Normal wear and tear</li>
                    <li>Lack of periodic preventive maintenance</li>
                  </ul>
                </div>
              </section>

              {/* 8. Returns & Refunds */}
              <section id="returns" className="scroll-mt-12">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <RotateCcw className="h-5 w-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-slate-900">8. Returns & Refunds</h2>
                </div>
                <div className="mt-4 text-slate-600 space-y-3">
                  <p>Returns and refunds are strictly governed by our standalone Refund Policy.</p>
                  <p className="bg-red-50/60 border border-red-100 text-slate-700 p-4 rounded-xl text-sm">
                    <strong>Important:</strong> Installed, used, or customized HVAC products are non-returnable unless structural manufacturing defects are present. All refund approvals are strictly subject to technical product inspection.
                  </p>
                </div>
              </section>

              {/* 9. Customer Responsibilities */}
              <section id="customer" className="scroll-mt-12">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <UserCheck className="h-5 w-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-slate-900">9. Customer Responsibilities</h2>
                </div>
                <div className="mt-4 text-slate-600 space-y-3">
                  <p>Customers are explicitly responsible for:</p>
                  <ul className="space-y-1.5 pl-4 list-decimal marker:text-blue-500 marker:font-semibold">
                    <li>Providing strictly accurate setup/contact information.</li>
                    <li>Ensuring correct building power supply and stable operational installation conditions.</li>
                    <li>Maintaining the equipment periodically as per manufacturer guidelines.</li>
                  </ul>
                  <p className="text-xs text-slate-500 italic">Failure to strictly follow manufacturer structural recommendations may completely void warranty coverage.</p>
                </div>
              </section>

              {/* 10. Limitation of Liability */}
              <section id="liability" className="scroll-mt-12">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <AlertTriangle className="h-5 w-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-slate-900">10. Limitation of Liability</h2>
                </div>
                <div className="mt-4 text-slate-600 space-y-3">
                  <p>AC MART shall not be liable under any circumstances for:</p>
                  <ul className="space-y-1 pl-4 list-disc marker:text-slate-400">
                    <li>Indirect or consequential downstream damages</li>
                    <li>Corporate business interruption or loss of revenue</li>
                    <li>Delays directly caused by primary suppliers or third-party logistics providers</li>
                    <li>Installation issues stemming from uncontrollable site conditions</li>
                  </ul>
                  <p className="font-semibold text-slate-900 mt-2">Our absolute maximum liability shall not exceed the verified purchase value of the product.</p>
                </div>
              </section>

              {/* 11. Intellectual Property */}
              <section id="intellectual" className="scroll-mt-12">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <Copyright className="h-5 w-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-slate-900">11. Intellectual Property</h2>
                </div>
                <div className="mt-4 text-slate-600 space-y-2">
                  <p>All website assets and content including logos, images, custom product descriptions, graphics, and underlying code/website design are the exclusive property of AC MART and may not be copied, scraped, or reproduced without prior written permission.</p>
                </div>
              </section>

              {/* 12. Governing Law */}
              <section id="governing" className="scroll-mt-12">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <Scale className="h-5 w-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-slate-900">12. Governing Law</h2>
                </div>
                <div className="mt-4 text-slate-600 space-y-2">
                  <p>These Terms & Conditions are governed by and construed in accordance with the federal laws of the United Arab Emirates. Any legal disputes shall be subject exclusively to the jurisdiction of the UAE courts.</p>
                </div>
              </section>

              {/* 13. Privacy */}
              <section id="privacy" className="scroll-mt-12">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <Lock className="h-5 w-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-slate-900">13. Privacy</h2>
                </div>
                <div className="mt-4 text-slate-600 space-y-2">
                  <p>Customer information, transaction data, and communications are processed securely handled in strict accordance with our comprehensive Privacy Policy.</p>
                </div>
              </section>

            </div>

        

          </main>
        </div>
      </div>
    </div>
    <Footer/>
 </div>
  );
}