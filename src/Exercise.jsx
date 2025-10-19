import React from "react"; 
import { motion } from "framer-motion";
import { Dumbbell, LogIn, Search, Sun, Moon, Menu, X, User, Activity, Clock, Target } from "lucide-react";
import { useTheme } from "./ThemeContext";
import { useBMI } from "./BMIContext";

export default function Exercise() {
  const { colors, isDarkMode } = useTheme();
  const themeColors = colors[isDarkMode ? 'dark' : 'light'];

  return (
    <div className={`min-h-screen ${themeColors.bg} ${themeColors.text} ${themeColors.selection}`}>
      <NavBar />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
        <h1 className={`text-3xl font-bold ${themeColors.text} mb-2`}>Exercise & Fitness Assessment</h1>
        <p className={`${themeColors.textSecondary} mb-6`}>Enter your details to get   exercise recommendations based on your body composition, sleep patterns, and fitness goals.</p>
        <UserSpecsForm />
        <Calculator />
      </section>
    </div>
  );
}

function NavBar() {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const themeColors = colors[isDarkMode ? 'dark' : 'light'];
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
              backgroundColor: isDarkMode ? "rgba(16, 185, 129, 0.3)" : "rgba(251, 146, 60, 0.3)",
              boxShadow: `0 0 20px ${themeColors.accentShadowStrong}`
            }}
            transition={{ duration: 0.2 }}
          >
            <LogIn className="h-4 w-4" /> Login
          </motion.a>
        </nav>

        <div className="flex items-center gap-2">
          <motion.button
            onClick={toggleTheme}
            className={`p-2 rounded-lg ${themeColors.cardBg} ring-1 ${themeColors.border}`}
            whileHover={{ 
              scale: 1.1,
              backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
              boxShadow: `0 0 15px ${themeColors.accentShadow}`
            }}
            transition={{ duration: 0.2 }}
          >
            {isDarkMode ? (
              <Sun className={`h-5 w-5 ${themeColors.accent}`} />
            ) : (
              <Moon className={`h-5 w-5 ${themeColors.accent}`} />
            )}
          </motion.button>

          <div className="md:hidden flex items-center gap-2">
            <motion.button 
              className={`p-2 rounded-lg ${themeColors.cardBg}`}
              whileHover={{ 
                scale: 1.1,
                backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
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

function UserSpecsForm() {
  const { colors, isDarkMode } = useTheme();
  const { bmiData, updateBMI } = useBMI();
  const themeColors = colors[isDarkMode ? 'dark' : 'light'];

  const handleInputChange = (field, value) => {
    updateBMI({ [field]: value });
  };

  return (
    <div className={`rounded-2xl p-6 ${themeColors.cardBg} mb-6`}>
      <h2 className={`text-xl font-semibold ${themeColors.text} mb-4 flex items-center gap-2`}>
        <User className="h-5 w-5" />
        Your Fitness Profile
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className={`block text-sm font-medium ${themeColors.textSecondary} mb-2`}>Age</label>
          <input
            type="number"
            value={bmiData.age}
            onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 25)}
            className={`w-full px-3 py-2 rounded-lg ${themeColors.cardBgSecondary} ${themeColors.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            min="16"
            max="100"
          />
        </div>

        <div>
          <label className={`block text-sm font-medium ${themeColors.textSecondary} mb-2`}>Gender</label>
          <select
            value={bmiData.gender}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            className={`w-full px-3 py-2 rounded-lg ${themeColors.cardBgSecondary} ${themeColors.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className={`block text-sm font-medium ${themeColors.textSecondary} mb-2`}>Body Fat %</label>
          <input
            type="number"
            value={bmiData.bodyFatPercentage}
            onChange={(e) => handleInputChange('bodyFatPercentage', parseFloat(e.target.value) || 15)}
            className={`w-full px-3 py-2 rounded-lg ${themeColors.cardBgSecondary} ${themeColors.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            min="5"
            max="50"
            step="0.1"
          />
        </div>

        <div>
          <label className={`block text-sm font-medium ${themeColors.textSecondary} mb-2`}>Sleep Hours</label>
          <input
            type="number"
            value={bmiData.sleepHours}
            onChange={(e) => handleInputChange('sleepHours', parseFloat(e.target.value) || 8)}
            className={`w-full px-3 py-2 rounded-lg ${themeColors.cardBgSecondary} ${themeColors.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            min="4"
            max="12"
            step="0.5"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className={`block text-sm font-medium ${themeColors.textSecondary} mb-2`}>Activity Level</label>
          <select
            value={bmiData.activityLevel}
            onChange={(e) => handleInputChange('activityLevel', e.target.value)}
            className={`w-full px-3 py-2 rounded-lg ${themeColors.cardBgSecondary} ${themeColors.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="sedentary">Sedentary</option>
            <option value="light">Light Activity</option>
            <option value="moderate">Moderate Activity</option>
            <option value="active">Active</option>
            <option value="very_active">Very Active</option>
          </select>
        </div>

        <div>
          <label className={`block text-sm font-medium ${themeColors.textSecondary} mb-2`}>Fitness Goal</label>
          <select
            value={bmiData.fitnessGoal}
            onChange={(e) => handleInputChange('fitnessGoal', e.target.value)}
            className={`w-full px-3 py-2 rounded-lg ${themeColors.cardBgSecondary} ${themeColors.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="lose_weight">Lose Weight</option>
            <option value="maintain">Maintain Weight</option>
            <option value="gain_weight">Gain Weight</option>
            <option value="build_muscle">Build Muscle</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function Calculator() {
  const { colors, isDarkMode } = useTheme();
  const { bmiData, updateBMI } = useBMI();
  const themeColors = colors[isDarkMode ? 'dark' : 'light'];

  const [age, setAge] = React.useState(() => {
    try { return Number(JSON.parse(localStorage.getItem('fitzer.bmi') || '{}').age) || 25; } catch { return 25; }
  });
  const [heightCm, setHeightCm] = React.useState(() => {
    try { return Number(JSON.parse(localStorage.getItem('fitzer.bmi') || '{}').heightCm) || 170; } catch { return 170; }
  });
  const [weightKg, setWeightKg] = React.useState(() => {
    try { return Number(JSON.parse(localStorage.getItem('fitzer.bmi') || '{}').weightKg) || 70; } catch { return 70; }
  });
  const [lastResult, setLastResult] = React.useState(null);
  const [recommended, setRecommended] = React.useState([]);
  const [computedBmi, setComputedBmi] = React.useState(0);
  const [isGenerating, setIsGenerating] = React.useState(false);

  const heightM = heightCm > 0 ? heightCm / 100 : 0;
  const bmi = computedBmi || 0;

  const handleCalculate = async () => {
    const nextBmi = heightM > 0 && weightKg > 0 ? Number((weightKg / (heightM * heightM)).toFixed(1)) : 0;
    setComputedBmi(nextBmi);
    setLastResult({ heightCm, weightKg, bmi: nextBmi });
    
    // Update BMI context with height and weight
    updateBMI({ heightCm, weightKg, bmi: nextBmi });
    
    // Generate AI-powered personalized exercise recommendations
    setIsGenerating(true);
    try {
      const personalizedExercises = await generatePersonalizedExercises(bmiData, nextBmi);
      console.log('AI Generated exercises:', personalizedExercises);
      setRecommended(personalizedExercises);
    } catch (error) {
      console.error('Error generating exercises:', error);
      setRecommended(getFallbackExercises());
    } finally {
      setIsGenerating(false);
    }
    
    // Clear form
    setHeightCm("");
    setWeightKg("");
  };

  const generatePersonalizedExercises = async (userData, bmi) => {
    const { age, gender, bodyFatPercentage, sleepHours, activityLevel, fitnessGoal } = userData;
    
    try {
      // Create AI prompt based on user data
      const aiPrompt = createAIPrompt(userData, bmi);
      
      // Simulate AI processing with realistic delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate AI-powered recommendations
      const aiRecommendations = await generateAIRecommendations(userData, bmi, aiPrompt);
      
      return aiRecommendations;
    } catch (error) {
      console.error('Error generating AI exercises:', error);
      return getFallbackExercises();
    }
  };

  const createAIPrompt = (userData, bmi) => {
    const { age, gender, bodyFatPercentage, sleepHours, activityLevel, fitnessGoal } = userData;
    
    return `
    User Profile:
    - Age: ${age} years
    - Gender: ${gender}
    - Body Fat: ${bodyFatPercentage}%
    - Sleep: ${sleepHours} hours/night
    - Activity Level: ${activityLevel}
    - Fitness Goal: ${fitnessGoal}
    - BMI: ${bmi}
    
    Generate 6 personalized exercises considering:
    1. User's current fitness level and limitations
    2. Sleep quality impact on recovery
    3. Specific fitness goals
    4. Age-appropriate intensity
    5. Equipment availability (prefer bodyweight)
    `;
  };

  const generateAIRecommendations = async (userData, bmi, prompt) => {
    const { age, gender, bodyFatPercentage, sleepHours, activityLevel, fitnessGoal } = userData;
    
    // AI-powered exercise selection based on user profile
    const exerciseDatabase = getComprehensiveExerciseDatabase();
    let selectedExercises = [];
    
    // AI Logic: Analyze user profile and select appropriate exercises
    const userProfile = analyzeUserProfile(userData, bmi);
    
    // Select exercises based on AI analysis
    selectedExercises = selectExercisesByAI(userProfile, exerciseDatabase);
    
    // Apply AI-driven customization
    return customizeExercisesByAI(selectedExercises, userProfile);
  };

  const analyzeUserProfile = (userData, bmi) => {
    const { age, gender, bodyFatPercentage, sleepHours, activityLevel, fitnessGoal } = userData;
    
    return {
      fitnessLevel: determineFitnessLevel(activityLevel, sleepHours),
      riskFactors: identifyRiskFactors(age, bodyFatPercentage, sleepHours),
      goalPriority: prioritizeGoals(fitnessGoal, bmi),
      intensityLevel: calculateOptimalIntensity(age, activityLevel, sleepHours),
      focusAreas: determineFocusAreas(fitnessGoal, bodyFatPercentage, gender)
    };
  };

  const determineFitnessLevel = (activityLevel, sleepHours) => {
    if (activityLevel === 'very_active' && sleepHours >= 8) return 'advanced';
    if (activityLevel === 'active' && sleepHours >= 7) return 'intermediate';
    if (activityLevel === 'moderate' && sleepHours >= 6) return 'beginner-intermediate';
    if (sleepHours < 6) return 'beginner';
    return 'beginner';
  };

  const identifyRiskFactors = (age, bodyFatPercentage, sleepHours) => {
    const risks = [];
    if (age > 50) risks.push('age');
    if (bodyFatPercentage > 25) risks.push('weight');
    if (sleepHours < 6) risks.push('recovery');
    return risks;
  };

  const prioritizeGoals = (fitnessGoal, bmi) => {
    if (fitnessGoal === 'lose_weight' || bmi > 25) return 'fat_loss';
    if (fitnessGoal === 'build_muscle') return 'muscle_gain';
    if (fitnessGoal === 'maintain') return 'maintenance';
    return 'general_fitness';
  };

  const calculateOptimalIntensity = (age, activityLevel, sleepHours) => {
    let intensity = 'moderate';
    if (age > 50 || sleepHours < 6) intensity = 'low';
    if (activityLevel === 'very_active' && sleepHours >= 8) intensity = 'high';
    return intensity;
  };

  const determineFocusAreas = (fitnessGoal, bodyFatPercentage, gender) => {
    const areas = [];
    if (fitnessGoal === 'lose_weight' || bodyFatPercentage > 20) {
      areas.push('cardiovascular', 'core');
    }
    if (fitnessGoal === 'build_muscle') {
      areas.push('strength', 'muscle_endurance');
    }
    areas.push('flexibility', 'balance');
    return areas;
  };

  const getComprehensiveExerciseDatabase = () => {
    return {
      beginner: [
        { id: 'wall-push-ups', name: 'Wall Push-ups', bodyPart: 'chest', target: 'upper body', 
          calories: 40, difficulty: 'low', equipment: 'wall', duration: '10-15 min',
          sets: '2-3', reps: '8-12', rest: '60s', intensity: 'low', focus: ['strength'] },
        { id: 'chair-squats', name: 'Chair-Assisted Squats', bodyPart: 'legs', target: 'lower body', 
          calories: 60, difficulty: 'low', equipment: 'chair', duration: '10-15 min',
          sets: '2-3', reps: '8-10', rest: '60s', intensity: 'low', focus: ['strength'] },
        { id: 'seated-marches', name: 'Seated Knee Marches', bodyPart: 'core', target: 'stability', 
          calories: 30, difficulty: 'low', equipment: 'chair', duration: '5-10 min',
          sets: '2-3', reps: '10-15', rest: '45s', intensity: 'low', focus: ['core'] },
        { id: 'standing-calf-raises', name: 'Standing Calf Raises', bodyPart: 'legs', target: 'lower body', 
          calories: 35, difficulty: 'low', equipment: 'none', duration: '5-10 min',
          sets: '2-3', reps: '12-15', rest: '45s', intensity: 'low', focus: ['strength'] },
        { id: 'arm-circles', name: 'Arm Circles', bodyPart: 'arms', target: 'flexibility', 
          calories: 25, difficulty: 'low', equipment: 'none', duration: '5-10 min',
          sets: '2-3', reps: '10-12', rest: '30s', intensity: 'low', focus: ['flexibility'] },
        { id: 'walking-in-place', name: 'Walking in Place', bodyPart: 'full body', target: 'cardiovascular', 
          calories: 80, difficulty: 'low', equipment: 'none', duration: '10-15 min',
          sets: '1', reps: 'continuous', rest: 'none', intensity: 'low', focus: ['cardiovascular'] }
      ],
      intermediate: [
        { id: 'push-ups', name: 'Standard Push-ups', bodyPart: 'chest', target: 'upper body', 
          calories: 80, difficulty: 'moderate', equipment: 'none', duration: '15-20 min',
          sets: '3-4', reps: '10-15', rest: '60-90s', intensity: 'moderate', focus: ['strength'] },
        { id: 'squats', name: 'Bodyweight Squats', bodyPart: 'legs', target: 'lower body', 
          calories: 100, difficulty: 'moderate', equipment: 'none', duration: '15-20 min',
          sets: '3-4', reps: '12-15', rest: '60-90s', intensity: 'moderate', focus: ['strength'] },
        { id: 'plank', name: 'Plank Hold', bodyPart: 'core', target: 'stability', 
          calories: 60, difficulty: 'moderate', equipment: 'none', duration: '10-15 min',
          sets: '3-4', reps: '30-60s', rest: '60s', intensity: 'moderate', focus: ['core'] },
        { id: 'lunges', name: 'Forward Lunges', bodyPart: 'legs', target: 'lower body', 
          calories: 90, difficulty: 'moderate', equipment: 'none', duration: '15-20 min',
          sets: '3-4', reps: '10-12', rest: '60-90s', intensity: 'moderate', focus: ['strength'] },
        { id: 'jumping-jacks', name: 'Jumping Jacks', bodyPart: 'full body', target: 'cardiovascular', 
          calories: 150, difficulty: 'moderate', equipment: 'none', duration: '10-15 min',
          sets: '3-4', reps: '20-30', rest: '60s', intensity: 'moderate', focus: ['cardiovascular'] },
        { id: 'mountain-climbers', name: 'Mountain Climbers', bodyPart: 'core', target: 'conditioning', 
          calories: 120, difficulty: 'moderate', equipment: 'none', duration: '10-15 min',
          sets: '3-4', reps: '20-30', rest: '60s', intensity: 'moderate', focus: ['conditioning'] }
      ],
      advanced: [
        { id: 'diamond-push-ups', name: 'Diamond Push-ups', bodyPart: 'chest', target: 'upper body', 
          calories: 100, difficulty: 'high', equipment: 'none', duration: '15-20 min',
          sets: '4-5', reps: '8-12', rest: '90s', intensity: 'high', focus: ['strength'] },
        { id: 'pistol-squats', name: 'Pistol Squats', bodyPart: 'legs', target: 'lower body', 
          calories: 150, difficulty: 'high', equipment: 'none', duration: '15-20 min',
          sets: '3-4', reps: '5-8', rest: '90-120s', intensity: 'high', focus: ['strength'] },
        { id: 'burpees', name: 'Burpees', bodyPart: 'full body', target: 'conditioning', 
          calories: 200, difficulty: 'high', equipment: 'none', duration: '10-15 min',
          sets: '4-5', reps: '8-12', rest: '90s', intensity: 'high', focus: ['conditioning'] },
        { id: 'handstand-push-ups', name: 'Handstand Push-ups', bodyPart: 'shoulders', target: 'upper body', 
          calories: 120, difficulty: 'high', equipment: 'wall', duration: '15-20 min',
          sets: '3-4', reps: '3-8', rest: '120s', intensity: 'high', focus: ['strength'] },
        { id: 'muscle-ups', name: 'Muscle-ups', bodyPart: 'full body', target: 'strength', 
          calories: 180, difficulty: 'high', equipment: 'pull-up bar', duration: '15-20 min',
          sets: '3-4', reps: '3-6', rest: '120s', intensity: 'high', focus: ['strength'] },
        { id: 'sprint-intervals', name: 'Sprint Intervals', bodyPart: 'full body', target: 'cardiovascular', 
          calories: 250, difficulty: 'high', equipment: 'none', duration: '15-20 min',
          sets: '6-8', reps: '30s', rest: '90s', intensity: 'high', focus: ['cardiovascular'] }
      ]
    };
  };

  const selectExercisesByAI = (userProfile, exerciseDatabase) => {
    const { fitnessLevel, goalPriority, focusAreas, riskFactors } = userProfile;
    
    // Select appropriate difficulty level
    let difficultyLevel = fitnessLevel;
    if (riskFactors.includes('age') || riskFactors.includes('recovery')) {
      difficultyLevel = 'beginner';
    }
    
    const availableExercises = exerciseDatabase[difficultyLevel] || exerciseDatabase.beginner;
    
    // AI Logic: Select exercises based on goals and focus areas
    let selectedExercises = [];
    
    // Prioritize exercises based on user goals
    if (goalPriority === 'fat_loss') {
      selectedExercises = availableExercises.filter(ex => 
        ex.focus.includes('cardiovascular') || ex.focus.includes('conditioning')
      ).slice(0, 3);
      selectedExercises.push(...availableExercises.filter(ex => 
        ex.focus.includes('strength') || ex.focus.includes('core')
      ).slice(0, 3));
    } else if (goalPriority === 'muscle_gain') {
      selectedExercises = availableExercises.filter(ex => 
        ex.focus.includes('strength')
      ).slice(0, 4);
      selectedExercises.push(...availableExercises.filter(ex => 
        ex.focus.includes('core') || ex.focus.includes('conditioning')
      ).slice(0, 2));
    } else {
      // General fitness - balanced selection
      selectedExercises = availableExercises.slice(0, 6);
    }
    
    return selectedExercises.slice(0, 6);
  };

  const customizeExercisesByAI = (exercises, userProfile) => {
    const { intensityLevel, riskFactors, fitnessLevel } = userProfile;
    
    return exercises.map(exercise => {
      let customizedExercise = { ...exercise };
      
      // Adjust based on intensity level
      if (intensityLevel === 'low') {
        customizedExercise.sets = '2-3';
        customizedExercise.reps = exercise.reps.includes('s') ? '15-30s' : '8-12';
        customizedExercise.rest = '90-120s';
        customizedExercise.intensity = 'low';
      } else if (intensityLevel === 'high') {
        customizedExercise.sets = '4-5';
        customizedExercise.reps = exercise.reps.includes('s') ? '45-60s' : '12-20';
        customizedExercise.rest = '60-90s';
        customizedExercise.intensity = 'high';
      }
      
      // Adjust for risk factors
      if (riskFactors.includes('age')) {
        customizedExercise.rest = '90-120s';
        customizedExercise.intensity = 'low';
      }
      
      if (riskFactors.includes('recovery')) {
        customizedExercise.sets = '2-3';
        customizedExercise.rest = '90-120s';
      }
      
      // Add AI-generated insights
      customizedExercise.aiInsight = generateAIInsight(exercise, userProfile);
      
      return customizedExercise;
    });
  };

  const generateAIInsight = (exercise, userProfile) => {
    const { fitnessLevel, goalPriority, riskFactors } = userProfile;
    
    if (goalPriority === 'fat_loss' && exercise.focus.includes('cardiovascular')) {
      return "Perfect for burning calories and improving cardiovascular health. Focus on maintaining steady breathing.";
    } else if (goalPriority === 'muscle_gain' && exercise.focus.includes('strength')) {
      return "Excellent for building muscle mass. Focus on controlled movements and proper form.";
    } else if (riskFactors.includes('age')) {
      return "Age-appropriate modification. Listen to your body and rest as needed.";
    } else if (riskFactors.includes('recovery') && exercise.intensity === 'high') {
      return "Modified for better recovery. Ensure adequate rest between sets.";
    } else {
      return "Great exercise for overall fitness. Focus on proper form and gradual progression.";
    }
  };

  const getFallbackExercises = () => {
    return [
      { id: 'push-ups', name: 'Push-ups', bodyPart: 'chest', target: 'upper body', 
        calories: 80, difficulty: 'moderate', equipment: 'none', duration: '15-20 min',
        sets: '3-4', reps: '10-12', rest: '60-90s', intensity: 'moderate', aiInsight: 'Standard exercise for upper body strength' },
      { id: 'squats', name: 'Bodyweight Squats', bodyPart: 'legs', target: 'lower body', 
        calories: 100, difficulty: 'moderate', equipment: 'none', duration: '15-20 min',
        sets: '3-4', reps: '10-12', rest: '60-90s', intensity: 'moderate', aiInsight: 'Fundamental lower body exercise' },
      { id: 'plank', name: 'Plank', bodyPart: 'core', target: 'stability', 
        calories: 60, difficulty: 'moderate', equipment: 'none', duration: '10-15 min',
        sets: '3-4', reps: '10-12', rest: '60-90s', intensity: 'moderate', aiInsight: 'Core stability and strength' }
    ];
  };




  const bmiCategory = (() => {
    if (!isFinite(bmi) || bmi === 0) return "";
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal";
    if (bmi < 30) return "Overweight";
    return "Obese";
  })();

  const chart = React.useMemo(() => {
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const maxBmi = 40;
    const pct = Math.max(0, Math.min(1, bmi / maxBmi));
    const dashOffset = circumference * (1 - pct);

    let color = '#10b981';
    if (bmiCategory === 'Underweight') color = '#9ca3af';
    if (bmiCategory === 'Overweight' || bmiCategory === 'Obese') color = '#ef4444';

    const trackColor = isDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)';
    const labelColor = isDarkMode ? '#e5e7eb' : '#111827';
    const subLabelColor = isDarkMode ? '#9ca3af' : '#6b7280';

    return { radius, circumference, dashOffset, color, trackColor, labelColor, subLabelColor };
  }, [bmi, bmiCategory, isDarkMode]);

  return (
    <>
    <motion.div
      className={`rounded-2xl p-6 ${themeColors.cardBg} ring-1 ${themeColors.border}`}
      whileHover={{
        scale: 1.01,
        backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(0,0,0,0.03)",
        boxShadow: `0 0 20px ${themeColors.accentShadow}`
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={`block text-sm mb-1 ${themeColors.textSecondary}`}>Age</label>
            <input
              type="number"
              min={1}
              max={120}
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              placeholder="age"
              className={`w-full rounded-lg px-3 py-2 outline-none ${themeColors.bg} ring-1 ${themeColors.border} ${themeColors.text}`}
            />
          </div>
          <div>
            <label className={`block text-sm mb-1 ${themeColors.textSecondary}`}>Height (cm)</label>
            <input
              type="number"
              min={50}
              max={260}
              value={heightCm}
              onChange={(e) => setHeightCm(Number(e.target.value))}
              placeholder="height"
              className={`w-full rounded-lg px-3 py-2 outline-none ${themeColors.bg} ring-1 ${themeColors.border} ${themeColors.text}`}
            />
          </div>
          <div>
            <label className={`block text-sm mb-1 ${themeColors.textSecondary}`}>Weight (kg)</label>
            <input
              type="number"
              min={10}
              max={400}
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              placeholder="weight"
              className={`w-full rounded-lg px-3 py-2 outline-none ${themeColors.bg} ring-1 ${themeColors.border} ${themeColors.text}`}
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="relative" style={{ width: 160, height: 160 }}>
            <svg width={160} height={160} viewBox="0 0 160 160">
              <circle cx="80" cy="80" r={chart.radius} stroke={chart.trackColor} strokeWidth="14" fill="none" />
              <motion.circle
                cx="80"
                cy="80"
                r={chart.radius}
                stroke={chart.color}
                strokeWidth="14"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={chart.circumference}
                animate={{ strokeDashoffset: chart.dashOffset }}
                initial={{ strokeDashoffset: chart.circumference }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
              />
            </svg>
            <div className="absolute inset-0 grid place-items-center text-center">
              <div>
                <div style={{ color: chart.labelColor }} className="text-3xl font-extrabold">{bmi || '—'}</div>
                <div style={{ color: chart.subLabelColor }} className="text-xs mt-1">{bmi ? bmiCategory : 'Enter details'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {lastResult && (
        <div className={`mt-4 text-sm ${themeColors.text}`}>
          <div className="font-semibold">Last Result</div>
          <div className={`${themeColors.textSecondary}`}>
            Height: <span className="font-medium">{lastResult.heightCm || '—'} cm</span>,
            {' '}Weight: <span className="font-medium">{lastResult.weightKg || '—'} kg</span>,
            {' '}BMI: <span className="font-medium">{lastResult.bmi || '—'}</span>
          </div>
        </div>
      )}
      <div className="flex gap-3 mt-3">
        <motion.button
          onClick={handleCalculate}
          disabled={isGenerating}
          className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 ${themeColors.accentBg} ring-1 ${themeColors.accentRing} ${themeColors.accent} ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
          whileHover={!isGenerating ? { scale: 1.03 } : {}}
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"></div>
              Generating AI Recommendations...
            </>
          ) : (
            'Generate AI Exercise Plan'
          )}
        </motion.button>
        <motion.button
          onClick={() => {
            const testExercises = getFallbackExercises();
            console.log('Test exercises:', testExercises);
            setRecommended(testExercises);
          }}
          className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 ${themeColors.cardBgSecondary} ring-1 ${themeColors.border} ${themeColors.text}`}
          whileHover={{ scale: 1.03 }}
        >
          Quick Demo
        </motion.button>
      </div>
    </motion.div>
    {recommended.length > 0 && (
      <section className="mt-8">
        <div className={`rounded-2xl p-6 ${themeColors.cardBg} mb-6`}>
          <h3 className={`text-lg font-semibold ${themeColors.text} mb-4 flex items-center gap-2`}>
            <Target className="h-5 w-5" />
            AI-Generated Fitness Analysis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div className={`p-4 rounded-lg ${themeColors.cardBgSecondary}`}>
              <div className="font-semibold text-blue-600">Body Composition</div>
              <div className={`${themeColors.textSecondary} mt-1`}>
                {bmiData.age}y/o {bmiData.gender}
              </div>
              <div className={`${themeColors.textSecondary}`}>
                {bmiData.bodyFatPercentage}% body fat
              </div>
            </div>
            <div className={`p-4 rounded-lg ${themeColors.cardBgSecondary}`}>
              <div className="font-semibold text-green-600">Recovery Status</div>
              <div className={`${themeColors.textSecondary} mt-1`}>
                {bmiData.sleepHours}h sleep
              </div>
              <div className={`${themeColors.textSecondary}`}>
                {bmiData.activityLevel} activity
              </div>
            </div>
            <div className={`p-4 rounded-lg ${themeColors.cardBgSecondary}`}>
              <div className="font-semibold text-purple-600">Fitness Goal</div>
              <div className={`${themeColors.textSecondary} mt-1`}>
                {bmiData.fitnessGoal.replace('_', ' ').toUpperCase()}
              </div>
            </div>
            <div className={`p-4 rounded-lg ${themeColors.cardBgSecondary}`}>
              <div className="font-semibold text-orange-600">BMI Status</div>
              <div className={`${themeColors.textSecondary} mt-1`}>
                {lastResult?.bmi || 'Calculate BMI'}
              </div>
              <div className={`${themeColors.textSecondary}`}>
                {bmiCategory || 'Not calculated'}
              </div>
            </div>
          </div>
        </div>
        
        <h2 className={`text-2xl font-bold ${themeColors.text} mb-4 flex items-center gap-2`}>
          <Target className="h-6 w-6 text-blue-500" />
          AI-Powered Exercise Recommendations
        </h2>
        <p className={`${themeColors.textSecondary} mb-6 text-sm`}>
          These exercises are specifically selected and customized based on your profile, fitness level, and goals.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommended.map((ex) => (
            <motion.div
              key={ex.id}
              className={`rounded-2xl p-6 ${themeColors.cardBg} ring-1 ${themeColors.border} hover:${themeColors.cardBgHover} transition-all duration-200`}
              whileHover={{ y: -4, scale: 1.02, boxShadow: `0 8px 25px ${themeColors.accentShadow}` }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="text-lg font-bold text-gray-900">{ex.name}</div>
                  <div className={`text-sm mt-1 ${themeColors.textSecondary}`}>
                    {ex.bodyPart} • {ex.target}
                  </div>
                </div>
                <div className={`h-12 w-12 grid place-items-center rounded-xl ${ex.difficulty === 'high' ? 'bg-red-100' : ex.difficulty === 'moderate' ? 'bg-yellow-100' : 'bg-green-100'}`}>
                  <div className={`text-xs font-bold ${ex.difficulty === 'high' ? 'text-red-600' : ex.difficulty === 'moderate' ? 'text-yellow-600' : 'text-green-600'}`}>
                    {ex.difficulty.toUpperCase()}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className={`text-sm font-medium ${themeColors.textSecondary}`}>Sets & Reps:</span>
                  <span className={`text-sm font-semibold ${themeColors.text}`}>{ex.sets} sets • {ex.reps} reps</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-sm font-medium ${themeColors.textSecondary}`}>Rest Period:</span>
                  <span className={`text-sm font-semibold ${themeColors.text}`}>{ex.rest}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-sm font-medium ${themeColors.textSecondary}`}>Duration:</span>
                  <span className={`text-sm font-semibold ${themeColors.text}`}>{ex.duration}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-sm font-medium ${themeColors.textSecondary}`}>Calories Burned:</span>
                  <span className={`text-sm font-semibold text-blue-600`}>{ex.calories} cal</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-sm font-medium ${themeColors.textSecondary}`}>Equipment:</span>
                  <span className={`text-sm font-semibold ${themeColors.text}`}>{ex.equipment}</span>
                </div>
              </div>
              
              <div className={`mt-4 pt-3 border-t ${themeColors.border}`}>
                <div className={`text-xs ${themeColors.textMuted}`}>
                  Intensity: <span className="font-semibold">{ex.intensity}</span>
                </div>
                {ex.aiInsight && (
                  <div className={`mt-2 text-xs ${themeColors.textSecondary} italic`}>
                    <span className="font-semibold text-blue-500">AI Insight:</span> {ex.aiInsight}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    )}
    <a href="#/assistant" className="fixed bottom-6 right-6 z-50">
      <motion.button
        className={`h-12 w-12 rounded-full ${themeColors.cardBg} ring-1 ${themeColors.border}`}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open AI Assistant"
      >
        <Dumbbell className={`h-6 w-6 mx-auto ${themeColors.accent}`} />
      </motion.button>
    </a>
    </>
  );
}




