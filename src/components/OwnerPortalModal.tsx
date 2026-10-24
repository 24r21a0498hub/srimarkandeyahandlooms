import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Plus, Trash2, Lock, LogOut, PackageCheck, AlertCircle, Sparkles, CheckCircle2, Store, Edit3, Save, Search, Globe, Phone, MapPin, Mail, Copy, Check } from 'lucide-react';
import { Saree, StoreSettings } from '../types/saree';
import { OWNER_EMAIL, OWNER_DISPLAY_NAME, OWNER_STORE_ROLE, isOwnerLoggedIn, authenticateOwner, logoutOwner } from '../utils/auth';
import { getStoredSubscribers } from './NewsletterSignup';

interface OwnerPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  sarees: Saree[];
  customSarees: Saree[];
  storeSettings: StoreSettings;
  onOpenAddSaree: () => void;
  onEditSaree: (saree: Saree) => void;
  onDeleteSaree: (id: string) => void;
  onUpdateStoreSettings: (settings: StoreSettings) => void;
  onAuthChange: () => void;
}

export const OwnerPortalModal: React.FC<OwnerPortalModalProps> = ({
  isOpen,
  onClose,
  sarees,
  customSarees,
  storeSettings,
  onOpenAddSaree,
  onEditSaree,
  onDeleteSaree,
  onUpdateStoreSettings,
  onAuthChange,
}) => {
  const isOwner = isOwnerLoggedIn();

  // Navigation tab in portal: 'sarees' | 'website' | 'subscribers'
  const [activePortalTab, setActivePortalTab] = useState<'sarees' | 'website' | 'subscribers'>('sarees');
  const [copiedAll, setCopiedAll] = useState(false);
  const [subscribers, setSubscribers] = useState(() => getStoredSubscribers());

  // Login form state
  const [emailInput, setEmailInput] = useState('');
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Search filter inside inventory list
  const [inventorySearch, setInventorySearch] = useState('');
  const [inventoryFilter, setInventoryFilter] = useState<'all' | 'custom'>('all');

  // Website Settings Form State
  const [websiteSettings, setWebsiteSettings] = useState<StoreSettings>(storeSettings);
  const [websiteSaveSuccess, setWebsiteSaveSuccess] = useState(false);

  useEffect(() => {
    setWebsiteSettings(storeSettings);
  }, [storeSettings]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const result = authenticateOwner(emailInput, pinInput);
    if (!result.success) {
      setErrorMsg(result.message);
    } else {
      setErrorMsg(null);
      onAuthChange();
    }
  };

  const handleLogout = () => {
    logoutOwner();
    onAuthChange();
  };

  const handleDelete = (id: string) => {
    onDeleteSaree(id);
    setDeleteConfirmId(null);
  };

  const handleSaveWebsiteSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOwnerLoggedIn()) {
      setErrorMsg(`Access Denied: Only ${OWNER_EMAIL} can edit website content.`);
      return;
    }
    onUpdateStoreSettings(websiteSettings);
    setWebsiteSaveSuccess(true);
    setTimeout(() => setWebsiteSaveSuccess(false), 2500);
  };

  const displayedSarees = sarees.filter((saree) => {
    if (inventoryFilter === 'custom' && !saree.id.startsWith('custom-')) {
      return false;
    }
    if (inventorySearch.trim()) {
      const q = inventorySearch.toLowerCase().trim();
      return (
        saree.name.toLowerCase().includes(q) ||
        saree.code.toLowerCase().includes(q) ||
        saree.weave.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div className="bg-[#FAF8F5] w-full max-w-3xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#4A1525] text-amber-50 px-6 py-4 flex items-center justify-between shrink-0 border-b border-[#701A36]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-300/30 flex items-center justify-center text-amber-300">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] tracking-wider uppercase font-semibold text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-300/20">
                  {isOwner ? 'Shopkeeper Access' : 'Secure Administrator Portal'}
                </span>
                {isOwner && (
                  <span className="text-[11px] text-stone-300 font-mono">
                    {OWNER_EMAIL}
                  </span>
                )}
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Owner Store & Catalog Portal
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-300 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          {!isOwner ? (
            /* Login view for owner */
            <div className="space-y-6 max-w-md mx-auto py-2">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 bg-amber-100 text-amber-900 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <Lock className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  Shop Owner Sign In
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Only authorized domain administrators are permitted to upload sarees and manage website content.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4 bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Store Owner Email
                  </label>
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter domain owner email"
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#831843]/30 outline-none"
                    required
                    autoComplete="username"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="Enter password"
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#831843]/30 outline-none"
                    required
                    autoComplete="current-password"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#831843] hover:bg-[#701A36] text-white text-xs font-semibold rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Log In as Domain Administrator</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Logged In Owner Dashboard */
            <div className="space-y-5">
              {/* Profile Bar */}
              <div className="p-4 bg-gradient-to-r from-amber-50 to-rose-50 border border-amber-200/90 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#831843] text-white font-serif font-bold text-base flex items-center justify-center shadow">
                    NK
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-stone-900">{OWNER_DISPLAY_NAME}</h4>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified Owner
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 font-mono">{OWNER_EMAIL}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenAddSaree();
                    }}
                    className="px-3.5 py-2 bg-[#831843] hover:bg-[#701A36] text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Upload Saree</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="px-3 py-2 text-rose-700 hover:text-rose-900 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
                    title="Log Out of Owner Mode"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>

              {/* Portal Navigation Tabs */}
              <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
                <button
                  type="button"
                  onClick={() => setActivePortalTab('sarees')}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
                    activePortalTab === 'sarees'
                      ? 'bg-[#831843] text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <PackageCheck className="w-4 h-4" />
                  <span>Saree Inventory & Edit ({sarees.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActivePortalTab('website')}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
                    activePortalTab === 'website'
                      ? 'bg-[#831843] text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Globe className="w-4 h-4" />
                  <span>Edit Website Content</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSubscribers(getStoredSubscribers());
                    setActivePortalTab('subscribers');
                  }}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
                    activePortalTab === 'subscribers'
                      ? 'bg-[#831843] text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span>Newsletter Subscribers ({subscribers.length})</span>
                </button>
              </div>

              {activePortalTab === 'sarees' ? (
                /* Sarees & Catalog Management Tab */
                <div className="space-y-4">
                  {/* Search & Filter Bar */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="relative w-full sm:w-64">
                      <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search saree name, SKU..."
                        value={inventorySearch}
                        onChange={(e) => setInventorySearch(e.target.value)}
                        className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#831843]/30"
                      />
                    </div>

                    <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-lg w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => setInventoryFilter('all')}
                        className={`flex-1 sm:flex-initial px-3 py-1 text-xs font-medium rounded ${
                          inventoryFilter === 'all'
                            ? 'bg-white text-stone-900 shadow-xs'
                            : 'text-stone-500 hover:text-stone-800'
                        }`}
                      >
                        All Sarees ({sarees.length})
                      </button>
                      <button
                        type="button"
                        onClick={() => setInventoryFilter('custom')}
                        className={`flex-1 sm:flex-initial px-3 py-1 text-xs font-medium rounded ${
                          inventoryFilter === 'custom'
                            ? 'bg-white text-stone-900 shadow-xs'
                            : 'text-stone-500 hover:text-stone-800'
                        }`}
                      >
                        Added by You ({customSarees.length})
                      </button>
                    </div>
                  </div>

                  {/* Saree List */}
                  <div className="divide-y divide-stone-100 bg-white rounded-xl border border-stone-200 overflow-hidden max-h-[46vh] overflow-y-auto">
                    {displayedSarees.length === 0 ? (
                      <div className="text-center py-8 px-4 text-xs text-stone-500">
                        No sarees match your search.
                      </div>
                    ) : (
                      displayedSarees.map((saree) => {
                        const isCustom = saree.id.startsWith('custom-');
                        return (
                          <div
                            key={saree.id}
                            className="p-3 sm:p-4 flex items-center justify-between gap-3 hover:bg-stone-50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={saree.image}
                                alt={saree.name}
                                className="w-12 h-12 object-cover rounded-lg border border-stone-200 shrink-0"
                              />
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-[10px] text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded">
                                    {saree.code}
                                  </span>
                                  <span className="text-[10px] text-[#831843] font-semibold">
                                    {saree.weave}
                                  </span>
                                  {isCustom ? (
                                    <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-medium">
                                      Custom Upload
                                    </span>
                                  ) : (
                                    <span className="text-[9px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded font-medium">
                                      Catalog
                                    </span>
                                  )}
                                </div>
                                <h5 className="text-xs font-bold text-stone-900 mt-0.5 line-clamp-1">
                                  {saree.name}
                                </h5>
                                <p className="text-[11px] text-stone-500">
                                  ₹{saree.price.toLocaleString('en-IN')} · {saree.colorName} · {saree.origin}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              {/* Edit Saree button for Owner */}
                              <button
                                type="button"
                                onClick={() => {
                                  onClose();
                                  onEditSaree(saree);
                                }}
                                className="px-2.5 py-1.5 bg-amber-50 hover:bg-[#831843] text-amber-900 hover:text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-1 border border-amber-200"
                                title="Edit this saree"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Edit</span>
                              </button>

                              {/* Delete button (for custom sarees) */}
                              {isCustom && (
                                deleteConfirmId === saree.id ? (
                                  <div className="flex items-center gap-1 animate-in fade-in">
                                    <button
                                      type="button"
                                      onClick={() => handleDelete(saree.id)}
                                      className="px-2 py-1 bg-rose-600 text-white text-[11px] font-semibold rounded hover:bg-rose-700"
                                    >
                                      Confirm
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setDeleteConfirmId(null)}
                                      className="px-2 py-1 bg-stone-200 text-stone-700 text-[11px] rounded"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => setDeleteConfirmId(saree.id)}
                                    className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                    title="Delete saree"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              ) : activePortalTab === 'website' ? (
                /* Edit Website Content Tab */
                <form onSubmit={handleSaveWebsiteSettings} className="space-y-4 bg-white p-5 rounded-xl border border-stone-200">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-2">
                        <Globe className="w-4 h-4 text-[#831843]" />
                        <span>Edit Website Store Information</span>
                      </h4>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Changes will be saved and rendered across the website headers, hero, and footers.
                      </p>
                    </div>

                    {websiteSaveSuccess && (
                      <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Website Updated!
                      </span>
                    )}
                  </div>

                  {/* Domain Configuration */}
                  <div className="p-3.5 bg-amber-50/70 border border-amber-200/90 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-[#831843]" />
                        <span>Website Custom Domain</span>
                      </label>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold border border-emerald-300/60">
                        Admin: {OWNER_EMAIL}
                      </span>
                    </div>
                    <input
                      type="text"
                      value={websiteSettings.domain || 'srimarkandeyahandlooms.com'}
                      onChange={(e) =>
                        setWebsiteSettings({ ...websiteSettings, domain: e.target.value })
                      }
                      className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#831843]/30 outline-none font-mono"
                      placeholder="e.g. srimarkandeyahandlooms.com"
                    />
                    <p className="text-[11px] text-stone-500">
                      Primary web address configured for Sri Markandeya Handlooms. Only <strong>{OWNER_EMAIL}</strong> has permissions to update domain and website content.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Top Announcement Banner Text
                    </label>
                    <input
                      type="text"
                      value={websiteSettings.announcementText}
                      onChange={(e) =>
                        setWebsiteSettings({ ...websiteSettings, announcementText: e.target.value })
                      }
                      className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#831843]/30 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Showroom Phone Number
                      </label>
                      <input
                        type="text"
                        value={websiteSettings.phone}
                        onChange={(e) =>
                          setWebsiteSettings({ ...websiteSettings, phone: e.target.value })
                        }
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#831843]/30 outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        WhatsApp Orders & Video Drape Number
                      </label>
                      <input
                        type="text"
                        value={websiteSettings.whatsapp}
                        onChange={(e) =>
                          setWebsiteSettings({ ...websiteSettings, whatsapp: e.target.value })
                        }
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#831843]/30 outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Showroom Street Address
                      </label>
                      <input
                        type="text"
                        value={websiteSettings.address}
                        onChange={(e) =>
                          setWebsiteSettings({ ...websiteSettings, address: e.target.value })
                        }
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#831843]/30 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        City & Pincode
                      </label>
                      <input
                        type="text"
                        value={websiteSettings.city}
                        onChange={(e) =>
                          setWebsiteSettings({ ...websiteSettings, city: e.target.value })
                        }
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#831843]/30 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Hero Section Headline
                    </label>
                    <input
                      type="text"
                      value={websiteSettings.heroHeadline}
                      onChange={(e) =>
                        setWebsiteSettings({ ...websiteSettings, heroHeadline: e.target.value })
                      }
                      className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#831843]/30 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Hero Section Subtitle
                    </label>
                    <textarea
                      rows={2}
                      value={websiteSettings.heroSubtitle}
                      onChange={(e) =>
                        setWebsiteSettings({ ...websiteSettings, heroSubtitle: e.target.value })
                      }
                      className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#831843]/30 outline-none"
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#831843] hover:bg-[#701A36] text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Website Changes</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* Newsletter Subscribers Tab */
                <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-[#831843]" />
                        <span>VIP Saree Collection Email Subscribers</span>
                      </h4>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Customers who joined via the footer newsletter to get new saree collection updates.
                      </p>
                    </div>

                    {subscribers.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          const allEmails = subscribers.map((s) => s.email).join(', ');
                          navigator.clipboard.writeText(allEmails);
                          setCopiedAll(true);
                          setTimeout(() => setCopiedAll(false), 2000);
                        }}
                        className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg border border-stone-300 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
                      >
                        {copiedAll ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy All Emails</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {subscribers.length === 0 ? (
                    <div className="text-center py-10 bg-stone-50 rounded-xl border border-dashed border-stone-300">
                      <Mail className="w-8 h-8 text-stone-400 mx-auto mb-2 opacity-60" />
                      <p className="text-xs font-semibold text-stone-700">No subscribers yet</p>
                      <p className="text-[11px] text-stone-500 max-w-sm mx-auto mt-1">
                        When visitors sign up through the footer newsletter form, their email addresses and subscription timestamps will appear here.
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-stone-200 text-stone-500 font-semibold text-[11px]">
                            <th className="pb-2">Email Address</th>
                            <th className="pb-2">Joined Date</th>
                            <th className="pb-2 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                          {subscribers.map((sub, i) => (
                            <tr key={i} className="hover:bg-stone-50">
                              <td className="py-2.5 font-medium text-stone-900 font-mono">
                                {sub.email}
                              </td>
                              <td className="py-2.5 text-stone-500 text-[11px]">
                                {new Date(sub.subscribedAt).toLocaleDateString('en-IN', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </td>
                              <td className="py-2.5 text-right">
                                <button
                                  type="button"
                                  onClick={() => {
                                    navigator.clipboard.writeText(sub.email);
                                  }}
                                  className="text-[11px] text-[#831843] hover:underline"
                                >
                                  Copy
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Security policy note */}
              <div className="p-3 bg-stone-100 rounded-xl text-[11px] text-stone-600 flex items-start gap-2 border border-stone-200/80">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-800">Strict Owner Exclusivity:</span>{' '}
                  Only <strong>{OWNER_EMAIL}</strong> has permissions to upload sarees, modify listings, and edit website details.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
