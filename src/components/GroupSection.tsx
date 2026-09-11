import type { OptionGroup } from '../types';
import { useStore } from '../store';
import OptionCard from './OptionCard';

interface Props {
  page: string;
  group: OptionGroup;
}

export default function GroupSection({ page, group }: Props) {
  const store = useStore();
  const decided = group.options.filter(
    (o) => store.get(`${page}/${o.id}`)?.status === 'decided',
  ).length;

  return (
    <section className="group">
      <header className="group-head">
        <h2>{group.title}</h2>
        <span className="group-count">
          {group.options.length} 项 · 已{group.labels?.decided ?? '定'} {decided}
        </span>
      </header>
      {group.intro && <p className="group-intro">{group.intro}</p>}
      <div className="card-grid">
        {group.options.map((o) => (
          <OptionCard page={page} group={group} opt={o} key={o.id} />
        ))}
      </div>
    </section>
  );
}
