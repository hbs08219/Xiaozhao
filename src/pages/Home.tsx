import { Link } from 'react-router-dom';
import { CEREMONY_GROUPS } from '../data/ceremony';
import { GIFT_GROUPS } from '../data/gifts';
import { PROP_GROUPS } from '../data/props';
import type { OptionGroup } from '../types';
import ProgressStat from '../components/ProgressStat';
import SyncBar from '../components/SyncBar';

const ENTRIES: { to: string; title: string; desc: string; page: string; groups: OptionGroup[] }[] = [
  {
    to: '/ceremony',
    title: '仪式',
    desc: '订婚与婚礼的整体方案，以及各环节流程时间表',
    page: 'ceremony',
    groups: CEREMONY_GROUPS,
  },
  {
    to: '/gifts',
    title: '彩礼',
    desc: '彩礼金额、彩礼盒、订婚戒、对戒、三金、改口费',
    page: 'gifts',
    groups: GIFT_GROUPS,
  },
  {
    to: '/props',
    title: '道具',
    desc: '迎亲、布置、服饰、伴手礼、摄影摄像等要准备的东西',
    page: 'props',
    groups: PROP_GROUPS,
  },
];

export default function Home() {
  return (
    <>
      <div className="hero">
        <h1>备婚手册</h1>
        <p>
          我们一起把要定的事定下来。每个方案可以标成「候选 / 已定 / 放弃」，
          还能写备注 —— 商量好了就点一下，心里有数。
        </p>
      </div>
      <div className="entry-grid">
        {ENTRIES.map((e) => (
          <Link to={e.to} className="entry-card" key={e.to}>
            <h2>{e.title}</h2>
            <p>{e.desc}</p>
            <ProgressStat page={e.page} groups={e.groups} />
          </Link>
        ))}
      </div>
      <SyncBar />
    </>
  );
}
