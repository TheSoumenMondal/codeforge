export type TCollectionCardType = {
  title: string;
  description: string;
  bgImage?: string;
};

export const collectionCardData: TCollectionCardType[] = [
  {
    title: "Dynamic Programming",
    description:
      "Master state transitions with memoization and tabulation patterns.",
    bgImage: "/images/problem-collections/dp.jpg",
  },
  {
    title: "Graph Theory",
    description:
      "Train BFS, DFS, shortest paths, and cycle detection strategies.",
    bgImage: "/images/problem-collections/graph.jpg",
  },
  {
    title: "Greedy Algorithms",
    description:
      "Build intuition for local choices that lead to global optima.",
    bgImage: "/images/problem-collections/greedy-algorithms.jpg",
  },
  {
    title: "Backtracking",
    description:
      "Practice recursive search, pruning, and constraint-based exploration.",
    bgImage: "/images/problem-collections/backtracking-pattern.jpg",
  },
  {
    title: "Sorting and Searching",
    description:
      "Sharpen binary search and ordering techniques for fast lookups.",
    bgImage: "/images/problem-collections/sorting-searching.jpg",
  },
  {
    title: "Mathematical Problems",
    description:
      "Solve number theory and combinatorics with elegant derivations.",
    bgImage: "/images/problem-collections/math-problem-set.jpg",
  },
  {
    title: "String Manipulation",
    description:
      "Learn sliding windows, hashing, and pattern matching for strings.",
    bgImage: "/images/problem-collections/string-manipulation.jpg",
  },
];
