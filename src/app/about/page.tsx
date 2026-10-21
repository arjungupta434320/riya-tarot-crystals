import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Sparkles, ShieldCheck, Heart, Award, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen py-10 sm:py-16 bg-[#FBF8F3] text-[#2B1B3D]">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#635572] hover:text-[#7B4FC9] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Return to Sanctuary</span>
          </Link>

          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8E6D24] bg-[#F7EFE2] px-3 py-1 rounded-full border border-[#C9A24D]/35">
            Founder Story & Lineage
          </span>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="w-16 h-16 rounded-full bg-[#F5F0FD] border border-[#7B4FC9]/30 text-[#7B4FC9] flex items-center justify-center mx-auto mb-4 shadow-xs">
            <Sparkles size={28} />
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B1B3D] tracking-tight mb-3">
            The Story of Riya Tarot Crystals
          </h1>
          <p className="text-xs sm:text-sm text-[#635572] leading-relaxed">
            Bridging ancient Vedic mineral alchemy, intuitive tarot wisdom, and modern bespoke jewelry.
          </p>
        </div>

        {/* Story Section 1: The Spiritual Calling */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#EFE9E2] shadow-xs space-y-6 mb-10 text-xs sm:text-sm text-[#635572] leading-relaxed">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2B1B3D]">
            From Tarot Consultations to Crystal Consecration
          </h2>

          <p>
            Riya Tarot Crystals was born not in a corporate boardroom, but inside a quiet sanctuary in New Delhi. Over eight years of conducting intuitive tarot consultations and Vedic astrological chart readings, founder Riya noticed a recurring pattern among seekers: clients understood their energetic imbalances, but lacked a physical, daily anchor to hold their newly awakened frequencies.
          </p>

          <p>
            "People would experience profound clarity during a 60-minute tarot reading," explains Riya. "Yet, stepping back into the frenetic demands of modern corporate and family life, their energy field would quickly absorb ambient stress, doubts, and digital static. They needed a living, breathing talisman from Mother Earth that could ground them 24 hours a day."
          </p>

          <blockquote className="p-4 rounded-2xl bg-[#F5F0FD] border-l-4 border-[#7B4FC9] text-xs sm:text-sm text-[#2B1B3D] italic my-4">
            "A natural crystal is not a fashion trinket; it is an organic resonator that has absorbed millions of years of geothermal pressure and cosmic light. When energized with sacred mantras, it becomes your personal bodyguard and prayer partner."
          </blockquote>
        </div>

        {/* 3 Pillars of Sourcing */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-3xl bg-white border border-[#EFE9E2] shadow-2xs space-y-2.5">
            <Award size={22} className="text-[#C9A24D]" />
            <h4 className="font-serif text-base font-bold text-[#2B1B3D]">100% Ethical Mines</h4>
            <p className="text-xs text-[#635572] leading-relaxed">
              We work directly with certified artisanal family mines in Madagascar, Brazil, and Rajasthan, ensuring fair wages and environmental stewardship.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#EFE9E2] shadow-2xs space-y-2.5">
            <ShieldCheck size={22} className="text-[#7B4FC9]" />
            <h4 className="font-serif text-base font-bold text-[#2B1B3D]">Zero Synthetics</h4>
            <p className="text-xs text-[#635572] leading-relaxed">
              We strictly reject dyed glass, reconstructed plastic, or irradiated synthetics. Only genuine Grade-A natural earth minerals enter our studio.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#EFE9E2] shadow-2xs space-y-2.5">
            <Sparkles size={22} className="text-[#C9A24D]" />
            <h4 className="font-serif text-base font-bold text-[#2B1B3D]">108 Mantra Japa</h4>
            <p className="text-xs text-[#635572] leading-relaxed">
              Every bracelet is cleansed in Himalayan rock salt and consecrated by certified priests with 108 Vedic Beej Mantras prior to dispatch.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center p-8 rounded-3xl bg-white border border-[#EFE9E2] shadow-xs space-y-4">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2B1B3D]">
            Discover Your Personalized Crystal Talisman
          </h3>
          <p className="text-xs text-[#635572] max-w-md mx-auto">
            Take our 60-second spiritual quiz to determine which gemstone frequency aligns with your current life chapter.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white btn-amethyst shadow-md"
          >
            <span>Take the Crystal Quiz</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </div>
  );
}
