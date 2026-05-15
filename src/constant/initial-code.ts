export const initialCodes = {
  cpp: {
    start: "#include<iostream>\nusing namespace std;\n",
    user: "int getSum(int a ,int b){\n// Write your code here\n}\n",
    end: "int main(){\n  int a , b;\n  cin>>a>>b;\n  cout<<getSum(a,b);\n  return 0;\n}\n",
  },
  java: {
    start: "import java.util.*;\n\n",
    user: "public class Solution{\npublic static int getSum(int a ,int b){\n  // Write your code here\n}\n",
    end: "public static void main(String[] args){\n    Scanner sc = new Scanner(System.in);\n    int a = sc.nextInt();\n    int b = sc.nextInt();\n    System.out.println(getSum(a,b));\n  }\n}\n",
  },
  python: {
    start: "# Write your code here\n",
    user: "def getSum(a, b):\n    # Write your code here\n    return a + b\n",
    end: "def main():\n    a = int(input())\n    b = int(input())\n    print(getSum(a, b))\n",
  },
  javascript: {
    start: "// Write your code here\n",
    user: "function getSum(a, b) {\n    // Write your code here\n    return a + b;\n}\n",
    end: 'function main() {\n    let a = parseInt(prompt("Enter a:"));\n    let b = parseInt(prompt("Enter b:"));\n    console.log(getSum(a, b));\n}\n',
  },
};
