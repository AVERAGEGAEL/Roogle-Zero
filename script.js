document.getElementById("go-button").addEventListener("click", () => {
    let url = document.getElementById("url-input").value.trim();

    // Auto add https:// if missing
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
    }

    const workerURL = "https://roogle-zero.uraverageopdoge.workers.dev/?url=" + encodeURIComponent(url);
    document.getElementById("proxy-frame").src = workerURL;

    // Update browser URL bar (optional)
    window.history.replaceState(null, "", "?url=" + encodeURIComponent(url));
});

// Fullscreen button
document.getElementById("fullscreen-button").addEventListener("click", () => {
    const iframe = document.getElementById("proxy-frame");
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
    }
});
