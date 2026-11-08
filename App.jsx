import { useState, useEffect } from 'react'
import {
  Orbit,
  ArrowRight,
  Check,
  ChevronDown,
  Activity,
  BarChart3,
  Workflow,
  Bell,
  Users,
  ShieldCheck,
  Zap,
  Plug,
  Menu,
  X,
  TrendingUp,
  Search,
} from 'lucide-react'

/* ---------- Design tokens ---------- */
const C = {
  ink: '#0C1129', // deep navy, text + dark surfaces
  paper: '#F5F6FB', // cool off-white page
  card: '#FFFFFF',
  blue: '#3A56F5', // primary
  mist: '#E6E9FA', // soft blue tint
  amber: '#FFB547', // highlight / peak accent
  slate: '#5B6280', // secondary text
  line: '#DADDF0',
}

const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Instrument+Sans:wght@400;500;600&display=swap');
    .orbit-root { font-family:'Instrument Sans',system-ui,sans-serif; color:${C.ink}; background:${C.paper}; }
    .orbit-display { font-family:'Bricolage Grotesque',system-ui,sans-serif; letter-spacing:-0.025em; }
    @keyframes orbitSwap { from {opacity:0; transform:translateY(8px)} to {opacity:1; transform:none} }
    .orbit-swap { animation: orbitSwap .35s ease both; }
    @keyframes orbitSpin { to { transform: rotate(360deg) } }
    .orbit-spin { animation: orbitSpin 24s linear infinite; }
    @media (prefers-reduced-motion: reduce) {
      .orbit-swap, .orbit-spin { animation:none }
      .orbit-root * { transition-duration:0.01ms !important }
    }
  `}</style>
)

const Btn = ({ children, variant = 'primary', className = '', ...p }) => {
  const styles = {
    primary: 'text-white hover:brightness-110 focus-visible:outline-[#3A56F5]',
    dark: 'text-white hover:brightness-125 focus-visible:outline-[#0C1129]',
    ghost: 'bg-transparent hover:bg-[#E6E9FA] focus-visible:outline-[#3A56F5]',
  }
  const bg =
    variant === 'primary' ? C.blue : variant === 'dark' ? C.ink : undefined
  return (
    <button
      style={{ background: bg }}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${styles[variant]} ${className}`}
      {...p}
    >
      {children}
    </button>
  )
}

