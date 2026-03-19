import Link from 'next/link'

const benefits = [
  { icon: '🌐', title: 'Global Reach', desc: 'Get discovered by businesses and individuals across the UK and beyond.' },
  { icon: '⭐', title: 'Verified Listings', desc: 'All profiles are reviewed to maintain quality and trust.' },
  { icon: '📩', title: 'Direct Enquiries', desc: 'Clients contact you directly through your profile page.' },
  { icon: '📊', title: 'Showcase Your Work', desc: 'Highlight your specialisms, qualifications and experience.' },
]

export default function FirmsFreelancersPage() {
  return (
    <main className="min-h-screen bg-[#faf9f7]">
      <section className="bg-[#0f2444] text-white py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[#c9963f] text-sm font-semibold tracking-widest uppercase mb-4">Professional Directory</p>
          <h1 className="text-5xl font-bold mb-6 leading-tight">The Accounting Firms &amp;<br />Freelancers Directory</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto mb-12">
            Find a trusted accounting firm or freelance professional — or list your practice and get discovered by clients looking for your expertise.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/firms-freelancers/directory" className="bg-[#c9963f] hover:bg-[#b8852e] text-white font-semibold px-10 py-4 rounded-lg transition-colors text-lg">Browse Directory →</Link>
            <Link href="/firms-freelancers/join" className="border border-white/30 hover:border-white text-white font-semibold px-10 py-4 rounded-lg transition-colors text-lg">List Your Practice</Link>
          </div>
        </div>
      </section>
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0f2444] mb-4">Why Join the Directory?</h2>
            <p className="text-gray-500 text-lg">Grow your practice with a profile on the UK&apos;s dedicated accounting directory.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="bg-white border border-gray-100 rounded-2xl p-8 text-center shadow-sm">
                <div className="text-4xl mb-4">{b.icon}</div>
                <h3 className="font-bold text-[#0f2444] text-lg mb-3">{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-10 border border-gray-100 shadow-sm text-center">
            <div className="text-4xl mb-5">🔍</div>
            <h3 className="text-2xl font-bold text-[#0f2444] mb-4">Looking for a Professional?</h3>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">Search our directory of verified accounting firms and freelancers by location and specialism.</p>
            <Link href="/firms-freelancers/directory" className="inline-block bg-[#0f2444] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#1a3a6b] transition-colors">Browse Directory →</Link>
          </div>
          <div className="bg-[#0f2444] text-white rounded-2xl p-10 text-center">
            <div className="text-4xl mb-5">🏢</div>
            <h3 className="text-2xl font-bold mb-4">Are You an Accountant?</h3>
            <p className="text-blue-200 text-sm mb-8 leading-relaxed">Get listed in front of thousands of businesses and individuals searching for accounting help.</p>
            <Link href="/firms-freelancers/join" className="inline-block bg-[#c9963f] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#b8852e] transition-colors">Join the Directory →</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
