document.getElementById("go-button").addEventListener("click", () => {
    let url = document.getElementById("url-input").value.trim();

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
    }

    const workerURL = "https://roogle-zero.uraverageopdoge.workers.dev/proxy?url=" + encodeURIComponent(url);
    document.getElementById("proxy-frame").src = workerURL;
});
