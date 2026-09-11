import type { TimelineItem } from '../types';

export default function Timeline({ title, items }: { title: string; items: TimelineItem[] }) {
  return (
    <section className="group">
      <header className="group-head">
        <h2>{title}</h2>
        <span className="group-count">{items.length} 个环节</span>
      </header>
      <ol className="timeline">
        {items.map((it) => (
          <li key={it.id}>
            <span className="time">{it.time}</span>
            <span className="tl-name">{it.name}</span>
            {it.owner && <span className="tl-owner">{it.owner}</span>}
            {it.note && <span className="tl-note">{it.note}</span>}
          </li>
        ))}
      </ol>
    </section>
  );
}
