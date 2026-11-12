import { useEffect, useMemo, useState, type MouseEvent, type ReactNode } from 'react'
import { PdfViewer } from './PdfViewer'
import { isAssetPdf, viewerPath } from './pdf'

type RoutePath = '/' | '/work/' | '/proof/' | '/research/' | '/view/'
type Theme = 'light' | 'dark'

type LinkItem = {
  label: string
  href: string
}

type RowLink = {
  label: string
  href: string
}

type RowItem = {
  title: string
  description: string
  meta?: string
  links?: RowLink[]
}

type TimelineGroup = {
  label: string
  eyebrow?: string
  items: {
    text: string
    links?: RowLink[]
  }[]
}

const routes: Record<RoutePath, { label: string; title: string; description: string }> = {
  '/': {
    label: 'Home',
    title: 'Sahil Shahaji Kadam',
    description:
      'Sahil Shahaji Kadam is a Mumbai AI-first builder, JS Community India community builder, and author of an ASIFA-awarded agentic farming paper.',
  },
  '/work/': {
    label: 'Work',
    title: 'Work - Sahil Shahaji Kadam',
    description: 'Experience, community work, and selected public projects by Sahil Shahaji Kadam.',
  },
  '/proof/': {
    label: 'Proof',
    title: 'Proof - Sahil Shahaji Kadam',
    description: 'Skills, education, certifications, achievements, talks, and links for Sahil Shahaji Kadam.',
  },
  '/research/': {
    label: 'Research',
    title: 'Research - Sahil Shahaji Kadam',
    description:
      'PAMC: Autonomous Agentic Systems for Hyper-Personalized Microgreens Cultivation, ASIFA Best External Paper Award.',
  },
  '/view/': {
    label: 'Document',
    title: 'Document - Sahil Shahaji Kadam',
    description: 'PDF viewer with download and share.',
  },
}

