const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
  });
});

app.listen(3000, (req, res) => {
  console.log(`LISTENING ON PORT 3000...`);
});
