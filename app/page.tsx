import Link from "next/link";
import Header from "./components/Header";
import Button from "./components/Button";

export default function Home() {
  return (
    <>
      <Header>
        <div className="flex items-center gap-3">
          <Link href="/auth/login">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button variant="primary" size="sm">
              Get Started
            </Button>
          </Link>
        </div>
      </Header>

      <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  Debate Smarter
                </h1>
                <p className="text-xl text-slate-300">
                  Master argumentation with AI-powered analysis. Get real-time feedback on your debate skills and climb the ELO leaderboard.
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-slate-400">
                  DebateIQ analyzes your arguments for strength, relevance, evidence usage, logical consistency, and engagement with opposing points.
                </p>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-3">
                    <span>Real-time argument analysis powered by AI</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span>ELO-based rating system for fair competition</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span>Detailed post-debate analytics and insights</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span>Public and private debate modes</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/register">
                  <Button variant="primary" size="lg">
                    Start Debating
                  </Button>
                </Link>
                <Link href="/modes">
                  <Button variant="outline" size="lg">
                    Explore Modes
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-2xl opacity-20"></div>
              <div className="relative bg-slate-800 rounded-2xl p-8 border border-slate-700">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Your Rating</span>
                    <span className="text-3xl font-bold text-blue-400">1,250</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 w-3/4"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700">
                    <div>
                      <p className="text-slate-400 text-sm">Debates</p>
                      <p className="text-2xl font-bold">24</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Avg Score</p>
                      <p className="text-2xl font-bold">78%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-800">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-blue-500 transition">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              </div>
              <h3 className="text-xl font-semibold mb-2">Debate</h3>
              <p className="text-slate-400">Create or join a debate room. Share your arguments in real-time with your opponent.</p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-blue-500 transition">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
              <p className="text-slate-400">Our AI analyzes each argument across multiple dimensions for objective feedback.</p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-blue-500 transition">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Rating System</h3>
              <p className="text-slate-400">Your ELO rating evolves based on performance quality, not just wins or losses.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-800">
          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl p-12 text-center border border-blue-500/30">
            <h2 className="text-3xl font-bold mb-4">Ready to Improve Your Debate Skills?</h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of critical thinkers who are already using DebateIQ to sharpen their argumentation skills.
            </p>
            <Link href="/auth/register">
              <Button variant="primary" size="lg">
                Create Your Account
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-800 py-8 px-4">
          <div className="max-w-7xl mx-auto text-center text-slate-400">
            <p>&copy; 2026 DebateIQ. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </>
  );
}
