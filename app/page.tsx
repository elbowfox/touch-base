import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">TB</span>
            </div>
            <span className="font-semibold text-lg text-gray-900">touch-base</span>
          </div>
          <nav className="flex items-center gap-3 text-sm">
            <Link
              href="/feed"
              className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
            >
              Feed
            </Link>
            <Link
              href="/register"
              className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
            >
              Dev Docs
            </Link>
            <Link
              href="/onboarding"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-full px-4 py-1.5 text-sm text-indigo-700 font-medium mb-8">
            <span>🤝</span>
            BASE Chain · Farcaster Mini App · Community Support
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Connect, vent, and{" "}
            <span className="text-indigo-600">find support</span>
          </h1>

          <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            A safe community where you can share honestly, discover local
            resources that match what you&apos;re going through, and offer or
            receive support — anonymously or not.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/onboarding"
              className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
            >
              Join the community →
            </Link>
            <Link
              href="/feed"
              className="border border-gray-300 bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-gray-400 hover:bg-gray-50 transition-colors"
            >
              Browse the feed
            </Link>
          </div>
        </div>
      </section>

      {/* Feature highlights */}
      <section className="py-16 px-4 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">
            What makes touch-base different
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                emoji: "📍",
                title: "Local resources",
                desc: "Opt in to location services and get crisis lines, support groups, events, and community spaces near you — matched to what you're going through.",
              },
              {
                emoji: "🎭",
                title: "Your identity, your choice",
                desc: "Post anonymously by default. Reveal yourself only when you choose — via end-to-end encrypted DM powered by Farcaster.",
              },
              {
                emoji: "💛",
                title: "Kindness rewards",
                desc: "Consistent engagement and meaningful support earn BASE-chain Kindness Points. Milestone rewards include USDC donations and redeemable tokens.",
              },
              {
                emoji: "🌱",
                title: "Personalised to you",
                desc: "Your onboarding answers — hobbies, skills, comfort anchors — shape every resource recommendation so results actually resonate.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="flex flex-col p-5 rounded-2xl bg-white border border-gray-200 hover:border-indigo-200 hover:shadow-sm transition-all"
              >
                <span className="text-3xl mb-3">{f.emoji}</span>
                <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">
            How it works
          </h2>
          <div className="space-y-6">
            {[
              {
                step: "1",
                emoji: "📝",
                title: "Create your profile",
                desc: "Answer a few quick questions: what pulls you out of a doom spiral, your natural skills, comfort food, hobbies.",
              },
              {
                step: "2",
                emoji: "📍",
                title: "Opt in to location (optional)",
                desc: "Share your location or area to unlock nearby support services, community events, and spaces relevant to your situation.",
              },
              {
                step: "3",
                emoji: "💬",
                title: "Vent, respond, connect",
                desc: "Post openly or anonymously. Reply to others. When you see someone in acute need, reach out via encrypted DM — with or without revealing your identity.",
              },
              {
                step: "4",
                emoji: "💛",
                title: "Earn for showing up",
                desc: "Every post, helpful vote, and supportive reply earns Kindness Points on BASE. Hit milestones to convert them into real on-chain value.",
              },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {item.step}
                </div>
                <div className="pt-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {item.emoji} {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/onboarding"
              className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-colors shadow-md inline-block"
            >
              Start your journey →
            </Link>
          </div>
        </div>
      </section>

      {/* Developer section */}
      <section className="py-12 px-4 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm text-gray-500 mb-2">For developers</p>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Register touch-base with the BASE Dev Platform
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Generate your{" "}
            <code className="bg-gray-100 px-1 rounded text-xs">
              farcaster.json
            </code>{" "}
            manifest, verify domain ownership, and publish as a Farcaster Mini
            App.
          </p>
          <Link
            href="/register"
            className="inline-block text-sm font-medium text-indigo-600 hover:text-indigo-800 underline"
          >
            Open registration wizard →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">TB</span>
            </div>
            <span>touch-base — BASE chain community support mini-app</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/feed" className="hover:text-indigo-600 transition-colors">Feed</Link>
            <Link href="/onboarding" className="hover:text-indigo-600 transition-colors">Join</Link>
            <a href="https://docs.base.org/mini-apps/quickstart/create-new-miniapp" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">BASE Docs</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
