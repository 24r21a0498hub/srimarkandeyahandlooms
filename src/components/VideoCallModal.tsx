import React, { useState } from 'react';
import { X, Video, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';
import { STORE_DETAILS } from '../data/sarees';
import { VideoCallRequest } from '../types/saree';

interface VideoCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledSareeCode?: string;
}

export const VideoCallModal: React.FC<VideoCallModalProps> = ({
  isOpen,
  onClose,
  prefilledSareeCode = '',
}) => {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [preferredTime, setPreferredTime] = useState('03:30 PM');
  const [sareeCode, setSareeCode] = useState(prefilledSareeCode);
  const [notes, setNotes] = useState('');
  const [confirmed, setConfirmed] = useState<VideoCallRequest | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone) return;

    const request: VideoCallRequest = {
      customerName,
      phone,
      preferredDate,
      preferredTime,
      sareeCode,
      notes,
    };
    setConfirmed(request);
  };

  const whatsappText = confirmed
    ? encodeURIComponent(
        `Namaste Sri Markandeya Handlooms! I would like to schedule a WhatsApp Video Shopping Drape:
Name: ${confirmed.customerName}
WhatsApp: ${confirmed.phone}
Preferred Time: ${confirmed.preferredDate} at ${confirmed.preferredTime}
Saree Item Code: ${confirmed.sareeCode || 'Gadwal / Kanchi Pattu Collection'}
Notes: ${confirmed.notes || 'Please show zari luster, pallu contrast and drape'}

Kindly connect on WhatsApp video call from the showroom.`
      )
    : '';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-[#831843]" />
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                {confirmed ? 'Video Drape Confirmed' : 'Live WhatsApp Video Shopping'}
              </h3>
              <p className="text-xs text-stone-500">
                Inspect sarees in natural sunlight with our senior draper
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {confirmed ? (
            <div className="space-y-5 text-center">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <h4 className="font-serif text-2xl font-bold text-stone-900">
                  Video Drape Scheduled!
                </h4>
                <p className="text-xs text-stone-500 mt-1">
                  Our master draper will video call your WhatsApp at the selected time.
                </p>
              </div>

              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-stone-500">Recipient:</span>
                  <span className="font-semibold text-stone-800">{confirmed.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">WhatsApp Phone:</span>
                  <span className="font-semibold text-stone-800">{confirmed.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Date & Slot:</span>
                  <span className="font-semibold text-stone-800">
                    {confirmed.preferredDate} at {confirmed.preferredTime}
                  </span>
                </div>
                {confirmed.sareeCode && (
                  <div className="flex justify-between">
                    <span className="text-stone-500">Saree Focus:</span>
                    <span className="font-semibold text-[#831843]">{confirmed.sareeCode}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2.5">
                <a
                  href={`https://wa.me/${STORE_DETAILS.whatsapp.replace(/\D/g, '')}?text=${whatsappText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Notify Showroom on WhatsApp</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 text-xs font-semibold text-stone-600 hover:text-stone-900"
                >
                  Close & Continue Browsing
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p>
                  Experience the drape, pleats, zari sheen, and pallu contrast live via a private 1-on-1 video call from our Basavanagudi showroom.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Meera Raman"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#831843]/30"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98450 12345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#831843]/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#831843]/30"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#831843]/30"
                  >
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="01:30 PM">01:30 PM</option>
                    <option value="03:30 PM">03:30 PM (Best Sunlight)</option>
                    <option value="05:30 PM">05:30 PM</option>
                    <option value="07:00 PM">07:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Saree Item Code (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. AD-KAN-101 or 'Bridal Crimson Silk'"
                  value={sareeCode}
                  onChange={(e) => setSareeCode(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#831843]/30"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Specific drape or details to view
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Please open the pallu completely and show against natural window light."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#831843]/30"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#831843] hover:bg-[#701A36] text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <Video className="w-4 h-4" />
                <span>Schedule WhatsApp Video Drape</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
