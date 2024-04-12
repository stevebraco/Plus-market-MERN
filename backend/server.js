import express from "express";
import mongoose from "mongoose";
import data from "./data.js";
import path from "path";
import dotenv from "dotenv";

import blogRouter from "./routers/blogRouter.js";
import productRouter from "./routers/productRouter.js";
import uploadRouter from "./routers/uploadRouter.js";
import userRouter from "./routers/userRouter.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  process.env.MONGO_DB,
  {
    dbName: "plusmarket",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDb Connected");
    } else {
      console.log("Error Connection");
    }
  }
);
app.use("/api/uploads", uploadRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.static(path.join(__dirname, "frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
);

// app.get("/", (req, res) => {
//   res.send("Server Ready");
// });

// app.get("/", (req, res) => {
//   res.send("Server is ready");
// });

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server at port ${port}`);
});
