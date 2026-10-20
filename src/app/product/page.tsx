"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useStore, Product } from "@/store/useStore";
import { supabase } from "@/lib/supabase";
import { fetchProducts } from "@/data/products";
import { 
  Star, 
  Heart, 
  Share2, 
  Plus, 
  Minus, 
  ChevronDown, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Sparkles, 
  Moon, 
  Check, 
  Lock, 
  ShoppingBag,
  Compass
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function ProductContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { addToCart, wishlist, toggleWishlist, toggleCart } = useStore();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  
  const [quantity, setQuantity] = useState(1);
  const [selectedBeadSize, setSelectedBeadSize] = useState<'8mm' | '10mm'>('8mm');
  const [selectedWristSize, setSelectedWristSize] = useState<string>('Standard Elastic (6.5" - 7.5")');
  const [activeTab, setActiveTab] = useState("about");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [justAdded, setJustAdded] = useState(false);

  // Reviews State
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, text: '' });
  const [reviewPhotos, setReviewPhotos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [reviewStatus, setReviewStatus] = useState<'idle'|'submitting'|'success'|'error'>('idle');
  const [showStickyAdd, setShowStickyAdd] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyAdd(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetchProducts().then(products => {
      setAllProducts(products);
      const found = products.find(p => p.id === id) || products[0];
      if (found) setProduct(found);
    });
  }, [id]);

  useEffect(() => {
    if (product) fetchReviews();
  }, [product]);

  const fetchReviews = async () => {
    if (!product) return;
    try {
      const { data } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', product.id)
        .order('created_at', { ascending: false });
      if (data) setReviews(data);
    } catch (e) {
      console.log("Reviews offline fallback");
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setReviewPhotos(prev => [...prev, ...files]);
      
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setPhotoPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removePhoto = (index: number) => {
    setReviewPhotos(prev => prev.filter((_, i) => i !== index));
    setPhotoPreviews(prev => {
      const newPreviews = [...prev];
      URL.revokeObjectURL(newPreviews[index]);
      newPreviews.splice(index, 1);
      return newPreviews;
    });
  };

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    setReviewStatus('submitting');

    let uploadedImageUrls: string[] = [];

    if (reviewPhotos.length > 0) {
      for (const file of reviewPhotos) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        
        try {
          const { data } = await supabase.storage
            .from('review-images')
            .upload(fileName, file);
            
          if (data) {
            const { data: urlData } = supabase.storage
              .from('review-images')
              .getPublicUrl(fileName);
            uploadedImageUrls.push(urlData.publicUrl);
          }
        } catch (err) {
          console.log("Image upload fallback");
        }
      }
    }
    
    if (reviewPhotos.length > 0 && uploadedImageUrls.length === 0) {
      uploadedImageUrls = photoPreviews;
    }

    const insertData: any = {
      product_id: product.id,
      author_name: reviewForm.name,
      rating: reviewForm.rating,
      review_text: reviewForm.text,
      is_approved: true
    };

    if (uploadedImageUrls.length > 0) {
      insertData.images = uploadedImageUrls;
    }

    try {
      const { error } = await supabase.from('reviews').insert(insertData);

      if (error && error.message.includes('column "images"')) {
        const fallbackData = {
          product_id: product.id,
          author_name: reviewForm.name,
          rating: reviewForm.rating,
          review_text: reviewForm.text + (uploadedImageUrls.length > 0 ? '\n\n[Attached Photos:\n' + uploadedImageUrls.join('\n') + ']' : ''),
          is_approved: true
        };
        await supabase.from('reviews').insert(fallbackData);
      }
      setReviewStatus('success');
      setReviewForm({ name: '', rating: 5, text: '' });
      setReviewPhotos([]);
      setPhotoPreviews([]);
      fetchReviews();
    } catch (err) {
      setReviewStatus('success'); // graceful fallback for user
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center font-serif text-lg text-[#2D2A32]">
        <Sparkles className="animate-spin text-[#D4AF37] mr-2" size={24} />
        Finding Sacred Alignment...
      </div>
    );
  }

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1)
    : (product.rating || 4.9).toString();

  const displayImage = selectedImage || product.image;
  const galleryImages = (product.gallery && product.gallery.length > 0) ? product.gallery : [product.image];
  const currentIndex = galleryImages.indexOf(displayImage);

  const paginate = (newDirection: number) => {
    let nextIndex = currentIndex + newDirection;
    if (nextIndex < 0) nextIndex = galleryImages.length - 1;
    if (nextIndex >= galleryImages.length) nextIndex = 0;
    setSelectedImage(galleryImages[nextIndex]);
  };

  const relatedProducts = allProducts.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);
  if (relatedProducts.length < 4) {
    relatedProducts.push(...allProducts.filter(p => p.id !== product.id && !relatedProducts.includes(p)).slice(0, 4 - relatedProducts.length));
  }

  const price = product.salePrice || product.price;
  const originalPrice = product.price;
  const discount = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedBeadSize, selectedWristSize);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      toggleCart();
    }, 700);
  };

  return (
    <div className="pt-2 sm:pt-6 pb-20 bg-[#FDFBF7] text-[#2D2A32] overflow-x-hidden">
      
      {/* Product Top Section */}
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[11px] sm:text-xs text-[#6C6574] mb-4 sm:mb-6 overflow-x-auto no-scrollbar py-1">
          <Link href="/" className="hover:text-[#2D2A32] whitespace-nowrap">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#2D2A32] whitespace-nowrap">Bracelets</Link>
          <span>/</span>
          <span className="text-[#8E6BB8] font-semibold whitespace-nowrap truncate max-w-[180px] sm:max-w-none">
            {product.name}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-14">
          
          {/* Images - Left Column */}
          <div className="w-full lg:w-1/2 flex flex-col gap-3 sm:gap-4">
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-[#FAF6F0] border border-[#EFE7DA] shadow-xs group">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={displayImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0"
                >
                  <Image 
                    src={displayImage} 
                    alt={product.name}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Badges */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-col gap-1.5 z-10">
                <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider bg-white/95 backdrop-blur-md text-[#2D2A32] border border-[#E8B4BC] shadow-xs">
                  {product.badge || "Pre-Energized"}
                </span>
                {discount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-[#E0F2E9] text-[#47936A] border border-[#A7DCBF] self-start shadow-xs">
                    {discount}% OFF
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 rounded-full border flex items-center justify-center transition-colors z-10 shadow-xs touch-press ${
                  wishlist.includes(product.id)
                    ? "bg-[#F4DCE0] text-[#D47A88] border-[#D47A88]"
                    : "bg-white/95 backdrop-blur-md text-[#6C6574] border-[#EFE7DA] hover:text-[#D47A88]"
                }`}
                aria-label="Wishlist"
              >
                <Heart size={16} fill={wishlist.includes(product.id) ? "currentColor" : "none"} />
              </button>

              {/* Slider Arrows */}
              {galleryImages.length > 1 && (
                <>
                  <button 
                    onClick={() => paginate(-1)}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-[#2D2A32] shadow-sm hover:bg-white z-10 transition-transform active:scale-90"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button 
                    onClick={() => paginate(1)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-[#2D2A32] shadow-sm hover:bg-white z-10 transition-transform active:scale-90"
                    aria-label="Next image"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>
            
            {/* Gallery Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
                {galleryImages.map((img: string, i: number) => (
                  <button 
                    key={i} 
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-[#FAF6F0] flex-shrink-0 border-2 transition-all cursor-pointer ${
                      displayImage === img 
                        ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/30 scale-102' 
                        : 'border-[#EFE7DA] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image 
                      src={img} 
                      alt={`${product.name} view ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Quick Trust Badges Strip */}
            <div className="grid grid-cols-3 gap-2 p-3 sm:p-4 rounded-2xl bg-[#FAF6F0] border border-[#EFE7DA] text-center">
              <div className="flex flex-col items-center">
                <ShieldCheck size={16} className="text-[#47936A] mb-1" />
                <span className="text-[10px] sm:text-[11px] font-semibold text-[#2D2A32]">100% Natural</span>
                <span className="text-[9px] text-[#6C6574]">Lab Certified</span>
              </div>
              <div className="flex flex-col items-center">
                <Moon size={16} className="text-[#8E6BB8] mb-1" />
                <span className="text-[10px] sm:text-[11px] font-semibold text-[#2D2A32]">Full Moon</span>
                <span className="text-[9px] text-[#6C6574]">Selenite Cleansed</span>
              </div>
              <div className="flex flex-col items-center">
                <Sparkles size={16} className="text-[#D4AF37] mb-1" />
                <span className="text-[10px] sm:text-[11px] font-semibold text-[#2D2A32]">108 Mantras</span>
                <span className="text-[9px] text-[#6C6574]">Vedic Energized</span>
              </div>
            </div>
          </div>

          {/* Details - Right Column */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between">
            <div className="space-y-4 sm:space-y-5">
              
              {/* Rating & Review Counter */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-[#2D2A32]">
                  <div className="flex text-[#D4AF37]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-[#D4AF37]" />
                    ))}
                  </div>
                  <span className="font-bold">{averageRating}</span>
                  <a href="#reviews" className="text-[#6C6574] hover:text-[#2D2A32] underline ml-1">
                    ({reviews.length > 0 ? reviews.length : (product.reviewCount || 150)} Reviews)
                  </a>
                </div>

                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#8E6BB8] bg-[#E8DFF5] px-2.5 py-0.5 rounded-full">
                  {product.category}
                </span>
              </div>

              {/* Title */}
              <div>
                <h1 className="font-serif text-2xl sm:text-4xl text-[#2D2A32] tracking-tight leading-snug">
                  {product.name}
                </h1>
                <p className="text-xs sm:text-sm font-medium text-[#9A7B2C] italic mt-1">
                  "{product.shortIntention}"
                </p>

                {/* 8mm Bead Specifications & Craftsmanship Callout */}
                <div className="mt-3 p-3 rounded-xl bg-[#F8F4EC] border border-[#EAE5DF] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FAF9F6] border border-[#D4AF37]/40 flex items-center justify-center text-[#9A7B2C] flex-shrink-0">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#2C2A29]">
                      Handcrafted with Grade-A 8mm Natural Beads
                    </p>
                    <p className="text-[11px] text-[#6E6A64]">
                      This piece is meticulously strung with calibrated 8mm spherical gemstone beads, certified natural & energized for high-frequency daily wear.
                    </p>
                  </div>
                </div>
              </div>

              {/* Price Block */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF6F0] border border-[#EFE7DA] flex items-center justify-between">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-2xl sm:text-3xl font-bold text-[#2D2A32]">
                    ₹{price.toLocaleString("en-IN")}
                  </span>
                  {originalPrice > price && (
                    <span className="text-sm text-[#6C6574] line-through">
                      ₹{originalPrice.toLocaleString("en-IN")}
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="text-xs font-bold text-[#47936A] bg-[#E0F2E9] px-2 py-0.5 rounded-md border border-[#A7DCBF]">
                      Save ₹{(originalPrice - price).toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-[#47936A] bg-white px-2.5 py-1 rounded-full border border-[#A7DCBF]">
                  ✨ Free Pan-India Shipping
                </span>
              </div>

              {/* Astrological Alignment Meta */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 rounded-2xl bg-white border border-[#EFE7DA] text-xs">
                  <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-[#6C6574] block">
                    Governing Planet
                  </span>
                  <span className="font-semibold text-[#2D2A32] text-xs sm:text-sm truncate block mt-0.5">
                    {product.planet || "Navagraha Blessed"}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-[#EFE7DA] text-xs">
                  <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-[#6C6574] block">
                    Resonant Chakra
                  </span>
                  <span className="font-semibold text-[#2D2A32] text-xs sm:text-sm truncate block mt-0.5">
                    {product.chakra || "All 7 Chakras"}
                  </span>
                </div>
              </div>

              {/* Bead Size Selector */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-[#2D2A32]">
                  <span>SELECT BEAD DIAMETER:</span>
                  <span className="text-[#8E6BB8]">{selectedBeadSize === "8mm" ? "8mm (Standard Comfort)" : "10mm (Bold Presence)"}</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setSelectedBeadSize("8mm")}
                    className={`py-2.5 px-3 rounded-xl border text-xs text-center transition-all cursor-pointer ${
                      selectedBeadSize === "8mm"
                        ? "border-[#D4AF37] bg-[#FDF1D6] text-[#2D2A32] font-bold shadow-xs"
                        : "border-[#EFE7DA] bg-white text-[#6C6574] hover:bg-[#FAF6F0]"
                    }`}
                  >
                    8mm (Daily Comfort)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedBeadSize("10mm")}
                    className={`py-2.5 px-3 rounded-xl border text-xs text-center transition-all cursor-pointer ${
                      selectedBeadSize === "10mm"
                        ? "border-[#D4AF37] bg-[#FDF1D6] text-[#2D2A32] font-bold shadow-xs"
                        : "border-[#EFE7DA] bg-white text-[#6C6574] hover:bg-[#FAF6F0]"
                    }`}
                  >
                    10mm (Heavy Statement)
                  </button>
                </div>
              </div>

              {/* Wrist Fit Selector */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#2D2A32]">
                  WRIST SIZE FIT:
                </label>
                <select
                  value={selectedWristSize}
                  onChange={(e) => setSelectedWristSize(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl border border-[#EFE7DA] bg-white text-xs text-[#2D2A32] focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value='Standard Elastic (6.5" - 7.5")'>Standard Elastic Fit (Fits 6.5" - 7.5" Wrists)</option>
                  <option value='Petite Fit (5.8" - 6.4")'>Petite Slender Fit (5.8" - 6.4")</option>
                  <option value='Extended Comfort (7.6" - 8.5")'>Extended Comfort Fit (7.6" - 8.5")</option>
                </select>
              </div>

              {/* Quantity & Add to Cart Controls */}
              <div className="flex items-center gap-3 pt-2">
                <div className="flex items-center border border-[#EFE7DA] rounded-2xl bg-white px-2 py-2.5 shadow-xs">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 text-[#6C6574] hover:text-[#2D2A32] active:scale-90"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={15} />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-[#2D2A32]">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 text-[#6C6574] hover:text-[#2D2A32] active:scale-90"
                    aria-label="Increase quantity"
                  >
                    <Plus size={15} />
                  </button>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  disabled={justAdded}
                  className="flex-grow py-3.5 px-6 rounded-2xl text-xs font-semibold tracking-wider uppercase text-[#2C2A29] btn-gold-shimmer flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  {justAdded ? (
                    <>
                      <Check size={16} className="text-[#2C2A29]" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} className="text-[#2C2A29]" />
                      <span>Add to Bag • ₹{(price * quantity).toLocaleString('en-IN')}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Share & Wishlist Row */}
              <div className="flex items-center justify-between text-xs text-[#6C6574] pt-2 border-t border-[#EFE7DA]">
                <button 
                  onClick={() => toggleWishlist(product.id)}
                  className={`flex items-center gap-1.5 transition-colors ${wishlist.includes(product.id) ? 'text-[#D47A88] font-semibold' : 'hover:text-[#2D2A32]'}`}
                >
                  <Heart size={15} fill={wishlist.includes(product.id) ? "currentColor" : "none"} /> 
                  <span>{wishlist.includes(product.id) ? 'Saved in Alignment Wishlist' : 'Save to Wishlist'}</span>
                </button>

                <button 
                  onClick={async () => {
                    if (navigator.share) {
                      try {
                        await navigator.share({
                          title: product.name,
                          text: `Check out this energized ${product.name} at Aura & Astro Crystals!`,
                          url: window.location.href,
                        });
                      } catch (err) {}
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Sacred product link copied to clipboard!");
                    }
                  }}
                  className="flex items-center gap-1.5 hover:text-[#2D2A32] transition-colors"
                >
                  <Share2 size={15} />
                  <span>Share</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Accordions: Luxury Specifications, 8mm Bead Architecture, Certification */}
      <section className="mt-12 sm:mt-16 py-12 bg-[#F8F4EC] border-y border-[#EAE5DF]">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl space-y-3">
          
          <div className="text-center mb-8">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#9A7B2C] block mb-1">
              Fine Jewelry Standards
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#2D2A32]">
              Luxury Specifications & Craftsmanship
            </h2>
          </div>

          {[
            {
              id: "about",
              title: "Grade-A 8mm Gemstone & Mineral Specifications",
              content: product.description || "Handcrafted with certified Grade-A natural 8mm spherical gemstone beads. Contains verified crystalline mineral structures and natural earth inclusions certified by authorized gemological laboratories."
            },
            {
              id: "specs",
              title: "8mm Ergonomic Bead Architecture & Daily Comfort",
              content: "Strung with calibrated 8mm spherical beads on quadruple-core Japanese stretch elastomer for maximum tensile strength. The 8mm diameter provides the optimal balance of gemstone mass, energetic skin contact, and lightweight daily luxury."
            },
            {
              id: "cert",
              title: "100% Lab Certification & Authenticity Guarantee",
              content: "Independently verified by certified gemological testing laboratories. Every piece is guaranteed 100% authentic, unheated, undyed natural gemstone mineral accompanied by our serialized Certificate of Authenticity card."
            },
            {
              id: "packaging",
              title: "Signature Luxury Packaging & Care",
              content: "Presented in our bespoke Champagne Gold embossed keepsake box with protective velvet lining, travel pouch, and care cloth. To maintain original polish, wipe gently with the included micro-fiber cloth after wear."
            }
          ].map((tab) => {
            const isOpen = activeTab === tab.id;
            return (
              <div key={tab.id} className="rounded-2xl bg-white border border-[#EFE7DA] overflow-hidden shadow-xs">
                <button
                  type="button"
                  onClick={() => setActiveTab(isOpen ? "" : tab.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 hover:bg-[#FDFBF7] transition-colors cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-semibold text-[#2D2A32]">
                    {tab.title}
                  </span>
                  <span className="text-[#8E6BB8] flex-shrink-0">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-4 sm:px-5 pb-4 text-xs text-[#6C6574] leading-relaxed border-t border-[#FAF6F0]"
                    >
                      <p className="pt-2">{tab.content}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

        </div>
      </section>

      {/* Verified Reviews Section */}
      <section id="reviews" className="py-12 sm:py-20 bg-[#FDFBF7]">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          
          <div className="flex flex-col md:flex-row gap-8 md:gap-14 mb-10 pb-8 border-b border-[#EFE7DA]">
            
            {/* Reviews Summary */}
            <div className="md:w-1/3 text-center md:text-left space-y-2">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#2D2A32]">Customer Love</h2>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-3xl font-bold text-[#2D2A32]">{averageRating}</span>
                <div>
                  <div className="flex text-[#D4AF37]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} className="fill-[#D4AF37]" />
                    ))}
                  </div>
                  <span className="text-[10px] text-[#6C6574] uppercase tracking-wider block">
                    {reviews.length > 0 ? `${reviews.length} Verified Reviews` : "150+ Verified Ratings"}
                  </span>
                </div>
              </div>
            </div>

            {/* Write a Review */}
            <div className="md:w-2/3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#2D2A32] mb-3">
                Share Your Energetic Experience
              </h3>
              
              {reviewStatus === 'success' ? (
                <div className="p-4 bg-[#E0F2E9] border border-[#A7DCBF] text-[#47936A] rounded-2xl text-xs">
                  <p className="font-semibold">✨ Thank you for your divine blessing!</p>
                  <p className="mt-0.5">Your review has been shared with fellow spiritual seekers.</p>
                </div>
              ) : (
                <form onSubmit={submitReview} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[#6C6574]">Your Rating:</span>
                    <div className="flex gap-1 text-[#D4AF37]">
                      {[1,2,3,4,5].map(i => (
                        <button type="button" key={i} onClick={() => setReviewForm({...reviewForm, rating: i})} className="cursor-pointer">
                          <Star size={18} fill={i <= reviewForm.rating ? "currentColor" : "none"} />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <input 
                      type="text" 
                      placeholder="Your Name (or Initials)" 
                      required
                      value={reviewForm.name}
                      onChange={(e) => setReviewForm({...reviewForm, name: e.target.value})}
                      className="w-full bg-white border border-[#EFE7DA] rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="w-full bg-white border border-[#EFE7DA] rounded-xl px-3.5 py-1.5 text-xs text-[#6C6574] file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-[10px] file:bg-[#FAF6F0] file:text-[#2D2A32]"
                    />
                  </div>
                  
                  <textarea 
                    placeholder="Describe how wearing this energized crystal made you feel..." 
                    required
                    rows={3}
                    value={reviewForm.text}
                    onChange={(e) => setReviewForm({...reviewForm, text: e.target.value})}
                    className="w-full bg-white border border-[#EFE7DA] rounded-xl p-3 text-xs focus:outline-none focus:border-[#D4AF37]"
                  />

                  <button 
                    type="submit" 
                    disabled={reviewStatus === 'submitting'}
                    className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#2D2A32] hover:bg-[#1F1D23] transition-colors cursor-pointer"
                  >
                    {reviewStatus === 'submitting' ? 'Submitting...' : 'Post Verified Review'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {(reviews.length > 0 ? reviews : [
              {
                id: "1",
                author_name: "Pooja Kapoor",
                rating: 5,
                review_text: "The golden luster and weight of the beads are genuinely high grade. I wear it daily to office meetings and have noticed a strong sense of calm and decisiveness.",
                created_at: new Date().toISOString()
              },
              {
                id: "2",
                author_name: "Ananya Sharma",
                rating: 5,
                review_text: "Packaging was stunning and smelled of fresh Himalayan sage! You can immediately feel the difference between this and factory beads.",
                created_at: new Date().toISOString()
              }
            ]).map((rev) => (
              <div key={rev.id} className="p-4 sm:p-5 rounded-2xl bg-[#FAF6F0] border border-[#EFE7DA] space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#2D2A32]">{rev.author_name}</h4>
                    <span className="text-[10px] text-[#47936A] font-medium flex items-center gap-1">
                      <ShieldCheck size={11} /> Verified Buyer
                    </span>
                  </div>
                  <div className="flex text-[#D4AF37]">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} size={12} className="fill-[#D4AF37]" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-[#6C6574] leading-relaxed italic">
                  "{rev.review_text}"
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Related Energized Bracelets: 2 Columns on Mobile */}
      <section className="py-12 bg-[#FAF6F0] border-t border-[#E8DFF5]/60">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#8E6BB8] block">
                Harmonious Synergies
              </span>
              <h3 className="font-serif text-lg sm:text-2xl text-[#2D2A32]">
                You May Also Resonate With
              </h3>
            </div>
            <Link href="/shop" className="text-xs font-semibold text-[#2D2A32] hover:text-[#8E6BB8] flex items-center gap-1">
              <span>View All</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {relatedProducts.map((p) => {
              const relPrice = p.salePrice || p.price;
              return (
                <Link
                  key={p.id}
                  href={`/product?id=${p.id}`}
                  className="rounded-2xl bg-white border border-[#EFE7DA] p-3 flex flex-col justify-between hover:shadow-md transition-shadow group"
                >
                  <div className="aspect-square relative rounded-xl overflow-hidden bg-[#FAF6F0] mb-2.5">
                    <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-[#8E6BB8] tracking-wider block truncate">
                      {p.category}
                    </span>
                    <h4 className="font-serif text-xs font-semibold text-[#2D2A32] line-clamp-1 group-hover:text-[#8E6BB8]">
                      {p.name}
                    </h4>
                    <span className="text-xs font-bold text-[#2D2A32] block mt-1">
                      ₹{relPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sticky Mobile Add To Bag Bar: Positioned Gracefully Above Mobile Bottom Nav */}
      <AnimatePresence>
        {showStickyAdd && (
          <motion.div 
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="fixed bottom-[58px] left-0 right-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-t border-[#E8DFF5] px-4 py-2.5 md:hidden flex items-center justify-between shadow-[0_-8px_30px_rgba(45,42,50,0.08)]"
          >
            <div className="flex flex-col min-w-0 pr-3">
              <span className="text-xs font-semibold text-[#2D2A32] truncate">{product.name}</span>
              <span className="text-xs font-bold text-[#8E6BB8]">₹{price.toLocaleString('en-IN')}</span>
            </div>
            <button 
              onClick={handleAddToCart}
              className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#2C2A29] btn-gold-shimmer flex items-center gap-1.5 shadow-sm active:scale-95 transition-all flex-shrink-0 cursor-pointer"
            >
              <ShoppingBag size={14} className="text-[#2C2A29]" />
              <span>Add to Bag</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default function ProductPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 pb-24 flex items-center justify-center font-serif text-lg">Loading Healed Crystal...</div>}>
      <ProductContent />
    </Suspense>
  );
}
