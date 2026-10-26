import type { ReactNode } from "react";
import { Link } from "react-router-dom";

// Styled building blocks for guide pages, matching the FAQ and Return Your Box pages.

export const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-12 mb-4">{children}</h2>
);

export const P = ({ children }: { children: ReactNode }) => (
  <p className="font-body text-muted-foreground leading-relaxed mb-4">{children}</p>
);

export const Lead = ({ children }: { children: ReactNode }) => (
  <p className="font-body text-lg text-foreground leading-relaxed mb-4">{children}</p>
);

export const UL = ({ items }: { items: ReactNode[] }) => (
  <ul className="font-body text-muted-foreground leading-relaxed mb-4 list-disc pl-6 space-y-1">
    {items.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
);

export const Table = ({ head, rows }: { head: string[]; rows: ReactNode[][] }) => (
  <div className="overflow-x-auto mb-4">
    <table className="w-full font-body text-sm text-left border-collapse">
      <thead>
        <tr className="border-b-2 border-border">
          {head.map((h) => (
            <th key={h} className="py-2 pr-4 font-semibold text-foreground">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-b border-border">
            {row.map((cell, j) => (
              <td key={j} className="py-2 pr-4 text-muted-foreground align-top">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const A = ({ to, children }: { to: string; children: ReactNode }) =>
  to.startsWith("mailto:") ? (
    <a href={to} className="text-barn-red hover:underline">
      {children}
    </a>
  ) : (
    <Link to={to} className="text-barn-red hover:underline">
      {children}
    </Link>
  );
