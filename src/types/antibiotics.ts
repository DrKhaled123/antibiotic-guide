export interface Antibiotic {
  name: string;
  keyUses: string[];
  spectrum: string;
  dosing: string;
  renalAdjustment?: string;
  hepaticAdjustment?: string;
  keyWarning: string;
  resistanceInfo: string;
  drugInteractions?: string;
  precautions?: string;
  safety?: string;
  definition?: string;
  clinicalImportance?: string;
  detection?: string;
  prevention?: string;
  prevalence?: string;
  keyStrategies?: string;
  interpretation?: string;
  limitations?: string;
  timing?: string;
  stewardship?: string;
  alternatives?: string;
  duration?: string;
}

export interface AntibioticsData {
  carbapenems: Antibiotic[];
  penicillins: Antibiotic[];
  cephalosporins: Antibiotic[];
  aminoglycosides: Antibiotic[];
  fluoroquinolones: Antibiotic[];
  glycopeptides: Antibiotic[];
  tetracyclines: Antibiotic[];
  macrolides: Antibiotic[];
  sulfonamides: Antibiotic[];
  others: Antibiotic[];
  mdr: Antibiotic[];
  esbl: Antibiotic[];
  resistance: Antibiotic[];
  stewardship: Antibiotic[];
  pregnancy: Antibiotic[];
  prophylaxis: Antibiotic[];
  preop: Antibiotic[];
  terminology: Antibiotic[];
}

export interface AntibioticCategory {
  id: string;
  name: string;
  color: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface SearchFilters {
  query: string;
  category: string;
}

export interface ExpandedSections {
  [key: string]: boolean;
}

export interface AntibioticCardProps {
  antibiotic: Antibiotic;
  index: number;
  isExpanded: boolean;
  onToggle: (sectionId: string) => void;
  onSelect: (antibiotic: Antibiotic) => void;
  darkMode: boolean;
}

export interface CategoryFilterProps {
  categories: AntibioticCategory[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  onCollapseAll: () => void;
}

export interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  placeholder?: string;
}