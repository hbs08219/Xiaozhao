import { useState } from 'react';
import type { Option, OptionGroup, Status } from '../types';
import { useStore } from '../store';
import LinkChip from './LinkChip';

const STATUSES: Status[] = ['candidate', 'decided', 'dropped'];

const DEFAULT_LABELS: Record<Status, string> = {
  candidate: '候选',
  decided: '已定',
  dropped: '放弃',
};

function labelsOf(group: OptionGroup): Record<Status, string> {
  return { ...DEFAULT_LABELS, ...(group.labels ?? {}) };
}

interface Props {
  page: string;
  group: OptionGroup;
  opt: Option;
}

export default function OptionCard({ page, group, opt }: Props) {
  const store = useStore();
  const key = `${page}/${opt.id}`;
  const choice = store.get(key);
  const status: Status = choice?.status ?? 'candidate';
  const labels = labelsOf(group);
  const [showComment, setShowComment] = useState(Boolean(choice?.comment));

  return (
    <div className={`card card-${status}`}>
      <div className="card-head">
        <h3>{opt.title}</h3>
        <div className="card-metas">
          {opt.qty && <span className="meta-chip">数量 {opt.qty}</span>}
          {opt.price && <span className="meta-chip price">{opt.price}</span>}
        </div>
      </div>

      {opt.desc && <p className="card-desc">{opt.desc}</p>}

      {(opt.pros?.length || opt.cons?.length) ? (
        <ul className="pros-cons">
          {opt.pros?.map((t) => (
            <li className="pro" key={t}>
              {t}
            </li>
          ))}
          {opt.cons?.map((t) => (
            <li className="con" key={t}>
              {t}
            </li>
          ))}
        </ul>
      ) : null}

      {opt.note && <p className="card-note">{opt.note}</p>}

      {opt.links && opt.links.length > 0 && (
        <div className="link-chips">
          {opt.links.map((l, i) => (
            <LinkChip link={l} key={`${l.url}-${i}`} />
          ))}
        </div>
      )}

      <div className="card-actions">
        <div className="status-group">
          {STATUSES.map((s) => (
            <button
              type="button"
              key={s}
              className={`status-btn status-${s} ${status === s ? 'on' : ''}`}
              onClick={() => store.setStatus(key, s)}
              title={status === s ? '再点一次取消' : ''}
            >
              {labels[s]}
            </button>
          ))}
        </div>
        <button type="button" className="link-btn" onClick={() => setShowComment((v) => !v)}>
          {choice?.comment ? '备注 ✓' : '备注'}
        </button>
      </div>

      {showComment && (
        <textarea
          className="comment"
          rows={2}
          placeholder="写点想法，比如「再问问爸妈」「这家要砍价」…"
          value={choice?.comment ?? ''}
          onChange={(e) => store.setComment(key, e.target.value)}
        />
      )}
    </div>
  );
}
