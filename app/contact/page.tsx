"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import { toast } from "react-toastify";

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(
        "/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

toast.success("Message sent successfully!");
      if (res.ok) {
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
      }
    } catch (error) {
     toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-white">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* LEFT SIDE */}

    <div className="bg-[#476685] text-white p-8 sm:p-10 lg:p-16 flex flex-col justify-center">

  {/* Logo & Company Name */}
  <div className="flex items-center gap-3 sm:gap-4 mb-6">
    <Image
      src="/logo/acmartbg.png"
      alt="ACMart UAE"
      width={100}
      height={80}
      className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
      priority
    />

    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
        AC MART UAE
      </h2>
    </div>
  </div>

  <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-10">
    Contact Us
  </h1>

  <div className="space-y-8">

    <div className="flex items-start gap-4">
      <Phone
        size={28}
        className="text-blue-300 mt-1 shrink-0"
      />

      <div>
        <p className="font-semibold mb-1">
          Phone
        </p>

        <a
          href="tel:+971569011041"
          className="text-base sm:text-lg hover:text-blue-300"
        >
         +971 555 66 1042
        </a>
      </div>
    </div>

    <div className="flex items-start gap-4">
      <Mail
        size={28}
        className="text-blue-300 mt-1 shrink-0"
      />

      <div>
        <p className="font-semibold mb-1">
          Email
        </p>

        <a
          href="mailto:sales@acmartuae.com"
          className="text-base sm:text-lg hover:text-blue-300 break-all"
        >
          sales@acmartuae.com
        </a>
      </div>
    </div>

    <div className="flex items-start gap-4">
      <MapPin
        size={28}
        className="text-blue-300 mt-1 shrink-0"
      />

      <div>
        <p className="font-semibold mb-1">
          Address
        </p>

        <p className="text-base sm:text-lg leading-7">
          Dubai
          <br />
          United Arab Emirates
        </p>
      </div>
    </div>

  </div>
</div>

        {/* RIGHT SIDE */}

        <div className="flex items-center justify-center p-8 md:p-16">
          <div className="w-full max-w-3xl">
            <form
              onSubmit={handleSubmit}
              className="space-y-10"
            >
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <label className="block text-sm font-semibold mb-3">
                    First Name
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    placeholder="John"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    className="w-full border-b-2 border-gray-300 py-3 outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3">
                    Last Name
                  </label>

                  <input
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                    className="w-full border-b-2 border-gray-300 py-3 outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <label className="block text-sm font-semibold mb-3">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full border-b-2 border-gray-300 py-3 outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3">
                    Phone Number
                  </label>

                  <input
                    type="text"
                    name="phone"
                    placeholder="+971 000000000"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="w-full border-b-2 border-gray-300 py-3 outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">
                  Message
                </label>

                <textarea
                  rows={5}
                  name="message"
                  placeholder="Write your message..."
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="w-full border-b-2 border-gray-300 py-3 outline-none resize-none focus:border-blue-600"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#17416b] hover:bg-blue-800 text-white px-10 py-4 rounded-md font-medium transition disabled:opacity-50"
                >
                  {loading
                    ? "Sending..."
                    : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}