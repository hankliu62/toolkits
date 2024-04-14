import fetch from "isomorphic-fetch";

const ChickenSoup = [
  "大家都以为我没有朋友，事实上，我还真没有朋友。",
  "好看的皮囊与你无关，有趣的灵魂你又没有。",
  "骑电动车请戴好头盔，否则，开奔驰的同学会认出你。",
  "人丑就要多健身，这样就能在别人说你丑时，你可以揍他。",
  "今晚吃鱼吧，我看你挺会挑刺的。",
  "狗是人类最好的朋友。然而狗最好的朋友是「屎」。",
  "你打起精神，3分钟就能做完的事情，打起精神就要花上3小时。",
  "工作爱情生活不顺？多照照镜子，很多事情你就明白了。",
  "贫穷限制了我那么多，为什么没有限制我的体重？",
  "手机摔了这么多次都没事，想想还是我的身高救了它。",
  "骑白马的不一定是王子，也可能会是是唐僧！",
  "有一天你会遇到一个妹子，她不要你的房也不要你的车，她也不要你。",
  "生活把我逼得像个汉子；如何叫我再去小鸟依人。",
  "不要放弃你的梦，继续睡！",
  "没人善待我，我自己善待我自己。",
  "在出租车内疯狂放臭屁，可以极大的降低，司机带你绕路的概率。",
  "如果你放弃了今天的自己，你就战胜了明天的你。",
  "你努力后的成功，不能弥补你成功前的痛苦。",
  "没有人瞧不起你，因为根本就没有人瞧你。",
  "我意识到，要快乐其实很容易，唯一需要做的就是停止欺骗自己。",
  "只要是石头，到哪里都不会发光。",
  "年轻人嘛，现在没钱算什么，以后没钱的日子还多着呢。",
  "女人假装高潮来维持恋爱，而男人假装恋爱以获得高潮。",
  "你要相信明天，一定会更好的，更好的把你虐成狗。",
  "一见钟情就是好看，深思熟虑就是没钱。",
  "不想谈恋爱是假的，没人要是真的。",
  "富豪们都在担心税太多，而你只会觉得睡不够！",
  "积极的人在每一次忧患中都看到一个机会，而消极的人则在每个机会都看到某种忧患。",
];

/**
 * 获取毒鸡汤
 *
 * @returns
 */
export const fetchChickenSoup = async (): Promise<string> => {
  return fetch(
    `https://apis.tianapi.com/dujitang/index?key=${process.env.TIANAPI_KEY}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      ChickenSoup.push(data.result.content);
      return data.result.content;
    })
    .catch((error) => {
      console.log(error);

      return ChickenSoup.sort(() => Math.random() - 0.5)[0];
    });
};

/**
 * 获取毒鸡汤
 *
 * @returns
 */
export const fetchChickenSoupByMxnzp = async (): Promise<string> => {
  return fetch(
    `https://www.mxnzp.com/api/daily_word/recommend?count=1&app_id=${process.env.MXNZPAPI_KEY}&app_secret=${process.env.MXNZPAPI_SECRET}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      ChickenSoup.push(data.data[0].content);
      return data.data[0].content;
    })
    .catch((error) => {
      console.log(error);

      return ChickenSoup.sort(() => Math.random() - 0.5)[0];
    });
};
