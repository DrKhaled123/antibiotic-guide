import React from 'react';
import { ChevronDown, ChevronUp, Plus, AlertCircle, BookOpen, FlaskConical, Shield, Scale, AlertTriangle } from 'lucide-react';
import type { Antibiotic } from '../types/antibiotics';

interface AntibioticCardProps {
  antibiotic: Antibiotic;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  onSelect: (antibiotic: Antibiotic) => void;
  darkMode: boolean;
}

export const AntibioticCard: React.FC<AntibioticCardProps> = ({
  antibiotic,
  index,
  isExpanded,
  onToggle,
  onSelect,
  darkMode,
}) => {
  return (
    <div className={`rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 mb-4 ${
      darkMode ? 'bg-gray-800 border border-gray-700 hover:border-gray-600' : 'bg-white border border-gray-200 hover:border-gray-300'
    }`}>
      <button
        onClick={onToggle}
        className={`w-full px-4 md:px-6 py-4 flex justify-between items-center transition-all duration-300 ${
          darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'
        }`}
      >
        <div className="flex items-center min-w-0">
          <div className={`rounded-xl h-10 w-10 flex items-center justify-center flex-shrink-0 mr-4 font-bold shadow-sm transition-all duration-300 ${
            darkMode ? 'bg-blue-900/30 text-blue-400 border border-blue-800/30' : 'bg-blue-100 text-blue-700 border border-blue-200'
          }`}>
            {index + 1}
          </div>
          <div className="min-w-0 flex-grow text-left">
            <h3 className={`font-bold text-lg truncate transition-colors ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{antibiotic.name}</h3>
            <p className={`text-sm mt-0.5 line-clamp-1 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{antibiotic.spectrum}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`hidden md:inline-flex text-xs font-semibold px-3 py-1 rounded-full border transition-all duration-300 ${
            darkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-gray-100 text-gray-600 border-gray-200'
          }`}>
            {antibiotic.keyUses[0]}
          </span>
          {isExpanded ? (
            <ChevronUp className={`h-5 w-5 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
          ) : (
            <ChevronDown className={`h-5 w-5 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className={`px-4 md:px-6 pb-6 pt-2 border-t transition-all duration-300 ${
          darkMode ? 'bg-gray-900/20 border-gray-700' : 'bg-gray-50/50 border-gray-100'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
            <div className="space-y-6">
              <div>
                <h4 className={`font-bold mb-3 flex items-center text-sm uppercase tracking-wide transition-colors ${
                  darkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  <Plus className={`mr-2 h-4 w-4 transition-colors ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                  Key Clinical Uses
                </h4>
                <div className="flex flex-wrap gap-2">
                  {antibiotic.keyUses.map((use, useIndex) => (
                    <span key={useIndex} className={`inline-flex items-center px-2.5 py-1 rounded-md text-sm font-medium border transition-all duration-300 ${
                      darkMode ? 'bg-blue-900/20 text-blue-300 border-blue-800/30 hover:bg-blue-900/30' : 'bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100'
                    }`}>
                      {use}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className={`p-4 rounded-xl border shadow-md transition-all duration-300 ${
                darkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'
              }`}>
                <h4 className={`font-bold mb-3 flex items-center text-sm uppercase tracking-wide transition-colors ${
                  darkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  <BookOpen className={`mr-2 h-4 w-4 transition-colors ${darkMode ? 'text-emerald-400' : 'text-emerald-500'}`} />
                  Dosing Guidelines
                </h4>
                <p className={`font-mono text-sm p-3 rounded-lg border transition-colors ${
                  darkMode ? 'bg-gray-900/30 text-gray-300 border-gray-700' : 'bg-gray-50 text-gray-600 border-gray-100'
                }`}>
                  {antibiotic.dosing}
                </p>
                
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <div>
                    <h5 className={`text-xs font-semibold mb-1 flex items-center transition-colors ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <Scale className={`mr-1 h-3 w-3 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      Renal
                    </h5>
                    <p className={`text-sm transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{antibiotic.renalAdjustment || 'None'}</p>
                   </div>
                   <div>
                    <h5 className={`text-xs font-semibold mb-1 flex items-center transition-colors ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <AlertTriangle className={`mr-1 h-3 w-3 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      Hepatic
                    </h5>
                    <p className={`text-sm transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{antibiotic.hepaticAdjustment || 'None'}</p>
                   </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className={`p-4 rounded-xl border transition-all duration-300 ${
                darkMode ? 'bg-rose-900/20 border-rose-800/30 hover:border-rose-700/50' : 'bg-rose-50 border-rose-100 hover:border-rose-200'
              }`}>
                <h4 className={`font-bold mb-2 flex items-center text-sm uppercase tracking-wide transition-colors ${
                  darkMode ? 'text-rose-300' : 'text-rose-800'
                }`}>
                  <AlertCircle className={`mr-2 h-4 w-4 transition-colors ${darkMode ? 'text-rose-400' : 'text-rose-600'}`} />
                  Critical Warning
                </h4>
                <p className={`text-sm leading-relaxed transition-colors ${darkMode ? 'text-rose-200' : 'text-rose-700'}`}>{antibiotic.keyWarning}</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className={`p-4 rounded-xl border shadow-md transition-all duration-300 ${
                  darkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'
                }`}>
                  <h4 className={`font-bold mb-2 flex items-center text-xs uppercase tracking-wide transition-colors ${
                    darkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    <FlaskConical className={`mr-2 h-4 w-4 transition-colors ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                    Interactions
                  </h4>
                  <p className={`text-sm transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{antibiotic.drugInteractions || 'None significant'}</p>
                </div>
                
                <div className={`p-4 rounded-xl border shadow-md transition-all duration-300 ${
                  darkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'
                }`}>
                  <h4 className={`font-bold mb-2 flex items-center text-xs uppercase tracking-wide transition-colors ${
                    darkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    <Shield className={`mr-2 h-4 w-4 transition-colors ${darkMode ? 'text-amber-400' : 'text-amber-500'}`} />
                    Precautions
                  </h4>
                  <p className={`text-sm transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{antibiotic.precautions || 'None significant'}</p>
                </div>
              </div>

              {antibiotic.resistanceInfo && (
                <div className={`p-4 rounded-xl border transition-all duration-300 ${
                  darkMode ? 'bg-amber-900/20 border-amber-800/30 hover:border-amber-700/50' : 'bg-amber-50 border-amber-100 hover:border-amber-200'
                }`}>
                  <h4 className={`font-bold mb-2 flex items-center text-sm uppercase tracking-wide transition-colors ${
                    darkMode ? 'text-amber-300' : 'text-amber-800'
                  }`}>
                    <Shield className={`mr-2 h-4 w-4 transition-colors ${darkMode ? 'text-amber-400' : 'text-amber-600'}`} />
                    Resistance Info
                  </h4>
                  <p className={`text-sm leading-relaxed transition-colors ${darkMode ? 'text-amber-200' : 'text-amber-700'}`}>{antibiotic.resistanceInfo}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-6 flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(antibiotic);
              }}
              className={`px-5 py-2.5 rounded-lg transition-all duration-300 flex items-center space-x-2 shadow-sm font-medium text-sm ${
                darkMode 
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/20 focus:ring-2 focus:ring-blue-500/40' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/20 focus:ring-2 focus:ring-blue-500/40'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>View Full Details</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};