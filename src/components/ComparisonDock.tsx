import React from 'react';
import { ArrowLeftRight, X, Sparkles } from 'lucide-react';
import { Saree } from '../types/saree';

interface ComparisonDockProps {
  comparedSarees: Saree[];
  onOpenModal: () => void;
  onRemoveSaree: (id: string) => void;
  onClearAll: () => void;
}

export const ComparisonDock: React.FC<ComparisonDockProps> = ({
  comparedSarees,
  onOpenModal,
  onRemoveSaree,
  onClearAll,
}) => {
  if (comparedSarees.length === 0) return null;

  return (
    <aside
      aria-label="Saree comparison tray"
      className="fixed bottom-4 sm:bottom-6 inset-x-4 sm:inset-x-auto sm:right-6 sm:max-w-xl z-40 animate-in slide-in-from-bottom-4 duration-300"
    >
      <div className="bg-[#4A1525] text-white rounded-2xl shadow-2xl border border-amber-900/40 p-3 sm:p-4 backdrop-blur-md">
        <div className="flex items-center justify-between gap-3 mb-2.5 pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center">
              <ArrowLeftRight className="w-3.5 h-3.5" />
            </div>
            <span className="font-serif text-sm font-semibold text-amber-100">
              Comparing Sarees
            </span>
            <span className="bg-white/20 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
              {comparedSarees.length} / 4
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClearAll}
              className="text-xs text-stone-300 hover:text-white transition-colors"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={onOpenModal}
              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold rounded-lg text-xs shadow transition-all flex items-center gap-1.5 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-stone-950" />
              <span>Compare Now</span>
            </button>
          </div>
        </div>

        {/* Thumbnail Preview Strip */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          {comparedSarees.map((saree) => (
            <div
              key={saree.id}
              className="relative flex items-center gap-2 bg-white/10 hover:bg-white/15 rounded-lg p-1.5 pr-2.5 transition-colors shrink-0 group border border-white/10"
            >
              <img
                src={saree.image}
                alt={saree.name}
                className="w-10 h-10 object-cover rounded shadow-sm"
              />
              <div className="flex flex-col max-w-[110px] sm:max-w-[130px]">
                <span className="text-[11px] font-medium text-stone-100 truncate">
                  {saree.name}
                </span>
                <span className="text-[10px] text-amber-200 font-bold">
                  ₹{saree.price.toLocaleString('en-IN')}
                </span>
              </div>
              <button
                type="button"
                onClick={() => onRemoveSaree(saree.id)}
                className="text-stone-300 hover:text-white hover:bg-black/40 p-1 rounded-full transition-colors ml-1"
                aria-label={`Remove ${saree.name} from comparison`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {comparedSarees.length < 4 && (
            <div className="text-[11px] text-stone-300 italic px-2 py-1 shrink-0">
              + Select up to {4 - comparedSarees.length} more
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
