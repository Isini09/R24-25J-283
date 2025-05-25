const express = require("express");
const router = express.Router();
const {
  upload,
  uploadImage,
  getDates,
  yieldPredict,
} = require("../controller/yieldController");

router.post("/upload", upload.single("image"), uploadImage);
router.post("/get-dates", getDates);
router.post("/yield-predict", yieldPredict);

module.exports = router;
