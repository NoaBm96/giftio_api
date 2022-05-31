import mongoose from "mongoose";
import Friend from "../models/friend.js";

export const getFriends = async (req, res) => {
  try {
    const friends = await Friend.find({ userId: req.userId });
    res.status(200).json(friends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createFriend = async (req, res) => {
  const friend = req.body;
  console.log(friend);
  const newFriend = new Friend({ ...friend, userId: req.userId });
  try {
    await newFriend.save();
    res.status(200).json(newFriend);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteFriend = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No friend with that id");
  await Friend.findByIdAndRemove(id);
  res.status(200).json({ message: "Friend deleted successfully" });
};
