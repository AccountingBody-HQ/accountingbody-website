// app/study/courses/[slug]/lessons/[lessonSlug]/_components/LessonActions.tsx
'use client'

import Link from 'next/link'
import { useCourseProgress } from '@/hooks/useCourseProgress'

interface Props {
  courseSlug:   string
  lessonSlug:   string
  prevHref:     string | null
  nextHref:     string | null
  prevTitle:    string | null
  nextTitle:    string | null
  courseHref:   string
  isLastLesson: boolean
}

export default function LessonActions({
  courseSlug, lessonSlug,
  prevHref, nextHref,
  prevTitle, nextTitle,
  courseHref, isLastLesson,
}: Props) {
  const { markComplete, markIncomplete, isCompleted, mounted } = useCourseProgress(courseSlug)
  const done = isCompleted(lessonSlug)

  return (
    <div className="border-t border-slate-200 pt-8 space-y-6">

      {/* Mark complete button */}
      {mounted && (
        <div className="flex items-center gap-3">
          <button
            onClick={() => done ? markIncomplete(lessonSlug) : markComplete(lessonSlug)}
            className={`inline-flex items-center gap-2 h-11 px-5 rounded-lg text-sm font-semibold transition-all ${
              done
                ? 'bg-teal-500 text-white hover:bg-teal-600'
                : 'bg-white border-2 border-slate-300 text-slate-700 hover:border-navy-950 hover:text-navy-950'
            }`}
          >
            {done ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/>
                </svg>
                Lesson complete
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                  <path strokeLinecap="round" strokeWidth="2" d="M12 8v4l3 3"/>
                </svg>
                Mark as complete
              </>
            )}
          </button>
          {done && (
            <span className="text-sm text-teal-600">
              Your progress is saved automatically.
            </span>
          )}
        </div>
      )}

      {/* Prev / Next navigation */}
      <div className="grid grid-cols-2 gap-4">
        {/* Previous */}
        <div>
          {prevHref && prevTitle ? (
            <Link
              href={prevHref}
              className="flex flex-col gap-1 p-4 rounded-xl border border-slate-200 bg-white hover:border-navy-400 hover:shadow-sm transition-all group"
            >
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"/>
                </svg>
                Previous lesson
              </span>
              <span className="text-sm font-semibold text-navy-950 group-hover:text-navy-700 leading-snug line-clamp-2 transition-colors">
                {prevTitle}
              </span>
            </Link>
          ) : <div />}
        </div>

        {/* Next */}
        <div>
          {nextHref && nextTitle ? (
            <Link
              href={nextHref}
              className="flex flex-col gap-1 p-4 rounded-xl border border-slate-200 bg-white hover:border-navy-400 hover:shadow-sm transition-all group text-right"
            >
              <span className="text-xs text-slate-400 flex items-center justify-end gap-1">
                Next lesson
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </span>
              <span className="text-sm font-semibold text-navy-950 group-hover:text-navy-700 leading-snug line-clamp-2 transition-colors">
                {nextTitle}
              </span>
            </Link>
          ) : isLastLesson ? (
            <Link
              href={courseHref}
              className="flex flex-col gap-1 p-4 rounded-xl border-2 border-teal-300 bg-teal-50 hover:bg-teal-100 transition-all text-right"
            >
              <span className="text-xs text-teal-600 flex items-center justify-end gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
                Last lesson
              </span>
              <span className="text-sm font-semibold text-teal-800">
                Back to course overview
              </span>
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  )
}