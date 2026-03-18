import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Zap, Target, Cpu, Mail, MessageSquare } from "lucide-react";
import { CASE_STUDIES } from "./constants";
import Lenis from "lenis";

export default function CaseStudyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = CASE_STUDIES.find((p) => p.id === id);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) { window.scrollTo(0, 0); return; }
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    window.scrollTo(0, 0);
    return () => lenis.destroy();
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
        <h1 className="text-4xl font-display font-bold mb-6">Project Not Found</h1>
        <Link to="/" className="bg-neon-purple px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-dark text-white font-sans selection:bg-neon-purple/30 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-xl border-b border-white/5 py-6 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <div className="text-xl font-display font-black tracking-tighter">
            BLACK <span className="text-neon-purple">APEX</span>
          </div>
          <Link to="/" className="text-[10px] uppercase tracking-[0.3em] text-white/50 hover:text-white transition-colors">
            Home
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-40 pb-20 px-6 md:px-12 relative overflow-hidden">
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b ${project.color} to-transparent opacity-30 blur-[120px]`} />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center p-3 bg-white/10">
              <img src={project.logo} alt={project.title} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
            </div>
            <div>
              <span className="text-neon-purple uppercase tracking-[0.5em] text-xs font-bold block mb-1">{project.tag}</span>
              <h1 className="text-4xl md:text-7xl font-display font-black tracking-tighter">{project.title}</h1>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16">
            <div className="lg:col-span-2 space-y-12">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Overview</h2>
                <p className="text-xl md:text-2xl font-light leading-relaxed text-white/80">
                  {project.fullDescription}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="glass p-8 rounded-3xl border-white/5"
                >
                  <h3 className="text-neon-purple font-display font-bold text-xl mb-4 flex items-center gap-2">
                    <Target size={20} /> The Challenge
                  </h3>
                  <p className="text-white/50 font-light leading-relaxed">{project.problem}</p>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="glass p-8 rounded-3xl border-white/5"
                >
                  <h3 className="text-neon-cyan font-display font-bold text-xl mb-4 flex items-center gap-2">
                    <Zap size={20} /> The Solution
                  </h3>
                  <p className="text-white/50 font-light leading-relaxed">{project.solution}</p>
                </motion.div>
              </div>
            </div>

            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="glass p-8 rounded-3xl border-white/5"
              >
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-6">Impact Metrics</h3>
                <div className="space-y-6">
                  {project.impactMetrics.map((metric, i) => (
                    <div key={i} className="flex justify-between items-end border-b border-white/5 pb-4">
                      <span className="text-sm text-white/60">{metric.label}</span>
                      <span className="text-2xl font-display font-black text-neon-purple">{metric.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="glass p-8 rounded-3xl border-white/5"
              >
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-6">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/60 border border-white/10">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      {/* Detailed Features */}
      <section className="py-32 px-6 md:px-12 bg-black/40">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tighter mb-16">
            KEY <span className="text-gradient">IMPLEMENTATIONS</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.keyFeatures.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass p-8 rounded-3xl border-white/5 flex items-start gap-4 group hover:bg-white/5 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-neon-purple/20 flex items-center justify-center text-neon-purple group-hover:bg-neon-purple group-hover:text-white transition-all">
                  <CheckCircle2 size={20} />
                </div>
                <p className="text-lg font-light text-white/80 pt-1">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Section */}
      <section className="py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="aspect-video rounded-[4rem] overflow-hidden glass border-white/10 relative group">
            <img 
              src={`https://picsum.photos/seed/${project.id}-detail/1920/1080`} 
              alt={project.title} 
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-neon-purple flex items-center justify-center mb-6 mx-auto animate-pulse">
                  <Cpu size={40} />
                </div>
                <h3 className="text-2xl font-display font-bold uppercase tracking-widest">Digital Ecosystem</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Project CTA */}
      <section className="py-32 px-6 md:px-12 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-white/20 uppercase tracking-[0.5em] text-xs font-bold mb-8 block">Next Project</span>
          <h2 className="text-4xl md:text-7xl font-display font-black tracking-tighter mb-12">
            WANT TO SEE <br /> <span className="text-gradient">MORE?</span>
          </h2>
          <Link 
            to="/" 
            className="inline-flex items-center gap-3 bg-white text-black px-12 py-6 rounded-full font-display font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform"
          >
            Back to Portfolio <ArrowUpRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-display font-black tracking-tighter">
            BLACK <span className="text-neon-purple">APEX</span>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <a href="mailto:yashbajpaknpindia@gmail.com" className="text-white/40 hover:text-white transition-colors flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold">
              <Mail size={14} /> Email Me
            </a>
            <a href="https://wa.me/917897671348" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold">
              <MessageSquare size={14} /> WhatsApp
            </a>
          </div>
          <p className="text-white/20 text-[10px] uppercase tracking-[0.4em] font-bold">
            &copy; 2026 Yash Bajpai
          </p>
        </div>
      </footer>
    </div>
  );
}
