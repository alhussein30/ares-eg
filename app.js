(() => {
  const B = {
    wa: "201276455354", n: "01276455354",
    ig: "https://www.instagram.com/_ares.eg_/", tt: "https://www.tiktok.com/@ares_eg",
    items: [
      { n: "هودي عنابي", d: "أوفر سايز", img: "girl" },
      { n: "هودي عنابي", d: "قصة واسعة", img: "duo-studio" },
      { n: "هودي أخضر", d: "أوفر سايز", img: "green-day" },
      { n: "هودي أخضر", d: "طبعة ARES على الصدر", img: "green-night" },
    ],
    faqs: [
      ["إزاي أطلب؟", "ابعتلنا اللون والمقاس على واتساب 01276455354، وهنرد عليك بالتفاصيل."],
      ["فين المحل؟", "بيع أونلاين من المنزل. الطلب كله على واتساب."],
      ["الألوان المتاحة؟", "العنابي والأخضر في الصور. اسأل على واتساب لتأكيد المتاح."],
    ],
  };
  const $ = (s) => document.querySelector(s), $$ = (s) => [...document.querySelectorAll(s)];
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wa = (t) => `https://wa.me/${B.wa}?text=${encodeURIComponent(t)}`;
  const hello = "أهلاً، عايز أسأل عن هوديز ARES";

  ["#hdWa", "#p1Wa", "#p2Wa"].forEach((s) => ($(s).href = wa(hello)));
  ["#hdIg", "#fIg"].forEach((s) => ($(s).href = B.ig)); ["#hdTt", "#fTt"].forEach((s) => ($(s).href = B.tt));
  $("#telWa").href = wa(hello); $("#telWa").textContent = B.n;
  $("#fWa").href = wa(hello); $("#fWa").textContent = B.n;
  $("#ig").href = B.ig; $("#ig").textContent = "_ares.eg_";
  $("#tt").href = B.tt; $("#tt").textContent = "ares_eg";

  $("#grid").innerHTML = B.items.map((it, i) => `<article class="pt rv" style="--d:${(i % 4) * 0.08}s" data-i="${i}"><div class="pi"><img src="img/${it.img}.jpg" alt="${it.n}" loading="lazy"></div><div class="pm"><h3>${it.n}</h3><p>${it.d}</p></div><button class="solid" type="button">اسأل عن السعر</button></article>`).join("");
  document.addEventListener("click", (e) => { const t = e.target.closest(".pt"); if (!t) return; const it = B.items[+t.dataset.i]; window.open(wa(`أهلاً، عايز أسأل عن السعر: ${it.n} (${it.d})\nالمقاس: `), "_blank", "noopener"); });
  $("#faqList").innerHTML = B.faqs.map(([q, a]) => `<details class="rv"><summary>${q}</summary><p>${a}</p></details>`).join("");
  $("#askForm").onsubmit = (e) => { e.preventDefault(); const v = $("#fAsk").value.trim(); window.open(wa(v ? `أهلاً، عايز أطلب: ${v}` : hello), "_blank", "noopener"); };

  const menu = $("#menu"), bg = $("#burger");
  const setMenu = (o) => { menu.classList.toggle("open", o); bg.setAttribute("aria-expanded", o); root.classList.toggle("lock", o); if (o) menu.style.setProperty("--hh", Math.max(0, Math.round($(".hd").getBoundingClientRect().bottom)) + "px"); };
  bg.onclick = () => setMenu(!menu.classList.contains("open"));
  menu.addEventListener("click", (e) => e.target.closest("a") && setMenu(false));

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((en) => en.forEach((x) => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }), { threshold: 0.08 });
    $$(".rv").forEach((e) => io.observe(e));
    const po = new IntersectionObserver((en) => en.forEach((x) => { if (x.isIntersecting) { x.target.classList.add("in"); po.unobserve(x.target); } }), { threshold: 0.15 });
    $$(".panel").forEach((e) => po.observe(e));
  } else $$(".rv,.panel").forEach((e) => e.classList.add("in"));

  let started = false;
  const start = () => { if (started) return; started = true; $("#loader").classList.add("gone"); root.classList.remove("loading"); root.classList.add("ready"); };
  if (reduce) start();
  else {
    const min = new Promise((r) => setTimeout(r, 1300));
    const loaded = new Promise((r) => (document.readyState === "complete" ? r() : addEventListener("load", r)));
    Promise.all([min, loaded]).then(start);
    setTimeout(start, 4500);
  }

  // parallax on photos, header hides on scroll down
  const hd = $(".hd"), imgs = $$(".ph img");
  let lastY = scrollY, raf = 0;
  const frame = () => {
    raf = 0; const y = scrollY;
    if (!root.classList.contains("lock")) hd.classList.toggle("hide", y > lastY && y > 200);
    lastY = y;
    if (!reduce) imgs.forEach((im) => { const r = im.parentElement.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return; im.style.setProperty("--py", `${(r.top + r.height / 2 - innerHeight / 2) * -0.07}px`); });
  };
  addEventListener("scroll", () => { if (!raf) raf = requestAnimationFrame(frame); }, { passive: true }); frame();
})();
