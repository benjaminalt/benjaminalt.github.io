export const SITE = {
  url: 'https://benjaminalt.github.io',
  title: 'Benjamin Alt',
  tagline: 'Roboticist · Safe Physical AI',
  description: 'Roboticist working on safe physical AI. Cofounder of AICOR Solutions.',
  author: { first: 'Benjamin', last: 'Alt' },
  postsPerPage: 5,
} as const;

/** Tags surfaced in the UI. All tags still generate archive pages. */
export const DISPLAY_TAGS = [
  'robotics',
  'robot-learning',
  'ai-safety',
  'physical-ai',
  'open-science',
  'talk',
  'paper',
  'personal',
] as const;

export const SOCIAL = {
  email: ['benjamin_alt', 'outlook.com'] as const, // assembled at runtime
  github: 'https://github.com/benjaminalt',
  linkedin: 'https://www.linkedin.com/in/benjamin-alt',
  scholar: 'https://scholar.google.com/citations?user=GJy9_HAAAAAJ',
  orcid: 'https://orcid.org/0009-0002-8790-1671',
} as const;

export const NAV = [
  { href: '/blog/', label: 'Writing' },
  { href: '/publications/', label: 'Research' },
  { href: '/cv/', label: 'CV' },
] as const;
