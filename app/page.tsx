import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">TB</span>
            </div>
            <span className="font-semibold text-lg">touch-base</span>
          </div>
          <nav className="flex items-center gap-4 text-sm text-gray-600">
            <a
              href="https://docs.base.org/mini-apps/quickstart/create-new-miniapp"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              Docs
            </a>
            <Link
              href="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-1.5 text-sm text-blue-700 font-medium mb-8">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            BASE Chain · Farcaster Mini Apps
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Register your app with{" "}
            <span className="text-blue-600">BASE Dev Platform</span>
          </h1>

          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Generate your Farcaster manifest, verify your domain ownership, and
            publish your Mini App on the BASE chain. Get discovered in Farcaster
            clients worldwide.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              Register Your App →
            </Link>
            <a
              href="https://docs.base.org/mini-apps/quickstart/create-new-miniapp"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-300 bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-gray-400 hover:bg-gray-50 transition-colors"
            >
              View Docs
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">
            Everything you need to register
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-start p-6 rounded-2xl border border-gray-200 hover:border-blue-200 hover:bg-blue-50/30 transition-colors">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Manifest Generator</h3>
              <p className="text-sm text-gray-600">
                Fill in your app details and generate a valid{" "}
                <code className="bg-gray-100 px-1 rounded text-xs">farcaster.json</code>{" "}
                manifest ready to deploy.
              </p>
            </div>

            <div className="flex flex-col items-start p-6 rounded-2xl border border-gray-200 hover:border-blue-200 hover:bg-blue-50/30 transition-colors">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Domain Verification</h3>
              <p className="text-sm text-gray-600">
                Step-by-step guide to sign your manifest with your Farcaster
                account and verify domain ownership.
              </p>
            </div>

            <div className="flex flex-col items-start p-6 rounded-2xl border border-gray-200 hover:border-blue-200 hover:bg-blue-50/30 transition-colors">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Publish &amp; Discover</h3>
              <p className="text-sm text-gray-600">
                Get your Mini App indexed in Farcaster clients and the BASE app
                store for maximum discoverability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">
            How it works
          </h2>
          <div className="space-y-6">
            {[
              { step: "1", title: "Enter App Details", description: "Provide your app name, description, icon, and URLs." },
              { step: "2", title: "Configure Appearance", description: "Set your splash screen, hero image, and brand colors." },
              { step: "3", title: "Verify Domain Ownership", description: "Sign your manifest using Warpcast Developer Tools to prove you control the domain." },
              { step: "4", title: "Deploy Your Manifest", description: "Host the generated farcaster.json at /.well-known/farcaster.json on your domain." },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {item.step}
                </div>
                <div className="pt-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/register"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors shadow-md inline-block"
            >
              Start Registration →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">TB</span>
            </div>
            <span>touch-base — BASE chain mini-app</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://docs.base.org/mini-apps/quickstart/create-new-miniapp" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">BASE Docs</a>
            <a href="https://miniapps.farcaster.xyz/docs/guides/publishing" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">Farcaster Docs</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
