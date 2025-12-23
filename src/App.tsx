import { useState, useCallback, useMemo, memo } from 'react';
import { 
  Search, Menu, X, Microscope, Stethoscope, Shield, 
  Activity, ChevronDown, Heart, Pill, Baby, Beaker, AlertTriangle, BookOpen
} from 'lucide-react';
import { AntibioticCard } from './components/AntibioticCard';
import antibioticsDataRaw from './data/antibiotics.json';
import type { AntibioticsData, AntibioticCategory, Antibiotic } from './types/antibiotics';

// Memoized category component
const CategoryButton = memo(({ 
  category, 
  isActive, 
  onClick 
}: { 
  category: AntibioticCategory; 
  isActive: boolean; 
  onClick: () => void; 
}) => {
  const Icon = category.icon;
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
        isActive
          ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:ring-blue-800'
          : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
      }`}
    >
      <div className={`w-2.5 h-2.5 rounded-full ${category.color} shadow-sm`} />
      {Icon && <Icon className="h-4 w-4" />}
      <span>{category.name}</span>
    </button>
  );
});

CategoryButton.displayName = 'CategoryButton';

// Memoized search component
const SearchInput = memo(({ 
  value, 
  onChange 
}: { 
  value: string; 
  onChange: (value: string) => void; 
}) => {
  return (
    <div className="relative group">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors group-focus-within:text-blue-500" />
      <input
        type="text"
        placeholder="Search antibiotics..."
        className="w-full pl-10 pr-4 py-2.5 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all outline-none bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
});

SearchInput.displayName = 'SearchInput';

// Memoized dark mode toggle
const DarkModeToggle = memo(({ 
  darkMode, 
  onToggle 
}: { 
  darkMode: boolean; 
  onToggle: () => void; 
}) => {
  return (
    <button 
      onClick={onToggle} 
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <span className="text-yellow-400">☀️</span>
      ) : (
        <span className="text-gray-600">🌙</span>
      )}
    </button>
  );
});

DarkModeToggle.displayName = 'DarkModeToggle';

// Memoized header component
const Header = memo(({ 
  title, 
  count, 
  darkMode 
}: { 
  title: string; 
  count: number; 
  darkMode: boolean; 
}) => {
  return (
    <header className="mb-8 md:mb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h2 className={`text-3xl md:text-4xl font-bold mb-3 capitalize tracking-tight ${
            darkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            {title}
          </h2>
          <p className={`text-lg max-w-2xl ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Comprehensive guide including dosing, safety profiles, and clinical indications.
          </p>
        </div>
        <div className="hidden md:block text-right">
          <span className={`text-sm font-medium ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            {count} {count === 1 ? 'Result' : 'Results'}
          </span>
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';

// Main App Component
const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('carbapenems');
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAntibiotic, setSelectedAntibiotic] = useState<Antibiotic | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  // Memoized categories to prevent re-creation
  const antibioticCategories = useMemo<AntibioticCategory[]>(() => [
    { id: 'carbapenems', name: 'Carbapenems', color: 'bg-emerald-600', icon: Beaker },
    { id: 'penicillins', name: 'Penicillins', color: 'bg-blue-600', icon: Pill },
    { id: 'cephalosporins', name: 'Cephalosporins', color: 'bg-purple-600', icon: Beaker },
    { id: 'aminoglycosides', name: 'Aminoglycosides', color: 'bg-amber-600', icon: Activity },
    { id: 'fluoroquinolones', name: 'Fluoroquinolones', color: 'bg-rose-600', icon: Heart },
    { id: 'glycopeptides', name: 'Glycopeptides', color: 'bg-cyan-600', icon: Shield },
    { id: 'tetracyclines', name: 'Tetracyclines', color: 'bg-lime-600', icon: Pill },
    { id: 'macrolides', name: 'Macrolides', color: 'bg-fuchsia-600', icon: Heart },
    { id: 'sulfonamides', name: 'Sulfonamides', color: 'bg-orange-500', icon: Pill },
    { id: 'others', name: 'Others', color: 'bg-indigo-600', icon: Beaker },
    { id: 'mdr', name: 'MDR Solutions', color: 'bg-orange-600', icon: AlertTriangle },
    { id: 'esbl', name: 'ESBL Guidelines', color: 'bg-teal-600', icon: BookOpen },
    { id: 'resistance', name: 'Resistance Solutions', color: 'bg-pink-600', icon: Shield },
    { id: 'stewardship', name: 'Stewardship Principles', color: 'bg-yellow-600', icon: BookOpen },
    { id: 'pregnancy', name: 'Antibiotics in Pregnancy', color: 'bg-pink-400', icon: Baby },
    { id: 'prophylaxis', name: 'Prophylactic Antibiotics', color: 'bg-green-600', icon: Shield },
    { id: 'preop', name: 'Pre-operative Antibiotics', color: 'bg-blue-500', icon: Beaker },
    { id: 'terminology', name: 'Key Terminology', color: 'bg-violet-600', icon: BookOpen },
  ], []);

  // Explicitly cast the imported JSON to the correct type
  const antibioticsData = useMemo(() => 
    antibioticsDataRaw as unknown as AntibioticsData, 
    []
  );

  // Optimized toggle section function
  const toggleSection = useCallback((sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  }, []);

  // Optimized toggle functions
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => {
      const newMode = !prev;
      document.documentElement.classList.toggle('dark', newMode);
      return newMode;
    });
  }, []);

  const handleAntibioticSelect = useCallback((antibiotic: Antibiotic) => {
    setSelectedAntibiotic(antibiotic);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Optimized category change handler
  const handleCategoryChange = useCallback((categoryId: string) => {
    setActiveCategory(categoryId);
    setMobileMenuOpen(false);
    setSearchQuery('');
    setSelectedAntibiotic(null);
  }, []);

  // Memoized filtered antibiotics calculation
  const filteredAntibiotics = useMemo(() => {
    const categoryData = antibioticsData[activeCategory as keyof AntibioticsData] || [];
    
    if (!searchQuery) return categoryData;
    
    return categoryData.filter((antibiotic: Antibiotic) => 
      antibiotic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      antibiotic.keyUses.some((use: string) => use.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [antibioticsData, activeCategory, searchQuery]);

  // Memoized current category
  const currentCategory = useMemo(() => 
    antibioticCategories.find(c => c.id === activeCategory), 
    [antibioticCategories, activeCategory]
  );

  return (
    <div className={`min-h-screen flex flex-col md:flex-row font-sans ${darkMode ? 'dark bg-gray-900 text-gray-50' : 'bg-gray-50 text-gray-900'}`}>
      {/* Mobile Header */}
      <div className={`md:hidden p-4 flex justify-between items-center sticky top-0 z-50 transition-all duration-300 ${darkMode ? 'bg-gray-800 border-b border-gray-700' : 'bg-white border-b border-gray-200'}`}>
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-1.5 rounded-xl shadow-lg">
            <Microscope className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">AntibioticGuide</h1>
        </div>
        <div className="flex items-center space-x-2">
          <DarkModeToggle darkMode={darkMode} onToggle={toggleDarkMode} />
          <button onClick={toggleMobileMenu} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-72 transform transition-transform duration-300 ease-in-out shadow-xl md:shadow-none
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 flex flex-col h-screen overflow-hidden
        ${darkMode ? 'bg-gray-800 border-r border-gray-700' : 'bg-white border-r border-gray-200'}
      `}>
        <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'} hidden md:flex items-center space-x-3`}>
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2 rounded-xl shadow-lg">
            <Microscope className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">AntibioticGuide</h1>
          <div className="ml-auto">
            <DarkModeToggle darkMode={darkMode} onToggle={toggleDarkMode} />
          </div>
        </div>
        
        <div className="p-4">
          <SearchInput value={searchQuery} onChange={setSearchQuery} />
        </div>

        <nav className="flex-1 overflow-y-auto py-2 px-3 space-y-0.5 custom-scrollbar">
          {antibioticCategories.map((category) => (
            <CategoryButton
              key={category.id}
              category={category}
              isActive={activeCategory === category.id}
              onClick={() => handleCategoryChange(category.id)}
            />
          ))}
        </nav>
        
        <div className={`p-4 border-t ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-100 bg-gray-50'} text-xs text-center`}>
          <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>© 2025 Medical Guide</p>
          <p className={`mt-1 opacity-75 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>For educational purposes only</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-screen relative">
        {selectedAntibiotic ? (
          <div className="max-w-5xl mx-auto p-4 md:p-8 pb-24">
             <button 
               onClick={() => setSelectedAntibiotic(null)}
               className={`group mb-6 flex items-center font-medium transition-all duration-200 px-4 py-2 rounded-lg shadow-sm border w-fit ${
                 darkMode 
                   ? 'text-gray-300 hover:text-blue-400 bg-gray-800 border-gray-700' 
                   : 'text-gray-500 hover:text-blue-600 bg-white border-gray-200'
               }`}
             >
               <ChevronDown className="h-4 w-4 rotate-90 mr-2 group-hover:-translate-x-1 transition-transform" />
               Back to list
             </button>
             
             <div className="space-y-6">
               {/* Header Card */}
               <div className={`rounded-2xl shadow-sm border overflow-hidden transition-all duration-300 ${
                 darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
               }`}>
                 <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 md:p-8 text-white relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-8 opacity-10">
                     <Microscope className="w-32 h-32" />
                   </div>
                   <div className="relative z-10">
                     <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">{selectedAntibiotic.name}</h2>
                     <p className="text-blue-100 text-lg md:text-xl font-light leading-relaxed max-w-2xl">{selectedAntibiotic.spectrum}</p>
                   </div>
                 </div>
                 
                 <div className={`p-6 md:p-8 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                   <h3 className="text-lg font-bold mb-4 flex items-center">
                     <div className="p-1.5 bg-blue-100 rounded-lg mr-3 dark:bg-blue-900/30">
                       <Stethoscope className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                     </div>
                     Clinical Indications
                   </h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                     {selectedAntibiotic.keyUses.map((use: string, idx: number) => (
                       <div key={idx} className={`px-4 py-3 rounded-xl border flex items-start group hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-200 ${
                         darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-100'
                       }`}>
                         <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200 dark:bg-blue-900/30 dark:text-blue-400 dark:group-hover:bg-blue-600 dark:group-hover:text-white">{idx + 1}</span>
                         <span className={`font-medium text-sm leading-relaxed ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{use}</span>
                       </div>
                     ))}
                   </div>
                 </div>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 {/* Dosing Card */}
                 <section className={`rounded-2xl border shadow-sm h-full transition-all duration-300 ${
                   darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                 }`}>
                   <h3 className="text-lg font-bold flex items-center p-6 pb-4 border-b border-gray-100 dark:border-gray-700">
                     <div className="p-1.5 bg-emerald-100 rounded-lg mr-3 dark:bg-emerald-900/30">
                       <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                     </div>
                     Dosing & Administration
                   </h3>
                   <div className="p-6 space-y-6">
                     <div className="relative pl-4 border-l-2 border-gray-200 dark:border-gray-600">
                       <span className={`text-xs font-bold uppercase tracking-wider block mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>Standard Dose</span>
                       <p className={`font-medium text-lg ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{selectedAntibiotic.dosing}</p>
                     </div>
                     <div className={`rounded-xl p-4 border transition-all duration-200 ${
                       darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-100'
                     }`}>
                       <span className={`text-xs font-bold uppercase tracking-wider flex items-center mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                         <Activity className="w-3 h-3 mr-1" />
                         Renal Adjustment
                       </span>
                       <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{selectedAntibiotic.renalAdjustment || 'No specific adjustment required.'}</p>
                     </div>
                   </div>
                 </section>
                 
                 {/* Safety Card */}
                 <section className={`rounded-2xl border shadow-sm h-full transition-all duration-300 ${
                   darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                 }`}>
                   <h3 className="text-lg font-bold flex items-center p-6 pb-4 border-b border-gray-100 dark:border-gray-700">
                     <div className="p-1.5 bg-rose-100 rounded-lg mr-3 dark:bg-rose-900/30">
                       <Shield className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                     </div>
                     Safety Profile
                   </h3>
                   <div className="p-6 space-y-6">
                     <div className={`rounded-xl p-4 border transition-all duration-200 ${
                       darkMode ? 'bg-rose-900/20 border-rose-800/30' : 'bg-rose-50 border-rose-100'
                     }`}>
                       <span className={`text-xs font-bold uppercase tracking-wider flex items-center mb-2 ${darkMode ? 'text-rose-400' : 'text-rose-600'}`}>
                         <Shield className="w-3 h-3 mr-1" />
                         Key Warning
                       </span>
                       <p className={`font-medium ${darkMode ? 'text-rose-300' : 'text-rose-800'}`}>{selectedAntibiotic.keyWarning}</p>
                     </div>
                     <div>
                       <span className={`text-xs font-bold uppercase tracking-wider block mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>Drug Interactions</span>
                       <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-200' : 'text-gray-600'}`}>{selectedAntibiotic.drugInteractions || 'No significant interactions reported.'}</p>
                     </div>
                   </div>
                 </section>
               </div>
               
               {selectedAntibiotic.resistanceInfo && (
                 <section className={`rounded-2xl p-6 md:p-8 border shadow-sm transition-all duration-300 ${
                   darkMode ? 'bg-amber-900/20 border-amber-800/30' : 'bg-amber-50 border-amber-200/60'
                 }`}>
                   <h3 className="text-lg font-bold mb-3 flex items-center">
                     <Shield className="w-5 h-5 mr-2" />
                     Resistance Information
                   </h3>
                   <p className={`leading-relaxed max-w-3xl ${darkMode ? 'text-amber-200' : 'text-amber-800'}`}>{selectedAntibiotic.resistanceInfo}</p>
                 </section>
               )}
             </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto p-4 md:p-8 pb-24">
            <Header 
              title={currentCategory?.name || activeCategory} 
              count={filteredAntibiotics.length} 
              darkMode={darkMode} 
            />

            <div className="space-y-4">
              {filteredAntibiotics.length > 0 ? (
                filteredAntibiotics.map((antibiotic: Antibiotic, index: number) => (
                  <AntibioticCard
                    key={`${activeCategory}-${index}`}
                    antibiotic={antibiotic}
                    index={index}
                    isExpanded={!!expandedSections[`${activeCategory}-${index}`]}
                    onToggle={() => toggleSection(`${activeCategory}-${index}`)}
                    onSelect={handleAntibioticSelect}
                    darkMode={darkMode}
                  />
                ))
              ) : (
                <div className={`py-20 text-center rounded-2xl border border-dashed transition-all duration-300 ${
                  darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'
                }`}>
                  <div className={`p-4 rounded-full w-fit mx-auto mb-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <Search className={`h-8 w-8 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                  </div>
                  <h3 className={`text-lg font-medium mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>No antibiotics found</h3>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Try adjusting your search query or selecting a different category.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;