import React, { useState, useEffect, useRef } from 'react';
import { X, Plus, ShieldCheck, Sparkles, Upload, AlertCircle, Eye, CheckCircle2, Lock, Camera, Image as ImageIcon, Trash2, Edit3, LogOut } from 'lucide-react';
import { Saree } from '../types/saree';
import { OWNER_EMAIL, OWNER_DISPLAY_NAME, isOwnerLoggedIn, authenticateOwner } from '../utils/auth';

interface AddSareeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSaree: (saree: Saree) => void;
  onUpdateSaree?: (saree: Saree) => void;
  editingSaree?: Saree | null;
  onOpenOwnerPortal?: () => void;
  onLogout?: () => void;
}

const WEAVE_OPTIONS: Saree['weave'][] = [
  'Gadwal Pattu',
  'Mangalagiri Handloom',
  'Kanchi Pattu',
  'Banarasi Brocade',
  'Uppada Jamdani',
  'Chanderi Tissue',
  'Pure Tussar',
  'Coimbatore Soft Silk',
];

const OCCASION_OPTIONS: Saree['occasion'][] = [
  'Bridal & Muhurtham',
  'Festive & Puja',
  'Reception & Evening',
  'Daily & Office Grace',
];

const PRESET_IMAGES = [
  {
    name: 'Gadwal Pattu (Kuttu Peacock Teal)',
    url: '/src/assets/images/saree_gadwal_pattu_1792575863811.jpg',
  },
  {
    name: 'Kanchi Pattu (Crimson Mayil Bridal)',
    url: '/src/assets/images/saree_kanjivaram_crimson_1792573625434.jpg',
  },
  {
    name: 'Mangalagiri Handloom (Haldi Nizam)',
    url: '/src/assets/images/saree_mangalagiri_nizam_1792575865511.jpg',
  },
  {
    name: 'Banarasi Brocade (Midnight Navy)',
    url: '/src/assets/images/saree_banarasi_navy_1792573627193.jpg',
  },
  {
    name: 'Chanderi Tissue (Sage Celadon)',
    url: '/src/assets/images/saree_chanderi_sage_1792573628048.jpg',
  },
  {
    name: 'Pure Wild Tussar (Haldi Ochre)',
    url: '/src/assets/images/saree_tussar_mustard_1792573628149.jpg',
  },
  {
    name: 'Kanjivaram Heritage Gold Silk',
    url: '/src/assets/images/hero_kanjivaram_saree_1792573626510.jpg',
  },
];

const QUICK_COLORS = [
  { name: 'Peacock Teal', hex: '#0D9488' },
  { name: 'Sindoor Crimson', hex: '#991B1B' },
  { name: 'Rani Magenta', hex: '#BE185D' },
  { name: 'Haldi Mustard', hex: '#D97706' },
  { name: 'Emerald Temple Green', hex: '#047857' },
  { name: 'Midnight Navy', hex: '#1E3A8A' },
  { name: 'Royal Wine Plum', hex: '#581C87' },
  { name: 'Antique Gold Tissue', hex: '#B45309' },
];

