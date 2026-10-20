"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { submitOrder } from "@/lib/supabaseClient";
import { 
  Sparkles, 
  ShieldCheck, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Smartphone, 
  CreditCard, 
  Building2, 
  Banknote,
  Lock,
  ShoppingBag
} from "lucide-react";

const INDIAN_STATES = [
  "Delhi NCR",
  "Maharashtra",
  "Karnataka",
  "Tamil Nadu",
  "Gujarat",
  "Uttar Pradesh",
  "Telangana",
  "West Bengal",
  "Rajasthan",
  "Punjab",
  "Haryana",
  "Madhya Pradesh",
  "Kerala",
  "Goa",
  "Chandigarh",
  "Other Indian State"
];

export default function CheckoutPage() {
  const { cart, clearCart, appliedCoupon, applyCoupon, showToast } = useStore();

  const [step, setStep] = useState<"form" | "confirmed">("form");
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("Delhi NCR");

  const [deliveryMethod, setDeliveryMethod] = useState<"standard" | "express">("standard");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "cards" | "netbanking" | "cod">("upi");
  const [couponCodeInput, setCouponCodeInput] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const rawSubtotal = cart.reduce(
    (sum, item) => sum + (item.salePrice || item.price) * item.quantity,
    0
  );

  // 15% automatic tiered discount for 2+ items
  const isTieredQualified = totalQuantity >= 2;
  const tieredDiscount = isTieredQualified ? Math.round(rawSubtotal * 0.15) : 0;

  // Coupon discount
  let couponDiscount = 0;
  if (appliedCoupon === "RIYA10") couponDiscount = Math.round(rawSubtotal * 0.10);
  else if (appliedCoupon === "LUXURY15" || appliedCoupon === "RIYA15") couponDiscount = Math.round(rawSubtotal * 0.15);
  else if (appliedCoupon === "KUNDALI20") couponDiscount = Math.round(rawSubtotal * 0.20);

  const totalDiscount = tieredDiscount + couponDiscount;

  // Shipping
  const isFreeStandard = (rawSubtotal - totalDiscount) >= 1499 || rawSubtotal >= 1499;
  const deliveryFee = deliveryMethod === "express" ? 99 : (isFreeStandard ? 0 : 79);

  const grandTotal = Math.max(0, rawSubtotal - totalDiscount + deliveryFee);

  // Field validations
  const isPhoneValid = /^[6-9]\d{9}$/.test(phone.replace(/\D/g, ""));
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPincodeValid = /^\d{6}$/.test(pincode.trim());
  const isNameValid = fullName.trim().length >= 3;
  const isAddressValid = address.trim().length >= 8;
  const isCityValid = city.trim().length >= 2;

  const isFormValid = isNameValid && isPhoneValid && isEmailValid && isAddressValid && isPincodeValid && isCityValid;

  const markTouched = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;
    const res = applyCoupon(couponCodeInput.trim());
    showToast(res.message, res.success ? "success" : "info");
    if (res.success) setCouponCodeInput("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      fullName: true,
      phone: true,
      email: true,
      address: true,
      pincode: true,
      city: true,
    });

    if (cart.length === 0) {
      showToast("Your cart is empty.", "info");
      return;
    }

    if (!isFormValid) {
      showToast("Please verify highlighted form fields.", "info");
      return;
    }

    setLoading(true);
    const orderNum = `#RTC-${Math.floor(10000 + Math.random() * 90000)}`;

    const res = await submitOrder({
      customer: {
        name: fullName,
        phone,
        email,
        address: `${address}${landmark ? `, Near: ${landmark}` : ""}`,
        city,
        state: stateName,
        pincode
      },
      items: cart,
      total: grandTotal,
      paymentMethod: paymentMethod.toUpperCase(),
      energizationNote: {
        name: fullName,
        dob: "General Astrological Consecration",
        intention: "General Prosperity & Protection"
      }
    });

    setOrderId(res.orderId || orderNum);
    setLoading(false);
    setStep("confirmed");
    clearCart();
  };

  if (step === "confirmed") {
    return (
      <div className="min-h-screen py-20 bg-[#FAF9F6] text-[#2C2A29] flex items-center justify-center px-4">
        <div className="max-w-xl w-full p-8 sm:p-12 rounded-3xl bg-[#FFFFFF] border-2 border-[#D4AF37] shadow-[0_20px_50px_rgba(212,175,55,0.22)] text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-[#F8F4EC] border-2 border-[#D4AF37] text-[#D4AF37] flex items-center justify-center mx-auto shadow-md">
            <Sparkles size={34} />
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#9A7B2C] block mb-1">
              Order Confirmed & Sacredly Blessed
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C2A29]">
              Thank You, {fullName || "Blessed Wearer"}!
            </h2>
            <p className="text-xs sm:text-sm text-[#6E6A64] mt-2 leading-relaxed">
              Your order is in our studio. Each bracelet is being consecrated with 108 Vedic Beej Mantras under Full Moon illumination before insured dispatch.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#EAE5DF] text-xs text-[#2C2A29] space-y-2 text-left">
            <div className="flex justify-between border-b border-[#EAE5DF] pb-2">
              <span className="text-[#6E6A64]">Order ID:</span>
              <strong className="font-mono text-[#9A7B2C]">{orderId}</strong>
            </div>
            <div className="flex justify-between border-b border-[#EAE5DF] pb-2">
              <span className="text-[#6E6A64]">Delivery Destination:</span>
              <span>{city}, {stateName} ({pincode})</span>
            </div>
            <div className="flex justify-between border-b border-[#EAE5DF] pb-2">
              <span className="text-[#6E6A64]">Selected Payment:</span>
              <span className="font-semibold">{paymentMethod.toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6E6A64]">Estimated Arrival:</span>
              <strong className="text-emerald-800">3–5 Business Days</strong>
            </div>
          </div>

          <Link
            href="/"
            className="w-full py-4 px-6 rounded-full text-xs font-semibold tracking-wider uppercase text-[#2C2A29] btn-gold-shimmer block"
          >
            Return to Collection Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 sm:py-16 bg-[#FAF9F6] text-[#2C2A29]">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#6E6A64] hover:text-[#2C2A29] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Return to Boutique</span>
          </Link>

          <span className="text-xs font-bold text-[#9A7B2C] flex items-center gap-1.5">
            <Lock size={13} className="text-[#D4AF37]" />
            <span>256-Bit SSL Insured Checkout</span>
          </span>
        </div>

        {/* Full Split-Screen Checkout Window */}
        <div className="rounded-3xl bg-[#FFFFFF] border border-[#EAE5DF] shadow-[0_20px_50px_rgba(212,175,55,0.15)] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* =========================================================
              LEFT COLUMN: ADDRESS & DELIVERY & PAYMENT (7 cols)
          ========================================================= */}
          <div className="lg:col-span-7 p-6 sm:p-10 space-y-6 border-b lg:border-b-0 lg:border-r border-[#EAE5DF]">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9A7B2C] mb-1">
                <Sparkles size={13} />
                <span>Step 1 of 2</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2C2A29]">
                Shipping & Consecration Details
              </h2>
              <p className="text-xs text-[#6E6A64] mt-0.5">
                Every bracelet is cleansed and dedicated to your name before insured dispatch.
              </p>
            </div>

            <form id="standalone-checkout-form" onSubmit={handleSubmit} className="space-y-3.5">
              {/* Full Name */}
              <div className="floating-input-group">
                <input
                  id="s_fullName"
                  type="text"
                  required
                  placeholder=" "
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  onBlur={() => markTouched("fullName")}
                  className={touched.fullName && !isNameValid ? "!border-rose-400 !bg-rose-50/40" : touched.fullName && isNameValid ? "!border-emerald-500" : ""}
                />
                <label htmlFor="s_fullName">Full Name (First and Last Name) *</label>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="floating-input-group">
                  <input
                    id="s_phone"
                    type="tel"
                    required
                    placeholder=" "
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={() => markTouched("phone")}
                    className={touched.phone && !isPhoneValid ? "!border-rose-400 !bg-rose-50/40" : touched.phone && isPhoneValid ? "!border-emerald-500" : ""}
                  />
                  <label htmlFor="s_phone">Mobile Number (10 Digits) *</label>
                </div>

                <div className="floating-input-group">
                  <input
                    id="s_email"
                    type="email"
                    required
                    placeholder=" "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => markTouched("email")}
                    className={touched.email && !isEmailValid ? "!border-rose-400 !bg-rose-50/40" : touched.email && isEmailValid ? "!border-emerald-500" : ""}
                  />
                  <label htmlFor="s_email">Email (Tracking Updates) *</label>
                </div>
              </div>

              {/* Street Address */}
              <div className="floating-input-group">
                <input
                  id="s_address"
                  type="text"
                  required
                  placeholder=" "
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  onBlur={() => markTouched("address")}
                  className={touched.address && !isAddressValid ? "!border-rose-400 !bg-rose-50/40" : touched.address && isAddressValid ? "!border-emerald-500" : ""}
                />
                <label htmlFor="s_address">Street Address / House / Flat No. *</label>
              </div>

              {/* Landmark */}
              <div className="floating-input-group">
                <input
                  id="s_landmark"
                  type="text"
                  placeholder=" "
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                />
                <label htmlFor="s_landmark">Nearest Landmark (Optional)</label>
              </div>

              {/* PIN Code, City, State */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="floating-input-group">
                  <input
                    id="s_pincode"
                    type="text"
                    required
                    maxLength={6}
                    placeholder=" "
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    onBlur={() => markTouched("pincode")}
                    className={touched.pincode && !isPincodeValid ? "!border-rose-400 !bg-rose-50/40" : touched.pincode && isPincodeValid ? "!border-emerald-500" : ""}
                  />
                  <label htmlFor="s_pincode">PIN Code (6 Digits) *</label>
                </div>

                <div className="floating-input-group">
                  <input
                    id="s_city"
                    type="text"
                    required
                    placeholder=" "
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onBlur={() => markTouched("city")}
                    className={touched.city && !isCityValid ? "!border-rose-400 !bg-rose-50/40" : touched.city && isCityValid ? "!border-emerald-500" : ""}
                  />
                  <label htmlFor="s_city">City / District *</label>
                </div>

                <div className="floating-input-group">
                  <select
                    id="s_state"
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                  >
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="s_state">State</label>
                </div>
              </div>
            </form>

            {/* Delivery Method Selector */}
            <div className="pt-2">
              <h4 className="font-serif text-sm font-semibold text-[#2C2A29] mb-2.5">
                Delivery Priority
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setDeliveryMethod("standard")}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    deliveryMethod === "standard"
                      ? "bg-[#F8F4EC] border-[#D4AF37] shadow-xs"
                      : "bg-[#FAF9F6] border-[#EAE5DF]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#2C2A29]">Standard Insured Delivery</span>
                    <span className="text-xs font-bold text-emerald-800">
                      {isFreeStandard ? "FREE" : "₹79"}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6E6A64] mt-1">3–5 Business Days • BlueDart Air</p>
                </div>

                <div
                  onClick={() => setDeliveryMethod("express")}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    deliveryMethod === "express"
                      ? "bg-[#F8F4EC] border-[#D4AF37] shadow-xs"
                      : "bg-[#FAF9F6] border-[#EAE5DF]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#2C2A29]">Express Priority Air</span>
                    <span className="text-xs font-bold text-[#9A7B2C]">₹99</span>
                  </div>
                  <p className="text-[11px] text-[#6E6A64] mt-1">1–2 Business Days • Fast-Track</p>
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="pt-2">
              <h4 className="font-serif text-sm font-semibold text-[#2C2A29] mb-2.5">
                Payment Option
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: "upi", label: "Instant UPI", sub: "GPay, PhonePe", icon: <Smartphone size={16} /> },
                  { id: "cards", label: "Cards", sub: "Visa, RuPay", icon: <CreditCard size={16} /> },
                  { id: "netbanking", label: "NetBanking", sub: "Major Banks", icon: <Building2 size={16} /> },
                  { id: "cod", label: "Cash on Delivery", sub: "COD Available", icon: <Banknote size={16} /> },
                ].map((pm) => {
                  const isSelected = paymentMethod === pm.id;
                  return (
                    <div
                      key={pm.id}
                      onClick={() => setPaymentMethod(pm.id as any)}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                        isSelected
                          ? "bg-[#F8F4EC] border-[#D4AF37] shadow-xs"
                          : "bg-[#FAF9F6] border-[#EAE5DF]"
                      }`}
                    >
                      <div className={isSelected ? "text-[#9A7B2C]" : "text-[#6E6A64]"}>{pm.icon}</div>
                      <span className="text-xs font-bold text-[#2C2A29]">{pm.label}</span>
                      <span className="text-[9px] text-[#6E6A64]">{pm.sub}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* =========================================================
              RIGHT COLUMN: ORDER SUMMARY (5 cols)
          ========================================================= */}
          <div className="lg:col-span-5 p-6 sm:p-10 bg-[#FAF9F6] flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <h3 className="font-serif text-lg font-bold text-[#2C2A29] pb-3 border-b border-[#EAE5DF]">
                Order Summary ({totalQuantity} items)
              </h3>

              {/* Items List */}
              <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
                {cart.length === 0 ? (
                  <p className="text-xs text-[#6E6A64]">Your bag is currently empty.</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.cartKey || item.id} className="flex items-center gap-3 text-xs">
                      <div className="w-13 h-13 rounded-xl bg-white border border-[#EAE5DF] overflow-hidden relative flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <h4 className="font-semibold text-[#2C2A29] truncate">{item.name}</h4>
                        <span className="text-[10px] text-[#6E6A64]">
                          Qty: {item.quantity} • {item.selectedBeadSize || "8mm"}
                        </span>
                      </div>
                      <span className="font-bold text-[#2C2A29] flex-shrink-0">
                        ₹{((item.salePrice || item.price) * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {/* Promo Code Input */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2 pt-2">
                <input
                  type="text"
                  placeholder="Promo Code (RIYA15)"
                  value={couponCodeInput}
                  onChange={(e) => setCouponCodeInput(e.target.value)}
                  className="flex-grow px-3.5 py-2 text-xs rounded-xl bg-white border border-[#EAE5DF] text-[#2C2A29] uppercase focus:outline-none focus:border-[#D4AF37]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider text-[#2C2A29] btn-pearl-gold"
                >
                  Apply
                </button>
              </form>

              {/* Price Calculation */}
              <div className="pt-3 border-t border-[#EAE5DF] space-y-2 text-xs text-[#6E6A64]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#2C2A29] font-semibold">₹{rawSubtotal.toLocaleString("en-IN")}</span>
                </div>

                {tieredDiscount > 0 && (
                  <div className="flex justify-between text-emerald-800 font-semibold">
                    <span>Buy 2 Get 15% Off (Tiered)</span>
                    <span>-₹{tieredDiscount.toLocaleString("en-IN")}</span>
                  </div>
                )}

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-800 font-semibold">
                    <span>Promo Discount ({appliedCoupon})</span>
                    <span>-₹{couponDiscount.toLocaleString("en-IN")}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Air Delivery</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <strong className="text-emerald-800">FREE</strong>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>

                <div className="pt-3 border-t border-[#EAE5DF] flex justify-between text-base font-bold text-[#2C2A29]">
                  <span>Total Amount:</span>
                  <span className="text-2xl text-[#2C2A29]">
                    ₹{grandTotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="space-y-3 pt-4 border-t border-[#EAE5DF]">
              <button
                type="submit"
                form="standalone-checkout-form"
                disabled={loading || cart.length === 0}
                className="w-full py-4 px-6 rounded-full text-xs font-semibold tracking-wider uppercase text-[#2C2A29] btn-gold-shimmer flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
              >
                {loading ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <Sparkles size={16} className="text-[#2C2A29]" />
                    <span>Place Order • ₹{grandTotal.toLocaleString("en-IN")}</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>

              <div className="p-3 rounded-2xl bg-white border border-[#EAE5DF] flex items-center justify-center gap-2 text-[10px] text-[#6E6A64]">
                <ShieldCheck size={14} className="text-[#D4AF37]" />
                <span>256-Bit SSL Encrypted • Lab Certificate Included</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
