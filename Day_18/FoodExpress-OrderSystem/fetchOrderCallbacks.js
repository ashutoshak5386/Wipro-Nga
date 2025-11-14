// Simulated mock database
const mockDB = {
  101: { id: 101, items: ["pizza", "coke"], total: 450, cardValid: true },
  102: { id: 102, items: ["burger"], total: 150, cardValid: false }
};

// Error-first callback pattern
function getOrder(orderId, callback) {
  console.log(`Fetching order ${orderId}...`);

  setTimeout(() => {
    const order = mockDB[orderId];

    if (!order) {
      return callback(new Error("Order not found"), null);   // err-first
    }

    callback(null, order);
  }, 700);
}

// --- DEMO ---
getOrder(101, (err, order) => {
  if (err) {
    console.log("Error:", err.message);
    return;
  }
  console.log("Order fetched:", order);
});

getOrder(999, (err, order) => {
  if (err) {
    console.log("Error:", err.message);
    return;
  }
  console.log("Order fetched:", order);
});