/* ---------- Navbar ---------- */
const Navbar = () => {
  const [open, setOpen] = useState(false)
  const links = [
    ['Product', '#product'],
    ['Features', '#features'],
    ['Pricing', '#pricing'],
    ['FAQ', '#faq'],
  ]
  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur"
      style={{ background: 'rgba(245,246,251,.85)', borderColor: C.line }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-2">
          <span
            className="grid h-8 w-8 place-items-center rounded-lg text-white"
            style={{ background: C.blue }}
          >
            <Orbit size={18} />
          </span>
          <span className="orbit-display text-xl font-extrabold">Orbit</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map(([l, h]) => (
            <a
              key={l}
              href={h}
              className="text-sm font-medium transition hover:opacity-70"
              style={{ color: C.slate }}
            >
              {l}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Btn variant="ghost">Sign in</Btn>
          <Btn>Start free trial</Btn>
        </div>
        <button
          className="md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <div
        className={`grid transition-all duration-300 md:hidden ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-1 px-5 pb-4">
            {links.map(([l, h]) => (
              <a
                key={l}
                href={h}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-[#E6E9FA]"
              >
                {l}
              </a>
            ))}
            <Btn className="mt-2">Start free trial</Btn>
          </div>
        </div>
      </div>
    </header>
  )
}

/* ---------- Dashboard preview (hero centerpiece) ---------- */
const WEEK = [
  { d: 'Mon', v: 42 },
  { d: 'Tue', v: 58 },
  { d: 'Wed', v: 51 },
  { d: 'Thu', v: 76 },
  { d: 'Fri', v: 94 },
  { d: 'Sat', v: 63 },
  { d: 'Sun', v: 71 },
]
const RANGES = {
  '7d': {
    data: WEEK,
    stats: [
      ['Active users', '18,420', '+12.4%'],
      ['Sessions', '64.2k', '+8.1%'],
      ['Conversion', '4.8%', '+0.6%'],
    ],
  },
  '30d': {
    data: [38, 52, 47, 66, 80, 59, 73].map((v, i) => ({
      d: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'][i],
      v,
    })),
    stats: [
      ['Active users', '71,903', '+18.9%'],
      ['Sessions', '251k', '+14.2%'],
      ['Conversion', '5.1%', '+0.9%'],
    ],
  },
}
const EVENTS = [
  ['Checkout completed', 'Maya R. · Pro plan', '2m'],
  ['Invite accepted', 'Dev team · 4 seats', '9m'],
  ['Funnel alert resolved', 'Signup → Activation', '21m'],
]

const DashboardPreview = () => {
  const [range, setRange] = useState('7d')
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 250)
    return () => clearTimeout(t)
  }, [])
  const { data, stats } = RANGES[range]
  const max = Math.max(...data.map((x) => x.v))

  return (
    <div
      className="overflow-hidden rounded-2xl border bg-white shadow-[0_30px_80px_-30px_rgba(12,17,41,.35)]"
      style={{ borderColor: C.line }}
    >
      <div
        className="flex items-center justify-between border-b px-4 py-3"
        style={{ borderColor: C.line }}
      >
        <div className="flex items-center gap-1.5">
          {['#FF6B6B', '#FFB547', '#4ADE80'].map((c) => (
            <span
              key={c}
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: c }}
            />
          ))}
        </div>
        <div
          className="hidden items-center gap-2 rounded-lg px-3 py-1 text-xs sm:flex"
          style={{ background: C.paper, color: C.slate }}
        >
          <Search size={12} /> Search events, users, funnels
        </div>
        <div
          className="flex rounded-lg p-0.5 text-xs font-semibold"
          style={{ background: C.paper }}
        >
          {Object.keys(RANGES).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              aria-pressed={range === r}
              className="rounded-md px-3 py-1 transition"
              style={
                range === r
                  ? { background: C.ink, color: '#fff' }
                  : { color: C.slate }
              }
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-0 md:grid-cols-[170px_1fr]">
        <aside
          className="hidden border-r p-3 md:block"
          style={{ borderColor: C.line }}
        >
          {[
            [Activity, 'Overview', true],
            [BarChart3, 'Funnels'],
            [Users, 'Audiences'],
            [Workflow, 'Automations'],
            [Bell, 'Alerts'],
          ].map(([I, l, on]) => (
            <div
              key={l}
              className="mb-1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium"
              style={
                on ? { background: C.mist, color: C.blue } : { color: C.slate }
              }
            >
              <I size={16} /> {l}
            </div>
          ))}
        </aside>

        <div className="p-4 sm:p-5">
          <div className="grid gap-3 sm:grid-cols-3">
            {stats.map(([l, v, d]) => (
              <div
                key={l}
                className="rounded-xl border p-4"
                style={{ borderColor: C.line }}
              >
                <p className="text-xs font-medium" style={{ color: C.slate }}>
                  {l}
                </p>
                <p className="orbit-display mt-1 text-2xl font-bold">{v}</p>
                <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-emerald-600">
                  <TrendingUp size={12} />
                  {d}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-3 grid gap-3 lg:grid-cols-[1.6fr_1fr]">
            <div
              className="rounded-xl border p-4"
              style={{ borderColor: C.line }}
            >
              <p className="text-sm font-semibold">Active users</p>
              <div className="mt-4 flex h-44 items-end gap-2 sm:gap-3">
                {data.map((x) => {
                  const peak = x.v === max
                  return (
                    <div
                      key={x.d}
                      className="group flex h-full flex-1 flex-col items-center justify-end gap-2"
                    >
                      <span className="text-[11px] font-semibold opacity-0 transition group-hover:opacity-100">
                        {x.v}k
                      </span>
                      <div
                        className="w-full rounded-t-md transition-all duration-700 ease-out"
                        style={{
                          height: ready ? `${(x.v / max) * 100}%` : '4%',
                          background: peak ? C.amber : C.blue,
                          opacity: peak ? 1 : 0.85,
                        }}
                      />
                      <span className="text-[11px]" style={{ color: C.slate }}>
                        {x.d}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
            <div
              className="rounded-xl border p-4"
              style={{ borderColor: C.line }}
            >
              <p className="text-sm font-semibold">Live events</p>
              <ul className="mt-3 space-y-3">
                {EVENTS.map(([t, s, m]) => (
                  <li key={t} className="flex items-start gap-3">
                    <span
                      className="mt-1.5 h-2 w-2 rounded-full"
                      style={{ background: C.blue }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{t}</p>
                      <p
                        className="truncate text-xs"
                        style={{ color: C.slate }}
                      >
                        {s}
                      </p>
                    </div>
                    <span className="text-xs" style={{ color: C.slate }}>
                      {m}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- Hero ---------- */
const Hero = () => (
  <section id="top" className="relative overflow-hidden">
    <div
      aria-hidden
      className="orbit-spin pointer-events-none absolute left-1/2 top-[-340px] h-[900px] w-[900px] -translate-x-1/2 rounded-full border"
      style={{ borderColor: C.line }}
    >
      <span
        className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: C.amber }}
      />
    </div>
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-[-200px] h-[620px] w-[620px] -translate-x-1/2 rounded-full border"
      style={{ borderColor: C.line }}
    />
    <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-16 sm:pt-24">
      <div className="mx-auto max-w-3xl text-center">
        <p
          className="mx-auto inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs font-medium"
          style={{ borderColor: C.line, color: C.slate }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: C.amber }}
          />{' '}
          Now with automated anomaly alerts
        </p>
        <h1 className="orbit-display mt-6 text-5xl font-extrabold leading-[1.02] sm:text-7xl">
          See what your product is doing, as it happens
        </h1>
        <p
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed"
          style={{ color: C.slate }}
        >
          Orbit turns raw events into live funnels, clear answers, and
          automations that act on them. Set up in an afternoon, not a quarter.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Btn className="w-full sm:w-auto">
            Start free trial <ArrowRight size={16} />
          </Btn>
          <Btn
            variant="ghost"
            className="w-full border sm:w-auto"
            style={{ borderColor: C.line }}
          >
            Book a demo
          </Btn>
        </div>
        <p className="mt-4 text-sm" style={{ color: C.slate }}>
          14 days free. No credit card.
        </p>
      </div>
      <div className="mt-14">
        <DashboardPreview />
      </div>
      <div
        className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm font-semibold"
        style={{ color: C.slate }}
      >
        <span className="font-medium">Trusted by teams at</span>
        {['Northwind', 'Lumen', 'Parcel', 'Kiln & Co', 'Fathom'].map((n) => (
          <span key={n} className="orbit-display text-base opacity-70">
            {n}
          </span>
        ))}
      </div>
    </div>
  </section>
)

/* ---------- Interactive product showcase ---------- */
const TABS = [
  {
    id: 'track',
    label: 'Track',
    icon: Activity,
    title: 'Capture every event without writing tracking code',
    body: 'Drop in one snippet and Orbit records clicks, page views, and custom events. Rename or merge events later without losing history.',
    points: [
      'Autocapture with manual overrides',
      'Event history kept for 24 months',
      "Replay any user's path",
    ],
    visual: () => (
      <ul className="space-y-2">
        {[
          ['page_view', '/pricing', '12:04:11'],
          ['click', 'Start free trial', '12:04:19'],
          ['signup_started', 'email', '12:04:32'],
          ['signup_completed', 'plan: team', '12:05:02'],
        ].map(([e, p, t]) => (
          <li
            key={t}
            className="flex items-center justify-between rounded-lg border bg-white px-3 py-2.5 text-sm"
            style={{ borderColor: C.line }}
          >
            <span className="font-semibold">{e}</span>
            <span style={{ color: C.slate }}>{p}</span>
            <span
              className="hidden text-xs sm:block"
              style={{ color: C.slate }}
            >
              {t}
            </span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: 'analyze',
    label: 'Analyze',
    icon: BarChart3,
    title: 'Find where people drop off in two clicks',
    body: 'Build funnels by picking steps, then break them down by plan, country, or campaign. Orbit highlights the step that loses the most people.',
    points: [
      'Funnels, retention, and paths',
      'Break down by any property',
      'Share a view with a link',
    ],
    visual: () => (
      <div className="space-y-3">
        {[
          ['Visited pricing', 100],
          ['Started signup', 64],
          ['Verified email', 51],
          ['Activated', 33],
        ].map(([l, p], i) => (
          <div key={l}>
            <div className="mb-1 flex justify-between text-sm">
              <span className="font-medium">{l}</span>
              <span style={{ color: C.slate }}>{p}%</span>
            </div>
            <div
              className="h-3 overflow-hidden rounded-full"
              style={{ background: C.mist }}
            >
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${p}%`,
                  background: i === 3 ? C.amber : C.blue,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'automate',
    label: 'Automate',
    icon: Workflow,
    title: 'Act on a signal the moment it happens',
    body: 'Turn any metric into a rule. When trial users stall, message them. When errors spike, page the right engineer.',
    points: [
      'Slack, email, and webhook actions',
      'Rules with thresholds and cooldowns',
      'Full audit log of what fired',
    ],
    visual: () => (
      <div className="space-y-2">
        {[
          ['When', 'Trial user inactive for 3 days'],
          ['And', 'Plan is Team'],
          ['Then', 'Send email “Need a hand?” and notify #success'],
        ].map(([k, v]) => (
          <div
            key={k}
            className="flex gap-3 rounded-lg border bg-white p-3 text-sm"
            style={{ borderColor: C.line }}
          >
            <span
              className="w-12 shrink-0 font-semibold"
              style={{ color: C.blue }}
            >
              {k}
            </span>
            <span>{v}</span>
          </div>
        ))}
      </div>
    ),
  },
]

const Showcase = () => {
  const [active, setActive] = useState('track')
  const tab = TABS.find((t) => t.id === active)
  const Visual = tab.visual
  return (
    <section id="product" className="mx-auto max-w-6xl px-5 py-20">
      <h2 className="orbit-display max-w-2xl text-4xl font-bold sm:text-5xl">
        One place to track, understand, and respond
      </h2>
      <div
        role="tablist"
        className="mt-10 inline-flex flex-wrap gap-1 rounded-xl border bg-white p-1"
        style={{ borderColor: C.line }}
      >
        {TABS.map(({ id, label, icon: I }) => (
          <button
            key={id}
            role="tab"
            aria-selected={active === id}
            onClick={() => setActive(id)}
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3A56F5]"
            style={
              active === id
                ? { background: C.ink, color: '#fff' }
                : { color: C.slate }
            }
          >
            <I size={16} /> {label}
          </button>
        ))}
      </div>
      <div
        key={tab.id}
        role="tabpanel"
        className="orbit-swap mt-6 grid gap-8 rounded-2xl border p-6 sm:p-10 lg:grid-cols-2"
        style={{ background: C.card, borderColor: C.line }}
      >
        <div>
          <h3 className="orbit-display text-2xl font-bold sm:text-3xl">
            {tab.title}
          </h3>
          <p className="mt-3 leading-relaxed" style={{ color: C.slate }}>
            {tab.body}
          </p>
          <ul className="mt-6 space-y-3">
            {tab.points.map((p) => (
              <li
                key={p}
                className="flex items-center gap-3 text-sm font-medium"
              >
                <span
                  className="grid h-5 w-5 place-items-center rounded-full"
                  style={{ background: C.mist, color: C.blue }}
                >
                  <Check size={12} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl p-5" style={{ background: C.paper }}>
          <Visual />
        </div>
      </div>
    </section>
  )
}

/* ---------- Features (varied bento) ---------- */
const Features = () => (
  <section id="features" className="mx-auto max-w-6xl px-5 py-20">
    <h2 className="orbit-display max-w-2xl text-4xl font-bold sm:text-5xl">
      Built for teams that ship every week
    </h2>
    <div className="mt-10 grid gap-4 md:grid-cols-6">
      <div
        className="rounded-2xl p-8 text-white md:col-span-4"
        style={{ background: C.ink }}
      >
        <Zap style={{ color: C.amber }} />
        <h3 className="orbit-display mt-4 text-3xl font-bold">
          Queries that return in under a second
        </h3>
        <p className="mt-3 max-w-md text-white/70">
          Orbit stores events in a columnar engine, so a funnel across 200
          million events loads before you finish your coffee.
        </p>
        <div className="mt-8 flex items-end gap-6">
          {[
            ['0.4s', 'median query'],
            ['99.99%', 'uptime'],
            ['200M', 'events per funnel'],
          ].map(([v, l]) => (
            <div key={l}>
              <p className="orbit-display text-2xl font-bold">{v}</p>
              <p className="text-xs text-white/60">{l}</p>
            </div>
          ))}
        </div>
      </div>
      <div
        className="rounded-2xl border bg-white p-8 md:col-span-2"
        style={{ borderColor: C.line }}
      >
        <ShieldCheck style={{ color: C.blue }} />
        <h3 className="orbit-display mt-4 text-xl font-bold">
          Privacy by default
        </h3>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: C.slate }}>
          SOC 2 Type II, EU hosting, and one-click user deletion for GDPR
          requests.
        </p>
      </div>
      <div
        className="rounded-2xl border bg-white p-8 md:col-span-2"
        style={{ borderColor: C.line }}
      >
        <Plug style={{ color: C.blue }} />
        <h3 className="orbit-display mt-4 text-xl font-bold">
          60+ integrations
        </h3>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: C.slate }}>
          Sync with Segment, Stripe, HubSpot, Slack, and your warehouse.
        </p>
      </div>
      <div
        className="rounded-2xl p-8 md:col-span-4"
        style={{ background: C.mist }}
      >
        <Users style={{ color: C.blue }} />
        <h3 className="orbit-display mt-4 text-2xl font-bold">
          Everyone gets answers, not just analysts
        </h3>
        <p className="mt-2 max-w-lg leading-relaxed" style={{ color: C.slate }}>
          Ask a question in plain language, get a chart back, and pin it to a
          shared board. Product, growth, and support all see the same numbers.
        </p>
      </div>
    </div>
  </section>
)

/* ---------- Pricing ---------- */
const PLANS = [
  {
    name: 'Starter',
    monthly: 19,
    blurb: 'For solo builders and early products.',
    feats: ['50k events / month', '3 saved dashboards', 'Email support'],
  },
  {
    name: 'Team',
    monthly: 49,
    blurb: 'For growing teams that need shared answers.',
    feats: [
      '2M events / month',
      'Unlimited dashboards',
      'Automations and alerts',
      'Priority support',
    ],
    pop: true,
  },
  {
    name: 'Scale',
    monthly: null,
    blurb: 'For high-volume products with compliance needs.',
    feats: [
      'Unlimited events',
      'SSO and audit log',
      'Dedicated engineer',
      '99.99% uptime SLA',
    ],
  },
]

const Pricing = () => {
  const [yearly, setYearly] = useState(false)
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-5 py-20">
      <div className="text-center">
        <h2 className="orbit-display text-4xl font-bold sm:text-5xl">
          Simple pricing that scales with events
        </h2>
        <div className="mt-8 inline-flex items-center gap-3 text-sm font-semibold">
          <span style={{ color: yearly ? C.slate : C.ink }}>Monthly</span>
          <button
            role="switch"
            aria-checked={yearly}
            aria-label="Bill yearly"
            onClick={() => setYearly(!yearly)}
            className="relative h-7 w-[52px] rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3A56F5]"
            style={{ background: yearly ? C.blue : C.line }}
          >
            <span
              className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300"
              style={{ transform: yearly ? 'translateX(24px)' : 'none' }}
            />
          </button>
          <span style={{ color: yearly ? C.ink : C.slate }}>Yearly</span>
          <span
            className="rounded-full px-2 py-0.5 text-xs"
            style={{ background: C.amber, color: C.ink }}
          >
            Save 20%
          </span>
        </div>
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {PLANS.map((p) => {
          const price =
            p.monthly === null
              ? null
              : yearly
                ? Math.round(p.monthly * 0.8)
                : p.monthly
          const dark = p.pop
          return (
            <div
              key={p.name}
              className="flex flex-col rounded-2xl border p-8"
              style={
                dark
                  ? { background: C.ink, color: '#fff', borderColor: C.ink }
                  : { background: C.card, borderColor: C.line }
              }
            >
              <div className="flex items-center justify-between">
                <h3 className="orbit-display text-xl font-bold">{p.name}</h3>
                {p.pop && (
                  <span
                    className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                    style={{ background: C.amber, color: C.ink }}
                  >
                    Most popular
                  </span>
                )}
              </div>
              <p
                className="mt-2 text-sm"
                style={{ color: dark ? 'rgba(255,255,255,.7)' : C.slate }}
              >
                {p.blurb}
              </p>
              <div className="mt-6 flex items-baseline gap-1">
                {price === null ? (
                  <span className="orbit-display text-4xl font-extrabold">
                    Custom
                  </span>
                ) : (
                  <>
                    <span
                      key={price}
                      className="orbit-display orbit-swap text-5xl font-extrabold"
                    >
                      ${price}
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: dark ? 'rgba(255,255,255,.7)' : C.slate }}
                    >
                      / month
                    </span>
                  </>
                )}
              </div>
              <p
                className="mt-1 h-5 text-xs"
                style={{ color: dark ? 'rgba(255,255,255,.6)' : C.slate }}
              >
                {price !== null && yearly
                  ? `Billed $${price * 12} per year`
                  : price !== null
                    ? 'Billed monthly'
                    : 'Talk to us for volume pricing'}
              </p>
              <ul className="my-6 flex-1 space-y-3">
                {p.feats.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <Check
                      size={16}
                      style={{ color: dark ? C.amber : C.blue }}
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <Btn variant={dark ? 'primary' : 'dark'}>
                {price === null ? 'Contact sales' : 'Start free trial'}
              </Btn>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* ---------- FAQ ---------- */
const FAQS = [
  [
    'How long does setup take?',
    'Most teams send their first event within 15 minutes. Add the snippet, confirm events are arriving, and Orbit builds your first dashboard automatically.',
  ],
  [
    'What counts as an event?',
    'Any page view, click, or custom action your product sends. Autocaptured events count the same as ones you send yourself.',
  ],
  [
    'Can I switch plans or cancel?',
    'Yes. Upgrade or downgrade at any time and the change applies on your next invoice. Cancel from Settings with no call required.',
  ],
  [
    'Where is my data stored?',
    'You choose US or EU hosting when you create a workspace. Data is encrypted in transit and at rest.',
  ],
  [
    'Do you offer discounts for startups or nonprofits?',
    'Yes. Eligible startups get 50% off for the first year, and registered nonprofits get 30% off. Contact us to apply.',
  ],
]

const FAQ = () => {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="mx-auto max-w-3xl px-5 py-20">
      <h2 className="orbit-display text-center text-4xl font-bold sm:text-5xl">
        Questions, answered
      </h2>
      <div
        className="mt-10 divide-y rounded-2xl border bg-white"
        style={{ borderColor: C.line }}
      >
        {FAQS.map(([q, a], i) => {
          const isOpen = open === i
          return (
            <div key={q} style={{ borderColor: C.line }}>
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3A56F5]"
              >
                {q}
                <ChevronDown
                  size={18}
                  className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  style={{ color: C.blue }}
                />
              </button>
              <div
                id={`faq-${i}`}
                className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
              >
                <div className="overflow-hidden">
                  <p
                    className="px-6 pb-5 leading-relaxed"
                    style={{ color: C.slate }}
                  >
                    {a}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* ---------- Final CTA + Footer ---------- */
const CTA = () => (
  <section className="mx-auto max-w-6xl px-5 pb-20">
    <div
      className="relative overflow-hidden rounded-3xl p-10 text-center text-white sm:p-16"
      style={{ background: C.blue }}
    >
      <div
        aria-hidden
        className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/25"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full border border-white/25"
      />
      <h2 className="orbit-display relative mx-auto max-w-2xl text-4xl font-bold sm:text-5xl">
        Send your first event today
      </h2>
      <p className="relative mx-auto mt-4 max-w-md text-white/80">
        Free for 14 days. Bring your team and see your product clearly.
      </p>
      <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
          className="w-full rounded-xl bg-white px-6 py-3 text-sm font-semibold transition hover:bg-[#E6E9FA] sm:w-auto"
          style={{ color: C.ink }}
        >
          Start free trial
        </button>
        <button className="w-full rounded-xl border border-white/40 px-6 py-3 text-sm font-semibold transition hover:bg-white/10 sm:w-auto">
          Book a demo
        </button>
      </div>
    </div>
  </section>
)

const Footer = () => (
  <footer className="border-t" style={{ borderColor: C.line }}>
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <Orbit size={18} style={{ color: C.blue }} />
        <span className="orbit-display font-extrabold">Orbit</span>
        <span className="ml-3 text-sm" style={{ color: C.slate }}>
          © 2026 Orbit Labs, Inc.
        </span>
      </div>
      <nav className="flex flex-wrap gap-6 text-sm" style={{ color: C.slate }}>
        {['Product', 'Pricing', 'Docs', 'Security', 'Privacy', 'Terms'].map(
          (l) => (
            <a key={l} href="#top" className="transition hover:text-[#0C1129]">
              {l}
            </a>
          ),
        )}
      </nav>
    </div>
  </footer>
)

/* ---------- App ---------- */
export default function App() {
  return (
    <div className="orbit-root min-h-screen scroll-smooth antialiased">
      <GlobalStyle />
      <Navbar />
      <main>
        <Hero />
        <Showcase />
        <Features />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
