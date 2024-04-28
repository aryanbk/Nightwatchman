const wakeLockBtn = document.getElementById("wakeLockBtn");
const statusText = document.getElementById("status");
const titleText = document.getElementById("title");
const container = document.getElementById("container");

let wakeLock = null;

async function requestWakeLock() {
	try {
		wakeLock = await navigator.wakeLock.request("screen");
		container.className = "night-mode";
		wakeLockBtn.textContent = "Release Wake Lock";
		statusText.textContent = "NightWatchMan is awake..!";
		titleText.textContent = "NightWatchMan is awake..!";
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
		wakeLockBtn.textContent = "Aquire Wake Lock";
		statusText.textContent = "NightWatchMan caught sleeping ᶻ 𝗓 𐰁";
		titleText.textContent = "NightWatchMan caught sleeping ᶻ 𝗓 ";
	} else {
		requestWakeLock();
	}
});

requestWakeLock();
