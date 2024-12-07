const express = require("express");
const stripe = require("stripe")("sk_test_51QTBCuGRH1ABoQcEwLPijezjbqhqs6hh8Si1eSMKoL5z7AuvYV7C8TEYtKSZoy6LACbEltonrqIaT4CKtU4oMvq50012UgcEGk");
const app = express();
app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
  const { paymentMethodId, amount } = req.body;

  try {
    // Create a PaymentIntent and associate the payment method
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents (1000 = $10)
      currency: "usd",
      payment_method: paymentMethodId,
      confirm: true, // Automatically confirm the payment
    });

    res.send({ success: true, paymentIntent });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
