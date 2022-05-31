import mongoose from "mongoose";
import WishListCategory from "../models/wishListCategory.js";
import fs from "fs";
import path from "path";

export const getWishListCategories = async (req, res) => {
  try {
    const wishListCategories = await WishListCategory.find({
      userId: req.userId,
    });
    res.status(200).json(wishListCategories);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getFriendWishListCategories = async (req, res) => {
  const id = req.params.id;
  try {
    const wishListCategories = await WishListCategory.find({ userId: id });
    res.status(200).json(wishListCategories);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createWishListCategory = async (req, res) => {
  const wishListCategory = req.body;
  console.log(wishListCategory);
  const image = req.file.filename;
  const newWishListCategory = new WishListCategory({
    ...wishListCategory,
    image,
    userId: req.userId,
  });
  try {
    await newWishListCategory.save();
    res.status(200).json(newWishListCategory);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateWishListCategory = async (req, res) => {
  const id = req.params.id;
  const wishListCategory = req.body;
  let { image } = await WishListCategory.findOne({ _id: id });
  if (req.file) {
    fs.unlinkSync(path.join("uploads/wishListCategories/", req.userId, image));
    image = req.file.filename;
  } else {
    image = req.body.image;
  }
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No wish list category with  that id");
  const updateWishListCategory = await WishListCategory.findByIdAndUpdate(
    id,
    { ...wishListCategory, image },
    {
      new: true,
    }
  );
  res.status(200).json(updateWishListCategory);
};

export const deleteWishListCategory = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No wish list category with that id");
  const { image } = await WishListCategory.findByIdAndRemove(id);
  fs.unlinkSync(path.join("uploads/wishListCategories/", req.userId, image));
  res.status(200).json({ message: "Wish List Category deleted successfully" });
};
