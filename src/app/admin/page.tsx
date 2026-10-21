"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fallbackProducts } from "@/data/products";
import { Product } from "@/store/useStore";
import { blogPosts } from "@/data/blogPosts";
import { 
  Package, 
  Sparkles, 
  ShoppingBag, 
  BookOpen, 
  Star, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  LogOut, 
  Lock, 
  CheckCircle2,
  Clock,
  ArrowLeft
} from "lucide-react";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [activeTab, setActiveTab] = useState<"products" | "orders" | "blog" | "reviews">("products");

  // Local state for products
  const [productsList, setProductsList] = useState<Product[]>(fallbackProducts);
  
  // Sample Orders with Kundali Data
  const [ordersList, setOrdersList] = useState<any[]>([
    {
      id: "RTC-84920",
      date: "21 Oct 2026, 02:40 PM",
      customer: "Ananya Sharma",
      email: "ananya.sharma@example.com",
      phone: "+91 98111 22233",
      destination: "Noida, Uttar Pradesh (201301)",
      status: "108 Mantra Japa in Progress",
      total: 2899,
      paymentMethod: "Razorpay (Prepaid)",
      items: [
        {
          name: "Triple Synergy Mixel Abundance Bracelet",
          size: "8mm",
          qty: 1,
          kundliDetails: {
            fullName: "Ananya Sharma",
            dob: "1994-08-14",
            tob: "08:15 AM",
            pob: "Varanasi, UP",
            intention: "Career promotion & financial luck",
          }
        }
      ]
    },
    {
      id: "RTC-73912",
      date: "20 Oct 2026, 06:15 PM",
      customer: "Vikram Malhotra",
      email: "vikram.m@example.com",
      phone: "+91 98200 44556",
      destination: "Mumbai, Maharashtra (400050)",
      status: "Packed & Sealed with Raksha Sutra",
      total: 2299,
      paymentMethod: "Cash on Delivery (COD)",
      items: [
        {
          name: "Heart Armor Mixel Bracelet (Rose Quartz + Tourmaline)",
          size: "10mm",
          qty: 1,
        }
      ]
    }
  ]);

  // New Product Form
  const [newProdName, setNewProdName] = useState("");
  const [newProdPrice, setNewProdPrice] = useState("");
  const [newProdSalePrice, setNewProdSalePrice] = useState("");
  const [newProdCategory, setNewProdCategory] = useState("Heal Energized Bracelets");
  const [newProdIntention, setNewProdIntention] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === "riya108" || passcode.trim() === "admin108" || passcode.trim() === "divine108") {
      setIsAuthenticated(true);
      setErrorMsg("");
    } else {
      setErrorMsg("Invalid sanctuary passcode. Hint: Use 'riya108' to access administrative console.");
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim() || !newProdPrice) return;

    const newP: Product = {
      id: `prod-${Date.now()}`,
      name: newProdName.trim(),
      description: "Consecrated gemstone handcrafted with natural earth minerals.",
      shortIntention: newProdIntention.trim() || "Spiritual Vitality & Abundance",
      price: Number(newProdPrice),
      salePrice: newProdSalePrice ? Number(newProdSalePrice) : Number(newProdPrice),
      category: newProdCategory,
      image: "/images/products/amethyst-new.jpg",
      benefits: ["100% natural earth gemstone", "Purified and energized with Vedic mantras"],
      rating: 5.0,
      reviewCount: 1,
      inStock: true,
    } as any;

    setProductsList([newP, ...productsList]);
    setNewProdName("");
    setNewProdPrice("");
    setNewProdSalePrice("");
    setNewProdIntention("");
    alert("✨ Product added to live catalog successfully!");
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("Are you sure you wish to remove this product from the catalog?")) {
      setProductsList(productsList.filter((p) => p.id !== id));
    }
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    setOrdersList(
      ordersList.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  // 1. Password Protected Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen py-24 flex items-center justify-center bg-[#FBF8F3] px-4 text-[#2B1B3D]">
        <div className="max-w-md w-full p-8 sm:p-10 rounded-3xl bg-white border border-[#EFE9E2] shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#F5F0FD] border border-[#7B4FC9]/30 text-[#7B4FC9] flex items-center justify-center mx-auto shadow-xs">
            <Lock size={26} />
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#8E6D24] block mb-1">
              Internal Management
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1B3D]">
              Sanctuary Admin Console
            </h1>
            <p className="text-xs text-[#635572] mt-1">
              Enter the master passcode to manage product catalog, Kundali orders, and journal articles.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter master passcode (e.g. riya108)..."
                className="w-full px-4 py-3 rounded-2xl bg-[#FBF8F3] border border-[#EFE9E2] text-xs text-[#2B1B3D] text-center tracking-widest focus:outline-none focus:border-[#C9A24D]"
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-[#C62828] bg-[#FFF1F2] p-2.5 rounded-xl border border-rose-200">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-full text-xs font-semibold uppercase tracking-wider text-white btn-amethyst shadow-md cursor-pointer"
            >
              Enter Dashboard
            </button>
          </form>

          <Link href="/" className="inline-block text-xs text-[#635572] hover:text-[#7B4FC9]">
            ← Return to Sanctuary Storefront
          </Link>
        </div>
      </div>
    );
  }

  // 2. Authenticated Admin Dashboard
  return (
    <div className="min-h-screen py-10 sm:py-16 bg-[#FBF8F3] text-[#2B1B3D]">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EFE9E2] mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#8E6D24]">
              Riya Tarot Crystals • Master Management
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1B3D]">
              Administrative Sanctuary
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="px-4 py-2 rounded-full text-xs font-semibold bg-white border border-[#EFE9E2] text-[#2B1B3D] hover:border-[#C9A24D]"
            >
              View Live Storefront ↗
            </Link>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 rounded-full text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 hover:bg-rose-100 flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut size={13} />
              <span>Lock Console</span>
            </button>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex gap-2 border-b border-[#EFE9E2] pb-3 mb-8 overflow-x-auto no-scrollbar text-xs font-semibold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab("products")}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === "products"
                ? "bg-[#7B4FC9] text-white shadow-xs font-bold"
                : "text-[#635572] hover:bg-white"
            }`}
          >
            Products ({productsList.length})
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === "orders"
                ? "bg-[#7B4FC9] text-white shadow-xs font-bold"
                : "text-[#635572] hover:bg-white"
            }`}
          >
            Orders & Kundali ({ordersList.length})
          </button>

          <button
            onClick={() => setActiveTab("blog")}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === "blog"
                ? "bg-[#7B4FC9] text-white shadow-xs font-bold"
                : "text-[#635572] hover:bg-white"
            }`}
          >
            Journal Articles ({blogPosts.length})
          </button>
        </div>

        {/* TAB 1: PRODUCTS */}
        {activeTab === "products" && (
          <div className="space-y-8">
            {/* Quick Add Product Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EFE9E2] shadow-xs space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#2B1B3D] flex items-center gap-2">
                <Plus size={18} className="text-[#C9A24D]" />
                <span>Add New Consecrated Gemstone</span>
              </h3>

              <form onSubmit={handleAddProduct} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <input
                  type="text"
                  required
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="Product Name (e.g. Celestial Larimar Bracelet)..."
                  className="px-3.5 py-2.5 rounded-xl bg-[#FBF8F3] border border-[#EFE9E2] text-[#2B1B3D]"
                />
                <input
                  type="number"
                  required
                  value={newProdPrice}
                  onChange={(e) => setNewProdPrice(e.target.value)}
                  placeholder="Regular Price ₹ (e.g. 2999)..."
                  className="px-3.5 py-2.5 rounded-xl bg-[#FBF8F3] border border-[#EFE9E2] text-[#2B1B3D]"
                />
                <input
                  type="number"
                  value={newProdSalePrice}
                  onChange={(e) => setNewProdSalePrice(e.target.value)}
                  placeholder="Sale Price ₹ (e.g. 1499)..."
                  className="px-3.5 py-2.5 rounded-xl bg-[#FBF8F3] border border-[#EFE9E2] text-[#2B1B3D]"
                />
                <input
                  type="text"
                  value={newProdIntention}
                  onChange={(e) => setNewProdIntention(e.target.value)}
                  placeholder="Short Intention (e.g. Emotional Peace & Anxiety)..."
                  className="sm:col-span-2 px-3.5 py-2.5 rounded-xl bg-[#FBF8F3] border border-[#EFE9E2] text-[#2B1B3D]"
                />
                <button
                  type="submit"
                  className="py-2.5 px-6 rounded-xl text-xs font-semibold uppercase tracking-wider text-white btn-amethyst cursor-pointer shadow-xs"
                >
                  + Add to Catalog
                </button>
              </form>
            </div>

            {/* Products Table */}
            <div className="rounded-3xl bg-white border border-[#EFE9E2] overflow-hidden shadow-xs">
              <div className="p-4 sm:p-6 border-b border-[#EFE9E2] flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-[#2B1B3D]">
                  Current Product Catalog ({productsList.length} items)
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF8F3] text-[#8E6D24] uppercase text-[10px] tracking-wider border-b border-[#EFE9E2]">
                    <tr>
                      <th className="py-3 px-4">Item</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Rating</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFE9E2]">
                    {productsList.map((prod) => (
                      <tr key={prod.id} className="hover:bg-[#FBF8F3]/50">
                        <td className="py-3 px-4 font-semibold text-[#2B1B3D] max-w-xs truncate">
                          {prod.name}
                        </td>
                        <td className="py-3 px-4 text-[#635572]">{prod.category}</td>
                        <td className="py-3 px-4 font-bold text-[#2B1B3D]">
                          ₹{(prod.salePrice || prod.price).toLocaleString("en-IN")}
                        </td>
                        <td className="py-3 px-4 text-[#8E6D24]">★ {prod.rating}</td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleDeleteProduct(prod.id)}
                            className="p-1.5 text-[#635572] hover:text-rose-600 transition-colors cursor-pointer"
                            title="Delete product"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS & KUNDALI */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            {ordersList.map((order) => (
              <div key={order.id} className="p-6 rounded-3xl bg-white border border-[#EFE9E2] shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#EFE9E2]">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#7B4FC9]">#{order.id}</span>
                    <span className="text-[11px] text-[#635572] ml-2">• {order.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#2B1B3D]">₹{order.total}</span>
                    <span className="text-[10px] text-[#8E6D24] bg-[#F7EFE2] px-2.5 py-0.5 rounded-full font-semibold">
                      {order.paymentMethod}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#635572]">
                  <div>
                    <span className="font-bold text-[#2B1B3D] block">{order.customer}</span>
                    <span>{order.email} • {order.phone}</span>
                    <span className="block mt-0.5">{order.destination}</span>
                  </div>

                  {/* Status Dropdown */}
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#8E6D24] block mb-1">
                      Consecration Stage:
                    </span>
                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF8F3] border border-[#EFE9E2] text-xs text-[#2B1B3D]"
                    >
                      <option value="108 Mantra Japa in Progress">108 Mantra Japa in Progress</option>
                      <option value="Himalayan Salt Purification">Himalayan Salt Purification</option>
                      <option value="Packed & Sealed with Raksha Sutra">Packed & Sealed with Raksha Sutra</option>
                      <option value="Dispatched via Bluedart Air">Dispatched via Bluedart Air</option>
                      <option value="Delivered & Attuned">Delivered & Attuned</option>
                    </select>
                  </div>
                </div>

                {/* Kundali Details Display */}
                {order.items[0]?.kundliDetails && (
                  <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#C9A24D]/40 text-xs space-y-1">
                    <span className="font-bold text-[#8E6D24] uppercase text-[10px] flex items-center gap-1">
                      <Sparkles size={11} /> Bespoke Birth Consecration Data:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-[#2B1B3D] pt-1">
                      <div><strong>Wearer:</strong> {order.items[0].kundliDetails.fullName}</div>
                      <div><strong>DOB:</strong> {order.items[0].kundliDetails.dob}</div>
                      <div><strong>Time:</strong> {order.items[0].kundliDetails.tob || "N/A"}</div>
                      <div><strong>Birth Place:</strong> {order.items[0].kundliDetails.pob || "N/A"}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: BLOG ARTICLES */}
        {activeTab === "blog" && (
          <div className="rounded-3xl bg-white border border-[#EFE9E2] overflow-hidden shadow-xs">
            <div className="p-6 border-b border-[#EFE9E2]">
              <h3 className="font-serif text-lg font-bold text-[#2B1B3D]">
                Crystal Library Articles ({blogPosts.length} Seeded Posts)
              </h3>
            </div>
            <div className="divide-y divide-[#EFE9E2]">
              {blogPosts.map((post) => (
                <div key={post.slug} className="p-5 flex items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-[#8E6D24] uppercase block">
                      {post.category} • {post.readTime}
                    </span>
                    <h4 className="font-serif text-sm font-bold text-[#2B1B3D]">{post.title}</h4>
                    <span className="text-[#635572] text-[11px]">{post.publishDate} • By {post.author.name}</span>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="px-4 py-2 rounded-full text-xs font-semibold text-[#7B4FC9] bg-[#F5F0FD] hover:bg-[#7B4FC9] hover:text-white transition-colors flex-shrink-0"
                  >
                    View Live Article ↗
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
