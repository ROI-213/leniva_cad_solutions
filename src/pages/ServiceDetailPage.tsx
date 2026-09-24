import React from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import {
  ChevronRight,
  CheckCircle2,
  Phone,
  ShieldCheck,
  Layers,
} from 'lucide-react'
import { services } from '../data/services'
import { useApp } from '../context/AppContext'

interface ServiceDetailPageProps {
  forcedSlug?: string
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ forcedSlug }) => {
  const { slug: paramSlug } = useParams<{ slug: string }>()
  const slug = forcedSlug || paramSlug
  const { openQuoteModal } = useApp()

  const service = services.find(s => s.slug === slug)

  if (!service) {
    return <Navigate to="/services" replace />
  }

  return (
    <div className="bg-slate-50 min-h-screen py-8 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/services" className="hover:text-slate-900 transition-colors">Services</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-900">{service.title}</span>
        </nav>

        {/* Hero Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="px-3 py-1 bg-red-50 text-red-700 text-xs font-bold uppercase tracking-wider rounded-md border border-red-100">
              {service.badge || 'Engineering Service'}
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              {service.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {service.description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => openQuoteModal(`${service.title} Quote Request`)}
                className="px-6 py-3 bg-slate-900 hover:bg-red-600 text-white text-xs font-bold rounded-xl shadow transition-colors"
              >
                Request a Service Quote
              </button>
              <button
                onClick={() => openQuoteModal(`${service.title} Consultation Call`)}
                className="px-6 py-3 border border-slate-300 hover:border-slate-800 text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center space-x-2"
              >
                <Phone className="w-3.5 h-3.5 text-red-600" />
                <span>Consult with Engineer</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-md">
              <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Step-by-Step Workflow Process */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">Standard Operating Procedure</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mt-1">
              Service Execution Workflow
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              How our application engineers take your project from CAD file or physical component to finished, verified deliverables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {service.workflow.map(step => (
              <div key={step.step} className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-3 relative group hover:border-red-300 transition-all">
                <span className="w-8 h-8 rounded-full bg-slate-900 group-hover:bg-red-600 text-white font-black text-sm flex items-center justify-center transition-colors">
                  {step.step}
                </span>
                <h3 className="text-sm font-bold text-slate-900">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Applications & Advantages */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Applications */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-950 flex items-center space-x-2">
              <Layers className="w-5 h-5 text-red-600" />
              <span>Target Applications & Use Cases</span>
            </h3>
            <ul className="space-y-2.5">
              {service.applications.map((app, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0 mt-1.5" />
                  <span>{app}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Advantages */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-950 flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Engineering Advantages</span>
            </h3>
            <ul className="space-y-2.5">
              {service.advantages.map((adv, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{adv}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Supported Materials & Hardware (if applicable) */}
        {service.supportedMaterials && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-950">Supported Engineering Materials</h3>
            <div className="flex flex-wrap gap-2">
              {service.supportedMaterials.map((mat, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-slate-100 text-slate-800 text-xs font-semibold rounded-lg border border-slate-200">
                  {mat}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA Banner */}
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-bold">Have a Project with Tight Tolerances or Deadlines?</h3>
            <p className="text-xs text-slate-400">
              Send us your 3D CAD models (STEP/STL/IGES). We sign mutual Non-Disclosure Agreements (NDAs).
            </p>
          </div>
          <button
            onClick={() => openQuoteModal(`${service.title} Project Submission`)}
            className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shrink-0 transition-colors"
          >
            Upload CAD & Request Quote
          </button>
        </div>
      </div>
    </div>
  )
}
export default ServiceDetailPage
