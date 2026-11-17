/* 红河河粉 · 前端逻辑（无依赖） */

const $ = (s, r = document) => r.querySelector(s);
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};
const esc = (s = "") => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

let lesson = null;
let lastAudio = null;

/* ---------- 运行模式：本机服务 / 静态离线（PWA） ---------- */
let MODE = "server";          // server = 本机 Python 服务；static = 静态托管/离线
let AUDIO_MAP = null;         // 静态模式：越南语文本 → 音频文件名
const LS_PROGRESS = "honghe.progress.v1";

const absURL = p => new URL(p, document.baseURI).href;

async function useStatic() {
  MODE = "static";
  const r = await fetch("data/lessons/index.json", { cache: "no-store" });
  if (!r.ok) throw new Error("课程索引加载失败");
  const j = await r.json();
  if (!Array.isArray(j.lessons)) throw new Error("课程索引格式不对");
  AUDIO_MAP = await fetch("data/audio-map.json").then(x => x.json()).catch(() => ({}));
  return j.lessons;
}

async function detectMode() {
  // 静态构建会在 index.html 写入这个标记，省掉一次必然 404 的探测
  const meta = document.querySelector('meta[name="honghe-mode"]');
  if (meta && meta.content === "static") return useStatic();
  try {
    const r = await fetch("api/lessons", { cache: "no-store" });
    if (!r.ok) throw new Error("no api");
    const j = await r.json();
    if (!Array.isArray(j.lessons)) throw new Error("bad api");
    MODE = "server";
    return j.lessons;
  } catch {
    return useStatic();
  }
}

function audioSrc(text) {
  if (MODE === "static") {
    const f = AUDIO_MAP && AUDIO_MAP[text];
    return f ? absURL("audio/" + f) : null;
  }
  return "api/tts?text=" + encodeURIComponent(text);
}

/* 静态模式：进度存本机 localStorage，算法与本机服务一致（SM-2 简化版） */
function loadStore() {
  try {
    const s = JSON.parse(localStorage.getItem(LS_PROGRESS) || "{}");
    return s && s.items ? s : { items: {} };
  } catch { return { items: {} }; }
}
function saveStore(s) {
  try { localStorage.setItem(LS_PROGRESS, JSON.stringify(s)); } catch {}
}
function localReview(key, correct) {
  const s = loadStore();
  const cur = s.items[key] || { repetitions: 0, ease: 2.5, interval_d: 0, correct: 0, wrong: 0 };
  let reps = cur.repetitions || 0;
  let ease = cur.ease || 2.5;
  let interval = cur.interval_d || 0;
  if (correct) {
    reps += 1;
    if (reps === 1) interval = 1.0;
    else if (reps === 2) interval = 3.0;
    else interval = Math.max(1.0, Math.round(interval * ease));
    ease = Math.min(2.8, ease + 0.1);
  } else {
    reps = 0;
    interval = 0.5;
    ease = Math.max(1.3, ease - 0.25);
  }
  const iso = d => new Date(d).toISOString().slice(0, 19);
  s.items[key] = {
    repetitions: reps,
    ease: Math.round(ease * 100) / 100,
    interval_d: interval,
    due_at: iso(Date.now() + interval * 864e5),
    last_at: iso(Date.now()),
    correct: (cur.correct || 0) + (correct ? 1 : 0),
    wrong: (cur.wrong || 0) + (correct ? 0 : 1),
  };
  saveStore(s);
}

/* ---------- 音频 ---------- */
/* 复用同一个 <audio>：iOS 上反复 new Audio() 会受播放实例限制 */
let player = null;
function audioEl() {
  if (!player) {
    player = document.createElement("audio");
    player.preload = "auto";
    player.setAttribute("playsinline", "");
    player.setAttribute("webkit-playsinline", "");
  }
  return player;
}

let toastTimer = null;
function audioToast(msg) {
  let t = document.getElementById("audio-toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "audio-toast";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.cssText = "position:fixed;left:50%;bottom:24px;transform:translateX(-50%);"
    + "background:rgba(48,26,16,.94);color:#fff;padding:10px 16px;border-radius:10px;"
    + "font-size:14px;line-height:1.4;z-index:9999;max-width:86vw;text-align:center;"
    + "pointer-events:none;transition:opacity .3s;box-shadow:0 4px 18px rgba(0,0,0,.28)";
  t.style.opacity = "1";
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.style.opacity = "0"; }, 4000);
}

