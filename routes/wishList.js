import express from "express";
import multer from "multer";
import fs from "fs";
import {
  getWishLists,
  createWishList,
  updateWishList,
  deleteWishList,
  getFriendWishLists,
} from "../controllers/wishList.js";
import auth from "../middleware/auth.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderName = req.userId;
    if (!fs.existsSync("./uploads/wishLists/" + folderName)) {
      fs.mkdirSync("./uploads/wishLists/" + folderName, { recursive: true });
    }
    cb(null, "uploads/wishLists/" + folderName);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      req.body.name.toLowerCase().split(" ").join("-") + "-" + Date.now()
    );
  },
});

const upload = multer({ storage: storage });

router.get("/", auth, getWishLists);
router.get("/:id", auth, getFriendWishLists);
router.post("/", auth, upload.single("image"), createWishList);
router.patch("/:id", auth, upload.single("image"), updateWishList);
router.delete("/:id", auth, deleteWishList);

export default router;
