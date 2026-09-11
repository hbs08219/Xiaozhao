import { useState } from 'react';
import type { LinkRef } from '../types';
import { parseLink } from '../lib/links';

export default function LinkChip({ link }: { link: LinkRef }) {
  const info = parseLink(link);
  const [open, setOpen] = useState(false);

  if (info.isVideo) {
    return (
      <div className="link-video">
        <button type="button" className="link-btn" onClick={() => setOpen((v) => !v)}>
          <span className="play-icon">▶</span>
          <span className="link-label">{info.label}</span>
          <span className="link-toggle">{open ? '收起' : '播放'}</span>
        </button>
        {open && info.embedUrl && (
          <div className="video-wrap">
            <iframe
              src={info.embedUrl}
              title={info.label}
              frameBorder="0"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <a className="link-ext" href={info.url} target="_blank" rel="noopener noreferrer">
      {info.thumb && <img className="link-thumb" src={info.thumb} alt={info.label} loading="lazy" />}
      <span className="link-badge" style={{ background: info.color }}>
        {info.brandName}
      </span>
      <span className="link-label">{link.label || info.domain}</span>
      <span className="link-arrow">↗</span>
    </a>
  );
}
