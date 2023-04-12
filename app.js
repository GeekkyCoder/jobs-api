require("dotenv").config();
require("express-async-errors");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors")
const rateLimiter = require("express-rate-limit")

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const authRouter = require("./routes/auth");
const jobRouter = require("./routes/jobs");
const connectDB = require("./db/connect");
const authMiddleware = require("./middleware/authentication");

const app = express();

// middleware
const limiter = rateLimiter({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use(limiter)
app.use(express.json());
app.use(helmet())
app.use(cors())

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
