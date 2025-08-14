const urlInput=document.getElementById("url-input");
const goButton=document.getElementById("go-button");
const fullscreenButton=document.getElementById("fullscreen-button");
const iframe=document.getElementById("proxy-frame");

const PROXY_BASE="https://roogle-zero.uraverageopdoge.workers.dev/?url=";

// Allowlist for safe iframe sites
const ALLOW_IFRAME=["wikipedia.org","wikimedia.org"];

function isSafeSite(url){return ALLOW_IFRAME.some(d=>url.includes(d));}
function getProxyUrl(url){if(!url.startsWith("http")) url="https://"+url;return PROXY_BASE+encodeURIComponent(url);}

function loadUrl(url){
  if(!url) return;
  const proxyUrl=getProxyUrl(url);
  iframe.src=proxyUrl;

  if(!isSafeSite(url)){
    iframe.onload=()=>{
      try{const doc=iframe.contentDocument;if(!doc) throw new Error("Blocked");}
      catch{window.open(proxyUrl,"_blank");}
    };
  }
}

goButton.addEventListener("click",()=>loadUrl(urlInput.value.trim()));
urlInput.addEventListener("keydown",e=>{if(e.key==="Enter") loadUrl(urlInput.value.trim());});
fullscreenButton.addEventListener("click",()=>{if(iframe.requestFullscreen) iframe.requestFullscreen(); else if(iframe.webkitRequestFullscreen) iframe.webkitRequestFullscreen();});
