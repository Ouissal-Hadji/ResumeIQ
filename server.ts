import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

// Enable large limits for file uploads/paste payloads
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

// Lazy initializer for GoogleGenAI to ensure it never crashes on load if the secret is temporarily missing
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error('GEMINI_API_KEY environment variable is required but missing.');
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// API Health Endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Real Resume Analysis with Gemini
app.post('/api/analyze', async (req: Request, res: Response) => {
  try {
    const { file, pasteResumeText, targetJob, experienceLevel } = req.body;

    if (!file && !pasteResumeText) {
      return res.status(400).json({ error: 'Missing resume: please upload a file or paste your resume content!' });
    }

    const jobTitle = targetJob || 'Software Engineer';
    const expLvl = experienceLevel || 'Mid Level';

    const currentDateStr = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    const parts: any[] = [];

    // System configuration prompt
    const systemPrompt = `You are a premier, elite recruitment reviewer and professional ATS designer.
Your goal is to parse and evaluate the candidate's resume content according to '${jobTitle}' role expectations at standard '${expLvl}' proficiency levels.
Perform a genuine, meticulous check. Avoid fictional placeholders. Follow this strict schema:
- 'atsScore': integer from 0 to 100 assessing structural, parsing, and keyword density compatibility for automated tracking.
- 'qualityScore': integer from 0 to 100 evaluating visual styling, margins, wording elegance, and professional execution.
- 'jobMatchScore': integer from 0 to 100 rating role-specific competency alignment.
- 'detectedSkills': 5-15 genuine tools, systems, or methodologies parsed directly from the CV text.
- 'missingSkills': 3-6 critical modern engineering or operational tools standard to a '${jobTitle}' at '${expLvl}' level that are absent or sparse in this CV.
- 'keywords': EXACTLY 6-8 critical terms and concepts. For each, indicate 'found' (boolean) and 'importance' ('High', 'Medium', or 'Low').
- 'strengths': 2-4 real formatting or description high points, with title and detailed description.
- 'weaknesses': 2-4 real weaknesses, formatting flaws, or text issues in the candidate's actual text.
- 'recommendations': 2-3 specific, high-impact step-by-step actions (priority, expected impact, and core issue described).
- 'suggestions': 3-5 real before-and-after rewrite suggestions directly editing their bad sentences. The 'after' rewrite MUST show premium action verbs and quantifiable KPIs (e.g. percentages, values, frequencies).

CRITICAL REAL-TIME CALENDAR CONTEXT:
Today's date is ${currentDateStr} (i.e., June 2026).
- ANY certification, experience entry, degree, or document milestone obtained on, in, or before June 2026 (such as "February 2026", "2/2026", "2026", "2025") must be treated as PRESENT or PAST milestones.
- DO NOT flag certifications dated in 2026 (or 2/2026) as "in the future" or "futuristic" – we are already in the year 2026 (specifically June 2026).

Respond strictly with valid JSON. Do not wrap in markdown unless requested, but responseMimeType is json so send pure raw JSON.`;

    if (file && file.data) {
      let base64Contents = file.data;
      if (base64Contents.includes(';base64,')) {
        base64Contents = base64Contents.split(';base64,').pop();
      }
      parts.push({
        inlineData: {
          mimeType: file.mimeType || 'application/pdf',
          data: base64Contents
        }
      });
    }

    parts.push({
      text: `Review the attached resume and target requirements:
Target Job: ${jobTitle}
Experience Level: ${expLvl}
${pasteResumeText ? `Pasted Plain Text Resume:\n${pasteResumeText}\n` : 'Find the resume in the attached document.'}`
    });

    const client = getAIClient();
    const response = await client.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: parts,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            atsScore: { type: Type.INTEGER },
            qualityScore: { type: Type.INTEGER },
            jobMatchScore: { type: Type.INTEGER },
            detectedSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
            missingSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
            keywords: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  keyword: { type: Type.STRING },
                  found: { type: Type.BOOLEAN },
                  importance: { type: Type.STRING }
                },
                required: ['keyword', 'found', 'importance']
              }
            },
            strengths: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING }
                },
                required: ['title', 'description']
              }
            },
            weaknesses: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING }
                },
                required: ['title', 'description']
              }
            },
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  issue: { type: Type.STRING },
                  recommendation: { type: Type.STRING },
                  priority: { type: Type.STRING },
                  expectedImpact: { type: Type.STRING }
                },
                required: ['issue', 'recommendation', 'priority', 'expectedImpact']
              }
            },
            suggestions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  before: { type: Type.STRING },
                  after: { type: Type.STRING },
                  description: { type: Type.STRING }
                },
                required: ['id', 'before', 'after', 'description']
              }
            }
          },
          required: [
            'atsScore', 'qualityScore', 'jobMatchScore', 'detectedSkills', 'missingSkills',
            'keywords', 'strengths', 'weaknesses', 'recommendations', 'suggestions'
          ]
        }
      }
    });

    const contentText = response.text;
    if (!contentText) {
      throw new Error('Received empty response from artificial intelligence model');
    }

    const parsedData = JSON.parse(contentText);

    const result = {
      id: `scan-${Date.now()}`,
      fileName: file ? file.name : `Resume_${jobTitle.replace(/\s+/g, '_')}_AI.pdf`,
      fileSize: file ? file.size : `${(pasteResumeText.length / 1024).toFixed(1)} KB`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      targetJobTitle: jobTitle,
      experienceLevel: expLvl,
      ...parsedData
    };

    return res.json(result);
  } catch (err: any) {
    console.error('API Server Error:', err);
    return res.status(500).json({ error: err.message || 'An internal server error occurred while reviewing resume' });
  }
});

// Vite Middleware mounting for Asset Routing
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Express custom server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
