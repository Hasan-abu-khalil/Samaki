import Image from "next/image";
import { Phone, Facebook, Instagram, Youtube } from "lucide-react";
import { FaSnapchatGhost } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-3 text-center md:text-right">
        {/* Logo */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <Image
            src="/images/footerLogo.jpg"
            alt="Samaki Chips"
            width={100}
            height={100}
            priority
            className="rounded-full drop-shadow-xl"
          />
          <p className="text-sm text-gray-400">نكهة مميزة وجودة عالية</p>
        </div>

        {/* Contact */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold">تواصل معنا</h3>

          <p className="flex items-center justify-center md:justify-end gap-2">
            <Phone size={18} /> مبيعات الجملة: 0799989669
          </p>
          <p className="flex items-center justify-center md:justify-end gap-2">
            <Phone size={18} /> مبيعات التصدير: 0798610108
          </p>
          <p className="flex items-center justify-center md:justify-end gap-2">
            <Phone size={18} /> مبيعات التجزئة: 0795205867
          </p>
        </div>

        {/* Social */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold">تابعنا على</h3>
          <div className="flex justify-center md:justify-end gap-4">
            <Facebook size={24} />
            <Instagram size={24} />
            <Youtube size={24} />

            <a
              href="https://www.snapchat.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 transition"
            >
              <FaSnapchatGhost size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} Samaki Chips – جميع الحقوق محفوظة
      </div>
    </footer>
  );
}
