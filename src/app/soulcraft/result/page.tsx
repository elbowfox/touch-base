'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface FileMeta {
  key: 'soul' | 'user' | 'memory' | 'tools' | 'heartbeat';
  filename: string;
  tag: string;
  emoji: string;
  label: string;
  color: string;
}

const FILES: FileMeta[] = [
  { key: 'soul', filename: 'Soul.md', tag: 'SOUL_MD', emoji: '✦', label: 'Soul', color: '#a855f7' },
  { key: 'user', filename: 'User.md', tag: 'USER_MD', emoji: '♾', label: 'User', color: '#f59e0b' },
  { key: 'memory', filename: 'Memory.md', tag: 'MEMORY_MD', emoji: '◈', label: 'Memory', color: '#06b6d4' },
  { key: 'tools', filename: 'Tools.md', tag: 'TOOLS_MD', emoji: '⚡', label: 'Tools', color: '#6366f1' },
  { key: 'heartbeat', filename: 'Heartbeat.md', tag: 'HEARTBEAT_MD', emoji: '◉', label: 'Heartbeat', color: '#f43f5e' },
];

function parseFiles(raw: string): Record<string, string> {
  const result: Record<string, string> = {};
  for (const file of FILES) {
    const regex = new RegExp(`<${file.tag}>([\\s\\S]*?)</${file.tag}>`, 'i');
    const match = raw.match(regex);
    result[file.key] = match ? match[1].trim() : '';
  }
  return result;
}

