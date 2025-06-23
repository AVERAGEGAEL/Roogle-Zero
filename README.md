# Roogle Zero

**Roogle Zero** is a fully custom web proxy, built completely from scratch with no forks.

- Frontend: GitHub Pages ([https://averagegael.github.io/Roogle-Zero/](https://averagegael.github.io/Roogle-Zero/))
- Backend: Cloudflare Workers ([https://roogle-zero.uraverageopdoge.workers.dev/](https://roogle-zero.uraverageopdoge.workers.dev/))

## How it works (for now)

1️⃣ User enters URL.  
2️⃣ Frontend sends URL to Cloudflare Worker.  
3️⃣ Worker will proxy the target page (Worker backend will be built next).  
4️⃣ Iframe displays the proxied page.

## Roadmap

- ✅ Build frontend (index.html, styles.css, script.js)
- 🔜 Build backend Cloudflare Worker proxy logic
- 🔜 HTML rewriting
- 🔜 JavaScript injection
- 🔜 iframe sandbox bypass
- 🔜 MutationObserver for dynamic iframe control
- 🔜 CSP stripping
- 🔜 Ad skip hacks

