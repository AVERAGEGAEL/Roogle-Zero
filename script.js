document.getElementById("go-button").addEventListener("click", () => {
    let url = document.getElementById("url-input").value.trim();

    // Auto add https:// if missing
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
    }

    const workerURL = "https://roogle-zero.uraverageopdoge.workers.dev/?url=" + encodeURIComponent(url);
    document.getElementById("proxy-frame").src = workerURL;
});

// Fullscreen button
document.getElementById("fullscreen-button").addEventListener("click", () => {
    const iframe = document.getElementById("proxy-frame");
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.webkitRequestFullscreen) { /* Safari */
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) { /* IE11 */
        iframe.msRequestFullscreen();
    }
});
