// const multer = require("multer");

// const MIME_TYPE = {
//   "image/png": "png",
//   "image/jpeg": "jpg",
//   "image/jpg": "jpg",
// };

// exports.storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const isValid = MIME_TYPE[file.mimetype];
//     let error = new Error("Mime Type is invalid");
//     if (isValid) {
//       error = null;
//     }
//     cb(error, "../public/assets/uploaded");
//   },
//   filename: (req, file, cb) => {
//     const name=file.originalname.split(".")[0];
//     const extension = MIME_TYPE[file.mimetype];
//     cb(null,name+ Date.now()+ "." + extension);
//   },
// });

const multer = require("multer");

const MIME_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

exports.storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error("Mime Type is invalid");
    if (isValid) {
      error = null;
    }
    cb(error, "../ReactJs/public/assets/uploaded");
  },
  filename: (req, file, cb) => {
    const name=file.originalname.split(".")[0];
    const extension = MIME_TYPE[file.mimetype];
    cb(null,name+"."+extension);
  },
});