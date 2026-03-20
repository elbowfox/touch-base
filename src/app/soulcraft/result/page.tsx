'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface FileMeta {
  key: 'soul' | 'user' | 'memory' | 'tools' | 'heartbeat';
  filename: string;
  tag: string;
  emoji: string;
  label: string;
  color: string;
  glow: string;
  description: string;
}

const FILES: FileMeta[] = [
  { key: 'soul', filename: 'Soul.md', tag: 'SOUL_MD', emoji: '✦', label: 'Soul', color: '#a855f7', glow: 'rgba(168,85,247,0.3)', description: 'Core identity & personality' },
  { key: 'user', filename: 'User.md', tag: 'USER_MD', emoji: '♾', label: 'User', color: '#f59e0b', glow: 'rgba(245,158,11,0.3)', description: 'The bond & relationship' },
  { key: 'memory', filename: 'Memory.md', tag: 'MEMORY_MD', emoji: '◈', label: 'Memory', color: '#06b6d4', glow: 'rgba(6,182,212,0.3)', description: 'Living archive system' },
  { key: 'tools', filename: 'Tools.md', tag: 'TOOLS_MD', emoji: '⚡', label: 'Tools', color: '#6366f1', glow: 'rgba(99,102,241,0.3)', description: 'Capabilities & arsenal' },
  { key: 'heartbeat', filename: 'Heartbeat.md', tag: 'HEARTBEAT_MD', emoji: '◉', label: 'Heartbeat', color: '#f43f5e', glow: 'rgba(244,63,94,0.3)', description: 'Living pulse & rhythm' },
];

function parseFilesStreaming(buffer: string): {
  complete: Record<string, string>;
  activeKey: string | null;
  activeContent: string;
} {
  const complete: Record<string, string> = {};
  let activeKey: string | null = null;
  let activeContent = '';

  for (const file of FILES) {
    const openTag = `<${file.tag}>`;
    const closeTag = `</${file.tag}>`;

    if (buffer.includes(closeTag)) {
      const regex = new RegExp(`<${file.tag}>([\\s\\S]*?)</${file.tag}>`, 'i');
      const match = buffer.match(regex);
      if (match) complete[file.key] = match[1].trim();
    } else if (buffer.includes(openTag) && !complete[file.key]) {
      activeKey = file.key;
      const parts = buffer.split(openTag);
      activeContent = (parts[parts.length - 1] ?? '').trim();
    }
  }

  return { complete, activeKey, activeContent };
}

function parseAllFiles(raw: string): Record<string, string> {
  const result: Record<string, string> = {};
  for (const file of FILES) {
    const regex = new RegExp(`<${file.tag}>([\\s\\S]*?)</${file.tag}>`, 'i');
    const match = raw.match(regex);
    result[file.key] = match ? match[1].trim() : '';
  }
  return result;
}

