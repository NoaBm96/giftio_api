import mongoose from "mongoose";

const wishListSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  userId: { type: String, required: true },
});

export default mongoose.model("WishList", wishListSchema);
