import mongoose from "mongoose";

const paymentMethod = mongoose.Schema({
  paymentFrom: { type: String, required: true },
  creditCardNumber: { type: Number, required: true },
  cvv: { type: Number, required: true },
  yearMonth: { type: String, required: true },
  idNumber: { type: Number, required: true },
  paymentAmount: { type: Number, required: true },
  wishLishCategoryId: { type: String, required: true },
  userId: { type: String, required: true },
});

export default mongoose.model("PaymentMethod", paymentMethod);
