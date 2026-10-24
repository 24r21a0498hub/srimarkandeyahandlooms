import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  Droplets,
  FolderSync,
  Archive,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Printer,
  Search,
  ShieldCheck,
  Wind,
  Sun,
  Flame,
  Info,
  Check,
} from 'lucide-react';

interface SareeCareModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'overview' | 'cleaning' | 'folding' | 'storing' | 'fabrics' | 'faqs';
}

type TabType = 'overview' | 'cleaning' | 'folding' | 'storing' | 'fabrics' | 'faqs';

export const SareeCareModal: React.FC<SareeCareModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'overview',
}) => {
  const [activeTab, setActiveTab] = useState<TabType>(defaultTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [selectedFabric, setSelectedFabric] = useState<string>('kanjivaram');
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    airing: false,
    refold: false,
    muslin: false,
    neem: false,
    zariCheck: false,
  });

  // Reset or initialize on open
  useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultTab);
      setSearchQuery('');
      setCopied(false);
    }
  }, [isOpen, defaultTab]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleCheck = (key: string) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCopySummary = () => {
    const summary = `SRI MARKANDEYA HANDLOOMS - SILK SAREE CARE PROTOCOL
1. CLEANING: Professional dry-cleaning only for pure silk and tested zari. Blot accidental stains with talc; never rub with wet wipes.
2. FOLDING: Always fold with zari facing inwards to prevent snags. Rotate creases every 90 days to prevent fiber fatigue.
3. STORING: Wrap each saree in pure unbleached mulmul/muslin. Avoid plastic covers. Keep away from direct sunlight & naphthalene.
4. IRONING: Always place a cotton cloth barrier between the iron and the saree. Use low-to-medium silk heat without direct water steam.
5. WEARING: Apply perfumes, hairsprays, and cosmetics BEFORE draping to prevent zari tarnishing.`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handlePrint = () => {
    window.print();
  };

  const fabricProfiles: Record<
    string,
    {
      name: string;
      origin: string;
      cleaning: string;
      folding: string;
      storing: string;
      specialNote: string;
    }
  > = {
    kanjivaram: {
      name: 'Pure Kanjivaram Bridal Silk',
      origin: 'Tamil Nadu · 3-Ply Mulberry Silk & Silver Zari',
      cleaning: 'Strict professional dry clean after every 2-3 wears. Never hand wash.',
      folding: 'Fold pallu inward with a soft tissue paper or muslin layer cushioning the heavy zari peti.',
      storing: 'Wrap in pure cotton mulmul. Store flat in deep shelves. Never hang heavy bridal sarees on thin wire hangers.',
      specialNote: 'Korvai joint borders are delicate when wet; avoid any damp spot cleaning near borders.',
    },
    gadwal: {
      name: 'Gadwal Pattu (Kuttu Weave)',
      origin: 'Telangana · Pure Silk Body with Interlocked Silk/Zari Borders',
      cleaning: 'Dry clean only. For sico blends, gentle cold petrol wash by certified specialists.',
      folding: 'The Kuttu joint where body meets border requires gentle rolling or loose folding without hard pressing.',
      storing: 'Muslin pouch with dried neem leaf satchel. Avoid heavy weights placed directly on top.',
      specialNote: 'The featherlight body is prone to crushing under heavy weights. Store in top shelf compartments.',
    },
    banarasi: {
      name: 'Varanasi Kadwa Katan Brocade',
      origin: 'Uttar Pradesh · Handspun Katan Silk & Cutwork Zari',
      cleaning: 'Dry clean exclusively. Charak (light roller pressing) by traditional dry cleaners only.',
      folding: 'Invert heavy kadwa floats inside. Place acid-free butter paper over dense floral jaal work.',
      storing: 'Heavy brocades benefit from horizontal cloth bundle storage. Never compress tightly.',
      specialNote: 'Keep zari away from direct humidity to prevent silver oxidation and discoloration.',
    },
    mangalagiri: {
      name: 'Mangalagiri Nizam Border Silk-Cotton',
      origin: 'Andhra Pradesh · Combed 80s/100s Cotton Warp & Pattu Weft',
      cleaning: 'Dry clean for first 2 washes. Subsequent gentle hand washes in cold water with reetha (soapnut) or mild shampoo.',
      folding: 'Standard accordion pleats. Warm iron on reverse side while slightly damp for crisp drape.',
      storing: 'Can be stored on padded wooden hangers or folded in breathable cotton bags.',
      specialNote: 'Do not wring or spin-dry; dry flat under shade to preserve original loom luster.',
    },
    tussar: {
      name: 'Wild Forest Tussar Silk',
      origin: 'Tribal Looms · Raw Textured Wild Silk',
      cleaning: 'Dry clean recommended. Spot-treat mud stains with dry soft bristle brush once dried.',
      folding: 'Loose folding. Natural slubs in tussar yarn give organic body—avoid sharp mechanical crease presses.',
      storing: 'Breathes best in pure cotton. Store in ventilated wooden almirahs.',
      specialNote: 'Natural tussar fibers have porous breathability; air frequently in shaded morning breeze.',
    },
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="saree-care-title"
    >
      <div className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="px-6 py-5 border-b border-stone-200 flex items-start justify-between bg-stone-50/90 shrink-0">
          <div className="pr-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#831843] uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-[#831843]" />
              <span>Artisan Preservation Handbook</span>
              <span aria-hidden="true">·</span>
              <span>Generational Wisdom</span>
            </div>
            <h2 id="saree-care-title" className="font-serif text-2xl font-bold text-stone-900 tracking-tight">
              Saree Care & Silk Preservation Guide
            </h2>
            <p className="text-xs text-stone-600 mt-1 max-w-xl">
              Professional advice from Sri Markandeya Handlooms master weavers to protect pure zari, maintain vibrant color fastness, and cherish heirloom silks across generations.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopySummary}
              className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-200/70 rounded-lg transition-colors inline-flex items-center gap-1.5 text-xs font-medium"
              title="Copy Quick Care Summary"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-200/70 rounded-lg transition-colors inline-flex items-center gap-1.5 text-xs font-medium"
              title="Print Care Guide"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-200/70 rounded-lg transition-colors ml-1"
              aria-label="Close care tips modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation (Segmented Control) */}
        <div className="px-6 py-2.5 bg-stone-100 border-b border-stone-200 shrink-0 overflow-x-auto">
          <div className="inline-flex gap-1 p-1 bg-stone-200/70 rounded-xl min-w-max">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Golden Rules
            </button>
            <button
              onClick={() => setActiveTab('cleaning')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'cleaning'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Cleaning & Stains
            </button>
            <button
              onClick={() => setActiveTab('folding')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'folding'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Folding & Creases
            </button>
            <button
              onClick={() => setActiveTab('storing')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'storing'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Storage & Wardrobe
            </button>
            <button
              onClick={() => setActiveTab('fabrics')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'fabrics'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              By Saree Weave
            </button>
            <button
              onClick={() => setActiveTab('faqs')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'faqs'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              FAQs & Myths
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1 text-stone-800">
          {/* TAB 1: OVERVIEW & GOLDEN RULES */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-5 text-xs text-stone-700 leading-relaxed">
                <div className="flex items-center gap-2 font-semibold text-amber-900 text-sm mb-1.5">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>The Handloom Weaver’s Philosophy</span>
                </div>
                <p>
                  Handloom pattu is woven with pure protein silk fibers and tested silver/gold electroplated zari. Unlike synthetic polyester fabrics, real silk breathes and possesses natural elasticity. When properly wrapped in unbleached mulmul and aired periodically, a genuine Kanchivaram or Gadwal pattu saree will retain its lustrous sheen and drape for over 50 years.
                </p>
              </div>

              {/* The 5 Unbreakable Laws */}
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-4">
                  The 5 Master Laws of Silk Care
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl border border-stone-200 bg-white hover:border-stone-300 transition-colors">
                    <div className="flex items-center gap-2.5 font-semibold text-stone-900 mb-1.5 text-sm">
                      <div className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center text-xs font-bold text-[#831843]">
                        1
                      </div>
                      <span>Never Spray Perfume Directly on Saree</span>
                    </div>
                    <p className="text-stone-600 leading-relaxed pl-8">
                      Alcohol and synthetic fixatives in perfumes, hairsprays, and body mists react with silver in pure zari, causing permanent black spots (tarnishing) that cannot be dry-cleaned away.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-stone-200 bg-white hover:border-stone-300 transition-colors">
                    <div className="flex items-center gap-2.5 font-semibold text-stone-900 mb-1.5 text-sm">
                      <div className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center text-xs font-bold text-[#831843]">
                        2
                      </div>
                      <span>Ban All Plastic Bags & Ziplocs</span>
                    </div>
                    <p className="text-stone-600 leading-relaxed pl-8">
                      Plastic traps ambient moisture, breeds mildew, and emits harmful petroleum off-gases that dull natural silk sheen. Wrap only in 100% breathable cotton muslin.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-stone-200 bg-white hover:border-stone-300 transition-colors">
                    <div className="flex items-center gap-2.5 font-semibold text-stone-900 mb-1.5 text-sm">
                      <div className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center text-xs font-bold text-[#831843]">
                        3
                      </div>
                      <span>Rotate Crease Folds Every 90 Days</span>
                    </div>
                    <p className="text-stone-600 leading-relaxed pl-8">
                      Constant pressure along the same fold line causes heavy metallic zari to fatigue and sever warp threads. Unfurl your sarees quarterly, air in shade, and refold along new axes.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-stone-200 bg-white hover:border-stone-300 transition-colors">
                    <div className="flex items-center gap-2.5 font-semibold text-stone-900 mb-1.5 text-sm">
                      <div className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center text-xs font-bold text-[#831843]">
                        4
                      </div>
                      <span>Always Iron With a Cotton Barrier</span>
                    </div>
                    <p className="text-stone-600 leading-relaxed pl-8">
                      Direct soleplate contact can melt delicate zari binding filaments. Place an unprinted cotton handkerchief or thin dupatta over the saree, using medium silk heat.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-stone-200 bg-white hover:border-stone-300 transition-colors md:col-span-2">
                    <div className="flex items-center gap-2.5 font-semibold text-stone-900 mb-1.5 text-sm">
                      <div className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center text-xs font-bold text-[#831843]">
                        5
                      </div>
                      <span>Air Thoroughly Before Wardrobe Rest</span>
                    </div>
                    <p className="text-stone-600 leading-relaxed pl-8">
                      Never put a freshly worn saree directly back into the almirah. Body heat, perspiration, and humidity weaken the fibers. Air the saree on a clothesline indoors away from direct sun for 6-8 hours before folding.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Interactive Seasonal Checklist */}
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-serif font-bold text-stone-900 text-sm">
                    Interactive Quarterly Maintenance Checklist
                  </div>
                  <span className="text-[11px] text-stone-500">
                    Track your almirah routine
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  {[
                    { key: 'airing', label: 'Air saree indoors in a shaded breeze for 1 to 2 hours' },
                    { key: 'refold', label: 'Invert saree and refold along fresh crease positions' },
                    { key: 'muslin', label: 'Inspect muslin wrapper; wash or swap cloth cover if dusty' },
                    { key: 'neem', label: 'Replace dried neem leaf sachets or cloves (never naphthalene directly)' },
                    { key: 'zariCheck', label: 'Examine pallu fringe and zari edges for any loose metallic threads' },
                  ].map((item) => (
                    <label
                      key={item.key}
                      onClick={() => toggleCheck(item.key)}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-stone-100 cursor-pointer select-none transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={checklist[item.key]}
                        onChange={() => {}}
                        className="w-4 h-4 rounded text-[#831843] focus:ring-[#831843]"
                      />
                      <span className={checklist[item.key] ? 'line-through text-stone-400' : 'text-stone-700'}>
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CLEANING & STAIN CARE */}
          {activeTab === 'cleaning' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
                  Cleaning Protocols: Washing vs. Dry Cleaning
                </h3>
                <p className="text-xs text-stone-600 mb-4">
                  Pure silk contains natural sericin proteins that can dissolve when exposed to harsh alkaline detergents or hot water. Follow these strict cleaning rules:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl border border-stone-200 bg-white">
                    <div className="flex items-center gap-2 font-semibold text-stone-900 mb-2 text-sm">
                      <Droplets className="w-4 h-4 text-blue-600" />
                      <span>When to Professional Dry Clean</span>
                    </div>
                    <ul className="space-y-2 text-stone-600 list-disc list-inside leading-relaxed">
                      <li>All pure Kanjivaram, Gadwal, Banarasi, and Paithani pattu sarees.</li>
                      <li>Any saree with tested gold, silver, or electroplated zari borders.</li>
                      <li>After every 2 to 3 wears (if only worn for a short 2-hour ceremony, simply air it thoroughly).</li>
                      <li>Specify <strong>hydrocarbon or perchloroethylene</strong> dry cleaning without heavy industrial tumbling.</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl border border-stone-200 bg-white">
                    <div className="flex items-center gap-2 font-semibold text-stone-900 mb-2 text-sm">
                      <Wind className="w-4 h-4 text-teal-600" />
                      <span>Handwash Rules (Only for Pure Cotton & Sico)</span>
                    </div>
                    <ul className="space-y-2 text-stone-600 list-disc list-inside leading-relaxed">
                      <li>Permissible strictly for non-zari Mangalagiri cottons and casual handloom mulmul.</li>
                      <li>Always use cold tap water; never warm or hot.</li>
                      <li>Use 1 tablespoon of pH-neutral soapnut liquid (reetha) or baby shampoo.</li>
                      <li>Dip, swirl gently for 60 seconds, rinse in cold water with rock salt to fix dye. Never scrub or twist.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Emergency Stain Triage Guide */}
              <div className="border border-stone-200 rounded-xl p-5 bg-white">
                <div className="flex items-center gap-2 font-serif font-bold text-stone-900 text-sm mb-3">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Emergency Stain Triage: What to Do (and Never Do)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-3 bg-stone-50 rounded-lg">
                    <div className="font-semibold text-stone-900 mb-1">Oil, Ghee & Gravy Stains</div>
                    <p className="text-stone-600 leading-relaxed mb-2">
                      <strong>Immediate:</strong> Sprinkle talcum powder or cornstarch directly onto the oil drop. Let it sit for 30 minutes to absorb the grease.
                    </p>
                    <span className="text-[11px] text-[#831843] font-medium block">
                      Never rub with water or wet tissues, which expands the grease ring.
                    </span>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-lg">
                    <div className="font-semibold text-stone-900 mb-1">Sweat & Moisture Rings</div>
                    <p className="text-stone-600 leading-relaxed mb-2">
                      <strong>Immediate:</strong> Place dry white cotton towels on both sides of the damp area and press gently to absorb body salts.
                    </p>
                    <span className="text-[11px] text-[#831843] font-medium block">
                      Air immediately under ceiling fan; never use a hot hair dryer.
                    </span>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-lg">
                    <div className="font-semibold text-stone-900 mb-1">Kumkum, Haldi & Coffee</div>
                    <p className="text-stone-600 leading-relaxed mb-2">
                      <strong>Immediate:</strong> Blow away loose powder first. Do not wet! Take to professional saree dry cleaner within 24-48 hours.
                    </p>
                    <span className="text-[11px] text-[#831843] font-medium block">
                      Bleach or soap will permanently set turmeric yellow into silk protein.
                    </span>
                  </div>
                </div>
              </div>

              {/* Ironing & Steam Guidelines */}
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 flex items-start gap-3">
                <Flame className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-stone-700 leading-relaxed">
                  <div className="font-semibold text-stone-900 mb-1">Ironing & Pressing Instructions</div>
                  Always set your iron to the lowest <strong>Silk</strong> setting (110°C - 130°C). Iron on the reverse side of the saree. Never place the hot soleplate directly over metallic zari or embroidery threads—use a clean white mulmul cotton pressing cloth as a shield. Avoid direct water sprays as water droplets cause localized water spots on unwashed silk.
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FOLDING & CREASES */}
          {activeTab === 'folding' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
                  The Art of Folding Pure Silk & Zari
                </h3>
                <p className="text-xs text-stone-600 mb-4">
                  Pure silk sarees contain hundreds of fine warp and weft filaments. Incorrect folding can crush the zari, break threads along the creases, or snag intricate motifs.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl border border-stone-200 bg-white">
                    <div className="w-7 h-7 rounded-lg bg-stone-100 flex items-center justify-center font-serif font-bold text-[#831843] mb-2">
                      01
                    </div>
                    <h4 className="font-semibold text-stone-900 mb-1">Invert Zari Work Inward</h4>
                    <p className="text-stone-600 leading-relaxed">
                      Always fold the saree with the embroidered or woven zari side facing <strong>inwards</strong>. This protects the delicate gold wire from friction against other sarees or wardrobe shelves.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-stone-200 bg-white">
                    <div className="w-7 h-7 rounded-lg bg-stone-100 flex items-center justify-center font-serif font-bold text-[#831843] mb-2">
                      02
                    </div>
                    <h4 className="font-semibold text-stone-900 mb-1">Cushion the Grand Pallu</h4>
                    <p className="text-stone-600 leading-relaxed">
                      For heavy bridal sarees with dense petis or kuttu borders, insert a sheet of acid-free butter paper or a soft cotton muslin layer inside the fold where the pallu bends.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-stone-200 bg-white">
                    <div className="w-7 h-7 rounded-lg bg-stone-100 flex items-center justify-center font-serif font-bold text-[#831843] mb-2">
                      03
                    </div>
                    <h4 className="font-semibold text-stone-900 mb-1">The 90-Day Crease Rotation</h4>
                    <p className="text-stone-600 leading-relaxed">
                      Every 3 months, take the saree out, unfold it completely, and refold along new fold lines (shifting the crease by 2 to 3 inches). This prevents permanent crease cuts.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step-by-Step Folding Diagram */}
              <div className="border border-stone-200 rounded-xl p-5 bg-stone-50">
                <div className="font-serif font-bold text-stone-900 text-sm mb-3">
                  Step-by-Step Master Fold Routine
                </div>
                <div className="space-y-3 text-xs text-stone-700">
                  <div className="flex items-start gap-3">
                    <span className="font-mono font-bold text-[#831843] shrink-0">STEP 1:</span>
                    <span>Spread the entire 5.5 to 6.3-meter saree lengthwise on a clean, dry bed or table covered with a bedsheet.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="font-mono font-bold text-[#831843] shrink-0">STEP 2:</span>
                    <span>Fold the saree in half width-wise, bringing the bottom border up to align with the top waist border. Smooth gently with your open palms (never press down with fingernails).</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="font-mono font-bold text-[#831843] shrink-0">STEP 3:</span>
                    <span>Fold into neat lengthwise thirds (accordion style), ensuring the heavy pallu sits on top with its zari facing inward.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="font-mono font-bold text-[#831843] shrink-0">STEP 4:</span>
                    <span>Slide the folded saree into a pure unbleached cotton muslin pouch. Tie the cotton drawstring loosely to allow fresh air movement.</span>
                  </div>
                </div>
              </div>

              {/* Rolling Alternative for Heavy Brocades */}
              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 flex items-start gap-3">
                <FolderSync className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-xs text-stone-700 leading-relaxed">
                  <span className="font-semibold text-stone-900 block mb-0.5">Weaver’s Secret: Rolling Heavy Brocades</span>
                  If you have extra shelf depth, roll heavy Kanchivaram or Paithani sarees around a thick acid-free cardboard cylinder (or padded fabric roll) instead of folding. Rolling completely eliminates crease lines and preserves 100% of the metallic wire integrity.
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: STORAGE & WARDROBE */}
          {activeTab === 'storing' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
                  The Sanctuary: Wardrobe & Storage Rules
                </h3>
                <p className="text-xs text-stone-600 mb-4">
                  Where and how your sarees live between weddings determines whether they last 10 years or 50 years. Moisture, light, insects, and chemical vapors are silk’s primary enemies.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl border border-stone-200 bg-white">
                    <div className="flex items-center gap-2 font-semibold text-stone-900 mb-2 text-sm">
                      <Archive className="w-4 h-4 text-stone-800" />
                      <span>The Pure Cotton Muslin Cover</span>
                    </div>
                    <p className="text-stone-600 leading-relaxed">
                      Pure cotton muslin (mulmul) or clean, unstarched old cotton dhotis are the gold standard for silk storage. Cotton absorbs excess ambient humidity while still allowing the natural silk fibers to breathe.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-stone-200 bg-white">
                    <div className="flex items-center gap-2 font-semibold text-stone-900 mb-2 text-sm">
                      <Sun className="w-4 h-4 text-amber-600" />
                      <span>Dark, Cool & Ventilated Space</span>
                    </div>
                    <p className="text-stone-600 leading-relaxed">
                      Store sarees in a cool, dark wooden wardrobe away from exterior walls that may conduct dampness during monsoon seasons. Avoid direct sunlight or fluorescent display lights that fade vegetable and reactive dyes.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-stone-200 bg-white">
                    <div className="flex items-center gap-2 font-semibold text-stone-900 mb-2 text-sm">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      <span>Say No to Metal Hangers</span>
                    </div>
                    <p className="text-stone-600 leading-relaxed">
                      Never hang heavy pure silk sarees on thin wire or metal hangers. The weight of the 800g-1.2kg saree causes the silk to stretch and sag under gravity, creating permanent shoulder indentations. Store flat on shelves.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-stone-200 bg-white">
                    <div className="flex items-center gap-2 font-semibold text-stone-900 mb-2 text-sm">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Natural Insect Repellents</span>
                    </div>
                    <p className="text-stone-600 leading-relaxed">
                      <strong>Do NOT</strong> place naphthalene or moth balls directly touching silk—their vapors react with pure zari and turn it gray. Instead, wrap dried neem leaves, cloves, or cedarwood blocks in small cotton pouches and place them in the corners of the almirah.
                    </p>
                  </div>
                </div>
              </div>

              {/* Monsoon & Humidity Protocol */}
              <div className="border border-stone-200 rounded-xl p-5 bg-stone-50">
                <div className="font-serif font-bold text-stone-900 text-sm mb-2">
                  Special Monsoon Season Protocol
                </div>
                <div className="text-xs text-stone-600 leading-relaxed space-y-2">
                  <p>
                    During heavy rains, humidity inside wooden cupboards can exceed 80%, promoting fungal mildew on pure silk:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Place rechargeable silica gel dehumidifier pouches on wardrobe shelves (keep separate from saree cloth).</li>
                    <li>Open wardrobe doors on dry, breezy sunny afternoons to circulate fresh indoor air.</li>
                    <li>If a saree smells musty, hang it in an air-conditioned room for 3 hours to gently extract moisture.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: FABRIC CARE MATRIX */}
          {activeTab === 'fabrics' && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-stone-900">
                      Fabric-Specific Care Profiles
                    </h3>
                    <p className="text-xs text-stone-600">
                      Different weaving styles and fiber counts have unique care requirements. Select your weave below:
                    </p>
                  </div>
                </div>

                {/* Fabric Selector Buttons */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {Object.entries(fabricProfiles).map(([key, item]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedFabric(key)}
                      className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all text-left ${
                        selectedFabric === key
                          ? 'bg-[#831843] text-white border-[#831843] shadow-sm'
                          : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>

                {/* Selected Fabric Card */}
                {fabricProfiles[selectedFabric] && (
                  <div className="p-5 border border-stone-200 rounded-xl bg-white space-y-4">
                    <div className="border-b border-stone-100 pb-3">
                      <div className="text-xs text-amber-700 font-semibold uppercase tracking-wider">
                        Weave Profile
                      </div>
                      <h4 className="font-serif text-xl font-bold text-stone-900">
                        {fabricProfiles[selectedFabric].name}
                      </h4>
                      <p className="text-xs text-stone-500 mt-0.5">
                        {fabricProfiles[selectedFabric].origin}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div className="p-3 bg-stone-50 rounded-lg">
                        <div className="font-semibold text-stone-900 mb-1 flex items-center gap-1.5">
                          <Droplets className="w-3.5 h-3.5 text-blue-600" />
                          <span>Cleaning Mandate</span>
                        </div>
                        <p className="text-stone-600 leading-relaxed">
                          {fabricProfiles[selectedFabric].cleaning}
                        </p>
                      </div>

                      <div className="p-3 bg-stone-50 rounded-lg">
                        <div className="font-semibold text-stone-900 mb-1 flex items-center gap-1.5">
                          <FolderSync className="w-3.5 h-3.5 text-amber-600" />
                          <span>Folding Technique</span>
                        </div>
                        <p className="text-stone-600 leading-relaxed">
                          {fabricProfiles[selectedFabric].folding}
                        </p>
                      </div>

                      <div className="p-3 bg-stone-50 rounded-lg">
                        <div className="font-semibold text-stone-900 mb-1 flex items-center gap-1.5">
                          <Archive className="w-3.5 h-3.5 text-stone-700" />
                          <span>Storage Strategy</span>
                        </div>
                        <p className="text-stone-600 leading-relaxed">
                          {fabricProfiles[selectedFabric].storing}
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 bg-amber-50/60 border border-amber-200/70 rounded-lg text-xs text-stone-700 flex items-start gap-2.5">
                      <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-amber-900">Master Weaver Note: </span>
                        {fabricProfiles[selectedFabric].specialNote}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 6: FAQS & MYTHS */}
          {activeTab === 'faqs' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
                  Myth-Busters & Frequently Asked Questions
                </h3>
                <p className="text-xs text-stone-600 mb-4">
                  Common misconceptions that damage genuine handloom silk sarees:
                </p>

                <div className="space-y-4 text-xs">
                  <div className="p-4 rounded-xl border border-stone-200 bg-white">
                    <h4 className="font-semibold text-stone-900 text-sm mb-1.5">
                      Myth 1: "I should sun-dry my silk saree to kill fungus and bacteria."
                    </h4>
                    <p className="text-stone-600 leading-relaxed mb-2">
                      <strong className="text-rose-700">Fact: Direct harsh sunlight is the enemy of pure silk.</strong> Ultraviolet rays degrade natural silk fibers, making them brittle and fragile, while fading rich natural jewel tones (like crimson, peacock green, and rani pink). Always air your sarees indoors in a well-ventilated, shaded room under a slow fan.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-stone-200 bg-white">
                    <h4 className="font-semibold text-stone-900 text-sm mb-1.5">
                      Myth 2: "Naphthalene balls keep my sarees fresh forever."
                    </h4>
                    <p className="text-stone-600 leading-relaxed mb-2">
                      <strong className="text-rose-700">Fact: Never place naphthalene balls in direct contact with zari.</strong> The volatile chemical sulfur gas emitted by mothballs directly tarnishes the silver alloy in zari, turning precious gold embroidery into a dull gray or black hue. Use neem leaves or cloves in cloth sachets instead.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-stone-200 bg-white">
                    <h4 className="font-semibold text-stone-900 text-sm mb-1.5">
                      Myth 3: "Why did the zari along the fold of my grandmother’s saree tear?"
                    </h4>
                    <p className="text-stone-600 leading-relaxed mb-2">
                      <strong className="text-amber-800">Fact: This is caused by lack of fold rotation.</strong> Heavy zari consists of fine silver/gold metal flattened over silk yarn. When kept folded at the exact same sharp line for 3 to 5 years, gravity and metallic tension sever the warp threads. Shifting folds every 90 days prevents this completely.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-stone-200 bg-white">
                    <h4 className="font-semibold text-stone-900 text-sm mb-1.5">
                      Myth 4: "Can I use starch to make my soft silk stiff like new?"
                    </h4>
                    <p className="text-stone-600 leading-relaxed mb-2">
                      <strong className="text-rose-700">Fact: Absolutely never apply artificial starch to pure pattu.</strong> Starch attracts silverfish and insects, which eat through the protein fibers, leaving holes in your treasured saree. Pure silk achieves its regal fall naturally from the count of its weave, not chemical stiffness.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-stone-200 bg-white">
                    <h4 className="font-semibold text-stone-900 text-sm mb-1.5">
                      Myth 5: "What is Charak, and should I get it done?"
                    </h4>
                    <p className="text-stone-600 leading-relaxed mb-2">
                      <strong className="text-emerald-700">Fact: Charak is traditional roller pressing.</strong> It is safe when done by traditional handloom restorers without chemical starch. It removes crushed micro-wrinkles and restores the original loom sheen without flattening the 3D relief of kadwa or korvai borders.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Actions Footer */}
        <div className="px-6 py-4 border-t border-stone-200 bg-stone-50 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Sri Markandeya Handlooms · Free Muslin Bag with Every Saree</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleCopySummary}
              className="w-full sm:w-auto px-4 py-2 text-xs font-semibold rounded-lg border border-stone-300 bg-white hover:bg-stone-100 text-stone-800 transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Summary' : 'Copy Care Protocol'}</span>
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2 text-xs font-semibold rounded-lg bg-[#831843] hover:bg-[#701A36] text-white shadow-sm transition-all whitespace-nowrap"
            >
              Close Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
