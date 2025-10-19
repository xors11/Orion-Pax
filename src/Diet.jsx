import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { useBMI } from './BMIContext';
import { Dumbbell, Bot, Sun, Moon, Menu, X, Search, Calculator, Target, Clock, User, Activity, Zap, DollarSign } from 'lucide-react';

export default function Diet() {
  const { colors, isDarkMode } = useTheme();
  const themeColors = colors[isDarkMode ? 'dark' : 'light'];

  return (
    <div className={`min-h-screen ${themeColors.bg} ${themeColors.text} ${themeColors.selection}`}>
      <NavBar />
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
        <h1 className={`text-3xl font-bold ${themeColors.text} mb-6`}>Budget-Friendly Diet Plan</h1>
        <UserSpecsForm />
        <BudgetDietModule />
      </section>
      <a href="#/assistant" className="fixed bottom-6 right-6 z-50">
        <motion.button className={`h-12 w-12 rounded-full ${themeColors.cardBg} ring-1 ${themeColors.border}`} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} aria-label="Open AI Assistant">
          <Bot className={`h-6 w-6 mx-auto ${themeColors.accent}`} />
        </motion.button>
      </a>
    </div>
  );
}

function NavBar() {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const themeColors = colors[isDarkMode ? 'dark' : 'light'];
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  return (
    <header className={`sticky top-0 z-50 backdrop-blur ${themeColors.backdrop} border-b ${themeColors.border}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">
        <motion.a href="#/" className="flex items-center gap-3" whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)" }} transition={{ duration: 0.2 }}>
          <motion.span className="h-9 w-9 grid place-items-center rounded-2xl bg-blue-100 ring-1 ring-blue-200" whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.2)", ringColor: "rgba(59, 130, 246, 0.5)", boxShadow: "0 0 15px rgba(59, 130, 246, 0.6)" }} transition={{ duration: 0.2 }}>
            <Dumbbell className="h-5 w-5 text-blue-600" />
          </motion.span>
          <span className={`font-black tracking-tight ${themeColors.text} text-lg`}>Fitzer</span>
        </motion.a>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <motion.a href="#/" className={`${themeColors.textSecondary} hover:${themeColors.text.replace('text-', 'text-')} transition-colors`} whileHover={{ y: -2 }}>
            Home
          </motion.a>
          <motion.a href="#/exercise" className={`${themeColors.textSecondary} hover:${themeColors.text.replace('text-', 'text-')} transition-colors`} whileHover={{ y: -2 }}>
            Exercises
          </motion.a>
          <motion.a href="#/diet" className={`${themeColors.textSecondary} hover:${themeColors.text.replace('text-', 'text-')} transition-colors`} whileHover={{ y: -2 }}>
            Diet Plans
          </motion.a>
          <motion.a href="#/assistant" className={`${themeColors.textSecondary} hover:${themeColors.text.replace('text-', 'text-')} transition-colors`} whileHover={{ y: -2 }}>
            AI Assistant
          </motion.a>
        </nav>

        <div className="flex items-center gap-2">
          <motion.button onClick={toggleTheme} className={`p-2 rounded-lg ${themeColors.cardBg} ring-1 ${themeColors.border}`} whileHover={{ scale: 1.1 }}>
            {isDarkMode ? <Sun className={`h-5 w-5 ${themeColors.accent}`} /> : <Moon className={`h-5 w-5 ${themeColors.accent}`} />}
          </motion.button>
          <div className="md:hidden flex items-center gap-2">
            <motion.button className={`p-2 rounded-lg ${themeColors.cardBg}`} whileHover={{ scale: 1.1 }}>
              <Search className={`h-5 w-5 ${themeColors.textSecondary}`} />
            </motion.button>
            <motion.button onClick={() => setIsMobileOpen(v => !v)} className={`p-2 rounded-lg ${themeColors.cardBg} ring-1 ${themeColors.border}`} whileHover={{ scale: 1.1 }} aria-label="Open menu">
              {isMobileOpen ? <X className={`h-5 w-5 ${themeColors.text}`} /> : <Menu className={`h-5 w-5 ${themeColors.text}`} />}
            </motion.button>
          </div>
        </div>
      </div>
      {isMobileOpen && (
        <div className={`md:hidden border-t ${themeColors.border} ${themeColors.bg}`}>
          <div className="px-3 py-3 space-y-2">
            <motion.a href="#/" onClick={() => setIsMobileOpen(false)} className={`block rounded-lg px-4 py-3 ring-1 ${themeColors.border} ${themeColors.cardBg} hover:${themeColors.cardBgHover} ${themeColors.text}`} whileHover={{ y: -1 }}>
              Home
            </motion.a>
            <motion.a href="#/exercise" onClick={() => setIsMobileOpen(false)} className={`block rounded-lg px-4 py-3 ring-1 ${themeColors.border} ${themeColors.cardBg} hover:${themeColors.cardBgHover} ${themeColors.text}`} whileHover={{ y: -1 }}>
              Exercises
            </motion.a>
            <motion.a href="#/diet" onClick={() => setIsMobileOpen(false)} className={`block rounded-lg px-4 py-3 ring-1 ${themeColors.border} ${themeColors.cardBg} hover:${themeColors.cardBgHover} ${themeColors.text}`} whileHover={{ y: -1 }}>
              Diet Plans
            </motion.a>
            <motion.a href="#/assistant" onClick={() => setIsMobileOpen(false)} className={`block rounded-lg px-4 py-3 ring-1 ${themeColors.border} ${themeColors.cardBg} hover:${themeColors.cardBgHover} ${themeColors.text}`} whileHover={{ y: -1 }}>
              AI Assistant
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
        Your Profile
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

function BudgetDietModule() {
  const { colors, isDarkMode } = useTheme();
  const { bmiData } = useBMI();
  const themeColors = colors[isDarkMode ? 'dark' : 'light'];
  const [budgetRange, setBudgetRange] = React.useState('low');
  const [dietType, setDietType] = React.useState('vegan');
  const [dietPlan, setDietPlan] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const budgetRanges = {
    low: { label: 'Low Budget', max: 300, color: 'text-green-600', bg: 'bg-green-50' },
    medium: { label: 'Medium Budget', max: 600, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    high: { label: 'High Budget', max: 1000, color: 'text-blue-600', bg: 'bg-blue-50' }
  };

  const generateBudgetDiet = async () => {
    setIsLoading(true);
    try {
      // Simulate API call - in real app, this would call your AI service
      const budgetInfo = budgetRanges[budgetRange];
      const mockDietPlan = generateMockBudgetDiet(bmiData, budgetRange, dietType);
      setDietPlan(mockDietPlan);
    } catch (error) {
      console.error('Error generating diet plan:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateMockBudgetDiet = (userData, budget, dietType) => {
    const { age, gender, bodyFatPercentage, sleepHours, activityLevel, fitnessGoal } = userData;
    
    // Calculate calorie needs based on user specs
    const baseCalories = calculateCalorieNeeds(userData);
    const proteinNeeds = calculateProteinNeeds(userData);
    
    // Generate budget-specific meal plans
    const mealPlans = generateBudgetMealPlans(budget, baseCalories, proteinNeeds, fitnessGoal, dietType);
    
    return [
      `PERSONAL PROFILE`,
      `Age: ${age} years | Gender: ${gender}`,
      `Body Fat: ${bodyFatPercentage}% | Sleep: ${sleepHours} hours`,
      `Fitness Goal: ${fitnessGoal.replace('_', ' ').toUpperCase()}`,
      `Diet Type: ${dietType.toUpperCase()}`,
      `Daily Calories: ${baseCalories} | Protein: ${proteinNeeds}g`,
      ``,
      `MEAL PLAN`,
      `Breakfast: ${mealPlans.breakfast}`,
      `Morning Snack: ${mealPlans.snack1}`,
      `Lunch: ${mealPlans.lunch}`,
      `Afternoon Snack: ${mealPlans.snack2}`,
      `Dinner: ${mealPlans.dinner}`,
      `Hydration: ${calculateWaterNeeds(userData)} glasses per day`,
      ``,
      `COST SUMMARY`,
      `Daily Total: ${mealPlans.total}`,
      `Budget Tip: ${getBudgetTip(budget, userData)}`,
      ``,
      `SHOPPING LIST`,
      `${generateShoppingList(mealPlans, dietType)}`
    ];
  };

  const calculateCalorieNeeds = (userData) => {
    const { age, gender, bodyFatPercentage, activityLevel } = userData;
    
    // BMR calculation (Mifflin-St Jeor Equation)
    let bmr;
    if (gender === 'male') {
      bmr = 10 * 70 + 6.25 * 170 - 5 * age + 5; // Using default weight/height for calculation
    } else {
      bmr = 10 * 70 + 6.25 * 170 - 5 * age - 161;
    }
    
    // Activity multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };
    
    const maintenanceCalories = bmr * activityMultipliers[activityLevel];
    
    // Adjust based on fitness goal
    if (userData.fitnessGoal === 'lose_weight') {
      return Math.round(maintenanceCalories - 500);
    } else if (userData.fitnessGoal === 'gain_weight') {
      return Math.round(maintenanceCalories + 300);
    } else if (userData.fitnessGoal === 'build_muscle') {
      return Math.round(maintenanceCalories + 200);
    }
    
    return Math.round(maintenanceCalories);
  };

  const calculateProteinNeeds = (userData) => {
    const { fitnessGoal, bodyFatPercentage } = userData;
    
    // Base protein needs (1.6g per kg body weight for muscle building)
    let proteinPerKg = 1.6;
    
    if (fitnessGoal === 'build_muscle') {
      proteinPerKg = 2.2;
    } else if (fitnessGoal === 'lose_weight') {
      proteinPerKg = 2.0; // Higher protein for weight loss
    } else if (bodyFatPercentage > 25) {
      proteinPerKg = 1.8; // Higher protein for higher body fat
    }
    
    return Math.round(70 * proteinPerKg); // Using 70kg as default weight
  };

  const calculateWaterNeeds = (userData) => {
    const { activityLevel, sleepHours } = userData;
    let baseWater = 8; // 8 glasses base
    
    if (activityLevel === 'very_active') baseWater += 2;
    else if (activityLevel === 'active') baseWater += 1;
    
    if (sleepHours < 7) baseWater += 1; // More water if less sleep
    
    return baseWater;
  };

  const generateBudgetMealPlans = (budget, calories, protein, goal, dietType) => {
    const veganMeals = {
      low: {
        breakfast: "Oatmeal (1 cup) + Banana + 2 tbsp peanut butter + 1 cup almond milk",
        snack1: "Mixed nuts (1/4 cup) + Apple",
        lunch: "Brown rice (1 cup) + Black beans (1/2 cup) + Mixed vegetables + Olive oil",
        snack2: "Coconut yogurt (1 cup) + Berries",
        dinner: "Tofu curry (4oz) + Sweet potato + Broccoli + Garlic",
        total: "₹180"
      },
      medium: {
        breakfast: "Whole grain toast + Avocado + 2 tbsp tahini + Spinach",
        snack1: "Protein smoothie (plant protein + banana + spinach + almond milk)",
        lunch: "Quinoa salad + Chickpeas + Mixed vegetables + Olive oil",
        snack2: "Mixed nuts (1/4 cup) + Dried fruit",
        dinner: "Lentil curry + Brown rice + Asparagus + Lemon",
        total: "₹320"
      },
      high: {
        breakfast: "Acai bowl + Granola + Fresh berries + Chia seeds + Almond milk",
        snack1: "Protein bar + Fresh fruit + Almond butter",
        lunch: "Tempeh stir-fry + Quinoa + Roasted vegetables + Avocado",
        snack2: "Coconut yogurt parfait + Nuts + Honey",
        dinner: "Mushroom steak + Sweet potato + Green beans + Herbs",
        total: "₹550"
      }
    };

    const nonVeganMeals = {
      low: {
        breakfast: "Oatmeal (1 cup) + Banana + 2 tbsp peanut butter + 1 cup milk",
        snack1: "Hard-boiled eggs (2) + Apple",
        lunch: "Brown rice (1 cup) + Black beans (1/2 cup) + Mixed vegetables + Olive oil",
        snack2: "Greek yogurt (1 cup) + Berries",
        dinner: "Chicken thigh (4oz) + Sweet potato + Broccoli + Garlic",
        total: "₹200"
      },
      medium: {
        breakfast: "Whole grain toast + Avocado + 2 eggs + Spinach",
        snack1: "Protein smoothie (whey + banana + spinach + milk)",
        lunch: "Quinoa salad + Grilled chicken breast + Mixed vegetables + Olive oil",
        snack2: "Mixed nuts (1/4 cup) + Dried fruit",
        dinner: "Salmon fillet (4oz) + Brown rice + Asparagus + Lemon",
        total: "₹380"
      },
      high: {
        breakfast: "Acai bowl + Granola + Fresh berries + Chia seeds + Almond milk",
        snack1: "Protein bar + Fresh fruit + Almond butter",
        lunch: "Grilled salmon + Quinoa + Roasted vegetables + Avocado",
        snack2: "Greek yogurt parfait + Nuts + Honey",
        dinner: "Lean beef steak + Sweet potato + Green beans + Herbs",
        total: "₹650"
      }
    };

    return dietType === 'vegan' ? veganMeals[budget] : nonVeganMeals[budget];
  };

  const generateShoppingList = (mealPlan, dietType) => {
    const veganItems = [
      "Oatmeal, Rice, Quinoa, Lentils",
      "Tofu, Chickpeas, Black beans, Coconut yogurt", 
      "Bananas, Apples, Berries, Avocado",
      "Vegetables (frozen for budget), Mixed nuts",
      "Peanut butter, Olive oil, Tahini"
    ];
    
    const nonVeganItems = [
      "Oatmeal, Rice, Quinoa",
      "Chicken, Eggs, Greek yogurt, Salmon", 
      "Bananas, Apples, Berries, Avocado",
      "Vegetables (frozen for budget), Mixed nuts",
      "Peanut butter, Olive oil, Whey protein"
    ];
    
    return dietType === 'vegan' ? veganItems.join(", ") : nonVeganItems.join(", ");
  };

  const getBudgetTip = (budget, userData) => {
    const tips = {
      low: "Shop at local markets, buy seasonal vegetables, and use lentils as primary protein source.",
      medium: "Buy grains in bulk, shop at wholesale markets, and consider local dairy products.",
      high: "Invest in organic produce, quality proteins, and premium nuts for maximum nutrition."
    };
    return tips[budget];
  };

  React.useEffect(() => {
    if (dietPlan.length > 0) {
      localStorage.setItem('fitzer.budgetDiet', JSON.stringify({ 
        budgetRange, 
        dietPlan, 
        userSpecs: bmiData,
        generatedAt: Date.now() 
      }));
    }
  }, [dietPlan, budgetRange, bmiData]);

  return (
    <div className="space-y-6">
      {/* Budget Selection */}
      <div className={`rounded-2xl p-6 ${themeColors.cardBg}`}>
        <h2 className={`text-xl font-semibold ${themeColors.text} mb-4 flex items-center gap-2`}>
          <DollarSign className="h-5 w-5" />
          Choose Your Budget Range
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {Object.entries(budgetRanges).map(([key, range]) => (
            <motion.button
              key={key}
              onClick={() => setBudgetRange(key)}
              className={`p-4 rounded-lg text-left transition-all ${
                budgetRange === key 
                  ? `${range.bg} ${range.color} ring-2 ring-blue-500` 
                  : `${themeColors.cardBgSecondary} ${themeColors.text}`
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="font-semibold">{range.label}</div>
              <div className="text-sm opacity-75">Up to ₹{range.max}/day</div>
            </motion.button>
          ))}
        </div>

        {/* Diet Type Selection */}
        <div className="mb-6">
          <h3 className={`text-lg font-semibold ${themeColors.text} mb-3`}>Diet Preference</h3>
          <div className="flex gap-4">
            <motion.button
              onClick={() => setDietType('vegan')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                dietType === 'vegan'
                  ? 'bg-green-100 text-green-700 ring-2 ring-green-500'
                  : `${themeColors.cardBgSecondary} ${themeColors.text}`
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Vegan
            </motion.button>
            <motion.button
              onClick={() => setDietType('non-vegan')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                dietType === 'non-vegan'
                  ? 'bg-orange-100 text-orange-700 ring-2 ring-orange-500'
                  : `${themeColors.cardBgSecondary} ${themeColors.text}`
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Non-Vegan
            </motion.button>
          </div>
        </div>

        <motion.button
          onClick={generateBudgetDiet}
          disabled={isLoading}
          className={`px-6 py-3 rounded-lg ${themeColors.accentBg} ${themeColors.accent} font-semibold transition-all disabled:opacity-50`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isLoading ? 'Generating...' : 'Generate Budget Diet Plan'}
        </motion.button>
      </div>

      {/* Diet Plan Display */}
      {dietPlan.length > 0 && (
        <div className={`rounded-2xl p-6 ${themeColors.cardBg}`}>
          <h3 className={`text-xl font-semibold ${themeColors.text} mb-4 flex items-center gap-2`}>
            <Target className="h-5 w-5" />
            Your Budget-Friendly Diet Plan
          </h3>
          
          <div className="space-y-2">
            {dietPlan.map((item, idx) => {
              const isHeader = item === item.toUpperCase() && !item.includes(':') && !item.includes('|') && !item.includes('₹');
              const isSubHeader = item.includes(':') && !item.includes('₹');
              const isCost = item.includes('₹');
              const isEmpty = item === '';
              
              if (isEmpty) {
                return <div key={idx} className="h-2" />;
              }
              
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className={`p-3 rounded-lg ${
                    isHeader ? `${themeColors.cardBg} font-bold text-lg border-l-4 border-blue-500` :
                    isSubHeader ? `${themeColors.cardBgSecondary} font-semibold` :
                    isCost ? `${themeColors.cardBgSecondary} font-semibold text-green-600` :
                    `${themeColors.cardBgSecondary}`
                  } ${themeColors.text}`}
                >
                  {isHeader ? item : isSubHeader ? item : `• ${item}`}
                </motion.div>
              );
            })}
          </div>

          <div className={`mt-6 p-4 rounded-lg ${themeColors.cardBgSecondary}`}>
            <h4 className={`font-semibold mb-2 ${themeColors.text} flex items-center gap-2`}>
              <Zap className="h-4 w-4" />
              Budget Optimization Tips
            </h4>
            <ul className={`space-y-1 text-sm ${themeColors.textSecondary}`}>
              <li>• Plan meals weekly and create a shopping list</li>
              <li>• Buy seasonal produce for better prices</li>
              <li>• Cook in batches and freeze portions</li>
              <li>• Use cheaper protein sources like eggs, beans, and chicken</li>
              <li>• Shop at discount stores for pantry staples</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}