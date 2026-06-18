const express = require("express");
const cors = require("cors");
const route_handler = require("./routes/routes_handle_req.js");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/openPage", route_handler);

app.listen(3000, () => {
  console.log("Listening at 3000");
});