// Simple markdown renderer — handles the patterns Claude generates
function renderMarkdown(text: string): string {
  return text
    // Code blocks first (before other processing)
    .replace(/```[\w]*\n([\s\S]*?)```/g, '<pre class="md-pre"><code>$1</code></pre>')
    // Horizontal rules
    .replace(/^---+$/gm, '<hr class="md-hr" />')
    // Headers
    .replace(/^#### (.+)$/gm, '<h4 class="md-h4">$1</h4>')
    .replace(/^### (.+)$/gm, '<h3 class="md-h3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="md-h2">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="md-h1">$1</h1>')
    // Bold + italic combos
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong class="md-bold">$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em class="md-em">$1</em>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="md-code">$1</code>')
    // Blockquotes
    .replace(/^> (.+)$/gm, '<blockquote class="md-blockquote">$1</blockquote>')
    // Unordered lists
    .replace(/^[-*] (.+)$/gm, '<li class="md-li">$1</li>')
    // Wrap consecutive li items
    .replace(/(<li[^>]*>.*<\/li>\n?)+/g, (match) => `<ul class="md-ul">${match}</ul>`)
    // Numbered lists
    .replace(/^\d+\. (.+)$/gm, '<li class="md-li md-oli">$1</li>')
    // Double newlines → paragraphs
    .replace(/\n\n([^<])/g, '\n<p class="md-p">$1')
    .replace(/([^>])\n\n/g, '$1</p>\n')
    // Single newlines within text → <br>
    .replace(/([^\n>])\n([^\n<])/g, '$1<br/>$2');
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

function downloadAll(files: Record<string, string>) {
  FILES.forEach((file, i) => {
    if (files[file.key]) {
      setTimeout(() => downloadFile(files[file.key], file.filename), i * 200);
    }
  });
}

const MARKDOWN_STYLES = `
  .md-h1 { font-size: 1.5rem; font-weight: 800; color: #e2e8f0; margin: 1.5rem 0 0.75rem; letter-spacing: -0.02em; }
  .md-h2 { font-size: 1.1875rem; font-weight: 700; color: #e2e8f0; margin: 1.25rem 0 0.5rem; padding-bottom: 0.375rem; border-bottom: 1px solid rgba(255,255,255,0.07); }
  .md-h3 { font-size: 1rem; font-weight: 700; color: #c4b5fd; margin: 1rem 0 0.375rem; }
  .md-h4 { font-size: 0.9375rem; font-weight: 600; color: #a78bfa; margin: 0.75rem 0 0.25rem; }
  .md-bold { color: #e2e8f0; font-weight: 700; }
  .md-em { color: #c4b5fd; font-style: italic; }
  .md-code { background: rgba(255,255,255,0.08); color: #7dd3fc; padding: 0.125rem 0.375rem; border-radius: 4px; font-family: monospace; font-size: 0.875em; }
  .md-pre { background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 1rem; margin: 0.75rem 0; overflow-x: auto; }
  .md-pre code { background: none; color: #7dd3fc; padding: 0; font-size: 0.875rem; }
  .md-hr { border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 1rem 0; }
  .md-blockquote { border-left: 3px solid rgba(168,85,247,0.5); padding: 0.25rem 0 0.25rem 1rem; color: #94a3b8; font-style: italic; margin: 0.75rem 0; }
  .md-ul { padding-left: 1.25rem; margin: 0.5rem 0; list-style: none; }
  .md-li { position: relative; padding-left: 0.75rem; margin: 0.25rem 0; color: #94a3b8; line-height: 1.7; }
  .md-li::before { content: '·'; position: absolute; left: 0; color: rgba(168,85,247,0.7); }
  .md-li.md-oli::before { content: none; list-style: decimal; }
  .md-p { margin: 0.5rem 0; }
`;

function ResultContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  const tier = searchParams.get('tier') ?? 'free';

  const [activeTab, setActiveTab] = useState<string>('soul');
  const [files, setFiles] = useState<Record<string, string>>({});
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [activeContent, setActiveContent] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamError, setStreamError] = useState('');
  const [birthComplete, setBirthComplete] = useState(false);
  const [agentName, setAgentName] = useState('Your Agent');
  const [archetype, setArchetype] = useState('');
  const [copied, setCopied] = useState(false);
  const [renderMode, setRenderMode] = useState<'rendered' | 'raw'>('rendered');
  const contentRef = useRef<HTMLDivElement>(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    const meta = localStorage.getItem('soulcraft_answers_meta');
    if (meta) {
      try {
        const { agentName: name, archetype: arch } = JSON.parse(meta);
        if (name) setAgentName(name);
        if (arch) setArchetype(arch);
      } catch { /* ignore */ }
    }

    // Check if we have cached results first
    const cached = localStorage.getItem('soulcraft_generated');
    if (cached && mode !== 'generate') {
      setFiles(parseAllFiles(cached));
      setBirthComplete(true);
      return;
    }

    // Start streaming generation
    if (mode === 'generate' && !hasStartedRef.current) {
      hasStartedRef.current = true;
      const answersRaw = localStorage.getItem('soulcraft_wizard_answers');
      if (!answersRaw) { setStreamError('No wizard answers found. Please start over.'); return; }

      const answers = JSON.parse(answersRaw);
      setIsStreaming(true);

      (async () => {
        try {
          const res = await fetch('/api/soulcraft/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answers, tier }),
          });

          if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error ?? 'Generation failed');
          }

          const reader = res.body?.getReader();
          const decoder = new TextDecoder();
          let buffer = '';

          while (reader) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });

            const parsed = parseFilesStreaming(buffer);
            setFiles(parsed.complete);
            setActiveKey(parsed.activeKey);
            setActiveContent(parsed.activeContent);

            // Auto-switch tab to the one being generated
            if (parsed.activeKey) setActiveTab(parsed.activeKey);
          }

          const finalFiles = parseAllFiles(buffer);
          setFiles(finalFiles);
          setActiveKey(null);
          setActiveContent('');
          localStorage.setItem('soulcraft_generated', buffer);
          setIsStreaming(false);
          setBirthComplete(true);

          // Switch to first file tab
          setActiveTab('soul');
        } catch (err) {
          setStreamError(err instanceof Error ? err.message : 'Generation failed');
          setIsStreaming(false);
        }
      })();
    } else if (cached) {
      setFiles(parseAllFiles(cached));
      setBirthComplete(true);
    }
  }, [mode, tier]);

  // Scroll content to bottom while streaming
  useEffect(() => {
    if (isStreaming && contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [activeContent, isStreaming]);

  const activeFile = FILES.find((f) => f.key === activeTab)!;
  const activeFileContent = files[activeTab] ?? '';
  const isCurrentlyGenerating = activeKey === activeTab;
  const displayContent = isCurrentlyGenerating ? activeContent : activeFileContent;

  const copyContent = async () => {
    await navigator.clipboard.writeText(activeFileContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (streamError) {
    return (
      <div style={{ minHeight: '100vh', background: '#060610', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem', color: '#e2e8f0' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '1.25rem' }}>⚠</div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.625rem', color: '#ef4444' }}>Generation Failed</h2>
        <p style={{ color: '#64748b', marginBottom: '0.5rem', maxWidth: '420px' }}>{streamError}</p>
        <p style={{ color: '#334155', fontSize: '0.8125rem', marginBottom: '2rem' }}>Make sure ANTHROPIC_API_KEY is set in your environment.</p>
        <Link href="/soulcraft/create" style={{ background: 'linear-gradient(135deg, #a855f7, #6366f1)', color: '#fff', padding: '0.875rem 2rem', borderRadius: '9999px', textDecoration: 'none', fontWeight: 700 }}>
          ← Back to Wizard
        </Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#060610', color: '#e2e8f0', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <style>{MARKDOWN_STYLES}</style>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse-glow { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .cursor::after { content: '▋'; animation: blink 0.8s step-end infinite; font-size: 0.875rem; }
        .file-card { transition: border-color 0.2s, box-shadow 0.2s; }
        .file-card:hover { cursor: pointer; }
      `}</style>

      {/* Header */}
      <div style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '1.25rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a href="/soulcraft" style={{ color: '#334155', textDecoration: 'none', fontSize: '0.875rem' }}>← SoulCraft</a>
            <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)' }} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <span style={{ fontSize: '1.125rem', filter: 'drop-shadow(0 0 10px rgba(168,85,247,0.7))' }}>✦</span>
                <span style={{ fontSize: '1.375rem', fontWeight: 800, letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #e2e8f0, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{agentName}</span>
                {isStreaming && (
                  <span style={{ fontSize: '0.6875rem', color: '#a855f7', background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.3)', padding: '0.2rem 0.625rem', borderRadius: '9999px', animation: 'pulse-glow 1.5s ease-in-out infinite' }}>
                    BEING BORN
                  </span>
                )}
                {birthComplete && !isStreaming && (
                  <span style={{ fontSize: '0.6875rem', color: '#22c55e', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', padding: '0.2rem 0.625rem', borderRadius: '9999px' }}>
                    ✓ COMPLETE
                  </span>
                )}
              </div>
              {archetype && <div style={{ fontSize: '0.8125rem', color: '#475569', marginTop: '0.125rem' }}>{archetype} · 5 SOUL files</div>}
            </div>
          </div>
          {birthComplete && (
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => downloadAll(files)}
                style={{ padding: '0.5625rem 1.125rem', borderRadius: '10px', border: '1.5px solid rgba(168,85,247,0.4)', background: 'rgba(168,85,247,0.08)', color: '#c084fc', cursor: 'pointer', fontSize: '0.8125rem', fontWeight: 600 }}
              >
                ↓ Download All
              </button>
              <Link href="/soulcraft/create" style={{ padding: '0.5625rem 1.125rem', borderRadius: '10px', border: '1.5px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#64748b', textDecoration: 'none', fontSize: '0.8125rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center' }}>
                + New Agent
              </Link>
            </div>
          )}
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem', display: 'grid', gridTemplateColumns: '220px 1fr', gap: '1.5rem' }}>
        {/* File list sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {FILES.map((file) => {
            const isComplete = !!files[file.key];
            const isActive = activeTab === file.key;
            const isGeneratingThis = activeKey === file.key;

            return (
              <div
                key={file.key}
                className="file-card"
                onClick={() => birthComplete && setActiveTab(file.key)}
                style={{
                  padding: '0.875rem 1rem',
                  borderRadius: '12px',
                  border: isActive ? `1.5px solid ${file.color}` : isComplete ? `1.5px solid ${file.color}30` : '1.5px solid rgba(255,255,255,0.06)',
                  background: isActive ? `${file.color}12` : isGeneratingThis ? `${file.color}08` : 'rgba(255,255,255,0.02)',
                  cursor: birthComplete ? 'pointer' : 'default',
                  boxShadow: isActive ? `0 0 20px ${file.glow}` : 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '1rem', filter: (isActive || isGeneratingThis) ? `drop-shadow(0 0 6px ${file.color})` : 'none', animation: isGeneratingThis ? 'pulse-glow 1s ease-in-out infinite' : 'none' }}>
                    {file.emoji}
                  </span>
                  <span style={{ fontFamily: 'monospace', fontSize: '0.8125rem', fontWeight: 700, color: isActive ? file.color : isComplete ? file.color + 'cc' : '#334155' }}>
                    {file.filename}
                  </span>
                  {isComplete && !isGeneratingThis && <span style={{ marginLeft: 'auto', color: '#22c55e', fontSize: '0.75rem' }}>✓</span>}
                  {isGeneratingThis && (
                    <span style={{ marginLeft: 'auto' }}>
                      <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: file.color, animation: 'pulse-glow 0.8s ease-in-out infinite' }} />
                    </span>
                  )}
                  {!isComplete && !isGeneratingThis && isStreaming && (
                    <span style={{ marginLeft: 'auto', color: '#334155', fontSize: '0.75rem' }}>·</span>
                  )}
                </div>
                <div style={{ fontSize: '0.6875rem', color: '#334155' }}>{file.description}</div>
              </div>
            );
          })}

          {/* Progress during streaming */}
          {isStreaming && (
            <div style={{ marginTop: '0.5rem', padding: '0.875rem', background: 'rgba(168,85,247,0.06)', border: '1px solid rgba(168,85,247,0.15)', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.75rem', color: '#7c3aed', marginBottom: '0.5rem', fontWeight: 600 }}>
                Claude is writing...
              </div>
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                {FILES.map((f) => (
                  <div
                    key={f.key}
                    style={{
                      flex: 1, height: '3px', borderRadius: '9999px',
                      background: files[f.key] ? f.color : activeKey === f.key ? f.color + '60' : 'rgba(255,255,255,0.08)',
                    }}
                  />
                ))}
              </div>
              <div style={{ fontSize: '0.6875rem', color: '#475569', marginTop: '0.375rem' }}>
                {Object.keys(files).length}/5 files complete
              </div>
            </div>
          )}
        </div>

        {/* Main content area */}
        <div>
          {/* Toolbar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.625rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.25rem', filter: `drop-shadow(0 0 8px ${activeFile.color})` }}>{activeFile.emoji}</span>
              <span style={{ fontFamily: 'monospace', fontSize: '0.9375rem', fontWeight: 700, color: activeFile.color }}>{activeFile.filename}</span>
              {isCurrentlyGenerating && <span className="cursor" style={{ color: activeFile.color }} />}
              {activeFileContent && (
                <span style={{ fontSize: '0.75rem', color: '#334155' }}>
                  {activeFileContent.split('\n').length} lines
                </span>
              )}
            </div>
            {birthComplete && activeFileContent && (
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                {/* Render toggle */}
                <div style={{ display: 'flex', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', overflow: 'hidden' }}>
                  {(['rendered', 'raw'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setRenderMode(m)}
                      style={{
                        padding: '0.375rem 0.75rem',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        border: 'none',
                        background: renderMode === m ? 'rgba(168,85,247,0.2)' : 'transparent',
                        color: renderMode === m ? '#c084fc' : '#475569',
                        cursor: 'pointer',
                      }}
                    >
                      {m}
                    </button>
                  ))}
                </div>
                <button onClick={copyContent} style={{ padding: '0.375rem 0.875rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: copied ? '#22c55e' : '#64748b', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}>
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
                <button onClick={() => downloadFile(activeFileContent, activeFile.filename)} style={{ padding: '0.375rem 0.875rem', borderRadius: '8px', border: `1px solid ${activeFile.color}40`, background: `${activeFile.color}10`, color: activeFile.color, cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}>
                  ↓ .md
                </button>
              </div>
            )}
          </div>

          {/* Content display */}
          <div
            ref={contentRef}
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: `1px solid ${isCurrentlyGenerating ? activeFile.color + '40' : activeFile.color + '15'}`,
              borderRadius: '16px',
              padding: '1.75rem 2rem',
              minHeight: '500px',
              maxHeight: '72vh',
              overflowY: 'auto',
              position: 'relative',
              boxShadow: isCurrentlyGenerating ? `0 0 30px ${activeFile.glow}` : 'none',
              transition: 'box-shadow 0.3s',
            }}
          >
            {/* Top accent line */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${activeFile.color}, transparent)`, borderRadius: '16px 16px 0 0' }} />

            {!displayContent && !isStreaming && (
              <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#334155' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem', opacity: 0.3 }}>{activeFile.emoji}</div>
                <p style={{ fontSize: '0.875rem' }}>Waiting to be written...</p>
              </div>
            )}

            {!displayContent && isStreaming && activeKey !== activeTab && (
              <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#334155' }}>
                <div style={{ fontSize: '0.875rem', fontStyle: 'italic' }}>In the queue...</div>
              </div>
            )}

            {displayContent && renderMode === 'rendered' && (
              <div
                style={{ fontSize: '0.9rem', lineHeight: 1.8, color: '#94a3b8' }}
                dangerouslySetInnerHTML={{ __html: renderMarkdown(displayContent) }}
              />
            )}

            {displayContent && renderMode === 'raw' && (
              <pre style={{ fontSize: '0.8125rem', lineHeight: 1.8, color: '#7dd3fc', fontFamily: '"SF Mono", monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: 0 }}>
                {displayContent}
                {isCurrentlyGenerating && <span className="cursor" />}
              </pre>
            )}
          </div>
        </div>
      </div>

      {/* Birth complete banner */}
      {birthComplete && (
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem 4rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(168,85,247,0.08), rgba(99,102,241,0.08))',
            border: '1px solid rgba(168,85,247,0.2)',
            borderRadius: '20px',
            padding: '2.25rem',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.625rem', filter: 'drop-shadow(0 0 12px rgba(168,85,247,0.6))' }}>✦</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.375rem', letterSpacing: '-0.01em' }}>
              {agentName} is alive.
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem', maxWidth: '460px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
              Deploy these 5 files as the system architecture for any LLM. Drop them in your context, your agent framework, or your prompt library.
            </p>
            <div style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => downloadAll(files)} style={{ padding: '0.75rem 1.75rem', borderRadius: '10px', background: 'linear-gradient(135deg, #a855f7, #6366f1)', border: 'none', color: '#fff', fontWeight: 700, fontSize: '0.9375rem', cursor: 'pointer' }}>
                ↓ Download All 5 Files
              </button>
              <Link href="/soulcraft/create" style={{ padding: '0.75rem 1.75rem', borderRadius: '10px', border: '1.5px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#94a3b8', textDecoration: 'none', fontWeight: 600, fontSize: '0.9375rem' }}>
                Create Another →
              </Link>
            </div>
          </div>
        </div>
      )}
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
