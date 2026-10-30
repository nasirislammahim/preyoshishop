import React, { useState, useRef, useEffect } from 'react';
import {
  Search, ShoppingBag, Heart, User, ShieldCheck,
  Phone, MessageCircle, Truck, Package, X, ChevronRight, Menu
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import { BrandLogo } from '../brand/BrandLogo';
import { PWAInstallButton } from './PWAInstallButton';

export const Header: React.FC = () => {
  const {
    cartCount,
    cartSubtotal,
    wishlist,
    products,
    categories,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    setIsCartOpen,
    setIsAuthOpen,
    setIsProfileOpen,
    setIsOrderTrackingOpen,
    currentView,
    setCurrentView,
    setSelectedProductId,
    settings
  } = useStore();

  const { currentUser, isAdmin } = useAuth();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Search results preview
  const searchResults = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return products
      .filter(p =>
        p.nameEn.toLowerCase().includes(q) ||
        p.nameBn.includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
      )
      .slice(0, 5);
  }, [searchQuery, products]);

  // Click outside to close search preview
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSearchResult = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentView('product_detail');
    setIsSearchFocused(false);
    setSearchQuery('');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFF9F2] border-b border-[#7A1238]/10 shadow-xs">
      {/* 1. Top Announcement Bar */}
      <div className="bg-gradient-to-r from-[#7A1238] via-[#BE0750] to-[#7A1238] text-white text-[11px] sm:text-xs py-1.5 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <a
              href={`tel:${settings.supportPhone}`}
              className="flex items-center gap-1.5 hover:text-[#F6E2B3] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#D9A441]" />
              <span className="hidden sm:inline font-bangla">হটলাইন:</span>
              <span className="font-semibold">{settings.supportPhone}</span>
            </a>
            <a
              href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20Preyoshi%20Shop`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1 hover:text-[#F6E2B3] transition-colors"
            >
              <MessageCircle className="w-3 h-3 text-[#25D366]" />
              <span>WhatsApp</span>
            </a>
            <a
              href={settings.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1 hover:text-[#F6E2B3] transition-colors"
            >
              <span className="text-[#F6E2B3] font-bold">f</span>
              <span>Facebook Page</span>
            </a>
          </div>

          <div className="flex items-center gap-2 text-center truncate">
            <Truck className="w-3.5 h-3.5 text-[#D9A441] shrink-0 hidden sm:inline" />
            <span className="truncate">
              ক্যাশ অন ডেলিভারি সুবিধা · ৳{settings.delivery.freeDeliveryThreshold.toLocaleString()} এর অর্ডারে ফ্রি ডেলিভারি!
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOrderTrackingOpen(true)}
              className="flex items-center gap-1 hover:text-[#F6E2B3] transition-colors font-medium cursor-pointer"
            >
              <Package className="w-3 h-3 text-[#D9A441]" />
              <span>অর্ডার ট্র্যাক</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between gap-3 sm:gap-6">
        {/* Brand Logo */}
        <button
          onClick={() => {
            setCurrentView('store');
            setSelectedCategory('all');
          }}
          className="text-left shrink-0 cursor-pointer focus:outline-hidden"
        >
          <BrandLogo size="md" />
        </button>

        {/* Live Search Bar */}
        <div ref={searchRef} className="relative flex-1 max-w-lg hidden md:block">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setIsSearchFocused(true);
              }}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="পণ্য বা ক্যাটাগরি সার্চ করুন... (e.g. জামদানি, শাড়ি, জুয়েলারি, ব্যাগ)"
              className="w-full bg-white pl-10 pr-9 py-2 text-xs sm:text-sm rounded-full border border-[#D9A441]/40 focus:border-[#BE0750] focus:ring-2 focus:ring-[#BE0750]/20 focus:outline-hidden text-gray-800 placeholder:text-gray-400 shadow-2xs transition-all font-bangla"
            />
            <Search className="w-4 h-4 text-[#7A1238] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600 rounded-full"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Instant Search Results Dropdown */}
          {isSearchFocused && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
              <div className="p-2 border-b border-gray-100 flex items-center justify-between text-[11px] text-gray-500 font-medium">
                <span>সার্চ ফলাফল ({searchResults.length})</span>
                <span className="text-[#BE0750]">সব ফলাফল দেখতে ক্লিক করুন</span>
              </div>
              <div className="divide-y divide-gray-50 max-h-80 overflow-y-auto">
                {searchResults.map(product => (
                  <button
                    key={product.id}
                    onClick={() => handleSelectSearchResult(product.id)}
                    className="w-full text-left p-2.5 hover:bg-[#F8E8E9]/50 flex items-center gap-3 transition-colors cursor-pointer"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.nameEn}
                      className="w-11 h-11 object-cover rounded-lg shrink-0 border border-gray-100"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-gray-800 truncate">{product.nameEn}</h4>
                      <p className="text-[11px] text-[#BE0750] font-bangla truncate">{product.nameBn}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-bold text-[#7A1238]">
                          ৳{(product.discountPrice ?? product.regularPrice).toLocaleString()}
                        </span>
                        {product.discountPrice && (
                          <span className="text-[10px] text-gray-400 line-through">
                            ৳{product.regularPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* PWA Install Button */}
          <PWAInstallButton />

          {/* Wishlist Button */}
          <button
            onClick={() => {
              setCurrentView('store');
            }}
            className="relative p-2 rounded-xl text-[#7A1238] hover:bg-[#F8E8E9] transition-colors cursor-pointer"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#BE0750] text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-xs">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Customer / Auth Profile */}
          <button
            onClick={() => {
              if (currentUser) {
                setIsProfileOpen(true);
              } else {
                setIsAuthOpen(true);
              }
            }}
            className="flex items-center gap-1.5 p-2 rounded-xl text-[#7A1238] hover:bg-[#F8E8E9] transition-colors cursor-pointer"
            title={currentUser ? `Logged in as ${currentUser.name}` : 'Customer Login'}
          >
            <User className="w-5 h-5" />
            <span className="hidden xl:inline text-xs font-semibold">
              {currentUser ? currentUser.name.split(' ')[0] : 'লগইন'}
            </span>
          </button>

          {/* Admin Dashboard Switcher Button */}
          <button
            onClick={() => setCurrentView(currentView === 'admin' ? 'store' : 'admin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
              currentView === 'admin'
                ? 'bg-[#7A1238] text-white ring-2 ring-[#D9A441]'
                : 'bg-[#F8E8E9] text-[#7A1238] hover:bg-[#7A1238] hover:text-white border border-[#BE0750]/20'
            }`}
            title="Admin Management Panel"
          >
            <ShieldCheck className="w-4 h-4 text-[#D9A441]" />
            <span className="hidden sm:inline">{currentView === 'admin' ? 'স্টোর ভিউ' : 'অ্যাডমিন'}</span>
          </button>

          {/* Cart Trigger Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 bg-[#7A1238] hover:bg-[#5e0c29] text-white px-3 sm:px-4 py-2 rounded-full transition-all shadow-sm hover:shadow-md cursor-pointer group"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-[#F6E2B3] group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#BE0750] text-white text-[10px] font-extrabold rounded-full h-4 w-4 flex items-center justify-center border-2 border-white animate-bounce">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline font-bold text-xs sm:text-sm">
              ৳{cartSubtotal.toLocaleString()}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 md:hidden text-[#7A1238] rounded-lg hover:bg-[#F8E8E9]"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Search Input (Visible on small screens) */}
      <div className="px-3 pb-2.5 md:hidden">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="পণ্য সার্চ করুন (e.g. শাড়ি, জুয়েলারি, থ্রি পিস)..."
            className="w-full bg-white pl-9 pr-4 py-1.5 text-xs rounded-full border border-[#D9A441]/40 focus:border-[#BE0750] text-gray-800 placeholder:text-gray-400 shadow-2xs font-bangla"
          />
          <Search className="w-3.5 h-3.5 text-[#7A1238] absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* 3. Category Navigation Tabs */}
      <nav className="border-t border-[#7A1238]/10 bg-[#FFF9F2]/90 backdrop-blur-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-2 no-scrollbar text-xs">
            <button
              onClick={() => {
                setSelectedCategory('all');
                setCurrentView('store');
              }}
              className={`px-3 py-1.5 rounded-full shrink-0 font-medium transition-all cursor-pointer ${
                selectedCategory === 'all' && currentView === 'store'
                  ? 'bg-[#7A1238] text-white font-semibold shadow-xs'
                  : 'text-gray-700 hover:text-[#7A1238] hover:bg-[#F8E8E9]'
              }`}
            >
              <span>সকল পণ্য (All)</span>
            </button>

            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setCurrentView('store');
                }}
                className={`px-3 py-1.5 rounded-full shrink-0 font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  selectedCategory === cat.id && currentView === 'store'
                    ? 'bg-[#7A1238] text-white font-semibold shadow-xs'
                    : 'text-gray-700 hover:text-[#7A1238] hover:bg-[#F8E8E9]'
                }`}
              >
                <span className="font-bangla">{cat.nameBn}</span>
                <span className="text-[10px] opacity-75 hidden lg:inline">({cat.nameEn})</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};
