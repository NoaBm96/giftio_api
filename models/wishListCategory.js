import mongoose from "mongoose";

const wishListCategorySchema = mongoose.Schema({
  wishListId: { type: String, required: true },
  image: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  paidAmount: { type: Number, default: 0 },
  userId: { type: String, required: true },
});

export default mongoose.model("WishListCategory", wishListCategorySchema);
