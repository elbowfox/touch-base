'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CHAPTERS } from '@/lib/soulcraft/wizard-data';
import type { WizardAnswers, Question, QuestionOption } from '@/lib/soulcraft/types';
import { Suspense } from 'react';

const CHAPTER_ACCENT: Record<string, string> = {
  soul: '#a855f7',
  bond: '#f59e0b',
  mind: '#06b6d4',
  arsenal: '#6366f1',
  pulse: '#f43f5e',
};

const CHAPTER_GLOW: Record<string, string> = {
  soul: 'rgba(168,85,247,0.25)',
  bond: 'rgba(245,158,11,0.25)',
  mind: 'rgba(6,182,212,0.25)',
  arsenal: 'rgba(99,102,241,0.25)',
  pulse: 'rgba(244,63,94,0.25)',
};

const INITIAL_ANSWERS: WizardAnswers = {
  agentName: '',
  archetype: '',
  personalityTraits: [],
  voiceTone: [],
  coreValues: [],
  shadowSide: '',
  philosophicalLean: '',
  humorStyle: '',
  relationship: '',
  relationshipDynamic: '',
  userName: '',
  userNeeds: [],
  communicationStyle: '',
  brightLines: [],
  whenStruggling: '',
  memoryPriority: [],
  learningStyle: '',
  currentContext: '',
  longTermGoals: '',
  cognitiveStyle: '',
  primaryCapabilities: [],
  specialtyDomains: [],
  toolAccess: [],
  guardrails: [],
  checkInRhythm: '',
  openingRitual: '',
  attentionTriggers: [],
  growthTracking: '',
  closingRitual: '',
  oneThingEssence: '',
};

function isAnswered(q: Question, answers: WizardAnswers): boolean {
  const val = answers[q.id];
  if (!q.required && (q.type === 'textarea' || (q.type === 'text' && !q.required))) return true;
  if (q.type === 'multi') {
    const arr = val as string[];
    return arr.length >= (q.minSelect ?? 1);
  }
  if (q.type === 'single') return typeof val === 'string' && val.length > 0;
  if (q.type === 'text') return typeof val === 'string' && val.trim().length > 0;
  if (q.type === 'textarea') return !q.required || (typeof val === 'string' && val.trim().length > 0);
  return true;
}

function SingleSelect({ question, value, onChange, accent }: {
  question: Question; value: string; onChange: (v: string) => void; accent: string;
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.75rem' }}>
      {question.options?.map((opt: QuestionOption) => {
        const selected = value === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            style={{
              textAlign: 'left',
              padding: '1rem 1.125rem',
              borderRadius: '12px',
              border: selected ? `1.5px solid ${accent}` : '1.5px solid rgba(255,255,255,0.08)',
              background: selected ? `${accent}18` : 'rgba(255,255,255,0.03)',
              color: '#e2e8f0',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {opt.emoji && <span style={{ fontSize: '1.25rem', marginBottom: '0.375rem', display: 'block' }}>{opt.emoji}</span>}
            <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: selected ? accent : '#e2e8f0', marginBottom: opt.description ? '0.25rem' : 0 }}>
              {opt.label}
            </div>
            {opt.description && (
              <div style={{ fontSize: '0.8125rem', color: '#64748b', lineHeight: 1.5 }}>{opt.description}</div>
            )}
          </button>
        );
      })}
    </div>
  );
}

