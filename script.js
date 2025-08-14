const urlInput = document.getElementById("url-input");
const goButton = document.getElementById("go-button");
const fullscreenButton = document.getElementById("fullscreen-button");
const iframe = document.getElementById("proxy-frame");

const PROXY_BASE = "https://roogle-zero.uraverageopdoge.workers.dev/?url=";

// Allowlist for safe sites
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
  const proxied = getProxyUrl(url);
  iframe.src = proxied;

  if (!isSafeSite(url)) {
    // Use onload event for smarter iframe block detection
    iframe.onload = () => {
      try {
        const doc = iframe.contentDocument;
        if (!doc) throw new Error("Blocked");
      } catch {
        window.open(proxied, "_blank");
      }
    };
  }
}

// Go button
goButton.addEventListener("click", () => loadUrl(urlInput.value.trim()));

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

// Intercept links inside iframe
iframe.addEventListener("load", () => {
  try {
    const doc = iframe.contentDocument;
    if (!doc) return;

    // Rewrite all links to go through proxy
    const rewriteLinks = () => {
      doc.querySelectorAll("a[href]").forEach(a => {
        a.addEventListener("click", e => {
          e.preventDefault();
          loadUrl(a.href);
        });
      });
    };

    rewriteLinks();

    // Observe new links dynamically
    new MutationObserver(mutations => {
      for (const node of mutations.flatMap(x => Array.from(x.addedNodes))) {
        if (node.tagName === "A" && node.href) {
          node.addEventListener("click", e => {
            e.preventDefault();
            loadUrl(node.href);
          });
        }
        if (node.tagName === "IFRAME" && node.src) {
          // Rewrite any iframe src for Poki games or other sites
          node.src = getProxyUrl(node.src);
          node.removeAttribute("sandbox");
        }
      }
    }).observe(doc, { childList: true, subtree: true });

  } catch {}
});
