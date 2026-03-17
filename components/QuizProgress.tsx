'use client'

interface Props {
  current:  number
  total:    number
  answered: number
}

export default function QuizProgress({ current, total, answered }: Props) {
  const pct = total > 0 ? Math.round((answered / total) * 100) : 0

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
        <span className="font-medium text-navy-950">
          Question {current} of {total}
        </span>
        <span>{answered} of {total} answered</span>
      </div>
      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-navy-950 rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
