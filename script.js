const wakeLockBtn = document.getElementById("wakeLockBtn");
const statusText = document.getElementById("status");
const titleText = document.getElementById("title");
const container = document.getElementById("container");
const favicon = document.getElementById("favicon");
const WakeText = "NightWatchMan is awake..!";
const sleepText = "NightWatchMan caught sleeping ᶻ 𝗓 𐰁";

let wakeLock = null;

async function requestWakeLock() {
	try {
		wakeLock = await navigator.wakeLock.request("screen");
		container.className = "night-mode";
		wakeLockBtn.textContent = "Release Wake Lock";
		statusText.textContent = WakeText;
		titleText.textContent = WakeText;
		favicon.href = "images/awake.ico";
	} catch (err) {
		if (err.name === "NotAllowedError") {
			statusText.textContent = "Wake Lock Permission Denied";
		} else {
			statusText.textContent = `Error: ${err}`;
		}
	}
}

async function releaseWakeLock() {
	try {
		if (wakeLock) {
			await wakeLock.release();
			wakeLock = null;
		}
		container.className = "day-mode";
		wakeLockBtn.textContent = "Acquire Wake Lock";
		statusText.textContent = sleepText;
		titleText.textContent = sleepText;
		favicon.href = "images/sleep.ico";
	} catch (err) {
		statusText.textContent = `Error: ${err}`;
	}
}

wakeLockBtn.addEventListener("click", async () => {
	if (wakeLock) {
		await releaseWakeLock();
	} else {
		await requestWakeLock();
	}
});

document.addEventListener("visibilitychange", async () => {
	if (document.visibilityState === "hidden" && wakeLock) {
		await releaseWakeLock();
	} else if (document.visibilityState === "visible") {
		await requestWakeLock();
	}
});

requestWakeLock();
