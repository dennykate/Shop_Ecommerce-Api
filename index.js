import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import productRoutes from "./routes/products.js";
import userRoutes from "./routes/user.js";
import cartRoutes from "./routes/cart.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.send("Sever running");
});

app.use("/products", productRoutes);
app.use("/user", userRoutes);
app.use("/cart", cartRoutes);

const CONNECTION_URL = process.env.REACT_APP_CONNECTION_URL;
const PORT = process.env.REACT_APP_PORT;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Sever running at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

mongoose.set("useFindAndModify", false);