const profileLinks: LinkItem[] = [
  { label: 'Email', href: 'mailto:kadamsahil2511@gmail.com' },
  { label: 'WhatsApp', href: 'https://wa.me/917697935839' },
  { label: 'Call', href: 'tel:+917697935839' },
  { label: 'GitHub', href: 'https://github.com/kadamsahil2511' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kadamsahil2509/' },
  { label: 'Resume', href: '/assets/Sahil_Shahaji_Kadam_CV.pdf' },
]

const experience: RowItem[] = [
  {
    title: 'Full Stack Developer, Noun Asia',
    description:
      'Built full-stack product systems for the MacD project and three other B2B products, owning features from workflow design and implementation through production debugging and delivery.',
    meta: '8 May 2026 - Nov 2026',
  },
  {
    title: 'Community Builder, JS Community India',
    description:
      'Building with JS Community India since Apr 2026 across events, demos, community ops, and the beautiful mess where AI workflows meet JavaScript people.',
    meta: 'Apr 2026 - Present',
  },
  {
    title: 'Software Development Engineer Intern, LetsUpgrade',
    description:
      'Led the video generation module for an AI-integrated LMS, cut generation time from 15 minutes to 3 minutes, and moved heavy rendering into async serverless jobs so the app could stop sweating in public.',
    meta: '4 Aug 2025 - 7 May 2026',
    links: [{ label: 'Company', href: 'https://letsupgrade.in/' }],
  },
  {
    title: 'Project Intern, LetsUpgrade',
    description:
      'Built AI-driven automation tools for data gathering and internal workflows, making processes 90% faster and reducing manual task time by 6x. Spreadsheet suffering reduced. Society advanced.',
    meta: 'Dec 2024; Feb - Mar 2025',
  },
]

const projects: RowItem[] = [
  {
    title: 'P1 Assistant',
    description:
      'Self-hosted WhatsApp AI assistant with Mastra workflows, FastAPI retrieval, Qdrant search, source citations, and per-user memory. Guest chat works without sign-in.',
    meta: 'TypeScript, Python, Mastra, FastAPI, Qdrant, Docker',
    links: [
      { label: 'Live', href: 'https://p1.kadamsahil.com' },
      { label: 'Guest chat', href: 'https://p1.kadamsahil.com#try' },
      { label: 'Repository', href: 'https://github.com/kadamsahil2511/p1' },
    ],
  },
  {
    title: 'PAMC microgreens paper',
    description:
      'ASIFA Best External Paper. Three-layer agentic architecture where an LLM supervisor coordinates IoT perception, vision, and actuation for plant-level urban farming.',
    meta: 'Jan 2026 · with R. Mishra and K. Solanki',
    links: [
      { label: 'Paper, video, slides', href: '/research/' },
      {
        label: 'View paper',
        href: '/assets/research/pamc-paper.pdf',
      },
    ],
  },
  {
    title: 'PageTrace',
    description:
      'Offline PDF RAG with page-aware chunking, FAISS and Chroma paths, cross-encoder reranking, and tests for citation context and index repair.',
    meta: 'Python, FAISS, Chroma, Nomic, Ollama',
    links: [{ label: 'Repository', href: 'https://github.com/kadamsahil2511/pagetrace' }],
  },
  {
    title: 'Persistent Memory Assistant',
    description:
      'Local Gemini chat that stores memories as fact, instruction, transient, or secret in Mem0 and Qdrant, with a facts vs instructions UI and file RAG.',
    meta: 'Python, FastAPI, Mem0, Qdrant, React',
    links: [{ label: 'Repository', href: 'https://github.com/kadamsahil2511/memory-assistant' }],
  },
  {
    title: 'SuperUserz F2',
    description:
      'Financial digital twin: 32-dim behavioral DNA, versioned user state, Monte Carlo stress tests, adaptive LLM interview, contradiction checks, and proactive interventions.',
    meta: 'FastAPI, React, React Native, PostgreSQL, Redis',
  },
  {
    title: 'SuperUserz-Inference',
    description:
      'AI video generation platform for turning training material into source-grounded explainer videos with review flows and programmatic rendering.',
    meta: 'React, TypeScript, Node, MongoDB, Remotion, Docker',
    links: [
      { label: 'Repository', href: 'https://github.com/kadamsahil2511/SuperUserz-Inference' },
      { label: 'Demo', href: 'https://super-userz-inference.vercel.app' },
    ],
  },
  {
    title: 'nudge',
    description:
      'Calendar-first monthly budget planner with integer money handling, local-first storage, and a Supabase-ready persistence contract.',
    meta: 'Next.js, TypeScript, Supabase-ready',
    links: [
      { label: 'Repository', href: 'https://github.com/kadamsahil2511/nudge' },
      { label: 'Demo', href: 'https://nudge-tau-nine.vercel.app' },
    ],
  },
  {
    title: 'ClarifyAI-MumbAI-hacks-2025',
    description:
      'Agentic fact-checking prototype for text, URLs, images, and current-page checks, returning verdicts with confidence, issues, sources, and recommendations.',
    meta: 'Python, Flask, Gemini, JavaScript',
    links: [
      { label: 'Repository', href: 'https://github.com/kadamsahil2511/ClarifyAI-MumbAI-hacks-2025' },
      { label: 'Demo', href: 'https://clarify-ai-react-app.vercel.app' },
    ],
  },
  {
    title: 'DevOps-Sem4-Submission',
    description:
      'Customs and border-processing operations console with role-based login, audit timelines, persistent data, CI checks, and an EC2 deployment flow.',
    meta: 'React, Express, Prisma, SQLite, EC2, GitHub Actions',
    links: [{ label: 'Repository', href: 'https://github.com/kadamsahil2511/DevOps-Sem4-Submission' }],
  },
  {
    title: 'AWS-Sem4-Submission',
    description:
      'AWS semester submission focused on cloud deployment practice and documented infrastructure setup.',
    meta: 'AWS, cloud deployment',
    links: [{ label: 'Repository', href: 'https://github.com/kadamsahil2511/AWS-Sem4-Submission' }],
  },
  {
    title: 'Amazon_Review_sentiment-analyser',
    description:
      'NLP project for classifying product review sentiment and extracting business signals around demand, pricing, and product risk.',
    meta: 'Jupyter, scikit-learn, TF-IDF, Logistic Regression',
    links: [
      { label: 'Repository', href: 'https://github.com/kadamsahil2511/Amazon_Review_sentiment-analyser' },
      { label: 'Demo', href: 'https://amazon-review-sentiment-analyser.vercel.app' },
    ],
  },
  {
    title: 'Ace-by-ISU',
    description:
      'AI study companion and exam preparation platform with a simulated interviewer for Viva-Voce practice.',
    meta: 'TypeScript, generative AI',
    links: [
      { label: 'Repository', href: 'https://github.com/kadamsahil2511/Ace-by-ISU' },
      { label: 'Demo', href: 'https://ace-by-isu.vercel.app' },
    ],
  },
]

const skills: RowItem[] = [
  { title: 'Languages', description: 'Python, JavaScript, TypeScript, C++, Java' },
  {
    title: 'Frameworks',
    description: 'Next.js, React.js, Node.js, Express.js, Remotion, Trigger.dev, Farcaster Mini Apps',
  },
  {
    title: 'Cloud and DevOps',
    description: 'AWS Lambda, S3, EC2, RDS, Docker, Apache, Nginx, Linux, CI/CD, Git',
  },
  {
    title: 'AI/ML',
    description: 'RAG, vector databases, prompt engineering, LangChain, OpenAI APIs, Gemini APIs, NLP',
  },
  { title: 'Databases', description: 'MongoDB, MySQL, PostgreSQL, SQLite, Prisma, Firestore' },
]

const certifications: RowItem[] = [
  {
    title: 'AWS Cloud Practitioner Essentials',
    description: 'AWS Training & Certification completion certificate.',
    meta: 'Completed 3 Dec 2025',
    links: [
      {
        label: 'View certificate',
        href: '/assets/Proof%20of%20work/certifications/2025-12-aws-cloud-practitioner-essentials/certificate.pdf',
      },
    ],
  },
]

const achievements: RowItem[] = [
  {
    title: 'Hyperthon India Hackathon, Mumbai Edition',
    description: '1st Prize, INR 25,000.',
    meta: 'Oct 2025',
  },
  {
    title: 'Hyperthon India, Bengaluru Round',
    description: 'National Finalist, selected among top regional winners.',
    meta: 'Oct 2025',
  },
  {
    title: 'International ASIFA Student Research Paper Conference',
    description: 'Best External Paper Award for the PAMC microgreens cultivation paper.',
    meta: 'Jan 2026',
    links: [
      { label: 'Paper', href: '/assets/research/pamc-paper.pdf' },
      { label: 'Research page', href: '/research/' },
    ],
  },
  { title: 'Imagine Hackathon at PANIIT', description: 'Top 30 teams out of 15,000.', meta: 'Jan 2025' },
  { title: 'Elevator Pitch Competition, ITM Business School', description: '1st Place.', meta: 'Oct 2024' },
]

const talks: RowItem[] = [
  {
    title: 'Mumbai Hacks 2025',
    description:
      "Presented to 500+ attendees at the global project launch of MIT's Nanda Project as part of a top-three team.",
    meta: 'Nov 2025',
  },
  {
    title: 'Ideation to Prototype',
    description:
      'Guest speaker for Singularity Hackathon, delivering a session on rapid prototyping to engineering students.',
    meta: 'Jan 2026',
  },
]

const workTimeline: TimelineGroup[] = [
  {
    label: 'Nov 2026',
    eyebrow: 'left',
    items: [{ text: 'Left Noun Asia after shipping full-stack product work across MacD and other B2B clients.' }],
  },
  {
    label: '8 May 2026',
    eyebrow: 'full-time job',
    items: [
      {
        text: 'Joined Noun Asia as a Full Stack Developer and began shipping on the MacD project.',
        links: [
          {
            label: 'Offer letter',
            href: '/assets/Proof%20of%20work/experience/noun-asia-full-stack-developer/2026-05-offer-letter.pdf',
          },
        ],
      },
    ],
  },
  {
    label: '7 May 2026',
    eyebrow: 'completed',
    items: [
      {
        text: 'Completed the LetsUpgrade SDE internship; the final letter confirms the full 4 Aug 2025 - 7 May 2026 tenure.',
        links: [
          {
            label: 'Renewals and completion letter',
            href: '/assets/Proof%20of%20work/experience/letsupgrade-sde-internship/2025-11-renewals-and-completion.pdf',
          },
        ],
      },
    ],
  },
  {
    label: 'Apr 2026',
    eyebrow: 'community',
    items: [{ text: 'Joined JS Community India work: events, demos, async planning, and JavaScript lore.' }],
  },
  {
    label: 'Mar 2026',
    eyebrow: 'renewed',
    items: [
      {
        text: 'SDE internship renewed again for the March-May term.',
        links: [
          {
            label: 'Renewal letter',
            href: '/assets/Proof%20of%20work/experience/letsupgrade-sde-internship/2025-11-renewals-and-completion.pdf',
          },
        ],
      },
    ],
  },
  {
    label: 'Dec 2025',
    eyebrow: 'renewed term',
    items: [
      {
        text: 'Began the renewed SDE internship term, continuing through February 2026.',
        links: [
          {
            label: 'Renewal letter',
            href: '/assets/Proof%20of%20work/experience/letsupgrade-sde-internship/2025-11-renewals-and-completion.pdf',
          },
        ],
      },
    ],
  },
  {
    label: 'Nov 2025',
    eyebrow: 'renewal',
    items: [
      {
        text: 'Renewal issued for the next Software Development & Engineering internship term.',
        links: [
          {
            label: 'Renewal documents',
            href: '/assets/Proof%20of%20work/experience/letsupgrade-sde-internship/2025-11-renewals-and-completion.pdf',
          },
        ],
      },
    ],
  },
  {
    label: 'Oct 2025',
    eyebrow: 'completed',
    items: [
      {
        text: 'Completed the first extended SDE internship term on 31 October.',
        links: [
          {
            label: 'Offer, extension, and completion letter',
            href: '/assets/Proof%20of%20work/experience/letsupgrade-sde-internship/2025-08-offer-extension-and-completion.pdf',
          },
        ],
      },
    ],
  },
  {
    label: 'Sep 2025',
    eyebrow: 'extended',
    items: [
      {
        text: 'SDE internship extended through 31 October.',
        links: [
          {
            label: 'Extension letter',
            href: '/assets/Proof%20of%20work/experience/letsupgrade-sde-internship/2025-08-offer-extension-and-completion.pdf',
          },
        ],
      },
    ],
  },
  {
    label: 'Aug 2025',
    eyebrow: 'internship',
    items: [
      {
        text: 'Moved into Software Development & Engineering at LetsUpgrade and started owning the LMS video generation module.',
        links: [
          {
            label: 'Internship offer',
            href: '/assets/Proof%20of%20work/experience/letsupgrade-sde-internship/2025-08-offer-extension-and-completion.pdf',
          },
        ],
      },
    ],
  },
  {
    label: 'Mar 2025',
    eyebrow: 'completed',
    items: [
      {
        text: 'Completed the renewed LetsUpgrade Project Internship on 1 March.',
        links: [
          {
            label: 'Offer and completion letter',
            href: '/assets/Proof%20of%20work/experience/letsupgrade-project-internship/2025-02-renewal-and-completion.pdf',
          },
        ],
      },
    ],
  },
  {
    label: 'Feb 2025',
    eyebrow: 'renewed',
    items: [
      {
        text: 'Project Internship renewed for 1 February - 1 March.',
        links: [
          {
            label: 'Renewal offer',
            href: '/assets/Proof%20of%20work/experience/letsupgrade-project-internship/2025-02-renewal-and-completion.pdf',
          },
        ],
      },
    ],
  },
  {
    label: 'Dec 2024',
    eyebrow: 'automation',
    items: [
      {
        text: 'Started and completed the initial LetsUpgrade Project Internship, focused on AI workflow automation.',
        links: [
          {
            label: 'Offer and completion letter',
            href: '/assets/Proof%20of%20work/experience/letsupgrade-project-internship/2024-12-offer-and-completion.pdf',
          },
        ],
      },
    ],
  },
]

const proofTimeline: TimelineGroup[] = [
  {
    label: 'Aug 2026',
    eyebrow: 'mentoring',
    items: [
      {
        text: "Mentored B.Tech CSE students at IdeaFrame'26.",
        links: [
          {
            label: 'Mentorship certificate',
            href: '/assets/Proof%20of%20work/talks-and-mentoring/2026-08-ideaframe-mentoring/certificate.pdf',
          },
          {
            label: 'Appreciation letter',
            href: '/assets/Proof%20of%20work/talks-and-mentoring/2026-08-ideaframe-mentoring/appreciation-letter.pdf',
          },
        ],
      },
    ],
  },
  {
    label: 'May 2026',
    eyebrow: 'peer mentoring',
    items: [
      {
        text: 'Led the peer-mentoring session “SDLC: How Not to Write Slop Code.”',
        links: [
          {
            label: 'Peer mentorship certificate',
            href: '/assets/Proof%20of%20work/talks-and-mentoring/2026-05-sdlc-peer-mentoring/certificate.pdf',
          },
          {
            label: 'Appreciation letter',
            href: '/assets/Proof%20of%20work/talks-and-mentoring/2026-05-sdlc-peer-mentoring/appreciation-letter.pdf',
          },
        ],
      },
    ],
  },
  {
    label: 'Jan 2026',
    eyebrow: 'award & talk',
    items: [
      {
        text: 'Best External Paper Award at the International ASIFA Student Research Paper Conference.',
        links: [
          {
            label: 'Award certificate',
            href: '/assets/Proof%20of%20work/achievements/2026-01-asifa-research/certificate.pdf',
          },
          { label: 'Paper', href: '/assets/research/pamc-paper.pdf' },
          { label: 'Video', href: '/research/' },
        ],
      },
      {
        text: 'Guest speaker for “Idea to Prototype” at K.C. College of Engineering and Management Studies and Research.',
        links: [
          {
            label: 'Appreciation letter',
            href: '/assets/Proof%20of%20work/talks-and-mentoring/2026-01-idea-to-prototype/appreciation-letter.pdf',
          },
        ],
      },
    ],
  },
  {
    label: 'Nov 2025',
    eyebrow: 'presentation',
    items: [{ text: "Presented at Mumbai Hacks during the global launch of MIT's Nanda Project." }],
  },
  {
    label: 'Oct 2025',
    eyebrow: 'hackathons',
    items: [
      { text: 'Won 1st Prize at Hyperthon India, Mumbai Edition.' },
      { text: 'Competed as a National Finalist at the Hyperthon India Bengaluru round.' },
    ],
  },
  {
    label: 'Jan 2025',
    eyebrow: 'hackathon',
    items: [{ text: 'Placed in the top 30 of 15,000 teams at Imagine Hackathon, PANIIT.' }],
  },
  {
    label: 'Oct 2024',
    eyebrow: 'competition',
    items: [
      {
        text: 'Won 1st Place in the Elevator Pitch Competition at E-FEST 2024.',
        links: [
          {
            label: 'Achievement certificate',
            href: '/assets/Proof%20of%20work/achievements/2024-10-elevator-pitch/certificate.pdf',
          },
        ],
      },
    ],
  },
]

const themeStorageKey = 'sahil-theme'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'dark'
  }

  return window.localStorage.getItem(themeStorageKey) === 'light' ? 'light' : 'dark'
}

