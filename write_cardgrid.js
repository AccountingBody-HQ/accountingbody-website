const fs = require('fs');

const chunk3 = `
function DefaultCard({ card }) {
  const iconBg    = card.iconBg    ?? 'bg-navy-950'
  const iconColor = card.iconColor ?? 'text-white'
  const accent    = card.accentClass ?? 'bg-navy-600'
  return (
    <Link href={card.href} className="group flex flex-col bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
      <div className={\`h-1 \${accent}\`} />
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-4">
          <div className={\`w-10 h-10 rounded-lg flex items-center justify-center \${iconBg} \${iconColor}\`}>
            {getIcon(card.iconName)}
          </div>
          {card.badge && (
            <span className="text-2xs font-semibold px-2 py-0.5 rounded-full bg-gold-50 text-gold-600 border border-gold-200">{card.badge}</span>
          )}
          {!card.badge && card.pinned && (
            <span className="text-2xs font-semibold px-2 py-0.5 rounded-full bg-navy-50 text-navy-600 border border-navy-200">Featured</span>
          )}
        </div>
        <h3 className="font-display text-base text-navy-950 leading-snug mb-2 group-hover:text-navy-700 transition-colors">{card.title}</h3>
        {card.description && (
          <p className="text-xs text-slate-500 leading-relaxed mb-3 flex-1">{card.description}</p>
        )}
        {card.highlights?.length ? (
          <ul className="space-y-1 mb-4">
            {card.highlights.map(h => (
              <li key={h} className="flex items-center gap-2 text-xs text-slate-600">
                <span className={\`w-1.5 h-1.5 rounded-full shrink-0 \${accent}\`} />{h}
              </li>
            ))}
          </ul>
        ) : null}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
          {card.count !== undefined ? (
            <span className="text-xs text-slate-400 font-medium">{card.count} articles</span>
          ) : <span />}
          <span className="flex items-center gap-1 text-xs font-semibold text-navy-600 group-hover:gap-2 transition-all">
            Explore
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </span>
        </div>
      </div>
    </Link>
  )
}

function CompactCard({ card }) {
  const iconBg    = card.iconBg    ?? 'bg-navy-50'
  const iconColor = card.iconColor ?? 'text-navy-700'
  return (
    <Link href={card.href} className="group flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-white hover:border-navy-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className={\`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 \${iconBg} \${iconColor}\`}>
        {getIcon(card.iconName)}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-navy-950 leading-snug group-hover:text-navy-700 transition-colors truncate">{card.title}</p>
        {card.count !== undefined && <p className="text-xs text-slate-400">{card.count} articles</p>}
        {card.description && card.count === undefined && <p className="text-xs text-slate-500 truncate">{card.description}</p>}
      </div>
      {card.pinned && <div className="w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0" />}
    </Link>
  )
}

function IconGridCard({ card }) {
  const iconBg    = card.iconBg    ?? 'bg-navy-950'
  const iconColor = card.iconColor ?? 'text-white'
  return (
    <Link href={card.href} className="group flex flex-col items-center text-center p-6 rounded-xl border border-slate-200 bg-white hover:shadow-lg hover:-translate-y-1 hover:border-navy-200 transition-all duration-200">
      <div className={\`w-12 h-12 rounded-xl flex items-center justify-center mb-3 \${iconBg} \${iconColor} group-hover:scale-110 transition-transform duration-200\`}>
        {getIcon(card.iconName)}
      </div>
      <h3 className="font-semibold text-sm text-navy-950 leading-snug group-hover:text-navy-700 transition-colors">{card.title}</h3>
      {card.count !== undefined && <p className="text-xs text-slate-400 mt-1">{card.count}</p>}
      {card.badge && <span className="mt-2 text-2xs font-semibold px-2 py-0.5 rounded-full bg-gold-50 text-gold-600">{card.badge}</span>}
    </Link>
  )
}

export default function CardGrid({ categories = [], manualCards = [], columns = 3, variant = 'default', className = '' }) {
  const cards = mergeAndSort(categories, manualCards)
  if (cards.length === 0) return null
  const gridClass = COL_CLASSES[columns] ?? COL_CLASSES[3]
  return (
    <div className={\`grid \${gridClass} gap-4 \${className}\`}>
      {cards.map((card, i) => {
        const key = card.id ?? String(i)
        if (variant === 'compact')   return <CompactCard  key={key} card={card} />
        if (variant === 'icon-grid') return <IconGridCard key={key} card={card} />
        return                              <DefaultCard  key={key} card={card} />
      })}
    </div>
  )
}
`;

fs.appendFileSync('components/CardGrid.tsx', chunk3);
console.log('Chunks 3-5 appended OK, lines:', chunk3.split('\n').length);
