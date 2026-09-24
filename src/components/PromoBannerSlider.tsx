import React, { useState, useEffect } from 'react'

const promoBanners = [
  {
    id: 1,
    image: '/images/banners/promo-banner-1-hd.png',
    alt: 'Industrial Grade 3D Printing Solutions – Powering Bigger Ideas',
    title: 'Powering Bigger Ideas',
  },
  {
    id: 2,
    image: '/images/banners/promo-banner-2-hd.png',
    alt: 'Precision Speed Limitless Possibilities – EKA Resin 3D Printers',
    title: 'Precision Speed Limitless Possibilities',
  },
  {
    id: 3,
    image: '/images/banners/promo-banner-3-hd.png',
    alt: 'Large Ideas Real Results – Pratham 5.0 & Pratham 3 Rapid 3D Printers',
    title: 'Large Ideas Real Results',
  },
]

export const PromoBannerSlider: React.FC = () => {
  const [current, setCurrent] = useState(0)

  // Auto-scroll one after another every 2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % promoBanners.length)
    }, 2000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-8">
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 bg-slate-900">
        {/* Slides Container - Clean and free of all overlays, badges, chevrons, or dots */}
        <div className="relative w-full aspect-[2560/862] min-h-[180px] sm:min-h-[260px] md:min-h-[340px] bg-slate-950">
          {promoBanners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={`${banner.image}?v=clean_hd_${Date.now()}`}
                alt={banner.alt}
                className="w-full h-full object-cover select-none"
                style={{
                  backfaceVisibility: 'hidden',
                  imageRendering: 'auto',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PromoBannerSlider
