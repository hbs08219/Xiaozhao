import { GIFT_GROUPS } from '../data/gifts';
import GroupSection from '../components/GroupSection';
import PageHead from '../components/PageHead';
import SyncBar from '../components/SyncBar';

export default function Gifts() {
  return (
    <>
      <PageHead title="彩礼" desc="彩礼、彩礼盒、订婚戒、对戒、三金、改口。金额是示例，按两家商量结果改。" />
      {GIFT_GROUPS.map((g) => (
        <GroupSection page="gifts" group={g} key={g.id} />
      ))}
      <SyncBar />
    </>
  );
}
