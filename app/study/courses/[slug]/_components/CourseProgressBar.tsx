// app/study/courses/[slug]/_components/CourseProgressBar.tsx
'use client'

import { useCourseProgress } from '@/hooks/useCourseProgress'

interface Props {
  courseSlug:   string
  totalLessons: number
}

export default function CourseProgressBar({ courseSlug, totalLessons }: Props) {
  const { completedCount, mounted } = useCourseProgress(courseSlug)
  if (!mounted || completedCount === 0) return null

  const pct = Math.round((completedCount / totalLessons) * 100)

  return (
    <div className="bg-white border-b border-slate-200">
      <div className="container-site py-4">
        <div className="flex items-center gap-4 max-w-3xl">
          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-teal-500 rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-sm font-semibold text-navy-950 shrink-0">
            {completedCount}/{totalLessons} completed
          </span>
          {pct === 100 && (
            <span className="text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full shrink-0">
              🎉 Complete
            </span>
          )}
        </div>
      </div>
    </div>
  )
}