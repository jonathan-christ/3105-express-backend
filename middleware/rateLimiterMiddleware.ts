import { Request, Response, NextFunction } from "express"

export const rateLimiter = (options: { windowMs: number; maxRequests: number }) => {
  const requests: Record<string, { count: number; startTime: number }> = {};

  const hasWindowExpired = (startTime: number, endTime: number): boolean => {
    return endTime - startTime >= options.windowMs;
  }

  return (req: Request, res: Response, next: NextFunction): void => {
    const clientIp = req.ip;
    const currTime = Date.now();

    if (!clientIp) { //req.ip may be undefined
      res.status(400).json({ message: "Client IP undefined!" });
      return;
    }

    // get count and startTime if record exists, create new record if not
    let { count, startTime } = requests[clientIp] || { count: 0, startTime: currTime };

    if (hasWindowExpired(startTime, currTime)) {
      count = 1;
      startTime = currTime;
    } else {
      count++;
    }

    // update record
    requests[clientIp] = { count, startTime };
    if (count > options.maxRequests) {
      res.status(429).json({ message: "Too many requests, please try again later." });
      return;
    }

    next();
  }
}