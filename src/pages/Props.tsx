import { PROP_GROUPS } from '../data/props';
import GroupSection from '../components/GroupSection';
import PageHead from '../components/PageHead';
import SyncBar from '../components/SyncBar';

export default function Props() {
  return (
    <>
      <PageHead title="道具" desc="要买、要租、要准备的东西。状态是「待买 / 已买 / 不需要」。" />
      {PROP_GROUPS.map((g) => (
        <GroupSection page="props" group={g} key={g.id} />
      ))}
      <SyncBar />
    </>
  );
}