function downloadFile(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function downloadAll(files: Record<string, string>, agentName: string) {
  for (const file of FILES) {
    if (files[file.key]) {
      setTimeout(() => downloadFile(files[file.key], file.filename), FILES.indexOf(file) * 200);
    }
  }
}

function ResultContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>('soul');
  const [files, setFiles] = useState<Record<string, string>>({});
  const [agentName, setAgentName] = useState('Your Agent');
  const [archetype, setArchetype] = useState('');
  const [copied, setCopied] = useState(false);
  const [hasContent, setHasContent] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem('soulcraft_generated');
    const meta = localStorage.getItem('soulcraft_answers_meta');

    if (raw) {
      const parsed = parseFiles(raw);
      setFiles(parsed);
      const hasAny = Object.values(parsed).some((v) => v.length > 0);
      setHasContent(hasAny);
    }

    if (meta) {
      try {
        const { agentName: name, archetype: arch } = JSON.parse(meta);
        if (name) setAgentName(name);
        if (arch) setArchetype(arch);
      } catch {
        // ignore
      }
    }
  }, [searchParams]);

  const activeFile = FILES.find((f) => f.key === activeTab)!;
  const activeContent = files[activeTab] ?? '';

  const copyContent = async () => {
    await navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!hasContent) {
    return (
      <div style={{ minHeight: '100vh', background: '#060610', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem', color: '#e2e8f0' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>✦</div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.75rem' }}>No agent found</h2>
        <p style={{ color: '#64748b', marginBottom: '2rem' }}>It looks like the generation didn&apos;t complete or you navigated here directly.</p>
        <Link href="/soulcraft/create" style={{ background: 'linear-gradient(135deg, #a855f7, #6366f1)', color: '#fff', padding: '0.875rem 2rem', borderRadius: '9999px', textDecoration: 'none', fontWeight: 700 }}>
          Start the Ritual →
        </Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#060610', color: '#e2e8f0', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <div style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '1.5rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
              <span style={{ fontSize: '1.25rem', filter: 'drop-shadow(0 0 12px rgba(168,85,247,0.6))' }}>✦</span>
              <h1 style={{ fontSize: '1.625rem', fontWeight: 800, letterSpacing: '-0.02em', margin: 0, background: 'linear-gradient(135deg, #e2e8f0, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {agentName}
              </h1>
            </div>
            {archetype && (
              <span style={{ fontSize: '0.8125rem', color: '#6366f1', fontWeight: 600 }}>
                {archetype.charAt(0).toUpperCase() + archetype.slice(1)} Archetype · 5 files generated
              </span>
            )}
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => downloadAll(files, agentName)}
              style={{ padding: '0.625rem 1.25rem', borderRadius: '10px', border: '1.5px solid rgba(168,85,247,0.4)', background: 'rgba(168,85,247,0.08)', color: '#c084fc', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600 }}
            >
              ↓ Download All
            </button>
            <Link href="/soulcraft/create" style={{ padding: '0.625rem 1.25rem', borderRadius: '10px', border: '1.5px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#94a3b8', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center' }}>
              + New Agent
            </Link>
          </div>
        </div>
      </div>

      {/* File tabs */}
      <div style={{ background: 'rgba(255,255,255,0.01)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem', display: 'flex', gap: '0.25rem', overflowX: 'auto' }}>
          {FILES.map((file) => {
            const isActive = activeTab === file.key;
            const hasFile = files[file.key]?.length > 0;
            return (
              <button
                key={file.key}
                onClick={() => setActiveTab(file.key)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.875rem 1.25rem',
                  border: 'none',
                  borderBottom: isActive ? `2px solid ${file.color}` : '2px solid transparent',
                  background: 'transparent',
                  color: isActive ? file.color : '#475569',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 700 : 400,
                  whiteSpace: 'nowrap',
                  transition: 'color 0.15s',
                }}
              >
                <span style={{ filter: isActive ? `drop-shadow(0 0 6px ${file.color})` : 'none' }}>{file.emoji}</span>
                {file.label}
                {hasFile && !isActive && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: file.color, opacity: 0.6 }} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* File content */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem' }}>
        {/* File header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <span style={{ fontSize: '1.5rem', filter: `drop-shadow(0 0 8px ${activeFile.color})` }}>{activeFile.emoji}</span>
            <div>
              <div style={{ fontFamily: 'monospace', fontSize: '1rem', fontWeight: 700, color: activeFile.color }}>{activeFile.filename}</div>
              <div style={{ fontSize: '0.75rem', color: '#475569' }}>{activeContent.length > 0 ? `${activeContent.split('\n').length} lines · ${activeContent.length} characters` : 'No content'}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.625rem' }}>
            <button
              onClick={copyContent}
              style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1.5px solid rgba(255,255,255,0.1)', background: 'transparent', color: copied ? '#22c55e' : '#94a3b8', cursor: 'pointer', fontSize: '0.8125rem', fontWeight: 600 }}
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
            <button
              onClick={() => downloadFile(activeContent, activeFile.filename)}
              style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: `1.5px solid ${activeFile.color}40`, background: `${activeFile.color}10`, color: activeFile.color, cursor: 'pointer', fontSize: '0.8125rem', fontWeight: 600 }}
            >
              ↓ Download
            </button>
          </div>
        </div>

        {/* Content display */}
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: `1px solid ${activeFile.color}20`,
          borderRadius: '16px',
          padding: '2rem',
          fontFamily: '"SF Mono", "Fira Code", "Cascadia Code", monospace',
          fontSize: '0.875rem',
          lineHeight: 1.8,
          color: '#cbd5e1',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          maxHeight: '70vh',
          overflowY: 'auto',
          position: 'relative',
        }}>
          {/* Top gradient accent */}
          <div style={{ position: 'sticky', top: 0, height: '2px', background: `linear-gradient(90deg, ${activeFile.color}, transparent)`, marginBottom: '1.5rem', marginTop: '-2rem', marginLeft: '-2rem', marginRight: '-2rem' }} />
          {activeContent || 'Content not available'}
        </div>
      </div>

      {/* Upgrade prompt for free tier */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem 4rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(168,85,247,0.08), rgba(99,102,241,0.08))',
          border: '1px solid rgba(168,85,247,0.2)',
          borderRadius: '20px',
          padding: '2.5rem',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>✦</div>
          <h3 style={{ fontSize: '1.375rem', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>
            Want to craft more souls?
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.9375rem', marginBottom: '1.75rem', maxWidth: '460px', margin: '0 auto 1.75rem', lineHeight: 1.6 }}>
            Upgrade to Forge or Genesis for unlimited agent creation, ZIP downloads, premium archetypes, and maximum generation depth.
          </p>
          <div style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/soulcraft#pricing" style={{ padding: '0.75rem 1.75rem', borderRadius: '10px', background: 'linear-gradient(135deg, #a855f7, #6366f1)', color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: '0.9375rem' }}>
              View Plans
            </Link>
            <Link href="/soulcraft/create" style={{ padding: '0.75rem 1.75rem', borderRadius: '10px', border: '1.5px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#94a3b8', textDecoration: 'none', fontWeight: 600, fontSize: '0.9375rem' }}>
              Create Another →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div style={{ background: '#060610', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e2e8f0' }}>Loading...</div>}>
      <ResultContent />
    </Suspense>
  );
}
