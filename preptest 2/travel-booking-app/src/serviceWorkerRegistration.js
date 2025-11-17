// copy the default CRA file: serviceWorkerRegistration.js
// simple registration
export function register() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js");
  }
}
