import mongoose from "mongoose";
import PaymentMethod from "../models/paymentMethod.js";
import WishListCategory from "../models/wishListCategory.js";

export const getPaymentMethods = async (req, res) => {
  try {
    const paymentMethods = await PaymentMethod.find({ userId: req.userId });
    res.status(200).json(paymentMethods);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPaymentMethod = async (req, res) => {
  const paymentMethod = req.body;
  console.log(paymentMethod);
  const newPaymentMethod = new PaymentMethod({
    ...paymentMethod,
    userId: req.userId,
  });
  try {
    await newPaymentMethod.save();
    await WishListCategory.findByIdAndUpdate(
      mongoose.Types.ObjectId(req.body.wishLishCategoryId),
      { $inc: { paidAmount: paymentMethod.paymentAmount } },
      {
        new: true,
      }
    );
    res.status(200).json(newPaymentMethod);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
