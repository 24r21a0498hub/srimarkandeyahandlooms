import React, { useState } from 'react';
import { Sparkles, ArrowRight, RotateCcw, Heart, ShoppingBag, Eye, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Saree } from '../types/saree';

interface SareeQuizProps {
  sarees: Saree[];
  wishlistIds: string[];
  onToggleWishlist: (saree: Saree) => void;
  onSelectSaree: (saree: Saree) => void;
  onQuickAdd: (saree: Saree) => void;
}

interface QuizState {
  occasion: string;
  fabric: string;
  colorFamily: string;
}

export const SareeQuiz: React.FC<SareeQuizProps> = ({
  sarees,
  wishlistIds,
  onToggleWishlist,
  onSelectSaree,
  onQuickAdd,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [quizState, setQuizState] = useState<QuizState>({
    occasion: '',
    fabric: '',
    colorFamily: '',
  });
  const [isCompleted, setIsCompleted] = useState(false);

  // Steps definitions
  const steps = [
    {
      id: 1,
      title: 'What is the celebration or occasion?',
      subtitle: 'Select the primary setting for your saree drape',
      options: [
        {
          label: 'Bridal & Muhurtham',
          desc: 'Weddings, Trousseau, Sacred rituals',
          value: 'Bridal & Muhurtham',
        },
        {
          label: 'Festive & Puja',
          desc: 'Diwali, Sankranti, Varalakshmi Puja, Temple visits',
          value: 'Festive & Puja',
        },
        {
          label: 'Reception & Evening',
          desc: 'Cocktail parties, Musical sangeet, Banquets',
          value: 'Reception & Evening',
        },
        {
          label: 'Daily & Office Grace',
          desc: 'Lightweight comfort, dignified gatherings, meetings',
          value: 'Daily & Office Grace',
        },
      ],
    },
    {
      id: 2,
      title: 'What fabric texture & drape do you prefer?',
      subtitle: 'Choose your desired weight and handloom character',
      options: [
        {
          label: 'Traditional Gadwal or Kanchi Pattu',
          desc: 'Grand contrast zari borders with pure silk body',
          value: 'pattu',
        },
        {
          label: 'Crisp Pitloom Handloom',
          desc: 'Structured Mangalagiri with antique Nizam zari',
          value: 'mangalagiri',
        },
        {
          label: 'Gossamer Light & Sheer',
          desc: 'Chanderi tissue silk with weightless festive grace',
          value: 'chanderi',
        },
        {
          label: 'Organic Wild Silk Texture',
          desc: 'Authentic Bhagalpuri Desi Tussar with natural slubs',
          value: 'tussar',
        },
        {
          label: 'Any Pure Handloom',
          desc: 'Open to all authentic master loom weaves',
          value: 'any',
        },
      ],
    },
    {
      id: 3,
      title: 'Which color palette captures your vision?',
      subtitle: 'Select your preferred color mood',
      options: [
        {
          label: 'Auspicious Reds & Sindoor',
          desc: 'Classic bridal crimson, sindoor, and ruby red',
          value: 'red',
        },
        {
          label: 'Royal Jewel Tones',
          desc: 'Peacock teal, midnight navy, and royal bottle green',
          value: 'jewel',
        },
        {
          label: 'Vibrant Haldi & Mustard',
          desc: 'Warm mango yellows, turmeric haldi, and amber gold',
          value: 'haldi',
        },
        {
          label: 'Ethereal Pastels',
          desc: 'Sage mint, champagne shimmer, and soft blush',
          value: 'pastel',
        },
        {
          label: 'Surprise Me / Any Color',
          desc: 'Show all matching handloom treasures',
          value: 'any',
        },
      ],
    },
  ];

  const handleSelectOption = (key: keyof QuizState, value: string) => {
    const updated = { ...quizState, [key]: value };
    setQuizState(updated);

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setQuizState({ occasion: '', fabric: '', colorFamily: '' });
    setCurrentStep(1);
    setIsCompleted(false);
  };

  // Find recommendations
  const matchedSarees = sarees.filter((saree) => {
    // Occasion match
    if (quizState.occasion && saree.occasion !== quizState.occasion) {
      // allow partial match if bridal/festive overlap
      if (
        quizState.occasion === 'Bridal & Muhurtham' &&
        saree.weave !== 'Kanchi Pattu' &&
        saree.weave !== 'Gadwal Pattu'
      ) {
        return false;
      }
    }

    // Fabric match
    if (quizState.fabric === 'pattu') {
      if (saree.weave !== 'Gadwal Pattu' && saree.weave !== 'Kanchi Pattu') return false;
    } else if (quizState.fabric === 'mangalagiri') {
      if (saree.weave !== 'Mangalagiri Handloom') return false;
    } else if (quizState.fabric === 'chanderi') {
      if (saree.weave !== 'Chanderi Tissue') return false;
    } else if (quizState.fabric === 'tussar') {
      if (saree.weave !== 'Pure Tussar') return false;
    }

    // Color match
    if (quizState.colorFamily === 'red') {
      if (
        !saree.colorName.toLowerCase().includes('red') &&
        !saree.colorName.toLowerCase().includes('crimson') &&
        !saree.colorName.toLowerCase().includes('ruby')
      ) {
        return false;
      }
    } else if (quizState.colorFamily === 'jewel') {
      if (
        !saree.colorName.toLowerCase().includes('teal') &&
        !saree.colorName.toLowerCase().includes('navy') &&
        !saree.colorName.toLowerCase().includes('emerald') &&
        !saree.colorName.toLowerCase().includes('blue') &&
        !saree.colorName.toLowerCase().includes('green')
      ) {
        return false;
      }
    } else if (quizState.colorFamily === 'haldi') {
      if (
        !saree.colorName.toLowerCase().includes('mustard') &&
        !saree.colorName.toLowerCase().includes('haldi') &&
        !saree.colorName.toLowerCase().includes('gold')
      ) {
        return false;
      }
    } else if (quizState.colorFamily === 'pastel') {
      if (
        !saree.colorName.toLowerCase().includes('sage') &&
        !saree.colorName.toLowerCase().includes('mint') &&
        !saree.colorName.toLowerCase().includes('champagne')
      ) {
        return false;
      }
    }

    return true;
  });

  // Fallback to top rated sarees if filters are very tight
  const displayResults = matchedSarees.length > 0 ? matchedSarees : sarees.slice(0, 3);

  return (
    <section id="saree-quiz" className="py-16 sm:py-20 bg-[#F9F7F4] border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#831843] font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#831843]" />
            <span>Interactive Styling Guide</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900 text-balance">
            Find Your Perfect Saree in 3 Questions
          </h2>
          <p className="text-sm text-stone-600 mt-2 font-light">
            Tell us about your occasion, preferred texture, and color mood. We will match you with handpicked master loom creations.
          </p>
        </div>

        {/* Quiz Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200/90 p-6 sm:p-10 relative overflow-hidden">
          {!isCompleted ? (
            /* Active Step Questions */
            <div>
              {/* Progress Indicator */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-100">
                <span className="text-xs font-semibold text-[#831843] uppercase tracking-wider">
                  Question {currentStep} of 3
                </span>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        step === currentStep
                          ? 'w-8 bg-[#831843]'
                          : step < currentStep
                          ? 'w-4 bg-stone-300'
                          : 'w-4 bg-stone-100'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Step Title & Subtitle */}
              <div className="mb-6">
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  {steps[currentStep - 1].title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  {steps[currentStep - 1].subtitle}
                </p>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                {steps[currentStep - 1].options.map((opt) => {
                  const key =
                    currentStep === 1
                      ? 'occasion'
                      : currentStep === 2
                      ? 'fabric'
                      : 'colorFamily';
                  const isSelected = quizState[key] === opt.value;

                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleSelectOption(key, opt.value)}
                      className={`p-4 rounded-xl text-left border transition-all duration-200 group cursor-pointer ${
                        isSelected
                          ? 'border-[#831843] bg-rose-50/40 ring-1 ring-[#831843] shadow-sm'
                          : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50/60'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-sm font-semibold text-stone-900 group-hover:text-[#831843] transition-colors">
                          {opt.label}
                        </span>
                        <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#831843] group-hover:translate-x-1 transition-all shrink-0 mt-0.5" />
                      </div>
                      <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                        {opt.desc}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Back / Navigation button if step > 1 */}
              {currentStep > 1 && (
                <div className="flex justify-between items-center pt-4 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="text-xs font-semibold text-stone-500 hover:text-stone-800 transition-colors"
                  >
                    ← Previous Question
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-xs text-stone-400 hover:text-stone-600"
                  >
                    Reset Quiz
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Results View */
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Styling Consultation Complete</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                    Handpicked Recommendations for You
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
                    <span>{quizState.occasion || 'Festive'}</span>
                    <span aria-hidden="true">·</span>
                    <span>{quizState.fabric || 'Pure Handloom'}</span>
                    <span aria-hidden="true">·</span>
                    <span>{displayResults.length} Matched Masterpieces</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>
              </div>

              {/* Recommended Sarees Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayResults.map((saree) => {
                  const isWishlisted = wishlistIds.includes(saree.id);
                  return (
                    <article
                      key={saree.id}
                      onClick={() => onSelectSaree(saree)}
                      className="group flex flex-col bg-stone-50 border border-stone-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer"
                    >
                      <div className="relative aspect-[4/3] w-full bg-stone-200 overflow-hidden">
                        <img
                          src={saree.image}
                          alt={saree.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleWishlist(saree);
                          }}
                          className="absolute top-2.5 right-2.5 p-2 bg-white/90 hover:bg-white text-stone-700 hover:text-[#831843] rounded-full shadow-sm transition-all"
                          aria-label="Wishlist"
                        >
                          <Heart
                            className={`w-3.5 h-3.5 ${
                              isWishlisted ? 'fill-[#831843] text-[#831843]' : 'text-stone-600'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                        <div>
                          <div className="text-[11px] text-[#831843] font-semibold mb-1">
                            {saree.weave} · {saree.origin.split(',')[0]}
                          </div>
                          <h4 className="font-serif text-base font-bold text-stone-900 group-hover:text-[#831843] transition-colors leading-snug line-clamp-1">
                            {saree.name}
                          </h4>
                          <p className="text-xs text-stone-500 mt-0.5 line-clamp-1">
                            {saree.colorName}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-stone-200/80 flex items-center justify-between">
                          <span className="text-sm font-bold text-stone-900 tabular-nums">
                            ₹{saree.price.toLocaleString('en-IN')}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onQuickAdd(saree);
                            }}
                            className="px-3 py-1.5 bg-stone-900 hover:bg-[#831843] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                          >
                            <ShoppingBag className="w-3 h-3" />
                            <span>Add</span>
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
