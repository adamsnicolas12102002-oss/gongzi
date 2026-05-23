const TOPICS = {
  "gongzi-bugouyong": {
    title: "工资为什么不够用",
    subtitle: "不是你太能花，很多时候是固定支出太高、隐形消费太碎、预算没有按周拆开。",
    answer: "工资不够用，通常不是某一笔大钱的问题，而是房租、吃饭、通勤、分期、充值这些支出同时发生。只看余额会焦虑，拆成固定支出和可变支出才看得清。",
    causes: ["房租超过月薪三分之一，开局压力就很大", "小额消费频率太高，奶茶外卖打车累积很快", "花呗和信用卡把上个月的消费挪到这个月还"],
    actions: ["先把房租、通勤、吃饭列成固定账单", "把剩余金额除以 4，按周设置生活费", "非必要充值和会员先停一个月"],
    keyword: "工资为什么不够用"
  },
  "gongzi-qunale": {
    title: "工资去哪了",
    subtitle: "工资不是突然消失的，它通常分散在房租、吃饭、通勤、人情、分期和情绪消费里。",
    answer: "最有效的办法不是回忆，而是把钱分成三类：生存钱、债务钱、快乐钱。你会发现真正可控的是快乐钱，但最伤的是债务钱。",
    causes: ["固定账单自动扣款太多", "外卖、便利店、打车没有单独统计", "工资到账后先消费，月底才记账"],
    actions: ["发工资当天先扣掉固定支出", "每天只记录消费类型，不必写长账", "月底看前三大支出，下一月只改一个"],
    keyword: "工资去哪了"
  },
  "yuexin-duoshao-bujiaolv": {
    title: "月薪多少不焦虑",
    subtitle: "不焦虑的重点不只是收入，而是结余稳定、应急金够、房租比例低。",
    answer: "月薪多少不焦虑没有统一答案。更实用的标准是：房租低于 30%，每月能存下 15% 到 25%，并且有 3 个月生活费应急金。",
    causes: ["收入上涨但消费也同步上涨", "没有应急金，任何意外都会变成焦虑", "月末余额不稳定，安全感很低"],
    actions: ["先攒 1 个月生活费，再谈投资", "把房租比例压到 30% 左右", "每月固定转出一笔存款，当作不可花的钱"],
    keyword: "月薪多少不焦虑"
  },
  "gongzi-gangfa-jiumeile": {
    title: "工资刚发就没了",
    subtitle: "这不是错觉，工资日往往也是账单集中清算日。",
    answer: "工资刚发就没了，多半是因为房租、信用卡、花呗、会员、上月欠款在同一时间扣除。看起来像工资没了，本质是上个月的生活在今天结账。",
    causes: ["账单日集中在发薪日前后", "上月提前消费，本月工资还债", "没有把必要支出和可选支出分开"],
    actions: ["把账单日改到工资日后 3 到 5 天", "发薪当天先做预算，不先消费", "给快乐消费设一个月封顶金额"],
    keyword: "工资刚发就没了"
  },
  "nianqingren-zhenshi-xiaofei": {
    title: "年轻人真实消费",
    subtitle: "真实消费里，最大头通常不是奢侈品，而是生活成本和情绪恢复成本。",
    answer: "年轻人的消费结构常见是房租吃掉一大块，外卖和通勤吃掉一块，剩下的钱被社交、宠物、游戏、会员、医美或数码分期切走。",
    causes: ["工作压力高，情绪消费更频繁", "独居成本高，做饭和囤货难坚持", "社交平台放大了消费比较"],
    actions: ["保留小额快乐预算，不靠硬忍", "每周做两顿饭，先从低门槛开始", "减少分期，分期会让真实消费失真"],
    keyword: "年轻人真实消费"
  },
  "yueguangzu-jisuanqi": {
    title: "月光族计算器",
    subtitle: "输入月薪和支出，就能知道自己离月光还有多近。",
    answer: "月光族不是存不下钱这么简单，而是收入和支出刚好咬死。只要固定支出过高，工资再涨也容易继续月光。",
    causes: ["固定支出高，结余空间小", "没有按周预算，前半月花太快", "消费靠感觉，不看剩余天数"],
    actions: ["用首页计算器先算结余和破产概率", "把结余拆成储蓄和生活费", "每周只看一次预算，不天天自责"],
    keyword: "月光族计算器"
  },
  "qionggui-ceshi": {
    title: "穷鬼测试",
    subtitle: "穷鬼不是身份，是一种月底余额发出的警报。",
    answer: "如果你经常工资到账很开心、还完账单很安静、月底开始搜优惠券，那你很可能已经进入穷鬼预警状态。",
    causes: ["账单比快乐先到", "结余不足以覆盖突发情况", "消费后经常产生负罪感"],
    actions: ["先算本月还能活几天", "删掉一个最容易冲动消费的入口", "把人生信条改成先活下来再谈理想"],
    keyword: "穷鬼测试"
  },
  "gongzi-gangfawan-weishenme-meile": {
    title: "工资刚发完为什么就没了？",
    subtitle: "因为工资不是从 0 开始花，而是先偿还上个月的生活。",
    answer: "你以为发工资是新开始，但系统里早就排着房租、信用卡、花呗、会员、上月外卖和分期。工资刚发完就没了，本质是现金流被提前消费占满。",
    causes: ["提前消费太多", "固定扣款没有集中管理", "没有预留当月基础生活费"],
    actions: ["先留 30 天吃饭通勤钱", "把花呗和信用卡还款设为单独预算", "当月新增分期尽量为 0"],
    keyword: "工资刚发完为什么就没了？"
  },
  "yuexin-yiwan-weishenme-jiaolv": {
    title: "月薪一万为什么还是焦虑？",
    subtitle: "一万不等于轻松，城市、房租、家庭责任和欲望都会改变答案。",
    answer: "月薪一万仍然焦虑，常见原因是生活成本也在一万附近。尤其在一线城市，房租、通勤、社交、储蓄目标叠加后，剩余现金并不宽裕。",
    causes: ["收入变高后消费标准也变高", "房租和社交成本明显上升", "有存钱目标但每月结余不稳定"],
    actions: ["先确认每月真实结余，而不是只看收入", "给社交和外卖设上限", "把存钱目标拆成小额自动转入"],
    keyword: "月薪一万为什么还是焦虑？"
  },
  "yuexin-5000-zenmehuo": {
    title: "月薪5000怎么活",
    subtitle: "核心是压固定成本，别让房租和通勤把预算提前吃光。",
    answer: "月薪 5000 想活得稳，房租最好控制在 1500 左右，吃饭尽量按周预算，花呗和充值要严格封顶。",
    causes: ["房租一高，剩余空间立刻变小", "外卖频率高会迅速吃掉结余", "小额娱乐没有上限"],
    actions: ["房租尽量不超过 1500", "每周生活费先定 500 到 650", "奶茶、游戏、会员合计设一个上限"],
    keyword: "月薪5000怎么活"
  },
  "yuexin-8000-zhenshi-shenghuo": {
    title: "月薪8000真实生活",
    subtitle: "看起来够，但房租、吃饭、通勤和账单加起来后，余地可能并不大。",
    answer: "月薪 8000 的真实生活，通常是能覆盖基本开销，但想稳定存钱需要控制外卖、分期和冲动消费。",
    causes: ["房租 2500 到 3500 会占掉大头", "日常外卖和咖啡让预算变松散", "偶发大件会打乱整月节奏"],
    actions: ["固定支出控制在 5000 内", "每月先存 800 到 1500", "给大件消费单独攒钱，不临时刷"],
    keyword: "月薪8000真实生活"
  },
  "yuexin-1wan-gouhuama": {
    title: "月薪1万够花吗",
    subtitle: "够不够花，取决于城市和房租，而不是只看一万这个数字。",
    answer: "月薪 1 万在低房租城市会轻松很多，在高房租城市则可能只是刚好体面。判断够不够，要看扣除房租和固定账单后还剩多少。",
    causes: ["不同城市生活成本差异很大", "房租比例决定体感宽松度", "存钱目标越高，越觉得不够花"],
    actions: ["先算房租占比", "把固定支出压到月薪 60% 以下", "每月保留 10% 到 20% 的储蓄"],
    keyword: "月薪1万够花吗"
  },
  "yuexin-duoshao-goushenghuo": {
    title: "月薪多少才够生活",
    subtitle: "够生活的标准是能支付基本开销、偶尔快乐、还能留一点安全感。",
    answer: "月薪多少才够生活，要按城市算。一个通用判断是：房租、吃饭、通勤、账单加起来后，至少还能剩下月薪的 15%。",
    causes: ["只看收入，不看城市成本", "没有把储蓄也当作生活成本", "忽略医疗、人情和突发支出"],
    actions: ["列出城市最低生活成本", "把储蓄写进预算", "给突发支出留一个小缓冲"],
    keyword: "月薪多少才够生活"
  },
  "dagongren-shengcun-zhinan": {
    title: "打工人生存指南",
    subtitle: "先活稳，再存钱，再升级生活。顺序错了就容易焦虑。",
    answer: "打工人生存的核心不是极限省钱，而是建立一套不会把自己逼崩的预算系统。",
    causes: ["只靠意志力省钱，很难长期坚持", "没有区分必要开销和情绪开销", "工资日太放松，月底太紧张"],
    actions: ["发薪日先分配：房租、吃饭、储蓄、快乐", "每周复盘一次，不每天审判自己", "允许小快乐，但必须有上限"],
    keyword: "打工人生存指南"
  },
  "dagongren-yigeyue-kaixiao": {
    title: "打工人一个月开销",
    subtitle: "一个月开销通常由房租、吃饭、通勤、账单、娱乐和意外支出组成。",
    answer: "打工人一个月开销最该看的不是总额，而是结构。房租太高、吃饭太散、账单太多，都会让工资很快消失。",
    causes: ["固定支出没有压住", "吃饭通勤每天都小额流血", "宠物、游戏、会员等支出没有上限"],
    actions: ["先统计六大类：房租、通勤、吃饭、花呗、宠物、游戏", "找出前三大支出", "每月只优化最大的一项"],
    keyword: "打工人一个月开销"
  }
};

