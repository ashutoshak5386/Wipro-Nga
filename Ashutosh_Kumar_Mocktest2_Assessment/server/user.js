// Original Callback Version (for reference)
function fetchDataCallback(callback) {
    setTimeout(() => {
        callback("Data fetched successfully");
    }, 1000);
}

// 1. Promise Version
function fetchDataPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Data fetched successfully (Promise)");
        }, 1000);
    });
}

// 2. Async/Await Version
async function fetchDataAsync() {
    try {
        const data = await fetchDataPromise();
        console.log(data.replace("(Promise)", "(Async/Await)"));
    } catch (error) {
        console.error(error);
    }
}

// Execution
console.log("--- Q8 Execution ---");

// Run Callback
fetchDataCallback((message) => {
    console.log("Callback:", message);
});

// Run Promise
fetchDataPromise()
    .then((message) => console.log("Promise:", message))
    .catch((err) => console.error(err));

// Run Async/Await

