export interface IQuestionData {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
  acceptanceRate: number;
  totalSubmissions: number;
  solved: boolean;
}

export const questionData: IQuestionData[] = [
  {
    id: "1",
    title: "Two Sum",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    difficulty: "easy",
    tags: ["array", "hash-table"],
    acceptanceRate: 45.3,
    totalSubmissions: 123456,
    solved: true,
  },
  {
    id: "2",
    title: "Add Two Numbers",
    description:
      "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.",
    difficulty: "medium",
    tags: ["linked-list", "math"],
    acceptanceRate: 35.7,
    totalSubmissions: 98765,
    solved: false,
  },
  {
    id: "3",
    title: "Longest Substring Without Repeating Characters",
    description:
      "Given a string s, find the length of the longest substring without repeating characters.",
    difficulty: "medium",
    tags: ["string", "sliding-window"],
    acceptanceRate: 29.8,
    totalSubmissions: 54321,
    solved: false,
  },
  {
    id: "4",
    title: "Median of Two Sorted Arrays",
    description:
      "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
    difficulty: "hard",
    tags: ["array", "divide-and-conquer"],
    acceptanceRate: 25.4,
    totalSubmissions: 67890,
    solved: false,
  },
  {
    id: "5",
    title: "Longest Palindromic Substring",
    description:
      "Given a string s, return the longest palindromic substring in s.",
    difficulty: "medium",
    tags: ["string", "dynamic-programming"],
    acceptanceRate: 31.2,
    totalSubmissions: 45678,
    solved: true,
  },
  {
    id: "6",
    title: "ZigZag Conversion",
    description:
      "The string 'PAYPALISHIRING' is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility) And then read line by line: 'PAHNAPLSIIGYIR'",
    difficulty: "medium",
    tags: ["string"],
    acceptanceRate: 28.5,
    totalSubmissions: 32109,
    solved: false,
  },
  {
    id: "7",
    title: "Reverse Integer",
    description:
      "Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.",
    difficulty: "easy",
    tags: ["math"],
    acceptanceRate: 26.7,
    totalSubmissions: 65432,
    solved: true,
  },
];