export const AddSareeModal: React.FC<AddSareeModalProps> = ({
  isOpen,
  onClose,
  onAddSaree,
  onUpdateSaree,
  editingSaree = null,
  onLogout,
}) => {
  const isOwner = isOwnerLoggedIn();

  // Login form state if not authenticated
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPin, setLoginPin] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Active form view: 'form' or 'preview'
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');

  // File Upload State & Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const secondaryFileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [secondaryFileName, setSecondaryFileName] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [subname, setSubname] = useState('');
  const [code, setCode] = useState(() => `SMH-CUSTOM-${Math.floor(100 + Math.random() * 900)}`);
  const [weave, setWeave] = useState<Saree['weave']>('Gadwal Pattu');
  const [occasion, setOccasion] = useState<Saree['occasion']>('Festive & Puja');
  const [price, setPrice] = useState<number>(18500);
  const [originalPrice, setOriginalPrice] = useState<number>(22500);
  const [colorName, setColorName] = useState('Peacock Teal & Rani Magenta');
  const [colorHex, setColorHex] = useState('#0D9488');
  const [zari, setZari] = useState('Tested Traditional Silver-Gold Zari');
  const [origin, setOrigin] = useState('Gadwal, Telangana');
  const [weavingDays, setWeavingDays] = useState<number>(14);
  const [silkMarkCert, setSilkMarkCert] = useState('SM-TL-92840');
  const [image, setImage] = useState(PRESET_IMAGES[0].url);
  const [secondaryImage, setSecondaryImage] = useState('');
  const [description, setDescription] = useState(
    'Directly handwoven on pitlooms by our generational master weavers. Certified pure mulberry silk featuring traditional temple borders and contrast pallu.'
  );
  const [warpWeft, setWarpWeft] = useState('Pure Mulberry Silk Warp with Tested Zari Weft');
  const [blousePiece, setBlousePiece] = useState('Running contrast pure silk unstitched blouse (80 cm)');
  const [length, setLength] = useState('6.25 Metres (Includes 80cm blouse)');
  const [motif, setMotif] = useState('Kumbha (Temple Spire) & Mayil Peacock');
  const [inStock, setInStock] = useState(true);
  const [isBestseller, setIsBestseller] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Sync form if editing an existing saree
  useEffect(() => {
    if (editingSaree) {
      setName(editingSaree.name);
      setSubname(editingSaree.subname || '');
      setCode(editingSaree.code);
      setWeave(editingSaree.weave);
      setOccasion(editingSaree.occasion);
      setPrice(editingSaree.price);
      setOriginalPrice(editingSaree.originalPrice || Math.round(editingSaree.price * 1.2));
      setColorName(editingSaree.colorName);
      setColorHex(editingSaree.colorHex);
      setZari(editingSaree.zari);
      setOrigin(editingSaree.origin);
      setWeavingDays(editingSaree.weavingDays);
      setSilkMarkCert(editingSaree.silkMarkCert);
      setImage(editingSaree.image);
      setSecondaryImage(editingSaree.secondaryImage || '');
      setDescription(editingSaree.description);
      setWarpWeft(editingSaree.warpWeft);
      setBlousePiece(editingSaree.blousePiece);
      setLength(editingSaree.length);
      setMotif(editingSaree.motif);
      setInStock(editingSaree.inStock);
      setIsBestseller(editingSaree.isBestseller || false);
      setUploadedFileName(null);
      setSecondaryFileName(null);
    } else if (isOpen) {
      handleResetForm();
    }
  }, [editingSaree, isOpen]);

  if (!isOpen) return null;

  // Handle owner verification if not logged in
  const handleOwnerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const result = authenticateOwner(loginEmail, loginPin);
    if (!result.success) {
      setLoginError(result.message);
    } else {
      setLoginError(null);
    }
  };

  const handleResetForm = () => {
    setName('');
    setSubname('');
    setCode(`SMH-CUSTOM-${Math.floor(100 + Math.random() * 900)}`);
    setPrice(18500);
    setOriginalPrice(22500);
    setColorName('Peacock Teal & Rani Magenta');
    setColorHex('#0D9488');
    setZari('Tested Traditional Silver-Gold Zari');
    setOrigin('Gadwal, Telangana');
    setWeavingDays(14);
    setSilkMarkCert('SM-TL-92840');
    setImage(PRESET_IMAGES[0].url);
    setSecondaryImage('');
    setDescription('Directly handwoven on pitlooms by our generational master weavers. Certified pure mulberry silk featuring traditional temple borders and contrast pallu.');
    setFormError(null);
    setActiveTab('form');
    setUploadedFileName(null);
    setSecondaryFileName(null);
  };

  // Device File Upload Handler for Saree Photos
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isSecondary = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFormError('Please select a valid photo file (JPG, PNG, WebP).');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setFormError('Image size exceeds 8MB. Please select a smaller photo.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const dataUrl = uploadEvent.target?.result as string;
      if (isSecondary) {
        setSecondaryImage(dataUrl);
        setSecondaryFileName(file.name);
      } else {
        setImage(dataUrl);
        setUploadedFileName(file.name);
      }
      setFormError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Strict access control: only nanikoutarapu@gmail.com
    if (!isOwnerLoggedIn()) {
      setFormError(`Unauthorized: Only the shop owner (${OWNER_EMAIL}) has permission to upload or edit sarees.`);
      return;
    }

    if (!name.trim()) {
      setFormError('Please enter a saree title / name.');
      return;
    }

    if (!price || price <= 0) {
      setFormError('Please enter a valid price in INR.');
      return;
    }

    if (!image.trim()) {
      setFormError('Please upload an image from your device or select a preset photo.');
      return;
    }

    if (editingSaree && onUpdateSaree) {
      const updatedSaree: Saree = {
        ...editingSaree,
        code: code.trim().toUpperCase() || editingSaree.code,
        name: name.trim(),
        subname: subname.trim() || `${weave} with ${zari}`,
        weave,
        occasion,
        price: Number(price),
        originalPrice: originalPrice ? Number(originalPrice) : undefined,
        colorName: colorName.trim() || 'Multicolor Handloom',
        colorHex: colorHex || '#831843',
        zari: zari.trim() || 'Tested Traditional Zari',
        origin: origin.trim() || 'Telangana / Andhra Handloom Cluster',
        weavingDays: Number(weavingDays) || 12,
        silkMarkCert: silkMarkCert.trim() || `SM-IN-${Math.floor(10000 + Math.random() * 90000)}`,
        image: image.trim(),
        secondaryImage: secondaryImage.trim() || undefined,
        description: description.trim(),
        warpWeft: warpWeft.trim() || 'Pure Handloom Silk',
        blousePiece: blousePiece.trim() || 'Included 80cm unstitched fabric',
        length: length.trim() || '6.25 Metres',
        motif: motif.trim() || 'Traditional Temple Motif',
        inStock,
        isBestseller,
      };

      onUpdateSaree(updatedSaree);
      onClose();
      return;
    }

    const newSaree: Saree = {
      id: `custom-${Date.now()}-${code.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      code: code.trim().toUpperCase() || `SMH-${Date.now().toString().slice(-4)}`,
      name: name.trim(),
      subname: subname.trim() || `${weave} with ${zari}`,
      weave,
      occasion,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      colorName: colorName.trim() || 'Multicolor Handloom',
      colorHex: colorHex || '#831843',
      zari: zari.trim() || 'Tested Traditional Zari',
      origin: origin.trim() || 'Telangana / Andhra Handloom Cluster',
      weavingDays: Number(weavingDays) || 12,
      silkMarkCert: silkMarkCert.trim() || `SM-IN-${Math.floor(10000 + Math.random() * 90000)}`,
      image: image.trim(),
      secondaryImage: secondaryImage.trim() || undefined,
      description: description.trim(),
      warpWeft: warpWeft.trim() || 'Pure Handloom Silk',
      blousePiece: blousePiece.trim() || 'Included 80cm unstitched fabric',
      length: length.trim() || '6.25 Metres',
      motif: motif.trim() || 'Traditional Temple Motif',
      inStock,
      isBestseller,
    };

    onAddSaree(newSaree);
    handleResetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div className="bg-[#FAF8F5] w-full max-w-4xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#4A1525] text-amber-50 px-6 py-4 flex items-center justify-between shrink-0 border-b border-[#701A36]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-300/30 flex items-center justify-center text-amber-300">
              {editingSaree ? <Edit3 className="w-5 h-5" /> : <Upload className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] tracking-wider uppercase font-semibold text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-300/20">
                  {editingSaree ? 'Owner Saree Editor' : 'Owner Saree Upload'}
                </span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                {editingSaree ? `Edit Saree: ${editingSaree.name}` : 'Upload & Add Saree to Sri Markandeya Shop'}
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

        {/* Authorization Guard: If not logged in */}
        {!isOwner ? (
          <div className="p-8 sm:p-12 text-center max-w-lg mx-auto my-auto space-y-6">
            <div className="w-16 h-16 rounded-full bg-rose-100 text-[#831843] flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Administrator Sign In Required
              </h3>
              <p className="text-sm text-stone-600">
                To protect store catalog integrity, only authorized domain administrators can add or edit sarees on this website.
              </p>
            </div>

            {loginError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg text-left flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleOwnerLogin} className="space-y-4 text-left bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Owner Email Address
                </label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="Enter authorized email"
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#831843]/30 focus:border-[#831843] outline-none"
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
                  value={loginPin}
                  onChange={(e) => setLoginPin(e.target.value)}
                  placeholder="Enter password"
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#831843]/30 focus:border-[#831843] outline-none"
                  required
                  autoComplete="current-password"
                />
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#831843] hover:bg-[#701A36] text-white text-xs font-semibold rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Sign In as Store Administrator</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Owner Authenticated: Full Saree Creation Form */
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* Owner Active Status Bar & Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-amber-50 border border-amber-200/90 rounded-xl">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="text-xs">
                  <span className="font-semibold text-stone-900">Owner Access Confirmed:</span>{' '}
                  <span className="text-stone-700">{OWNER_EMAIL}</span>
                  <span className="ml-2 text-[10px] bg-emerald-100 text-emerald-800 font-medium px-2 py-0.5 rounded-full">
                    Authorized to Add Sarees
                  </span>
                </div>
              </div>

              {/* View / Preview Toggle */}
              <div className="flex items-center gap-1 bg-white/80 p-1 rounded-lg border border-stone-200">
                <button
                  type="button"
                  onClick={() => setActiveTab('form')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    activeTab === 'form'
                      ? 'bg-[#831843] text-white shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Edit Details
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                    activeTab === 'preview'
                      ? 'bg-[#831843] text-white shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Card Preview</span>
                </button>
              </div>

              {onLogout && (
                <button
                  type="button"
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  className="px-2.5 py-1 text-rose-700 hover:text-rose-900 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 self-start sm:self-auto"
                  title="Logout of Owner Mode"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              )}
            </div>

            {formError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {activeTab === 'preview' ? (
              /* Live Preview Stage */
              <div className="space-y-6 max-w-md mx-auto py-4">
                <div className="text-center">
                  <span className="text-xs uppercase tracking-wider text-[#831843] font-semibold">
                    Live Shopfront Preview
                  </span>
                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    How customers will see this saree
                  </h3>
                </div>

                <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-lg">
                  <div className="aspect-[4/3] w-full bg-stone-100 relative overflow-hidden">
                    <img
                      src={image}
                      alt={name || 'Saree Preview'}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = PRESET_IMAGES[0].url;
                      }}
                    />
                    <div className="absolute top-3 left-3 bg-[#4A1525]/90 text-amber-200 text-[10px] font-semibold px-2 py-0.5 rounded tracking-wider uppercase">
                      {isBestseller ? 'Boutique Favorite' : 'Artisan Handloom'}
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-stone-500">
                      <span className="font-semibold text-[#831843]">{weave}</span>
                      <span>·</span>
                      <span>{origin.split(',')[0]}</span>
                      <span>·</span>
                      <span>{weavingDays}d handloom</span>
                    </div>
                    <h4 className="font-serif text-base font-bold text-stone-900">
                      {name || 'Untitled Handloom Saree'}
                    </h4>
                    <p className="text-xs text-stone-500 line-clamp-2">
                      {colorName} · {motif}
                    </p>
                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                      <div>
                        <span className="text-base font-bold text-stone-900">
                          ₹{Number(price).toLocaleString('en-IN')}
                        </span>
                        {originalPrice && (
                          <span className="ml-2 text-xs text-stone-400 line-through">
                            ₹{Number(originalPrice).toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-emerald-800 font-medium">
                        Free Fall & Pico Edge
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => setActiveTab('form')}
                    className="px-4 py-2 bg-stone-100 text-stone-700 text-xs font-semibold rounded-lg hover:bg-stone-200"
                  >
                    ← Back to Edit Details
                  </button>
                </div>
              </div>
            ) : (
              /* The Comprehensive Saree Addition Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 1. Basic Identification */}
                <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 border-b border-stone-100 pb-2 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#831843]" />
                    <span>1. Basic Saree Details & Weave</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Saree Name / Title *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Royal Wine Kanchi Pattu with Mayil Motifs"
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#831843]/30 focus:border-[#831843] outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Subname / Border Highlight
                      </label>
                      <input
                        type="text"
                        value={subname}
                        onChange={(e) => setSubname(e.target.value)}
                        placeholder="e.g. Pure Zari Korvai Temple Border"
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#831843]/30 focus:border-[#831843] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Weave Technique *
                      </label>
                      <select
                        value={weave}
                        onChange={(e) => setWeave(e.target.value as Saree['weave'])}
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#831843]/30 bg-white"
                      >
                        {WEAVE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Occasion Category *
                      </label>
                      <select
                        value={occasion}
                        onChange={(e) => setOccasion(e.target.value as Saree['occasion'])}
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#831843]/30 bg-white"
                      >
                        {OCCASION_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Inventory Code / SKU *
                      </label>
                      <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="e.g. SMH-GAD-109"
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#831843]/30 outline-none uppercase font-mono"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Silk Mark Certification ID
                      </label>
                      <input
                        type="text"
                        value={silkMarkCert}
                        onChange={(e) => setSilkMarkCert(e.target.value)}
                        placeholder="e.g. SM-TL-92840"
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#831843]/30 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Pricing & Direct Loom Economics */}
                <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 border-b border-stone-100 pb-2">
                    2. Pricing & Loom Economics
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Direct Loom Selling Price (₹) *
                      </label>
                      <input
                        type="number"
                        min={1000}
                        max={200000}
                        step={100}
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#831843]/30 outline-none font-bold text-stone-900"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Market / Showroom Price (₹)
                      </label>
                      <input
                        type="number"
                        min={1000}
                        max={250000}
                        step={100}
                        value={originalPrice}
                        onChange={(e) => setOriginalPrice(Number(e.target.value))}
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#831843]/30 outline-none text-stone-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Customer Direct Loom Savings
                      </label>
                      <div className="text-xs py-2 px-3 bg-emerald-50 text-emerald-800 font-semibold rounded-lg border border-emerald-200">
                        {originalPrice > price
                          ? `₹${(originalPrice - price).toLocaleString('en-IN')} off (${Math.round(
                              ((originalPrice - price) / originalPrice) * 100
                            )}% artisan direct)`
                          : 'Honest Artisan Fair Price'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Color, Zari & Artisan Specs */}
                <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 border-b border-stone-100 pb-2">
                    3. Color, Zari & Artisan Weaving Specs
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Color Shade Name *
                      </label>
                      <input
                        type="text"
                        value={colorName}
                        onChange={(e) => setColorName(e.target.value)}
                        placeholder="e.g. Peacock Teal & Rani Magenta"
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#831843]/30 outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Color Swatch Hex Code
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={colorHex}
                          onChange={(e) => setColorHex(e.target.value)}
                          className="w-9 h-9 p-0.5 border border-stone-300 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={colorHex}
                          onChange={(e) => setColorHex(e.target.value)}
                          className="flex-1 text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#831843]/30 outline-none font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Quick Color Swatches */}
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-500 mb-1.5">
                      Quick Authentic Silk Palettes:
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {QUICK_COLORS.map((col) => (
                        <button
                          key={col.hex}
                          type="button"
                          onClick={() => {
                            setColorName(col.name);
                            setColorHex(col.hex);
                          }}
                          className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] bg-stone-50 border border-stone-200 rounded-md hover:border-stone-400"
                        >
                          <span
                            className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                            style={{ backgroundColor: col.hex }}
                          />
                          <span>{col.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Zari Purity
                      </label>
                      <input
                        type="text"
                        value={zari}
                        onChange={(e) => setZari(e.target.value)}
                        placeholder="e.g. 3G Tested Silver-Gold Zari"
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#831843]/30 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Weaving Hub / Origin
                      </label>
                      <input
                        type="text"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        placeholder="e.g. Gadwal, Telangana"
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#831843]/30 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Handloom Weaving Days
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={90}
                        value={weavingDays}
                        onChange={(e) => setWeavingDays(Number(e.target.value))}
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#831843]/30 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Warp & Weft Details
                      </label>
                      <input
                        type="text"
                        value={warpWeft}
                        onChange={(e) => setWarpWeft(e.target.value)}
                        placeholder="e.g. Pure Silk Warp & Tested Zari Weft"
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#831843]/30 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Blouse Piece
                      </label>
                      <input
                        type="text"
                        value={blousePiece}
                        onChange={(e) => setBlousePiece(e.target.value)}
                        placeholder="e.g. Running 80cm brocade blouse"
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#831843]/30 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Motifs & Embellishments
                      </label>
                      <input
                        type="text"
                        value={motif}
                        onChange={(e) => setMotif(e.target.value)}
                        placeholder="e.g. Temple Kumbha & Mayil"
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#831843]/30 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Saree Photography / Images */}
                <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-2">
                      <Camera className="w-3.5 h-3.5 text-[#831843]" />
                      <span>4. Saree Photography & Device Upload</span>
                    </h3>
                    <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Supports Camera & Gallery Uploads
                    </span>
                  </div>

                  {/* Primary Photo Device Upload Area */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Primary Saree Photo (from your device) *
                    </label>

                    {/* Hidden file input */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, false)}
                      className="hidden"
                    />

                    <div className="border-2 border-dashed border-stone-300 rounded-xl p-4 text-center hover:border-[#831843] bg-stone-50/60 transition-colors">
                      {image ? (
                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-between bg-white p-3 rounded-lg border border-stone-200">
                          <div className="flex items-center gap-3">
                            <img
                              src={image}
                              alt="Uploaded saree preview"
                              className="w-16 h-16 object-cover rounded-lg border border-stone-200 shrink-0"
                            />
                            <div className="text-left">
                              <span className="text-xs font-bold text-stone-900 block line-clamp-1">
                                {uploadedFileName || 'Saree Primary Image'}
                              </span>
                              <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1 mt-0.5">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                Ready for store catalog
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="px-3 py-1.5 text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg flex items-center gap-1.5 transition-colors"
                            >
                              <Upload className="w-3.5 h-3.5" />
                              <span>Replace from Device</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="py-4 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                          <div className="w-12 h-12 bg-rose-50 text-[#831843] rounded-full flex items-center justify-center mx-auto mb-2">
                            <Upload className="w-6 h-6" />
                          </div>
                          <p className="text-xs font-bold text-stone-800">
                            Click to upload saree photo from phone or computer
                          </p>
                          <p className="text-[11px] text-stone-400 mt-0.5">
                            Supports JPG, PNG, WEBP (Max 8MB). You can take a photo with your mobile camera.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Secondary Drape / Pallu Photo Upload (Optional) */}
                  <div className="pt-2">
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Secondary Drape / Pallu Close-up (Optional)
                    </label>

                    <input
                      type="file"
                      ref={secondaryFileInputRef}
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, true)}
                      className="hidden"
                    />

                    {secondaryImage ? (
                      <div className="flex items-center justify-between bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                        <div className="flex items-center gap-3">
                          <img
                            src={secondaryImage}
                            alt="Secondary preview"
                            className="w-12 h-12 object-cover rounded-md border border-stone-200 shrink-0"
                          />
                          <div className="text-left">
                            <span className="text-xs font-medium text-stone-800 line-clamp-1">
                              {secondaryFileName || 'Pallu / Drape View'}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSecondaryImage('')}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"
                          title="Remove secondary image"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => secondaryFileInputRef.current?.click()}
                        className="w-full py-2 px-3 border border-stone-300 rounded-lg text-xs text-stone-600 hover:text-stone-900 bg-white hover:bg-stone-50 flex items-center justify-center gap-2"
                      >
                        <Camera className="w-3.5 h-3.5 text-stone-500" />
                        <span>+ Upload Secondary Drape / Pallu Photo</span>
                      </button>
                    )}
                  </div>

                  {/* Or Pick from Handloom Presets */}
                  <div className="pt-2">
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Or Choose from Curated Handloom Presets:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-2">
                      {PRESET_IMAGES.map((preset) => (
                        <div
                          key={preset.url}
                          onClick={() => {
                            setImage(preset.url);
                            setUploadedFileName(null);
                          }}
                          className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all p-1 flex flex-col items-center gap-1.5 ${
                            image === preset.url
                              ? 'border-[#831843] bg-rose-50 shadow-sm'
                              : 'border-stone-200 hover:border-stone-400 bg-white'
                          }`}
                        >
                          <img
                            src={preset.url}
                            alt={preset.name}
                            className="w-full h-16 object-cover rounded"
                          />
                          <span className="text-[10px] text-stone-600 font-medium line-clamp-1 text-center">
                            {preset.name.split('(')[0]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Or Custom URL */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Or Image URL Link
                    </label>
                    <input
                      type="url"
                      value={image.startsWith('data:') ? '' : image}
                      onChange={(e) => {
                        setImage(e.target.value);
                        setUploadedFileName(null);
                      }}
                      placeholder="https://... or /src/assets/..."
                      className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#831843]/30 outline-none font-mono"
                    />
                  </div>
                </div>

                {/* 5. Description & Toggles */}
                <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 border-b border-stone-100 pb-2">
                    5. Description & Merchandising
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Artisan Backstory & Weave Description
                    </label>
                    <textarea
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Share details about the loom, weavers, drape feel, and recommended styling..."
                      className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#831843]/30 outline-none"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-6 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-stone-800">
                      <input
                        type="checkbox"
                        checked={inStock}
                        onChange={(e) => setInStock(e.target.checked)}
                        className="w-4 h-4 text-[#831843] rounded border-stone-300 focus:ring-[#831843]"
                      />
                      <span>In Stock (Ready for Dispatch / Video Shopping)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-stone-800">
                      <input
                        type="checkbox"
                        checked={isBestseller}
                        onChange={(e) => setIsBestseller(e.target.checked)}
                        className="w-4 h-4 text-[#831843] rounded border-stone-300 focus:ring-[#831843]"
                      />
                      <span>Mark as "Boutique Favorite / Bestseller"</span>
                    </label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 text-xs font-medium text-stone-600 hover:text-stone-900 border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#831843] hover:bg-[#701A36] text-white text-xs font-semibold rounded-lg shadow-md transition-all flex items-center gap-2"
                  >
                    {editingSaree ? (
                      <>
                        <Edit3 className="w-4 h-4" />
                        <span>Save Saree Changes</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Publish Saree to Shop</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
