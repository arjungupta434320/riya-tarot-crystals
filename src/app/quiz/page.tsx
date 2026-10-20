"use client";

import React from "react";
import Link from "next/link";
import BraceletQuiz from "@/components/BraceletQuiz";
import { ArrowLeft, Sparkles, ShieldCheck } from "lucide-react";

export default function QuizPage() {
  return (
    <div className="min-h-screen py-10 sm:py-16 bg-[#FAF9F6] text-[#2C2A29]">
      <div className="container mx-auto px-4 sm:px-6 max-w-2xl">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#6E6A64] hover:text-[#2C2A29] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </Link>

          <span className="text-xs font-semibold text-[#9A7B2C] flex items-center gap-1.5">
            <Sparkles size={13} className="text-[#D4AF37]" />
            <span>Vedic Intention Engine</span>
          </span>
        </div>

        {/* Dedicated 4-Step Quiz Component */}
        <BraceletQuiz />

        {/* Bottom Trust Row */}
        <div className="mt-8 text-center text-xs text-[#6E6A64] flex items-center justify-center gap-4">
          <span className="flex items-center gap-1">
            <ShieldCheck size={14} className="text-[#D4AF37]" />
            <span>100% Lab-Certified Natural Stones</span>
          </span>
          <span>•</span>
          <span>Personalized Astrological Consecration</span>
        </div>

      </div>
    </div>
  );
}