function getStoredBudget() {
  try {
    const saved = JSON.parse(localStorage.getItem("worker-survival-calculator:v1"));
    const salary = Number(saved?.salary) || 8000;
    const expenses = { rent: 3000, commute: 500, food: 1500, credit: 800, pet: 300, game: 400, ...(saved?.expenses || {}) };
    const total = Object.values(expenses).reduce((sum, value) => sum + Number(value || 0), 0);
    const leftover = salary - total;
    const risk = Math.min(99, Math.max(0, Math.round((total / salary) * 72 + (expenses.rent / salary) * 26 + (leftover < 0 ? 22 : 0))));
    return { salary, total, leftover, risk };
  } catch {
    return { salary: 8000, total: 6500, leftover: 1500, risk: 68 };
  }
}

function yuan(value) {
  return `${Math.round(value).toLocaleString("zh-CN")}元`;
}

const topic = TOPICS[window.TOPIC_ID] || TOPICS["gongzi-bugouyong"];
const budget = getStoredBudget();

document.title = `${topic.title} - 打工人生存计算器`;
document.querySelector("#topicTitle").textContent = topic.title;
document.querySelector("#topicSubtitle").textContent = topic.subtitle;
document.querySelector("#topicAnswer").textContent = topic.answer;
document.querySelector("#metricSalary").textContent = yuan(budget.salary);
document.querySelector("#metricLeftover").textContent = yuan(budget.leftover);
document.querySelector("#metricRisk").textContent = `${budget.risk}%`;
document.querySelector("#causeList").innerHTML = topic.causes.map((item) => `<li>${item}</li>`).join("");
document.querySelector("#actionList").innerHTML = topic.actions.map((item) => `<li>${item}</li>`).join("");
document.querySelector("#plainKeyword").textContent = topic.keyword;
