import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Share2, FileText, Briefcase, Pencil, Trash2, Upload, ExternalLink, Sparkles, Copy, Calendar } from "lucide-react";


const seedData = [
  {
    id: "1",
    title: "AI 产品运营方向",
    direction: "AI产品运营",
    status: "进行中",
    company: "AI / 互联网公司",
    jdTitle: "AI 产品运营 / AI 商业化运营",
    jdLink: "",
    summary: "围绕你在 AIGC 行业调研、平台策略输出、内容生产提效上的经历，强调你把 AI 趋势转成业务语言和落地方案的能力。",
    highlights: ["AIGC 行业研究", "平台策略课件", "AI 工具实操", "商业化表达"],
    updatedAt: "2026-03-06",
    resumeVersion: "V3",
    friendNote: "这版最适合讲“我不是纯内容，我能把 AI 变成业务价值”。",
  },
  {
    id: "2",
    title: "品牌市场部（甲方）方向",
    direction: "品牌市场",
    status: "已完成",
    company: "消费品牌 / 平台品牌部",
    jdTitle: "Brand Marketing / 品牌市场",
    jdLink: "",
    summary: "围绕品牌传播、跨界合作、艺术 IP 孵化与 Gen-Z 洞察，突出你做品牌叙事、资源整合和审美表达的能力。",
    highlights: ["品牌传播", "跨界合作", "艺术 IP", "青年文化洞察"],
    updatedAt: "2026-03-05",
    resumeVersion: "V2",
    friendNote: "这版会让人一眼看出我既会写方案，也真的做过品牌项目。",
  },
  {
    id: "3",
    title: "出海营销策略方向",
    direction: "出海营销",
    status: "草稿",
    company: "全球化平台 / 出海团队",
    jdTitle: "Global Marketing Strategy",
    jdLink: "",
    summary: "围绕全球营销洞察、平台级商业化策略、英语沟通与海外商务接洽经验，强调你的国际化视角和策略表达能力。",
    highlights: ["全球时装周调研", "平台级客户服务", "英语沟通", "策略提案"],
    updatedAt: "2026-03-03",
    resumeVersion: "V1",
    friendNote: "这版最像“懂内容、懂平台、也懂全球市场”的组合型选手。",
  },
];

const storageKey = "resume-showcase-items-v1";

function classNames(...arr) {
  return arr.filter(Boolean).join(" ");
}