function speak(text, btn) {
  document.querySelectorAll(".speak.playing").forEach(b => b.classList.remove("playing"));
  const src = audioSrc(text);
  if (!src) { audioToast("这段没有音频：" + text); return; }
  const a = audioEl();
  try { a.pause(); } catch (e) {}
  if (btn) btn.classList.add("playing");
  const done = () => { if (btn) btn.classList.remove("playing"); };
  a.onended = done;
  a.onerror = () => {
    done();
    const code = a.error ? a.error.code : "?";
    audioToast("音频无法加载（错误码 " + code + "）");
  };
  a.src = src;
  const p = a.play();
  if (p && p.catch) {
    p.catch(err => {
      done();
      // 换句时打断上一次播放会报 AbortError，不是故障
      if (err && err.name === "AbortError") return;
      audioToast("播放被拦住：" + (err && err.name ? err.name : err));
    });
  }
}

/* ---------- 词卡（句子解剖与单词表共用） ---------- */
function wordCard(w, stopProp) {
  const b = el("div", "word");
  let partsHtml = "";
  if (w.parts && w.parts.length) {
    partsHtml = '<span class="parts">= '
      + w.parts.map(x => `<i>${esc(x.vi)}</i> ${esc(x.zh)}`).join(" + ")
      + "</span>";
  }
  b.innerHTML = `<b>${esc(w.vi)}</b>`
    + (w.hv ? `<span class="hv">${esc(w.hv)}</span>` : "")
    + (w.scope === "explain" ? '<span class="badge">精讲</span>' : "")
    + `<span class="gl">${esc(w.zh)}</span>`
    + partsHtml;
  if (w.note) b.title = w.note;
  b.addEventListener("click", e => {
    if (stopProp) e.stopPropagation();
    speak(w.vi);
  });
  return b;
}

/* ---------- 场景 ---------- */
function renderLines(lines) {
  const box = $("#lines");
  box.innerHTML = "";
  lines.forEach((ln, i) => {
    const li = el("li", "line");

    const who = el("div", "who", esc(ln.who || ""));
    const viRow = el("div", "vi");
    const txt = el("span", "txt", esc(ln.vi));
    const spk = el("button", "speak", "🔊");
    spk.title = "播放发音";
    spk.addEventListener("click", e => { e.stopPropagation(); speak(ln.vi, spk); });
    viRow.append(txt, spk);
    viRow.addEventListener("click", () => anat.classList.toggle("hidden"));

    const zh = el("div", "zh", esc(ln.zh || ""));

    // 解剖层
    const anat = el("div", "anat hidden");

    if (ln.words?.length) {
      anat.append(el("h4", null, "词汇"));
      const wrap = el("div", "words");
      ln.words.forEach(w => wrap.append(wordCard(w, true)));
      anat.append(wrap);
    }

    if (ln.skeleton) {
      anat.append(el("h4", null, "骨架"));
      anat.append(el("p", null, esc(ln.skeleton)));
    }
    if (ln.usage) {
      anat.append(el("h4", null, "语用"));
      anat.append(el("p", null, esc(ln.usage)));
    }
    if (ln.evidence) {
      anat.append(el("p", null, `<span style="color:#a99a8c;font-size:12.5px">🟢 来源：${esc(ln.evidence)}</span>`));
    }

    li.append(who, viRow, zh);
    if (ln.en) li.append(el("div", "en", esc(ln.en)));
    li.append(anat);
    box.append(li);
  });
}

/* ---------- 精讲（按专题分组，可折叠） ---------- */
function renderBlock(b, box) {
  if (b.type === "table") {
    if (b.caption) box.append(el("h4", "block-cap", esc(b.caption)));
    const t = el("table", "focus");
    const thead = el("thead");
    const tr = el("tr");
    (b.head || []).forEach(hd => tr.append(el("th", null, esc(hd))));
    thead.append(tr);
    const tbody = el("tbody");
    (b.rows || []).forEach(r => {
      const row = el("tr");
      r.forEach(c => row.append(el("td", null, c)));   // 单元格允许内嵌 HTML
      tbody.append(row);
    });
    t.append(thead, tbody);
    box.append(t);

  } else if (b.type === "prose") {
    if (b.heading) box.append(el("h4", "block-cap", esc(b.heading)));
    box.append(el("p", "prose", b.body || ""));        // body 允许内嵌 HTML
  }
}

function renderFocus(f) {
  if (!f) return;
  const panel = $("#focus");
  panel.classList.remove("hidden");
  $("h2", panel).textContent = f.title || "精讲";

  const body = $("#focus-body");
  body.innerHTML = "";
  if (f.intro) body.append(el("p", "blurb", esc(f.intro)));

  // topics 优先；兼容旧的单 blocks 形态
  const topics = f.topics || (f.blocks ? [{ id: "all", title: null, summary: null, blocks: f.blocks }] : []);

  topics.forEach((t, i) => {
    const card = el("div", "topic");
    const head = el("button", "topic-head");
    head.innerHTML = `<span class="topic-title">${esc(t.title || "精讲")}</span>`
      + `<span class="topic-sub">${esc(t.summary || "")}</span>`
      + `<span class="chev">▾</span>`;
    const inner = el("div", "topic-body");

    (t.blocks || []).forEach(b => renderBlock(b, inner));
    card.append(head, inner);

    if (i > 0) card.classList.add("collapsed");   // 只默认展开第一个
    head.addEventListener("click", () => card.classList.toggle("collapsed"));
    body.append(card);
  });

  if (f.note) body.append(el("p", "note", esc(f.note)));
}

