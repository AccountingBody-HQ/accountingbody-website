// hooks/useCourseProgress.ts
// Tracks completed lessons per course using localStorage
'use client'

import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'ab_course_progress'

interface CourseProgress {
  completedLessons: string[]   // lesson slugs
  startedAt?: string
}

interface AllProgress {
  [courseSlug: string]: CourseProgress
}

export function useCourseProgress(courseSlug: string) {
  const [allProgress, setAllProgress] = useState<AllProgress>({})
  const [mounted, setMounted]         = useState(false)

  // Load from localStorage once on mount
  useEffect(() => {
    setMounted(true)
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setAllProgress(JSON.parse(raw))
    } catch {}
  }, [])

  // Persist to localStorage whenever state changes
  const persist = useCallback((data: AllProgress) => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)) } catch {}
  }, [])

  const markComplete = useCallback((lessonSlug: string) => {
    setAllProgress(prev => {
      const course = prev[courseSlug] ?? {
        completedLessons: [],
        startedAt: new Date().toISOString(),
      }
      if (course.completedLessons.includes(lessonSlug)) return prev
      const updated: AllProgress = {
        ...prev,
        [courseSlug]: {
          ...course,
          completedLessons: [...course.completedLessons, lessonSlug],
        },
      }
      persist(updated)
      return updated
    })
  }, [courseSlug, persist])

  const markIncomplete = useCallback((lessonSlug: string) => {
    setAllProgress(prev => {
      const course = prev[courseSlug]
      if (!course) return prev
      const updated: AllProgress = {
        ...prev,
        [courseSlug]: {
          ...course,
          completedLessons: course.completedLessons.filter(s => s !== lessonSlug),
        },
      }
      persist(updated)
      return updated
    })
  }, [courseSlug, persist])

  const isCompleted = useCallback((lessonSlug: string): boolean => {
    if (!mounted) return false
    return allProgress[courseSlug]?.completedLessons.includes(lessonSlug) ?? false
  }, [allProgress, courseSlug, mounted])

  const completedCount = mounted
    ? (allProgress[courseSlug]?.completedLessons.length ?? 0)
    : 0

  return { markComplete, markIncomplete, isCompleted, completedCount, mounted }
}