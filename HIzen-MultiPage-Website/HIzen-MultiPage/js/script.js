
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

let language = localStorage.getItem("hizen-language") || "th";
let theme = localStorage.getItem("hizen-theme") || "dark";

function applyTheme(value) {
  theme = value;
  document.body.classList.toggle("light", theme === "light");
  localStorage.setItem("hizen-theme", theme);
  const button = $("#theme-toggle");
  if (button) button.textContent = theme === "light" ? "☾" : "☼";
  $$("[data-theme-choice]").forEach(b => b.classList.toggle("selected", b.dataset.themeChoice === theme));
}

function applyLanguage(value) {
  language = value;
  document.documentElement.lang = language;
  localStorage.setItem("hizen-language", language);
  $$("[data-th][data-en]").forEach(el => {
    el.textContent = el.dataset[language];
  });
  const toggle = $("#language-toggle");
  if (toggle) toggle.textContent = language === "th" ? "TH / EN" : "EN / TH";
  const input = $("#chat-input");
  if (input) input.placeholder = input.dataset["placeholder" + (language === "th" ? "Th" : "En")];
  updateClock();
  $$("[data-lang-choice]").forEach(b => b.classList.toggle("selected", b.dataset.langChoice === language));
}

function updateClock() {
  const now = new Date();
  const clock = $("#clock");
  const date = $("#date");
  const menuClock = $("#menu-clock");
  if (clock) clock.textContent = now.toLocaleTimeString("en-GB");
  if (date) date.textContent = now.toLocaleDateString(language === "th" ? "th-TH" : "en-US", {
    weekday: "long", day: "numeric", month: "long", year: "numeric"
  });
  if (menuClock) menuClock.textContent = now.toLocaleTimeString("en-GB", {hour:"2-digit",minute:"2-digit"});
}

applyTheme(theme);
applyLanguage(language);
updateClock();
setInterval(updateClock, 1000);
$$(".year").forEach(el => el.textContent = new Date().getFullYear());

$("#theme-toggle")?.addEventListener("click", () => applyTheme(theme === "dark" ? "light" : "dark"));
$("#language-toggle")?.addEventListener("click", () => applyLanguage(language === "th" ? "en" : "th"));

$$("[data-theme-choice]").forEach(b => b.addEventListener("click", () => applyTheme(b.dataset.themeChoice)));
$$("[data-lang-choice]").forEach(b => b.addEventListener("click", () => applyLanguage(b.dataset.langChoice)));

const menu = $("#mobile-menu");
function closeMenu() {
  menu?.classList.remove("open");
  menu?.setAttribute("aria-hidden", "true");
  $("#menu-toggle")?.setAttribute("aria-expanded", "false");
}
$("#menu-toggle")?.addEventListener("click", () => {
  menu.classList.add("open");
  menu.setAttribute("aria-hidden", "false");
  $("#menu-toggle").setAttribute("aria-expanded", "true");
});
$("#menu-close")?.addEventListener("click", closeMenu);
menu?.addEventListener("click", e => { if (e.target === menu) closeMenu(); });
$$(".mobile-menu a").forEach(a => a.addEventListener("click", closeMenu));

$("#chat-form")?.addEventListener("submit", async e => {
  e.preventDefault();
  const input = $("#chat-input");
  const text = input.value.trim();
  if (!text) return;
  const messages = $("#messages");
  const user = document.createElement("div");
  user.className = "message user";
  user.textContent = text;
  messages.appendChild(user);
  input.value = "";
  const reply = document.createElement("div");
  reply.className = "message bot";
  reply.textContent = language === "th"
    ? "นี่คือโหมดตัวอย่างของ HIzen — ยังไม่ได้เชื่อมต่อ AI API กรุณาเชื่อม Backend ที่ปลอดภัยก่อนเปิดใช้งานจริง"
    : "This is HIzen demo mode — no AI API is connected yet. Connect a secure backend before enabling live AI.";
  messages.appendChild(reply);
  messages.scrollTop = messages.scrollHeight;
});
