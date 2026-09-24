import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react'
import { useApp } from '../context/AppContext'

export const CartPage: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotal } = useApp()
  const [coupon, setCoupon] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)

  const discount = couponApplied ? Math.round(cartTotal * 0.1) : 0
  const gst = Math.round((cartTotal - discount) * 0.18)
  const grandTotal = cartTotal - discount + gst

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault()
    if (coupon.trim().toUpperCase() === 'LENIVA10') {
      setCouponApplied(true)
    } else {
      alert('Invalid coupon code. Try "LENIVA10" for 10% off consumables!')
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="bg-slate-50 min-h-[70vh] flex items-center justify-center py-16">
        <div className="bg-white rounded-3xl p-10 max-w-md w-full text-center border border-slate-200 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-950">Your Shopping Cart is Empty</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Browse our consumables, resins, filaments, and replacement accessories to stock up your workshop.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl transition-colors shadow"
          >
            <span>Explore Shop Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">Shopping Cart</h1>
          <button
            onClick={clearCart}
            className="text-xs text-slate-400 hover:text-rose-600 font-semibold"
          >
            Clear All Items
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Table List */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
            {cartItems.map(item => (
              <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl border border-slate-200 shrink-0" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-950">{item.name}</h3>
                    {item.selectedColor && (
                      <span className="text-[11px] text-slate-500 block">Color: {item.selectedColor}</span>
                    )}
                    <span className="text-xs font-bold text-slate-900 mt-1 block">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Quantity and Subtotal */}
                <div className="flex items-center justify-between sm:justify-end space-x-6 w-full sm:w-auto">
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1.5 hover:bg-slate-100 text-slate-600"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-slate-900">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1.5 hover:bg-slate-100 text-slate-600"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="text-sm font-bold text-slate-950 w-24 text-right">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-slate-950 border-b border-slate-100 pb-3">Order Summary</h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Items Subtotal:</span>
                <span className="font-semibold text-slate-900">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>

              {couponApplied && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>10% Discount (LENIVA10):</span>
                  <span>- ₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Standard GST (18%):</span>
                <span className="font-semibold text-slate-900">₹{gst.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Pan-India Shipping:</span>
                <span className="font-semibold text-emerald-600 uppercase text-[10px]">Free Express</span>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-between text-sm font-black text-slate-950">
                <span>Total Amount:</span>
                <span>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                value={coupon}
                onChange={e => setCoupon(e.target.value)}
                placeholder="Coupon code (try LENIVA10)"
                className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none uppercase"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors"
              >
                Apply
              </button>
            </form>

            <Link
              to="/checkout"
              className="w-full py-3 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow transition-colors flex items-center justify-center space-x-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="text-[11px] text-slate-400 flex items-center justify-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Tax Invoice with Input GST Credit Provided</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CartPage
