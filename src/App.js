import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useAnimation, useInView } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { 
  FaPython, FaJava, FaReact, FaNodeJs, FaAws, FaLinux, FaSun, FaMoon, FaPaperPlane 
} from 'react-icons/fa';
import { 
  SiMongodb, SiMysql, SiFlutter, SiCplusplus, SiJavascript 
} from 'react-icons/si';
import { 
  Github, Linkedin, Mail, Terminal, Code2, 
  Briefcase, GraduationCap, Award, Cpu, User, Users, Trophy, HardDrive, Wifi 
} from 'lucide-react';

// --- DATA ---
const NAV_LINKS = [
  { name: 'HOME', href: '#home' },
  { name: 'ABOUT', href: '#about' },
  { name: 'EXPERIENCE', href: '#experience' },
  { name: 'EDUCATION', href: '#education' },
  { name: 'PROJECTS', href: '#projects' },
  { name: 'SKILLS', href: '#skills' },
  { name: 'AWARDS', href: '#achievements' },
  { name: 'CONTACT', href: '#contact' },
];

const TECHNICAL_SKILLS = [
  { name: "Python", icon: FaPython, color: "#3776AB" },
  { name: "Java", icon: FaJava, color: "#007396" },
  { name: "React", icon: FaReact, color: "#61DAFB" },
  { name: "Node.js", icon: FaNodeJs, color: "#339933" },
  { name: "AWS", icon: FaAws, color: "#FF9900" },
  { name: "Linux", icon: FaLinux, color: "#FCC624" },
  { name: "Flutter", icon: SiFlutter, color: "#02569B" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "SQL", icon: SiMysql, color: "#4479A1" },
  { name: "JS", icon: SiJavascript, color: "#F7DF1E" },
];

const INTERPERSONAL_SKILLS = [
  { title: "Leadership", desc: "Led hackathon teams to finals." },
  { title: "Communication", desc: "Presenting technical concepts clearly." },
  { title: "Problem Solving", desc: "Troubleshooting complex network issues." },
  { title: "Adaptability", desc: "Quickly learning new stacks (Flutter/AWS)." },
];

const PROJECTS = [
  { title: "Time Table Generator", tags: ["Node.js", "MongoDB"], desc: "Automated scheduling algorithm." },
  { title: "Smart Tourist Safety", tags: ["AI/ML", "Python"], desc: "Hackathon winning safety solution." },
  { title: "Faculty Leave System", tags: ["React", "SQL"], desc: "Digital management portal." },
  { title: "Permissions Manager", tags: ["Security", "Admin"], desc: "Role-based access control." },
];

const ACHIEVEMENTS = [
  { title: "Smart India Hackathon 2025", desc: "Finalist - Smart Tourist Safety Monitoring System", icon: Trophy },
  { title: "Hackathon Finalist", desc: "Digital Faculty Leave Management System", icon: Award },
];

// --- ANIMATION COMPONENTS ---

