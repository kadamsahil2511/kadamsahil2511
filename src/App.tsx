import { useEffect, useMemo, useState, type ReactNode } from 'react'

type RoutePath = '/' | '/work/' | '/proof/'
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
  items: string[]
}

const routes: Record<RoutePath, { label: string; title: string; description: string }> = {
  '/': {
    label: 'Home',
    title: 'Sahil Shahaji Kadam',
    description:
      'Sahil Shahaji Kadam is a Navi Mumbai AI-first builder, React and workflow engineer, JS Community India contributor, and MacD SDE arc enjoyer.',
  },
  '/work/': {
    label: 'Work',
    title: 'Work - Sahil Shahaji Kadam',
    description: 'Experience, community work, and selected public projects by Sahil Shahaji Kadam.',
  },
  '/proof/': {
    label: 'Proof',
    title: 'Proof - Sahil Shahaji Kadam',
    description: 'Skills, education, achievements, talks, and links for Sahil Shahaji Kadam.',
  },
}

const profileLinks: LinkItem[] = [
  { label: 'Email', href: 'mailto:kadamsahil2511@gmail.com' },
  { label: 'GitHub', href: 'https://github.com/kadamsahil2511' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kadamsahil2509/' },
  { label: 'Resume', href: '/assets/Sahil_Shahaji_Kadam_CV.pdf' },
]

const experience: RowItem[] = [
  {
    title: 'Software Development Engineer, MacD',
    description:
      'Current SDE arc since Jun 2026: shipping product surfaces, debugging the obvious after the coffee hits, and turning workflow chaos into features that survive real users.',
    meta: 'Jun 2026 - Present',
  },
  {
    title: 'Community Builder, JS Community India',
    description:
      'Building with JS Community India since Apr 2026 across events, demos, community ops, and the delightful mess where AI workflows meet JavaScript people.',
    meta: 'Apr 2026 - Present',
  },
  {
    title: 'Software Development Engineer Intern, LetsUpgrade',
    description:
      'Led the video generation module for an AI-integrated LMS, reduced generation time from 15 minutes to 3 minutes, and moved heavy rendering into asynchronous serverless background jobs.',
    meta: 'Aug 2025 - May 2026',
    links: [{ label: 'Company', href: 'https://letsupgrade.in/' }],
  },
  {
    title: 'Project Intern, LetsUpgrade',
    description:
      'Built AI-driven automation tools for data gathering and internal workflows, improving process speed by 90% and reducing manual task time by 6x.',
    meta: 'Dec 2024 - Mar 2025',
  },
]

const projects: RowItem[] = [
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

const achievements: RowItem[] = [
  {
    title: 'Hyperthon India Hackathon, Mumbai Edition',
    description: '1st Prize, INR 25,000.',
    meta: '2025',
  },
  {
    title: 'Hyperthon India, Bengaluru Round',
    description: 'National Finalist, selected among top regional winners.',
    meta: '2025',
  },
  {
    title: 'International ASIFA Student Research Paper Conference',
    description: 'Best External Paper Award.',
    meta: 'Year bucket',
  },
  { title: 'Imagine Hackathon at PANIIT', description: 'Top 30 teams out of 15,000.', meta: '2025' },
  { title: 'Elevator Pitch Competition, ITM Business School', description: '1st Place.', meta: 'Year bucket' },
]

const talks: RowItem[] = [
  {
    title: 'Mumbai Hacks 2025',
    description:
      "Presented to 500+ attendees at the global project launch of MIT's Nanda Project as part of a top-three team.",
    meta: '2025',
  },
  {
    title: 'Ideation to Prototype',
    description:
      'Guest speaker for Singularity Hackathon, delivering a session on rapid prototyping to engineering students.',
    meta: '2026',
  },
]

const workTimeline: TimelineGroup[] = [
  {
    label: 'Jun 2026',
    eyebrow: 'now loading',
    items: ['MacD SDE arc starts: product, workflows, and bug tickets with plot armor.'],
  },
  {
    label: 'Apr 2026',
    eyebrow: 'community',
    items: ['Joined JS Community India work: events, demos, async planning, and JavaScript lore.'],
  },
  {
    label: 'May 2026',
    eyebrow: 'ship',
    items: ['Wrapped the LetsUpgrade SDE internship after the AI video pipeline got a 5x speed-up.'],
  },
  {
    label: 'Aug 2025',
    eyebrow: 'internship',
    items: ['Started owning the LMS video generation module at LetsUpgrade.'],
  },
  {
    label: 'Dec 2024',
    eyebrow: 'automation',
    items: ['Started LetsUpgrade project internship focused on AI workflow automation.'],
  },
]

const proofTimeline: TimelineGroup[] = [
  {
    label: '2026',
    eyebrow: 'year bucket',
    items: ['Guest speaker for Singularity Hackathon: Ideation to Prototype.'],
  },
  {
    label: '2025',
    eyebrow: 'year bucket',
    items: [
      'Hyperthon India Mumbai Edition: 1st Prize.',
      'Hyperthon India Bengaluru Round: National Finalist.',
      'Imagine Hackathon at PANIIT: Top 30 of 15,000.',
      'Mumbai Hacks 2025: Nanda Project launch presentation.',
      'ASIFA and elevator pitch wins live here until a known month appears.',
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

  return '/'
}

function isExternalLink(href: string) {
  return href.startsWith('http') || href.startsWith('mailto:')
}

function useRoute() {
  const [path, setPath] = useState<RoutePath>(() => normalizePath(window.location.pathname))

  useEffect(() => {
    const onPopState = () => setPath(normalizePath(window.location.pathname))
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = (nextPath: RoutePath) => {
    window.history.pushState(null, '', nextPath)
    setPath(nextPath)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return { path, navigate }
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

function Header({ path, navigate }: { path: RoutePath; navigate: (path: RoutePath) => void }) {
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

      <nav className="flex shrink-0 gap-6 pt-[3px] text-xs leading-4" aria-label="Primary navigation">
        {(['/work/', '/proof/'] as RoutePath[]).map((routePath) => (
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
      </nav>
    </header>
  )
}

function LinkGrid({ links }: { links: LinkItem[] }) {
  return (
    <nav className="grid grid-cols-2 gap-x-8 gap-y-[10px] text-xs leading-4" aria-label="Profile links">
      {links.map(({ label, href }) => (
        <a
          key={href}
          href={href}
          target={isExternalLink(href) && !href.startsWith('mailto:') ? '_blank' : undefined}
          rel={isExternalLink(href) && !href.startsWith('mailto:') ? 'noreferrer' : undefined}
          className="text-[var(--muted)] no-underline hover:text-[var(--text)]"
        >
          {label}
        </a>
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

function Rows({ items }: { items: RowItem[] }) {
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
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--muted)] no-underline hover:text-[var(--text)]"
                  >
                    {link.label}
                  </a>
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

function MonthTimeline({ groups }: { groups: TimelineGroup[] }) {
  return (
    <div className="grid gap-5">
      {groups.map((group) => (
        <article key={group.label} className="grid gap-1">
          <div className="min-w-0">
            <p className="text-sm font-bold leading-5 text-[var(--text)]">{group.label}</p>
            {group.eyebrow ? <p className="text-xs leading-4 text-[var(--muted)]">{group.eyebrow}</p> : null}
          </div>
          <ul className="grid gap-1 text-sm leading-5 text-[var(--text)]">
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  )
}

function HomePage() {
  return (
    <main className="grid gap-12">
      <section className="grid gap-12">
        <p className="text-sm leading-5 text-[var(--text)]">
          I build AI-first product workflows, React/Next systems, and hackathon prototypes from Navi Mumbai.
          Since Apr 2026 I have been building with JS Community India; since Jun 2026 I am on the MacD
          SDE arc. Current operating mode: automate the boring part, ship the demo before the group chat
          overthinks it, then make the workflow less cursed.
        </p>

        <LinkGrid links={profileLinks} />
      </section>
    </main>
  )
}

function WorkPage() {
  return (
    <main className="grid gap-10">
      <div className="grid gap-4">
        <h1 className="text-lg font-bold leading-5 text-[var(--text)]">Work</h1>
        <p className="text-sm leading-5 text-[var(--text)]">
          A practical track record across AI video generation, workflow automation, community work, and side projects
          that made it out of localhost.
        </p>
      </div>

      <Section title="Timeline">
        <MonthTimeline groups={workTimeline} />
      </Section>

      <Section title="Experience">
        <Rows items={experience} />
      </Section>

      <Section title="Projects">
        <Rows items={projects} />
      </Section>
    </main>
  )
}

function ProofPage() {
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
          The receipts page: technical range, academic track, hackathon outcomes, talks, and the links people
          actually ask for.
        </p>
      </div>

      <Section title="Timeline">
        <MonthTimeline groups={proofTimeline} />
      </Section>

      <Section title="Skills">
        <Rows items={skills} />
      </Section>

      <Section title="Education">
        <Rows items={education} />
      </Section>

      <Section title="Achievements">
        <Rows items={achievements} />
      </Section>

      <Section title="Talks">
        <Rows items={talks} />
      </Section>

      <Section title="Links">
        <LinkGrid links={profileLinks} />
      </Section>
    </main>
  )
}

function App() {
  const { path, navigate } = useRoute()
  useTheme()
  const route = routes[path]

  useEffect(() => {
    document.title = route.title

    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (description) {
      description.content = route.description
    }
  }, [route])

  return (
    <div className="mx-auto grid min-h-screen w-full max-w-[512px] content-start gap-12 px-8 py-[52px]">
      <Header path={path} navigate={navigate} />
      {path === '/' ? <HomePage /> : null}
      {path === '/work/' ? <WorkPage /> : null}
      {path === '/proof/' ? <ProofPage /> : null}
      <footer className="text-xs leading-4">
        <a href="/assets/Sahil_Shahaji_Kadam_CV.pdf" className="text-[var(--muted)] no-underline hover:text-[var(--text)]">
          Resume
        </a>
      </footer>
    </div>
  )
}

export default App
