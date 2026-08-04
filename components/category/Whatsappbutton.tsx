"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <a
     href="https://api.whatsapp.com/send?phone=+971555661042"
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed
        bottom-3
        right-3
        md:bottom-6
        md:right-6
        z-[9999]
        bg-green-500
        hover:bg-green-600
        text-white
        p-2
        sm:p-2
        md:p-3
        rounded-full
        shadow-lg
        flex
        items-center
        justify-center
      "
    >
      <FaWhatsapp className="text-[24px] md:text-[30px]" />
    </a>
  );
}