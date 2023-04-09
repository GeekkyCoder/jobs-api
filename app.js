require("dotenv").config();
require("express-async-errors");
const express = require("express");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const authRouter = require("./routes/auth");
const jobRouter = require("./routes/jobs");
const connectDB = require("./db/connect");
const authMiddleware = require("./middleware/authentication");

const app = express();

app.use(express.json());
// extra packages

app.use((req,res,next) => {
  next()
  console.log(`method:${req.method}${req.url}`)
})

// routes
app.use("/api/v1/auth", authRouter);

app.use(authMiddleware)

app.use("/api/v1/jobs", jobRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
