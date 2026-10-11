import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-28 md:pt-36 pb-24 bg-[#FFFCF7] text-[#51473C]">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <Link href="/" className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[#817569] hover:text-[#51473C] transition-colors mb-12">
          <ArrowLeft size={14} /> Return to Boutique
        </Link>
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E9E1D5] mb-6">
          <Sparkles size={13} className="text-[#B99B6B]" />
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#817569] font-medium">Our Story & Heritage</span>
        </div>

        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8 tracking-wide text-[#51473C]">
          Mindful Luxury, Grounded in Earth Energy
        </h1>
        
        <div className="mx-auto max-w-2xl text-[#817569] font-light leading-relaxed text-left md:text-center space-y-8 text-sm md:text-base">
          <p className="text-base md:text-lg text-[#51473C] font-normal leading-relaxed">
            At Riya Tarot Crystals, we celebrate the delicate balance between high-end modern jewelry design and ancient metaphysical traditions.
          </p>

          <p>
            Every crystal is a natural marvel formed over millions of years under deep geological pressure. 
            We meticulously hand-select untreated, authentic stones—from Grade-AAA Rose Quartz and Golden Citrine to genuine Turquoise—ensuring each piece carries exceptional aesthetic purity and resonant vibrational frequency.
          </p>

          <p>
            Before any bracelet is packaged in our signature luxury presentation box, it undergoes a sacred Vedic cleansing ritual. We clear residual energetic footprints and attune the stones, preparing them to arrive as a receptive daily anchor for your personal growth, peace, and intentions.
          </p>
          
          <div className="pt-8 border-t border-[#E9E1D5] text-center">
            <h3 className="font-serif text-2xl mb-3 text-[#51473C]">The Boutique Mission</h3>
            <p className="text-xs md:text-sm text-[#817569] max-w-lg mx-auto">
              To empower modern individuals with ethically sourced, impeccably crafted crystal jewelry that bridges sacred intention with effortless everyday elegance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