function normalizePath(pathname: string): RoutePath {
  if (pathname.startsWith('/work')) {
    return '/work/'
  }

  if (pathname.startsWith('/proof')) {
    return '/proof/'
  }

  if (pathname.startsWith('/research')) {
    return '/research/'
  }

  if (pathname.startsWith('/view')) {
    return '/view/'
  }

  return '/'
}

function isExternalLink(href: string) {
  return href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')
}

function resolveHref(href: string) {
  return isAssetPdf(href) ? viewerPath(href) : href
}

function useRoute() {
  const [path, setPath] = useState<RoutePath>(() => normalizePath(window.location.pathname))
  const [search, setSearch] = useState(() => window.location.search)

  useEffect(() => {
    const onPopState = () => {
      setPath(normalizePath(window.location.pathname))
      setSearch(window.location.search)
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = (nextPath: string) => {
    window.history.pushState(null, '', nextPath)
    setPath(normalizePath(new URL(nextPath, window.location.origin).pathname))
    setSearch(new URL(nextPath, window.location.origin).search)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return { path, search, navigate }
}

function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem(themeStorageKey, theme)
  }, [theme])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== 'l' || !event.shiftKey || (!event.metaKey && !event.ctrlKey)) {
        return
      }

      event.preventDefault()
      setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return theme
}

