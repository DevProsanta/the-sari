import Razorpay from "razorpay";
import shortid from "shortid";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Initialize razorpay object

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    // Create an order -> generate the OrderID -> Send it to the Front-end
    // Also, check the amount and currency on the backend (Security measure)
    let amtValue = parseInt(req.body);
    const payment_capture = 1;
    const amount = amtValue;
    const currency = "INR";
    const options = {
      amount: (amount * 100).toString(),
      currency,
      receipt: shortid.generate(),
      payment_capture,
    };

    try {
      const response = await razorpay.orders.create(options);
      res.status(200).json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (err) {
      res.status(400).json(err);
    }
  } else {
    // Handle any other HTTP method
    console.log("dont know");
  }
}

export async function checkoutFunction(_total) {}
