const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

// disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Use path.join to resolve the relative directory path
    cb(null, path.join(__dirname, "../public/images/uploads"));
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, (err, name) => {
      const fn = name.toString("hex") + path.extname(file.originalname);
      cb(null, fn);
    });
  },
});

const upload = multer({ storage: storage });

// export upload variable
module.exports = upload;
