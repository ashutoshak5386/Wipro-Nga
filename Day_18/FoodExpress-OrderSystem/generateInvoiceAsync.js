function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateInvoice(order, receipt) {
  console.log(`Generating invoice for Order ${order.id}...`);

  await delay(500);

  const invoice = {
    invoiceId: "INV_" + Math.floor(Math.random() * 100000),
    orderId: order.id,
    items: order.items,
    amount: receipt.amount,
    transactionId: receipt.transactionId,
    createdAt: new Date().toISOString()
  };

  console.log("Invoice generated.");
  return invoice;
}

// --- DEMO ---
(async () => {
  const order = { id: 101, items: ["pizza"], total: 450 };
  const receipt = { amount: 450, transactionId: "TXN_12345" };

  const invoice = await generateInvoice(order, receipt);
  console.log("Invoice:", invoice);
})();
