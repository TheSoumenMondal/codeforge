"use client";

import {
  BooksIcon,
  BrainIcon,
  ChartLineUpIcon,
  CodeIcon,
  CompassIcon,
  FireIcon,
  LightningIcon,
  PencilCircleIcon,
  PenIcon,
  TrophyIcon,
  UserCheckIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function ProblemListVisual() {
  const items = [
    { title: "Two Sum", diff: "easy", solved: true },
    { title: "Merge Intervals", diff: "medium", solved: false },
    { title: "LRU Cache", diff: "hard", solved: false },
    { title: "Binary Search", diff: "easy", solved: true },
  ];
  const diffColor = {
    easy: "text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    medium:
      "text-amber-600 dark:text-amber-400 border-amber-500/30 bg-amber-500/10",
    hard: "text-red-600 dark:text-red-400 border-red-500/30 bg-red-500/10",
  } as const;

  return (
    <div className="space-y-1.5 mt-3">
      {items.map((item) => (
        <div
          key={item.title}
          className="flex items-center gap-2.5 rounded-lg bg-muted/30 px-3 py-2 border border-border/40 group/row"
        >
          <div
            className={cn(
              "size-1.5 rounded-full shrink-0 transition-colors",
              item.solved ? "bg-emerald-500" : "bg-border/60",
            )}
          />
          <span className="text-[12px] font-geist-sans font-medium flex-1 truncate">
            {item.title}
          </span>
          <span
            className={cn(
              "text-[10px] px-1.5 py-0.5 rounded-full border font-semibold transition-all",
              diffColor[item.diff as keyof typeof diffColor],
            )}
          >
            {item.diff}
          </span>
        </div>
      ))}
    </div>
  );
}

function EditorMiniVisual() {
  return (
    <div
      className="mt-3 rounded-md p-3 text-[12px] space-y-1 transition-all duration-150 border border-dashed dark:bg-accent"
      style={{
        fontFamily: "var(--font-ubuntu-mono), monospace",
        color: "#c9d1d9",
      }}
    >
      <div className="flex gap-3">
        <span style={{ color: "#484f58" }}>1</span>
        <span>
          <span style={{ color: "#ff7b72" }}>function </span>
          <span style={{ color: "#79c0ff" }}>solve</span>
          <span>(n: number) {"{"}</span>
        </span>
      </div>
      <div className="flex gap-3">
        <span style={{ color: "#484f58" }}>2</span>
        <span
          style={{ color: "#8b949e" }}
          className="pl-3"
        >
          {"// your logic here"}
        </span>
      </div>
      <div className="flex gap-3 items-center">
        <span style={{ color: "#484f58" }}>3</span>
        <span className="pl-3">
          <span style={{ color: "#ff7b72" }}>return </span>
          <span style={{ color: "#56d364" }}>result</span>
          <span>;</span>
          <span
            className="inline-block w-0.5 h-3.5 animate-pulse ml-0.5 align-middle"
            style={{ background: "#79c0ff" }}
          />
        </span>
      </div>
      <div className="flex gap-3">
        <span style={{ color: "#484f58" }}>4</span>
        <span>{"}"}</span>
      </div>
      <div
        className="mt-2 pt-2 flex items-center gap-2"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          color: "#8b949e",
          fontSize: "11px",
        }}
      >
        <div className="size-1.5 rounded-full bg-emerald-400" />
        Supports TypeScript · Python · Java · C++
      </div>
    </div>
  );
}

function ArticleCardVisual() {
  const posts = [
    { title: "Understanding Big-O Notation", read: "5 min", views: "2.3k" },
    { title: "Sliding Window Patterns", read: "8 min", views: "1.8k" },
    { title: "Graph Traversal 101", read: "12 min", views: "4.1k" },
    { title: "Dynamic Programming Basics", read: "15 min", views: "4.1k" },
    { title: "Recursion Explained", read: "10 min", views: "4.1k" },
  ];
  return (
    <div className="mt-3 space-y-2">
      {posts.map((post) => (
        <div
          key={post.title}
          className="flex items-center gap-2.5 rounded-lg bg-muted/30 px-3 py-2 border border-dashed"
        >
          <BooksIcon
            size={13}
            weight="duotone"
            className="text-amber-500 shrink-0"
          />
          <span className="text-[11px] font-geist-sans flex-1 truncate">
            {post.title}
          </span>
          <span className="text-[10px] text-muted-foreground shrink-0">
            {post.read}
          </span>
        </div>
      ))}
    </div>
  );
}

