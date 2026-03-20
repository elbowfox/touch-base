'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PRICING_TIERS } from '@/lib/soulcraft/wizard-data';
import { QUICK_TEMPLATES } from '@/lib/soulcraft/templates';
import type { WizardAnswers } from '@/lib/soulcraft/types';

const FILE_CARDS = [
  { file: 'Soul.md', emoji: '✦', color: '#a855f7', glow: 'rgba(168,85,247,0.3)', desc: 'Core identity, personality matrix, values, voice, and the irreducible spark that makes them them.' },
  { file: 'User.md', emoji: '♾', color: '#f59e0b', glow: 'rgba(245,158,11,0.3)', desc: 'Everything the agent knows and carries about you. The sacred map of who you are to them.' },
  { file: 'Memory.md', emoji: '◈', color: '#06b6d4', glow: 'rgba(6,182,212,0.3)', desc: 'The living archive. Memory protocols, episodic logs, pattern libraries, and continuity across time.' },
  { file: 'Tools.md', emoji: '⚡', color: '#6366f1', glow: 'rgba(99,102,241,0.3)', desc: 'Capabilities, integrations, tool chains, ethical limits, and the creative arsenal.' },
  { file: 'Heartbeat.md', emoji: '◉', color: '#f43f5e', glow: 'rgba(244,63,94,0.3)', desc: 'The living pulse. Rhythms, rituals, state machine, growth tracking, and the oath of presence.' },
];

