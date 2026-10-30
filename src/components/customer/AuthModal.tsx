import React, { useState } from 'react';
import { X, Lock, Phone, User as UserIcon, ShieldCheck, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import { BrandLogo } from '../brand/BrandLogo';

export const AuthModal: React.FC = () => {
  const { isAuthOpen, setIsAuthOpen } = useStore();
  const { login, loginAsAdmin } = useAuth();

  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [phoneOrEmail, setPhoneOrEmail] = useState('');

  if (!isAuthOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneOrEmail.trim()) return;
    login(phoneOrEmail.trim(), isRegister ? name.trim() : undefined);
    setIsAuthOpen(false);
  };

  const handleDemoAdmin = () => {
    loginAsAdmin();
    setIsAuthOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="relative w-full max-w-md bg-[#FFF9F2] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#7A1238]/20 text-center space-y-5">
        <button
          onClick={() => setIsAuthOpen(false)}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex justify-center mb-2">
          <BrandLogo size="md" />
        </div>

        <div>
          <h3 className="text-xl font-bold font-bangla text-[#2A101A]">
            {isRegister ? 'নতুন কাস্টমার একাউন্ট তৈরি করুন' : 'আপনার একাউন্টে লগইন করুন'}
          </h3>
          <p className="text-xs text-gray-500 font-bangla mt-1">
            অর্ডার হিস্টোরি ও দ্রুত চেকআউটের সুবিধা উপভোগ করুন
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
          {isRegister && (
            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1 font-bangla">
                আপনার নাম:
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="যেমন: তানজিলা আহমেদ"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-[#BE0750]"
                />
                <UserIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold text-gray-700 mb-1 font-bangla">
              মোবাইল নম্বর অথবা ইমেইল:
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={phoneOrEmail}
                onChange={e => setPhoneOrEmail(e.target.value)}
                placeholder="017XXXXXXXX অথবা user@email.com"
                className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-[#BE0750]"
              />
              <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-[#7A1238] hover:bg-[#BE0750] text-white font-bold text-xs font-bangla transition-colors shadow-md cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>{isRegister ? 'একাউন্ট খুলুন' : 'লগইন করুন'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="pt-2 text-xs text-gray-600 font-bangla">
          {isRegister ? (
            <span>
              পূর্বেই একাউন্ট আছে?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(false)}
                className="text-[#BE0750] font-bold hover:underline"
              >
                লগইন করুন
              </button>
            </span>
          ) : (
            <span>
              নতুন ক্রেতা?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(true)}
                className="text-[#BE0750] font-bold hover:underline"
              >
                একাউন্ট তৈরি করুন
              </button>
            </span>
          )}
        </div>

        {/* Demo Fast Login Switcher */}
        <div className="pt-4 border-t border-gray-200 space-y-2">
          <p className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold font-serif-brand">
            ডেমো দ্রুত অ্যাক্সেস
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                login('01712345678', 'মাহিম ইসলাম (কাস্টমার)');
                setIsAuthOpen(false);
              }}
              className="flex-1 py-1.5 px-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-[11px] font-medium transition-colors"
            >
              কাস্টমার হিসেবে লগইন
            </button>
            <button
              onClick={handleDemoAdmin}
              className="flex-1 py-1.5 px-2 bg-[#7A1238]/10 hover:bg-[#7A1238]/20 text-[#7A1238] rounded-xl text-[11px] font-bold transition-colors flex items-center justify-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#BE0750]" />
              <span>অ্যাডমিন প্যানেল</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
