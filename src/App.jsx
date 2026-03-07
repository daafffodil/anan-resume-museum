import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Calendar,
  Download,
  Eye,
  Filter,
  LogIn,
  LogOut,
  Plus,
  Sparkles,
} from "lucide-react";
import { supabase } from "./lib/supabase";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const emptyForm = {
  title: "",
  direction: "AI产品运营",
  status: "草稿",
  when_text: "",
  company: "",
  jd_title: "",
  summary: "",
  tags_text: "",
  pdf_url: "",
};

export default function App() {
  const isAdminPage = window.location.pathname === "/admin";

  return isAdminPage ? <AdminPage /> : <FrontPage />;
}

function FrontPage() {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState("全部");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState("");

  const directions = ["全部", "AI产品运营", "品牌市场", "出海营销"];

  useEffect(() => {
    async function fetchResumes() {
      setLoading(true);
      setErrorText("");

      const { data, error } = await supabase
        .from("resumes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("读取 resumes 失败：", error);
        setErrorText(error.message || "读取数据失败");
        setItems([]);
      } else {
        setItems(data || []);
      }

      setLoading(false);
    }

    fetchResumes();
  }, []);

  const filtered = useMemo(() => {
    if (active === "全部") return items;
    return items.filter((item) => item.direction === active);
  }, [active, items]);

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-[#111111]">
      <div className="mx-auto max-w-[1500px] px-6 py-8 md:px-10 lg:px-14 lg:py-10">
        <header className="grid gap-8 border-b border-black/10 pb-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-[#111111]">
              <Sparkles className="h-4 w-4" />
              简历实验档案 / Resume Experiments
            </div>

            <h1 className="max-w-5xl text-4xl font-semibold leading-[1.04] tracking-[-0.03em] md:text-6xl xl:text-7xl">
              我的简历版本库，
              <span className="mt-2 block text-[#5c5c5c]">
                为不同方向、不同岗位叙事而改写。
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#4f4f4f] md:text-xl">
              前台现在直接从 Supabase 数据库读取卡片内容。你在后台新增卡片后，这里刷新就会显示。
            </p>
          </div>

          <div className="rounded-[32px] border border-black/10 bg-white p-6">
            <p className="text-sm uppercase tracking-[0.12em] text-[#707070]">
              关于这个项目
            </p>
            <div className="mt-4 space-y-4 text-base leading-7 text-[#333333]">
              <p>这不是单张简历，而是一组“我如何根据岗位重新讲述自己”的样本。</p>
              <p>后台入口是网址后面加上 /admin。</p>
            </div>

            <a
              href="/admin"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#111111] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              <LogIn className="h-4 w-4" />
              进入后台
            </a>
          </div>
        </header>

        <section className="grid gap-8 border-b border-black/10 py-8 lg:grid-cols-[0.42fr_1fr] lg:items-start">
          <div>
            <p className="text-sm uppercase tracking-[0.12em] text-[#707070]">
              筛选方向
            </p>
            <p className="mt-3 max-w-sm text-base leading-7 text-[#5c5c5c]">
              只要数据库里有新卡片，刷新页面后就能看到。
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {directions.map((item) => {
              const selectedTag = active === item;
              return (
                <button
                  key={item}
                  onClick={() => setActive(item)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition",
                    selectedTag
                      ? "border-[#111111] bg-[#111111] text-white"
                      : "border-black/10 bg-white text-[#222222] hover:bg-white"
                  )}
                >
                  <Filter className="h-4 w-4" />
                  {item}
                </button>
              );
            })}
          </div>
        </section>

        {loading ? (
          <section className="py-16">
            <div className="rounded-[28px] border border-black/10 bg-white p-8 text-lg text-[#555555]">
              正在读取数据库里的简历卡片…
            </div>
          </section>
        ) : errorText ? (
          <section className="py-16">
            <div className="rounded-[28px] border border-red-200 bg-white p-8">
              <p className="text-lg font-semibold text-[#111111]">读取失败</p>
              <p className="mt-3 text-base leading-7 text-[#666666]">
                {errorText}
              </p>
            </div>
          </section>
        ) : filtered.length === 0 ? (
          <section className="py-16">
            <div className="rounded-[28px] border border-black/10 bg-white p-8">
              <p className="text-lg font-semibold text-[#111111]">还没有卡片</p>
              <p className="mt-3 text-base leading-7 text-[#666666]">
                说明前台已经连上了，但数据库里当前没有符合条件的数据。
              </p>
            </div>
          </section>
        ) : (
          <section className="grid gap-6 py-8 lg:grid-cols-3">
            {filtered.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04, duration: 0.38 }}
                className="group flex h-full flex-col rounded-[34px] border border-black/10 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.02)] transition hover:-translate-y-1 hover:bg-[#fcfcfc]"
              >
                <div className="mb-7 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm uppercase tracking-[0.12em] text-[#777777]">
                      {item.direction || "未分类"}
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.03em] text-[#181311] md:text-[2.1rem]">
                      {item.title || "未命名卡片"}
                    </h2>
                    <p className="mt-3 text-lg font-medium text-[#4f4f4f]">
                      {item.company || "未填写目标团队"}
                    </p>
                  </div>
                  <StatusPill status={item.status || "草稿"} />
                </div>

                <div className="grid gap-5 border-t border-black/10 pt-5">
                  <InfoRow label="时间" value={item.when_text || "未设置"} />
                  <InfoRow label="对应 JD" value={item.jd_title || "未填写"} />

                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] text-[#8a8a8a]">
                      目标团队
                    </p>
                    <p className="mt-2 text-base text-[#333333]">
                      {item.company || "未填写"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] text-[#8a8a8a]">
                      这版简历重点
                    </p>
                    <p className="mt-2 text-base leading-7 text-[#333333]">
                      {item.summary || "未填写"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] text-[#8a8a8a]">
                      关键词
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(item.tags || []).length > 0 ? (
                        item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-black/10 bg-[#fafafa] px-3 py-1.5 text-sm font-medium text-[#444444]"
                          >
                            {tag}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-[#888888]">暂无关键词</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-black/10 pt-5">
                  <a
                    href={item.pdf_url || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition",
                      item.pdf_url
                        ? "bg-[#111111] text-white hover:opacity-90"
                        : "cursor-not-allowed bg-[#d9d9d9] text-white"
                    )}
                  >
                    <Download className="h-4 w-4" />
                    查看 PDF
                  </a>

                  <button
                    type="button"
                    onClick={() => setSelected(item)}
                    className="inline-flex items-center gap-2 text-base font-semibold text-[#111111]"
                  >
                    <Eye className="h-4 w-4" />
                    查看详情
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.article>
            ))}
          </section>
        )}
      </div>

      {selected && <DetailModal item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function AdminPage() {
  const [session, setSession] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    async function getSessionNow() {
      const { data } = await supabase.auth.getSession();
      setSession(data.session ?? null);
      setLoadingSession(false);
    }

    getSessionNow();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setLoginError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoginError(error.message || "登录失败");
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setSaveMessage("");
    setSaveError("");

    const payload = {
      title: form.title.trim(),
      direction: form.direction,
      status: form.status,
      when_text: form.when_text.trim(),
      company: form.company.trim(),
      jd_title: form.jd_title.trim(),
      summary: form.summary.trim(),
      tags: form.tags_text
        .split(/[，,\n、]/)
        .map((s) => s.trim())
        .filter(Boolean),
      pdf_url: form.pdf_url.trim(),
    };

    const { error } = await supabase.from("resumes").insert(payload);

    if (error) {
      setSaveError(error.message || "保存失败");
    } else {
      setSaveMessage("保存成功。现在去前台刷新页面，就能看到新卡片。");
      setForm(emptyForm);
    }

    setSaving(false);
  }

  if (loadingSession) {
    return (
      <div className="min-h-screen bg-[#f7f7f7] px-6 py-10 text-[#111111]">
        <div className="mx-auto max-w-3xl rounded-[28px] border border-black/10 bg-white p-8">
          正在检查登录状态…
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] px-6 py-10 text-[#111111]">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.12em] text-[#707070]">
              Admin
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-[-0.03em]">
              后台卡片管理
            </h1>
          </div>

          <a
            href="/"
            className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium"
          >
            返回前台
          </a>
        </div>

        {!session ? (
          <div className="rounded-[28px] border border-black/10 bg-white p-8">
            <h2 className="text-2xl font-semibold">登录后台</h2>
            <p className="mt-3 text-base leading-7 text-[#666666]">
              使用你刚刚在 Supabase Authentication 里创建的邮箱和密码。
            </p>

            <form onSubmit={handleLogin} className="mt-6 grid gap-4">
              <Field label="邮箱">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none"
                  placeholder="you@example.com"
                />
              </Field>

              <Field label="密码">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none"
                  placeholder="请输入密码"
                />
              </Field>

              {loginError && (
                <p className="text-sm text-red-600">{loginError}</p>
              )}

              <button
                type="submit"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-[#111111] px-5 py-3 text-sm font-medium text-white"
              >
                <LogIn className="h-4 w-4" />
                登录
              </button>
            </form>
          </div>
        ) : (
          <div className="rounded-[28px] border border-black/10 bg-white p-8">
            <div className="mb-6 flex items-center justify-between gap-4 border-b border-black/10 pb-5">
              <div>
                <h2 className="text-2xl font-semibold">新建一张简历卡片</h2>
                <p className="mt-2 text-base text-[#666666]">
                  登录账号：{session.user.email}
                </p>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-medium"
              >
                <LogOut className="h-4 w-4" />
                退出
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-5">
              <Field label="标题">
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none"
                  placeholder="例如：平台策略版"
                />
              </Field>

              <div className="grid gap-5 md:grid-cols-3">
                <Field label="方向">
                  <select
                    value={form.direction}
                    onChange={(e) =>
                      setForm({ ...form, direction: e.target.value })
                    }
                    className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none"
                  >
                    <option value="AI产品运营">AI产品运营</option>
                    <option value="品牌市场">品牌市场</option>
                    <option value="出海营销">出海营销</option>
                  </select>
                </Field>

                <Field label="状态">
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none"
                  >
                    <option value="草稿">草稿</option>
                    <option value="进行中">进行中</option>
                    <option value="已完成">已完成</option>
                  </select>
                </Field>

                <Field label="时间">
                  <input
                    value={form.when_text}
                    onChange={(e) =>
                      setForm({ ...form, when_text: e.target.value })
                    }
                    className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none"
                    placeholder="例如：2026-03-07"
                  />
                </Field>
              </div>

              <Field label="目标团队 / 公司">
                <input
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none"
                  placeholder="例如：AI / 互联网公司"
                />
              </Field>

              <Field label="对应 JD">
                <input
                  value={form.jd_title}
                  onChange={(e) =>
                    setForm({ ...form, jd_title: e.target.value })
                  }
                  className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none"
                  placeholder="例如：AI 产品运营 / AI 商业化运营"
                />
              </Field>

              <Field label="这版简历重点">
                <textarea
                  value={form.summary}
                  onChange={(e) => setForm({ ...form, summary: e.target.value })}
                  className="min-h-[140px] w-full rounded-2xl border border-black/10 px-4 py-3 outline-none"
                  placeholder="写这一版最想强调的能力和叙事"
                />
              </Field>

              <Field label="关键词（用中文逗号、英文逗号或换行分隔）">
                <textarea
                  value={form.tags_text}
                  onChange={(e) =>
                    setForm({ ...form, tags_text: e.target.value })
                  }
                  className="min-h-[100px] w-full rounded-2xl border border-black/10 px-4 py-3 outline-none"
                  placeholder="例如：AIGC研究，平台策略，商业化表达"
                />
              </Field>

              <Field label="PDF 链接">
                <input
                  value={form.pdf_url}
                  onChange={(e) => setForm({ ...form, pdf_url: e.target.value })}
                  className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none"
                  placeholder="https://..."
                />
              </Field>

              {saveError && <p className="text-sm text-red-600">{saveError}</p>}
              {saveMessage && (
                <p className="text-sm text-green-700">{saveMessage}</p>
              )}

              <button
                type="submit"
                disabled={saving}
                className="inline-flex w-fit items-center gap-2 rounded-full bg-[#111111] px-5 py-3 text-sm font-medium text-white disabled:opacity-50"
              >
                <Plus className="h-4 w-4" />
                {saving ? "保存中…" : "保存卡片"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-[#555555]">{label}</span>
      {children}
    </label>
  );
}

function InfoRow({ label, value }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.12em] text-[#8a8a8a]">
        {label}
      </p>
      <div className="mt-2 flex items-center gap-2 text-base text-[#2e2723]">
        {label === "时间" && <Calendar className="h-4 w-4 text-[#111111]" />}
        <span>{value}</span>
      </div>
    </div>
  );
}

function StatusPill({ status }) {
  const styles = {
    草稿: "bg-[#f1f1f1] text-[#5d5d5d] border-[#e5e5e5]",
    进行中: "bg-[#111111] text-white border-[#111111]",
    已完成: "bg-[#efefef] text-[#111111] border-[#e0e0e0]",
  };

  return (
    <span
      className={cn(
        "rounded-full border px-3 py-1 text-xs font-semibold whitespace-nowrap",
        styles[status] || styles["草稿"]
      )}
    >
      {status}
    </span>
  );
}

function DetailModal({ item, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4 py-6">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[32px] bg-white p-6 shadow-2xl md:p-8">
        <div className="flex items-start justify-between gap-4 border-b border-black/10 pb-5">
          <div>
            <p className="text-sm uppercase tracking-[0.12em] text-[#777777]">
              {item.direction || "未分类"}
            </p>
            <h3 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#111111]">
              {item.title || "未命名卡片"}
            </h3>
            <p className="mt-3 text-lg text-[#555555]">
              {item.company || "未填写目标团队"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-[#111111]"
          >
            关闭
          </button>
        </div>

        <div className="grid gap-6 py-6 md:grid-cols-2">
          <InfoRow label="时间" value={item.when_text || "未设置"} />
          <InfoRow label="对应 JD" value={item.jd_title || "未填写"} />

          <div className="md:col-span-2">
            <p className="text-xs uppercase tracking-[0.12em] text-[#8a8a8a]">
              这版简历重点
            </p>
            <p className="mt-2 text-base leading-8 text-[#333333]">
              {item.summary || "未填写"}
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="text-xs uppercase tracking-[0.12em] text-[#8a8a8a]">
              关键词
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {(item.tags || []).length > 0 ? (
                item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-black/10 bg-[#fafafa] px-3 py-1.5 text-sm font-medium text-[#444444]"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <span className="text-sm text-[#888888]">暂无关键词</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-black/10 pt-5">
          <span className="text-sm text-[#777777]">
            这里的数据已经来自数据库。
          </span>

          <a
            href={item.pdf_url || "#"}
            target="_blank"
            rel="noreferrer"
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition",
              item.pdf_url
                ? "bg-[#111111] text-white hover:opacity-90"
                : "cursor-not-allowed bg-[#d9d9d9] text-white"
            )}
          >
            <Download className="h-4 w-4" />
            查看 PDF
          </a>
        </div>
      </div>
    </div>
  );
}