// 1. SLOW MOTION HARD DISK BLAST
const HardDiskBlast = ({ children, isDark }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const driveControls = useAnimation();
  const contentControls = useAnimation();
  const flashControls = useAnimation();
  
  // Particles spread wider now
  const [particles] = useState(() => 
    [...Array(20)].map(() => ({
      x: (Math.random() - 0.5) * 1500, // Spread across entire screen width
      y: (Math.random() - 0.5) * 1000,
      rotation: Math.random() * 720,
      size: Math.random() * 10 + 2
    }))
  );

  useEffect(() => {
    if (isInView) {
      const sequence = async () => {
        // Step 1: Fly In (Slow Motion - 2.0s)
        await driveControls.start({
          x: ["-100vw", "0%"], 
          opacity: 1,
          rotate: [0, 720],
          transition: { duration: 1.2, ease: "circOut" }
        });

        // Step 2: Pause for Visibility (0.5s)
        await new Promise(r => setTimeout(r, 500));

        // Step 3: Flash Explosion
        flashControls.start({
          opacity: [0, 1, 0],
          scale: [0.5, 5],
          transition: { duration: 0.3 }
        });

        // Step 4: Drive Vanishes
        driveControls.start({ scale: 0, opacity: 0, transition: { duration: 0.1 } });

        // Step 5: Content Reveals
        contentControls.start({
          opacity: 1,
          scale: [0.9, 1],
          filter: ["blur(20px)", "blur(0px)"],
          transition: { duration: 0.6, ease: "circOut" }
        });
      };
      sequence();
    }
  }, [isInView, driveControls, contentControls, flashControls]);

  return (
    <div ref={ref} className="relative w-full min-h-[100px]">
      {/* Flying Drive */}
      <motion.div 
        initial={{ opacity: 0, x: "-100vw" }}
        animate={driveControls} 
        className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
      >
         <div className={`p-8 rounded-xl bg-black border-4 ${isDark ? 'border-green-500 shadow-[0_0_80px_#22c55e]' : 'border-blue-500 shadow-[0_0_80px_#3b82f6]'}`}>
            <HardDrive size={80} className={isDark ? 'text-green-500' : 'text-blue-500'} />
         </div>
      </motion.div>

      {/* Explosion Particles */}
      {isInView && particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ 
            x: p.x, 
            y: p.y, 
            opacity: [0, 1, 0], 
            rotate: p.rotation 
          }}
          transition={{ delay: 1.6, duration: 1.5, ease: "easeOut" }} // Delays until after fly-in + pause
          className={`absolute left-1/2 top-1/2 w-2 h-2 rounded-sm z-20 ${isDark ? 'bg-green-500' : 'bg-blue-500'}`}
          style={{ width: p.size, height: p.size }}
        />
      ))}

      {/* Flash */}
      <motion.div 
        animate={flashControls}
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full blur-3xl pointer-events-none opacity-0 z-20 ${isDark ? 'bg-green-500' : 'bg-blue-500'}`}
      />

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={contentControls}
        className="w-full relative z-10"
      >
        {children}
      </motion.div>
    </div>
  );
};


// 2. CONTACT ENVELOPE + FLY-AWAY ANIMATION
const ContactPostAnimation = ({ isDark, spotlightColor, formRef, onSubmit, isSending, sendStatus }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const baseBg = isDark ? 'bg-black/80 border-white/10' : 'bg-white/90 border-black/5 shadow-lg';
  const flapBg = isDark ? 'from-green-500/90 to-emerald-500/90' : 'from-blue-500/90 to-sky-500/90';

  const isFlying = sendStatus === 'success';

  return (
    <div ref={ref} className="relative max-w-3xl mx-auto min-h-[340px] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={isInView ? (
          isFlying
            ? { y: -420, scale: 0.4, opacity: 0, transition: { duration: 1.2, ease: 'easeInOut' } }
            : { y: 0, scale: 1, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } }
        ) : {}}
        className={`relative w-full rounded-3xl border ${baseBg} overflow-hidden px-6 pt-20 pb-10 ${isFlying || isSending ? 'pointer-events-none' : ''}`}
      >
        {/* Envelope header */}
        <div className="absolute top-4 left-6 flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] opacity-70">
          <span className="px-2 py-1 rounded-full border border-current/30">VISHNU MAIL</span>
          <span className="px-2 py-1 rounded-full border border-current/30">PRIORITY</span>
        </div>
        <div className="absolute top-4 right-6 w-10 h-10 rounded-xl border border-current/30 flex items-center justify-center text-[10px] font-bold rotate-6">
          STAMP
        </div>

        {/* Envelope flap that opens to show the form, and closes on send */}
        <motion.div
          initial={{ y: 0, opacity: 1 }}
          animate={isInView && !isSending && !isFlying ? { y: -160, opacity: 0 } : { y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className={`absolute inset-x-6 top-10 h-36 rounded-3xl bg-gradient-to-br ${flapBg} shadow-xl flex flex-col items-center justify-center text-xs font-mono text-white/90 tracking-[0.25em]`}
        >
          <span>ENVELOPE OPENED</span>
          <span className="mt-1 opacity-70">PLEASE FILL YOUR DETAILS</span>
        </motion.div>

        {/* Inner card with form, only visible when flap is open and not sending */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView && !isSending ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative z-10"
        >
          <SpotlightCard className="p-8 md:p-10 shadow-2xl" spotlightColor={spotlightColor}>
            <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-3">
              <Mail className={isDark ? 'text-green-400' : 'text-blue-500'} />
              <ScrambleText text="SEND MESSAGE" />
            </h2>
            <div className="text-center mb-6">
              <Wifi className={`mx-auto mb-2 animate-pulse ${isDark ? 'text-green-400' : 'text-blue-500'}`} size={32} />
              <p className="text-xs font-mono opacity-50">ENVELOPE CHANNEL READY • TYPE YOUR MESSAGE</p>
            </div>

            <form ref={formRef} onSubmit={onSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold opacity-70 tracking-widest">NAME</label>
                  <input
                    type="text"
                    name="user_name"
                    required
                    className={`w-full p-4 rounded-lg bg-black/10 border border-current/20 outline-none focus:border-${isDark ? 'green' : 'blue'}-500 transition-colors`}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold opacity-70 tracking-widest">EMAIL</label>
                  <input
                    type="email"
                    name="user_email"
                    required
                    className={`w-full p-4 rounded-lg bg-black/10 border border-current/20 outline-none focus:border-${isDark ? 'green' : 'blue'}-500 transition-colors`}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold opacity-70 tracking-widest">MESSAGE</label>
                <textarea
                  name="message"
                  rows="5"
                  required
                  className={`w-full p-4 rounded-lg bg-black/10 border border-current/20 outline-none focus:border-${isDark ? 'green' : 'blue'}-500 transition-colors`}
                ></textarea>
              </div>

              {sendStatus === 'error' && (
                <p className={`text-sm text-center ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                  Failed to send. Please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={isSending}
                className={`w-full py-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform disabled:opacity-60 disabled:hover:scale-100 ${isDark ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'}`}
              >
                <FaPaperPlane /> {isSending ? 'SEALING & SENDING...' : 'SEND TRANSMISSION'}
              </button>
            </form>
          </SpotlightCard>
        </motion.div>

        {/* When sending, show closed envelope silhouette */}
        {isSending && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 10 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute inset-x-12 bottom-6 h-32 rounded-3xl border border-dashed border-current/40 flex flex-col items-center justify-center text-[10px] font-mono gap-2"
          >
            <div className={`w-20 h-12 bg-gradient-to-br ${flapBg} rounded-md relative overflow-hidden`}></div>
            <span className="tracking-[0.25em] opacity-70">ENVELOPE SEALED</span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};


