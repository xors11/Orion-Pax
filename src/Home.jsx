
import React from "react";
import { motion } from "framer-motion";
import { Dumbbell, LogIn, Search, Apple, Bot, Menu, X } from "lucide-react";
import { useTheme } from "./ThemeContext";

export default function Home() {
  const { colors } = useTheme();
  const themeColors = colors.light;

  return (
    <div className={`min-h-screen ${themeColors.bg} ${themeColors.text} ${themeColors.selection}`}>
      <NavBar />
      <Hero />
      <BMICalculator />
      <a href="#/assistant" className="fixed bottom-6 right-6 z-50">
        <motion.button
          className={`h-12 w-12 rounded-full ${themeColors.cardBg} ring-1 ${themeColors.border}`}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open AI Assistant"
        >
          <Bot className={`h-6 w-6 mx-auto ${themeColors.accent}`} />
        </motion.button>
      </a>
    </div>
  );
}


function NavBar() {
  const { colors } = useTheme();
  const themeColors = colors.light;
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [isShrunk, setIsShrunk] = React.useState(false);
  const lastYRef = React.useRef(0);

  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      const goingDown = y > lastYRef.current;
      setIsShrunk(goingDown && y > 10);
      lastYRef.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 backdrop-blur ${themeColors.backdrop} border-b ${themeColors.border}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">
        <motion.a 
          href="#/" 
          className="flex items-center gap-3"
          animate={{ scale: isShrunk ? 0.9 : 1 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)"
          }}
          transition={{ duration: 0.2 }}
        >
          <motion.span 
            className="h-9 w-9 grid place-items-center rounded-2xl bg-emerald-400/10 ring-1 ring-emerald-400/30"
            animate={{ scale: isShrunk ? 0.95 : 1 }}
            whileHover={{ 
              backgroundColor: "rgba(16, 185, 129, 0.2)",
              ringColor: "rgba(16, 185, 129, 0.5)",
              boxShadow: "0 0 15px rgba(16, 185, 129, 0.6)"
            }}
            transition={{ duration: 0.2 }}
          >
            <Dumbbell className="h-5 w-5 text-emerald-300" />
          </motion.span>
          <motion.span animate={{ scale: isShrunk ? 0.95 : 1 }} className={`font-black tracking-tight ${themeColors.text} text-lg`}>Fitzer</motion.span>
        </motion.a>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <motion.a 
            href="#/" 
            className={`${themeColors.textSecondary} hover:${themeColors.text.replace('text-', 'text-')} transition-colors`}
            whileHover={{ 
              y: -2,
              textShadow: `0 0 10px ${themeColors.accentTextShadow}`
            }}
            transition={{ duration: 0.2 }}
          >
            Home
          </motion.a>
          <motion.a 
            href="#/exercise" 
            className={`${themeColors.textSecondary} hover:${themeColors.text.replace('text-', 'text-')} transition-colors`}
            whileHover={{ 
              y: -2,
              textShadow: `0 0 10px ${themeColors.accentTextShadow}`
            }}
            transition={{ duration: 0.2 }}
          >
            Exercises
          </motion.a>
          <motion.a 
            href="#/diet" 
            className={`${themeColors.textSecondary} hover:${themeColors.text.replace('text-', 'text-')} transition-colors`}
            whileHover={{ 
              y: -2,
              textShadow: `0 0 10px ${themeColors.accentTextShadow}`
            }}
            transition={{ duration: 0.2 }}
          >
            Diet Plans
          </motion.a>
          <motion.a 
            href="#/assistant" 
            className={`${themeColors.textSecondary} hover:${themeColors.text.replace('text-', 'text-')} transition-colors`}
            whileHover={{ 
              y: -2,
              textShadow: `0 0 10px ${themeColors.accentTextShadow}`
            }}
            transition={{ duration: 0.2 }}
          >
            AI Assistant
          </motion.a>
          <motion.a 
            href="#/profile" 
            className={`inline-flex items-center gap-2 rounded-2xl px-3 py-2 ${themeColors.accentBg} ring-1 ${themeColors.accentRing} ${themeColors.accent} ${themeColors.accentHover} transition`}
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "rgba(251, 146, 60, 0.3)",
              boxShadow: `0 0 20px ${themeColors.accentShadowStrong}`
            }}
            transition={{ duration: 0.2 }}
          >
            <LogIn className="h-4 w-4" /> Profile
          </motion.a>
        </nav>

        <div className="flex items-center gap-2">
          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-2">
            <motion.button 
              className={`p-2 rounded-lg ${themeColors.cardBg}`}
              whileHover={{ 
                scale: 1.1,
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                boxShadow: `0 0 15px ${themeColors.accentShadow}`
              }}
              transition={{ duration: 0.2 }}
            >
              <Search className={`h-5 w-5 ${themeColors.textSecondary}`} />
            </motion.button>
            <motion.button
              onClick={() => setIsMobileOpen(v => !v)}
              className={`p-2 rounded-lg ${themeColors.cardBg} ring-1 ${themeColors.border}`}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
              aria-label="Open menu"
            >
              {isMobileOpen ? <X className={`h-5 w-5 ${themeColors.text}`} /> : <Menu className={`h-5 w-5 ${themeColors.text}`} />}
            </motion.button>
          </div>
        </div>
      </div>
      {/* Mobile Menu Panel */}
      {isMobileOpen && (
        <div className={`md:hidden border-t ${themeColors.border} ${themeColors.bg}`}>
          <div className="px-3 py-3 space-y-2">
            <motion.a
              href="#/"
              onClick={() => setIsMobileOpen(false)}
              className={`block rounded-lg px-4 py-3 ring-1 ${themeColors.border} ${themeColors.cardBg} hover:${themeColors.cardBgHover} ${themeColors.text}`}
              whileHover={{ y: -1 }}
            >
              Home
            </motion.a>
            <motion.a
              href="#/exercise"
              onClick={() => setIsMobileOpen(false)}
              className={`block rounded-lg px-4 py-3 ring-1 ${themeColors.border} ${themeColors.cardBg} hover:${themeColors.cardBgHover} ${themeColors.text}`}
              whileHover={{ y: -1 }}
            >
              Exercises
            </motion.a>
            <motion.a
              href="#/diet"
              onClick={() => setIsMobileOpen(false)}
              className={`block rounded-lg px-4 py-3 ring-1 ${themeColors.border} ${themeColors.cardBg} hover:${themeColors.cardBgHover} ${themeColors.text}`}
              whileHover={{ y: -1 }}
            >
              Diet Plans
            </motion.a>
            <motion.a
              href="#/assistant"
              onClick={() => setIsMobileOpen(false)}
              className={`block rounded-lg px-4 py-3 ring-1 ${themeColors.border} ${themeColors.cardBg} hover:${themeColors.cardBgHover} ${themeColors.text}`}
              whileHover={{ y: -1 }}
            >
              AI Assistant
            </motion.a>
            <motion.a
              href="#/profile"
              onClick={() => setIsMobileOpen(false)}
              className={`block rounded-lg px-4 py-3 ring-1 ${themeColors.border} ${themeColors.cardBg} hover:${themeColors.cardBgHover} ${themeColors.text}`}
              whileHover={{ y: -1 }}
            >
              Profile
            </motion.a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ===== Hero ===== */
function Hero() {
  const { colors } = useTheme();
  const themeColors = colors.light;

  return (
    <section id="home" className="relative min-h-[72vh] grid place-items-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1571907480495-7d2fccd4f451?q=80&w=1800&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.45)",
        }}
      />

      <div className="relative z-10 max-w-4xl px-6 text-center">

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight ${themeColors.text}`}
        >
          Transform Your Body, <span className={themeColors.accent}>Transform Your Life.</span>
        </motion.h1>

        <p className={`mt-4 ${themeColors.textSecondary} max-w-2xl mx-auto`}>
          Smart exercise plans, personalized diets, and an on-page AI coach. Your fitness journey—gamified and simple.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <motion.a
            href="#/diet"
            className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 ${themeColors.accentBg} ring-1 ${themeColors.accentRing} ${themeColors.accent} ${themeColors.accentHover} transition`}
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "rgba(251, 146, 60, 0.3)",
              y: -2,
              boxShadow: `0 0 25px ${themeColors.accentShadowStrong}`
            }}
            transition={{ duration: 0.2 }}
          >
            <Apple className="h-5 w-5" /> Get Your Plan
          </motion.a>

          <motion.a
            href="#/assistant"
            className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 ${themeColors.cardBg} ring-1 ${themeColors.border} ${themeColors.text} hover:${themeColors.cardBgHover} transition`}
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              y: -2,
              boxShadow: `0 0 25px ${themeColors.accentShadow}`
            }}
            transition={{ duration: 0.2 }}
          >
            <Bot className="h-5 w-5" /> Start Training Today
          </motion.a>
        </div>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
          <StatCard label="Workouts" value="650+" />
          <StatCard label="Diet Plans" value="120+" />
          <StatCard label="Active Users" value="25k" />
          <StatCard label="Avg. Streak" value="18 days" />
        </div>
      </div>
    </section>
  );
}

/* ===== Small helper components used on Home page ===== */
function Badge({ children }) {
  const { colors } = useTheme();
  const themeColors = colors.light;

  return (
    <span className={`inline-flex items-center gap-2 rounded-full ${themeColors.accentBg} px-3 py-1 text-xs font-medium ${themeColors.accent} ring-1 ${themeColors.accentRing}`}>
      {children}
    </span>
  );
}

function StatCard({ label, value }) {
  const { colors } = useTheme();
  const themeColors = colors.light;

  return (
    <motion.div 
      className={`${themeColors.cardBg} p-4`}
      whileHover={{ 
        scale: 1.05,
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        y: -4,
        boxShadow: `0 0 20px ${themeColors.accentShadow}`
      }}
      transition={{ duration: 0.2 }}
    >
      <div className={`text-2xl font-extrabold ${themeColors.text}`}>{value}</div>
      <div className={`text-xs ${themeColors.textMuted}`}>{label}</div>
    </motion.div>
  );
}

/* ===== Quick preview area (wireframe blocks for modules you'll implement later) ===== */
function QuickPreview() {}
function Footer() {}

/* ===== BMI Calculator ===== */
function BMICalculator() {
  return null; // Removed the BMI calculator section
}
