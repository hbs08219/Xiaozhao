import type { LinkRef } from '../types';

interface SiteMeta {
  kind: string;
  name: string;
  color: string;
}

/** 域名 -> 平台展示信息（徽标文字 + 主题色）。想加新平台就往这里加一条。 */
const SITES: Record<string, SiteMeta> = {
  'bilibili.com': { kind: 'bilibili', name: '哔哩哔哩', color: '#FB7299' },
  'b23.tv': { kind: 'bilibili', name: '哔哩哔哩', color: '#FB7299' },
  'youtube.com': { kind: 'youtube', name: 'YouTube', color: '#FF0000' },
  'youtu.be': { kind: 'youtube', name: 'YouTube', color: '#FF0000' },
  'xiaohongshu.com': { kind: 'xiaohongshu', name: '小红书', color: '#FF2442' },
  'xhslink.com': { kind: 'xiaohongshu', name: '小红书', color: '#FF2442' },
  'meituan.com': { kind: 'meituan', name: '美团', color: '#FFC300' },
  'jd.com': { kind: 'jd', name: '京东', color: '#E1251B' },
  'taobao.com': { kind: 'taobao', name: '淘宝', color: '#FF5000' },
  'tmall.com': { kind: 'taobao', name: '天猫', color: '#FF0036' },
  'douyin.com': { kind: 'douyin', name: '抖音', color: '#161823' },
  'weibo.com': { kind: 'weibo', name: '微博', color: '#E6162D' },
};

const FALLBACK: SiteMeta = { kind: 'generic', name: '链接', color: '#8b7d72' };

function hostKey(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '').toLowerCase();
  } catch {
    return '';
  }
}

function domainOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

function bvidOf(url: string): string | null {
  const bv = url.match(/BV[0-9A-Za-z]{10}/);
  if (bv) return bv[0];
  const av = url.match(/av(\d+)/);
  return av ? av[0] : null;
}

function youtubeIdOf(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|v=)([\w-]{11})/);
  return m ? m[1] : null;
}

export interface LinkInfo {
  kind: string;
  isVideo: boolean;
  label: string;
  brandName: string;
  domain: string;
  color: string;
  url: string;
  thumb?: string;
  embedUrl?: string;
}

/** 把一个 link 解析成「怎么展示」：是内嵌视频还是外链卡片。 */
export function parseLink(link: LinkRef): LinkInfo {
  const key = hostKey(link.url);
  const site = SITES[key] ?? FALLBACK;
  const base: LinkInfo = {
    kind: site.kind,
    isVideo: false,
    label: link.label || site.name,
    brandName: site.name,
    domain: domainOf(link.url),
    color: site.color,
    url: link.url,
    thumb: link.thumb,
  };

  if (site.kind === 'bilibili') {
    const bvid = bvidOf(link.url);
    if (bvid) {
      return {
        ...base,
        isVideo: true,
        label: link.label || '哔哩哔哩视频',
        embedUrl: `https://player.bilibili.com/player.html?bvid=${bvid}&page=1&autoplay=0&danmaku=0&high_quality=1`,
      };
    }
    return base;
  }

  if (site.kind === 'youtube') {
    const vid = youtubeIdOf(link.url);
    if (vid) {
      return {
        ...base,
        isVideo: true,
        label: link.label || 'YouTube 视频',
        embedUrl: `https://www.youtube.com/embed/${vid}`,
      };
    }
    return base;
  }

  if (/\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(link.url)) {
    return { ...base, kind: 'mp4', isVideo: true, label: link.label || '视频', embedUrl: link.url };
  }

  return base;
}
