import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { motion as m } from 'framer-motion';
import { Dumbbell, LogIn, Search, Sun, Moon, Menu, X } from 'lucide-react';

export default function Login() {
  const { colors, isDarkMode } = useTheme();
  const themeColors = colors[isDarkMode ? 'dark' : 'light'];

  const [name, setName] = React.useState('Alex Johnson');
  const [username, setUsername] = React.useState('alexj');
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
  const [error, setError] = React.useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    const cleanedName = String(name || '').trim();
    const cleanedUsername = String(username || '').trim();
    if (!cleanedName || !cleanedUsername) {
      setError('Please enter both name and username.');
      return;
    }
    const user = { name: cleanedName, username: cleanedUsername.toLowerCase() };
    localStorage.setItem('fitzer.user', JSON.stringify(user));
    window.location.hash = '#/profile';
  };

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
            <m.button className={`p-2 rounded-lg ${themeColors.cardBg} ring-1 ${themeColors.border}`} whileHover={{ scale: 1.1 }}>
              {isDarkMode ? <Sun className={`h-5 w-5 ${themeColors.accent}`} /> : <Moon className={`h-5 w-5 ${themeColors.accent}`} />}
            </m.button>
            <div className="md:hidden flex items-center gap-2">
              <m.button className={`p-2 rounded-lg ${themeColors.cardBg}`} whileHover={{ scale: 1.1 }}>
                <Search className={`h-5 w-5 ${themeColors.textSecondary}`} />
              </m.button>
              <m.button onClick={() => setIsMobileOpen(v => !v)} className={`p-2 rounded-lg ${themeColors.cardBg} ring-1 ${themeColors.border}`} whileHover={{ scale: 1.1 }} aria-label="Open menu">
                {isMobileOpen ? <X className={`h-5 w-5 ${themeColors.text}`} /> : <Menu className={`h-5 w-5 ${themeColors.text}`} />}
              </m.button>
            </div>
          </div>
        </div>
        {isMobileOpen && (
          <div className={`md:hidden border-t ${themeColors.border} ${themeColors.bg}`}>
            <div className="px-3 py-3 space-y-2">
              <m.a href="#/" onClick={() => setIsMobileOpen(false)} className={`block rounded-lg px-4 py-3 ring-1 ${themeColors.border} ${themeColors.cardBg} hover:${themeColors.cardBgHover} ${themeColors.text}`} whileHover={{ y: -1 }}>
                Home
              </m.a>
              <m.a href="#/exercise" onClick={() => setIsMobileOpen(false)} className={`block rounded-lg px-4 py-3 ring-1 ${themeColors.border} ${themeColors.cardBg} hover:${themeColors.cardBgHover} ${themeColors.text}`} whileHover={{ y: -1 }}>
                Exercises
              </m.a>
              <m.a href="#/assistant" onClick={() => setIsMobileOpen(false)} className={`block rounded-lg px-4 py-3 ring-1 ${themeColors.border} ${themeColors.cardBg} hover:${themeColors.cardBgHover} ${themeColors.text}`} whileHover={{ y: -1 }}>
                AI Assistant
              </m.a>
              <m.a href="#/profile" onClick={() => setIsMobileOpen(false)} className={`block rounded-lg px-4 py-3 ring-1 ${themeColors.border} ${themeColors.cardBg} hover:${themeColors.cardBgHover} ${themeColors.text}`} whileHover={{ y: -1 }}>
                Profile
              </m.a>
            </div>
          </div>
        )}
      </header>
      <section className="max-w-md mx-auto px-4 sm:px-6 lg:px-10 py-10">
        <h1 className={`text-3xl font-bold ${themeColors.text} mb-6`}>Login</h1>
        <motion.form
          onSubmit={onSubmit}
          className={`rounded-2xl p-6 ${themeColors.cardBg} ring-1 ${themeColors.border}`}
          whileHover={{ scale: 1.01 }}
        >
          <div className="space-y-4">
            <div>
              <label className={`block text-sm mb-1 ${themeColors.textSecondary}`}>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full rounded-lg px-3 py-2 outline-none ${themeColors.bg} ring-1 ${themeColors.border} ${themeColors.text}`}
              />
            </div>
            <div>
              <label className={`block text-sm mb-1 ${themeColors.textSecondary}`}>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full rounded-lg px-3 py-2 outline-none ${themeColors.bg} ring-1 ${themeColors.border} ${themeColors.text}`}
              />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <motion.button
              type="submit"
              className={`mt-2 inline-flex items-center gap-2 rounded-2xl px-5 py-3 ${themeColors.accentBg} ring-1 ${themeColors.accentRing} ${themeColors.accent}`}
              whileHover={{ scale: 1.03 }}
              disabled={!name.trim() || !username.trim()}
            >
              Continue
            </motion.button>
          </div>
        </motion.form>
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


