export interface KeywordMatch {
  keyword: string;
  found: boolean;
  importance: 'High' | 'Medium' | 'Low';
}

export interface BulletStrength {
  title: string;
  description: string;
}

export interface BulletWeakness {
  title: string;
  description: string;
}

export interface SectionRecommendation {
  issue: string;
  recommendation: string;
  priority: 'High' | 'Medium' | 'Low';
  expectedImpact: string;
}

export interface OptimizationSuggestion {
  id: string;
  before: string;
  after: string;
  description: string;
}

export interface ResumeAnalysis {
  id: string;
  fileName: string;
  fileSize: string;
  date: string;
  targetJobTitle: string;
  experienceLevel: string;
  atsScore: number;
  qualityScore: number;
  jobMatchScore: number;
  detectedSkills: string[];
  missingSkills: string[];
  keywords: KeywordMatch[];
  strengths: BulletStrength[];
  weaknesses: BulletWeakness[];
  recommendations: SectionRecommendation[];
  suggestions: OptimizationSuggestion[];
}

export interface AnalysisStage {
  id: string;
  label: string;
  status: 'idle' | 'running' | 'completed';
  duration: number;
}
