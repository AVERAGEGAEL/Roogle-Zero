const urlInput = document.getElementById("url-input");
const goButton = document.getElementById("go-button");
const fullscreenButton = document.getElementById("fullscreen-button");
const iframe = document.getElementById("proxy-frame");

const PROXY_BASE = "https://roogle-zero.uraverageopdoge.workers.dev/?url=";

// Allowlist for known safe sites (avoid false iframe block)
const ALLOW_IFRAME = ["wikipedia.org", "wikimedia.org"];

function isSafeSite(url) {
  return ALLOW_IFRAME.some(domain => url.includes(domain));
}

function getProxyUrl(url) {
  if (!url.startsWith("http")) url = "https://" + url;
  return PROXY_BASE + encodeURIComponent(url);
}

function loadUrl(url) {
  if (!url) return;
  iframe.src = getProxyUrl(url);

  // Detect iframe block after 3s (only if not allowlisted)
  if (!isSafeSite(url)) {
    setTimeout(() => {
      try {
        const doc = iframe.contentDocument;
        if (!doc) throw new Error("Blocked");
      } catch {
        // Open in new proxied tab if iframe blocked
        window.open(getProxyUrl(url), "_blank");
      }
    }, 3000);
  }
}

// Go button
goButton.addEventListener("click", () => {
  loadUrl(urlInput.value.trim());
});

// Enter key triggers Go
urlInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    loadUrl(urlInput.value.trim());
  }
});

// Fullscreen button
fullscreenButton.addEventListener("click", () => {
  if (iframe.requestFullscreen) iframe.requestFullscreen();
  else if (iframe.webkitRequestFullscreen) iframe.webkitRequestFullscreen();
  else if (iframe.msRequestFullscreen) iframe.msRequestFullscreen();
});

// Intercept all links inside iframe for navigation
iframe.addEventListener("load", () => {
  try {
    const iframeDoc = iframe.contentDocument;
    if (!iframeDoc) return;

    iframeDoc.querySelectorAll("a[href]").forEach(a => {
      a.addEventListener("click", e => {
        e.preventDefault();
        const url = a.href;
        loadUrl(url);
      });
    });

    // Also observe new links dynamically
    new MutationObserver(mutations => {
      for (const node of mutations.flatMap(x => Array.from(x.addedNodes))) {
        if (node.tagName === "A" && node.href) {
          node.addEventListener("click", e => {
            e.preventDefault();
            loadUrl(node.href);
          });
        }
      }
    }).observe(iframeDoc, { childList: true, subtree: true });

  } catch {}
});
