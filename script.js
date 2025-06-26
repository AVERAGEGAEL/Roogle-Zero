const input = document.getElementById("url-input");
const goBtn = document.getElementById("go-button");
const fullscreenBtn = document.getElementById("fullscreen-button");
const iframe = document.getElementById("proxy-frame");

const WORKER_PREFIX = "https://roogle-zero.uraverageopdoge.workers.dev/?url=";

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

  // Run iframe detection after a short delay
  setTimeout(() => {
    try {
      const test = iframe.contentWindow;
      if (!test || iframe.clientHeight < 5 || iframe.contentDocument.body.innerHTML.length < 10) {
        openInNewTab(final);
      }
    } catch (err) {
      // Cross-origin = likely iframe blocked
      openInNewTab(final);
    }
  }, 1500);
}

function openInNewTab(proxyUrl) {
  alert("This site may be iframe-blocked. Opening in a new tab.");
  window.open(proxyUrl, "_blank");
}

goBtn.onclick = () => loadURL(input.value);
fullscreenBtn.onclick = () => iframe.requestFullscreen();

// Pressing Enter submits
input.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    loadURL(input.value);
  }
});