function Header({ path, navigate }: { path: RoutePath; navigate: (path: string) => void }) {
  return (
    <header className="flex items-start justify-between gap-6">
      <a
        href="/"
        onClick={(event) => {
          event.preventDefault()
          navigate('/')
        }}
        className="text-lg font-bold leading-5 text-[var(--text)] no-underline"
      >
        Sahil Shahaji Kadam
      </a>

      <nav className="flex shrink-0 gap-4 pt-[3px] text-xs leading-4 sm:gap-6" aria-label="Primary navigation">
        {(['/work/', '/proof/', '/research/'] as RoutePath[]).map((routePath) => (
          <a
            key={routePath}
            href={routePath}
            aria-current={path === routePath ? 'page' : undefined}
            onClick={(event) => {
              event.preventDefault()
              navigate(routePath)
            }}
            className={`no-underline hover:text-[var(--text)] ${
              path === routePath ? 'text-[var(--text)]' : 'text-[var(--muted)]'
            }`}
          >
            {routes[routePath].label}
          </a>
        ))}
        <SiteLink href="/assets/Sahil_Shahaji_Kadam_CV.pdf" navigate={navigate} className="text-[var(--muted)] no-underline hover:text-[var(--text)]">
          Resume
        </SiteLink>
      </nav>
    </header>
  )
}

