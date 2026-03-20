// components/CardGrid.tsx
// AccountingBody — Versatile card grid
// Pinned cards always render first. Three visual variants.
'use client'
import Link from 'next/link'
import React from 'react'

const ICON_MAP: Record<string, React.ReactNode> = {
  'book': <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeWidth="1.75" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
  'calculator': <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeWidth="1.75" d="M9 7H7a1 1 0 00-1 1v8a1 1 0 001 1h10a1 1 0 001-1V8a1 1 0 00-1-1h-2M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2M9 7h6" /></svg>,
  'chart-bar': <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeWidth="1.75" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  'question-circle': <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeWidth="1.75" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  'graduation-cap': <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeWidth="1.75" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>,
  'file-text': <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeWidth="1.75" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  'clipboard-check': <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeWidth="1.75" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
  'users': <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeWidth="1.75" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  'trending-up': <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeWidth="1.75" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
  'clock': <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="1.75" stroke="currentColor" fill="none" /><path strokeLinecap="round" strokeWidth="1.75" d="M12 6v6l4 2" /></svg>,
  'globe': <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeWidth="1.75" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" /></svg>,
  'receipt': <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeWidth="1.75" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" /></svg>,
  'star': <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeWidth="1.75" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
  'default': <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeWidth="1.75" d="M4 6h16M4 12h16M4 18h7" /></svg>,
}

export interface CategoryCard {
  id:           string
  title:        string
  href:         string
  description?: string
  count?:       string | number
  iconName?:    string
  accentClass?: string
  iconBg?:      string
  iconColor?:   string
  pinned?:      boolean
  badge?:       string
  highlights?:  string[]
}

export interface ManualCard {
  _id:          string
  title:        string
  href:         string
  description?: string
  iconName?:    string
  pinned?:      boolean
  badge?:       string
  accentClass?: string
}

export interface CardGridProps {
  categories?:  CategoryCard[]
  manualCards?: ManualCard[]
  columns?:     2 | 3 | 4 | 5
  variant?:     'default' | 'compact' | 'icon-grid'
  className?:   string
}

function getIcon(name?: string): React.ReactNode {
  if (!name) return ICON_MAP['default']
  return ICON_MAP[name] ?? ICON_MAP['default']
}

function mergeAndSort(categories: CategoryCard[], manualCards: ManualCard[]): CategoryCard[] {
  const fromManual: CategoryCard[] = manualCards.map(m => ({
    id: m._id, title: m.title, href: m.href,
    description: m.description, iconName: m.iconName,
    pinned: m.pinned, badge: m.badge, accentClass: m.accentClass,
  }))
  const all = [...categories, ...fromManual]
  return [...all.filter(c => c.pinned), ...all.filter(c => !c.pinned)]
}

const COL_CLASSES: Record<number, string> = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
}

function DefaultCard({ card }: { card: CategoryCard }) {
  const iconBg    = card.iconBg    ?? 'bg-navy-950'
  const iconColor = card.iconColor ?? 'text-white'
  const accent    = card.accentClass ?? 'bg-navy-600'
  return (
    <Link href={card.href} className="group flex flex-col bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
      <div className={['h-1', accent].join(' ')} />
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-4">
          <div className={['w-10 h-10 rounded-lg flex items-center justify-center', iconBg, iconColor].join(' ')}>
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
                <span className={['w-1.5 h-1.5 rounded-full shrink-0', accent].join(' ')} />{h}
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

function CompactCard({ card }: { card: CategoryCard }) {
  const iconBg    = card.iconBg    ?? 'bg-navy-50'
  const iconColor = card.iconColor ?? 'text-navy-700'
  return (
    <Link href={card.href} className="group flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-white hover:border-navy-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className={['w-9 h-9 rounded-lg flex items-center justify-center shrink-0', iconBg, iconColor].join(' ')}>
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

function IconGridCard({ card }: { card: CategoryCard }) {
  const iconBg    = card.iconBg    ?? 'bg-navy-950'
  const iconColor = card.iconColor ?? 'text-white'
  return (
    <Link href={card.href} className="group flex flex-col items-center text-center p-6 rounded-xl border border-slate-200 bg-white hover:shadow-lg hover:-translate-y-1 hover:border-navy-200 transition-all duration-200">
      <div className={['w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200', iconBg, iconColor].join(' ')}>
        {getIcon(card.iconName)}
      </div>
      <h3 className="font-semibold text-sm text-navy-950 leading-snug group-hover:text-navy-700 transition-colors">{card.title}</h3>
      {card.count !== undefined && <p className="text-xs text-slate-400 mt-1">{card.count}</p>}
      {card.badge && <span className="mt-2 text-2xs font-semibold px-2 py-0.5 rounded-full bg-gold-50 text-gold-600">{card.badge}</span>}
    </Link>
  )
}

export default function CardGrid({
  categories  = [],
  manualCards = [],
  columns     = 3,
  variant     = 'default',
  className   = '',
}: CardGridProps) {
  const cards     = mergeAndSort(categories, manualCards)
  if (cards.length === 0) return null
  const gridClass = COL_CLASSES[columns] ?? COL_CLASSES[3]
  return (
    <div className={['grid gap-4', gridClass, className].join(' ')}>
      {cards.map((card, i) => {
        const key = card.id ?? String(i)
        if (variant === 'compact')   return <CompactCard  key={key} card={card} />
        if (variant === 'icon-grid') return <IconGridCard key={key} card={card} />
        return                              <DefaultCard  key={key} card={card} />
      })}
    </div>
  )
}