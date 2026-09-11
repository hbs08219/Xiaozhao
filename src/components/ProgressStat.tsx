import type { OptionGroup } from '../types';
import { useStore } from '../store';

export default function ProgressStat({ page, groups }: { page: string; groups: OptionGroup[] }) {
  const store = useStore();
  let total = 0;
  let decided = 0;
  let dropped = 0;
  for (const g of groups) {
    for (const o of g.options) {
      total++;
      const status = store.get(`${page}/${o.id}`)?.status;
      if (status === 'decided') decided++;
      if (status === 'dropped') dropped++;
    }
  }
  const pct = total ? Math.round((decided / total) * 100) : 0;

  return (
    <div className="entry-stat">
      <div className="bar">
        <div className="bar-fill" style={{ width: `${pct}%` }} />
      </div>
      <span>
        已定 {decided} / {total}
        {dropped > 0 ? ` · 放弃 ${dropped}` : ''} <b> {pct}%</b>
      </span>
    </div>
  );
}
