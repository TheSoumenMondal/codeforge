import {
  ArrowRightIcon,
  BookOpenIcon,
  BracketsCurlyIcon,
  ChartLineUpIcon,
  CodeIcon,
  LightningIcon,
  TrophyIcon,
  UsersIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

const FEATURES = [
  {
    icon: BracketsCurlyIcon,
    title: "500+ Problems",
    desc: "From easy warm-ups to hard algorithmic challenges across all major topics.",
  },
  {
    icon: LightningIcon,
    title: "Instant Feedback",
    desc: "Run your code against test cases and get results in milliseconds.",
  },
  {
    icon: ChartLineUpIcon,
    title: "Track Progress",
    desc: "Visualize your growth with detailed stats and submission history.",
  },
  {
    icon: BookOpenIcon,
    title: "Curated Sheets",
    desc: "Follow structured problem sheets to master patterns systematically.",
  },
  {
    icon: UsersIcon,
    title: "Community",
    desc: "Discuss solutions, share articles, and learn from other developers.",
  },
  {
    icon: TrophyIcon,
    title: "Challenges",
    desc: "Compete in timed challenges and climb the leaderboard.",
  },
];

const CODE_SNIPPET = `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
}`;

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navbar */}
      <header className="border-b px-6 py-4 flex items-center justify-between max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-2 font-mono font-bold text-xl">
          <CodeIcon
            weight="duotone"
            className="text-primary"
            size={28}
          />
          <span>CodeForge</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium rounded-md border border-border hover:bg-muted transition-colors"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Sign Up
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24 max-w-4xl mx-auto w-full">
        <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full border border-border bg-muted text-muted-foreground mb-6">
          <LightningIcon
            weight="fill"
            size={12}
          />
          Sharpen your coding skills
        </span>

        <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
          Practice. Solve.{" "}
          <span className="font-instrumental-serif italic font-normal">
            Level up.
          </span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-xl mb-10">
          A platform built for developers who want to master data structures,
          algorithms, and problem-solving — one challenge at a time.
        </p>

        <div className="flex items-center gap-4 flex-wrap justify-center">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Get Started Free
            <ArrowRightIcon
              weight="bold"
              size={16}
            />
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-border font-medium hover:bg-muted transition-colors"
          >
            Already have an account?
          </Link>
        </div>

        {/* Code preview */}
        <div className="mt-16 w-full max-w-2xl text-left rounded-xl border border-border bg-muted overflow-hidden shadow-lg">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
            <span className="ml-3 text-xs font-mono text-muted-foreground">
              two-sum.js
            </span>
          </div>
          <pre className="p-5 text-sm font-mono text-foreground overflow-x-auto leading-relaxed">
            <code>{CODE_SNIPPET}</code>
          </pre>
        </div>
      </section>

      {/* Features */}
      <section className="border-t px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">
            Everything you need to grow as a developer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-6 rounded-xl border border-border bg-card hover:bg-muted transition-colors"
              >
                <Icon
                  weight="duotone"
                  size={28}
                  className="mb-3 text-foreground"
                />
                <h3 className="font-semibold mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to start solving?</h2>
        <p className="text-muted-foreground mb-8">
          Join thousands of developers sharpening their skills on CodeForge.
        </p>
        <Link
          href="/signup"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
        >
          Create Free Account
          <ArrowRightIcon
            weight="bold"
            size={16}
          />
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t px-6 py-6 text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-2 font-mono font-bold mb-1">
          <CodeIcon
            weight="duotone"
            size={16}
          />
          CodeForge
        </div>
        <p>Built for developers, by developers.</p>
      </footer>
    </div>
  );
}
