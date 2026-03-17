// BASE.dev mini-app entry point (from PR4)
// This page serves as the frame when loaded inside Base.dev / Farcaster

export default function MiniAppPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <p className="text-5xl mb-6">🌿</p>
      <h1 className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-3">
        TouchBase
      </h1>
      <p className="text-sm text-stone-500 dark:text-stone-400 max-w-xs leading-relaxed mb-6">
        Your home base — a safe, supportive place to get back in touch with yourself
        and your humanity.
      </p>
      <a
        href="/feed"
        className="rounded-full bg-stone-800 dark:bg-stone-200 px-8 py-3 text-sm font-semibold text-white dark:text-stone-900 hover:bg-stone-700 transition-colors"
      >
        Open TouchBase →
      </a>
    </main>
  );
}
