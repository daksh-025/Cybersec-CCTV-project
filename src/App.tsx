import { Shield, Mail, Phone, Link2, Mic, ChevronRight, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

function App() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      icon: Mail,
      title: 'Email & Text Scanner',
      description: 'AI-powered analysis to detect phishing attempts and scam messages in real-time',
      gradient: 'from-blue-500 to-cyan-500',
      path: '/email-scanner'
    },
    {
      icon: Phone,
      title: 'Phone Number Lookup',
      description: 'Instantly verify caller identity and check scam likelihood ratings',
      gradient: 'from-emerald-500 to-teal-500',
      path: '/phone-lookup'
    },
    {
      icon: Link2,
      title: 'Link Scanner',
      description: 'Analyze URLs for malicious content and fraudulent websites before you click',
      gradient: 'from-orange-500 to-red-500',
      path: '/link-scanner'
    },
    {
      icon: Mic,
      title: 'Voice Deepfake Detector',
      description: 'Advanced AI detection to identify synthetic voices and deepfake audio',
      gradient: 'from-violet-500 to-purple-500',
      path: '/voice-detector'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Shield className="w-8 h-8 text-cyan-400" strokeWidth={2.5} />
                <div className="absolute inset-0 blur-xl bg-cyan-400/30 -z-10" />
              </div>
              <span className="text-2xl font-bold text-white">SecureGuard</span>
            </div>
            <button className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 py-24 relative">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6 animate-pulse">
              <AlertTriangle className="w-4 h-4" />
              <span>Protecting you from digital threats</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight">
              Your Digital
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"> Security</span>
              <br />Command Center
            </h1>

            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Advanced AI-powered tools to detect scams, verify identities, and protect you from cyber threats.
              Stay one step ahead of fraudsters with real-time analysis.
            </p>

            <div className="flex items-center justify-center gap-4 pt-4">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2">
                Try It Now
                <ChevronRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 bg-slate-800 border border-slate-700 text-white rounded-xl font-semibold hover:bg-slate-700 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Comprehensive Protection Suite
          </h2>
          <p className="text-slate-400 text-lg">
            Everything you need to stay safe online, powered by cutting-edge AI
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-slate-600 transition-all duration-500 cursor-pointer overflow-hidden"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                {/* Gradient Background Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.gradient} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-base leading-relaxed mb-6">
                  {feature.description}
                </p>

                {/* CTA */}
                <div className="flex items-center gap-2 text-cyan-400 font-semibold group-hover:gap-4 transition-all duration-300">
                  <span>Explore Feature</span>
                  <ChevronRight
                    className={`w-5 h-5 transition-transform duration-300 ${
                      hoveredFeature === index ? 'translate-x-1' : ''
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-12">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                99.9%
              </div>
              <div className="text-slate-400 font-medium">Detection Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
                &lt;1s
              </div>
              <div className="text-slate-400 font-medium">Analysis Time</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <div className="text-slate-400 font-medium">Protection Active</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="relative bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl p-16 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Secure Your Digital Life?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands who trust SecureGuard to protect them from scams and cyber threats
            </p>
            <button className="px-10 py-5 bg-white text-cyan-600 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
              Start Free Trial
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-cyan-400" />
              <span className="text-lg font-semibold text-white">SecureGuard</span>
            </div>
            <div className="text-slate-500 text-sm">
              © 2025 SecureGuard. Protecting your digital world.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