function SiteLink({
  href,
  children,
  className,
  navigate,
}: {
  href: string
  children: ReactNode
  className: string
  navigate: (path: string) => void
}) {
  const to = resolveHref(href)
  const external = isExternalLink(to)

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (external) {
      return
    }
    event.preventDefault()
    navigate(to)
  }

  return (
    <a
      href={to}
      target={external && !href.startsWith('mailto:') && !href.startsWith('tel:') ? '_blank' : undefined}
      rel={external && !href.startsWith('mailto:') && !href.startsWith('tel:') ? 'noreferrer' : undefined}
      className={className}
      onClick={onClick}
    >
      {children}
    </a>
  )
}

function LinkGrid({ links, navigate }: { links: LinkItem[]; navigate: (path: string) => void }) {
  return (
    <nav className="grid grid-cols-2 gap-x-8 gap-y-[10px] text-xs leading-4" aria-label="Profile links">
      {links.map(({ label, href }) => (
        <SiteLink
          key={href}
          href={href}
          navigate={navigate}
          className="text-[var(--muted)] no-underline hover:text-[var(--text)]"
        >
          {label}
        </SiteLink>
      ))}
    </nav>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="grid gap-4" aria-labelledby={`${title.toLowerCase().replaceAll(' ', '-')}-title`}>
      <h2 id={`${title.toLowerCase().replaceAll(' ', '-')}-title`} className="text-sm font-bold leading-5 text-[var(--text)]">
        {title}
      </h2>
      {children}
    </section>
  )
}

