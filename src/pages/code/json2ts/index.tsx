import { CopyOutlined, FileTextOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Input, message } from "antd";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import SplitPane from "react-split-pane";

import Clipboard from "@/components/Clipboard";
import { CodeEditor } from "@/components/CodeEditor";
import JsonToTs from "@/utils/json2ts";
import { getRoutePrefix } from "@/utils/route";

const Demo = {
  url: "https://api.github.com/repos/hankliu62/hankliu62.github.com/issues/80",
  repository_url: "https://api.github.com/repos/hankliu62/hankliu62.github.com",
  labels_url:
    "https://api.github.com/repos/hankliu62/hankliu62.github.com/issues/80/labels{/name}",
  comments_url:
    "https://api.github.com/repos/hankliu62/hankliu62.github.com/issues/80/comments",
  events_url:
    "https://api.github.com/repos/hankliu62/hankliu62.github.com/issues/80/events",
  html_url: "https://github.com/hankliu62/hankliu62.github.com/issues/80",
  id: 2_122_119_498,
  node_id: "I_kwDOBiJZIc5-fPlK",
  number: 80,
  title: "Event Loop",
  user: {
    login: "hankliu62",
    id: 8_088_864,
    node_id: "MDQ6VXNlcjgwODg4NjQ=",
    avatar_url: "https://avatars.githubusercontent.com/u/8088864?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/hankliu62",
    html_url: "https://github.com/hankliu62",
    followers_url: "https://api.github.com/users/hankliu62/followers",
    following_url:
      "https://api.github.com/users/hankliu62/following{/other_user}",
    gists_url: "https://api.github.com/users/hankliu62/gists{/gist_id}",
    starred_url:
      "https://api.github.com/users/hankliu62/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/hankliu62/subscriptions",
    organizations_url: "https://api.github.com/users/hankliu62/orgs",
    repos_url: "https://api.github.com/users/hankliu62/repos",
    events_url: "https://api.github.com/users/hankliu62/events{/privacy}",
    received_events_url:
      "https://api.github.com/users/hankliu62/received_events",
    type: "User",
    site_admin: false,
  },
  labels: [
    {
      id: 6_527_252_877,
      node_id: "LA_kwDOBiJZIc8AAAABhQ35jQ",
      url: "https://api.github.com/repos/hankliu62/hankliu62.github.com/labels/interview%20questions",
      name: "interview questions",
      color: "722ed1",
      default: false,
      description: "面试题",
    },
    {
      id: 6_536_118_829,
      node_id: "LA_kwDOBiJZIc8AAAABhZVCLQ",
      url: "https://api.github.com/repos/hankliu62/hankliu62.github.com/labels/javascript",
      name: "javascript",
      color: "383040",
      default: false,
      description: "面试题-Javascript相关",
    },
  ],
  state: "open",
  locked: false,
  assignee: {
    login: "hankliu62",
    id: 8_088_864,
    node_id: "MDQ6VXNlcjgwODg4NjQ=",
    avatar_url: "https://avatars.githubusercontent.com/u/8088864?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/hankliu62",
    html_url: "https://github.com/hankliu62",
    followers_url: "https://api.github.com/users/hankliu62/followers",
    following_url:
      "https://api.github.com/users/hankliu62/following{/other_user}",
    gists_url: "https://api.github.com/users/hankliu62/gists{/gist_id}",
    starred_url:
      "https://api.github.com/users/hankliu62/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/hankliu62/subscriptions",
    organizations_url: "https://api.github.com/users/hankliu62/orgs",
    repos_url: "https://api.github.com/users/hankliu62/repos",
    events_url: "https://api.github.com/users/hankliu62/events{/privacy}",
    received_events_url:
      "https://api.github.com/users/hankliu62/received_events",
    type: "User",
    site_admin: false,
  },
  assignees: [
    {
      login: "hankliu62",
      id: 8_088_864,
      node_id: "MDQ6VXNlcjgwODg4NjQ=",
      avatar_url: "https://avatars.githubusercontent.com/u/8088864?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/hankliu62",
      html_url: "https://github.com/hankliu62",
      followers_url: "https://api.github.com/users/hankliu62/followers",
      following_url:
        "https://api.github.com/users/hankliu62/following{/other_user}",
      gists_url: "https://api.github.com/users/hankliu62/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/hankliu62/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/hankliu62/subscriptions",
      organizations_url: "https://api.github.com/users/hankliu62/orgs",
      repos_url: "https://api.github.com/users/hankliu62/repos",
      events_url: "https://api.github.com/users/hankliu62/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/hankliu62/received_events",
      type: "User",
      site_admin: false,
    },
  ],
  milestone: null,
  comments: 0,
  created_at: "2024-02-07T03:38:18Z",
  updated_at: "2024-02-09T08:31:19Z",
  closed_at: null,
  author_association: "OWNER",
  active_lock_reason: null,
  body: "Event Loop即事件循环，是指浏览器或者Nodejs解决javascript单线程运行时异步逻辑不会阻塞的一种机制。\r\n\r\nEvent Loop是一个执行模型，不同的运行环境有不同的实现，浏览器和nodejs基于不同的技术实现自己的event loop。\r\n\r\n- 浏览器的Event Loop是在HTML5规范中明确定义。\r\n- Nodejs的Event Loop是libuv实现的。\r\n- libuv已经对Event Loop作出了实现，HTML5规范中只是定义的浏览器中Event Loop的模型，具体的实现交给了浏览器厂商。\r\n\r\n### 宏队列和微队列\r\n\r\n在javascript中，任务被分为两种，一种为宏任务(macrotask)，也称为task，一种为微任务(microtask)，也称为jobs。\r\n\r\n宏任务主要包括:\r\n\r\n- script全部代码\r\n- setTimeout\r\n- setInterval\r\n- setImmediate (Nodejs独有，浏览器暂时不支持，只有IE10支持)\r\n- requestAnimationFrame (浏览器独有)\r\n- I/O\r\n- UI rendering (浏览器独有)\r\n\r\n微任务主要包括:\r\n\r\n- process.nextTick (Nodejs独有)\r\n- Promise\r\n- Object.observe (废弃)\r\n- MutationObserver\r\n\r\n### 浏览器中的Event Loop\r\n\r\nJavascript 有一个主线程 main thread 和 一个调用栈(执行栈) call-stack，所有任务都会被放到调用栈等待主线程的执行。\r\n\r\nJS调用栈采用的是后进先出的规则，当函数执行时，会被添加到调用栈的顶部，当执行栈执行完后，就会从栈顶移除，直到栈内被清空。\r\n\r\nJavascript单线程任务可以分为同步任务和异步任务，同步任务会在调用栈内按照顺序依次被主线程执行，异步任务会在异步任务有了结果后，将注册的回调函数放入任务队列中等待主线程空闲的时候（调用栈被清空的时候），被读取到调用栈内等待主线程的执行\r\n\r\n任务队列 Task Queue, 是先进先出的数据结构。\r\n\r\n![浏览器事件循环的进程模型](https://user-images.githubusercontent.com/8088864/124855609-c2904a00-dfdb-11eb-9138-df80150fa3a3.jpg)\r\n\r\n浏览器Event Loop的具体流程:\r\n\r\n1. 执行全局Javascript的同步代码，可能包含一些同步语句，也可以是异步语句(setTimeout语句不执行回调函数里面的，Promise中.then之前的语句)\r\n2. 全局Javascript执行完毕后，调用栈call-stack会被清空\r\n3. 从微队列microtask queue中取出位于首部的回调函数，放入到调用栈call-stack中执行，执行完毕后从调用栈中删除，microtask queue的长度减1。\r\n4. 继续从微队列microtask queue的队首取出任务，放到调用栈中执行，依次循环往复，直至微任务队列microtask queue中的任务都被调用栈执行完毕。**特别注意，如果在执行微任务microtask过程中，又产生了微任务microtask，新产生的微任务也会追加到微任务队列microtask queue的尾部，新生成的微任务也会在当前周期中被执行完毕。**\r\n5. microtask queue中的任务都被执行完毕后，microtask queue为空队列，调用栈也处于空闲阶段\r\n6. 执行UI rendering\r\n7. 从宏队列macrotask queue的队首取出宏任务，放入调用栈中执行。\r\n8. 执行完后，调用栈为空闲状态\r\n9. 重复 3 - 8 的步骤，直至宏任务队列的任务都被执行完毕。\r\n...\r\n\r\n浏览器Event Loop的3个重点:\r\n\r\n1. 宏队列macrotask queue每次只从中取出一个任务放到调用栈中执行，执行完后去执行微任务队列中的所有任务\r\n2. 微任务队列中的所有任务都会依次取出来执行，只是微任务队列中的任务清空\r\n3. UI rendering 的执行节点在微任务队列执行完毕后，宏任务队列中取出任务执行之前执行\r\n\r\n### NodeJs中的Event Loop\r\n\r\nlibuv结构\r\n\r\n![libuv的事件循环模型](https://user-images.githubusercontent.com/8088864/125010304-d64db600-e098-11eb-824f-de433a12a095.png)\r\n\r\nNodeJs中的宏任务队列和微任务队列\r\n\r\nNodeJs的Event Loop中，执行宏任务队列的回调有6个阶段\r\n\r\n![NodeJS中的宏队列执行回调的6个阶段](https://user-images.githubusercontent.com/8088864/125010342-e9608600-e098-11eb-84e0-70a5bd5f5867.png)\r\n\r\nNode的Event Loop可以分为6个阶段，各个阶段执行的任务如下所示:\r\n\r\n- `timers`: 执行setTimeout和setInterval中到期的callback。\r\n- `I/O callbacks`: 执行几乎所有的回调，除了close callbacks以及timers调度的回调和setImmediate()调度的回调。\r\n- `idle, prepare`: 仅在内部使用。\r\n- `poll`: 最重要的阶段，检索新的I/O事件，在适当的情况下回阻塞在该阶段。\r\n- `check`: 执行setImmediate的callback(setImmediate()会将事件回调插入到事件队列的尾部，主线程和事件队列的任务执行完毕后会立即执行setImmediate中传入的回调函数)。\r\n- `close callbacks`: 执行`close`事件的callback，例如socket.on('close', fn)或则http.server.on('close', fn)等。\r\n\r\nNodeJs中的宏任务队列可以分为下列4个:\r\n\r\n  1. Timers Queue\r\n  2. I/O Callbacks Queue\r\n  3. Check Queue\r\n  4. Close Callbacks Queue\r\n\r\n在浏览器中只有一个宏任务队列，所有宏任务都会放入到宏任务队列中等待放入执行栈中被主线程执行，NodeJs中有4个宏任务队列，不同类型的宏任务会被放入到不同的宏任务队列中。\r\n\r\nNodeJs中的微任务队列可以分为下列2个:\r\n\r\n  1. `Next Tick Queue`: 放置process.nextTick(callback)的回调函数\r\n  2. `Other Micro Queue`: 其他microtask，例如Promise等\r\n\r\n在浏览器中只有一个微任务队列，所有微任务都会放入到微任务队列中等待放入执行栈中被主线程执行，NodeJs中有2个微任务队列，不同类型的微任务会被放入到不同的微任务队列中。\r\n\r\n![NodeJs事件循环](https://user-images.githubusercontent.com/8088864/125030923-71a55200-e0be-11eb-93be-95f1cbc456e3.png)\r\n\r\nNodeJs的Event Loop的具体流程:\r\n\r\n1. 执行全局Javascript的同步代码，可能包含一些同步语句，也可以是异步语句(setTimeout语句不执行回调函数里面的，Promise中.then之前的语句)。\r\n2. 执行微任务队列中的微任务，先执行Next Tick Queue队列中的所有的所有任务，再执行Other Micro Queue队列中的所有任务。\r\n3. 开始执行宏任务队列中的任务，共6个阶段，从第1个阶段开始执行每个阶段对应宏任务队列中的所有任务，**注意，这里执行的是该阶段宏任务队列中的所有的任务，浏览器Event Loop每次只会中宏任务队列中取出队首的任务执行，执行完后开始执行微任务队列中的任务，NodeJs的Event Loop会执行完该阶段中宏任务队列中的所有任务后，才开始执行微任务队列中的任务，也就是步骤2**。\r\n4. Timers Queue -> 步骤2 -> I/O Callbacks Queue -> 步骤2 -> Check Queue -> 步骤2 -> Close Callback Queue -> 步骤2 -> Timers Queue -> ......\r\n\r\n**特别注意:**\r\n\r\n- 上述的第三步，当 NodeJs 版本小于11时，NodeJs的Event Loop会执行完该阶段中宏任务队列中的所有任务\r\n- 当 NodeJS 版本大于等于11时，**在timer阶段的setTimeout,setInterval...和在check阶段的setImmediate都在node11里面都修改为一旦执行一个阶段里的一个任务就立刻执行微任务队列**。为了和浏览器更加趋同。\r\n\r\nNodeJs的Event Loop的microtask queue和macrotask queue的执行顺序详情\r\n\r\n![NodeJS中的微任务队列执行顺序](https://user-images.githubusercontent.com/8088864/125032436-8aaf0280-e0c0-11eb-926a-30be5bf116f9.png)\r\n\r\n![NodeJS中的宏任务队列执行顺序](https://user-images.githubusercontent.com/8088864/125032451-8f73b680-e0c0-11eb-8349-d6c5f20bd11a.png)\r\n\r\n当setTimeout(fn, 0)和setImmediate(fn)放在同一同步代码中执行时，可能会出现下面两种情况：\r\n\r\n1. **第一种情况**: 同步代码执行完后，timer还没到期，setImmediate中注册的回调函数先放入到Check Queue的宏任务队列中，先执行微任务队列，然后开始执行宏任务队列，先从Timers Queue开始，由于在Timer Queue中未发现任何的回调函数，往下阶段走，直到Check Queue中发现setImmediate中注册的回调函数，先执行，然后timer到期，setTimeout注册的回调函数会放入到Timers Queue的宏任务队列中，下一轮后再次执行到Timers Queue阶段时，才会再Timers Queue中发现了setTimeout注册的回调函数，于是执行该timer的回调，所以，**setImmediate(fn)注册的回调函数会早于setTimeout(fn, 0)注册的回调函数执行**。\r\n2. **第二种情况**: 同步代码执行完之前，timer已经到期，setTimeout注册的回调函数会放入到Timers Queue的宏任务队列中，执行同步代码到setImmediate时，将其回调函数注册到Check Queue中，同步代码执行完后，先执行微任务队列，然后开始执行宏任务队列，先从Timers Queue开始，在Timers Queue发现了timer中注册的回调函数，取出执行，往下阶段走，到Check Queue中发现setImmediate中注册的回调函数，又执行，所以这种情况时，**setTimeout(fn, 0)注册的回调函数会早于setImmediate(fn)注册的回调函数执行**。\r\n\r\n3. 在同步代码中同时调setTimeout(fn, 0)和setImmediate执行顺序情况是不确定的，但是如果把他们放在一个IO的回调，比如readFile('xx', function () {// ....})回调中，那么IO回调是在I/O Callbacks Queue中，setTimeout到期回调注册到Timers Queue，setImmediate回调注册到Check Queue，I/O Callbacks Queue执行完到Check Queue，Timers Queue得到下个循环周期，所以setImmediate回调这种情况下肯定比setTimeout(fn, 0)回调先执行。\r\n\r\n``` js\r\nsetImmediate(function A() {\r\n  console.log(1);\r\n  setImmediate(function B(){console.log(2);});\r\n});\r\n\r\nsetTimeout(function timeout() {\r\n  console.log('TIMEOUT FIRED');\r\n}, 0);\r\n\r\n// 执行结果: 会存在下面两种情况\r\n// 第一种情况:\r\n// 1\r\n// TIMEOUT FIRED\r\n// 2\r\n\r\n// 第二种情况:\r\n// TIMEOUT FIRED\r\n// 1\r\n// 2\r\n```\r\n\r\n注:\r\n\r\n- setImmediate中如果又存在setImmediate语句，内部的setImmediate语句注册的回调函数会在下一个`check`阶段来执行，并不在当前的`check`阶段来执行。\r\n\r\npoll 阶段详解:\r\n\r\npoll 阶段主要又两个功能:\r\n\r\n1. 当timers到达指定的时间后，执行指定的timer的回调(Executing scripts for timers whose threshold has elapsed, then)。\r\n2. 处理poll队列的事件(Processing events in the poll queue)。\r\n\r\n当进入到poll阶段，并且没有timers被调用的时候，会出现下面的情况:\r\n\r\n- 如果poll队列不为空，Event Loop将同步执行poll queue中的任务，直到poll queue队列为空或者执行的callback达到上限。\r\n- 如果poll队列为空，会发生下面的情况:\r\n  - 如果脚本执行过setImmediate代码，Event Loop会结束poll阶段，直接进入check阶段，执行Check Queue中调用setImmediate注册的回调函数。\r\n  - 如果脚本没有执行过setImmediate代码，poll阶段将等待callback被添加到队列中，然后立即执行。\r\n\r\n当进入到poll阶段，并且调用了timers的话，会发生下面的情况:\r\n\r\n- 一旦poll queue为空，Event Loop会检测Timers Queue中是否存在任务，如果存在任务的话，Event Loop会回到timer阶段并执行Timers Queue中timers注册的回调函数。**执行完后是进入check阶段，还是又重新进入I/O callbacks阶段?**\r\n\r\nsetTimeout 对比 setImmediate\r\n\r\n- setTimeout(fn, 0)在timers阶段执行，并且是在poll阶段进行判断是否达到指定的timer时间才会执行\r\n- setImmediate(fn)在check阶段执行\r\n\r\n两者的执行顺序要根据当前的执行环境才能确定：\r\n\r\n- 如果两者都在主模块(main module)调用，那么执行先后取决于进程性能，顺序随机\r\n- 如果两者都不在主模块调用，即在一个I/O Circle中调用，那么setImmediate的回调永远先执行，因为会先到Check阶段\r\n\r\nsetImmediate 对比 process.nextTick\r\n\r\n- setImmediate(fn)的回调任务会插入到宏队列Check Queue中\r\n- process.nextTick(fn)的回调任务会插入到微队列Next Tick Queue中\r\n- process.nextTick(fn)调用深度有限制，上限是1000，而setImmediate则没有",
  reactions: {
    url: "https://api.github.com/repos/hankliu62/hankliu62.github.com/issues/80/reactions",
    total_count: 0,
    "+1": 0,
    "-1": 0,
    laugh: 0,
    hooray: 0,
    confused: 0,
    heart: 0,
    rocket: 0,
    eyes: 0,
  },
  timeline_url:
    "https://api.github.com/repos/hankliu62/hankliu62.github.com/issues/80/timeline",
  performed_via_github_app: null,
  state_reason: null,
};

