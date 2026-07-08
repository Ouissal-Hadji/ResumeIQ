import React from 'react';

interface ResumeIQLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showSlogan?: boolean;
  theme?: 'dark' | 'light' | 'auto';
  className?: string;
}

export default function ResumeIQLogo({
  size = 'md',
  showText = true,
  showSlogan = false,
  className = '',
}: ResumeIQLogoProps) {
  // Determine dimensions based on size prop
  const iconSizeClasses = {
    xs: 'w-8 h-8',
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-20 h-20 sm:w-24 sm:h-24',
    xl: 'w-28 h-28 sm:w-36 sm:h-36',
  };

  const textSizeClasses = {
    xs: 'text-sm',
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-3xl sm:text-4xl',
    xl: 'text-4xl sm:text-5xl lg:text-6xl',
  };

  const sloganSizeClasses = {
    xs: 'text-[7px]',
    sm: 'text-[9px]',
    md: 'text-xs',
    lg: 'text-sm sm:text-base',
    xl: 'text-base sm:text-lg lg:text-xl',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* High-Fidelity SVG Graphic of the Cyber Scanner Magnifying Glass */}
      <div className={`relative flex-shrink-0 ${iconSizeClasses[size]}`}>
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-[0_4px_12px_rgba(6,182,212,0.15)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* DEFINITIONS AND GRADIENTS */}
          <defs>
            {/* Hologram/Glass effect */}
            <radialGradient id="glassGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
              <stop offset="70%" stopColor="#0891b2" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.8" />
            </radialGradient>

            {/* Glowing cyan stroke */}
            <linearGradient id="cyanGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>

            {/* Indigo/Navy outer frame */}
            <linearGradient id="outerFrame" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="50%" stopColor="#312e81" />
              <stop offset="100%" stopColor="#4338ca" />
            </linearGradient>

            {/* Purple circuit trace */}
            <linearGradient id="purpleTrace" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d946ef" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>

            {/* Handle gradient */}
            <linearGradient id="handleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#4338ca" />
            </linearGradient>
          </defs>

          {/* BACKGROUND LENS SCAN GLOW */}
          <circle cx="95" cy="95" r="75" fill="url(#glassGlow)" />

          {/* INNER BLUEPRINT GRID & TECH PATTERNS */}
          {/* Circular Grid lines */}
          <circle cx="95" cy="95" r="68" stroke="#0ea5e9" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="95" cy="95" r="58" stroke="#22d3ee" strokeOpacity="0.1" strokeWidth="0.8" />
          <circle cx="95" cy="95" r="48" stroke="#06b6d4" strokeOpacity="0.08" strokeWidth="0.8" strokeDasharray="6 2" />

          {/* Circuit connection nodes overlay (tech style resembling the background details) */}
          <g stroke="#06b6d4" strokeOpacity="0.15" strokeWidth="1">
            <path d="M 52 50 L 72 38 L 92 38" />
            <path d="M 138 56 L 152 70" />
            <path d="M 38 120 L 48 110 L 48 90" />
            <path d="M 148 128 L 138 138" />
          </g>
          <g fill="#06b6d4" fillOpacity="0.4">
            <circle cx="52" cy="50" r="2.5" />
            <circle cx="92" cy="38" r="2" />
            <circle cx="152" cy="70" r="2.5" />
            <circle cx="38" cy="120" r="2.5" />
            <circle cx="148" cy="128" r="2.5" />
          </g>

          {/* LABELED METRICS & DATA BARS (95%, 80%, etc.) */}
          {/* Labeled arc areas */}
          <text x="75" y="44" fill="#22d3ee" fillOpacity="0.4" fontSize="6.5" fontWeight="900" fontFamily="monospace" letterSpacing="0.8">ANALYSIS</text>
          <text x="44" y="94" fill="#22d3ee" fillOpacity="0.4" fontSize="6.5" fontWeight="900" fontFamily="monospace" letterSpacing="0.8" transform="rotate(-90, 44, 94)">SKILLS</text>
          <text x="148" y="85" fill="#22d3ee" fillOpacity="0.4" fontSize="6.5" fontWeight="900" fontFamily="monospace" letterSpacing="0.8" transform="rotate(90, 148, 85)">EXPERIENCE</text>

          {/* Percentage bars in the bottom of the lens */}
          <text x="64" y="146" fill="#22d3ee" fillOpacity="0.75" fontSize="7" fontWeight="bold" fontFamily="monospace">95%</text>
          <line x1="84" y1="144" x2="134" y2="144" stroke="#1e1b4b" strokeWidth="3" strokeLinecap="round" />
          <line x1="84" y1="144" x2="130" y2="144" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" />

          <text x="64" y="157" fill="#22d3ee" fillOpacity="0.75" fontSize="7" fontWeight="bold" fontFamily="monospace">80%</text>
          <line x1="84" y1="155" x2="134" y2="155" stroke="#1e1b4b" strokeWidth="3" strokeLinecap="round" />
          <line x1="84" y1="155" x2="124" y2="155" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" opacity="0.8" />

          {/* OUTER THICK TECH SCANNING FRAME (DARK NAVY / INDIGO) */}
          <circle cx="95" cy="95" r="82" stroke="url(#outerFrame)" strokeWidth="10" />
          {/* Concentric bright glowing cyan/teal outline ring */}
          <circle cx="95" cy="95" r="87" stroke="url(#cyanGlow)" strokeWidth="2.5" strokeOpacity="0.85" />
          <circle cx="95" cy="95" r="77" stroke="#22d3ee" strokeWidth="1.2" strokeOpacity="0.6" />

          {/* CIRCUIT PATH PATTERNS ETCHED ON THE HEAVY COATING */}
          {/* Purple details on outer coat */}
          <path d="M 32 60 A 82 82 0 0 1 125 18" stroke="url(#purpleTrace)" strokeWidth="3" strokeLinecap="round" strokeDasharray="30 10 5 10" strokeOpacity="0.8" />
          <path d="M 160 135 A 82 82 0 0 0 174 72" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" strokeDasharray="18 12" strokeOpacity="0.8" />

          {/* INNER SCANNED "iQ" LETTERS RENDERED IN HIGH FIDELITY */}
          <g transform="translate(10, 0)">
            {/* The letter 'i' with dotted cap */}
            <circle cx="68" cy="74" r="5.5" fill="#22d3ee" />
            <rect x="62.5" y="86" width="11" height="34" rx="3.5" fill="#0d9488" />
            <rect x="62.5" y="86" width="11" height="34" rx="3.5" fill="url(#cyanGlow)" opacity="0.9" />

            {/* The letter 'Q' with sweeping tail */}
            {/* Q Round Outer Body */}
            <path
              d="M 115 100 C 115 113.8 103.8 125 90 125 C 76.2 125 65 113.8 65 100 C 65 86.2 76.2 75 90 75 C 103.8 75 115 86.2 115 100 Z"
              stroke="url(#cyanGlow)"
              strokeWidth="11"
              strokeLinecap="round"
            />
            {/* Q inner core light background */}
            <path
              d="M 111 100 C 111 111.6 101.6 121 90 121 C 78.4 121 69 111.6 69 100 C 69 88.4 78.4 79 90 79 C 101.6 79 111 88.4 111 100 Z"
              fill="#1e1b4b"
              fillOpacity="0.3"
            />
            {/* Q Sleek Tail extending outward through the magnifier frame */}
            <path
              d="M 103 113 L 126 136"
              stroke="url(#cyanGlow)"
              strokeWidth="12"
              strokeLinecap="round"
            />
            {/* Cyber detail on Q tail */}
            <circle cx="123" cy="133" r="3" fill="#ffffff" />
          </g>

          {/* MAGNIFYING CYBER MECHANICAL HANDLE (Extends at ~45 deg bottom-right) */}
          {/* Base Joint Attachment */}
          <path
            d="M 152 152 L 158 158"
            stroke="#1e3a8a"
            strokeWidth="16"
            strokeLinecap="round"
          />
          {/* Main Handle Body */}
          <path
            d="M 155 155 L 188 188"
            stroke="url(#handleGrad)"
            strokeWidth="14"
            strokeLinecap="round"
          />
          {/* Inner Light Core Tech Line of Handle */}
          <path
            d="M 158 158 L 184 184"
            stroke="#e0f2fe"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Diagonal circuit details on the handle */}
          <path
            d="M 172 172 L 180 172"
            stroke="#1e1b4b"
            strokeWidth="1.5"
            opacity="0.6"
          />
          <path
            d="M 178 178 L 183 183"
            stroke="#1e1b4b"
            strokeWidth="1.2"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* TYPOGRAPHY BLOCK */}
      {showText && (
        <div className="flex flex-col justify-center select-none text-left">
          {/* Main Logo Text "ResumeIQ" */}
          <h1 className={`${textSizeClasses[size]} font-black tracking-tight leading-none flex items-center`}>
            {/* "Resume" - Dark Blue / Slate */}
            <span className="text-slate-900 dark:text-zinc-100 transition-colors font-extrabold pr-0.5">
              Resume
            </span>
            {/* "IQ" - Styled Blue-Indigo-Purple Gradient */}
            <span className="bg-gradient-to-r from-teal-500 via-sky-500 to-indigo-600 bg-clip-text text-transparent dark:from-teal-400 dark:via-sky-400 dark:to-indigo-400 font-extrabold tracking-normal">
              IQ
            </span>
          </h1>

          {/* Slogans underneath if requested */}
          {showSlogan && (
            <div className="mt-1 space-y-0.5">
              <p
                className={`${sloganSizeClasses[size]} font-bold text-slate-800 dark:text-zinc-300 tracking-[0.14em] uppercase leading-tight font-sans transition-colors`}
              >
                TURN YOUR RESUME INTO INTERVIEWS
              </p>
              <p
                className={`${sloganSizeClasses[size]} text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600 dark:from-sky-400 dark:to-indigo-400 font-extrabold tracking-widest uppercase flex items-center gap-1.5 leading-none`}
              >
                POWERED BY ADVANCED AI
                <span className="inline-flex relative w-3.5 h-3.5 select-none align-middle ml-0.5">
                  <span className="absolute inset-y-0 inset-x-0 w-full h-full bg-sky-500/30 rounded-full animate-ping" />
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3.5 h-3.5 text-sky-600 dark:text-sky-450 inline-block"
                  >
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                    <circle cx="12" cy="12" r="3" className="fill-sky-500" />
                  </svg>
                </span>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
