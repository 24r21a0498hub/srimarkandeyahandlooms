/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LogOut } from 'lucide-react';
import { SAREES_DATA, STORE_DETAILS } from './data/sarees';
import { Saree, CartItem, Order, StoreSettings } from './types/saree';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeaturedCollections } from './components/FeaturedCollections';
import { CatalogSection } from './components/CatalogSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { BridalLoungeSection } from './components/BridalLoungeSection';
import { HeritageGuideSection } from './components/HeritageGuideSection';
import { StoreLocatorSection } from './components/StoreLocatorSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AppointmentModal } from './components/AppointmentModal';
import { VideoCallModal } from './components/VideoCallModal';
import { WishlistModal } from './components/WishlistModal';
import { SareeComparisonModal } from './components/SareeComparisonModal';
import { ComparisonDock } from './components/ComparisonDock';
import { SareeQuiz } from './components/SareeQuiz';
import { Footer } from './components/Footer';
import { SareeCareModal } from './components/SareeCareModal';
import { AddSareeModal } from './components/AddSareeModal';
import { OwnerPortalModal } from './components/OwnerPortalModal';
import { EntryLoginModal } from './components/EntryLoginModal';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { getStoredOrders, saveOrderToStorage } from './utils/orderStorage';
import {
  isOwnerLoggedIn,
  getStoredCustomSarees,
  saveCustomSarees,
  OWNER_EMAIL,
  OWNER_DISPLAY_NAME,
  isAuthorizedOwnerEmail,
  getOwnerSession,
  getStoredStoreSettings,
  saveStoreSettings,
  getStoredEditedSarees,
  saveEditedSaree,
  logoutOwner,
} from './utils/auth';