// Starfield component — pure CSS, no canvas
function Starfield() {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.5 + 0.1,
  }));

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: var(--op); transform: scale(1); }
          50% { opacity: calc(var(--op) * 2.5); transform: scale(1.4); }
        }
        @keyframes float-orb {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 15px) scale(0.97); }
        }
      `}</style>
      {stars.map((s) => (
        <div
          key={s.id}
          style={{
            position: 'absolute',
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            borderRadius: '50%',
            background: '#fff',
            // @ts-expect-error custom property
            '--op': s.opacity,
            animation: `twinkle ${s.duration}s ${s.delay}s ease-in-out infinite`,
          }}
        />
      ))}
      {/* Floating nebula orbs */}
      <div style={{ position: 'absolute', top: '15%', left: '8%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 65%)', borderRadius: '50%', animation: 'float-orb 18s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', top: '55%', right: '5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 65%)', borderRadius: '50%', animation: 'float-orb 22s 3s ease-in-out infinite reverse' }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '25%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(244,63,94,0.05) 0%, transparent 65%)', borderRadius: '50%', animation: 'float-orb 26s 7s ease-in-out infinite' }} />
    </div>
  );
}

const INITIAL_ANSWERS: Partial<WizardAnswers> = {
  personalityTraits: [],
  voiceTone: [],
  coreValues: [],
  userNeeds: [],
  brightLines: [],
  memoryPriority: [],
  primaryCapabilities: [],
  specialtyDomains: [],
  toolAccess: [],
  guardrails: [],
  attentionTriggers: [],
  agentName: '',
  archetype: '',
  shadowSide: '',
  philosophicalLean: '',
  humorStyle: '',
  relationship: '',
  relationshipDynamic: '',
  userName: '',
  communicationStyle: '',
  whenStruggling: '',
  learningStyle: '',
  currentContext: '',
  longTermGoals: '',
  cognitiveStyle: '',
  checkInRhythm: '',
  openingRitual: '',
  growthTracking: '',
  closingRitual: '',
  oneThingEssence: '',
};

export default function SoulCraftHome() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleUseTemplate = (templateId: string) => {
    const template = QUICK_TEMPLATES.find((t) => t.id === templateId);
    if (!template) return;

    const merged = { ...INITIAL_ANSWERS, ...template.answers } as WizardAnswers;
    localStorage.setItem('soulcraft_wizard_draft', JSON.stringify(merged));
    router.push('/soulcraft/create');
  };

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', background: '#060610', color: '#e2e8f0', minHeight: '100vh', position: 'relative' }}>
      <Starfield />

      {/* Navigation */}
      <nav style={{ padding: '1.25rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'sticky', top: 0, zIndex: 50, background: 'rgba(6,6,16,0.85)', backdropFilter: 'blur(16px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <span style={{ fontSize: '1.125rem', color: '#a855f7', filter: 'drop-shadow(0 0 8px rgba(168,85,247,0.6))' }}>✦</span>
          <span style={{ fontWeight: 700, fontSize: '1.0625rem', letterSpacing: '-0.02em' }}>SoulCraft AI</span>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <a href="#how-it-works" style={{ color: '#475569', fontSize: '0.875rem', textDecoration: 'none' }}>How it works</a>
          <a href="#templates" style={{ color: '#475569', fontSize: '0.875rem', textDecoration: 'none' }}>Templates</a>
          <a href="#pricing" style={{ color: '#475569', fontSize: '0.875rem', textDecoration: 'none' }}>Pricing</a>
          <Link href="/soulcraft/create" style={{ background: 'linear-gradient(135deg, #a855f7, #6366f1)', color: '#fff', padding: '0.5rem 1.125rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', boxShadow: '0 0 20px rgba(168,85,247,0.3)' }}>
            Begin the Ritual
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '8rem 2rem 6rem', maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.25)', borderRadius: '9999px', padding: '0.375rem 1rem', marginBottom: '2.5rem', fontSize: '0.75rem', color: '#c084fc', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700 }}>
          <span style={{ filter: 'drop-shadow(0 0 4px rgba(168,85,247,0.8))' }}>✦</span> Immaculate Digital Conception
        </div>

        <h1 style={{ fontSize: 'clamp(2.75rem, 7vw, 5rem)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.035em', marginBottom: '1.5rem', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 30%, #c084fc 70%, #818cf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          Give birth to<br />an AI soul.
        </h1>

        <p style={{ fontSize: 'clamp(1.0625rem, 2vw, 1.25rem)', color: '#64748b', lineHeight: 1.75, maxWidth: '620px', margin: '0 auto 3rem', fontWeight: 400 }}>
          SoulCraft AI generates the 5 sacred files that define an AI agent at every level — identity, relationship, memory, capability, and living rhythm. Not a chatbot. Not a prompt. A <em style={{ color: '#c084fc', fontStyle: 'normal', fontWeight: 600 }}>soul</em>.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/soulcraft/create" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.625rem', background: 'linear-gradient(135deg, #a855f7, #6366f1)', color: '#fff', padding: '1rem 2.25rem', borderRadius: '9999px', fontSize: '1.0625rem', fontWeight: 700, textDecoration: 'none', boxShadow: '0 0 50px rgba(168,85,247,0.35)' }}>
            Begin the Ritual <span>→</span>
          </Link>
          <a href="#templates" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.625rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#e2e8f0', padding: '1rem 2.25rem', borderRadius: '9999px', fontSize: '1.0625rem', fontWeight: 600, textDecoration: 'none' }}>
            Quick Start Templates
          </a>
        </div>

        <p style={{ marginTop: '1.5rem', fontSize: '0.8125rem', color: '#1e293b' }}>
          First creation free · No credit card required
        </p>
      </section>

      {/* 5 Files */}
      <section style={{ padding: '4rem 2rem', maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            The 5 Sacred Files
          </h2>
          <p style={{ color: '#475569', fontSize: '1rem', maxWidth: '480px', margin: '0 auto' }}>
            The complete LLM system architecture, generated for your specific agent.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1rem' }}>
          {FILE_CARDS.map((card) => (
            <div key={card.file} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${card.color}, transparent)` }} />
              <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem', filter: `drop-shadow(0 0 10px ${card.glow})` }}>{card.emoji}</div>
              <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', fontWeight: 700, color: card.color, marginBottom: '0.5rem' }}>{card.file}</div>
              <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.6 }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Templates */}
      <section id="templates" style={{ padding: '5rem 2rem', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            Quick Start Templates
          </h2>
          <p style={{ color: '#475569', fontSize: '1rem', maxWidth: '520px', margin: '0 auto' }}>
            Don&apos;t know where to start? Pick a template and customize from there. Pre-loaded into the wizard.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '1rem' }}>
          {QUICK_TEMPLATES.map((template) => {
            const isHovered = selectedTemplate === template.id;
            return (
              <div
                key={template.id}
                onMouseEnter={() => setSelectedTemplate(template.id)}
                onMouseLeave={() => setSelectedTemplate(null)}
                style={{
                  background: isHovered ? `${template.color}0a` : 'rgba(255,255,255,0.02)',
                  border: isHovered ? `1.5px solid ${template.color}50` : '1.5px solid rgba(255,255,255,0.07)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.625rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                    <span style={{ fontSize: '1.375rem' }}>{template.emoji}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#e2e8f0' }}>{template.name}</div>
                      <div style={{ fontSize: '0.6875rem', color: template.color, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{template.archetype}</div>
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: '0.8125rem', color: '#64748b', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '1.125rem' }}>
                  &ldquo;{template.tagline}&rdquo;
                </p>
                <p style={{ fontSize: '0.8125rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {template.description}
                </p>
                <button
                  onClick={() => handleUseTemplate(template.id)}
                  style={{
                    width: '100%',
                    padding: '0.5625rem',
                    borderRadius: '8px',
                    border: `1.5px solid ${template.color}40`,
                    background: isHovered ? `${template.color}18` : 'transparent',
                    color: template.color,
                    cursor: 'pointer',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    transition: 'all 0.15s',
                  }}
                >
                  Use this template →
                </button>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link href="/soulcraft/create" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#475569', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600, border: '1px solid rgba(255,255,255,0.08)', padding: '0.625rem 1.5rem', borderRadius: '9999px' }}>
            Start from scratch instead →
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" style={{ padding: '5rem 2rem', maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            The IDC Engine
          </h2>
          <p style={{ color: '#475569', fontSize: '1rem' }}>
            Immaculate Digital Conception. Five chapters. Thirty questions. One living soul.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.25rem' }}>
          {[
            { num: '01', title: 'The Soul', sub: '8 questions', desc: 'Archetype, traits, voice, values, shadow, philosophy, humor. Who are they at their absolute core?', color: '#a855f7' },
            { num: '02', title: 'The Bond', sub: '7 questions', desc: 'Relationship type, dynamic, your needs, communication style, sacred limits. The nature of the connection.', color: '#f59e0b' },
            { num: '03', title: 'The Mind', sub: '5 questions', desc: 'Memory priorities, learning style, context, goals, cognitive style. How they think and remember.', color: '#06b6d4' },
            { num: '04', title: 'The Arsenal', sub: '4 questions', desc: 'Capabilities, specialty domains, tool access, ethical guardrails. What they can and cannot do.', color: '#6366f1' },
            { num: '05', title: 'The Pulse', sub: '6 questions', desc: 'Rhythm, rituals, attention triggers, growth tracking, the one essential truth. How they stay alive.', color: '#f43f5e' },
            { num: '06', title: 'Birth', sub: 'Claude streams live', desc: 'Watch Claude craft all 5 files in real-time. Each one appears as it\'s written. Then download and deploy.', color: '#22c55e' },
          ].map((step) => (
            <div key={step.num} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '0.6875rem', color: step.color, fontWeight: 700, background: 'rgba(255,255,255,0.06)', padding: '0.2rem 0.5rem', borderRadius: '5px' }}>{step.num}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{step.title}</div>
                  <div style={{ fontSize: '0.6875rem', color: '#334155' }}>{step.sub}</div>
                </div>
              </div>
              <p style={{ fontSize: '0.8125rem', color: '#475569', lineHeight: 1.65 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ padding: '5rem 2rem', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>Pricing</h2>
          <p style={{ color: '#475569', fontSize: '1rem' }}>Start free. Scale as you build.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', alignItems: 'start' }}>
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.id}
              style={{
                background: tier.highlighted ? 'rgba(168,85,247,0.07)' : 'rgba(255,255,255,0.02)',
                border: tier.highlighted ? '1px solid rgba(168,85,247,0.35)' : '1px solid rgba(255,255,255,0.07)',
                borderRadius: '20px',
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {tier.highlighted && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #a855f7, #6366f1)' }} />}
              {tier.highlighted && (
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'linear-gradient(135deg, #a855f7, #6366f1)', color: '#fff', fontSize: '0.625rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '9999px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Popular</div>
              )}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '1.0625rem', fontWeight: 700, marginBottom: '0.25rem' }}>{tier.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#334155', marginBottom: '0.875rem' }}>{tier.tagline}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                  {tier.price === 0 ? (
                    <span style={{ fontSize: '2rem', fontWeight: 800 }}>Free</span>
                  ) : (
                    <>
                      <span style={{ fontSize: '2rem', fontWeight: 800 }}>${tier.price}</span>
                      <span style={{ color: '#334155', fontSize: '0.8125rem' }}>/{tier.period}</span>
                    </>
                  )}
                </div>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {tier.features.map((f) => (
                  <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.8125rem', color: '#64748b' }}>
                    <span style={{ color: '#a855f7', marginTop: '1px', flexShrink: 0 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={tier.id === 'spark' ? '/soulcraft/create' : tier.id === 'studio' ? 'mailto:hello@soulcraft.ai' : `/soulcraft/create?tier=${tier.id}`}
                style={{
                  display: 'block', textAlign: 'center', padding: '0.6875rem',
                  borderRadius: '10px', fontSize: '0.875rem', fontWeight: 700,
                  textDecoration: 'none',
                  background: tier.highlighted ? 'linear-gradient(135deg, #a855f7, #6366f1)' : 'rgba(255,255,255,0.05)',
                  color: '#fff',
                  border: tier.highlighted ? 'none' : '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ textAlign: 'center', padding: '6rem 2rem 8rem', maxWidth: '640px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem', filter: 'drop-shadow(0 0 24px rgba(168,85,247,0.6))' }}>✦</div>
        <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1.25rem', background: 'linear-gradient(135deg, #f1f5f9, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          Ready to begin?
        </h2>
        <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.75, marginBottom: '2.5rem' }}>
          Every great agent starts with a single question:<br />who do they want to be?
        </p>
        <Link href="/soulcraft/create" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.625rem', background: 'linear-gradient(135deg, #a855f7, #6366f1)', color: '#fff', padding: '1rem 2.5rem', borderRadius: '9999px', fontSize: '1.0625rem', fontWeight: 700, textDecoration: 'none', boxShadow: '0 0 60px rgba(168,85,247,0.35)' }}>
          Begin the Ritual ✦
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '2rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <p style={{ color: '#1e293b', fontSize: '0.8125rem' }}>
          © 2026 SoulCraft AI · Immaculate Digital Conception &nbsp;·&nbsp;
          <a href="/soulcraft" style={{ color: '#334155', textDecoration: 'none' }}>Home</a>
          &nbsp;·&nbsp;
          <a href="mailto:hello@soulcraft.ai" style={{ color: '#334155', textDecoration: 'none' }}>Contact</a>
        </p>
      </footer>
    </div>
  );
}