/* ---------- 单词表 ---------- */
function renderGlossary(gloss) {
  const panel = $("#glossary");
  if (!gloss || !gloss.length) { panel.classList.add("hidden"); return; }
  panel.classList.remove("hidden");

  const box = $("#glossary-body");
  box.innerHTML = "";
  let total = 0;

  gloss.forEach(g => {
    box.append(el("h4", "block-cap", esc(g.group)));
    const grid = el("div", "words");
    (g.items || []).forEach(w => {
      total++;
      grid.append(wordCard(w, false));
    });
    box.append(grid);
  });

  $("#glossary-count").textContent = `${total} 个词`;
}

/* ---------- 练习 ---------- */
let drills = [];
let dIdx = 0;
let answered = false;

function renderDrill() {
  const panel = $("#drill");
  panel.classList.remove("hidden");
  const body = $("#drill-body");
  body.innerHTML = "";
  $("#drill-progress").textContent = dIdx >= drills.length
    ? `${drills.length} / ${drills.length}`
    : `${dIdx + 1} / ${drills.length}`;

  if (dIdx >= drills.length) {
    body.append(el("p", "q", "这一课的练习做完了。"));
    body.append(el("p", "note", "明天再来，间隔重复会把这些按遗忘曲线重新排给你。"));
    return;
  }

  const d = drills[dIdx];
  answered = false;

  // 听力题：先给一个显眼的播放按钮
  if (d.type === "listen") {
    const play = el("button", "listen-play", "🔊 点这里听");
    let plays = 0;
    play.addEventListener("click", () => {
      plays++;
      speak(d.audio);
      play.innerHTML = plays === 1 ? "🔊 再听一遍" : `🔊 再听一遍（已听 ${plays} 次）`;
    });
    body.append(play);
  }

  body.append(el("p", "q", esc(d.q)));

  // 填空题：带空格的句子
  if (d.type === "fill" && d.sentence) {
    const sent = el("p", "fill-sent");
    sent.innerHTML = esc(d.sentence).replace("___", '<span class="blank">?</span>');
    body.append(sent);
  }

  // 产出题：自评，不走选项
  if (d.type === "produce") {
    renderProduce(d, body);
    return;
  }

  const opts = el("div", "opts");
  d.opts.forEach((o, i) => {
    const b = el("button", "opt", esc(o));
    b.addEventListener("click", () => pick(i, d, opts, body));
    opts.append(b);
  });
  body.append(opts);
}

function pick(i, d, opts, body) {
  if (answered) return;
  answered = true;

  const btns = [...opts.children];
  btns.forEach((b, j) => {
    b.disabled = true;
    if (j === d.answer) b.classList.add("right");
    else if (j === i) b.classList.add("wrong");
  });

  const ok = i === d.answer;
  const fb = el("div", "fb show " + (ok ? "ok" : "no"));
  fb.innerHTML = `<b>${ok ? "对" : "不对"}</b>`
    + (d.why ? `<div class="why">${esc(d.why)}</div>` : "")
    + (d.say ? `<div class="why" style="margin-top:8px"><a href="#" class="replay">🔊 再听一遍</a></div>` : "");
  body.append(fb);

  const replay = $(".replay", fb);
  if (replay) replay.addEventListener("click", e => { e.preventDefault(); speak(d.say); });
  sendReview(d, ok);

  appendDrillNav(body, ok ? "" : "记住这个，它会更快回来。");
}

/* 统一的“下一题/完成”导航：选择题和产出题都走这里，避免某类题卡住 */
function appendDrillNav(body, noteText) {
  const nav = el("div", "drill-nav");
  const next = el("button", "btn", dIdx + 1 < drills.length ? "下一题 →" : "完成");
  next.addEventListener("click", () => { dIdx++; renderDrill(); });
  nav.append(el("span", "note", noteText || ""), next);
  body.append(nav);
}

