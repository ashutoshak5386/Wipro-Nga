function processPayment(order) {
  console.log(`Processing payment for Order ${order.id}...`);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (order.cardValid) {
        resolve({
          orderId: order.id,
          amount: order.total,
          transactionId: "TXN_" + Math.floor(Math.random() * 100000)
        });
      } else {
        reject(new Error("Payment declined: Invalid card"));
      }
    }, 900);
  });
}

// --- DEMO ---

processPayment({ id: 101, total: 450, cardValid: true })
  .then(r => console.log("Payment success:", r))
  .catch(e => console.log("Payment error:", e.message));

processPayment({ id: 102, total: 150, cardValid: false })
  .then(r => console.log("Payment success:", r))
  .catch(e => console.log("Payment error:", e.message));
