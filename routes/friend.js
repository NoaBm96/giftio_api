import express from "express";
import {
  getFriends,
  createFriend,
  deleteFriend,
} from "../controllers/friend.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getFriends);
router.post("/", auth, createFriend);
router.delete("/:id", auth, deleteFriend);

export default router;
