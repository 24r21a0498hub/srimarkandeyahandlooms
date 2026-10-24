import React, { useState } from 'react';
import { X, Calendar, Clock, Users, CheckCircle2, MessageSquare, Coffee } from 'lucide-react';
import { STORE_DETAILS } from '../data/sarees';
import { Appointment } from '../types/saree';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('11:30 AM');
  const [occasion, setOccasion] = useState('Bridal Muhurtham Trousseau');
  const [guests, setGuests] = useState(3);
  const [specialRequests, setSpecialRequests] = useState('');
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone) return;

    const appt: Appointment = {
      customerName,
      phone,
      email,
      date,
      timeSlot,
      occasion,
      guests,
      specialRequests,
    };
    setConfirmedAppointment(appt);
  };

  const whatsappApptText = confirmedAppointment
    ? encodeURIComponent(
        `Namaste Sri Markandeya Handlooms! I have booked a showroom visit:
Name: ${confirmedAppointment.customerName}
Phone: ${confirmedAppointment.phone}
Date: ${confirmedAppointment.date} at ${confirmedAppointment.timeSlot}
Occasion: ${confirmedAppointment.occasion}
Party Size: ${confirmedAppointment.guests} Guests
Notes: ${confirmedAppointment.specialRequests || 'None'}

Please reserve the private bridal lounge at Suryapet (Ganesh Nagar, 60 Feet Road).`
      )
    : '';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              {confirmedAppointment ? 'Visit Reserved' : 'Schedule Showroom Consultation'}
            </h3>
            <p className="text-xs text-stone-500">
              {STORE_DETAILS.name} · Ganesh Nagar, 60 Feet Road, Suryapet
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {confirmedAppointment ? (
            <div className="space-y-5 text-center">
              <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-serif text-2xl font-bold text-stone-900">
                  We Look Forward to Welcoming You!
                </h4>
                <p className="text-xs text-stone-500 mt-1">
                  Your private bridal suite and senior master draper are reserved.
                </p>
              </div>

              {/* Voucher Box */}
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-stone-500">Guest:</span>
                  <span className="font-semibold text-stone-800">
                    {confirmedAppointment.customerName} ({confirmedAppointment.guests} Guests)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Date & Slot:</span>
                  <span className="font-semibold text-stone-800">
                    {confirmedAppointment.date} at {confirmedAppointment.timeSlot}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Occasion:</span>
                  <span className="font-semibold text-stone-800">{confirmedAppointment.occasion}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-200 text-stone-600">
                  <span className="flex items-center gap-1">
                    <Coffee className="w-3.5 h-3.5 text-amber-800" />
                    <span>Traditional Filter Coffee & Gajra</span>
                  </span>
                  <span className="text-emerald-700 font-medium">Included</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2.5">
                <a
                  href={`https://wa.me/${STORE_DETAILS.whatsapp.replace(/\D/g, '')}?text=${whatsappApptText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Appointment Slip to WhatsApp</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 text-xs font-semibold text-stone-600 hover:text-stone-900"
                >
                  Done & Return to Sarees
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#831843]/30"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    WhatsApp Phone *
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
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#831843]/30"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Time Slot
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#831843]/30"
                  >
                    <option value="11:00 AM">11:00 AM (Morning Quiet)</option>
                    <option value="12:30 PM">12:30 PM</option>
                    <option value="02:30 PM">02:30 PM (Afternoon Lounge)</option>
                    <option value="04:30 PM">04:30 PM (Daylight Trial)</option>
                    <option value="06:30 PM">06:30 PM (Evening Glow)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Occasion
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#831843]/30"
                  >
                    <option value="Bridal Muhurtham Trousseau">Bridal Muhurtham Trousseau</option>
                    <option value="Reception / Cocktail Saree">Reception / Cocktail Saree</option>
                    <option value="Family Festive & Puja">Family Festive & Puja</option>
                    <option value="Wedding Guest / Relative">Wedding Guest / Relative</option>
                    <option value="Heirloom Saree Collector">Heirloom Saree Collector</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Number of Guests
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={8}
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#831843]/30"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Specific Weave Preferences or Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Looking for deep crimson or emerald Kanjivarams with antique gold zari"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#831843]/30"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#831843] hover:bg-[#701A36] text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Confirm Showroom Appointment</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
