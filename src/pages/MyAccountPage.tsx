import React, { useState } from 'react'
import { User, Package, FileText } from 'lucide-react'
import { siteConfig } from '../data/siteConfig'

export const MyAccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'quotes' | 'orders'>('quotes')

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">Client Portal</h1>
          <p className="text-xs text-slate-500 mt-1">Manage corporate quotations, service requests, and order history.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-3 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <button
              onClick={() => setActiveTab('quotes')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center space-x-2.5 ${
                activeTab === 'quotes' ? 'bg-red-50 text-red-700' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Quotation Requests</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center space-x-2.5 ${
                activeTab === 'orders' ? 'bg-red-50 text-red-700' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Consumables Orders</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center space-x-2.5 ${
                activeTab === 'profile' ? 'bg-red-50 text-red-700' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Corporate Profile</span>
            </button>
          </div>

          {/* Main Tab Panel */}
          <div className="lg:col-span-9 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            {activeTab === 'quotes' && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-base font-bold text-slate-950">Active Quotation Inquiries</h3>
                  <p className="text-xs text-slate-500">Track responses and engineering proposals submitted through our portal.</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Pratham 3 Rapid Industrial 3D Printer</span>
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-800 font-semibold rounded text-[10px]">Under Engineering Review</span>
                  </div>
                  <p className="text-slate-500 text-[11px]">Inquiry logged on Sep 22, 2026. Our technical sales manager is preparing proforma and delivery schedule.</p>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-base font-bold text-slate-950">Recent Consumables Orders</h3>
                  <p className="text-xs text-slate-500">Filaments, resins, and spare parts purchases.</p>
                </div>

                <p className="text-xs text-slate-500 py-6 text-center">
                  No previous online shop orders found under this session.
                </p>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-base font-bold text-slate-950">Company Profile Settings</h3>
                  <p className="text-xs text-slate-500">Manage billing address and technical contact points.</p>
                </div>

                <div className="space-y-3 text-xs text-slate-600 max-w-md">
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-1">Company Contact</strong>
                    <span>Apex Engineering Innovations</span>
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-1">Assigned Account Manager</strong>
                    <span>Bengaluru Corporate Sales Desk (<a href={`tel:${siteConfig.phone}`} className="text-red-600 font-semibold">{siteConfig.phone}</a>)</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default MyAccountPage
