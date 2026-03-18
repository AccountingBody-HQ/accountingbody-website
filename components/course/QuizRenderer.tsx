// components/course/QuizRenderer.tsx
// Interactive multiple-choice quiz — client only
'use client'

import { useState } from 'react'
import type { QuizQuestion } from '@/lib/courses'

interface Props {
  questions: QuizQuestion[]
}

export default function QuizRenderer({ questions }: Props) {
  const [answers,   setAnswers]   = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)

  const score = submitted
    ? questions.filter(q => answers[q._id] === q.correctAnswer).length
    : 0

  const pct = submitted ? Math.round((score / questions.length) * 100) : 0

  function choose(questionId: string, idx: number) {
    if (submitted) return
    setAnswers(prev => ({ ...prev, [questionId]: idx }))
  }

  function reset() {
    setAnswers({})
    setSubmitted(false)
  }

  const allAnswered = questions.every(q => answers[q._id] !== undefined)

  return (
    <div className="space-y-6">
      {questions.map((q, qi) => {
        const chosen    = answers[q._id]
        const isCorrect = submitted && chosen === q.correctAnswer
        const isWrong   = submitted && chosen !== undefined && chosen !== q.correctAnswer

        return (
          <div
            key={q._id}
            className={`rounded-xl border p-5 transition-colors ${
              submitted
                ? isCorrect ? 'border-teal-300 bg-teal-50'
                : isWrong   ? 'border-red-300 bg-red-50'
                : 'border-slate-200 bg-white'
                : 'border-slate-200 bg-white'
            }`}
          >
            {/* Question */}
            <p className="font-semibold text-navy-950 mb-4 text-sm leading-relaxed">
              <span className="text-slate-400 mr-2">Q{qi + 1}.</span>
              {q.question}
            </p>

            {/* Options */}
            <div className="space-y-2">
              {q.options.map((opt, oi) => {
                const isThis    = chosen === oi
                const isAnswer  = oi === q.correctAnswer
                let optClass    = 'border-slate-200 bg-white text-slate-700 hover:border-navy-400 hover:bg-navy-50'

                if (submitted) {
                  if (isAnswer)          optClass = 'border-teal-500 bg-teal-100 text-teal-800'
                  else if (isThis)       optClass = 'border-red-400 bg-red-100 text-red-700 line-through'
                  else                   optClass = 'border-slate-200 bg-white text-slate-400'
                } else if (isThis) {
                  optClass = 'border-navy-700 bg-navy-50 text-navy-900 font-medium'
                }

                return (
                  <button
                    key={oi}
                    onClick={() => choose(q._id, oi)}
                    disabled={submitted}
                    className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-all ${optClass} disabled:cursor-default`}
                  >
                    <span className="font-semibold mr-2 text-xs text-slate-400">
                      {String.fromCharCode(65 + oi)}.
                    </span>
                    {opt}
                  </button>
                )
              })}
            </div>

            {/* Explanation */}
            {submitted && q.explanation && (
              <div className="mt-4 flex gap-3 p-3 rounded-lg bg-white border border-slate-200">
                <svg className="w-4 h-4 text-navy-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs text-slate-600 leading-relaxed">{q.explanation}</p>
              </div>
            )}
          </div>
        )
      })}

      {/* Submit / Result bar */}
      {!submitted ? (
        <button
          onClick={() => setSubmitted(true)}
          disabled={!allAnswered}
          className="h-11 px-6 rounded-lg text-sm font-semibold bg-navy-950 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-navy-900 transition-colors"
        >
          {allAnswered ? 'Submit answers' : `Answer all ${questions.length} questions to submit`}
        </button>
      ) : (
        <div className={`flex items-center justify-between gap-4 rounded-xl p-5 ${
          pct >= 80 ? 'bg-teal-50 border border-teal-200' : 'bg-gold-50 border border-gold-200'
        }`}>
          <div>
            <p className={`font-display text-2xl mb-0.5 ${pct >= 80 ? 'text-teal-700' : 'text-gold-600'}`}>
              {score}/{questions.length} — {pct}%
            </p>
            <p className="text-sm text-slate-600">
              {pct === 100 ? 'Perfect score! Outstanding.' :
               pct >= 80   ? 'Great result. Well done.' :
               pct >= 60   ? 'Good effort. Review the explanations above.' :
                             'Keep studying — the explanations above will help.'}
            </p>
          </div>
          <button
            onClick={reset}
            className="shrink-0 h-9 px-4 rounded-lg text-xs font-semibold border border-slate-300 text-slate-700 hover:border-navy-950 hover:text-navy-950 transition-colors"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  )
}