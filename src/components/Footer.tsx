"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Compass, 
  Award, 
  Mail, 
  Phone, 
  Clock, 
  ArrowRight, 
  Heart,
  CheckCircle2
} from "lucide-react";
import { useStore } from "@/store/useStore";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { openPolicyModal, openQuizModal, showToast } = useStore();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      showToast("✨ Welcome to Riya Tarot Crystals Circle! 10% welcome coupon applied.");
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#F5F0E6] text-[#2C2A29] border-t border-[#EAE5DF] pt-14 pb-12 px-4 sm:px-6 relative overflow-hidden">
      
      {/* Background Soft Glow */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#F8F4EC]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* =========================================================================
            1. TRUST BANNER ROW (4 Luxury Icon Badges)
        ========================================================================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 p-5 sm:p-7 rounded-3xl bg-[#FFFFFF] border border-[#EAE5DF] mb-14 shadow-xs">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F8F4EC] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] flex-shrink-0 shadow-xs">
              <Award size={20} />
            </div>
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#2C2A29]">
                100% Natural Gems
              </h5>
              <p className="text-[11px] text-[#6E6A64]">
                Untreated, Grade-A authentic earth minerals
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F8F4EC] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] flex-shrink-0 shadow-xs">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#2C2A29]">
                Lab Certificate
              </h5>
              <p className="text-[11px] text-[#6E6A64]">
                Every gem certified with authenticity report
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F8F4EC] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] flex-shrink-0 shadow-xs">
              <Compass size={20} />
            </div>
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#2C2A29]">
                Bespoke Curation
              </h5>
              <p className="text-[11px] text-[#6E6A64]">
                Kundali & Chakra vibrational alignment
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F8F4EC] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] flex-shrink-0 shadow-xs">
              <Truck size={20} />
            </div>
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#2C2A29]">
                Insured Delivery
              </h5>
              <p className="text-[11px] text-[#6E6A64]">
                Pan-India air dispatch with live tracking
              </p>
            </div>
          </div>

        </div>

        {/* =========================================================================
            2. MAIN FOOTER GRID: BRAND STORY, LINKS, CONTACT, POLICIES
        ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 mb-14">
          
          {/* Brand Narrative (2 columns) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#FFFFFF] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shadow-xs">
                <Sparkles size={18} />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold tracking-wider text-[#2C2A29] uppercase">
                  RIYA TAROT CRYSTALS
                </h4>
                <span className="text-[9px] tracking-widest uppercase text-[#9A7B2C] font-semibold block">
                  CERTIFIED & ENERGIZED GEMS
                </span>
              </div>
            </div>

            <p className="text-xs text-[#6E6A64] leading-relaxed max-w-sm">
              We craft authentic, hand-selected crystal jewelry, natural loose gemstones, and bespoke Kundali & Chakra curations. Every piece is ritually cleansed, consecrated under Full Moon illumination, and energized with 108 Vedic Beej Mantras prior to insured pan-India dispatch.
            </p>

            <div className="p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#EAE5DF] text-xs text-[#6E6A64]">
              <span className="font-semibold text-[#2C2A29] block mb-0.5">Authenticity Commitment:</span>
              Zero synthetic resin, zero dyed glass. 100% genuine earth minerals with pure vibrational frequencies.
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h5 className="text-xs font-bold tracking-widest uppercase mb-4 text-[#2C2A29]">
              Collections
            </h5>
            <ul className="space-y-2.5 text-xs text-[#6E6A64]">
              <li>
                <Link href="/#marketplace" className="hover:text-[#9A7B2C] transition-colors">
                  Heal Energized Bracelets
                </Link>
              </li>
              <li>
                <Link href="/#marketplace" className="hover:text-[#9A7B2C] transition-colors">
                  Mixel Synergy Bracelets
                </Link>
              </li>
              <li>
                <Link href="/#marketplace" className="hover:text-[#9A7B2C] transition-colors">
                  Kundali & Chakra Sets
                </Link>
              </li>
              <li>
                <Link href="/#marketplace" className="hover:text-[#9A7B2C] transition-colors">
                  Sacred Point Pendants
                </Link>
              </li>
              <li>
                <Link href="/#marketplace" className="hover:text-[#9A7B2C] transition-colors">
                  Lab-Certified Gemstones
                </Link>
              </li>
              <li>
                <Link href="/#marketplace" className="hover:text-[#9A7B2C] transition-colors">
                  Vastu Geode Clusters
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h5 className="text-xs font-bold tracking-widest uppercase mb-4 text-[#2C2A29]">
              Studio & Concierge
            </h5>
            <ul className="space-y-3 text-xs text-[#6E6A64]">
              <li className="flex items-start gap-2">
                <Mail size={14} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <span>support@riyatarotcrystals.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={14} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <span>WhatsApp: +91 99999 99999</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={14} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <span>Studio Hours: Mon – Sat (10 AM – 7 PM IST)</span>
              </li>
              <li className="pt-1">
                <button
                  type="button"
                  onClick={openQuizModal}
                  className="px-3.5 py-1.5 rounded-full text-[11px] font-semibold text-[#2C2A29] btn-pearl-gold flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles size={12} className="text-[#D4AF37]" />
                  <span>Take Bracelet Quiz</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Interactive Policy Modals Links */}
          <div>
            <h5 className="text-xs font-bold tracking-widest uppercase mb-4 text-[#2C2A29]">
              Customer Policies
            </h5>
            <ul className="space-y-2.5 text-xs text-[#6E6A64]">
              <li>
                <button
                  type="button"
                  onClick={() => openPolicyModal("privacy")}
                  className="hover:text-[#9A7B2C] transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openPolicyModal("shipping")}
                  className="hover:text-[#9A7B2C] transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span>Shipping & Delivery Policy</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openPolicyModal("refunds")}
                  className="hover:text-[#9A7B2C] transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span>Return & Refund Policy</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openPolicyModal("terms")}
                  className="hover:text-[#9A7B2C] transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span>Terms & Conditions</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* =========================================================================
            3. LUXURY NEWSLETTER SIGNUP STRIP
        ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#EAE5DF] mb-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="max-w-md text-center md:text-left">
            <h4 className="font-serif text-base sm:text-lg font-semibold text-[#2C2A29] mb-1">
              Join the Riya Tarot Crystals VIP Circle
            </h4>
            <p className="text-xs text-[#6E6A64]">
              Receive lunar transit notifications, auspicious consecration dates, and an instant 10% welcome blessing.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto items-center gap-2 max-w-sm">
            {isSubscribed ? (
              <div className="w-full text-xs font-medium text-emerald-800 px-4 py-2.5 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center gap-1.5">
                <CheckCircle2 size={15} />
                <span>Thank you! Check your inbox for your 10% coupon.</span>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow px-3.5 py-2.5 text-xs rounded-full border border-[#EAE5DF] bg-[#FAF9F6] text-[#2C2A29] focus:outline-none focus:border-[#D4AF37]"
                  required
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#2C2A29] btn-gold-shimmer flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
                >
                  <span>Subscribe</span>
                  <ArrowRight size={13} />
                </button>
              </>
            )}
          </form>
        </div>

        {/* Bottom Strip: Copyright */}
        <div className="pt-6 border-t border-[#EAE5DF] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6E6A64]">
          <p>© {new Date().getFullYear()} Riya Tarot Crystals. All rights reserved. 100% Certified Earth Minerals.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Secured by 256-Bit SSL</span>
            <span>•</span>
            <span>Pan-India Air Dispatch</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
