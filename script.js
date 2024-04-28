const wakeLockBtn = document.getElementById("wakeLockBtn");
const statusText = document.getElementById("status");
const container = document.getElementById("container");

let wakeLock = null;

async function requestWakeLock() {
	try {
		wakeLock = await navigator.wakeLock.request("screen");
		statusText.textContent = "Wake Lock Acquired";
		container.className = "night-mode";
		wakeLockBtn.textContent = "Release Wake Lock";
	} catch (err) {
		if (err.name === "NotAllowedError") {
			statusText.textContent = "Wake Lock Permission Denied";
		} else {
			statusText.textContent = `Error: ${err}`;
		}
	}
}

wakeLockBtn.addEventListener("click", async () => {
	if (wakeLock) {
		wakeLock.release();
		wakeLock = null;
		container.className = "day-mode";
		statusText.textContent = "Wake Lock Released";
		wakeLockBtn.textContent = "Aquire Wake Lock";
	} else {
		requestWakeLock();
	}
});

requestWakeLock();
