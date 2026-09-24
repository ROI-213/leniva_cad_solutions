import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Service } from '../types'
import { useApp } from '../context/AppContext'

interface ServiceCardProps {
  service: Service
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { openQuoteModal } = useApp()

  return (
    <div className="bg-white rounded-2xl border border-slate-200 hover:border-red-300 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {service.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur-sm text-white rounded-md">
            {service.badge}
          </span>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <Link to={`/services/${service.slug}`} className="block">
            <h3 className="text-base font-bold text-slate-950 group-hover:text-red-600 transition-colors">
              {service.title}
            </h3>
          </Link>
          <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
            {service.shortDescription}
          </p>

          {/* Key Advantages Checklist */}
          {service.advantages && service.advantages.length > 0 && (
            <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5">
              {service.advantages.slice(0, 2).map((adv, idx) => (
                <div key={idx} className="flex items-start space-x-1.5 text-[11px] text-slate-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{adv}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-2 flex items-center gap-2">
          <Link
            to={`/services/${service.slug}`}
            className="flex-1 py-2 px-3 text-center text-xs font-semibold text-slate-700 hover:text-red-600 bg-slate-100 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center space-x-1"
          >
            <span>Learn More</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={() => openQuoteModal(service.title)}
            className="flex-1 py-2 px-3 text-center text-xs font-bold text-white bg-slate-900 hover:bg-red-600 rounded-lg shadow-sm transition-colors"
          >
            Enquire Now
          </button>
        </div>
      </div>
    </div>
  )
}
export default ServiceCard
