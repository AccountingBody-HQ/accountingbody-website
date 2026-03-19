import Link from 'next/link'

export default function DirectoryPage() {
  return (
    <main className="min-h-screen bg-[#faf9f7]">
      <section className="bg-[#0f2444] text-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#c9963f] text-sm font-semibold tracking-widest uppercase mb-3">Directory</p>
          <h1 className="text-4xl font-bold mb-4">Accounting Firms &amp; Freelancers</h1>
          <p className="text-blue-200 text-lg">Verified accounting professionals across the UK, searchable by specialism and location.</p>
        </div>
      </section>
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center py-24">
          <div className="text-6xl mb-6">🏢</div>
          <h2 className="text-2xl font-bold text-[#0f2444] mb-3">Directory Launching Soon</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-10 leading-relaxed">
            We are building our professional directory. Be among the first to list your practice.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/firms-freelancers/join" className="inline-block bg-[#0f2444] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#1a3a6b] transition-colors">List Your Practice →</Link>
            <Link href="/get-help" className="inline-block border border-[#0f2444] text-[#0f2444] font-semibold px-8 py-4 rounded-lg hover:bg-[#0f2444] hover:text-white transition-colors">Get Matched Instead</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
