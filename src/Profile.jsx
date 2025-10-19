import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { motion as m } from 'framer-motion';
import { Dumbbell, LogIn, Search, Sun, Moon, Menu, X } from 'lucide-react';

export default function Profile() {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const themeColors = colors[isDarkMode ? 'dark' : 'light'];
  const [isShrunk, setIsShrunk] = React.useState(false);
  const lastYRef = React.useRef(0);
  const [showMotivate, setShowMotivate] = React.useState(false);

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

  const user = React.useMemo(() => {
    try { return JSON.parse(localStorage.getItem('fitzer.user') || '{}'); } catch { return {}; }
  }, []);

  const bmi = React.useMemo(() => {
    try { return JSON.parse(localStorage.getItem('fitzer.bmi') || '{}'); } catch { return {}; }
  }, []);

  const weightHistory = React.useMemo(() => {
    try { return JSON.parse(localStorage.getItem('fitzer.weightHistory') || '[]'); } catch { return []; }
  }, []);

  React.useEffect(() => {
    if (!user || !user.name || !user.username) {
      window.location.hash = '#/login';
    }
  }, [user]);

  const name = user.name || '';
  const username = user.username ? `(@${user.username})` : '';

  const heightCm = Number(bmi.heightCm) || 0;
  const weightKg = Number(bmi.weightKg) || 0;
  const age = Number(bmi.age) || 0;
  const bmiValue = Number(bmi.bmi) || (heightCm > 0 ? Number(((weightKg / ((heightCm/100) * (heightCm/100))) || 0).toFixed(1)) : 0);

  React.useEffect(() => {
    if (bmiValue && (bmiValue < 18.5 || bmiValue > 25)) {
      setShowMotivate(true);
    }
  }, [bmiValue]);

  const chartPoints = React.useMemo(() => {
    const history = Array.isArray(weightHistory) && weightHistory.length
      ? weightHistory
      : (weightKg ? Array.from({ length: 6 }).map((_, i) => ({ t: Date.now() - (5 - i) * 86400000, weightKg: weightKg - (5 - i) })) : []);
    const maxW = Math.max(...history.map(h => h.weightKg), weightKg || 0);
    const minW = Math.min(...history.map(h => h.weightKg), weightKg || 0);
    const padding = 6;
    const width = 600, height = 180;
    const span = Math.max(1, maxW - minW);
    return history.map((h, idx) => {
      const x = (idx / Math.max(1, history.length - 1)) * (width - padding * 2) + padding;
      const y = height - padding - ((h.weightKg - minW) / span) * (height - padding * 2);
      return { x, y, label: new Date(h.t).toLocaleDateString(undefined, { month: 'short', day: '2-digit' }), weight: h.weightKg };
    });
  }, [weightHistory, weightKg]);

  const modules = React.useMemo(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('fitzer.modules') || 'null');
      if (Array.isArray(saved) && saved.length) return saved;
    } catch {}
    return [
      { label: 'Workouts', completed: 3, total: 10 },
      { label: 'Diet Plans', completed: 2, total: 8 },
      { label: 'AI Assistant', completed: 4, total: 12 },
    ];
  }, []);

  return (
    <div className={`min-h-screen ${themeColors.bg} ${themeColors.text} ${themeColors.selection}`}>
      <header className={`sticky top-0 z-50 backdrop-blur ${themeColors.backdrop} border-b ${themeColors.border}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">
          <m.a 
            href="#/" 
            className="flex items-center gap-3"
            animate={{ scale: isShrunk ? 0.9 : 1 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)" }}
            transition={{ duration: 0.2 }}
          >
            <m.span 
              className="h-9 w-9 grid place-items-center rounded-2xl bg-emerald-400/10 ring-1 ring-emerald-400/30"
              animate={{ scale: isShrunk ? 0.95 : 1 }}
              whileHover={{ backgroundColor: "rgba(16, 185, 129, 0.2)", ringColor: "rgba(16, 185, 129, 0.5)", boxShadow: "0 0 15px rgba(16, 185, 129, 0.6)" }}
              transition={{ duration: 0.2 }}
            >
              <Dumbbell className="h-5 w-5 text-emerald-300" />
            </m.span>
            <m.span animate={{ scale: isShrunk ? 0.95 : 1 }} className={`font-black tracking-tight ${themeColors.text} text-lg`}>Fitzer</m.span>
          </m.a>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <m.a href="#/" className={`${themeColors.textSecondary} hover:${themeColors.text.replace('text-', 'text-')} transition-colors`} whileHover={{ y: -2 }}>
              Home
            </m.a>
            <m.a href="#/exercise" className={`${themeColors.textSecondary} hover:${themeColors.text.replace('text-', 'text-')} transition-colors`} whileHover={{ y: -2 }}>
              Exercises
            </m.a>
            <m.a href="#/assistant" className={`${themeColors.textSecondary} hover:${themeColors.text.replace('text-', 'text-')} transition-colors`} whileHover={{ y: -2 }}>
              AI Assistant
            </m.a>
            <m.a href="#/profile" className={`inline-flex items-center gap-2 rounded-2xl px-3 py-2 ${themeColors.accentBg} ring-1 ${themeColors.accentRing} ${themeColors.accent} ${themeColors.accentHover} transition`} whileHover={{ scale: 1.05 }}>
              <LogIn className="h-4 w-4" /> Profile
            </m.a>
          </nav>

          <div className="flex items-center gap-2">
            <m.button onClick={toggleTheme} className={`p-2 rounded-lg ${themeColors.cardBg} ring-1 ${themeColors.border}`} whileHover={{ scale: 1.1 }}>
              {isDarkMode ? <Sun className={`h-5 w-5 ${themeColors.accent}`} /> : <Moon className={`h-5 w-5 ${themeColors.accent}`} />}
            </m.button>
            <div className="md:hidden flex items-center gap-2">
              <m.button className={`p-2 rounded-lg ${themeColors.cardBg}`} whileHover={{ scale: 1.1 }}>
                <Search className={`h-5 w-5 ${themeColors.textSecondary}`} />
              </m.button>
              <m.button className={`p-2 rounded-lg ${themeColors.cardBg} ring-1 ${themeColors.border}`} whileHover={{ scale: 1.1 }} aria-label="Open menu">
                <Menu className={`h-5 w-5 ${themeColors.text}`} />
              </m.button>
            </div>
          </div>
        </div>
      </header>
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
        <h1 className={`text-3xl font-bold ${themeColors.text} mb-6`}>Profile</h1>

        <motion.div className={`rounded-2xl p-6 ${themeColors.cardBg} ring-1 ${themeColors.border}`} whileHover={{ scale: 1.01 }}>
          <h2 className="text-xl font-semibold">👤 {name} <span className="text-sm opacity-70">{username}</span></h2>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className={`rounded-xl p-3 ring-1 ${themeColors.borderSecondary} ${themeColors.cardBgSecondary}`}>
              <div className={`${themeColors.textSecondary} text-xs`}>Height</div>
              <div className="font-semibold">{heightCm ? `${heightCm} cm` : '—'}</div>
            </div>
            <div className={`rounded-xl p-3 ring-1 ${themeColors.borderSecondary} ${themeColors.cardBgSecondary}`}>
              <div className={`${themeColors.textSecondary} text-xs`}>Weight</div>
              <div className="font-semibold">{weightKg ? `${weightKg} kg` : '—'}</div>
            </div>
            <div className={`rounded-xl p-3 ring-1 ${themeColors.borderSecondary} ${themeColors.cardBgSecondary}`}>
              <div className={`${themeColors.textSecondary} text-xs`}>BMI</div>
              <div className="font-semibold">{bmiValue || '—'}</div>
            </div>
            <div className={`rounded-xl p-3 ring-1 ${themeColors.borderSecondary} ${themeColors.cardBgSecondary}`}>
              <div className={`${themeColors.textSecondary} text-xs`}>Age</div>
              <div className="font-semibold">{age || '—'}</div>
            </div>
          </div>
        </motion.div>

        <motion.div className={`mt-6 rounded-2xl p-6 ${themeColors.cardBg} ring-1 ${themeColors.border}`} whileHover={{ scale: 1.01 }}>
          <h3 className="font-semibold mb-4">📈 Weight Progress</h3>
          {localStorage.getItem('fitzer.dietPlan') && (
            <div className={`mb-4 text-sm ${themeColors.textSecondary}`}>
              <span className="font-semibold">Diet Plan:</span> {JSON.parse(localStorage.getItem('fitzer.dietPlan')).dietType} • {JSON.parse(localStorage.getItem('fitzer.dietPlan')).category}
            </div>
          )}
          {chartPoints.length ? (
            <svg width="100%" height="200" viewBox="0 0 600 200" preserveAspectRatio="none">
              <polyline
                fill="none"
                stroke={isDarkMode ? '#34d399' : '#10b981'}
                strokeWidth="3"
                points={chartPoints.map(p => `${p.x},${p.y}`).join(' ')}
              />
              {chartPoints.map((p, i) => (
                <g key={i}>
                  <circle cx={p.x} cy={p.y} r="4" fill={isDarkMode ? '#34d399' : '#10b981'} />
                </g>
              ))}
            </svg>
          ) : (
            <div className={`${themeColors.textSecondary} text-sm`}>No data yet. Calculate BMI to populate your chart.</div>
          )}
        </motion.div>

        {showMotivate && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`mt-6 rounded-2xl p-4 ${themeColors.cardBg} ring-1 ${themeColors.border}`}>
            <div className="text-sm">
              {bmiValue < 18.5 ? (
                <>
                  <div className="font-semibold">You’ve got this 💪</div>
                  <div className={`${themeColors.textSecondary}`}>Consistency builds strength. Add nutrient-dense meals and progressive training—small steps, strong results.</div>
                </>
              ) : (
                <>
                  <div className="font-semibold">Keep moving, you’re not alone 🚀</div>
                  <div className={`${themeColors.textSecondary}`}>Focus on balanced meals, daily walks, and quality sleep. Your future self will thank you.</div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </section>
      <a href="#/assistant" className="fixed bottom-6 right-6 z-50">
        <m.button
          className={`h-12 w-12 rounded-full ${themeColors.cardBg} ring-1 ${themeColors.border}`}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open AI Assistant"
        >
          <Dumbbell className={`h-6 w-6 mx-auto ${themeColors.accent}`} />
        </m.button>
      </a>
    </div>
  );
}


