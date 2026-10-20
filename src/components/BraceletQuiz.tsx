"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  CheckCircle2, 
  ShieldCheck, 
  ShoppingBag, 
  Eye, 
  Flame, 
  Leaf, 
  Wind, 
  Droplet,
  Compass,
  X
} from "lucide-react";
import { Product, useStore } from "@/store/useStore";
import { fallbackProducts } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";

interface BraceletQuizProps {
  isModal?: boolean;
  onClose?: () => void;
}

export default function BraceletQuiz({ isModal = false, onClose }: BraceletQuizProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1); // 1-4 questions, 5 results
  const [intention, setIntention] = useState("");
  const [rashiFocus, setRashiFocus] = useState("");
  const [chakraFocus, setChakraFocus] = useState("");
  const [beadStyle, setBeadStyle] = useState("");

  const [primaryMatch, setPrimaryMatch] = useState<Product | null>(null);
  const [secondaryMatch, setSecondaryMatch] = useState<Product | null>(null);
  const [explanation, setExplanation] = useState("");

  const { addToCart, openQuickView, showToast } = useStore();

  const handleStep1 = (value: string) => {
    setIntention(value);
    setStep(2);
  };

  const handleStep2 = (value: string) => {
    setRashiFocus(value);
    setStep(3);
  };

  const handleStep3 = (value: string) => {
    setChakraFocus(value);
    setStep(4);
  };

  const handleStep4 = (value: string) => {
    setBeadStyle(value);

    // Dynamic Matching Algorithm across catalog
    let prime: Product | undefined;
    let sec: Product | undefined;
    let rationale = "";

    if (intention.includes("Wealth") || intention.includes("Career")) {
      prime = fallbackProducts.find((p) => p.id === "mixel-triple-abundance") || fallbackProducts[0];
      sec = fallbackProducts.find((p) => p.id === "kundali-surya-dhan-yog-pyrite") || fallbackProducts[3];
      rationale = `Your focus on Wealth & Business Growth coupled with ${rashiFocus} alignment strongly resonates with Golden Pyrite, Citrine, and Jupiter's frequency. It charges your Solar Plexus and Heart chakras with sovereign commercial confidence and unexpected cash-flow luck.`;
    } else if (intention.includes("Love") || intention.includes("Heart")) {
      prime = fallbackProducts.find((p) => p.id === "chakra-heart-rose-quartz") || fallbackProducts[4];
      sec = fallbackProducts.find((p) => p.id === "mixel-love-protection-synergy") || fallbackProducts[1];
      rationale = `Your desire for Emotional Harmony and Soulmate alignment activates Venus (Shukra) and Anahata energy. Madagascar Rose Quartz gently dissolves past relational heartbreak, radiating unconditional self-worth and tender magnetism.`;
    } else if (intention.includes("Protection") || intention.includes("Nazar")) {
      prime = fallbackProducts.find((p) => p.id === "mixel-love-protection-synergy") || fallbackProducts[1];
      sec = fallbackProducts.find((p) => p.id === "pendant-black-tourmaline-shield") || fallbackProducts[11];
      rationale = `Your energetic defense requires deep earthen grounding. Black Tourmaline deflects envious glances ('Buri Nazar') and workplace gossip while shielding your Root chakra against energetic exhaustion.`;
    } else if (intention.includes("Peace") || intention.includes("Stress")) {
      prime = fallbackProducts.find((p) => p.id === "kundali-shani-blue-sapphire-amethyst") || fallbackProducts[6];
      sec = fallbackProducts.find((p) => p.id === "mixel-crown-clarity-focus") || fallbackProducts[2];
      rationale = `Your nervous system calls for deep Third Eye stillness. Deep Uruguayan Amethyst purifies racing thoughts, harmonizes Saturnian karmic pressure into peaceful endurance, and fosters lucid, restful sleep.`;
    } else {
      prime = fallbackProducts.find((p) => p.id === "chakra-7-harmony-bracelet") || fallbackProducts[3];
      sec = fallbackProducts.find((p) => p.id === "kundali-budh-mercury-emerald-mix") || fallbackProducts[8];
      rationale = `Your holistic energetic profile benefits most from complete meridian balance. The Complete 7-Chakra Master Alignment Bracelet flushes stagnant energetic channels, restoring sovereign focus and physical stamina.`;
    }

    setPrimaryMatch(prime || fallbackProducts[0]);
    setSecondaryMatch(sec || fallbackProducts[1]);
    setExplanation(rationale);
    setStep(5);
  };

  const resetQuiz = () => {
    setStep(1);
    setIntention("");
    setRashiFocus("");
    setChakraFocus("");
    setBeadStyle("");
    setPrimaryMatch(null);
    setSecondaryMatch(null);
  };

  const handleAddMatchToCart = (prod: Product) => {
    // 15% discount for quiz completion
    const discountedPrice = Math.round((prod.salePrice || prod.price) * 0.85);
    addToCart({ ...prod, salePrice: discountedPrice }, 1, "8mm");
    showToast(`✨ ${prod.name} added to cart with 15% Quiz Discount!`);
    if (onClose) onClose();
  };

  const progressPercent = step === 1 ? 25 : step === 2 ? 50 : step === 3 ? 75 : step === 4 ? 90 : 100;

  return (
    <div className={`w-full bg-[#FFFFFF] rounded-3xl border border-[#EAE5DF] shadow-[0_15px_40px_-10px_rgba(212,175,55,0.18)] ${isModal ? "p-5 sm:p-8 max-h-[88vh] overflow-y-auto" : "p-5 sm:p-8"}`}>
      
      {/* Header & Progress Bar */}
      <div className="mb-5 pb-4 border-b border-[#EAE5DF]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#F8F4EC] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
              <Sparkles size={16} />
            </div>
            <div>
              <h3 className="font-serif text-sm sm:text-base font-semibold text-[#2C2A29]">
                Discover Your Ideal Energized Bracelet
              </h3>
              <p className="text-[10px] sm:text-[11px] text-[#6E6A64]">
                Vedic Intention & Kundali Resonance Matcher
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {step <= 4 ? (
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#9A7B2C] bg-[#F8F4EC] border border-[#D4AF37]/30 px-3 py-1 rounded-full">
                Step {step} of 4
              </span>
            ) : (
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                Match Ready ✨
              </span>
            )}

            {isModal && onClose && (
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-full bg-[#FAF9F6] border border-[#EAE5DF] flex items-center justify-center text-[#6E6A64] hover:text-[#2C2A29]"
                aria-label="Close quiz"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar in Champagne Gold */}
        <div className="w-full h-1.5 bg-[#FAF9F6] rounded-full overflow-hidden border border-[#EAE5DF]">
          <div
            className="h-full bg-gradient-to-r from-[#D4AF37] to-[#C59B27] transition-all duration-400 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* STEP 1: Primary Intention */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <h4 className="text-sm sm:text-base font-serif text-[#2C2A29] font-semibold">
              Step 1: What is your primary energetic intention right now?
            </h4>
            <p className="text-xs text-[#6E6A64] mt-0.5">
              Select what you most wish to activate in your daily field:
            </p>
          </div>

          <div className="space-y-2 pt-1">
            {[
              { title: "Wealth & Business Growth", desc: "Attract sales, lucrative promotions & sovereign financial flow", icon: "💰" },
              { title: "Love & Emotional Harmony", desc: "Soulmate attraction, gentle heart healing & unconditional self-love", icon: "💖" },
              { title: "Career Focus & Confidence", desc: "Executive willpower, fearlessness & winning public authority", icon: "🎯" },
              { title: "Protection & Evil-Eye Shield", desc: "Repel malicious glances ('Buri Nazar') & psychic toxicity", icon: "🛡️" },
              { title: "Inner Peace & Stress Relief", desc: "Still racing overthinking, soothe anxiety & invite restorative sleep", icon: "🌿" },
            ].map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleStep1(item.title)}
                className="w-full p-3 sm:p-3.5 rounded-2xl border border-[#EAE5DF] bg-[#FAF9F6] text-left hover:border-[#D4AF37] hover:bg-[#FFFFFF] transition-all flex items-center justify-between group cursor-pointer shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <h5 className="text-xs font-semibold text-[#2C2A29] group-hover:text-[#9A7B2C] transition-colors">
                      {item.title}
                    </h5>
                    <p className="text-[11px] text-[#6E6A64]">{item.desc}</p>
                  </div>
                </div>
                <ArrowRight size={14} className="text-[#6E6A64] group-hover:text-[#9A7B2C] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: Birth Rashi / Kundali Focus */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <h4 className="text-sm sm:text-base font-serif text-[#2C2A29] font-semibold">
              Step 2: Select your Birth Rashi / Kundali Focus:
            </h4>
            <p className="text-xs text-[#6E6A64] mt-0.5">
              Matched to planetary rulers and astrological polarities:
            </p>
          </div>

          <div className="space-y-2 pt-1">
            {[
              { title: "Fire Signs (Aries, Leo, Sagittarius)", desc: "Dynamic, passionate, high-drive, ambitious manifestor", icon: <Flame size={16} className="text-amber-500" /> },
              { title: "Earth Signs (Taurus, Virgo, Capricorn)", desc: "Grounded, builder, practical manifestor, wealth stabilizer", icon: <Leaf size={16} className="text-emerald-600" /> },
              { title: "Air Signs (Gemini, Libra, Aquarius)", desc: "Intellectual, communicative visionaries, rapid thinkers", icon: <Wind size={16} className="text-sky-500" /> },
              { title: "Water Signs (Cancer, Scorpio, Pisces)", desc: "Intuitive, empathic, deep emotional depth & clairvoyance", icon: <Droplet size={16} className="text-indigo-500" /> },
              { title: "Balance Saturn / Rahu-Ketu Dosha", desc: "Remedial balance for Sade Sati, karmic obstacles & delays", icon: <Compass size={16} className="text-[#D4AF37]" /> },
            ].map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleStep2(item.title)}
                className="w-full p-3 sm:p-3.5 rounded-2xl border border-[#EAE5DF] bg-[#FAF9F6] text-left hover:border-[#D4AF37] hover:bg-[#FFFFFF] transition-all flex items-center justify-between group cursor-pointer shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white border border-[#EAE5DF] flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-[#2C2A29] group-hover:text-[#9A7B2C] transition-colors">
                      {item.title}
                    </h5>
                    <p className="text-[11px] text-[#6E6A64]">{item.desc}</p>
                  </div>
                </div>
                <ArrowRight size={14} className="text-[#6E6A64] group-hover:text-[#9A7B2C] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setStep(1)}
            className="text-xs text-[#6E6A64] hover:text-[#2C2A29] flex items-center gap-1 pt-1 cursor-pointer"
          >
            <ArrowLeft size={13} />
            <span>Back to Step 1</span>
          </button>
        </div>
      )}

      {/* STEP 3: Chakra Alignment Focus */}
      {step === 3 && (
        <div className="space-y-4">
          <div>
            <h4 className="text-sm sm:text-base font-serif text-[#2C2A29] font-semibold">
              Step 3: What is your primary Chakra alignment priority?
            </h4>
            <p className="text-xs text-[#6E6A64] mt-0.5">
              Select the energy vortex you wish to balance:
            </p>
          </div>

          <div className="space-y-2 pt-1">
            {[
              { title: "Crown & Third Eye (Intuition & Clairvoyance)", desc: "Still mental fog, heighten spiritual intuition and clarity", badge: "Ajna / Sahasrara" },
              { title: "Heart Chakra (Relationships & Compassion)", desc: "Open the Anahata center to attract healthy, radiant love", badge: "Anahata" },
              { title: "Solar Plexus (Power, Ambition & Will)", desc: "Anchor the Manipura fire for decisive executive actions", badge: "Manipura" },
              { title: "Root & Sacral (Grounding & Creative Vitality)", desc: "Deep earth security, physical passion & anti-procrastination", badge: "Muladhara" },
              { title: "Full 7-Chakra Balance (Complete Meridian Flow)", desc: "Harmonize all 7 subtle energy vortexes simultaneously", badge: "Kundalini Master" },
            ].map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleStep3(item.title)}
                className="w-full p-3 sm:p-3.5 rounded-2xl border border-[#EAE5DF] bg-[#FAF9F6] text-left hover:border-[#D4AF37] hover:bg-[#FFFFFF] transition-all flex items-center justify-between group cursor-pointer shadow-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="text-xs font-semibold text-[#2C2A29] group-hover:text-[#9A7B2C] transition-colors">
                      {item.title}
                    </h5>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#F8F4EC] text-[#9A7B2C] font-bold border border-[#D4AF37]/30">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6E6A64] mt-0.5">{item.desc}</p>
                </div>
                <ArrowRight size={14} className="text-[#6E6A64] group-hover:text-[#9A7B2C] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setStep(2)}
            className="text-xs text-[#6E6A64] hover:text-[#2C2A29] flex items-center gap-1 pt-1 cursor-pointer"
          >
            <ArrowLeft size={13} />
            <span>Back to Step 2</span>
          </button>
        </div>
      )}

      {/* STEP 4: Aesthetic & Bead Style */}
      {step === 4 && (
        <div className="space-y-4">
          <div>
            <h4 className="text-sm sm:text-base font-serif text-[#2C2A29] font-semibold">
              Step 4: Preferred Bead Style & Aesthetic:
            </h4>
            <p className="text-xs text-[#6E6A64] mt-0.5">
              How do you plan to wear your energized crystal daily?
            </p>
          </div>

          <div className="space-y-2.5 pt-1">
            {[
              { title: "Mixel Multi-Crystal Synergy", desc: "Dual or triple complementary stones engineered for multiplied manifestation", badge: "Maximum Synergy" },
              { title: "Minimalist Single-Stone with Gold Spacers", desc: "Pure uninterrupted planetary frequency with refined champagne gold trim", badge: "Classic Luxury" },
              { title: "Bold Statement Kundali Beads", desc: "Dense Grade-A beads mathematically aligned with your ruling planetary transit", badge: "Planetary Armor" },
            ].map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleStep4(item.title)}
                className="w-full p-3 sm:p-3.5 rounded-2xl border border-[#EAE5DF] bg-[#FAF9F6] text-left hover:border-[#D4AF37] hover:bg-[#FFFFFF] transition-all flex items-center justify-between group cursor-pointer shadow-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="text-xs font-semibold text-[#2C2A29] group-hover:text-[#9A7B2C] transition-colors">
                      {item.title}
                    </h5>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#F8F4EC] text-[#9A7B2C] font-bold border border-[#D4AF37]/30">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6E6A64] mt-0.5">{item.desc}</p>
                </div>
                <ArrowRight size={14} className="text-[#6E6A64] group-hover:text-[#9A7B2C] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setStep(3)}
            className="text-xs text-[#6E6A64] hover:text-[#2C2A29] flex items-center gap-1 pt-1 cursor-pointer"
          >
            <ArrowLeft size={13} />
            <span>Back to Step 3</span>
          </button>
        </div>
      )}

      {/* STEP 5: DYNAMIC RECOMMENDATION RESULT SCREEN */}
      {step === 5 && primaryMatch && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Confirmed Match Banner */}
          <div className="p-3 sm:p-3.5 rounded-2xl bg-[#F8F4EC] border border-[#D4AF37]/40 flex items-center gap-2.5">
            <CheckCircle2 size={18} className="text-[#D4AF37] flex-shrink-0" />
            <span className="text-xs font-medium text-[#2C2A29] leading-snug">
              <strong>Vedic Match Confirmed:</strong> Resonates with your {intention} intention and {rashiFocus} profile.
            </span>
          </div>

          {/* Primary Recommended Product Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] border-2 border-[#D4AF37] shadow-sm flex flex-col sm:flex-row gap-4 items-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden relative flex-shrink-0 bg-[#FAF9F6] border border-[#EAE5DF]">
              <Image
                src={primaryMatch.image}
                alt={primaryMatch.name}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="flex-grow min-w-0 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#9A7B2C] bg-[#F8F4EC] px-2 py-0.5 rounded-full border border-[#D4AF37]/30">
                  Ideal Match
                </span>
                <span className="text-[10px] text-[#6E6A64] font-medium">
                  {primaryMatch.subCategory || primaryMatch.category}
                </span>
              </div>

              <h4 className="text-xs sm:text-sm font-semibold text-[#2C2A29] leading-snug">
                {primaryMatch.name}
              </h4>

              <div className="flex items-baseline justify-center sm:justify-start gap-2 mt-1.5">
                <span className="text-sm sm:text-base font-bold text-[#2C2A29]">
                  ₹{Math.round((primaryMatch.salePrice || primaryMatch.price) * 0.85).toLocaleString("en-IN")}
                </span>
                <span className="text-xs text-[#6E6A64] line-through">
                  ₹{primaryMatch.price.toLocaleString("en-IN")}
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-md">
                  Quiz Special: 15% OFF
                </span>
              </div>
            </div>
          </div>

          {/* Rationale Explanation */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF9F6] border border-[#EAE5DF] text-xs text-[#6E6A64] leading-relaxed">
            <span className="font-semibold text-[#2C2A29] block mb-1">Why This Matches Your Energy:</span>
            {explanation}
          </div>

          {/* Secondary Complementary Match */}
          {secondaryMatch && (
            <div className="p-3 sm:p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#EAE5DF] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 rounded-xl overflow-hidden relative flex-shrink-0 bg-[#FAF9F6] border border-[#EAE5DF]">
                  <Image src={secondaryMatch.image} alt={secondaryMatch.name} fill className="object-cover" />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] font-semibold text-[#9A7B2C] uppercase tracking-wider block">
                    Complementary Pairing
                  </span>
                  <h5 className="text-xs font-semibold text-[#2C2A29] truncate">{secondaryMatch.name}</h5>
                  <span className="text-[11px] font-bold text-[#2C2A29]">
                    ₹{(secondaryMatch.salePrice || secondaryMatch.price).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  addToCart(secondaryMatch, 1);
                  showToast(`✨ ${secondaryMatch.name} added to cart!`);
                }}
                className="px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider text-[#2C2A29] btn-pearl-gold flex-shrink-0 cursor-pointer"
              >
                Add Duo
              </button>
            </div>
          )}

          {/* Action Shimmer Button: Add Recommended Bracelet to Cart (Save 15%) */}
          <div className="space-y-2 pt-2">
            <button
              type="button"
              onClick={() => handleAddMatchToCart(primaryMatch)}
              className="w-full py-3.5 px-4 rounded-full text-xs font-semibold tracking-wider uppercase text-[#2C2A29] btn-gold-shimmer flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Sparkles size={15} className="text-[#2C2A29]" />
              <span>Add Recommended Bracelet to Cart (Save 15%)</span>
            </button>

            <div className="flex items-center justify-between text-xs pt-1 px-1">
              <button
                type="button"
                onClick={() => openQuickView(primaryMatch)}
                className="text-[#9A7B2C] font-semibold hover:underline flex items-center gap-1 text-[11px] cursor-pointer"
              >
                <Eye size={12} />
                <span>View Full Specifications</span>
              </button>

              <button
                type="button"
                onClick={resetQuiz}
                className="text-[#6E6A64] hover:text-[#2C2A29] flex items-center gap-1 text-[11px] cursor-pointer"
              >
                <RotateCcw size={12} />
                <span>Retake Quiz</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}

    </div>
  );
}
