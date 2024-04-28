const wakeLockBtn = document.getElementById("wakeLockBtn");
const statusText = document.getElementById("status");

let wakeLock = null;

wakeLockBtn.addEventListener("click", async () => {
	if (!wakeLock) {
		try {
			wakeLock = await navigator.wakeLock.request("screen");
			statusText.textContent = "Wake Lock Acquired";
		} catch (err) {
			if (err.name === "NotAllowedError") {
				statusText.textContent = "Wake Lock Permission Denied";
			} else {
				statusText.textContent = `Error: ${err}`;
			}
		}
	} else {
		wakeLock.release();
		wakeLock = null;
		statusText.textContent = "Wake Lock Released";
	}
});
