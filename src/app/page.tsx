import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="text-5xl mb-6">🌿</div>

        <h1 className="text-3xl font-bold tracking-tight text-stone-800 dark:text-stone-100 mb-4 max-w-xs leading-tight">
          Get back in touch with yourself
        </h1>

        <p className="text-sm text-stone-500 dark:text-stone-400 mb-10 leading-relaxed max-w-sm">
          TouchBase is a safe, supportive community on the BASE chain.
          Vent honestly, discover local resources, and connect with people
          who genuinely care — anonymously or not.
        </p>

        <div className="flex flex-col gap-3 w-full max-w-xs">
          <Link
            href="/onboarding"
            className="bg-stone-800 text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-stone-700 transition-colors shadow-md dark:bg-stone-200 dark:text-stone-900"
          >
            Get started →
          </Link>
          <Link
            href="/feed"
            className="border border-stone-300 text-stone-600 px-8 py-3.5 rounded-full font-semibold text-sm hover:border-stone-400 hover:bg-stone-100 transition-colors dark:border-stone-700 dark:text-stone-400"
          >
            Browse the feed
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 pb-8">
        <div className="grid grid-cols-2 gap-3">
          {[
            { emoji: "📍", title: "Local resources", desc: "Nearby support matched to what you're going through." },
            { emoji: "🎭", title: "Your choice", desc: "Post anonymously by default. Reveal yourself only when ready." },
            { emoji: "💛", title: "Kindness rewards", desc: "Support earns BASE-chain points redeemable on-chain." },
            { emoji: "🤝", title: "Real connection", desc: "Encrypted DMs. Reach out without revealing yourself." },
          ].map((f) => (
            <div
              key={f.title}
              className="flex flex-col p-4 rounded-2xl border border-stone-200 bg-white dark:bg-stone-900 dark:border-stone-700"
            >
              <span className="text-2xl mb-2">{f.emoji}</span>
              <h3 className="text-xs font-semibold text-stone-800 dark:text-stone-100 mb-1">{f.title}</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
