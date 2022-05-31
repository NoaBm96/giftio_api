import mongoose from "mongoose";
import WishList from "../models/wishList.js";
import fs from "fs";
import path from "path";

export const getWishLists = async (req, res) => {
  try {
    const wishLists = await WishList.find({ userId: req.userId });
    res.status(200).json(wishLists);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getFriendWishLists = async (req, res) => {
  const id = req.params.id;
  try {
    const wishLists = await WishList.find({ userId: id });
    res.status(200).json(wishLists);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createWishList = async (req, res) => {
  const wishList = req.body;
  console.log(wishList);
  const image = req.file.filename;
  const newWishList = new WishList({ ...wishList, image, userId: req.userId });
  try {
    await newWishList.save();
    res.status(200).json(newWishList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateWishList = async (req, res) => {
  const id = req.params.id;
  const wishList = req.body;
  let { image } = await WishList.findOne({ _id: id });
  if (req.file) {
    fs.unlinkSync(path.join("uploads/wishLists/", req.userId, image));
    image = req.file.filename;
  } else {
    image = req.body.image;
  }
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No wish list with  that id");
  const updateWishList = await WishList.findByIdAndUpdate(
    id,
    { ...wishList, image },
    {
      new: true,
    }
  );
  res.status(200).json(updateWishList);
};

export const deleteWishList = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No wish list with that id");
  const { image } = await WishList.findByIdAndRemove(id);
  fs.unlinkSync(path.join("uploads/wishLists/", req.userId, image));
  res.status(200).json({ message: "Wish List deleted successfully" });
};