/* 产出题：先想、再看答案、再自评 */
function renderProduce(d, body) {
  if (d.hint) body.append(el("p", "hint", "提示：" + esc(d.hint)));

  const btn = el("button", "btn", "我来说 → 看答案");
  btn.addEventListener("click", () => {
    start.remove();

    if (d.answer) {
      const ans = el("div", "produce-ans");
      ans.innerHTML = `<div class="ans-label">参考答案</div><b>${esc(d.answer)}</b>`;
      body.append(ans);
      speak(d.answer);
    }
    if (d.note) body.append(el("p", "note", esc(d.note)));

    const row = el("div", "self-check");
    row.append(el("span", "note", "自评："));
    const good = el("button", "btn", "说对了");
    const bad = el("button", "ghost", "没说对");
    good.addEventListener("click", () => {
      sendReview(d, true); lockSelf(row, true); appendDrillNav(body);
    });
    bad.addEventListener("click", () => {
      sendReview(d, false); lockSelf(row, false); appendDrillNav(body);
    });
    row.append(good, bad);
    body.append(row);
  });
  const start = el("div", "self-check");
  const skip = el("button", "ghost", "跳过");
  skip.addEventListener("click", () => { dIdx++; renderDrill(); });
  start.append(btn, skip);
  body.append(start);
}

function lockSelf(row, ok) {
  [...row.querySelectorAll("button")].forEach(b => { b.disabled = true; });
  row.append(el("span", "self-result " + (ok ? "ok" : "no"),
    ok ? "已记为会 → 明天再来" : "已记为不会 → 半天后再来"));
}

function sendReview(d, correct) {
  const key = lesson.id + "/" + d.id;
  if (MODE === "static") { localReview(key, correct); refreshStats(); return; }
  fetch("api/review", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key: key, kind: "exercise", correct: correct }),
  }).then(refreshStats).catch(() => {});
}

/* ---------- 钩子 ---------- */
function renderHooks(hooks) {
  const panel = $("#hooks");
  if (!hooks || !hooks.length) {
    panel.classList.add("hidden");
    return;
  }
  panel.classList.remove("hidden");
  const box = $("#hooks-list");
  box.innerHTML = "";
  hooks.forEach(h => box.append(el("li", null, esc(h))));
}

/* ---------- 统计 ---------- */
function refreshStats() {
  if (MODE === "static") {
    const items = Object.values(loadStore().items);
    const correct = items.reduce((n, x) => n + (x.correct || 0), 0);
    const wrong = items.reduce((n, x) => n + (x.wrong || 0), 0);
    document.getElementById("stats").textContent = "追踪 " + items.length + " · 对 " + correct + " · 错 " + wrong;
    return;
  }
  fetch("api/stats").then(r => r.json()).then(s => {
    $("#stats").textContent = `追踪 ${s.tracked} · 对 ${s.correct} · 错 ${s.wrong}`;
  }).catch(() => {});
}

/* ---------- 加载课程 ---------- */
async function loadLesson(id) {
  const r = await fetch(MODE === "static" ? "data/lessons/lesson-" + id + ".json" : "api/lesson/" + id);
  lesson = await r.json();

  $("#lesson-title").textContent = lesson.title || "";
  $("#lesson-blurb").textContent = lesson.blurb || "";
  $("#lesson-mins").textContent = lesson.estMinutes ? `约 ${lesson.estMinutes} 分钟` : "";
  document.body.classList.toggle("hide-trans", !!lesson.hideTranslations);
  document.body.classList.remove("show-trans");
  $("#toggle-trans").textContent = "显示翻译";
  $("#toggle-trans").style.display = lesson.hideTranslations ? "" : "none";
  renderLines(lesson.lines || []);
  renderFocus(lesson.focus);
  drills = lesson.drills || [];
  dIdx = 0;
  renderDrill();
  renderGlossary(lesson.glossary);
  renderHooks(lesson.hooks);
  refreshStats();
}

async function boot() {
  const lessons = await detectMode();
  if (MODE === "static") {
    const fm = $("#foot-mode");
    if (fm) fm.textContent = "离线可用 · 进度存在本机";
    if ("serviceWorker" in navigator && location.protocol !== "file:") {
      navigator.serviceWorker.register(absURL("sw.js")).catch(() => {});
    }
  }
  const sel = $("#lesson-select");
  sel.innerHTML = "";
  lessons.forEach(l => {
    const o = el("option", null, esc(l.title));
    o.value = l.id;
    sel.append(o);
  });
  sel.addEventListener("change", () => loadLesson(sel.value));

  $("#toggle-trans").addEventListener("click", (e) => {
    const on = document.body.classList.toggle("show-trans");
    e.target.textContent = on ? "隐藏翻译" : "显示翻译";
  });

  $("#toggle-all").addEventListener("click", (e) => {
    const all = document.querySelectorAll(".anat");
    const anyHidden = [...all].some(a => a.classList.contains("hidden"));
    all.forEach(a => a.classList.toggle("hidden", !anyHidden));
    e.target.textContent = anyHidden ? "收起全部解剖" : "展开全部解剖";
  });

  if (lessons.length) await loadLesson(lessons[0].id);
  else $("#lesson-title").textContent = "还没有课程";
}

boot();
