"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Package, Search, Clock, CheckCircle, Truck, Sparkles, ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TrackOrderPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [searched, setSearched] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError(null);
    setOrders([]);

    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .ilike("customer_email", email.trim())
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      setOrders(data || []);
      setSearched(true);
    } catch (err: any) {
      console.error(err);
      setError("Unable to find orders. Please check your email or contact support.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] pt-6 sm:pt-12 pb-24 bg-[#FDFBF7] text-[#2D2A32] flex flex-col items-center">
      <div className="container mx-auto px-4 sm:px-6 max-w-2xl">
        
        {/* Back Link */}
        <div className="mb-4">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-[#6C6574] hover:text-[#2D2A32]">
            <ArrowLeft size={14} /> Back to Store
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="w-14 h-14 mx-auto bg-[#FAF6F0] text-[#D4AF37] rounded-full flex items-center justify-center mb-4 border border-[#E8DFF5] shadow-xs">
            <Package size={24} />
          </div>
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#8E6BB8] block mb-1">
            Order Status & Ritual Tracking
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl text-[#2D2A32] tracking-tight mb-2">
            Track Your Healed Order
          </h1>
          <p className="text-xs sm:text-sm text-[#6C6574] max-w-md mx-auto leading-relaxed font-light">
            Enter the email address or phone number used during checkout to view the Vedic consecration and shipping progress of your bracelets.
          </p>
        </div>

        {/* Search Input Form */}
        <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-2.5 mb-8">
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter checkout email (e.g. name@domain.com)" 
            className="flex-grow bg-white border border-[#EFE7DA] rounded-2xl px-4 py-3 text-xs text-[#2D2A32] focus:outline-none focus:border-[#D4AF37] shadow-xs"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="px-6 py-3 bg-[#2D2A32] text-white text-xs font-semibold uppercase tracking-wider rounded-2xl hover:bg-[#1F1D23] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95"
          >
            {loading ? "Locating Order..." : <><Search size={15} className="text-[#FDF1D6]" /> Track Order</>}
          </button>
        </form>

        {error && (
          <div className="bg-[#F4DCE0]/50 text-[#D47A88] p-4 rounded-2xl text-xs mb-6 border border-[#E8B4BC] text-center">
            {error}
          </div>
        )}

        {searched && orders.length === 0 && !loading && !error && (
          <div className="text-center py-10 px-6 bg-[#FAF6F0] border border-[#EFE7DA] rounded-3xl space-y-3">
            <Sparkles size={28} className="mx-auto text-[#D4AF37]" />
            <p className="text-xs text-[#6C6574]">No orders found for this email address.</p>
            <Link 
              href="/shop" 
              className="inline-block px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#2D2A32] hover:bg-[#1F1D23]"
            >
              Explore Healed Bracelets
            </Link>
          </div>
        )}

        {/* Orders List */}
        {orders.length > 0 && (
          <div className="space-y-4">
            {orders.map((order) => {
              let statusLabel = "Processing Ritual";
              let StatusIcon = Clock;
              let statusColor = "bg-[#FDF1D6] text-[#D4AF37] border-[#D4AF37]/40";
              
              if (order.status === 'paid' || order.status === 'pending_cod') {
                statusLabel = "Vedic Consecration in Progress";
                StatusIcon = Sparkles;
                statusColor = "bg-[#E8DFF5] text-[#8E6BB8] border-[#8E6BB8]/30";
              } else if (order.status === 'shipped') {
                statusLabel = "In Transit (Express)";
                StatusIcon = Truck;
                statusColor = "bg-[#E0F2E9] text-[#47936A] border-[#A7DCBF]";
              } else if (order.status === 'delivered') {
                statusLabel = "Delivered & Activated";
                StatusIcon = CheckCircle;
                statusColor = "bg-[#E0F2E9] text-[#47936A] border-[#A7DCBF]";
              }

              return (
                <div key={order.id} className="bg-white border border-[#EFE7DA] p-5 sm:p-6 rounded-3xl shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#EFE7DA]">
                    <div>
                      <p className="text-[10px] text-[#6C6574] uppercase tracking-wider font-semibold">
                        Order #{order.id.slice(0, 8).toUpperCase()}
                      </p>
                      <p className="text-xs font-medium text-[#2D2A32] mt-0.5">
                        Placed on {new Date(order.created_at).toLocaleDateString('en-IN', {
                          year: 'numeric', month: 'short', day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold border self-start sm:self-auto ${statusColor}`}>
                      <StatusIcon size={12} />
                      <span>{statusLabel}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2.5">
                    {order.items?.map((item: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center text-xs">
                        <span className="text-[#2D2A32] flex items-center gap-2 min-w-0">
                          <span className="w-5 h-5 bg-[#FAF6F0] border border-[#EFE7DA] flex items-center justify-center text-[10px] font-bold rounded-md flex-shrink-0">
                            {item.quantity}
                          </span>
                          <span className="truncate">{item.name}</span>
                        </span>
                        <span className="font-semibold text-[#2D2A32] flex-shrink-0 ml-2">
                          ₹{((item.salePrice || item.price) * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-[#EFE7DA] text-xs">
                    <span className="uppercase tracking-wider text-[#6C6574] font-semibold">Order Total</span>
                    <span className="font-bold text-sm text-[#2D2A32]">₹{order.total_amount?.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