function Rows({ items, navigate }: { items: RowItem[]; navigate: (path: string) => void }) {
  return (
    <div className="grid gap-5">
      {items.map((item) => (
        <article key={item.title} className="grid gap-1">
          <div className="min-w-0">
            <h3 className="text-sm font-bold leading-5 text-[var(--text)]">{item.title}</h3>
            <p className="text-sm leading-5 text-[var(--text)]">{item.description}</p>
            {item.links ? (
              <p className="mt-1 flex flex-wrap gap-4 text-xs leading-4">
                {item.links.map((link) => (
                  <SiteLink
                    key={link.href}
                    href={link.href}
                    navigate={navigate}
                    className="text-[var(--muted)] no-underline hover:text-[var(--text)]"
                  >
                    {link.label}
                  </SiteLink>
                ))}
              </p>
            ) : null}
          </div>
          {item.meta ? <p className="text-xs leading-4 text-[var(--muted)]">{item.meta}</p> : null}
        </article>
      ))}
    </div>
  )
}

function MonthTimeline({ groups, navigate }: { groups: TimelineGroup[]; navigate: (path: string) => void }) {
  return (
    <div className="grid gap-5">
      {groups.map((group) => (
        <article key={group.label} className="grid gap-1">
          <div className="min-w-0">
            <p className="text-sm font-bold leading-5 text-[var(--text)]">{group.label}</p>
            {group.eyebrow ? <p className="text-xs leading-4 capitalize text-[var(--muted)]">{group.eyebrow}</p> : null}
          </div>
          <ul className="grid gap-1 text-sm leading-5 text-[var(--text)]">
            {group.items.map((item) => (
              <li key={item.text} className="grid gap-1">
                <span>{item.text}</span>
                {item.links ? (
                  <span className="flex flex-wrap gap-4 text-xs leading-4">
                    {item.links.map((link) => (
                      <SiteLink
                        key={link.href}
                        href={link.href}
                        navigate={navigate}
                        className="text-[var(--muted)] no-underline hover:text-[var(--text)]"
                      >
                        {link.label}
                      </SiteLink>
                    ))}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  )
}

function HomePage({ navigate }: { navigate: (path: string) => void }) {
  return (
    <main className="grid gap-12">
      <section className="grid gap-12">
        <p className="text-sm leading-5 text-[var(--text)]">
          I build AI-first product workflows, React/Next systems, and research prototypes from Mumbai. I spent
          May–Nov 2026 shipping full-stack product systems at Noun Asia, including MacD. I also build with JS
          Community India, and I ship agents people can try — including{' '}
          <SiteLink href="https://p1.kadamsahil.com#try" navigate={navigate} className="text-[var(--text)] underline">
            P1 guest chat
          </SiteLink>{' '}
          and an{' '}
          <SiteLink href="/research/" navigate={navigate} className="text-[var(--text)] underline">
            ASIFA-awarded paper
          </SiteLink>{' '}
          on agentic microgreens cultivation.
        </p>

        <LinkGrid links={profileLinks} navigate={navigate} />
      </section>
    </main>
  )
}

function WorkPage({ navigate }: { navigate: (path: string) => void }) {
  return (
    <main className="grid gap-10">
      <div className="grid gap-4">
        <h1 className="text-lg font-bold leading-5 text-[var(--text)]">Work</h1>
        <p className="text-sm leading-5 text-[var(--text)]">
          I&apos;ve worked across AI video generation, retrieval and memory prototypes, workflow automation,
          community work, and public side projects that escaped localhost with receipts.
        </p>
      </div>

      <Section title="Timeline">
        <MonthTimeline groups={workTimeline} navigate={navigate} />
      </Section>

      <Section title="Experience">
        <Rows items={experience} navigate={navigate} />
      </Section>

      <Section title="Projects">
        <Rows items={projects} navigate={navigate} />
      </Section>
    </main>
  )
}

function ProofPage({ navigate }: { navigate: (path: string) => void }) {
  const education = useMemo<RowItem[]>(
    () => [
      {
        title: 'ITM Skills University',
        description: 'B.Tech in Computer Science Engineering. Current CGPA: 9.5.',
        meta: 'July 2024 - Aug 2028',
      },
    ],
    [],
  )

  return (
    <main className="grid gap-10">
      <div className="grid gap-4">
        <h1 className="text-lg font-bold leading-5 text-[var(--text)]">Proof</h1>
        <p className="text-sm leading-5 text-[var(--text)]">
          This is the receipts page: skills, education, certifications, wins, talks, and links for anyone
          trying to verify that I do, in fact, touch grass and ship software.
        </p>
      </div>

      <Section title="Timeline">
        <MonthTimeline groups={proofTimeline} navigate={navigate} />
      </Section>

      <Section title="Skills">
        <Rows items={skills} navigate={navigate} />
      </Section>

      <Section title="Education">
        <Rows items={education} navigate={navigate} />
      </Section>

      <Section title="Certifications">
        <Rows items={certifications} navigate={navigate} />
      </Section>

      <Section title="Achievements">
        <Rows items={achievements} navigate={navigate} />
      </Section>

      <Section title="Talks">
        <Rows items={talks} navigate={navigate} />
      </Section>

      <Section title="Links">
        <LinkGrid links={profileLinks} navigate={navigate} />
      </Section>
    </main>
  )
}

function ResearchPage({ navigate }: { navigate: (path: string) => void }) {
  return (
    <main className="grid gap-10">
      <div className="grid gap-4">
        <h1 className="text-lg font-bold leading-5 text-[var(--text)]">
          Autonomous Agentic Systems for Hyper-Personalized Microgreens Cultivation
        </h1>
        <p className="text-xs leading-4 text-[var(--muted)]">
          ASIFA Student Research Conference 2025-26 · Best External Paper Award · Jan 2026
        </p>
        <p className="text-sm leading-5 text-[var(--text)]">
          Sahil Kadam, Ramjee Mishra, and Krishiv Solanki. Guided by Prof. Mrs. Vinaya Kulkarni, ITM Skills
          University.
        </p>
        <p className="text-sm leading-5 text-[var(--text)]">
          PAMC is a three-layer agentic architecture where an LLM supervisor coordinates IoT perception, vision,
          and actuation for plant-level urban farming. Four sub-agents cover electrochemical sensing, atmosphere,
          phenotypic vision, and a natural-language central supervisor.
        </p>
        <p className="flex flex-wrap gap-4 text-xs leading-4">
          <SiteLink
            href="/assets/research/pamc-paper.pdf"
            navigate={navigate}
            className="text-[var(--muted)] no-underline hover:text-[var(--text)]"
          >
            View paper
          </SiteLink>
          <a
            href="/assets/research/pamc-slides.pptx"
            className="text-[var(--muted)] no-underline hover:text-[var(--text)]"
          >
            Download slides
          </a>
        </p>
      </div>

      <Section title="Talk">
        <video className="w-full" controls preload="metadata" src="/assets/research/pamc-talk.mp4">
          <a href="/assets/research/pamc-talk.mp4">Download the research talk</a>
        </video>
      </Section>
    </main>
  )
}

function App() {
  const { path, search, navigate } = useRoute()
  useTheme()
  const route = routes[path]
  const viewerWide = path === '/view/'

  useEffect(() => {
    document.title = route.title

    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (description) {
      description.content = route.description
    }
  }, [route])

  return (
    <div
      className={`mx-auto grid min-h-screen w-full content-start gap-12 px-8 py-[52px] ${
        viewerWide ? 'max-w-[720px]' : 'max-w-[512px]'
      }`}
    >
      <Header path={path} navigate={navigate} />
      {path === '/' ? <HomePage navigate={navigate} /> : null}
      {path === '/work/' ? <WorkPage navigate={navigate} /> : null}
      {path === '/proof/' ? <ProofPage navigate={navigate} /> : null}
      {path === '/research/' ? <ResearchPage navigate={navigate} /> : null}
      {path === '/view/' ? (
        <PdfViewer
          search={search}
          onBack={() => {
            if (window.history.length > 1) {
              window.history.back()
              return
            }
            navigate('/research/')
          }}
        />
      ) : null}
    </div>
  )
}

export default App
