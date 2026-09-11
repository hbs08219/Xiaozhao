export type Status = 'candidate' | 'decided' | 'dropped';

/** 卡片上的外链。thumb 是小红书等平台的封面图（需要服务端抓取后才能拿到）。 */
export interface LinkRef {
  url: string;
  label?: string;
  thumb?: string;
}

/** 一个可选方案 / 一件要准备的东西。字段都可以不填。 */
export interface Option {
  id: string;
  title: string;
  desc?: string;
  qty?: string;
  price?: string;
  pros?: string[];
  cons?: string[];
  note?: string;
  links?: LinkRef[];
}

/** 一组方案。labels 可以覆盖默认的「候选 / 已定 / 放弃」。 */
export interface OptionGroup {
  id: string;
  title: string;
  intro?: string;
  labels?: Partial<Record<Status, string>>;
  options: Option[];
}

/** 流程时间表中的一行。 */
export interface TimelineItem {
  id: string;
  time: string;
  name: string;
  owner?: string;
  note?: string;
}

/** 存在 localStorage 里的单条选择。 */
export interface Choice {
  status: Status;
  comment?: string;
  updatedAt: number;
}

export type ChoiceMap = Record<string, Choice>;
