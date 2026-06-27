import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function MarkdownRenderer({ content }) {
  // Custom renderers to map markdown to Tailwind-styled components
  const renderers = {
    h1: ({ children }) => (
      <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-dark-graphite mt-10 mb-6 border-b border-border-soft pb-3">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-serif text-xl md:text-2xl font-bold tracking-tight text-dark-graphite mt-8 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-base md:text-lg font-semibold tracking-wide text-dark-graphite mt-6 mb-3">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-sm md:text-base font-light text-muted-gray leading-relaxed mb-5">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-6 mb-6 space-y-2 text-muted-gray text-sm md:text-base font-light">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2 text-muted-gray text-sm md:text-base font-light">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="pl-1 leading-relaxed">
        {children}
      </li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent-terracotta/60 bg-border-soft/20 pl-4 py-3 pr-2 italic my-6 text-muted-gray text-sm rounded-r">
        {children}
      </blockquote>
    ),
    code: ({ inline, className, children }) => {
      const isInline = !className;
      return isInline ? (
        <code className="bg-border-soft/60 px-1.5 py-0.5 rounded text-accent-terracotta font-mono text-xs font-semibold">
          {children}
        </code>
      ) : (
        <pre className="bg-dark-graphite text-warm-white p-5 rounded-lg overflow-x-auto font-mono text-xs my-6 leading-relaxed shadow-inner">
          <code>{children}</code>
        </pre>
      );
    },
    hr: () => <hr className="border-border-soft my-8" />,
    a: ({ href, children }) => (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-accent-terracotta hover:underline font-medium transition-all duration-200"
      >
        {children}
      </a>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse text-left text-sm font-light border border-border-soft">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => <thead className="bg-border-soft/40 border-b border-border-soft font-semibold">{children}</thead>,
    tbody: ({ children }) => <tbody className="divide-y divide-border-soft">{children}</tbody>,
    tr: ({ children }) => <tr>{children}</tr>,
    th: ({ children }) => <th className="px-4 py-3">{children}</th>,
    td: ({ children }) => <td className="px-4 py-3 text-muted-gray">{children}</td>,
  };

  return (
    <div className="markdown-body">
      <ReactMarkdown components={renderers}>{content}</ReactMarkdown>
    </div>
  );
}
