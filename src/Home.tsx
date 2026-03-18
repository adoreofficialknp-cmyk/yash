import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useSpring, useInView, AnimatePresence } from "motion/react";
import Lenis from "lenis";
import { 
  Cpu, 
  Gem, 
  Linkedin, 
  Phone, 
  Mail, 
  ChevronRight,
  Menu,
  X,
  ArrowUpRight,
  MessageSquare,
  Zap,
  Layout,
  Smartphone,
  Palette,
  Target
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CASE_STUDIES } from "./constants";

/** Utility for Tailwind classes */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Animated Counter Component */
const Counter = ({ value, duration = 2, suffix = "" }: { value: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const totalFrames = duration * 60;
      let frame = 0;

      const timer = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const easeOutQuad = 1 - (1 - progress) * (1 - progress);
        const currentCount = Math.floor(easeOutQuad * end);
        
        setCount(currentCount);

        if (frame === totalFrames) {
          clearInterval(timer);
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const lenis = isTouchDevice ? null : new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      if (lenis) lenis.raf(time);
      requestAnimationFrame(raf);
    }

    if (lenis) requestAnimationFrame(raf);

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        containerRef.current.style.setProperty("--mouse-x", `${e.clientX}px`);
        containerRef.current.style.setProperty("--mouse-y", `${e.clientY}px`);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      if (lenis) lenis.destroy();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen font-sans bg-bg-dark text-white selection:bg-neon-purple/30 bg-spotlight overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-purple via-neon-blue to-neon-pink z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Sticky CTA */}
      <div className="fixed top-6 right-6 z-[60] hidden md:block">
        <motion.a 
          href="#contact"
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          className="glass px-6 py-3 rounded-full text-xs font-display font-bold uppercase tracking-widest flex items-center gap-2 border-neon-purple/30"
        >
          <Zap size={14} className="text-neon-purple" />
          Start a Project
        </motion.a>
      </div>

      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500 py-6 px-6 md:px-12",
        scrolled ? "bg-black/40 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-display font-black tracking-tighter"
          >
            BLACK <span className="text-neon-purple">APEX</span>
          </motion.div>

          <div className="hidden md:flex gap-10 items-center">
            <a href="#services" className="text-[10px] uppercase tracking-[0.3em] text-white/50 hover:text-white transition-colors">Services</a>
            <a href="#projects" className="text-[10px] uppercase tracking-[0.3em] text-white/50 hover:text-white transition-colors">Projects</a>
            <a href="mailto:yashbajpaknpindia@gmail.com" className="text-[10px] uppercase tracking-[0.3em] text-white/50 hover:text-white transition-colors">Contact</a>
          </div>
          
          <button 
            className="md:hidden text-white p-2" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-2xl border-b border-white/10 p-8 flex flex-col gap-6 md:hidden overflow-hidden"
            >
              {["Services", "Projects", "About", "Contact"].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-display font-bold text-white/80 hover:text-neon-purple transition-colors"
                >
                  {item}
                </a>
              ))}
              <a 
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="bg-neon-purple text-white px-6 py-4 rounded-full text-center font-bold uppercase tracking-widest text-sm"
              >
                Start a Project
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen flex flex-col justify-center px-6 md:px-12 overflow-hidden" style={{contain: 'paint'}}>
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
              x: [0, 50, 0],
              y: [0, -30, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-neon-purple/20 rounded-full blur-[80px] md:blur-[120px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.05, 0.15, 0.05],
              x: [0, -40, 0],
              y: [0, 60, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-neon-blue/20 rounded-full blur-[80px] md:blur-[150px]" 
          />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 flex items-center gap-3"
          >
            <div className="w-12 h-[1px] bg-neon-purple" />
            <span className="text-neon-purple uppercase tracking-[0.5em] text-xs font-bold">Yash Bajpai</span>
          </motion.div>

          <h1 className="text-5xl md:text-8xl lg:text-[9rem] font-display font-black leading-[0.95] tracking-tighter mb-10">
            <motion.span 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="block"
            >
              BUILDING
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="block text-gradient"
            >
              DIGITAL
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="block"
            >
              POWERHOUSES
            </motion.span>
          </h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col md:flex-row gap-8 items-start md:items-center"
          >
            <p className="max-w-md text-white/40 text-sm md:text-base font-light leading-relaxed">
              We architect high-performance digital ecosystems that scale businesses and dominate markets. Precision. Innovation. Growth.
            </p>
            <div className="flex gap-4">
              <motion.a 
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-8 py-4 rounded-full font-display font-bold text-xs uppercase tracking-widest inline-block"
              >
                Book Consultation
              </motion.a>
              <motion.a 
                href="#projects"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="glass px-8 py-4 rounded-full font-display font-bold text-xs uppercase tracking-widest inline-block"
              >
                Our Work
              </motion.a>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Numbers Section */}
      <section className="py-20 border-y border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            { value: 20, suffix: "+", label: "Projects / Month" },
            { value: 50000, suffix: "+", label: "Avg / Project (₹)", prefix: "₹" },
            { value: 20, suffix: "%", label: "Monthly Growth" }
          ].map((stat, i) => (
            <div key={i} className="space-y-2">
              <div className="text-5xl md:text-7xl font-display font-black text-white">
                {stat.prefix}<Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section - CENTERED PROPERLY */}
      <section id="services" className="py-32 px-6 md:px-12 relative flex flex-col items-center text-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-20">
            <span className="text-neon-blue uppercase tracking-[0.5em] text-[10px] font-bold mb-4 block">Our Expertise</span>
            <h2 className="text-4xl md:text-7xl font-display font-black tracking-tighter leading-none mb-6">
              PREMIUM <br /> <span className="text-white/20">SOLUTIONS</span>
            </h2>
            <p className="max-w-xl mx-auto text-white/40 text-sm md:text-base font-light">
              We don't just build websites; we build business engines that drive results. Our multidisciplinary approach ensures every touchpoint is optimized for growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              { icon: <Layout />, title: "Web Development", desc: "Ultra-fast, SEO-optimized static and dynamic web powerhouses." },
              { icon: <Smartphone />, title: "App Development", desc: "High-performance native and cross-platform mobile experiences." },
              { icon: <Palette />, title: "UI/UX Design", desc: "Psychology-backed interfaces designed for maximum conversion." },
              { icon: <Target />, title: "Marketing", desc: "Data-driven growth strategies that dominate your market niche." }
            ].map((service, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10, backgroundColor: "rgba(255,255,255,0.05)" }}
                className="glass p-10 rounded-[2.5rem] group transition-all duration-500 border-white/5"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-neon-purple mb-8 group-hover:scale-110 group-hover:bg-neon-purple group-hover:text-white transition-all duration-500">
                  {service.icon}
                </div>
                <h3 className="text-xl font-display font-bold mb-4">{service.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed font-light">{service.desc}</p>
                <div className="mt-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neon-purple opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <ArrowUpRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 md:px-12 bg-black/40">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl md:text-7xl font-display font-black tracking-tighter text-center">
              CASE <span className="text-gradient">STUDIES</span>
            </h2>
          </div>

          <div className="space-y-16 md:space-y-32">
            {CASE_STUDIES.map((project, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={cn(
                  "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8 md:p-16 rounded-[4rem] border border-white/5 bg-gradient-to-br to-transparent",
                  project.color
                )}
              >
                <div className="order-2 lg:order-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 glass rounded-xl flex items-center justify-center p-2 overflow-hidden bg-white/10">
                      <img 
                        src={project.logo} 
                        alt={`${project.title} Logo`} 
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="text-neon-purple text-[10px] font-bold uppercase tracking-widest block">{project.tag}</span>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-display font-black mb-8">{project.title}</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Problem</h4>
                      <p className="text-white/80 font-light">{project.problem}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Solution</h4>
                      <p className="text-white/80 font-light">{project.solution}</p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-neon-cyan mb-2">Result</h4>
                      <p className="text-neon-cyan font-bold text-xl">{project.result}</p>
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2 aspect-video bg-white/5 rounded-3xl overflow-hidden group relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img 
                    src={`https://picsum.photos/seed/${project.id}/1200/800`} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-8 left-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <Link 
                      to={`/project/${project.id}`}
                      className="bg-white text-black px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest inline-block"
                    >
                      View Project
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-neon-purple/5 blur-[150px] rounded-full" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass p-8 md:p-16 lg:p-24 rounded-[4rem] border-white/10"
          >
            <h2 className="text-4xl md:text-7xl font-display font-black tracking-tighter mb-8">
              READY TO <br /> <span className="text-gradient">DOMINATE?</span>
            </h2>
            <p className="text-white/40 text-lg font-light mb-12 max-w-xl mx-auto">
              Stop settling for average. Let's build a digital powerhouse that crushes your competition.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <motion.a 
                href="mailto:yashbajpaknpindia@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-12 py-6 rounded-full font-display font-bold text-sm uppercase tracking-widest inline-block"
              >
                Email Me Now
              </motion.a>
              <motion.a 
                href="https://wa.me/917897671348"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="glass px-12 py-6 rounded-full font-display font-bold text-sm uppercase tracking-widest inline-block"
              >
                WhatsApp Chat
              </motion.a>
            </div>

            <div className="mt-16 pt-16 border-t border-white/5 flex flex-wrap justify-center gap-12">
              <a 
                href="mailto:yashbajpaknpindia@gmail.com" 
                className="flex items-center gap-3 text-white/40 hover:text-white transition-colors"
              >
                <Mail size={18} />
                <span className="text-xs font-bold uppercase tracking-widest">yashbajpaknpindia@gmail.com</span>
              </a>
              <a 
                href="https://wa.me/917897671348" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/40 hover:text-white transition-colors"
              >
                <MessageSquare size={18} />
                <span className="text-xs font-bold uppercase tracking-widest">WhatsApp</span>
              </a>
              <a 
                href="tel:+917897671348" 
                className="flex items-center gap-3 text-white/40 hover:text-white transition-colors"
              >
                <Phone size={18} />
                <span className="text-xs font-bold uppercase tracking-widest">+91 7897671348</span>
              </a>
            </div>
          </motion.div>
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
          <div className="flex gap-6">
            <a href="#" className="text-white/20 hover:text-white transition-colors"><Zap size={16} /></a>
            <a href="#" className="text-white/20 hover:text-white transition-colors"><Target size={16} /></a>
            <a href="#" className="text-white/20 hover:text-white transition-colors"><Gem size={16} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
