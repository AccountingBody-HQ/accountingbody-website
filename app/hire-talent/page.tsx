import Link from 'next/link'

const roleCategories = [
  { title: 'Accountant', icon: '📊' },
  { title: 'Bookkeeper', icon: '📒' },
  { title: 'CFO', icon: '👔' },
  { title: 'Tax Advisor', icon: '🧾' },
  { title: 'Auditor', icon: '🔍' },
  { title: 'Payroll Manager', icon: '💷' },
  { title: 'Finance Director', icon: '📈' },
  { title: 'Management Accountant', icon: '📋' },
  { title: 'Financial Controller', icon: '🏦' },
  { title: 'Credit Controller', icon: '💳' },
  { title: 'Accounts Assistant', icon: '🗂️' },
  { title: 'Practice Manager', icon: '🏢' },
]

export default function HireTalentPage() {
  return (
    <main className="min-h-screen bg-[#faf9f7]">
      <section className="bg-[#0f2444] text-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#c9963f] text-sm font-semibold tracking-widest uppercase mb-4">Talent Marketplace</p>
              <h1 className="text-5xl font-bold mb-6 leading-tight">Find Top Accounting &amp; Finance Talent</h1>
              <p className="text-blue-200 text-lg mb-10 leading-relaxed">
                Connect with qualified accounting professionals across the UK — from bookkeepers to CFOs. Post a role or browse open positions today.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/hire-talent/post-a-job" className="bg-[#c9963f] hover:bg-[#b8852e] text-white font-semibold px-8 py-4 rounded-lg transition-colors">Post a Job</Link>
                <Link href="/hire-talent/jobs" className="border border-white/30 hover:border-white text-white font-semibold px-8 py-4 rounded-lg transition-colors">Browse Jobs</Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Specialist Platform', value: 'Accounting' },
                { label: 'Coverage', value: 'UK Wide' },
                { label: 'Role Types', value: '12+' },
                { label: 'Response Time', value: '< 24hrs' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/10 rounded-2xl p-6 text-center">
                  <div className="text-xl font-bold text-[#c9963f] mb-1">{stat.value}</div>
                  <div className="text-sm text-blue-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-[#0f2444] mb-4">Browse by Role</h2>
            <p className="text-gray-500 text-lg">Roles across every accounting and finance specialism.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {roleCategories.map((role) => (
              <Link key={role.title} href={`/hire-talent/jobs?role=${encodeURIComponent(role.title)}`}
                className="bg-white border border-gray-100 rounded-2xl p-6 text-center hover:border-[#c9963f] hover:shadow-md transition-all group">
                <div className="text-3xl mb-3">{role.icon}</div>
                <h3 className="font-bold text-[#0f2444] text-sm group-hover:text-[#c9963f] transition-colors">{role.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-10 border border-gray-100 shadow-sm">
            <h3 className="text-2xl font-bold text-[#0f2444] mb-6">For Employers</h3>
            <ul className="space-y-4 text-gray-600 text-sm mb-8">
              {['Post jobs to a targeted accounting audience','Reach qualified professionals across the UK','Receive applications directly to your inbox','Hire faster with pre-screened candidates'].map((item) => (
                <li key={item} className="flex items-start gap-3"><span className="text-[#c9963f] font-bold mt-0.5">✓</span>{item}</li>
              ))}
            </ul>
            <Link href="/hire-talent/post-a-job" className="inline-block bg-[#0f2444] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#1a3a6b] transition-colors text-sm">Post a Job →</Link>
          </div>
          <div className="bg-[#0f2444] text-white rounded-2xl p-10">
            <h3 className="text-2xl font-bold mb-6">For Job Seekers</h3>
            <ul className="space-y-4 text-blue-200 text-sm mb-8">
              {['Browse roles matched to your specialism','Apply directly through the platform','Roles from firms and businesses across the UK','Dedicated accounting and finance focus'].map((item) => (
                <li key={item} className="flex items-start gap-3"><span className="text-[#c9963f] font-bold mt-0.5">✓</span>{item}</li>
              ))}
            </ul>
            <Link href="/hire-talent/jobs" className="inline-block bg-[#c9963f] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#b8852e] transition-colors text-sm">Browse Jobs →</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
