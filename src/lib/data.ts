export const navigation = [
  { href: "/about", label: "About us" },
  { href: "/services", label: "Our expertise" },
  { href: "/case-studies", label: "Selected work" },
  { href: "/faq", label: "FAQs" },
];

export const services = [
  {
    number: "01",
    title: "Strategy & growth",
    description:
      "Find your next opportunity. Build a clear, actionable path from ambition to sustainable growth.",
    icon: "strategy",
    points: [
      "Corporate & business strategy",
      "Market entry & expansion",
      "Commercial due diligence",
    ],
    href: "/services/strategy-growth",
  },
  {
    number: "02",
    title: "Business transformation",
    description:
      "Turn complex change into meaningful progress. Align your operations, people, and priorities.",
    icon: "transformation",
    points: [
      "Operating model design",
      "Process & performance improvement",
      "Change management",
    ],
    href: "/services/strategy-growth#capabilities",
  },
  {
    number: "03",
    title: "Digital & innovation",
    description:
      "Make technology work for your business. Create new value through a more considered digital future.",
    icon: "digital",
    points: [
      "Digital strategy & roadmaps",
      "Innovation portfolio design",
      "Data & decision intelligence",
    ],
    href: "/services/strategy-growth#capabilities",
  },
] as const;

export const cases = [
  {
    id: "nordhaven",
    name: "Nordhaven",
    category: "Strategy & growth",
    sector: "Renewable energy",
    title: "A clearer path to a greener future.",
    image: "/images/wind.jpg",
    alt: "Wind turbines across a sunlit green landscape",
    metric: "+32%",
    metricLabel: "Illustrative revenue growth",
    description:
      "An imagined renewable energy business evaluates three new European markets. The example explores how market sizing, a partner strategy, and a phased entry plan could turn broad ambition into a focused decision.",
    outcome:
      "A prioritised market shortlist, a three-year commercial roadmap, and clear investment gates.",
    duration: "12 weeks",
  },
  {
    id: "forma",
    name: "Forma Group",
    category: "Business transformation",
    sector: "Architecture & built environment",
    title: "Redesigning the way a business works.",
    image: "/images/building.jpg",
    alt: "Upward view of a contemporary glass building",
    metric: "−24%",
    metricLabel: "Illustrative delivery time",
    description:
      "An imagined multidisciplinary design group needs a simpler way to deliver work across five offices. This example maps decision rights, removes duplicated handovers, and introduces shared delivery measures.",
    outcome:
      "A proposed operating model, a practical implementation backlog, and a 90-day pilot plan.",
    duration: "16 weeks",
  },
  {
    id: "verdant",
    name: "Verdant Living",
    category: "Digital & innovation",
    sector: "Consumer & retail",
    title: "An ambitious brand. A new digital chapter.",
    image: "/images/interior.jpg",
    alt: "Refined interior with warm natural materials and modern furniture",
    metric: "+41%",
    metricLabel: "Illustrative digital conversion",
    description:
      "An imagined interiors retailer connects its in-store expertise with its digital experience. This example explores customer journeys, a digital service blueprint, and an experiment-led product roadmap.",
    outcome:
      "A customer experience blueprint, a prioritised digital roadmap, and a measurement framework.",
    duration: "10 weeks",
  },
  {
    id: "meridian",
    name: "Meridian Mobility",
    category: "Strategy & growth",
    sector: "Transport & mobility",
    title: "Moving from opportunity to direction.",
    image: "/images/city.jpg",
    alt: "Modern glass city architecture against an overcast sky",
    metric: "3",
    metricLabel: "Illustrative priority markets",
    description:
      "An imagined mobility platform considers expansion beyond its home market. The example balances customer demand, competitive intensity, and operating complexity to identify a measured route forward.",
    outcome:
      "Three hypothetical priority markets and a sequence of testable commercial hypotheses.",
    duration: "8 weeks",
  },
];

export const faqs = [
  {
    category: "Working together",
    question: "What types of businesses do you work with?",
    answer:
      "The Aurel concept is designed around ambitious mid-market businesses, established organisations, and investment-backed teams navigating growth or change in Europe. This portfolio demonstration illustrates what a focused advisory partnership could look like.",
  },
  {
    category: "Working together",
    question: "How would an engagement begin?",
    answer:
      "A typical engagement would begin with a focused discovery conversation to understand the decision, the context, and the people involved. We would then agree a clear scope, deliverables, working cadence, and measures of success before any work starts.",
  },
  {
    category: "Projects & pricing",
    question: "How long does a typical project take?",
    answer:
      "The example engagements shown here range from 8 to 16 weeks. A focused diagnostic might take two to four weeks; a larger transformation could run in phases over several months. Timing would always follow the agreed scope.",
  },
  {
    category: "Projects & pricing",
    question: "How are consulting fees structured?",
    answer:
      "A well-defined project would typically use a fixed fee linked to scope and milestones. Longer implementation support could use a monthly arrangement. All budgets in the inquiry form are indicative planning ranges, not published service prices.",
  },
  {
    category: "Working together",
    question: "Can you work alongside our internal team?",
    answer:
      "Yes. The proposed model is collaborative: work with the people who understand the business, build shared ownership of decisions, and leave the team with practical tools they can continue to use.",
  },
  {
    category: "About this demo",
    question: "Are the company, case studies, and results real?",
    answer:
      "No. Aurel Advisory is a fictional company created for an agency portfolio demonstration. Every organisation, engagement, and performance figure shown is an illustrative example. No genuine client relationships, endorsements, or results are claimed.",
  },
  {
    category: "About this demo",
    question: "What happens when I submit the inquiry form?",
    answer:
      "The form validates your entries in your browser and shows a local demo confirmation. It does not send an email, store your inquiry on a server, or contact a consulting team. Please use sample information when exploring the demonstration.",
  },
  {
    category: "Projects & pricing",
    question: "Do you support implementation as well as strategy?",
    answer:
      "The service concept includes both direction-setting and practical delivery support. A proposed engagement could include an implementation roadmap, pilot design, progress reviews, and capability transfer to the internal team.",
  },
];
