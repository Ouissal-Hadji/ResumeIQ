import { ResumeAnalysis } from './types';

export const PRESET_SUGGESTIONS = [
  {
    id: "s1",
    before: "Responsible for writing clean code and fixing bugs.",
    after: "Architected and delivered 15+ highly scalable React components, reducing bug recurrence by 35% through robust TypeScript integration.",
    description: "Action Verbs & Quantified Accomplishments"
  },
  {
    id: "s2",
    before: "I worked on the customer dashboard page.",
    after: "Engineered responsive full-stack analytics dashboards utilizing Tailwind CSS and D3.js, increasing daily active user (DAU) engagement by 22%.",
    description: "Scope and Visual Metric Specifications"
  }
];

export function generateMockAnalysis(
  fileName: string,
  targetJobTitle: string = 'Software Engineer',
  experienceLevel: string = 'Mid Level',
  customText?: string
): ResumeAnalysis {
  return {
    id: `scan-${Date.now()}`,
    fileName: fileName,
    fileSize: '45 KB',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    targetJobTitle,
    experienceLevel,
    atsScore: 78,
    qualityScore: 82,
    jobMatchScore: 80,
    detectedSkills: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Git', 'Vite', 'REST APIs'],
    missingSkills: ['Docker', 'AWS (S3, EC2)', 'GraphQL', 'CI/CD Pipelines'],
    keywords: [
      { keyword: 'React 18+', found: true, importance: 'High' },
      { keyword: 'TypeScript Typings', found: true, importance: 'High' },
      { keyword: 'CI/CD Pipelines', found: false, importance: 'Medium' },
      { keyword: 'AWS Cloud Services', found: false, importance: 'Medium' },
      { keyword: 'Tailwind utility classes', found: true, importance: 'High' },
      { keyword: 'RESTful API Integration', found: true, importance: 'High' }
    ],
    strengths: [
      { title: 'Elegant Technical Vocabulary', description: 'Used excellent design patterns descriptions and clear standard nomenclature.' },
      { title: 'Pristine Document Layout', description: 'Proper segment hierarchy with legible whitespace margins, avoiding cluttered density.' }
    ],
    weaknesses: [
      { title: 'Under-quantified Metric Values', description: 'Several roles only list task activities without including measurable metrics, stats, or values.' },
      { title: 'Missing Key Cloud Technologies', description: 'Required microservices and cloud deployment terms are absent for standard modern standard specs.' }
    ],
    recommendations: [
      { issue: 'Absence of data parameters in listings', recommendation: 'Revise bullet points to reflect scale, team size, performance multipliers, and percentages.', priority: 'High', expectedImpact: '+15% ATS Screening Success' },
      { issue: 'Lack of containerization tools', recommendation: 'Explicitly state workflow familiarity with Docker, Kubernetes, or cloud deploy processes.', priority: 'Medium', expectedImpact: '+10% Job Match Score' }
    ],
    suggestions: PRESET_SUGGESTIONS
  };
}
