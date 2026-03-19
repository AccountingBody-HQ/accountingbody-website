'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Temporary', 'Internship']
const roleTitles = ['Accountant','Bookkeeper','CFO','Tax Advisor','Auditor','Payroll Manager','Finance Director','Management Accountant','Financial Controller','Credit Controller','Accounts Assistant','Practice Manager','Other']

export default function PostAJobPage() {
  const [form, setForm] = useState({ company_name: '', contact_email: '', job_title: '', location: '', job_type: '', salary_range: '', description: '', requirements: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    const { error } = await supabase.from('job_listings').insert([form])
    if (error) { console.error(error); setStatus('error') } else { setStatus('success') }
  }

  return (
    <main className="min-h-screen bg-[#faf9f7]">
      <section className="bg-[#0f2444] text-white py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#c9963f] text-sm font-semibold tracking-widest uppercase mb-3">Employers</p>
          <h1 className="text-4xl font-bold mb-4">Post a Job</h1>
          <p className="text-blue-200 text-lg">Reach qualified accounting and finance professionals across the UK.</p>
        </div>
      </section>
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          {status === 'success' ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-12 text-center">
              <div className="text-5xl mb-5">✅</div>
              <h2 className="text-2xl font-bold text-green-800 mb-3">Job Submitted</h2>
              <p className="text-green-700">We will review your listing and publish it within one business day.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 space-y-6">
              <h2 className="text-xl font-bold text-[#0f2444]">Company Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#0f2444] mb-2">Company Name *</label>
                  <input required type="text" value={form.company_name} onChange={(e) => setForm({ ...form, company_name: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#c9963f]" placeholder="Your company name" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0f2444] mb-2">Contact Email *</label>
                  <input required type="email" value={form.contact_email} onChange={(e) => setForm({ ...form, contact_email: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#c9963f]" placeholder="hiring@yourcompany.com" />
                </div>
              </div>
              <hr className="border-gray-100" />
              <h2 className="text-xl font-bold text-[#0f2444]">Role Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#0f2444] mb-2">Job Title *</label>
                  <select required value={form.job_title} onChange={(e) => setForm({ ...form, job_title: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#c9963f] bg-white">
                    <option value="">Select a role</option>
                    {roleTitles.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0f2444] mb-2">Job Type *</label>
                  <select required value={form.job_type} onChange={(e) => setForm({ ...form, job_type: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#c9963f] bg-white">
                    <option value="">Select type</option>
                    {jobTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#0f2444] mb-2">Location *</label>
                  <input required type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#c9963f]" placeholder="e.g. London / Remote / Hybrid" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0f2444] mb-2">Salary Range</label>
                  <input type="text" value={form.salary_range} onChange={(e) => setForm({ ...form, salary_range: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#c9963f]" placeholder="e.g. £35,000 – £45,000" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0f2444] mb-2">Job Description *</label>
                <textarea required rows={5} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#c9963f]"
                  placeholder="Describe the role, responsibilities and company..." />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0f2444] mb-2">Requirements &amp; Qualifications</label>
                <textarea rows={4} value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#c9963f]"
                  placeholder="e.g. ACA/ACCA qualified, 3+ years experience..." />
              </div>
              {status === 'error' && <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>}
              <button type="submit" disabled={status === 'loading'}
                className="w-full bg-[#0f2444] hover:bg-[#1a3a6b] text-white font-semibold py-4 rounded-lg transition-colors disabled:opacity-50">
                {status === 'loading' ? 'Submitting...' : 'Submit Job Listing →'}
              </button>
              <p className="text-xs text-gray-400 text-center">All listings are reviewed before going live. We aim to publish within one business day.</p>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}
