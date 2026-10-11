"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Product, useStore } from "@/store/useStore";

const questions = [
  {
    id: 1,
    title: "What intention calls to you most right now?",
    options: [
      { text: "Love, Softness & Self-Worth", category: "Love" },
      { text: "Abundance, Success & Wealth", category: "Abundance" },
      { text: "Peace, Serenity & Emotional Calm", category: "Calm" },
      { text: "Protection, Energy Shield & Focus", category: "Protection" }
    ]
  },
  {
    id: 2,
    title: "Which gemstone tone harmonizes with your style?",
    options: [
      { text: "Soft Rose Quartz & Blush Pinks" },
      { text: "Calm Turquoise & Soft Sage" },
      { text: "Warm Champagne & Golden Citrine" },
      { text: "Grounding Earth Browns & Tiger Eye" }
    ]
  },
  {
    id: 3,
    title: "How do you intend to practice with your crystal?",
    options: [
      { text: "Daily Luxury Jewelry Wear" },
      { text: "Morning Intention & Meditation" },
      { text: "Desk Anchor for Work Rituals" },
      { text: "A Meaningful Heirloom Gift" }
    ]
  }
];

export default function CrystalQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [error, setError] = useState(false);
  const addToCart = useStore((state) => state.addToCart);

  const handleSelectOption = (option: any) => {
    const newAnswers = { ...answers, [currentQuestion]: option.category || option.text };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 350);
    } else {
      analyzeResults(newAnswers);
    }
  };

  const analyzeResults = async (finalAnswers: Record<number, string>) => {
    setIsAnalyzing(true);
    const targetCategory = finalAnswers[0] || "Love";

    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', targetCategory)
        .limit(2);
        
      if (error) throw error;
      
      let finalRecs = data as Product[];
      
      if (!finalRecs || finalRecs.length === 0) {
        const { data: fallback } = await supabase
          .from('products')
          .select('*')
          .limit(2);
        finalRecs = fallback as Product[];
      }

      setTimeout(() => {
        setRecommendations(finalRecs || []);
        setIsAnalyzing(false);
      }, 1500);
    } catch (err) {
      console.error("Quiz error", err);
      setError(true);
      setIsAnalyzing(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setRecommendations([]);
    setIsAnalyzing(false);
    setError(false);
  };

  const addBothToBag = (e: React.MouseEvent) => {
    if (recommendations[0]) {
      import("@/lib/animations").then(m => m.flyToCart(e, recommendations[0].image));
    }
    recommendations.forEach(product => addToCart(product, 1));
    setTimeout(() => useStore.setState({ isCartOpen: true }), 700);
  };

  return (
    <div className="min-h-screen pt-28 md:pt-36 pb-24 bg-[#FFFCF7] text-[#51473C] flex flex-col items-center">
      <div className="container mx-auto px-6 max-w-3xl">
        
        {!isAnalyzing && recommendations.length === 0 && (
          <>
            <div className="text-center mb-12">
              <div className="w-14 h-14 mx-auto bg-[#F8F1E8] border border-[#E9E1D5] text-[#B99B6B] rounded-full flex items-center justify-center mb-5 shadow-xs">
                <Sparkles size={22} />
              </div>
              <span className="text-[11px] tracking-[0.25em] uppercase text-[#B99B6B] font-semibold block mb-2">
                Personal Intention Guide
              </span>
              <h1 className="font-serif text-3xl md:text-5xl mb-4 text-[#51473C] tracking-wide">
                Crystal Intention Quiz
              </h1>
              <p className="text-[#817569] text-xs sm:text-sm font-light max-w-lg mx-auto leading-relaxed">
                Tune into your present frequency. Answer 3 intuitive questions to reveal the gemstone bracelet attuned to your current chapter.
              </p>
            </div>

            <div className="card-luxury bg-[#FFFFFF] border border-[#E9E1D5] p-6 sm:p-10 shadow-[0_8px_30px_rgba(81,71,60,0.04)] rounded-[4px] max-w-2xl mx-auto">
              <div className="flex justify-between items-center mb-8 text-xs tracking-widest text-[#817569] uppercase font-medium">
                <span>Step {currentQuestion + 1} of {questions.length}</span>
                {currentQuestion > 0 && (
                  <button onClick={() => setCurrentQuestion(currentQuestion - 1)} className="hover:text-[#51473C] flex items-center gap-1 transition-colors">
                    <ArrowLeft size={13} /> Previous
                  </button>
                )}
              </div>
              
              <h2 className="font-serif text-2xl sm:text-3xl mb-8 text-center text-[#51473C] font-normal leading-snug">
                {questions[currentQuestion].title}
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {questions[currentQuestion].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt)}
                    className="border border-[#E9E1D5] bg-[#FFFFFF] p-5 text-xs font-semibold tracking-wider uppercase hover:bg-[#F4E9D9] hover:border-[#B99B6B] text-[#51473C] transition-all duration-300 text-center rounded-[3px]"
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {isAnalyzing && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-12 h-12 border-2 border-[#51473C] border-t-transparent rounded-full animate-spin mb-6"></div>
            <h2 className="font-serif text-2xl md:text-3xl text-[#51473C] mb-3">Attuning with your intention...</h2>
            <p className="text-[#817569] text-xs font-light tracking-wider">Matching gemstone vibrations to your selected preferences.</p>
          </div>
        )}

        {recommendations.length > 0 && !isAnalyzing && (
          <div className="text-center animate-in fade-in duration-700">
            <span className="text-[11px] tracking-[0.25em] uppercase text-[#B99B6B] font-semibold block mb-2">
              ✦ Your Intention Match ✦
            </span>
            <h1 className="font-serif text-3xl md:text-5xl mb-10 text-[#51473C] tracking-wide">
              Curated Specifically For You
            </h1>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {recommendations.map((rec) => (
                <div key={rec.id} className="card-luxury p-4 bg-[#FFFFFF] flex flex-col text-left">
                  <Link href={`/product?id=${rec.id}`} className="block relative aspect-square bg-[#F8F1E8] rounded-[2px] overflow-hidden mb-4 border border-[#E9E1D5]/60 group">
                    <Image 
                      src={rec.image || "/images/products/rose-quartz-new.jpg"} 
                      alt={rec.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </Link>
                  <div className="flex flex-col flex-grow">
                    <h3 className="font-semibold text-xs tracking-widest uppercase text-[#51473C] mb-1">{rec.name}</h3>
                    <p className="text-sm font-semibold text-[#51473C] mb-3">₹{(rec.salePrice || rec.price).toLocaleString('en-IN')}</p>
                    <p className="text-[11px] font-light text-[#817569] line-clamp-2 mb-5 flex-grow">
                      {rec.description}
                    </p>
                    <button 
                      onClick={(e) => {
                        import("@/lib/animations").then(m => m.flyToCart(e, rec.image));
                        addToCart(rec, 1);
                      }}
                      className="btn-primary w-full py-2.5 text-[11px]"
                    >
                      Add To Bag
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#F8F1E8] p-6 sm:p-8 border border-[#E9E1D5] rounded-[4px] mb-8 max-w-lg mx-auto">
              <h3 className="font-serif text-xl mb-2 text-[#51473C]">The Complementary Duo</h3>
              <p className="text-xs text-[#817569] font-light mb-6">Wear these two stones layered together to amplify and ground your intentions.</p>
              <button 
                onClick={addBothToBag}
                className="btn-primary w-full py-3 text-xs"
              >
                Add Both Pieces To Bag
              </button>
            </div>

            <button 
              onClick={resetQuiz}
              className="text-xs tracking-widest uppercase text-[#817569] hover:text-[#51473C] transition-colors border-b border-[#817569]/30 pb-0.5"
            >
              Retake Intention Quiz
            </button>
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <p className="text-[#51473C] mb-4">Please try again in a moment.</p>
            <button onClick={resetQuiz} className="btn-primary">Restart Quiz</button>
          </div>
        )}

      </div>
    </div>
  );
}
