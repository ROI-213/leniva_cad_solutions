import React, { useState } from 'react'
import { Briefcase, MapPin, CheckCircle2 } from 'lucide-react'

export const CareersPage: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const openings = [
    {
      id: 'job-1',
      title: 'Additive Manufacturing Field Application Engineer',
      department: 'Technical Operations',
      location: 'Bengaluru / Karnataka (On-Site Client Visits)',
      type: 'Full-Time',
      experience: '2–4 Years',
      description: 'Oversee installation, leveling, calibration, and customer training for industrial FDM and SLA 3D printers. Troubleshoot slicing and material settings.',
    },
    {
      id: 'job-2',
      title: '3D Metrology & Scanning Specialist',
      department: 'Metrology & Reverse Engineering',
      location: 'Bengaluru (Hennur Main Road)',
      type: 'Full-Time',
      experience: '1–3 Years',
      description: 'Operate optical blue-light and handheld scanners. Clean scan data, generate deviation color-maps in Geomagic, and rebuild CAD in QuickSurface.',
    },
    {
      id: 'job-3',
      title: 'CAD Software Technical Sales Specialist',
      department: 'Software Solutions',
      location: 'Bengaluru / Remote India',
      type: 'Full-Time',
      experience: '2–5 Years',
      description: 'Consult with architecture firms, interior studios, and engineering teams to demonstrate Trimble SketchUp Pro, Enscape VR, and Chaos V-Ray solutions.',
    },
  ]

  return (
    <div className="bg-slate-50 min-h-screen py-10 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Hero Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600">Join Our Team</span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Careers at Leniva CAD Solutions
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Work at the forefront of digital design, additive manufacturing, and metrology. Join a high-caliber team of engineers empowering India's manufacturing renaissance.
          </p>
        </div>

        {/* Current Job Openings */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-950">Current Engineering Openings</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {openings.map(job => (
              <div
                key={job.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-red-300 hover:shadow-lg transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-red-50 text-red-700 rounded-md">
                    {job.department}
                  </span>
                  <h3 className="text-base font-bold text-slate-950">{job.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{job.description}</p>

                  <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 space-y-1.5">
                    <div className="flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                      <span>{job.type} • Experience: {job.experience}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedJob(job.title)}
                  className="w-full py-2.5 bg-slate-900 hover:bg-red-600 text-white text-xs font-bold rounded-xl transition-colors text-center"
                >
                  Apply for this Role
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Application Modal / Form */}
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Apply: {selectedJob}</h3>
                <button onClick={() => setSelectedJob(null)} className="text-slate-400 hover:text-slate-700">✕</button>
              </div>

              {submitted ? (
                <div className="py-8 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                  <h4 className="text-base font-bold text-slate-900">Application Received</h4>
                  <p className="text-xs text-slate-500">Our HR team will review your profile and contact you soon.</p>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setSelectedJob(null)
                    }}
                    className="mt-3 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={e => {
                    e.preventDefault()
                    setSubmitted(true)
                  }}
                  className="space-y-3 text-xs"
                >
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                    <input type="text" required placeholder="Your name" className="w-full p-2 border rounded-lg outline-none" />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                    <input type="email" required placeholder="name@email.com" className="w-full p-2 border rounded-lg outline-none" />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                    <input type="tel" required placeholder="+91 98765 43210" className="w-full p-2 border rounded-lg outline-none" />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">LinkedIn / Portfolio URL</label>
                    <input type="url" placeholder="https://linkedin.com/in/..." className="w-full p-2 border rounded-lg outline-none" />
                  </div>
                  <button type="submit" className="w-full py-2.5 bg-red-600 text-white font-bold rounded-lg mt-2">
                    Submit Application
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default CareersPage
