const express = require("express");
const { paymentCaptured } = require("../controllers/paymentController");
const router = express.Router();

router.route("/payment-captured").post(paymentCaptured);

module.exports = router;

// {
//   "entity": "event",
//   "account_id": "acc_KBurQO93XZ4lT6",
//   "event": "payment.captured",
//   "contains": [
//       "payment"
//   ],
//   "payload": {
//       "payment": {
//           "entity": {
//               "id": "pay_KJGtapGXzAFtug",
//               "entity": "payment",
//               "amount": 200,
//               "currency": "INR",
//               "status": "captured",
//               "order_id": "order_KJGtNLKQTW9Feb",
//               "invoice_id": null,
//               "international": false,
//               "method": "upi",
//               "amount_refunded": 0,
//               "refund_status": null,
//               "captured": true,
//               "description": "Thank you for nothing. Please give us some money",
//               "card_id": null,
//               "bank": null,
//               "wallet": null,
//               "vpa": "success@razorpay",
//               "email": "utkarshrkt2001@gmail.com",
//               "contact": "+917452943999",
//               "notes": [],
//               "fee": 4,
//               "tax": 0,
//               "error_code": null,
//               "error_description": null,
//               "error_source": null,
//               "error_step": null,
//               "error_reason": null,
//               "acquirer_data": {
//                   "rrn": "179208416885",
//                   "upi_transaction_id": "E84CF719E9421272A80767832B27F732"
//               },
//               "created_at": 1663484096,
//               "base_amount": 200
//           }
//       }
//   },
//   "created_at": 1663484097
// }