function MultiSelect({ question, value, onChange, accent }: {
  question: Question; value: string[]; onChange: (v: string[]) => void; accent: string;
}) {
  const max = question.maxSelect ?? 99;
  const toggle = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else if (value.length < max) {
      onChange([...value, id]);
    }
  };
  return (
    <div>
      {(question.minSelect || question.maxSelect) && (
        <p style={{ fontSize: '0.8125rem', color: '#475569', marginBottom: '0.875rem' }}>
          {question.minSelect && question.maxSelect
            ? `Select ${question.minSelect}–${question.maxSelect}`
            : question.maxSelect
            ? `Select up to ${question.maxSelect}`
            : `Select at least ${question.minSelect}`}
          {' · '}<span style={{ color: value.length >= (question.minSelect ?? 0) ? '#22c55e' : '#64748b' }}>{value.length} selected</span>
        </p>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {question.options?.map((opt: QuestionOption) => {
          const selected = value.includes(opt.id);
          const atMax = !selected && value.length >= max;
          return (
            <button
              key={opt.id}
              onClick={() => !atMax && toggle(opt.id)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                border: selected ? `1.5px solid ${accent}` : '1.5px solid rgba(255,255,255,0.1)',
                background: selected ? `${accent}22` : 'rgba(255,255,255,0.04)',
                color: selected ? accent : atMax ? '#334155' : '#94a3b8',
                cursor: atMax ? 'not-allowed' : 'pointer',
                fontSize: '0.875rem',
                fontWeight: selected ? 600 : 400,
                transition: 'all 0.15s',
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
              }}
            >
              {opt.emoji && <span>{opt.emoji}</span>}
              {opt.label}
              {selected && <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>✓</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TextInput({ question, value, onChange, accent }: {
  question: Question; value: string; onChange: (v: string) => void; accent: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={question.placeholder}
      style={{
        width: '100%',
        padding: '0.875rem 1.125rem',
        borderRadius: '12px',
        border: `1.5px solid ${value ? accent + '60' : 'rgba(255,255,255,0.1)'}`,
        background: 'rgba(255,255,255,0.04)',
        color: '#e2e8f0',
        fontSize: '1.0625rem',
        outline: 'none',
        fontFamily: 'inherit',
        transition: 'border-color 0.15s',
        boxSizing: 'border-box',
      }}
    />
  );
}

function TextareaInput({ question, value, onChange, accent }: {
  question: Question; value: string; onChange: (v: string) => void; accent: string;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={question.placeholder}
      rows={5}
      style={{
        width: '100%',
        padding: '0.875rem 1.125rem',
        borderRadius: '12px',
        border: `1.5px solid ${value ? accent + '60' : 'rgba(255,255,255,0.1)'}`,
        background: 'rgba(255,255,255,0.04)',
        color: '#e2e8f0',
        fontSize: '0.9375rem',
        outline: 'none',
        fontFamily: 'inherit',
        resize: 'vertical',
        lineHeight: 1.7,
        transition: 'border-color 0.15s',
        boxSizing: 'border-box',
      }}
    />
  );
}

function QuestionCard({ question, answers, onAnswer, accent }: {
  question: Question;
  answers: WizardAnswers;
  onAnswer: (id: keyof WizardAnswers, val: unknown) => void;
  accent: string;
}) {
  const value = answers[question.id];
  const answered = isAnswered(question, answers);

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: answered ? `1px solid ${accent}30` : '1px solid rgba(255,255,255,0.06)',
        borderRadius: '20px',
        padding: '2rem',
        transition: 'border-color 0.2s',
      }}
    >
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.375rem' }}>
          <h3 style={{ fontSize: '1.1875rem', fontWeight: 700, lineHeight: 1.3, margin: 0 }}>{question.title}</h3>
          {question.required && !answered && (
            <span style={{ fontSize: '0.6875rem', color: '#ef4444', background: 'rgba(239,68,68,0.1)', padding: '0.2rem 0.5rem', borderRadius: '9999px', whiteSpace: 'nowrap', flexShrink: 0, marginTop: '2px' }}>Required</span>
          )}
          {answered && question.required && (
            <span style={{ fontSize: '0.6875rem', color: '#22c55e', background: 'rgba(34,197,94,0.1)', padding: '0.2rem 0.5rem', borderRadius: '9999px', whiteSpace: 'nowrap', flexShrink: 0, marginTop: '2px' }}>✓</span>
          )}
        </div>
        {question.subtitle && (
          <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0, lineHeight: 1.6 }}>{question.subtitle}</p>
        )}
      </div>

      {question.type === 'single' && (
        <SingleSelect
          question={question}
          value={value as string}
          onChange={(v) => onAnswer(question.id, v)}
          accent={accent}
        />
      )}
      {question.type === 'multi' && (
        <MultiSelect
          question={question}
          value={value as string[]}
          onChange={(v) => onAnswer(question.id, v)}
          accent={accent}
        />
      )}
      {question.type === 'text' && (
        <TextInput
          question={question}
          value={value as string}
          onChange={(v) => onAnswer(question.id, v)}
          accent={accent}
        />
      )}
      {question.type === 'textarea' && (
        <TextareaInput
          question={question}
          value={value as string}
          onChange={(v) => onAnswer(question.id, v)}
          accent={accent}
        />
      )}
    </div>
  );
}

function WizardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initTier = (searchParams.get('tier') ?? 'spark') as 'spark' | 'forge' | 'genesis' | 'studio';

  const [chapterIndex, setChapterIndex] = useState(0);
  const [answers, setAnswers] = useState<WizardAnswers>(INITIAL_ANSWERS);
  const [validationError, setValidationError] = useState('');
  const topRef = useRef<HTMLDivElement>(null);

  const chapter = CHAPTERS[chapterIndex];
  const accent = CHAPTER_ACCENT[chapter.meta.id];
  const glow = CHAPTER_GLOW[chapter.meta.id];
  const totalChapters = CHAPTERS.length;

  useEffect(() => {
    const saved = localStorage.getItem('soulcraft_wizard_draft');
    if (saved) {
      try {
        setAnswers(JSON.parse(saved));
      } catch {
        // ignore
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('soulcraft_wizard_draft', JSON.stringify(answers));
  }, [answers]);

  const handleAnswer = (id: keyof WizardAnswers, val: unknown) => {
    setAnswers((prev) => ({ ...prev, [id]: val }));
  };

  const chapterQuestions = chapter.questions;
  const chapterAnswered = chapterQuestions
    .filter((q) => q.required)
    .every((q) => isAnswered(q, answers));

  const allRequiredAnswered = CHAPTERS.every((ch) =>
    ch.questions.filter((q) => q.required).every((q) => isAnswered(q, answers))
  );

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const goNext = () => {
    if (chapterIndex < totalChapters - 1) {
      setChapterIndex((i) => i + 1);
      setTimeout(scrollToTop, 50);
    }
  };

  const goPrev = () => {
    if (chapterIndex > 0) {
      setChapterIndex((i) => i - 1);
      setTimeout(scrollToTop, 50);
    }
  };

  const handleBirth = () => {
    if (!allRequiredAnswered) return;
    const tier = initTier === 'spark' ? 'free' : initTier;
    // Save answers and navigate — the result page handles streaming
    localStorage.setItem('soulcraft_wizard_answers', JSON.stringify(answers));
    localStorage.setItem('soulcraft_answers_meta', JSON.stringify({ agentName: answers.agentName, archetype: answers.archetype, tier }));
    localStorage.removeItem('soulcraft_generated');
    router.push(`/soulcraft/result?mode=generate&tier=${tier}`);
  };

  const isLastChapter = chapterIndex === totalChapters - 1;

  return (
    <div ref={topRef} style={{ minHeight: '100vh', background: '#060610', color: '#e2e8f0', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Top bar */}
      <div style={{ position: 'sticky', top: 0, zIndex: 40, background: 'rgba(6,6,16,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '0.875rem 1.5rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="/soulcraft" style={{ color: '#475569', textDecoration: 'none', fontSize: '0.875rem', flexShrink: 0 }}>← Back</a>

          {/* Progress */}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.375rem' }}>
              {CHAPTERS.map((ch, i) => (
                <button
                  key={ch.meta.id}
                  onClick={() => setChapterIndex(i)}
                  title={ch.meta.title}
                  style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: i === chapterIndex ? accent : i < chapterIndex ? CHAPTER_ACCENT[ch.meta.id] + '60' : 'rgba(255,255,255,0.06)',
                    border: i === chapterIndex ? `2px solid ${accent}` : '2px solid transparent',
                    color: i <= chapterIndex ? '#fff' : '#334155',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s',
                    flexShrink: 0,
                  }}
                >
                  {ch.meta.emoji}
                </button>
              ))}
            </div>
            <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '9999px', overflow: 'hidden' }}>
              <div style={{ height: '100%', background: `linear-gradient(90deg, ${accent}, ${accent}88)`, width: `${((chapterIndex + 1) / totalChapters) * 100}%`, transition: 'width 0.4s ease' }} />
            </div>
          </div>

          <div style={{ fontSize: '0.75rem', color: '#475569', flexShrink: 0 }}>
            {chapterIndex + 1}/{totalChapters}
          </div>
        </div>
      </div>

      {/* Chapter header */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1.5rem 1.5rem' }}>
        <div style={{ marginBottom: '2.5rem', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-2rem', left: 0, width: '300px', height: '200px', background: `radial-gradient(ellipse, ${glow} 0%, transparent 70%)`, pointerEvents: 'none' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '1.5rem', filter: `drop-shadow(0 0 10px ${accent})` }}>{chapter.meta.emoji}</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: accent }}>
              Chapter {chapterIndex + 1} of {totalChapters}
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 0.5rem', background: `linear-gradient(135deg, #e2e8f0, ${accent})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            {chapter.meta.title}
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.0625rem', margin: 0 }}>{chapter.meta.subtitle}</p>
        </div>

        {/* Questions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3rem' }}>
          {chapterQuestions.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              answers={answers}
              onAnswer={handleAnswer}
              accent={accent}
            />
          ))}
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '4rem', gap: '1rem' }}>
          <button
            onClick={goPrev}
            disabled={chapterIndex === 0}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '10px',
              border: '1.5px solid rgba(255,255,255,0.1)',
              background: 'transparent',
              color: chapterIndex === 0 ? '#1e293b' : '#94a3b8',
              cursor: chapterIndex === 0 ? 'not-allowed' : 'pointer',
              fontSize: '0.9375rem',
              fontWeight: 600,
            }}
          >
            ← Back
          </button>

          <div style={{ textAlign: 'center' }}>
            {!chapterAnswered && (
              <p style={{ fontSize: '0.8125rem', color: '#ef4444', margin: '0 0 0.5rem' }}>
                Complete required questions to continue
              </p>
            )}
            {validationError && (
              <p style={{ fontSize: '0.8125rem', color: '#ef4444', margin: '0 0 0.5rem', maxWidth: '300px' }}>
                ⚠ {validationError}
              </p>
            )}
          </div>

          {isLastChapter ? (
            <button
              onClick={handleBirth}
              disabled={!allRequiredAnswered}
              style={{
                padding: '0.875rem 2rem',
                borderRadius: '12px',
                border: 'none',
                background: allRequiredAnswered
                  ? 'linear-gradient(135deg, #a855f7, #6366f1)'
                  : 'rgba(255,255,255,0.05)',
                color: allRequiredAnswered ? '#fff' : '#334155',
                cursor: allRequiredAnswered ? 'pointer' : 'not-allowed',
                fontSize: '1rem',
                fontWeight: 700,
                boxShadow: allRequiredAnswered ? '0 0 30px rgba(168,85,247,0.4)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              ✦ Birth Your Agent
            </button>
          ) : (
            <button
              onClick={goNext}
              disabled={!chapterAnswered}
              style={{
                padding: '0.875rem 2rem',
                borderRadius: '12px',
                border: 'none',
                background: chapterAnswered ? `linear-gradient(135deg, ${accent}, ${accent}99)` : 'rgba(255,255,255,0.05)',
                color: chapterAnswered ? '#fff' : '#334155',
                cursor: chapterAnswered ? 'pointer' : 'not-allowed',
                fontSize: '1rem',
                fontWeight: 700,
                transition: 'all 0.2s',
              }}
            >
              Next Chapter →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CreatePage() {
  return (
    <Suspense fallback={<div style={{ background: '#060610', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e2e8f0' }}>Loading...</div>}>
      <WizardContent />
    </Suspense>
  );
}
