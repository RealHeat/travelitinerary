/* =========================================================================
   SHARED UI COMPONENTS
   ---------------------------------------------------------------------------
   Small presentational building blocks used by every page.
   ========================================================================= */

import type { ReactNode } from 'react';
import type { CostLine, ImageRef } from '../types';

/* The header block at the top of a country page. */
export function PageHeader({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <header className="pagehead">
      <p className="pagehead__eyebrow">
        <span className="dot" />
        {eyebrow}
      </p>
      <h1 className="pagehead__title">{title}</h1>
      {sub ? <p className="pagehead__sub">{sub}</p> : null}
    </header>
  );
}

/* A numbered section with a title and a hairline rule. Wrapped in .reveal
   so the scroll-reveal observer animates it in. */
export function Section({
  num,
  title,
  children,
}: {
  num?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="section reveal">
      <div className="section__head">
        {num ? <span className="section__num">{num}</span> : null}
        <h2 className="section-title">{title}</h2>
        <span className="section__rule" />
      </div>
      {children}
    </section>
  );
}

/* A labeled fact row. */
export function Field({
  label,
  hint,
  value,
}: {
  label: string;
  hint?: string;
  value: string;
}) {
  return (
    <div className="field">
      <div className="field__label">
        {label}
        {hint ? <span className="field__hint">{hint}</span> : null}
      </div>
      <div className="field__value">{value}</div>
    </div>
  );
}

/* Wraps a group of <Field> rows. */
export function Fields({ children }: { children: ReactNode }) {
  return <div className="fields">{children}</div>;
}

/* A single line item with an optional cost (used for activities & food). */
export function Item({ text, cost }: { text: string; cost?: string }) {
  return (
    <div className="item">
      <span className="item__bullet">◦</span>
      <span className="item__text">{text}</span>
      {cost ? (
        <span className="item__cost">
          cost {cost}
        </span>
      ) : null}
    </div>
  );
}

export function Items({ children }: { children: ReactNode }) {
  return <div className="items">{children}</div>;
}

/* An image. If `image.src` is set it renders a real <img>; otherwise it shows
   the dashed placeholder slot tagged with `tag`. */
export function ImageSlot({ tag, image }: { tag: string; image?: ImageRef }) {
  if (image?.src) {
    return (
      <div className="imageslot imageslot--filled">
        <img className="imageslot__img" src={image.src} alt={image.caption || tag} />
      </div>
    );
  }
  return (
    <div className="imageslot">
      <span className="imageslot__tag">{tag}</span>
      {image?.note ? <span className="imageslot__note">{image.note}</span> : null}
    </div>
  );
}

/* The cost-summary table. */
export function CostTable({ rows, total }: { rows: CostLine[]; total: CostLine }) {
  return (
    <table className="costtable">
      <thead>
        <tr>
          <th>Category</th>
          <th>Cost (USD)</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            <td>{r.label}</td>
            <td>{r.value}</td>
          </tr>
        ))}
        <tr className="total-row">
          <td>{total.label}</td>
          <td>{total.value}</td>
        </tr>
      </tbody>
    </table>
  );
}

/* A journal text block. */
export function Journal({ children }: { children: ReactNode }) {
  return (
    <div className="journal">
      <p>{children}</p>
    </div>
  );
}
