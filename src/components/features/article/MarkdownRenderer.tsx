"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const components = {
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 className="text-3xl font-bold mt-8 mb-4 leading-tight tracking-tight">
      {children}
    </h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="text-2xl font-bold mt-7 mb-3 leading-tight">{children}</h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="text-xl font-semibold mt-6 mb-2">{children}</h3>
  ),
  h4: ({ children }: { children?: React.ReactNode }) => (
    <h4 className="text-lg font-semibold mt-4 mb-1">{children}</h4>
  ),
  // biome-ignore lint/style/useNamingConvention: single-char HTML tag key required by react-markdown
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="text-base leading-8 mb-5 text-foreground/90">{children}</p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="list-disc list-outside pl-6 mb-5 space-y-2 text-base">
      {children}
    </ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="list-decimal list-outside pl-6 mb-5 space-y-2 text-base">
      {children}
    </ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="leading-7">{children}</li>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="border-l-4 border-primary/40 pl-5 italic text-muted-foreground my-6 text-base">
      {children}
    </blockquote>
  ),
  code: ({
    inline,
    children,
  }: {
    inline?: boolean;
    children?: React.ReactNode;
  }) =>
    inline ? (
      <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ) : (
      <code className="block bg-muted rounded-lg p-4 text-sm font-mono overflow-x-auto leading-6">
        {children}
      </code>
    ),
  pre: ({ children }: { children?: React.ReactNode }) => (
    <pre className="mb-6 rounded-lg overflow-hidden">{children}</pre>
  ),
  // biome-ignore lint/style/useNamingConvention: single-char HTML tag key required by react-markdown
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a
      href={href}
      className="text-primary underline underline-offset-4 hover:opacity-80 transition-opacity"
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  em: ({ children }: { children?: React.ReactNode }) => (
    <em className="italic">{children}</em>
  ),
  hr: () => <hr className="my-8 border-border" />,
  img: ({ src, alt }: { src?: string | Blob; alt?: string }) => (
    // biome-ignore lint/performance/noImgElement: markdown image, URL is author-provided
    <img
      src={typeof src === "string" ? src : undefined}
      alt={alt ?? ""}
      className="rounded-xl max-w-full my-6 w-full object-cover"
    />
  ),
};

const MarkdownRenderer = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={components}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