// 3. SPOTLIGHT CARD
const SpotlightCard = ({ children, className = "", spotlightColor = "rgba(51, 255, 0, 0.15)" }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-xl border border-gray-800/50 bg-gray-900/50 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-10"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      {/* Important: This inner div allows children to flex properly */}
      <div className="relative z-0 h-full">{children}</div>
    </div>
  );
};

// 4. SCRAMBLE TEXT
const ScrambleText = ({ text, className }) => {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&";
  const scramble = () => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplay(
        text.split("").map((letter, index) => {
          if (index < iterations) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      if (iterations >= text.length) clearInterval(interval);
      iterations += 1 / 3;
    }, 30);
  };
  return (
    <span onMouseEnter={scramble} className={`cursor-pointer ${className}`}>
      {display}
    </span>
  );
};

// 5. FLOATING WRAP
const FloatingWrap = ({ children, className = "" }) => (
  <motion.div
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

// --- RETRO COMPUTER INTRO ---
const RetroComputer = ({ onComplete }) => {
  const [text, setText] = useState([]);
  
  useEffect(() => {
    const lines = [
      "BIOS DATE 01/21/2026 10:15:22 VER 1.0.2",
      "CPU: QUANTUM CORE V.90 @ 4.20 GHz",
      "MEMORY TEST: 64535K OK",
      "",
      "DETECTING PRIMARY MASTER ... VISHNU_DRIVE_01",
      "LOADING VISHNU.SYS ........................ [OK]",
      "INITIALIZING GRAPHICS ADAPTER ............. [OK]",
      "",
      "WELCOME TO VISHNU OS.",
      "STARTING SESSION..."
    ];
    let i = 0;
    const interval = setInterval(() => {
      setText(prev => [...prev, lines[i]]);
      i++;
      if (i >= lines.length) {
        clearInterval(interval);
        setTimeout(onComplete, 1200);
      }
    }, 120);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 retro-container flex flex-col items-center justify-center z-[100] overflow-hidden font-mono"
      exit={{ scale: 50, opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      <div className="flex flex-col items-center scale-75 md:scale-100">
        <div className="retro-bezel">
          <div className="absolute top-3 left-4 flex items-center gap-2 z-30">
             <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_red]"></div>
             <span className="text-gray-600 font-bold text-[9px] tracking-widest">POWER</span>
          </div>
          <div className="retro-screen w-[300px] h-[220px] md:w-[640px] md:h-[400px] p-4 bg-black">
            <div className="scanlines" />
            <div className="phosphor-text text-xs md:text-sm leading-relaxed">
              {text.map((line, k) => <div key={k} className="min-h-[20px]">{line}</div>)}
              <motion.span animate={{ opacity: [0, 1] }} transition={{ repeat: Infinity, duration: 0.5 }} className="inline-block w-2 h-4 bg-[#33ff00] mt-1" />
            </div>
          </div>
          <div className="text-center mt-2 text-gray-400 font-bold text-xs tracking-[0.2em] opacity-60">VISHNU'S WORLD</div>
        </div>
        <div className="monitor-neck"></div>
        <div className="monitor-foot"></div>
      </div>
    </motion.div>
  );
};

// --- MAIN APP ---
const App = () => {
  const [booted, setBooted] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState(null); // 'success' | 'error' | null
  const form = useRef();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const systemPref = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    setTheme(systemPref);
  }, []);

  // Auto-clear success state after a short delay so the banner and
  // envelope animation don't stay stuck forever.
  useEffect(() => {
    if (sendStatus === 'success') {
      const timer = setTimeout(() => setSendStatus(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [sendStatus]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const sendEmail = (e) => {
    e.preventDefault();
    if (!form.current) return;

    setIsSending(true);
    setSendStatus(null);

    // TODO: Replace these placeholders with your actual EmailJS IDs
    const SERVICE_ID = 'service_7425t5a';
    const TEMPLATE_ID = 'template_48d6rvc';
    const PUBLIC_KEY = '4qenZrhHRY8VnCwrW';

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
        publicKey: PUBLIC_KEY,
      })
      .then(() => {
        setIsSending(false);
        setSendStatus('success');
        e.target.reset();
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        setIsSending(false);
        setSendStatus('error');
      });
  };

  const isDark = theme === 'dark';
  const bgClass = isDark ? 'bg-black text-gray-200' : 'bg-gray-50 text-gray-900';
  const navClass = isDark ? 'bg-black/80 border-white/10' : 'bg-white/80 border-black/5 shadow-sm';
  const accentColor = isDark ? 'text-green-500' : 'text-blue-600';
  const spotlightColor = isDark ? "rgba(51, 255, 0, 0.15)" : "rgba(37, 99, 235, 0.15)";

  return (
    <div className={`${bgClass} min-h-screen selection:bg-green-500 selection:text-white overflow-x-hidden ${isDark ? 'theme-dark' : 'theme-light'}`}>
      <AnimatePresence>
        {!booted ? <RetroComputer onComplete={() => setBooted(true)} /> : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
            
            {/* Scroll Progress Bar */}
            <motion.div className={`fixed top-0 left-0 right-0 h-1 ${isDark ? 'bg-green-500' : 'bg-blue-500'} origin-left z-[100]`} style={{ scaleX }} />
            <div className={`fixed inset-0 pointer-events-none -z-10 ${isDark ? 'bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]' : 'bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]'}`} />

            {/* NAVBAR */}
            <nav className={`fixed top-0 w-full z-50 backdrop-blur-md border-b transition-colors duration-500 ${navClass}`}>
              <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                <div className={`${accentColor} font-bold text-xl flex items-center gap-2`}>
                  <Terminal size={20} /> <ScrambleText text="VISHNULABS.DEV" />
                </div>
                <div className="flex items-center gap-6">
                  <div className="hidden md:flex gap-6 text-xs md:text-sm font-medium">
                    {NAV_LINKS.map(link => (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        whileHover={{ y: -2, scale: 1.05 }}
                        whileTap={{ scale: 0.96 }}
                        className="relative px-1 transition-colors"
                      >
                        <span className={`inline-block`}>{link.name}</span>
                        <motion.span
                          layoutId="nav-underline"
                          className={`absolute -bottom-1 left-0 right-0 h-[2px] origin-center ${accentColor}`}
                          initial={{ scaleX: 0, opacity: 0 }}
                          whileHover={{ scaleX: 1, opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      </motion.a>
                    ))}
                  </div>
                  <button onClick={toggleTheme} className="p-2 rounded-full border border-current hover:opacity-70 transition-all">
                    {isDark ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
                  </button>
                </div>
              </div>
            </nav>

            {/* Global sent-success banner centered on screen when envelope reaches destination */}
            <AnimatePresence>
              {sendStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none"
                >
                  <div
                    className={`px-6 py-3 rounded-2xl text-xs md:text-sm font-mono tracking-[0.25em] shadow-2xl pointer-events-auto ${isDark ? 'bg-green-600/95 text-white' : 'bg-blue-600/95 text-white'}`}
                  >
                    MESSAGE SENT SUCCESSFULLY
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* HERO SECTION */}
            <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
               <div className="absolute inset-0 z-0">
                 <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop" className={`w-full h-full object-cover grayscale transition-opacity duration-1000 ${isDark ? 'opacity-30' : 'opacity-10'}`} alt="bg" />
                 <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-black via-black/60' : 'from-white via-white/60'} to-transparent`} />
               </div>
               
               <FloatingWrap>
                 <div className="relative z-10 text-center px-4 mt-16">
                   <motion.div initial={{ scale: 3, opacity: 0, filter: "blur(20px)" }} animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }} transition={{ duration: 1.5 }}>
                     <div className={`${accentColor} mb-4 tracking-[0.3em] text-sm uppercase font-bold`}>System Administrator</div>
                     <h1 className={`text-6xl md:text-9xl font-black mb-6 tracking-tighter ${isDark ? 'text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600' : 'text-gray-900'}`}>
                       <ScrambleText text="VISHNU VARDHAN NAIDU MATLI" />
                     </h1>
                     <div className={`hidden md:inline-flex gap-4 text-xs font-bold border px-6 py-3 rounded-full backdrop-blur-sm ${isDark ? 'border-white/10 bg-black/50 text-gray-300' : 'border-black/10 bg-white/50 text-gray-600'}`}>
                       <span>NETWORKING</span>
                       <span className={accentColor}>•</span>
                       <span>CYBER SECURITY</span>
                       <span className={accentColor}>•</span>
                       <span>FULL STACK</span>
                     </div>
                   </motion.div>
                 </div>
               </FloatingWrap>
            </section>

            {/* CONTENT WRAPPER */}
            <div className="max-w-6xl mx-auto px-6 py-20 space-y-32 overflow-hidden">
              
              {/* ABOUT */}
              <section id="about" className="pt-20">
                <h2 className={`text-3xl font-bold mb-8 flex items-center gap-3 ${accentColor}`}>
                    <User /> <ScrambleText text="ABOUT ME" />
                </h2>
                <HardDiskBlast isDark={isDark}>
                  <SpotlightCard className="p-8" spotlightColor={spotlightColor}>
                    <p className="text-xl leading-relaxed opacity-90">
                      I am a digital architect bridging the gap between <span className={`font-bold ${accentColor}`}>Cyber Security</span> and <span className={`font-bold ${accentColor}`}>Software Development</span>. 
                      Currently a remote intern at <strong>GS Co. Ltd</strong>.
                    </p>
                  </SpotlightCard>
                </HardDiskBlast>
              </section>

              {/* EXPERIENCE */}
              <section id="experience" className="pt-20">
                <h2 className={`text-3xl font-bold mb-8 flex items-center gap-3 ${accentColor}`}>
                    <Briefcase /> <ScrambleText text="EXPERIENCE" />
                </h2>
                <HardDiskBlast isDark={isDark}>
                  <SpotlightCard className="p-8 group" spotlightColor={spotlightColor}>
                     <div className="flex flex-col md:flex-row justify-between items-start mb-6">
                        <div>
                          <h3 className="text-2xl font-bold">Remote Intern</h3>
                          <p className={`${accentColor} text-lg mt-1`}>GS Co. Ltd, South Korea</p>
                        </div>
                        <span className="px-4 py-2 rounded-full text-sm font-bold border opacity-60">Present</span>
                      </div>
                      <p className="opacity-80 leading-relaxed max-w-3xl">
                        Spearheading Load Cell projects and Network Administration tasks. Implementing secure communication protocols.
                      </p>
                  </SpotlightCard>
                </HardDiskBlast>
              </section>

              {/* EDUCATION - FIXED ALIGNMENT */}
              <section id="education" className="pt-20">
                 <h2 className={`text-3xl font-bold mb-8 flex items-center gap-3 ${accentColor}`}>
                    <GraduationCap /> <ScrambleText text="EDUCATION" />
                  </h2>
                <HardDiskBlast isDark={isDark}>
                  {/* FIX: USING FLEX-ROW TO ALIGN SIDE-BY-SIDE */}
                  <SpotlightCard className="p-8" spotlightColor={spotlightColor}>
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className={`p-6 rounded-full shrink-0 ${isDark ? 'bg-gray-800' : 'bg-blue-50'}`}>
                        <GraduationCap size={40} className={accentColor} />
                      </div>
                      <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold">B.Tech in AI & Data Science</h3>
                        <p className="opacity-70 text-lg mt-1">University Name Here</p>
                        <p className={`${accentColor} text-sm font-bold mt-2 font-mono`}>2023 - 2027</p>
                      </div>
                    </div>
                  </SpotlightCard>
                </HardDiskBlast>
              </section>

              {/* PROJECTS */}
              <section id="projects" className="pt-20">
                <h2 className={`text-3xl font-bold mb-8 flex items-center gap-3 ${accentColor}`}>
                  <Code2 /> <ScrambleText text="PROJECTS" />
                </h2>
                <HardDiskBlast isDark={isDark}>
                  <div className="grid md:grid-cols-2 gap-6">
                    {PROJECTS.map((p, i) => (
                      <SpotlightCard key={i} className={`p-6 h-full hover:border-${isDark ? 'green' : 'blue'}-500/50 transition-colors`} spotlightColor={spotlightColor}>
                        <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                        <p className="opacity-70 text-sm mb-4">{p.desc}</p>
                        <div className="flex gap-2 flex-wrap">
                          {p.tags.map(t => (
                            <span key={t} className="text-xs px-2 py-1 rounded border opacity-60 font-mono">
                              {t}
                            </span>
                          ))}
                        </div>
                      </SpotlightCard>
                    ))}
                  </div>
                </HardDiskBlast>
              </section>

              {/* SKILLS - FIXED SIZING */}
              <section id="skills" className="pt-20">
                <h2 className={`text-3xl font-bold mb-8 flex items-center gap-3 ${accentColor}`}>
                  <Cpu /> <ScrambleText text="TECHNICAL SKILLS" />
                </h2>
                <HardDiskBlast isDark={isDark}>
                  {/* COMPACT GRID - Reduced gap and padding */}
                  <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 mb-20">
                    {TECHNICAL_SKILLS.map((skill, i) => (
                      <SpotlightCard key={i} className="flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-white/5 transition-colors aspect-square" spotlightColor={skill.color + "40"}>
                        <skill.icon size={32} color={skill.color} className="mb-2" />
                        <span className="font-bold text-[10px] md:text-xs opacity-80 text-center">{skill.name}</span>
                      </SpotlightCard>
                    ))}
                  </div>
                </HardDiskBlast>

                <h2 className={`text-3xl font-bold mb-8 flex items-center gap-3 ${accentColor}`}>
                  <Users /> <ScrambleText text="INTERPERSONAL" />
                </h2>
                <HardDiskBlast isDark={isDark}>
                  <div className="grid md:grid-cols-2 gap-6">
                    {INTERPERSONAL_SKILLS.map((skill, i) => (
                      <SpotlightCard key={i} className="p-6 h-full" spotlightColor={spotlightColor}>
                        <h3 className={`text-xl font-bold mb-2 ${accentColor}`}>{skill.title}</h3>
                        <p className="opacity-70">{skill.desc}</p>
                      </SpotlightCard>
                    ))}
                  </div>
                </HardDiskBlast>
              </section>

              {/* ACHIEVEMENTS */}
              <section id="achievements" className="pt-20">
                <h2 className={`text-3xl font-bold mb-8 flex items-center gap-3 ${accentColor}`}>
                  <Award /> <ScrambleText text="ACHIEVEMENTS" />
                </h2>
                <HardDiskBlast isDark={isDark}>
                  <div className="grid md:grid-cols-2 gap-6">
                    {ACHIEVEMENTS.map((ach, i) => (
                      <SpotlightCard key={i} className="p-6 h-full" spotlightColor={spotlightColor}>
                        <div className="flex items-start gap-4">
                          <ach.icon size={32} className="text-yellow-500 shrink-0" />
                          <div>
                            <h3 className="font-bold text-lg">{ach.title}</h3>
                            <p className="opacity-70 text-sm">{ach.desc}</p>
                          </div>
                        </div>
                      </SpotlightCard>
                    ))}
                  </div>
                </HardDiskBlast>
              </section>

              {/* CONTACT FORM (Holographic - No Blast) */}
              <section id="contact" className="pt-20 pb-40">
                <ContactPostAnimation
                  isDark={isDark}
                  spotlightColor={spotlightColor}
                  formRef={form}
                  onSubmit={sendEmail}
                  isSending={isSending}
                  sendStatus={sendStatus}
                />
              </section>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;