function Button({ className = "", variant = "default", size = "default", type = "button", children, ...props }) {
  const variantClasses = {
    default: "bg-neutral-900 text-white border border-neutral-900 hover:opacity-90",
    outline: "bg-white text-neutral-900 border border-neutral-300 hover:bg-neutral-50",
    ghost: "bg-transparent text-neutral-700 border border-transparent hover:bg-neutral-100",
  };

  const sizeClasses = {
    default: "px-4 py-2.5 text-sm",
    sm: "px-3 py-2 text-sm",
  };

  return (
    <button
      type={type}
      className={classNames(
        "inline-flex items-center justify-center gap-2 font-medium transition focus:outline-none focus:ring-2 focus:ring-neutral-300 disabled:cursor-not-allowed disabled:opacity-50",
        variantClasses[variant] || variantClasses.default,
        sizeClasses[size] || sizeClasses.default,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function Card({ className = "", children, ...props }) {
  return (
    <div className={classNames("rounded-3xl border border-neutral-200", className)} {...props}>
      {children}
    </div>
  );
}

function CardHeader({ className = "", children, ...props }) {
  return (
    <div className={classNames("p-6 pb-0", className)} {...props}>
      {children}
    </div>
  );
}

function CardContent({ className = "", children, ...props }) {
  return (
    <div className={classNames("p-6", className)} {...props}>
      {children}
    </div>
  );
}

function CardTitle({ className = "", children, ...props }) {
  return (
    <h3 className={classNames("font-semibold text-neutral-900", className)} {...props}>
      {children}
    </h3>
  );
}

function CardDescription({ className = "", children, ...props }) {
  return (
    <p className={classNames("text-neutral-500", className)} {...props}>
      {children}
    </p>
  );
}

function Input({ className = "", ...props }) {
  return (
    <input
      className={classNames(
        "w-full rounded-xl border border-neutral-300 bg-white px-3 py-2.5 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-400",
        className
      )}
      {...props}
    />
  );
}

function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={classNames(
        "w-full rounded-xl border border-neutral-300 bg-white px-3 py-2.5 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-400",
        className
      )}
      {...props}
    />
  );
}

function Badge({ className = "", variant = "secondary", children, ...props }) {
  const variantClasses = {
    secondary: "bg-neutral-100 text-neutral-700 border border-transparent",
    outline: "bg-white text-neutral-700 border border-neutral-300",
  };

  return (
    <span
      className={classNames(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        variantClasses[variant] || variantClasses.secondary,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

function Select({ value, onValueChange, className = "", children }) {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange?.(e.target.value)}
      className={classNames(
        "w-full rounded-2xl border border-neutral-300 bg-white px-3 py-2.5 text-sm text-neutral-900 outline-none focus:border-neutral-400",
        className
      )}
    >
      {children}
    </select>
  );
}

function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}

function Tabs({ value, onValueChange, children }) {
  return children({ value, onValueChange });
}

function TabsList({ className = "", children }) {
  return <div className={classNames("inline-flex items-center gap-1 p-1", className)}>{children}</div>;
}

function TabsTrigger({ value, activeValue, onValueChange, className = "", children }) {
  const active = value === activeValue;
  return (
    <button
      type="button"
      onClick={() => onValueChange?.(activeValue)}
      className={classNames(
        "px-4 py-2 text-sm font-medium transition",
        active ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-900",
        className
      )}
    >
      {children}
    </button>
  );
}

function Dialog({ open, children }) {
  if (!open) return null;
  return <div>{children}</div>;
}

function DialogContent({ className = "", children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
      <div className={classNames("w-full bg-white shadow-xl", className)}>{children}</div>
    </div>
  );
}

function DialogHeader({ className = "", children }) {
  return <div className={classNames("mb-6", className)}>{children}</div>;
}

function DialogTitle({ className = "", children }) {
  return <h2 className={classNames("text-xl font-semibold text-neutral-900", className)}>{children}</h2>;
}

function DialogDescription({ className = "", children }) {
  return <p className={classNames("mt-2 text-sm leading-6 text-neutral-500", className)}>{children}</p>;
}

function App() {
  const [items, setItems] = useState(seedData);
  const [query, setQuery] = useState("");
  const [direction, setDirection] = useState("全部");
  const [view, setView] = useState("gallery");
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      try {
        setItems(JSON.parse(raw));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items]);

  const directions = useMemo(() => {
    return ["全部", ...Array.from(new Set(items.map((i) => i.direction)))];
  }, [items]);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const hitDirection = direction === "全部" || item.direction === direction;
      const text = [
        item.title,
        item.direction,
        item.company,
        item.jdTitle,
        item.summary,
        item.friendNote,
        ...(item.highlights || []),
      ]
        .join(" ")
        .toLowerCase();
      const hitQuery = text.includes(query.toLowerCase());
      return hitDirection && hitQuery;
    });
  }, [items, direction, query]);

  const stats = useMemo(() => {
    return {
      total: items.length,
      done: items.filter((i) => i.status === "已完成").length,
      working: items.filter((i) => i.status === "进行中").length,
      draft: items.filter((i) => i.status === "草稿").length,
    };
  }, [items]);

  function resetForm() {
    setEditing({
      id: "",
      title: "",
      direction: "产品",
      status: "草稿",
      company: "",
      jdTitle: "",
      jdLink: "",
      summary: "",
      highlights: [],
      updatedAt: new Date().toISOString().slice(0, 10),
      resumeVersion: "V1",
      friendNote: "",
    });
  }

  function onCreate() {
    resetForm();
    setOpen(true);
  }

  function onEdit(item) {
    setEditing(item);
    setOpen(true);
  }

  function onDelete(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function onSave(e) {
    e.preventDefault();
    if (!editing?.title?.trim()) return;

    const payload = {
      ...editing,
      id: editing.id || String(Date.now()),
      updatedAt: new Date().toISOString().slice(0, 10),
    };

    setItems((prev) => {
      const exists = prev.some((i) => i.id === payload.id);
      if (exists) {
        return prev.map((i) => (i.id === payload.id ? payload : i));
      }
      return [payload, ...prev];
    });
    setOpen(false);
  }

  async function onCopyShare() {
    const shareText = `我做了一个“简历博物馆”网页，里面整理了我针对 AI 产品运营、品牌市场部、出海营销策略等不同方向改出来的简历版本和 JD 对照。虽然工作还在找，但这个过程本身已经很值得展示。`;
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-sm shadow-sm">
                <Sparkles className="h-4 w-4" />
                Anna Cheng's Resume Museum / 简历博物馆
              </div>
              <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
                把我为不同岗位方向改过的简历，
                <span className="block text-neutral-500">做成一个可以分享的“求职实验档案馆”。</span>
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-neutral-600 md:text-lg">
                我是广告学本硕背景，正在把自己投向 AI 产品运营、品牌市场部（甲方）和出海营销策略等不同方向。每一版简历都不是简单改字，而是一次“我如何重新讲述自己”的实验。
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="rounded-2xl" onClick={onCopyShare}>
                {copied ? <Copy className="mr-2 h-4 w-4" /> : <Share2 className="mr-2 h-4 w-4" />}
                {copied ? "已复制文案" : "复制分享文案"}
              </Button>
              <Button className="rounded-2xl" onClick={onCreate}>
                <Plus className="mr-2 h-4 w-4" />
                新建一份简历卡片
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          {[
            ["总简历数", stats.total, <FileText className="h-4 w-4" key="a" />],
            ["已完成", stats.done, <BadgeIcon key="b" />],
            ["进行中", stats.working, <Pencil className="h-4 w-4" key="c" />],
            ["草稿", stats.draft, <Upload className="h-4 w-4" key="d" />],
          ].map(([label, value, icon], idx) => (
            <motion.div
              key={String(label)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="rounded-3xl border-0 bg-white shadow-sm">
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-sm text-neutral-500">{label}</p>
                    <p className="mt-2 text-3xl font-semibold">{value}</p>
                  </div>
                  <div className="rounded-2xl bg-neutral-100 p-3 text-neutral-700">{icon}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="mb-6 rounded-3xl border-0 bg-white shadow-sm">
          <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center gap-3 rounded-2xl border bg-neutral-50 px-4 py-3">
              <Search className="h-4 w-4 text-neutral-500" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索方向、公司、JD、关键词…"
                className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Select value={direction} onValueChange={setDirection} className="w-[160px] rounded-2xl">
                {directions.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </Select>

              <Tabs value={view} onValueChange={setView}>
                {({ value, onValueChange }) => (
                  <TabsList className="rounded-2xl bg-neutral-100">
                    <TabsTrigger value={value} activeValue="gallery" onValueChange={onValueChange} className="rounded-2xl">
                      画廊
                    </TabsTrigger>
                    <TabsTrigger value={value} activeValue="timeline" onValueChange={onValueChange} className="rounded-2xl">
                      时间线
                    </TabsTrigger>
                  </TabsList>
                )}
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {view === "gallery" ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
              >
                <Card className="h-full rounded-3xl border-0 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  <CardHeader>
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div>
                        <CardTitle className="text-xl leading-7">{item.title}</CardTitle>
                        <CardDescription className="mt-2 flex items-center gap-2 text-sm">
                          <Briefcase className="h-4 w-4" />
                          {item.company || "未填写目标公司"}
                        </CardDescription>
                      </div>
                      <StatusBadge status={item.status} />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="rounded-full px-3 py-1">{item.direction}</Badge>
                      <Badge variant="outline" className="rounded-full px-3 py-1">{item.resumeVersion}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <section>
                        <p className="mb-1 text-sm font-medium text-neutral-500">对应 JD</p>
                        <div className="flex items-start justify-between gap-2 rounded-2xl bg-neutral-50 p-3">
                          <div>
                            <p className="font-medium">{item.jdTitle || "未填写 JD 标题"}</p>
                            {item.jdLink ? (
                              <a className="mt-1 inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-900" href={item.jdLink} target="_blank" rel="noreferrer">
                                查看链接 <ExternalLink className="h-3.5 w-3.5" />
                              </a>
                            ) : (
                              <p className="mt-1 text-sm text-neutral-400">暂无外部链接</p>
                            )}
                          </div>
                        </div>
                      </section>

                      <section>
                        <p className="mb-1 text-sm font-medium text-neutral-500">这版简历重点</p>
                        <p className="text-sm leading-6 text-neutral-700">{item.summary}</p>
                      </section>

                      <section>
                        <p className="mb-2 text-sm font-medium text-neutral-500">改动亮点</p>
                        <div className="flex flex-wrap gap-2">
                          {(item.highlights || []).map((h) => (
                            <span key={h} className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-700">
                              {h}
                            </span>
                          ))}
                        </div>
                      </section>

                      {item.friendNote && (
                        <section className="rounded-2xl border border-dashed p-3 text-sm leading-6 text-neutral-600">
                          “{item.friendNote}”
                        </section>
                      )}

                      <div className="flex items-center justify-between border-t pt-4 text-sm text-neutral-500">
                        <div className="inline-flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          更新于 {item.updatedAt}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost" className="rounded-xl" onClick={() => onEdit(item)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="rounded-xl" onClick={() => onDelete(item.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filtered
              .slice()
              .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
              .map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <Card className="rounded-3xl border-0 bg-white shadow-sm">
                    <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
                      <div className="flex items-start gap-4">
                        <div className="mt-1 rounded-2xl bg-neutral-100 p-3">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="mb-2 flex flex-wrap items-center gap-2">
                            <p className="text-lg font-semibold">{item.title}</p>
                            <StatusBadge status={item.status} />
                            <Badge variant="outline" className="rounded-full">{item.direction}</Badge>
                          </div>
                          <p className="text-sm text-neutral-600">{item.summary}</p>
                          <p className="mt-2 text-sm text-neutral-400">{item.updatedAt} · {item.jdTitle || "未填写 JD"}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" className="rounded-2xl" onClick={() => onEdit(item)}>编辑</Button>
                        <Button variant="ghost" className="rounded-2xl" onClick={() => onDelete(item.id)}>删除</Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        )}

        <Dialog open={open}>
          <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editing?.id ? "编辑简历卡片" : "新建简历卡片"}</DialogTitle>
              <DialogDescription>
                先把每一版简历当成一个项目来管理。后面你可以把“文件上传”“公开链接”“朋友评论”继续接进去。
              </DialogDescription>
            </DialogHeader>

            {editing && (
              <form onSubmit={onSave} className="grid gap-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="卡片标题">
                    <Input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} placeholder="如：AI 产品经理方向" />
                  </Field>
                  <Field label="目标方向">
                    <Input value={editing.direction} onChange={(e) => setEditing({ ...editing, direction: e.target.value })} placeholder="产品 / 运营 / 战略" />
                  </Field>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <Field label="状态">
                    <Select value={editing.status} onValueChange={(value) => setEditing({ ...editing, status: value })}>
                      <SelectItem value="草稿">草稿</SelectItem>
                      <SelectItem value="进行中">进行中</SelectItem>
                      <SelectItem value="已完成">已完成</SelectItem>
                    </Select>
                  </Field>
                  <Field label="简历版本">
                    <Input value={editing.resumeVersion} onChange={(e) => setEditing({ ...editing, resumeVersion: e.target.value })} placeholder="V1 / V2 / Final" />
                  </Field>
                  <Field label="目标公司">
                    <Input value={editing.company} onChange={(e) => setEditing({ ...editing, company: e.target.value })} placeholder="公司名" />
                  </Field>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="JD 标题">
                    <Input value={editing.jdTitle} onChange={(e) => setEditing({ ...editing, jdTitle: e.target.value })} placeholder="岗位名称" />
                  </Field>
                  <Field label="JD 链接">
                    <Input value={editing.jdLink} onChange={(e) => setEditing({ ...editing, jdLink: e.target.value })} placeholder="https://..." />
                  </Field>
                </div>

                <Field label="这版简历的重点说明">
                  <Textarea value={editing.summary} onChange={(e) => setEditing({ ...editing, summary: e.target.value })} placeholder="这一版主要针对什么做了改写？" rows={4} />
                </Field>

                <Field label="改动亮点（用顿号、逗号或换行分隔）">
                  <Textarea
                    value={(editing.highlights || []).join("，")}
                    onChange={(e) => {
                      const highlights = e.target.value
                        .split(/[，,\n、]/)
                        .map((s) => s.trim())
                        .filter(Boolean);
                      setEditing({ ...editing, highlights });
                    }}
                    placeholder="比如：增加数据结果，重写项目标题，调整顺序"
                    rows={3}
                  />
                </Field>

                <Field label="分享给朋友看的备注">
                  <Textarea value={editing.friendNote} onChange={(e) => setEditing({ ...editing, friendNote: e.target.value })} placeholder="比如：这版最夸张，但也最好玩。" rows={3} />
                </Field>

                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="outline" className="rounded-2xl" onClick={() => setOpen(false)}>
                    取消
                  </Button>
                  <Button type="submit" className="rounded-2xl">
                    保存
                  </Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-neutral-600">{label}</span>
      {children}
    </label>
  );
}

function StatusBadge({ status }) {
  const styles = {
    草稿: "bg-neutral-100 text-neutral-700",
    进行中: "bg-neutral-900 text-white",
    已完成: "bg-neutral-200 text-neutral-900",
  };
  return <span className={classNames("rounded-full px-3 py-1 text-xs font-medium", styles[status])}>{status}</span>;
}

function BadgeIcon() {
  return <div className="h-4 w-4 rounded-full bg-neutral-900" />;
}

export default App;
