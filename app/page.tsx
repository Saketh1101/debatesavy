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

      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-300 bg-clip-text text-transparent leading-tight">
                  Debate Like a Pro
                </h1>
                <p className="text-xl text-slate-300 leading-relaxed">
                  Master argumentation with AI-powered coaching. Get real-time feedback, improve your skills, and dominate the leaderboard.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/register">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">
                    Start Free Trial
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Sign In
                  </Button>
                </Link>
              </div>

              <div className="pt-8 border-t border-slate-700/50 space-y-4">
                <p className="text-sm text-slate-400">Trusted by debaters worldwide</p>
                <div className="flex flex-wrap gap-6">
                  <div>
                    <p className="text-2xl font-bold text-purple-400">10K+</p>
                    <p className="text-sm text-slate-400">Active Users</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-400">50K+</p>
                    <p className="text-sm text-slate-400">Debates Completed</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-cyan-400">95%</p>
                    <p className="text-sm text-slate-400">User Satisfaction</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative h-96 md:h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 h-full flex flex-col justify-center">
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-lg p-4">
                    <p className="text-sm text-slate-400">Debate Mode</p>
                    <p className="text-lg font-semibold text-purple-300">Friendly Discussion</p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-lg p-4">
                    <p className="text-sm text-slate-400">Challenge</p>
                    <p className="text-lg font-semibold text-blue-300">Debate Famous Figures</p>
                  </div>
                  <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-lg p-4">
                    <p className="text-sm text-slate-400">Compete</p>
                    <p className="text-lg font-semibold text-cyan-300">Online Tournaments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-center text-slate-400 mb-16 text-lg">Everything you need to become a debate master</p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AI Coaching",
                description: "Real-time feedback on your arguments powered by advanced AI"
              },
              {
                title: "ELO System",
                description: "Fair ranking system that tracks your improvement over time"
              },
              {
                title: "Multiple Modes",
                description: "Friendly debates, famous figures, or competitive tournaments"
              },
              {
                title: "Analytics",
                description: "Detailed insights into your debate performance and patterns"
              },
              {
                title: "Global Community",
                description: "Connect with debaters from around the world"
              },
              {
                title: "Leaderboards",
                description: "Compete globally and climb the rankings"
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border border-slate-700/50 rounded-xl p-6 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10 group">
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-2xl opacity-20"></div>
            <div className="relative bg-gradient-to-r from-slate-900 to-slate-800 border border-purple-500/30 rounded-2xl p-12 text-center">
              <h2 className="text-4xl font-bold text-white mb-4">Ready to dominate debates?</h2>
              <p className="text-slate-300 mb-8 text-lg">Join thousands of debaters improving their skills with DebateIQ.</p>
              <Link href="/auth/register">
                <Button variant="primary" size="lg">
                  Start Your Journey
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
