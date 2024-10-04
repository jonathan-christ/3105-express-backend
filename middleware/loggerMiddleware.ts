import { Request, Response, NextFunction } from "express";

// format to human readable date
const formatDate = (date: Date) => {
  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const startTime = Date.now();
  const { method, url } = req;

  //log process start
  console.log(`[${formatDate(new Date())}] [REQ] "${method} ${url}"`);

  // log process finish time
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const { statusCode } = res;
    const logStatus = (statusCode >= 200 && statusCode < 300) ? "[GOOD]" : "[ERROR]";

    console.log(`[${formatDate(new Date())}] [RES] ${logStatus} "${method} ${url} ${statusCode}" [${duration}ms]`);
  });

  next();
}