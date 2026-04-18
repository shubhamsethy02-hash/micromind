"use client";

import { motion } from "framer-motion";
import { Zap, Target, Brain } from "lucide-react";
import { useRouter } from "next/navigation"; // ✅ ADDED
import { useState, useEffect } from "react";

export default function Page() {
  const router = useRouter(); // ✅ ADDED
  const [particles, setParticles] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setParticles(
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 500 - 250,
        y: Math.random() * 500 - 250,
        size: Math.random() * 8 + 3,
        delay: Math.random() * 3
      }))
    );
  }, []);

  const features = [
    {
      icon: Zap,
      title: "Single-step execution",
      description: "Know exactly what to do next",
      color: "from-amber-500/20 to-orange-500/20"
    },
    {
      icon: Brain,
      title: "Turn ideas into action",
      description: "From confusion to clarity",
      color: "from-blue-500/20 to-purple-500/20"
    },
    {
      icon: Target,
      title: "Zero overthinking",
      description: "Focus only on what matters",
      color: "from-green-500/20 to-emerald-500/20"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf9f7] via-[#f5f3f0] to-[#ebe8e3]">
      {/* Navigation */}
      <nav className="border-b border-black/5 backdrop-blur-sm bg-white/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <motion.div 
            className="text-xl tracking-tight font-semibold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            MicroMind
          </motion.div>
          <div className="flex items-center gap-8">
            <a href="#features" className="text-sm hover:opacity-60 transition-opacity hidden md:block font-medium">
              Features
            </a>
            <a href="#how-it-works" className="text-sm hover:opacity-60 transition-opacity hidden md:block font-medium">
              How it works
            </a>
            <button
              onClick={() => router.push("/micromind")} // ✅ ADDED
              className="bg-black text-white px-6 py-2.5 rounded-full text-sm hover:bg-black/90 transition-all hover:scale-105 active:scale-95 font-medium shadow-lg shadow-black/10"
            >
              Try MicroMind
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Animation */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-6 px-4 py-2 bg-black/5 rounded-full text-sm font-medium">
              ✨ Your execution companion
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tight mb-8 font-medium">
              For people stuck with{" "}
              <span className="italic bg-gradient-to-r from-black to-black/60 bg-clip-text text-transparent">ideas</span>
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed text-black/70 mb-4">
              Execution system for idea-stage builders
            </p>
            <p className="text-lg leading-relaxed text-black/80 mb-6 font-medium">
              Describe your idea. Get one step. Do it now.
            </p>
            <p className="text-lg leading-relaxed text-black/60 mb-8">
              You don't need more ideas. You need to act.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => router.push("/micromind")} // ✅ ADDED
                className="inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-full text-base font-medium hover:bg-black/90 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/20"
              >
                Tell me what to do →
              </button>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 bg-white/80 backdrop-blur text-black px-8 py-4 rounded-full text-base font-medium hover:bg-white transition-all border border-black/10"
              >
                See how it works
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Animated Visual Element */}
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Gradient background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Particles that converge to center */}
                {particles.map((particle) => (
                  <motion.div
                    key={particle.id}
                    className="absolute rounded-full bg-gradient-to-br from-black via-black/80 to-black/60"
                    style={{
                      width: particle.size,
                      height: particle.size,
                    }}
                    initial={{
                      x: particle.x,
                      y: particle.y,
                      opacity: 0.2
                    }}
                    animate={{
                      x: [particle.x, 0, particle.x],
                      y: [particle.y, 0, particle.y],
                      opacity: [0.2, 1, 0.2],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      delay: particle.delay,
                      ease: "easeInOut"
                    }}
                  />
                ))}
                
                {/* Center focal point with glow */}
                <motion.div
                  className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-black to-black/80 shadow-2xl shadow-black/50"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Rotating rings with gradient */}
                <motion.div
                  className="absolute w-40 h-40 rounded-full border-2 border-black/30"
                  style={{
                    background: "linear-gradient(135deg, transparent 40%, rgba(0,0,0,0.05) 50%, transparent 60%)"
                  }}
                  animate={{
                    rotate: 360,
                    scale: [1, 1.15, 1]
                  }}
                  transition={{
                    rotate: { duration: 12, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
                
                <motion.div
                  className="absolute w-60 h-60 rounded-full border border-black/20"
                  animate={{
                    rotate: -360,
                    scale: [1, 1.08, 1]
                  }}
                  transition={{
                    rotate: { duration: 18, repeat: Infinity, ease: "linear" },
                    scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
                
                <motion.div
                  className="absolute w-80 h-80 rounded-full border border-black/10"
                  animate={{
                    rotate: 360,
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                    scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-5xl font-semibold mb-2">1</div>
            <div className="text-black/60">clear step</div>
          </motion.div>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-5xl font-semibold mb-2">0</div>
            <div className="text-black/60">overthinking</div>
          </motion.div>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-5xl font-semibold mb-2">Real</div>
            <div className="text-black/60">progress</div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl mb-12 font-semibold tracking-tight">Built for one thing: execution</h2>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className={`bg-gradient-to-br ${feature.color} backdrop-blur rounded-3xl p-8 hover:scale-105 transition-all duration-300 border border-black/5 shadow-lg hover:shadow-2xl group cursor-pointer`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="space-y-6">
                  <div className="w-14 h-14 bg-black/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl mb-4 leading-tight font-semibold">{feature.title}</h3>
                    <p className="text-base leading-relaxed text-black/70">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 border-t border-black/10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl mb-6 leading-tight font-semibold tracking-tight">
              Stop thinking.<br />Start building.
            </h2>
            <p className="text-xl text-black/70 leading-relaxed font-medium">
              Most people stay stuck here. You won't.
            </p>
          </motion.div>
          <div className="space-y-6">
            {[
              {
                number: "01",
                title: "Describe your idea"
              },
              {
                number: "02",
                title: "Get one clear step"
              },
              {
                number: "03",
                title: "Do it now"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                className="flex gap-6 p-6 bg-white/50 backdrop-blur rounded-2xl border border-black/5 hover:border-black/10 transition-all group"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl font-bold text-black/20 group-hover:text-black/40 transition-colors">
                  {step.number}
                </div>
                <div className="flex items-center">
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Section */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <motion.div
          className="bg-white/80 backdrop-blur rounded-3xl p-8 md:p-12 border border-black/10 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="space-y-6">
            <div>
              <div className="text-sm uppercase tracking-wide text-black/50 font-semibold mb-2">IDEA</div>
              <p className="text-xl md:text-2xl text-black/80 leading-relaxed">
                "I want to build a fitness app"
              </p>
            </div>
            <div className="h-px bg-black/10"></div>
            <div>
              <div className="text-sm uppercase tracking-wide text-black/50 font-semibold mb-2">STEP</div>
              <p className="text-xl md:text-2xl font-medium text-black leading-relaxed">
                Message 3 people and ask what they struggle with
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <motion.div
          className="bg-gradient-to-br from-black to-black/90 rounded-3xl p-12 md:p-20 text-center text-white shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl tracking-tight mb-6 font-semibold">
            Ready to start executing?
          </h2>
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            Join builders who've stopped overthinking and started shipping.
          </p>
          <button
            onClick={() => router.push("/micromind")} // ✅ ADDED
            className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full text-lg font-medium hover:bg-white/90 transition-all hover:scale-105 active:scale-95 shadow-xl"
          >
            Tell me what to do →
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/10 py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center text-sm text-black/50">
          <p>© 2026 MicroMind. Built for builders who ship.</p>
        </div>
      </footer>
    </div>
  );
}