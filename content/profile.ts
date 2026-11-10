export type ProjectChapter = {
  title: string;
  body: string;
};

export type Project = {
  slug: string;
  index: string;
  year: string;
  title: string;
  subtitle: string;
  role: string;
  status: string;
  summary: string;
  detail: string;
  stack: string[];
  accent: [string, string];
  chapters: ProjectChapter[];
};

export const profile = {
  // TODO: 换成你的名字、邮箱和社交链接
  name: "Dorian",
  role: "独立开发者 / 产品设计",
  tagline: "把模糊的念头，做成能长期用的小产品。",
  intro:
    "我做产品定义、界面设计和前端实现，也自己处理定价、渠道和第一批用户。比起把一个东西做大，我更在意它能不能被用很久。",
  location: "福建 · 中国",
  email: "hello@example.com",
  availability: "开放产品合作",
  now: "正在构建 general instinct",
  socials: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "邮件", href: "mailto:hello@example.com" },
  ],
};

export const projects: Project[] = [
  {
    slug: "nianjian",
    index: "01",
    year: "2026",
    title: "念间",
    subtitle: "把碎片念头，沉淀成可以回看的记忆",
    role: "产品 / 设计 / 前端",
    status: "原型迭代中",
    summary:
      "一个不催促你记录、也不要求你整理的第二大脑。输入是随手的，结构是慢慢长出来的。",
    detail:
      "从采集、自动归类到周期回顾，我把记录成本压到一句话，把整理交给模型和时间的积累。当前在验证「回看」是否真的能成为持续使用的理由。",
    stack: ["Product", "Next.js", "LLM"],
    accent: ["#A8F0D0", "#5B7CFA"],
    chapters: [
      {
        title: "问题",
        body: "记录工具通常假设你会整理。真实情况是，大多数念头在产生的那一刻就丢了，事后也没有动力补录。",
      },
      {
        title: "做法",
        body: "把输入压缩成一句话，模型负责抽取主题和关联，用户只在回顾时做一次确认。界面里没有文件夹，也没有待办式的红点。",
      },
      {
        title: "现在",
        body: "在验证回看频率是否足以支撑长期使用。如果用户只记录、从不回看，这个产品就没有真正成立。",
      },
    ],
  },
  {
    slug: "general-instinct",
    index: "02",
    year: "2026",
    title: "General Instinct",
    subtitle: "为独立开发者训练产品直觉",
    role: "创始人 / 全栈",
    status: "小范围内测",
    summary:
      "把真实的产品判断拆成可以反复练习的小题目，而不是另一门听完就忘的课程。",
    detail:
      "围绕定位、取舍、定价和渠道，用案例推演代替知识点堆叠。目前只邀请少量独立开发者参与，重点打磨练习完成率和复盘质量。",
    stack: ["AI", "TypeScript", "Design System"],
    accent: ["#E7D6B8", "#C97B5A"],
    chapters: [
      {
        title: "问题",
        body: "独立开发者不缺课程，缺的是在真实约束下做判断的机会。听完课，仍然不知道自己手上的产品该不该继续做。",
      },
      {
        title: "做法",
        body: "用短案例还原定位、定价和渠道的取舍，让参与者在有限信息下先做选择，再看到不同选择的后果。",
      },
      {
        title: "现在",
        body: "小范围内测，重点看练习完成率和复盘质量，而不是注册量。",
      },
    ],
  },
  {
    slug: "this-site",
    index: "03",
    year: "2026",
    title: "这个网站",
    subtitle: "一次关于质感的自我说明",
    role: "设计 / 前端",
    status: "持续打磨",
    summary:
      "没有模板，也没有截图堆砌。用原生滚动动效、玻璃材质和一枚液态球体，说明我怎么做界面。",
    detail:
      "首屏球体由 GLSL 顶点位移和菲涅尔着色实时计算，不加载任何模型或贴图；滚动动效优先交给 CSS view timeline，JavaScript 只负责指针交互和必要的状态。",
    stack: ["Next.js", "Three.js", "GLSL"],
    accent: ["#9BB8FF", "#A8F0D0"],
    chapters: [
      {
        title: "问题",
        body: "作品集很容易变成模板和截图的堆叠，看了很多，却看不出作者真正在意什么、怎么做判断。",
      },
      {
        title: "做法",
        body: "只保留三个项目，用编辑排版承载信息；动效优先用原生 CSS，3D 只放在首屏，并为移动端和减少动态效果做降级。",
      },
      {
        title: "现在",
        body: "持续打磨细节。下一步是补更完整的案例叙事，以及可下载的 PDF 版本。",
      },
    ],
  },
];

export const principles = [
  {
    index: "01",
    title: "先找最小闭环",
    body: "不从功能清单开始。先确认谁会在什么场景下反复使用它，再决定第一版做什么。",
  },
  {
    index: "02",
    title: "界面是产品的一部分",
    body: "文案、空状态、动效和加载速度都会影响信任感，不能留到上线前再补。",
  },
  {
    index: "03",
    title: "用小规模验证代替大计划",
    body: "先上线一个能被真实使用、甚至能收钱的版本，再决定要不要扩张。",
  },
];

export const capabilities = [
  "产品定义",
  "交互与视觉",
  "Next.js 前端",
  "动效与 WebGL",
  "定价与增长",
];
