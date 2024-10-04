import express, { urlencoded, json } from "express";
import { userRouter } from "./routes/user.ts";
import { loggerMiddleware } from "./middleware/loggerMiddleware.ts";
import { rateLimiter } from "./middleware/rateLimiterMiddleware.ts";
import { env } from "./config/env.ts";

const app = express();
const rateLimiterMiddleware = rateLimiter({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  maxRequests: env.RATE_LIMIT_MAX_REQ
});

app.use(loggerMiddleware);
app.use(rateLimiterMiddleware);
app.use(urlencoded({ extended: true }));
app.use(json());

app.use("/", userRouter);

app.listen(env.PORT, () => {
  console.log(`Server is listening at port: ${env.PORT}`);
})