export default function App() {
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => getStoredStoreSettings());
  const [orders, setOrders] = useState<Order[]>(() => getStoredOrders());
  const [customerEmail, setCustomerEmail] = useState<string>(() => {
    try {
      return sessionStorage.getItem('markandeya_customer_email') || (isOwnerLoggedIn() ? OWNER_EMAIL : '');
    } catch {
      return '';
    }
  });
  const [isEntryLoginOpen, setIsEntryLoginOpen] = useState<boolean>(
    () => !isOwnerLoggedIn() && !sessionStorage.getItem('markandeya_entry_dismissed')
  );
  const [customSarees, setCustomSarees] = useState<Saree[]>(() => getStoredCustomSarees());
  const [sarees, setSarees] = useState<Saree[]>(() => {
    const stored = getStoredCustomSarees();
    const editedMap = getStoredEditedSarees();
    const base = SAREES_DATA.map((s) => (editedMap[s.id] ? { ...s, ...editedMap[s.id] } : s));
    return [...stored, ...base];
  });
  const [isOwner, setIsOwner] = useState<boolean>(() => isOwnerLoggedIn());
  const [selectedWeave, setSelectedWeave] = useState<string>('All Weaves');
  const [isAddSareeOpen, setIsAddSareeOpen] = useState(false);
  const [editingSaree, setEditingSaree] = useState<Saree | null>(null);
  const [isOwnerPortalOpen, setIsOwnerPortalOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('markandeya_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('markandeya_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [compareIds, setCompareIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('markandeya_compare');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedSaree, setSelectedSaree] = useState<Saree | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const [videoCallSareeCode, setVideoCallSareeCode] = useState<string>('');
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isCareTipsOpen, setIsCareTipsOpen] = useState(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('markandeya_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('markandeya_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.warn('Failed to save wishlist to localStorage', e);
    }
  }, [wishlistIds]);

  // Sync compare to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('markandeya_compare', JSON.stringify(compareIds));
    } catch (e) {
      console.warn('Failed to save compare to localStorage', e);
    }
  }, [compareIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2500);
  };

  // Cart operations
  const handleAddToCart = (
    saree: Saree,
    includeFallPico = true,
    includeTassels = false,
    notes = ''
  ) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (it) =>
          it.saree.id === saree.id &&
          it.includeFallPico === includeFallPico &&
          it.includeTassels === includeTassels
      );
      if (existingIdx >= 0) {
        const next = [...prev];
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: next[existingIdx].quantity + 1,
        };
        return next;
      }
      return [
        ...prev,
        {
          saree,
          quantity: 1,
          includeFallPico,
          includeTassels,
          notes,
        },
      ];
    });
    showToast(`Added ${saree.name} to your shopping bag.`);
  };

  const handleUpdateCartQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(index);
      return;
    }
    setCartItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], quantity: newQty };
      return next;
    });
  };

  const handleRemoveFromCart = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
    showToast('Removed item from shopping bag.');
  };

  // Wishlist operations
  const handleToggleWishlist = (saree: Saree) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(saree.id);
      if (exists) {
        showToast(`Removed ${saree.name} from saved items.`);
        return prev.filter((id) => id !== saree.id);
      } else {
        showToast(`Saved ${saree.name} to wishlist.`);
        return [...prev, saree.id];
      }
    });
  };

  // Compare operations (up to 4 sarees)
  const handleToggleCompare = (saree: Saree) => {
    setCompareIds((prev) => {
      if (prev.includes(saree.id)) {
        showToast(`Removed ${saree.name} from comparison.`);
        return prev.filter((id) => id !== saree.id);
      }
      if (prev.length >= 4) {
        showToast('Maximum 4 sarees can be compared side-by-side.');
        return prev;
      }
      showToast(`Added ${saree.name} to comparison tray.`);
      return [...prev, saree.id];
    });
  };

  const handleRemoveCompare = (id: string) => {
    setCompareIds((prev) => prev.filter((itemId) => itemId !== id));
  };

  const handleAddCompare = (saree: Saree) => {
    setCompareIds((prev) => {
      if (prev.includes(saree.id)) return prev;
      if (prev.length >= 4) {
        showToast('Maximum 4 sarees can be compared side-by-side.');
        return prev;
      }
      return [...prev, saree.id];
    });
  };

  const handleClearCompare = () => {
    setCompareIds([]);
    showToast('Comparison tray cleared.');
  };

  const handleOrderSuccess = (order: Order) => {
    setCartItems([]);
    const updatedOrders = saveOrderToStorage(order);
    setOrders(updatedOrders);
    if (order.customerEmail) {
      setCustomerEmail(order.customerEmail);
      try {
        sessionStorage.setItem('markandeya_customer_email', order.customerEmail);
      } catch {}
    }
    showToast(`Order #${order.id} placed! View status anytime in Order History.`);
  };

  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);
  const activeOrdersCount = orders.filter((o) => o.status !== 'delivered' && o.status !== 'cancelled').length;

  const wishlistSarees = sarees.filter((s) => wishlistIds.includes(s.id));
  const comparedSarees = sarees.filter((s) => compareIds.includes(s.id));

  const handleAuthChange = () => {
    setIsOwner(isOwnerLoggedIn());
  };

  const handleOwnerLoginSuccess = () => {
    setIsOwner(true);
    setCustomerEmail(OWNER_EMAIL);
    showToast(`Welcome back, ${OWNER_DISPLAY_NAME}! Website editing & domain controls unlocked.`);
  };

  const handleLogout = () => {
    logoutOwner();
    setIsOwner(false);
    showToast('Logged out of owner editing mode. Switched to guest mode.');
  };

  const handleCustomerContinue = (email?: string) => {
    try {
      sessionStorage.setItem('markandeya_entry_dismissed', 'true');
      if (email) {
        sessionStorage.setItem('markandeya_customer_email', email);
        setCustomerEmail(email);
        showToast(`Welcome! Browsing Sri Markandeya Handlooms as ${email}`);
      }
    } catch (e) {
      // ignore
    }
  };

  // Owner Inventory Operations (Strictly restricted to nanikoutarapu@gmail.com)
  const handleAddSaree = (newSaree: Saree) => {
    const session = getOwnerSession();
    if (!session || !isAuthorizedOwnerEmail(session.email)) {
      showToast(`Access Denied: Only ${OWNER_EMAIL} is authorized to add sarees.`);
      return;
    }

    setCustomSarees((prevCustom) => {
      const updated = [newSaree, ...prevCustom];
      saveCustomSarees(updated);
      return updated;
    });

    setSarees((prev) => [newSaree, ...prev]);
    showToast(`Published "${newSaree.name}" to Sri Markandeya shop!`);
  };

  const handleDeleteSaree = (id: string) => {
    const session = getOwnerSession();
    if (!session || !isAuthorizedOwnerEmail(session.email)) {
      showToast(`Access Denied: Only ${OWNER_EMAIL} is authorized to delete sarees.`);
      return;
    }

    setCustomSarees((prevCustom) => {
      const updated = prevCustom.filter((s) => s.id !== id);
      saveCustomSarees(updated);
      return updated;
    });

    setSarees((prev) => prev.filter((s) => s.id !== id));
    setCompareIds((prev) => prev.filter((itId) => itId !== id));
    setWishlistIds((prev) => prev.filter((itId) => itId !== id));
    showToast('Saree removed from shop inventory.');
  };

  const handleEditSaree = (saree: Saree) => {
    const session = getOwnerSession();
    if (!session || !isAuthorizedOwnerEmail(session.email)) {
      showToast(`Access Denied: Only ${OWNER_EMAIL} is authorized to edit sarees.`);
      setIsOwnerPortalOpen(true);
      return;
    }
    setEditingSaree(saree);
    setIsAddSareeOpen(true);
  };

  const handleUpdateSaree = (updatedSaree: Saree) => {
    const session = getOwnerSession();
    if (!session || !isAuthorizedOwnerEmail(session.email)) {
      showToast(`Access Denied: Only ${OWNER_EMAIL} is authorized to edit sarees.`);
      return;
    }

    if (updatedSaree.id.startsWith('custom-')) {
      setCustomSarees((prevCustom) => {
        const next = prevCustom.map((s) => (s.id === updatedSaree.id ? updatedSaree : s));
        saveCustomSarees(next);
        return next;
      });
    } else {
      saveEditedSaree(updatedSaree);
    }

    setSarees((prev) => prev.map((s) => (s.id === updatedSaree.id ? updatedSaree : s)));
    if (selectedSaree && selectedSaree.id === updatedSaree.id) {
      setSelectedSaree(updatedSaree);
    }
    setEditingSaree(null);
    setIsAddSareeOpen(false);
    showToast(`Updated "${updatedSaree.name}" successfully!`);
  };

  const handleUpdateStoreSettings = (newSettings: StoreSettings) => {
    const session = getOwnerSession();
    if (!session || !isAuthorizedOwnerEmail(session.email)) {
      showToast(`Access Denied: Only ${OWNER_EMAIL} is authorized to edit website content.`);
      return;
    }
    saveStoreSettings(newSettings);
    setStoreSettings(newSettings);
    showToast('Showroom details & website settings saved!');
  };

  const handleOpenVideoCallForSaree = (code?: string) => {
    setVideoCallSareeCode(code || '');
    setIsVideoCallOpen(true);
  };

  const scrollToCollection = () => {
    const el = document.getElementById('collection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectFeaturedCollection = (weave: string) => {
    setSelectedWeave(weave);
    const el = document.getElementById('collection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs font-medium border border-stone-700 animate-in fade-in slide-in-from-bottom-2 duration-200">
          {toastMessage}
        </div>
      )}

      {/* Domain Owner Active Banner */}
      {isOwner && (
        <div className="bg-gradient-to-r from-stone-950 via-[#701A36] to-stone-950 text-white text-xs py-2 px-4 border-b border-amber-500/30 flex items-center justify-between sticky top-0 z-50 shadow-md">
          <div className="max-w-7xl mx-auto flex items-center gap-2.5 truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="font-bold text-amber-200">Domain Editor Active:</span>
            <span>Logged in as <strong>{OWNER_EMAIL}</strong></span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <span className="hidden sm:inline">Domain: <strong className="font-mono text-amber-200">{storeSettings.domain || 'srimarkandeyahandlooms.com'}</strong></span>
            <span aria-hidden="true" className="opacity-40 hidden sm:inline">·</span>
            <span className="text-[11px] text-stone-200/90 hidden md:inline">You can edit any saree, change headlines, & update website content.</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsOwnerPortalOpen(true)}
              className="px-2.5 py-1 bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 rounded text-[11px] font-semibold border border-amber-300/40 transition-colors"
            >
              Website Editor
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="px-2.5 py-1 bg-rose-950/70 hover:bg-rose-900 text-rose-200 hover:text-white rounded text-[11px] font-semibold border border-rose-500/40 transition-colors flex items-center gap-1.5 shadow-xs"
              title="Logout of Domain Editor"
            >
              <LogOut className="w-3 h-3 text-rose-300" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* Navigation Header */}
      <Header
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        compareCount={compareIds.length}
        ordersCount={activeOrdersCount}
        searchQuery={searchQuery}
        isOwner={isOwner}
        storeSettings={storeSettings}
        onSearchChange={setSearchQuery}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAppointment={() => setIsAppointmentOpen(true)}
        onOpenVideoCall={() => handleOpenVideoCallForSaree()}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenOrders={() => setIsOrderHistoryOpen(true)}
        onOpenCompare={() => setIsCompareModalOpen(true)}
        onOpenOwnerPortal={() => setIsOwnerPortalOpen(true)}
        onOpenAddSaree={() => {
          setEditingSaree(null);
          setIsAddSareeOpen(true);
        }}
        onOpenLogin={() => setIsEntryLoginOpen(true)}
        onLogout={handleLogout}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreClick={scrollToCollection}
          onBookAppointment={() => setIsAppointmentOpen(true)}
          onVideoShopping={() => handleOpenVideoCallForSaree()}
          storeSettings={storeSettings}
        />

        {/* Featured Collections Carousel */}
        <FeaturedCollections onSelectCollection={handleSelectFeaturedCollection} />

        {/* Catalog & Filter Suite */}
        <CatalogSection
          sarees={sarees}
          wishlistIds={wishlistIds}
          compareIds={compareIds}
          searchQuery={searchQuery}
          selectedWeave={selectedWeave}
          onSelectWeave={setSelectedWeave}
          isOwner={isOwner}
          onSearchChange={setSearchQuery}
          onToggleWishlist={handleToggleWishlist}
          onToggleCompare={handleToggleCompare}
          onOpenCompare={() => setIsCompareModalOpen(true)}
          onSelectSaree={(saree) => setSelectedSaree(saree)}
          onQuickAdd={(saree) => handleAddToCart(saree, true, false)}
          onOpenAddSaree={() => {
            setEditingSaree(null);
            setIsAddSareeOpen(true);
          }}
          onOpenOwnerPortal={() => setIsOwnerPortalOpen(true)}
          onDeleteSaree={handleDeleteSaree}
          onEditSaree={handleEditSaree}
        />

        {/* Saree Style Match Quiz */}
        <SareeQuiz
          sarees={sarees}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onSelectSaree={(saree) => setSelectedSaree(saree)}
          onQuickAdd={(saree) => handleAddToCart(saree, true, false)}
        />

        {/* Bridal Trousseau Lounge Experience */}
        <BridalLoungeSection
          onBookAppointment={() => setIsAppointmentOpen(true)}
          onVideoShopping={() => handleOpenVideoCallForSaree()}
        />

        {/* Saree Heritage & Care Guide */}
        <HeritageGuideSection onOpenCareTips={() => setIsCareTipsOpen(true)} />

        {/* Physical Flagship Store & Visiting Hours */}
        <StoreLocatorSection onBookAppointment={() => setIsAppointmentOpen(true)} />
      </main>

      {/* Footer */}
      <Footer
        onOpenAppointment={() => setIsAppointmentOpen(true)}
        onOpenVideoCall={() => handleOpenVideoCallForSaree()}
        onOpenCareTips={() => setIsCareTipsOpen(true)}
        onOpenOwnerPortal={() => setIsOwnerPortalOpen(true)}
        onOpenOrders={() => setIsOrderHistoryOpen(true)}
      />

      {/* Saree Details Modal */}
      {selectedSaree && (
        <ProductDetailModal
          saree={selectedSaree}
          isWishlisted={wishlistIds.includes(selectedSaree.id)}
          isCompared={compareIds.includes(selectedSaree.id)}
          isOwner={isOwner}
          onClose={() => setSelectedSaree(null)}
          onToggleWishlist={handleToggleWishlist}
          onToggleCompare={handleToggleCompare}
          onOpenCompare={() => setIsCompareModalOpen(true)}
          onEditSaree={handleEditSaree}
          onAddToCart={(saree, fallPico, tassels, notes) =>
            handleAddToCart(saree, fallPico, tassels, notes)
          }
          onBookVideoCall={(code) => {
            setSelectedSaree(null);
            handleOpenVideoCallForSaree(code);
          }}
          onBookAppointment={() => {
            setSelectedSaree(null);
            setIsAppointmentOpen(true);
          }}
        />
      )}

      {/* Floating Comparison Dock */}
      <ComparisonDock
        comparedSarees={comparedSarees}
        onOpenModal={() => setIsCompareModalOpen(true)}
        onRemoveSaree={handleRemoveCompare}
        onClearAll={handleClearCompare}
      />

      {/* Saree Full Comparison Modal */}
      <SareeComparisonModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        sarees={sarees}
        comparedSarees={comparedSarees}
        onRemoveSaree={handleRemoveCompare}
        onAddSaree={handleAddCompare}
        onClearAll={handleClearCompare}
        onAddToCart={(saree) => handleAddToCart(saree, true, false)}
        onSelectSaree={(saree) => {
          setIsCompareModalOpen(false);
          setSelectedSaree(saree);
        }}
        onBookVideoCall={(code) => {
          setIsCompareModalOpen(false);
          handleOpenVideoCallForSaree(code);
        }}
      />

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={handleOrderSuccess}
        onOpenOrders={() => setIsOrderHistoryOpen(true)}
      />

      {/* In-Store Appointment Modal */}
      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
      />

      {/* WhatsApp Video Drape Modal */}
      <VideoCallModal
        isOpen={isVideoCallOpen}
        onClose={() => setIsVideoCallOpen(false)}
        prefilledSareeCode={videoCallSareeCode}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistSarees={wishlistSarees}
        onRemoveFromWishlist={handleToggleWishlist}
        onSelectSaree={(saree) => setSelectedSaree(saree)}
        onQuickAdd={(saree) => handleAddToCart(saree, true, false)}
      />

      {/* Saree Care Tips & Preservation Modal */}
      <SareeCareModal
        isOpen={isCareTipsOpen}
        onClose={() => setIsCareTipsOpen(false)}
      />

      {/* Shop Owner Add / Edit Saree Modal (Strictly for nanikoutarapu@gmail.com) */}
      <AddSareeModal
        isOpen={isAddSareeOpen}
        onClose={() => {
          setIsAddSareeOpen(false);
          setEditingSaree(null);
        }}
        onAddSaree={handleAddSaree}
        onUpdateSaree={handleUpdateSaree}
        editingSaree={editingSaree}
        onOpenOwnerPortal={() => {
          setIsAddSareeOpen(false);
          setEditingSaree(null);
          setIsOwnerPortalOpen(true);
        }}
        onLogout={handleLogout}
      />

      {/* Shop Owner Inventory Management & Website Content Portal */}
      <OwnerPortalModal
        isOpen={isOwnerPortalOpen}
        onClose={() => setIsOwnerPortalOpen(false)}
        sarees={sarees}
        customSarees={customSarees}
        storeSettings={storeSettings}
        onOpenAddSaree={() => {
          setIsOwnerPortalOpen(false);
          setEditingSaree(null);
          setIsAddSareeOpen(true);
        }}
        onEditSaree={handleEditSaree}
        onDeleteSaree={handleDeleteSaree}
        onUpdateStoreSettings={handleUpdateStoreSettings}
        onAuthChange={handleAuthChange}
      />

      {/* Website Entry Login Gateway Modal */}
      <EntryLoginModal
        isOpen={isEntryLoginOpen}
        onClose={() => {
          setIsEntryLoginOpen(false);
          try {
            sessionStorage.setItem('markandeya_entry_dismissed', 'true');
          } catch {}
        }}
        onOwnerLoginSuccess={handleOwnerLoginSuccess}
        onCustomerContinue={handleCustomerContinue}
        currentDomain={storeSettings.domain || 'srimarkandeyahandlooms.com'}
      />

      {/* Customer Order History & Handloom Status Tracking Modal */}
      <OrderHistoryModal
        isOpen={isOrderHistoryOpen}
        onClose={() => setIsOrderHistoryOpen(false)}
        orders={orders}
        customerEmail={customerEmail || (isOwner ? OWNER_EMAIL : '')}
        onSelectSaree={(saree) => {
          setIsOrderHistoryOpen(false);
          setSelectedSaree(saree);
        }}
        onStartShopping={() => {
          const el = document.getElementById('collection');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onRefreshOrders={() => {
          setOrders(getStoredOrders());
        }}
      />
    </div>
  );
}
