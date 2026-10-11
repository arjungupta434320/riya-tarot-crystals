"use client";

import { useStore, Product } from "@/store/useStore";
import { X, Minus, Plus, ShoppingBag, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchProducts } from "@/data/products";

export default function CartDrawer() {
  const router = useRouter();
  const { cart, isCartOpen, toggleCart, updateQuantity, removeFromCart, activeDrawerTab, setDrawerTab, wishlist, toggleWishlist, addToCart } = useStore();
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts().then(setAllProducts);
  }, []);

  const wishlistProducts = allProducts.filter(p => wishlist.includes(p.id));
  const subtotal = cart.reduce((total, item) => total + (item.salePrice || item.price) * item.quantity, 0);

  return (
    <>
      {/* Soft warm backdrop - no harsh black */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-[#51473C]/25 backdrop-blur-xs z-[60] transition-opacity"
          onClick={toggleCart}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#FFFCF7] border-l border-[#E9E1D5] shadow-[0_16px_40px_rgba(81,71,60,0.12)] z-[70] transform transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-[#E9E1D5] pb-0 bg-[#F8F1E8]">
          <div className="flex gap-6">
            <button 
              onClick={() => setDrawerTab('cart')}
              className={`font-serif tracking-widest text-base pb-4 transition-colors ${activeDrawerTab === 'cart' ? 'border-b-2 border-[#51473C] text-[#51473C] font-semibold' : 'text-[#817569] border-transparent hover:text-[#51473C]'}`}
            >
              BAG ({cart.length})
            </button>
            <button 
              onClick={() => setDrawerTab('wishlist')}
              className={`font-serif tracking-widest text-base pb-4 transition-colors ${activeDrawerTab === 'wishlist' ? 'border-b-2 border-[#51473C] text-[#51473C] font-semibold' : 'text-[#817569] border-transparent hover:text-[#51473C]'}`}
            >
              WISHLIST ({wishlist.length})
            </button>
          </div>
          <button onClick={toggleCart} className="text-[#51473C] hover:text-[#B99B6B] transition-colors pb-4" aria-label="Close Drawer">
            <X size={22} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 bg-[#FFFCF7]">
          {activeDrawerTab === 'cart' ? (
            cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-[#817569] gap-4">
                <div className="w-16 h-16 rounded-full bg-[#F8F1E8] border border-[#E9E1D5] flex items-center justify-center text-[#B99B6B]">
                  <ShoppingBag size={28} strokeWidth={1.5} />
                </div>
                <p className="font-light tracking-widest uppercase text-xs">Your bag is empty</p>
                <button 
                  onClick={toggleCart}
                  className="btn-primary mt-2 text-xs py-3 px-6"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                
                {/* Free Shipping Progress */}
                <div className="bg-[#F4E9D9] p-4 border border-[#E9E1D5] rounded-[3px]">
                  <p className="text-[11px] tracking-widest text-[#51473C] text-center mb-2 font-medium">
                    {subtotal >= 5000 
                      ? "✦ Complimentary Luxury Gift Box Unlocked ✦" 
                      : `Add ₹${(5000 - subtotal).toLocaleString('en-IN')} more for Complimentary Luxury Gift Box`}
                  </p>
                  <div className="w-full h-1.5 bg-[#E9E1D5] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#B99B6B] transition-all duration-700 ease-out"
                      style={{ width: `${Math.min(100, (subtotal / 5000) * 100)}%` }}
                    />
                  </div>
                </div>

                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 group p-3 bg-[#FFFFFF] border border-[#E9E1D5] rounded-[3px]">
                    <div className="w-20 h-20 bg-[#F8F1E8] border border-[#E9E1D5]/60 relative flex-shrink-0 rounded-[2px] overflow-hidden">
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex flex-col flex-grow justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-xs uppercase tracking-wider font-semibold text-[#51473C] pr-2">{item.name}</h3>
                          <button onClick={() => removeFromCart(item.id)} className="text-[#817569] hover:text-[#51473C] transition-colors" aria-label="Remove item">
                            <X size={15} />
                          </button>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          {item.salePrice && <span className="text-xs text-[#817569]/60 line-through">₹{item.price.toLocaleString('en-IN')}</span>}
                          <span className="text-xs font-semibold text-[#51473C]">₹{(item.salePrice || item.price).toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center border border-[#E9E1D5] rounded-[2px] bg-[#FFFCF7]">
                          <button 
                            className="px-2 py-1 text-[#51473C] hover:bg-[#F4E9D9] transition-colors"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-xs w-6 text-center text-[#51473C] font-medium">{item.quantity}</span>
                          <button 
                            className="px-2 py-1 text-[#51473C] hover:bg-[#F4E9D9] transition-colors"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            wishlistProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-[#817569] gap-4">
                <div className="w-16 h-16 rounded-full bg-[#F8F1E8] border border-[#E9E1D5] flex items-center justify-center text-[#B99B6B]">
                  <Heart size={28} strokeWidth={1.5} />
                </div>
                <p className="font-light tracking-widest uppercase text-xs">Your wishlist is empty</p>
                <button 
                  onClick={toggleCart}
                  className="btn-primary mt-2 text-xs py-3 px-6"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {wishlistProducts.map((item) => (
                  <div key={item.id} className="flex gap-4 group p-3 bg-[#FFFFFF] border border-[#E9E1D5] rounded-[3px]">
                    <Link 
                      href={`/product?id=${item.id}`} 
                      onClick={toggleCart}
                      className="w-20 h-20 bg-[#F8F1E8] border border-[#E9E1D5]/60 relative flex-shrink-0 rounded-[2px] overflow-hidden block"
                    >
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                    <div className="flex flex-col flex-grow justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <Link href={`/product?id=${item.id}`} onClick={toggleCart}>
                            <h3 className="text-xs uppercase tracking-wider font-semibold text-[#51473C] pr-2 hover:text-[#B99B6B] transition-colors">{item.name}</h3>
                          </Link>
                          <button onClick={() => toggleWishlist(item.id)} className="text-[#817569] hover:text-[#51473C] transition-colors" aria-label="Remove wishlist">
                            <X size={15} />
                          </button>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          {item.salePrice && <span className="text-xs text-[#817569]/60 line-through">₹{item.price.toLocaleString('en-IN')}</span>}
                          <span className="text-xs font-semibold text-[#51473C]">₹{(item.salePrice || item.price).toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <button 
                          onClick={() => addToCart(item, 1)}
                          className="w-full text-center border border-[#51473C] hover:bg-[#F4E9D9] hover:border-[#B99B6B] text-[#51473C] py-2 text-[10px] uppercase tracking-widest font-medium transition-colors rounded-[2px]"
                        >
                          Add To Bag
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>

        {activeDrawerTab === 'cart' && cart.length > 0 && (
          <div className="p-6 bg-[#F8F1E8] border-t border-[#E9E1D5]">
            <div className="flex justify-between text-xs uppercase tracking-widest text-[#51473C] mb-3">
              <span>Subtotal</span>
              <span className="font-semibold text-sm">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <p className="text-[11px] text-[#817569] mb-5 font-light">Taxes & shipping verified at checkout.</p>
            <button 
              onClick={() => {
                toggleCart();
                router.push('/checkout');
              }}
              className="w-full btn-primary py-3.5 text-xs text-center"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