/**
 * 将JSON对象转化成Typescript的类型的在线工具网站
 *
 * @returns
 */
export default function Json2TsPage() {
  // json对象
  const [source, setSource] = useState<string>();

  // typescript类型
  const [target, setTarget] = useState<string>();

  // 名称
  const [name, setName] = useState<string>("RootObject");

  useEffect(() => {
    const convertedTs = convertJsonToTs(source);
    convertedTs && setTarget(convertedTs);
  }, [source]);

  /**
   * 转换 JSON 格式成 Typescript类型 格式
   *
   * @param currentJson
   * @returns
   */
  function convertJsonToTs(currentJson: string): string {
    if (!currentJson) {
      return "";
    }

    let currentData;
    try {
      currentData = JSON.parse(currentJson);
    } catch {
      message.error("数据格式不正确");
    }

    try {
      if (currentData) {
        const current = JsonToTs.convert(JSON.stringify(currentData), name);
        if (current) {
          return current;
        }
        message.error("转换失败");
      }
    } catch (error) {
      console.error(error);
      message.error(error.message);
    }
  }

  /**
   * 设置案例
   */
  const onSetExample = useCallback(() => {
    setSource(JSON.stringify(Demo, null, "  "));
  }, [setSource]);

  return (
    <div className="relative flex min-h-[100vh] flex-1 flex-col bg-white">
      <Breadcrumb
        className="!m-6"
        items={[
          {
            title: <Link href={getRoutePrefix() + "/"}>小工具集合</Link>,
          },
          {
            title: "TypeScript 类型生成器",
          },
        ]}
      />

      {}
      {/* @ts-ignore */}
      <SplitPane className="flex-1" split="vertical" minSize={50} maxSize={75}>
        <div className="overflow-y-auto">
          <div className="flex justify-between border-b border-black/20 px-6 py-4">
            <h2 className="text-lg font-medium leading-[32px]">JSON</h2>

            <div className="flex items-center space-x-5">
              <Input
                className="!w-64"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="请输入名称"
              />

              <Button
                className="!inline-flex items-center"
                icon={<FileTextOutlined rev={undefined} />}
                onClick={onSetExample}
              >
                案例
              </Button>

              <Clipboard
                text={source}
                onSuccess={() => {
                  message.success("复制成功");
                }}
              >
                <Button
                  className="!inline-flex items-center"
                  icon={<CopyOutlined rev={undefined} />}
                >
                  拷贝
                </Button>
              </Clipboard>
            </div>
          </div>
          <CodeEditor
            value={source}
            language="json"
            onChange={(val) => {
              setSource(val);
            }}
            options={{ theme: "vs-dark" }}
          />
        </div>
        <div className="overflow-y-auto">
          <div className="flex justify-between border-b border-black/20 px-6 py-4">
            <h2 className="text-lg font-medium leading-[32px]">
              Typescript类型
            </h2>

            <div className="flex items-center space-x-5">
              <Clipboard
                text={target}
                onSuccess={() => {
                  message.success("复制成功");
                }}
              >
                <Button
                  className="!inline-flex items-center"
                  icon={<CopyOutlined rev={undefined} />}
                >
                  拷贝
                </Button>
              </Clipboard>
            </div>
          </div>
          <CodeEditor
            value={target}
            language="typescript"
            onChange={(val) => {
              setTarget(val);
            }}
            options={{ theme: "vs-dark", readOnly: true }}
          />
        </div>
      </SplitPane>
    </div>
  );
}
