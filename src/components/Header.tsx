import React, { useState } from 'react';
import { ShoppingBag, Phone, Video, Calendar, Menu, X, Heart, Search, ArrowLeftRight, ShieldCheck, Plus, Store, User, LogOut, Package } from 'lucide-react';
import { STORE_DETAILS } from '../data/sarees';
import { OWNER_EMAIL } from '../utils/auth';
import { StoreSettings } from '../types/saree';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  compareCount?: number;
  ordersCount?: number;
  searchQuery: string;
  isOwner?: boolean;
  storeSettings?: StoreSettings;
  onSearchChange: (query: string) => void;
  onOpenCart: () => void;
  onOpenAppointment: () => void;
  onOpenVideoCall: () => void;
  onOpenWishlist: () => void;
  onOpenOrders?: () => void;
  onOpenCompare?: () => void;
  onOpenOwnerPortal?: () => void;
  onOpenAddSaree?: () => void;
  onOpenLogin?: () => void;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  compareCount = 0,
  ordersCount = 0,
  searchQuery,
  isOwner = false,
  storeSettings,
  onSearchChange,
  onOpenCart,
  onOpenAppointment,
  onOpenVideoCall,
  onOpenWishlist,
  onOpenOrders,
  onOpenCompare,
  onOpenOwnerPortal,
  onOpenAddSaree,
  onOpenLogin,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);

  const handleSearchInput = (value: string) => {
    onSearchChange(value);
    if (value.trim()) {
      const el = document.getElementById('collection');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80">
      {/* Subtle announcement strip */}
      {!announcementDismissed && (
        <div className="bg-[#831843] text-[#FDF2F8] px-4 py-2 text-xs flex items-center justify-between">
          <div className="mx-auto flex items-center gap-2 truncate">
            <span className="font-semibold tracking-wide">Direct from Looms</span>
            <span aria-hidden="true" className="opacity-60">·</span>
            <span>{storeSettings?.announcementText || 'Authentic Gadwal & Kanchi Pattu'}</span>
            <span aria-hidden="true" className="opacity-60 hidden sm:inline">·</span>
            <span className="hidden sm:inline">Complimentary Fall & Pico</span>
            <span aria-hidden="true" className="opacity-60 hidden sm:inline">·</span>
            <span className="font-medium underline cursor-pointer" onClick={onOpenVideoCall}>
              WhatsApp Video Shopping ({storeSettings?.whatsapp || STORE_DETAILS.whatsapp})
            </span>
          </div>
          <button
            onClick={() => setAnnouncementDismissed(true)}
            className="text-white/70 hover:text-white text-xs px-1"
            aria-label="Dismiss banner"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 lg:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a href="#" className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#4A1525] hover:text-[#701A36] transition-colors whitespace-nowrap shrink-0">
          Sri Markandeya Handlooms
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden xl:flex items-center gap-7 text-sm font-medium text-stone-700">
          <a
            href="#featured-collections"
            className="hover:text-[#831843] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#831843]"
          >
            Featured Collections
          </a>
          <a
            href="#collection"
            className="hover:text-[#831843] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#831843]"
          >
            All Sarees
          </a>
          <a
            href="#saree-quiz"
            className="hover:text-[#831843] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#831843]"
          >
            Style Quiz
          </a>
          <a
            href="#bridal-lounge"
            className="hover:text-[#831843] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#831843]"
          >
            Bridal Pattu
          </a>
          <a
            href="#heritage-guide"
            className="hover:text-[#831843] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#831843]"
          >
            Weaver Heritage & Care
          </a>
          <a
            href="#boutique-visit"
            className="hover:text-[#831843] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#831843]"
          >
            Suryapet Store
          </a>
          <button
            onClick={onOpenVideoCall}
            className="text-stone-700 hover:text-[#831843] transition-colors whitespace-nowrap shrink-0 py-1 flex items-center gap-1.5"
          >
            <Video className="w-4 h-4 text-[#831843]" />
            <span>Video Shopping</span>
          </button>
          {onOpenOrders && (
            <button
              onClick={onOpenOrders}
              className="text-stone-700 hover:text-[#831843] transition-colors whitespace-nowrap shrink-0 py-1 flex items-center gap-1.5"
            >
              <Package className="w-4 h-4 text-[#831843]" />
              <span>Track Orders</span>
            </button>
          )}
        </nav>

        {/* Zone 3: Search Bar & Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Header Real-Time Search Bar (Desktop / Tablet) */}
          <div className="relative hidden md:flex items-center">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search name, material, color..."
              value={searchQuery}
              onChange={(e) => handleSearchInput(e.target.value)}
              className="pl-8 pr-7 py-2 text-xs bg-stone-100/90 hover:bg-stone-100 focus:bg-white text-stone-900 placeholder:text-stone-400 border border-stone-200/90 focus:border-[#831843] focus:ring-2 focus:ring-[#831843]/20 rounded-lg w-44 lg:w-56 focus:w-60 lg:focus:w-68 transition-all duration-200 outline-none"
              aria-label="Search sarees in catalog"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2 text-stone-400 hover:text-stone-700 p-0.5 rounded-full"
                title="Clear search"
                aria-label="Clear search text"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Mobile Search Toggle Icon */}
          <button
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              mobileSearchOpen || searchQuery
                ? 'bg-rose-50 text-[#831843]'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
            title="Search sarees"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Compare Sarees button */}
          {onOpenCompare && (
            <button
              type="button"
              onClick={onOpenCompare}
              className={`relative p-2 rounded-lg transition-colors ${
                compareCount > 0
                  ? 'text-[#831843] bg-rose-50'
                  : 'text-stone-600 hover:text-[#831843] hover:bg-stone-100'
              }`}
              title="Compare Sarees"
              aria-label={`Compare ${compareCount} sarees`}
            >
              <ArrowLeftRight className="w-5 h-5" />
              {compareCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#831843] text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                  {compareCount}
                </span>
              )}
            </button>
          )}

          {/* Wishlist button */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-stone-600 hover:text-[#831843] transition-colors rounded-lg hover:bg-stone-100"
            title="Saved Sarees"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#831843] text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Order History / Track Orders button */}
          {onOpenOrders && (
            <button
              type="button"
              onClick={onOpenOrders}
              className="relative p-2 text-stone-600 hover:text-[#831843] transition-colors rounded-lg hover:bg-stone-100"
              title="My Purchases & Order Status Tracking"
              aria-label={`My Orders (${ordersCount})`}
            >
              <Package className="w-5 h-5" />
              {ordersCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                  {ordersCount}
                </span>
              )}
            </button>
          )}

          {/* Shop Owner Portal & Add Saree Controls */}
          {isOwner ? (
            <div className="hidden lg:flex items-center gap-1.5 bg-amber-50/80 border border-amber-300/80 rounded-lg p-1">
              <button
                type="button"
                onClick={onOpenOwnerPortal}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-[#831843] hover:text-[#701A36] transition-colors"
                title={`Logged in as ${OWNER_EMAIL}`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="hidden xl:inline">Owner:</span>
                <span className="font-mono text-[11px] truncate max-w-[130px]">{OWNER_EMAIL}</span>
              </button>
              {onOpenAddSaree && (
                <button
                  type="button"
                  onClick={onOpenAddSaree}
                  className="flex items-center gap-1 px-2.5 py-1 bg-[#831843] hover:bg-[#701A36] text-white rounded text-[11px] font-semibold transition-colors shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Saree</span>
                </button>
              )}
              {onLogout && (
                <button
                  type="button"
                  onClick={onLogout}
                  className="flex items-center gap-1 px-2 py-1 text-stone-600 hover:text-rose-700 hover:bg-rose-50 rounded text-[11px] font-medium transition-colors border border-transparent hover:border-rose-200"
                  title="Logout of Owner Mode"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden xl:inline">Logout</span>
                </button>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenLogin || onOpenOwnerPortal}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-700 hover:text-[#831843] hover:bg-stone-100 rounded-lg transition-colors border border-stone-200/90 shadow-xs"
              title="Login / Domain Administrator Access"
            >
              <User className="w-3.5 h-3.5 text-stone-500" />
              <span>Login</span>
            </button>
          )}

          {/* Book In-store visit button */}
          <button
            onClick={onOpenAppointment}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-800 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 rounded-lg transition-colors whitespace-nowrap"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-800" />
            <span>Book Visit</span>
          </button>

          {/* Primary Shopping Bag Action */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 px-3.5 py-2 bg-[#831843] hover:bg-[#701A36] text-white rounded-lg shadow-sm transition-all text-xs font-semibold whitespace-nowrap shrink-0"
            aria-label={`Shopping bag with ${cartCount} items`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden xs:inline">Bag</span>
            <span className="bg-white/20 text-white px-1.5 py-0.5 rounded text-[11px] font-bold">
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-stone-700 hover:text-stone-900 rounded-lg"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Expandable Search Bar Strip */}
      {mobileSearchOpen && (
        <div className="md:hidden px-4 py-3 bg-stone-100/90 border-t border-stone-200 flex items-center gap-2 animate-in fade-in duration-150">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              autoFocus
              placeholder="Search name, material, color..."
              value={searchQuery}
              onChange={(e) => handleSearchInput(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs bg-white text-stone-900 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#831843]/30 focus:border-[#831843]"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <button
            onClick={() => setMobileSearchOpen(false)}
            className="text-xs font-medium text-stone-600 px-2 py-1 hover:text-stone-900"
          >
            Done
          </button>
        </div>
      )}

      {/* Mobile drawer menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-stone-200 bg-[#FAF8F5] px-6 py-5 space-y-4 shadow-lg">
          {/* Quick Search inside Mobile Menu */}
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search sarees by name, material..."
              value={searchQuery}
              onChange={(e) => handleSearchInput(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs bg-white text-stone-900 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#831843]/30"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex flex-col space-y-3 text-sm font-medium text-stone-800">
            <a
              href="#collection"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#831843]"
            >
              Collection & Weaves
            </a>
            <a
              href="#saree-quiz"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#831843] flex items-center justify-between"
            >
              <span>Saree Style Quiz</span>
              <span className="text-[10px] bg-rose-100 text-[#831843] px-2 py-0.5 rounded font-semibold">
                3 Questions
              </span>
            </a>
            {onOpenCompare && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCompare();
                }}
                className="py-1 text-left hover:text-[#831843] flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <ArrowLeftRight className="w-4 h-4 text-[#831843]" />
                  <span>Saree Comparisons</span>
                </span>
                {compareCount > 0 && (
                  <span className="text-[10px] bg-[#831843] text-white px-2 py-0.5 rounded-full font-semibold">
                    {compareCount} Selected
                  </span>
                )}
              </button>
            )}
            {onOpenOrders && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOrders();
                }}
                className="py-1 text-left hover:text-[#831843] flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#831843]" />
                  <span>My Purchases & Loom Tracking</span>
                </span>
                {ordersCount > 0 && (
                  <span className="text-[10px] bg-amber-600 text-white px-2 py-0.5 rounded-full font-semibold">
                    {ordersCount} Orders
                  </span>
                )}
              </button>
            )}
            <a
              href="#featured-collections"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#831843]"
            >
              Featured Collections
            </a>
            <a
              href="#bridal-lounge"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#831843]"
            >
              Bridal Trousseau Lounge
            </a>
            <a
              href="#heritage-guide"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#831843]"
            >
              Weave Heritage & Saree Care
            </a>
            <a
              href="#boutique-visit"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#831843]"
            >
              Suryapet Store (60 Feet Road)
            </a>
          </div>

          <div className="pt-3 border-t border-stone-200 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVideoCall();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-medium bg-stone-100 text-stone-800 rounded-lg hover:bg-stone-200"
            >
              <Video className="w-4 h-4 text-[#831843]" />
              Schedule Live WhatsApp Video Drape
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAppointment();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-medium bg-amber-100 text-amber-900 rounded-lg hover:bg-amber-200"
            >
              <Calendar className="w-4 h-4 text-amber-800" />
              Schedule In-Store Consultation
            </button>
            <a
              href={`tel:${STORE_DETAILS.phone}`}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs text-stone-600 hover:text-stone-900"
            >
              <Phone className="w-3.5 h-3.5" />
              Direct Call: {STORE_DETAILS.phone}
            </a>

            {/* Mobile Shopkeeper / Owner Access Strip */}
            <div className="pt-2 border-t border-stone-200">
              {isOwner ? (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-stone-800 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Owner: {OWNER_EMAIL}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenOwnerPortal?.();
                      }}
                      className="text-[11px] text-[#831843] underline font-medium"
                    >
                      Dashboard
                    </button>
                  </div>
                  {onOpenAddSaree && (
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenAddSaree();
                      }}
                      className="w-full py-2 bg-[#831843] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Saree to Shop</span>
                    </button>
                  )}
                  {onLogout && (
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onLogout();
                      }}
                      className="w-full py-2 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Logout of Owner Mode</span>
                    </button>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenLogin) onOpenLogin();
                    else onOpenOwnerPortal?.();
                  }}
                  className="w-full py-2.5 text-xs text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg flex items-center justify-center gap-2 font-semibold"
                >
                  <User className="w-4 h-4 text-stone-600" />
                  <span>Login / Admin Access</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