function StatsVisual() {
  const stats = [
    {
      label: "Problems",
      value: "320+",
      icon: (
        <BrainIcon
          size={14}
          weight="duotone"
          className="text-violet-500"
        />
      ),
    },
    {
      label: "Articles",
      value: "80+",
      icon: (
        <BooksIcon
          size={14}
          weight="duotone"
          className="text-amber-500"
        />
      ),
    },
    {
      label: "Users",
      value: "5k+",
      icon: (
        <UsersIcon
          size={14}
          weight="duotone"
          className="text-pink-500"
        />
      ),
    },
    {
      label: "Writers",
      value: "5k+",
      icon: (
        <PenIcon
          size={14}
          weight="duotone"
          className="text-blue-500"
        />
      ),
    },
    {
      label: "Posts",
      value: "1k+",
      icon: (
        <PencilCircleIcon
          size={14}
          weight="duotone"
          className="text-red-500"
        />
      ),
    },
    {
      label: "Articles Read",
      value: "5k+",
      icon: (
        <UserCheckIcon
          size={14}
          weight="duotone"
          className="text-green-500"
        />
      ),
    },
  ];
  return (
    <div className="grid grid-cols-3 gap-2 mt-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-lg border border-border/40 bg-muted/30 p-3 flex flex-col gap-1 items-center text-center transition-all duration-150 border-dashed"
        >
          {stat.icon}
          <p className="text-base font-semibold font-geist-sans">
            {stat.value}
          </p>
          <p className="text-[10px] text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

function CommunityVisual() {
  const challenges = [
    {
      name: "Weekly Contest #42",
      participants: 312,
      prize: "🏆",
      active: true,
    },
    { name: "Array Sprint", participants: 180, prize: "🥈", active: true },
    { name: "DP Gauntlet", participants: 95, prize: "🥉", active: false },
  ];
  const avatarColors = [
    "bg-violet-500",
    "bg-sky-500",
    "bg-amber-500",
    "bg-emerald-500",
    "bg-pink-500",
  ];
  const initials = ["S", "K", "A", "M", "R"];

  return (
    <div className="mt-3 space-y-2">
      {challenges.map((challenge) => (
        <div
          key={challenge.name}
          className="flex items-center gap-3 rounded-lg bg-muted/30 px-3 py-2.5 border border-border/40 hover:border-border/80 hover:bg-muted/50 transition-all duration-150"
        >
          <span className="text-base leading-none">{challenge.prize}</span>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-semibold font-geist-sans truncate">
              {challenge.name}
            </p>
            <p className="text-[10px] text-muted-foreground">
              {challenge.participants} participants
            </p>
          </div>
          {challenge.active && (
            <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 bg-emerald-500/10 shrink-0">
              <span className="size-1 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </span>
          )}
        </div>
      ))}
      <div className="flex items-center gap-2 pt-1">
        <div className="flex -space-x-2">
          {initials.map((init, index) => (
            <div
              key={init}
              className={cn(
                "size-6 rounded-full border-2 border-card flex items-center justify-center text-[9px] font-bold text-white transition-transform duration-150 hover:scale-105",
                avatarColors[index],
              )}
            >
              {init}
            </div>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground">
          +2.4k developers this week
        </p>
      </div>
    </div>
  );
}

function LeaderboardVisual() {
  const rows = [
    { rank: 1, name: "tourist", score: "4,820", delta: "+12", medal: "🥇" },
    { rank: 2, name: "dominator", score: "4,640", delta: "+8", medal: "🥈" },
    { rank: 3, name: "ali_builds", score: "4,510", delta: "+5", medal: "🥉" },
    { rank: 4, name: "meera_x", score: "4,320", delta: "+3", medal: null },
    { rank: 5, name: "ravi_algo", score: "4,110", delta: "+2", medal: null },
  ];
  return (
    <div className="mt-3 space-y-1.5">
      {rows.map((row) => (
        <div
          key={row.rank}
          className={cn(
            "flex items-center gap-2.5 rounded-lg px-3 py-2 border transition-all duration-150",
            row.rank === 1
              ? "bg-amber-500/10 border-amber-500/30 hover:border-amber-500/50"
              : "bg-muted/30 border-dashed border-border/40",
          )}
        >
          <span className="text-sm leading-none w-5 text-center shrink-0">
            {row.medal ?? (
              <span className="text-[11px] text-muted-foreground font-ubuntu-mono">
                {row.rank}
              </span>
            )}
          </span>
          <span className="text-[12px] font-geist-sans font-medium flex-1 truncate">
            {row.name}
          </span>
          <span className="text-[11px] font-ubuntu-mono text-muted-foreground">
            {row.score}
          </span>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-ubuntu-mono">
            {row.delta}
          </span>
        </div>
      ))}
    </div>
  );
}

function ComplexityGraphVisual() {
  const points = [
    { inputLabel: "n", time: 18, space: 28 },
    { inputLabel: "2n", time: 30, space: 34 },
    { inputLabel: "4n", time: 48, space: 40 },
    { inputLabel: "8n", time: 70, space: 44 },
    { inputLabel: "16n", time: 92, space: 50 },
  ];

  return (
    <div className="mt-3 rounded-xl border border-border/40 bg-muted/25 p-3">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[11px] font-semibold font-geist-sans">
          Growth Curve
        </p>
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-cyan-500" /> Time
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-amber-500" /> Space
          </span>
        </div>
      </div>

      <div className="relative h-28 w-full overflow-hidden rounded-lg border border-border/30 bg-card/30 px-2 pb-5 pt-3">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-1/4 border-t border-dashed border-border/30" />
          <div className="absolute inset-x-0 top-2/4 border-t border-dashed border-border/30" />
          <div className="absolute inset-x-0 top-3/4 border-t border-dashed border-border/30" />
        </div>

        <div className="absolute inset-x-0 bottom-5 top-3 flex items-end justify-between px-2">
          {points.map((point) => (
            <div
              key={point.inputLabel}
              className="flex h-full w-8 items-end justify-center gap-1"
            >
              <div
                className="w-1.5 rounded-sm bg-cyan-500"
                style={{ height: `${point.time}%` }}
              />
              <div
                className="w-1.5 rounded-sm bg-amber-500"
                style={{ height: `${point.space}%` }}
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-1 flex justify-between px-2">
          {points.map((point) => (
            <span
              key={`${point.inputLabel}-label`}
              className="w-8 text-center text-[9px] text-muted-foreground font-ubuntu-mono"
            >
              {point.inputLabel}
            </span>
          ))}
        </div>
      </div>

      <p className="mt-2 text-[10px] text-muted-foreground">
        Approximation for your current approach based on sample input growth.
      </p>
    </div>
  );
}

type TBentoCard = {
  id: string;
  colSpan?: string;
  icon: React.ReactNode;
  tag: string;
  tagCls: string;
  title: string;
  desc: string;
  soon?: boolean;
  visual?: React.ReactNode;
};

const cards: TBentoCard[] = [
  {
    id: "problems",
    colSpan: "md:col-span-2",
    icon: (
      <BrainIcon
        size={20}
        weight="duotone"
        className="text-violet-500"
      />
    ),
    tag: "Practice",
    tagCls:
      "border-violet-500/30 text-violet-600 dark:text-violet-400 bg-violet-500/10",
    title: "Curated Problem Sets",
    desc: "Hand-crafted problems across arrays, graphs, DP, and more. Filter by difficulty, tag, or popularity.",
    visual: <ProblemListVisual />,
  },
  {
    id: "editor",
    icon: (
      <CodeIcon
        size={20}
        weight="duotone"
        className="text-sky-500"
      />
    ),
    tag: "Editor",
    tagCls: "border-sky-500/30 text-sky-600 dark:text-sky-400 bg-sky-500/10",
    title: "In-Browser IDE",
    desc: "Write, run, and debug code directly in the browser with multi-language support.",
    visual: <EditorMiniVisual />,
  },
  {
    id: "articles",
    icon: (
      <BooksIcon
        size={20}
        weight="duotone"
        className="text-amber-500"
      />
    ),
    tag: "Learn",
    tagCls:
      "border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/10",
    title: "Learning Articles",
    desc: "Community-written deep-dives on algorithms, data structures, and system design.",
    soon: false,
    visual: <ArticleCardVisual />,
  },
  {
    id: "explore",
    icon: (
      <CompassIcon
        size={20}
        weight="duotone"
        className="text-emerald-500"
      />
    ),
    tag: "Discover",
    tagCls:
      "border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
    title: "Explore Feed",
    desc: "Discover trending problems, top community solutions, and live discussion threads. Lean into the hive mind of problem solvers. Practice smarter, not harder.",
    soon: false,
    visual: <StatsVisual />,
  },
  {
    id: "complexity",
    icon: (
      <ChartLineUpIcon
        size={20}
        weight="duotone"
        className="text-cyan-500"
      />
    ),
    tag: "Analyze",
    tagCls:
      "border-cyan-500/30 text-cyan-600 dark:text-cyan-400 bg-cyan-500/10",
    title: "Time & Space Complexity",
    desc: "Estimate asymptotic runtime and memory usage with quick Big-O insights for your approach.",
    visual: <ComplexityGraphVisual />,
  },
  {
    id: "community",
    colSpan: "md:col-span-2",
    icon: (
      <UsersIcon
        size={20}
        weight="duotone"
        className="text-pink-500"
      />
    ),
    tag: "Community",
    tagCls:
      "border-pink-500/30 text-pink-600 dark:text-pink-400 bg-pink-500/10",
    title: "Community Challenges",
    desc: "Compete in weekly live contests, climb the leaderboard, and earn recognition from the community.",
    soon: true,
    visual: <CommunityVisual />,
  },
  {
    id: "leaderboard",
    icon: (
      <TrophyIcon
        size={20}
        weight="duotone"
        className="text-amber-500"
      />
    ),
    tag: "Rank",
    tagCls:
      "border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/10",
    title: "Leaderboard",
    desc: "Track your rank, XP, and streak. Rise through tiers as you solve more problems.",
    soon: true,
    visual: <LeaderboardVisual />,
  },
];

export function BentoSection() {
  return (
    <section className="py-28 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <div>
            <Badge
              variant="outline"
              className="gap-1.5 px-3 py-1.5 h-auto rounded-full text-xs border border-dotted transition-all duration-150 hover:bg-muted/30"
            >
              <LightningIcon
                size={12}
                weight="duotone"
                className="text-amber-500"
              />
              Everything you need
            </Badge>
          </div>
          <h2 className="text-3xl md:text-4xl font-instrumental-serif tracking-wider font-semibold bg-linear-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            One platform, infinite possibilities
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg leading-relaxed">
            From curated problems to live contests-everything you need in a
            clean, distraction-free workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-auto">
          {cards.map((card) => (
            <div
              key={card.id}
              className={cn(
                "border border-dashed p-4 rounded-sm",
                card.colSpan,
              )}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border/60 to-transparent group-hover:via-border/90 transition-all duration-300" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-br from-primary/4 to-transparent pointer-events-none" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="size-10 rounded-xl bg-muted/50 border border-border/50 flex items-center justify-center shadow-sm transition-all duration-200 group-hover:border-border/80 group-hover:bg-muted/70">
                    {card.icon}
                  </div>
                  <div className="flex items-center gap-2">
                    {card.soon && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 leading-relaxed">
                        Coming Soon
                      </span>
                    )}
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[10px] h-5 px-2 rounded-full transition-all duration-150",
                        card.tagCls,
                      )}
                    >
                      {card.tag}
                    </Badge>
                  </div>
                </div>

                <h3 className="text-sm font-semibold font-geist-sans mb-1.5 leading-snug">
                  {card.title}
                </h3>
                <p className="text-[12px] text-muted-foreground leading-relaxed">
                  {card.desc}
                </p>

                {card.visual && (
                  <div className="flex-1 min-w-0 mt-2">{card.visual}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note - Static */}
        <div className="mt-10 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <FireIcon
            size={13}
            weight="duotone"
            className="text-orange-500"
          />
          <span>New problems added weekly. Community-driven</span>
        </div>
      </div>
    </section>
  );
}
