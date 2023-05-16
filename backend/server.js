const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const colors = require("colors");
const db = require("./src/db/index");

const corsOptions = {
  //reactjs
  origin: "http://localhost:9999",
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());



//root route
app.post("/", (req, res) => {
  res.status(200).json({
    message: "Web service !",
  });
});

const routes=require('./src/routes/index.routes')(app);

const PORT = process.env.PORT;
app.listen(PORT, (err) => {
  if (!err) {
    console.log(`🚀 Server ready at http://localhost:${PORT} `.bgGreen);
  } else {
    console.log(`⛔server is down : ${err}`.bgRed);
  }
});
