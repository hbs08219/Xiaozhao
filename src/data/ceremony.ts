import type { OptionGroup, TimelineItem } from '../types';
export const CEREMONY_GROUPS: OptionGroup[] = [
  {
    id: 'engagement',
    title: '订婚方案',
    intro: '先定下「要不要办、办多大」，再谈细节。',
    options: [
      {
        id: 'eng-traditional',
        title: '传统订婚宴',
        desc: '双方父母及近亲到场，摆 3-5 桌，走敬茶、交换信物流程。',
        price: '1.5 万 - 3 万',
        pros: ['长辈最有面子，仪式感足', '彩礼 / 三金一次性过场，流程清爽'],
        cons: ['要协调两家人的时间与口味', '筹备成本不低'],
        note: '酒店包厢起订桌数和低消要提前问清楚。',
        links: [
          {
            url: 'https://www.xiaohongshu.com/discovery/item/6a69c2250000000010029cba?source=webshare&xhsshare=pc_web&xsec_token=AB2OxfdJZ-VXnx_YizH8-MMvtUX6lxpzm81t5LGeyPdmY=&xsec_source=pc_share',
            label: '七夕求婚攻略 · 四大品牌钻戒款式合集',
            thumb: 'https://sns-webpic-qc.xhscdn.com/202609102327/a68bc802a72d0c749dcccc189e0c8371/notes_pre_post/1040g3k83236v61arno005opu9h44kiagsetkktg!nd_dft_wlteh_jpg_3',
          },
        ],
      },
      {
        id: 'eng-simple',
        title: '简约订婚仪式',
        desc: '只请双方父母和兄弟姐妹，在家中或餐厅单间完成敬茶改口。',
        price: '3000 - 8000 元',
        pros: ['省钱省事，气氛更亲密', '改口环节不尴尬'],
        cons: ['远房亲戚可能会有意见', '仪式感偏弱'],
        note: '适合两家已经很熟、不想铺张的情况。',
      },
      {
        id: 'eng-travel',
        title: '旅行订婚',
        desc: '两人（或带上双方父母）去外地 / 国外，在旅途中完成订婚。',
        price: '1.5 万 - 4 万',
        pros: ['体验独特，照片好看', '避开亲戚琐事'],
        cons: ['长辈参与度低', '请假和签证成本'],
        note: '要和双方父母提前沟通，避免「偷偷领证」的误会。',
      },
      {
        id: 'eng-none',
        title: '不办订婚，直接领证',
        desc: '跳过订婚环节，把预算全部留给婚礼和婚后。',
        price: '0 元',
        pros: ['最省事，零内耗', '预算集中'],
        cons: ['部分长辈期待落空', '彩礼 / 三金需另找场合过'],
        note: '如果选这个，彩礼和改口建议安排在婚前一次家宴上完成。',
      },
    ],
  },
  {
    id: 'wedding',
    title: '婚礼方案',
    intro: '大方向先选一个，桌数、场地、预算都基于它展开。',
    options: [
      {
        id: 'wed-hotel',
        title: '酒店宴会厅（中式）',
        desc: '市区星级酒店宴会厅，20 桌左右，含司仪、布置、四大金刚。',
        price: '15 万 - 25 万',
        pros: ['流程成熟，抗天气风险', '长辈接受度最高'],
        cons: ['同质化严重', '酒店档期紧张，热门日子要抢'],
        note: '问清是否含婚庆进场费、超时费、开瓶费。',
      },
      {
        id: 'wed-lawn',
        title: '户外草坪仪式 + 室内宴会',
        desc: '下午草坪证婚，晚上转室内宴席。',
        price: '12 万 - 20 万',
        pros: ['白天光线好，出片率高', '氛围轻松'],
        cons: ['看天吃饭，需备雨天方案', '长辈走动不便'],
        note: '务必确认草坪备用方案和帐篷费用。',
        links: [
          { url: 'https://www.bilibili.com/video/BV1GJ411x7h7', label: '示例视频（可换成你们的备婚视频）' },
          { url: 'https://www.xiaohongshu.com/search_result?keyword=草坪婚礼', label: '草坪婚礼案例合集' },
        ],
      },
      {
        id: 'wed-destination',
        title: '目的地婚礼',
        desc: '三亚 / 大理 / 海外， invitation-only，只请至亲好友。',
        price: '8 万 - 15 万（亲友差旅另算）',
        pros: ['小而美，压力小', '顺便度蜜月'],
        cons: ['到场人数不可控', '长辈和远亲难兼顾'],
        note: '回来后通常还要办一场答谢宴，预算要算两次。',
      },
      {
        id: 'wed-small',
        title: '小型家宴',
        desc: '10 桌以内，只请至亲，重吃饭轻流程。',
        price: '5 万 - 8 万',
        pros: ['预算可控，最轻松', '能和每桌都聊上'],
        cons: ['大场面感弱', '同事朋友难以全覆盖'],
        note: '可以分两场：家宴 + 年轻人场。',
      },
    ],
  },
];

export const ENGAGEMENT_TIMELINE: TimelineItem[] = [
  { id: 'e1', note: '带齐彩礼盒、三金、鲜花', time: '10:00', name: '男方出发', owner: '新郎' },
  { id: 'e2', note: '', time: '10:40', name: '抵达女方家 / 酒店包厢', owner: '双方' },
  { id: 'e3', note: '', time: '11:00', name: '见面寒暄、入席', owner: '双方父母' },
  { id: 'e4', note: '改口费提前准备好红包', time: '11:20', name: '敬茶改口', owner: '新郎新娘' },
  { id: 'e5', note: '', time: '11:40', name: '交换订婚戒指 / 三金', owner: '双方' },
  { id: 'e6', note: '', time: '12:00', name: '开席', owner: '' },
  { id: 'e7', note: '', time: '13:30', name: '合影、送客', owner: '' },
];

export const WEDDING_TIMELINE: TimelineItem[] = [
  { id: 'w1', note: '提前 1 个月试妆', time: '05:30', name: '新娘起床化妆', owner: '新娘 + 跟妆' },
  { id: 'w2', note: '婚车提前一晚装饰', time: '07:00', name: '新郎出发迎亲', owner: '新郎 + 伴郎' },
  { id: 'w3', note: '游戏控制在 20 分钟内', time: '08:00', name: '抵达、堵门游戏', owner: '伴娘团' },
  { id: 'w4', note: '', time: '08:30', name: '找婚鞋、献手捧花', owner: '新郎' },
  { id: 'w5', note: '准备茶具和跪垫', time: '08:45', name: '敬茶改口', owner: '双方父母' },
  { id: 'w6', note: '留足堵车余量', time: '09:20', name: '出发前往仪式场地', owner: '' },
  { id: 'w7', note: '签到台、伴手礼到位', time: '10:20', name: '迎宾、签到', owner: '伴郎伴娘' },
  { id: 'w8', note: '', time: '11:08', name: '宾客入席、灯光就位', owner: '婚庆' },
  { id: 'w9', note: '与酒店确认吉时', time: '11:18', name: '仪式开始（吉时）', owner: '司仪' },
  { id: 'w10', note: '致辞稿提前写好', time: '11:35', name: '交换戒指、致辞', owner: '新人 + 双方家长' },
  { id: 'w11', note: '备好假酒和矿泉水', time: '12:00', name: '开席、逐桌敬酒', owner: '新人' },
  { id: 'w12', note: '', time: '13:30', name: '送客、换装', owner: '' },
  { id: 'w13', note: '提前踩点', time: '14:00', name: '外景拍摄', owner: '摄影摄像' },
];

