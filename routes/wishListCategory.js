import express from "express";
import multer from "multer";
import fs from "fs";
import {
  getWishListCategories,
  createWishListCategory,
  updateWishListCategory,
  deleteWishListCategory,
  getFriendWishListCategories,
} from "../controllers/wishListCategory.js";
import auth from "../middleware/auth.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderName = req.userId;
    if (!fs.existsSync("./uploads/wishListCategories/" + folderName)) {
      fs.mkdirSync("./uploads/wishListCategories/" + folderName, {
        recursive: true,
      });
    }
    cb(null, "uploads/wishListCategories/" + folderName);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      req.body.name.toLowerCase().split(" ").join("-") + "-" + Date.now()
    );
  },
});

const upload = multer({ storage: storage });

router.get("/", auth, getWishListCategories);
router.get("/:id", auth, getFriendWishListCategories);
router.post("/", auth, upload.single("image"), createWishListCategory);
router.patch("/:id", auth, upload.single("image"), updateWishListCategory);
router.delete("/:id", auth, deleteWishListCategory);

export default router;
