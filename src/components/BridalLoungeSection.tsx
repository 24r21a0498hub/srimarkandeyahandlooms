import React from 'react';
import { Calendar, Coffee, Crown, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface BridalLoungeSectionProps {
  onBookAppointment: () => void;
  onVideoShopping: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const featureListVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const featureItemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const cardStoryVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 32 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay: 0.15,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export const BridalLoungeSection: React.FC<BridalLoungeSectionProps> = ({
  onBookAppointment,
  onVideoShopping,
}) => {
  return (
    <section id="bridal-lounge" className="py-16 sm:py-24 bg-[#4A1525] text-white relative overflow-hidden">
      {/* Decorative subtle ambient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-r from-stone-950/40 via-transparent to-stone-950/40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text & Experience with Motion Stagger */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-7 space-y-6"
          >
            <motion.div
              variants={fadeUpItem}
              className="flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase tracking-widest"
            >
              <Crown className="w-4 h-4 text-amber-300" />
              <span>Private Muhurtham Suite</span>
              <span aria-hidden="true">·</span>
              <span>Suryapet Flagship (60 Feet Road)</span>
            </motion.div>

            <motion.h2
              variants={fadeUpItem}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-white text-balance"
            >
              The Bridal Pattu & Muhurtham Experience
            </motion.h2>

            <motion.p
              variants={fadeUpItem}
              className="text-stone-200 text-sm sm:text-base leading-relaxed font-light max-w-2xl"
            >
              Selecting your Muhurtham Kanchi pattu or Gadwal silk is a sacred family milestone. At Sri Markandeya Handlooms, our private bridal salon offers an unhurried, celebratory setting where you and your family can drape authentic handlooms under calibrated daylight lamps, accompanied by fresh Osmania biscuits, jasmine gajras, and traditional South Indian filter coffee.
            </motion.p>

            {/* Feature points grid with Staggered Motion */}
            <motion.div
              variants={featureListVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2"
            >
              <motion.div variants={featureItemVariants} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Private Bridal Salon</h4>
                  <p className="text-xs text-stone-300 mt-0.5">
                    Dedicated suite reserved for your family with full-length mirror trials.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={featureItemVariants} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Family Palette Harmonizing</h4>
                  <p className="text-xs text-stone-300 mt-0.5">
                    Coordinated weaves for the bride, mother, mother-in-law, and sisters.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={featureItemVariants} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">In-House Master Tailoring</h4>
                  <p className="text-xs text-stone-300 mt-0.5">
                    Zardozi & aari hand-embroidery blouse designing with trial fittings.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={featureItemVariants} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Warm Traditional Hospitality</h4>
                  <p className="text-xs text-stone-300 mt-0.5">
                    Fresh filter coffee, temple prasad, and patient master drapers.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={fadeUpItem} className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onBookAppointment}
                className="px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-semibold text-xs uppercase tracking-wider rounded-lg transition-all shadow-md flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-stone-950" />
                <span>Reserve Private Bridal Suite</span>
              </button>

              <button
                onClick={onVideoShopping}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider rounded-lg transition-all border border-white/20 flex items-center gap-2"
              >
                <span>NRI / Remote Video Consult</span>
              </button>
            </motion.div>
          </motion.div>

          {/* Right Visual Story Card with Luxury Scale Reveal */}
          <motion.div
            variants={cardStoryVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="bg-stone-900/60 backdrop-blur-md border border-amber-500/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <Coffee className="w-5 h-5 text-amber-300" />
                <span className="text-xs font-medium text-stone-300">
                  Complimentary 90-Minute Private Consultation
                </span>
              </div>

              <blockquote className="font-serif italic text-lg sm:text-xl text-stone-100 leading-relaxed">
                “Finding my Muhurtham saree at Sri Markandeya Handlooms was the highlight of our wedding shopping. Just like the authentic drape videos of Missamma, the master weaver opened 20 pure Gadwal and Kanchi silks, showing the purity of the kuttu border. My cousins in the US even joined via live WhatsApp video!”
              </blockquote>

              <div className="flex items-center justify-between text-xs text-stone-300 pt-2 border-t border-white/10">
                <div>
                  <div className="font-semibold text-white">Sravanthi & Harsha Vardhan</div>
                  <div className="text-amber-300/90">Bride & Family, Suryapet</div>
                </div>
                <div className="text-right text-[11px] text-stone-400">
                  Draped: Peacock Teal Gadwal Pure Pattu
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
