import React from 'react';
import {
  Phone, Mail, MapPin, MessageCircle, Heart, Shield,
  Truck, RotateCcw, Clock, ExternalLink
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { BrandLogo } from '../brand/BrandLogo';

export const Footer: React.FC = () => {
  const { settings, categories, setSelectedCategory, setCurrentView, setActivePolicyModal } = useStore();

  return (
    <footer className="bg-[#2A101A] text-white pt-12 pb-8 border-t-4 border-[#D9A441]">
      {/* 1. Value Proposition Highlights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-10 border-b border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#BE0750]/20 flex items-center justify-center shrink-0 text-[#D9A441]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold font-bangla">সারা বাংলাদেশে ডেলিভারি</h4>
              <p className="text-[11px] text-gray-400 mt-0.5">ক্যাশ অন ডেলিভারি সুবিধা ও দ্রুত পার্সেল হ্যান্ডলিং</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#BE0750]/20 flex items-center justify-center shrink-0 text-[#D9A441]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold font-bangla">১০০% আসল ও কোয়ালিটি পণ্য</h4>
              <p className="text-[11px] text-gray-400 mt-0.5">প্রতিটি পণ্যের গুণগত মান সরাসরি যাচাইকৃত</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#BE0750]/20 flex items-center justify-center shrink-0 text-[#D9A441]">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold font-bangla">সহজ রিটার্ন পলিসি</h4>
              <p className="text-[11px] text-gray-400 mt-0.5">৭ দিনের মধ্যে নিরাপদ রিটার্ন ও এক্সচেঞ্জ গ্যারান্টি</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#BE0750]/20 flex items-center justify-center shrink-0 text-[#D9A441]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold font-bangla">ডেডিকেটেড কাস্টমার সাপোর্ট</h4>
              <p className="text-[11px] text-gray-400 mt-0.5">সকাল ৯টা - রাত ১১টা পর্যন্ত সার্বক্ষণিক সেবা</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="md" variant="light" />
            <p className="text-xs text-gray-300 leading-relaxed font-bangla max-w-sm">
              প্রেয়সী শপ বাংলাদেশের নারীদের ফ্যাশন, শাড়ি, ঐতিহ্যবাহী ঢাকাই জামদানি, এক্সক্লুসিভ কুন্দন জুয়েলারি ও লাইফস্টাইলের বিশ্বস্ত অনলাইন শপিং ঠিকানা।
            </p>
            <div className="pt-2 text-xs text-[#D9A441] font-medium flex items-center gap-1.5">
              <span>Brand Identity & Design by:</span>
              <strong className="text-white bg-[#BE0750]/40 px-2 py-0.5 rounded-sm">Nurtaz Agency</strong>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1877F2] hover:bg-[#1565C0] flex items-center justify-center text-white transition-colors text-sm font-bold shadow-xs"
                title="Follow Preyoshi Shop on Facebook"
              >
                f
              </a>
              <a
                href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] flex items-center justify-center text-white transition-colors shadow-xs"
                title="Message on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`tel:${settings.supportPhone}`}
                className="w-9 h-9 rounded-full bg-[#BE0750] hover:bg-[#9c0641] flex items-center justify-center text-white transition-colors shadow-xs"
                title="Call Support Hotline"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-sm font-bold text-[#D9A441] uppercase tracking-wider mb-3 font-serif-brand">
              ক্যাটাগরি
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              {categories.slice(0, 6).map(cat => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setCurrentView('store');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-[#F6E2B3] transition-colors font-bangla cursor-pointer"
                  >
                    {cat.nameBn} ({cat.nameEn})
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service & Policies */}
          <div>
            <h4 className="text-sm font-bold text-[#D9A441] uppercase tracking-wider mb-3 font-serif-brand">
              গ্রাহক সেবা
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <button
                  onClick={() => setActivePolicyModal('contact')}
                  className="hover:text-[#F6E2B3] transition-colors cursor-pointer"
                >
                  যোগাযোগ (Contact Us)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicyModal('faq')}
                  className="hover:text-[#F6E2B3] transition-colors cursor-pointer"
                >
                  সাধারণ জিজ্ঞাসা (FAQ)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicyModal('return_policy')}
                  className="hover:text-[#F6E2B3] transition-colors cursor-pointer"
                >
                  রিটার্ন ও রিফান্ড পলিসি
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicyModal('privacy')}
                  className="hover:text-[#F6E2B3] transition-colors cursor-pointer"
                >
                  গোপনীয়তা নীতি (Privacy Policy)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicyModal('terms')}
                  className="hover:text-[#F6E2B3] transition-colors cursor-pointer"
                >
                  শর্তাবলী (Terms & Conditions)
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Information & Official Address */}
          <div>
            <h4 className="text-sm font-bold text-[#D9A441] uppercase tracking-wider mb-3 font-serif-brand">
              অফিস ঠিকানা
            </h4>
            <div className="space-y-3 text-xs text-gray-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D9A441] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{settings.supportAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D9A441] shrink-0" />
                <a href={`tel:${settings.supportPhone}`} className="hover:text-white transition-colors">
                  {settings.supportPhone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D9A441] shrink-0" />
                <a href={`mailto:${settings.supportEmail}`} className="hover:text-white transition-colors">
                  {settings.supportEmail}
                </a>
              </div>
              <div className="pt-2">
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#F6E2B3] hover:underline"
                >
                  <span>facebook.com/Preyoshishop</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Bar & Bangladesh Payment Methods */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
        <div className="flex items-center gap-1 font-bangla text-center sm:text-left">
          <span>© {new Date().getFullYear()} PREYOSHI SHOP (প্রেয়সী শপ). সর্বস্বত্ব সংরক্ষিত। Your Style</span>
          <Heart className="w-3.5 h-3.5 text-[#BE0750] fill-current inline mx-0.5" />
          <span>Our Priority.</span>
        </div>

        {/* Payment Partner Icons */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <span className="text-[11px] text-gray-400 font-medium mr-1">পেমেন্ট মেথড:</span>
          <span className="px-2 py-0.5 bg-white text-[#2A101A] font-bold text-[10px] rounded-md shadow-xs">
            ক্যাশ অন ডেলিভারি
          </span>
          <span className="px-2 py-0.5 bg-[#E2136E] text-white font-bold text-[10px] rounded-md shadow-xs">
            bKash
          </span>
          <span className="px-2 py-0.5 bg-[#F7941D] text-white font-bold text-[10px] rounded-md shadow-xs">
            Nagad
          </span>
          <span className="px-2 py-0.5 bg-[#8C3494] text-white font-bold text-[10px] rounded-md shadow-xs">
            Rocket
          </span>
        </div>
      </div>

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20Preyoshi%20Shop%20Support`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-40 bg-[#25D366] hover:bg-[#1EBE5D] text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 group"
        title="Chat with Preyoshi Shop on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold pl-0 group-hover:pl-2">
          WhatsApp এ চ্যাট করুন
        </span>
      </a>
    </footer>
  );
};
