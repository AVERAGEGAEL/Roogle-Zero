const input = document.getElementById("url-input");
const goBtn = document.getElementById("go-button");
const fullscreenBtn = document.getElementById("fullscreen-button");
const iframe = document.getElementById("proxy-frame");

const WORKER_PREFIX = "https://roogle-zero.uraverageopdoge.workers.dev/?url=";
const ALLOWLIST = ["wikipedia.org", "bing.com", "duckduckgo.com"];

function sanitizeURL(raw) {
  if (!raw.startsWith("http://") && !raw.startsWith("https://")) {
    raw = "https://" + raw;
  }
  try {
    return new URL(raw).href;
  } catch {
    return null;
  }
}

function proxyURL(url) {
  return WORKER_PREFIX + encodeURIComponent(url);
}

function loadURL(rawUrl) {
  const clean = sanitizeURL(rawUrl);
  if (!clean) return alert("Invalid URL");
  const final = proxyURL(clean);
  iframe.src = final;

  const skipFallback = ALLOWLIST.some(domain => clean.includes(domain));

  setTimeout(() => {
    try {
      const test = iframe.contentWindow;
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      if (!test || iframe.clientHeight < 10 || doc.body.innerHTML.length < 10) {
        if (!skipFallback) openInNewTab(final);
      }
    } catch (err) {
      if (!skipFallback) openInNewTab(final);
    }
  }, 3000); // 3 seconds
}

function openInNewTab(proxyUrl) {
  alert("This site may be iframe-blocked. Opening in a new tab.");
  window.open(proxyUrl, "_blank");
}

goBtn.onclick = () => loadURL(input.value);
fullscreenBtn.onclick = () => iframe.requestFullscreen();
input.addEventListener("keydown", e => {
  if (e.key === "Enter") loadURL(input.value);
});