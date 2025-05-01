const app = require("./app");
const mongoose = require("mongoose");

const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const DB = process.env.DB_DRIVER_URL.replace(
  "<db_password>",
  process.env.DB_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log(`CONNECTED TO MONGODB DATABASE...`))
  .catch((err) => console.log(err.message));

const port = process.env.PORT || 8080;
app.listen(port, (req, res) => {
  console.log(`LISTENING ON PORT 3000...`);
});
