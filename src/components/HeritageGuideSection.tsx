import React, { useState } from 'react';
import { BookOpen, Sparkles, Shield, Layers, HelpCircle, Check } from 'lucide-react';

interface HeritageGuideSectionProps {
  onOpenCareTips?: () => void;
}

export const HeritageGuideSection: React.FC<HeritageGuideSectionProps> = ({ onOpenCareTips }) => {
  const [activeTab, setActiveTab] = useState<'weaves' | 'drape' | 'care'>('weaves');

  return (
    <section id="heritage-guide" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-stone-200">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="text-xs uppercase tracking-wider text-[#831843] font-semibold mb-2">
          Knowledge & Craftsmanship
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900 text-balance">
          The Saree Connoisseur’s Guide
        </h2>
        <p className="text-sm text-stone-600 mt-2">
          Understanding authentic handloom weaving traditions, timeless drape methods, and how to preserve pure silk for generations.
        </p>

        {/* Tab Controls (Functional Segmented Control) */}
        <div className="inline-flex p-1 bg-stone-100 rounded-xl mt-6 border border-stone-200">
          <button
            onClick={() => setActiveTab('weaves')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'weaves'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            01. Handloom Weaves Decoded
          </button>
          <button
            onClick={() => setActiveTab('drape')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'drape'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            02. Saree Drape Guide
          </button>
          <button
            onClick={() => setActiveTab('care')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'care'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            03. Silk Preservation & Care
          </button>
        </div>
      </div>

      {/* Tab 1: Weaves Decoded */}
      {activeTab === 'weaves' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-[#831843] uppercase tracking-wider mb-2">
                Telangana Loom Masterpiece
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
                Gadwal Kuttu Interlock
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                In authentic Gadwal pattu, the body is woven on one loom with pure silk or fine sico yarn, while the heavy contrasting border is joined using the legendary <em>Kuttu</em> interlocking weft technique. Celebrated on Missamma for its featherlight body and grand temple spire borders.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-stone-100 text-[11px] text-stone-500 flex items-center justify-between">
              <span>Origin: Gadwal, Telangana</span>
              <span className="font-semibold text-stone-800">Kuttu Hand Shuttle</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-[#831843] uppercase tracking-wider mb-2">
                Andhra Pradesh Heritage
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
                Mangalagiri Nizam Border
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Woven on the pitlooms of Mangalagiri near the hill of Lord Panakala Narasimha Swamy. Features tight 80s/100s combed counts with genuine gold zari <em>Nizam</em> borders (spire-and-chevron motifs) that maintain their structure without wrinkling.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-stone-100 text-[11px] text-stone-500 flex items-center justify-between">
              <span>Origin: Mangalagiri, AP</span>
              <span className="font-semibold text-stone-800">Crisp Pitloom Texture</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-[#831843] uppercase tracking-wider mb-2">
                Deva Vastra Lineage
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
                Sage Markandeya Legacy
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Honoring Sage Markandeya, the legendary divine ancestor of handloom weavers who weaved sacred garments from lotus stems for the celestial gods. Sri Markandeya Handlooms preserves direct fair compensation to our master weaver families.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-stone-100 text-[11px] text-stone-500 flex items-center justify-between">
              <span>Govt. Silk Mark Certified</span>
              <span className="font-semibold text-stone-800">100% Handloom Origin</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Saree Drape Guide */}
      {activeTab === 'drape' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
            <span className="text-xs font-semibold text-stone-400 block mb-1">Drape Style 01</span>
            <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
              The Classic Nivi Drape
            </h3>
            <p className="text-xs text-stone-600 mb-4">
              The timeless universal drape of India. Ideal for heavy Kanjivarams and grand weddings.
            </p>
            <ol className="text-xs text-stone-600 space-y-2 list-decimal list-inside leading-relaxed">
              <li>Tuck the inner edge into your petticoat from right to left at navel level.</li>
              <li>Make one complete turn around the waist maintaining uniform floor height.</li>
              <li>Gather 6–8 sharp pleats (5 inches wide) and tuck firmly into the center navel.</li>
              <li>Drape the remaining pallu diagonally across the chest over the left shoulder.</li>
            </ol>
          </div>

          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
            <span className="text-xs font-semibold text-stone-400 block mb-1">Drape Style 02</span>
            <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
              Seedha Pallu (Gujarati)
            </h3>
            <p className="text-xs text-stone-600 mb-4">
              Brings the opulent pallu to the front. Perfect for highlighting heavy Banarasi kadwa jaals.
            </p>
            <ol className="text-xs text-stone-600 space-y-2 list-decimal list-inside leading-relaxed">
              <li>Tuck initial round as standard nivi drape.</li>
              <li>Take the pallu around your back from the left and bring it over the right shoulder to the front.</li>
              <li>Spread the zari pallu broad across the chest like an apron.</li>
              <li>Pin the left corner of the pallu neatly to the left waist band.</li>
            </ol>
          </div>

          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
            <span className="text-xs font-semibold text-stone-400 block mb-1">Drape Style 03</span>
            <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
              Pleat Perfection Tips
            </h3>
            <p className="text-xs text-stone-600 mb-4">
              Master draper secrets for sharp, crease-free handloom silk pleats in under 5 minutes.
            </p>
            <ul className="text-xs text-stone-600 space-y-2 leading-relaxed">
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#831843] shrink-0 mt-0.5" />
                <span>Wear your bridal heels before measuring the saree tuck height.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#831843] shrink-0 mt-0.5" />
                <span>Use wide fabric clips while fan-folding the shoulder pallu before pinning.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#831843] shrink-0 mt-0.5" />
                <span>Always pin through a piece of card/button to prevent zari threads from tearing.</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Tab 3: Silk Care & Preservation */}
      {activeTab === 'care' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
            <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
              Pure Muslin Cloth Wrap
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed mb-3">
              Never store pure silk sarees in plastic bags or polyester covers. Plastic traps moisture, causing pure silver zari to oxidize and yellow. Always wrap in unbleached pure cotton muslin cloth or mulmul to allow the natural silk fibers to breathe.
            </p>
            <span className="text-[11px] font-semibold text-stone-800">
              *Each Aadya Silks purchase includes a complimentary muslin bag.
            </span>
          </div>

          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
            <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
              The 90-Day Fold Rotation
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed mb-3">
              Heavy gold zari along fold lines can weaken the silk warp if kept in the same crease for years. Unfold your sarees every 3 months, air them in a shaded, well-ventilated room for an hour, and refold along new fold lines.
            </p>
            <span className="text-[11px] font-semibold text-stone-800">
              Prevents permanent crease cuts and maintains fabric elasticity.
            </span>
          </div>

          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
            <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
              Dry Clean & Stain Care
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed mb-3">
              Never hand-wash or machine-wash pure zari silk. For accidental perfume or oil drops, blot immediately with talcum powder without rubbing. Send only to professional dry cleaners experienced in handloom zari revival.
            </p>
            <span className="text-[11px] font-semibold text-stone-800">
              Never spray perfumes or deodorants directly on zari borders.
            </span>
          </div>

          {onOpenCareTips && (
            <div className="md:col-span-3 pt-2 flex justify-center">
              <button
                onClick={onOpenCareTips}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#831843] hover:bg-[#701A36] text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Open Complete Saree Care & Preservation Handbook</span>
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
