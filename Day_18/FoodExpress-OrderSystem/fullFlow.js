// --- Callback function ---
function getOrder(orderId, callback) {
  const mockDB = {
    101: { id: 101, items: ["pizza", "coke"], total: 450, cardValid: true },
    102: { id: 102, items: ["burger"], total: 150, cardValid: false }
  };

  setTimeout(() => {
    const order = mockDB[orderId];
    if (!order) return callback(new Error("Order not found"), null);
    callback(null, order);
  }, 600);
}

// --- Promise function ---
function processPayment(order) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (order.cardValid) {
        resolve({
          amount: order.total,
          transactionId: "TXN_" + Date.now()
        });
      } else {
        reject(new Error("Payment failed"));
      }
    }, 800);
  });
}

// --- Async/Await function ---
function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function generateInvoice(order, receipt) {
  await wait(300);
  return {
    invoiceId: "INV_" + Date.now(),
    orderId: order.id,
    amount: receipt.amount,
    items: order.items
  };
}

// --- COMPLETE FLOW ---
getOrder(101, (err, order) => {
  if (err) return console.log("Fetch error:", err.message);

  processPayment(order)
    .then(async receipt => {
      const invoice = await generateInvoice(order, receipt);
      console.log("FINAL INVOICE:", invoice);
    })
    .catch(e => console.log("Payment error:", e.message));
});
