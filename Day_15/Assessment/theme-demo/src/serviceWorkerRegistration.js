// Simple service worker registration script
export function register() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
      navigator.serviceWorker
        .register(swUrl)
        .then(reg => {
          console.log("Service worker registered:", reg);
        })
        .catch(err => {
          console.warn("Service worker registration failed:", err);
        });
    });
  }
}

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then(reg => reg.unregister());
  }
}
