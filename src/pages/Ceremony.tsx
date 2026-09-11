import { CEREMONY_GROUPS, ENGAGEMENT_TIMELINE, WEDDING_TIMELINE } from '../data/ceremony';
import GroupSection from '../components/GroupSection';
import PageHead from '../components/PageHead';
import SyncBar from '../components/SyncBar';
import Timeline from '../components/Timeline';

export default function Ceremony() {
  return (
    <>
      <PageHead title="仪式" desc="订婚与婚礼办成什么样，先在这里定大方向。" />
      {CEREMONY_GROUPS.map((g) => (
        <GroupSection page="ceremony" group={g} key={g.id} />
      ))}
      <Timeline title="订婚当天流程" items={ENGAGEMENT_TIMELINE} />
      <Timeline title="婚礼当天流程" items={WEDDING_TIMELINE} />
      <SyncBar />
    </>
  );
}
