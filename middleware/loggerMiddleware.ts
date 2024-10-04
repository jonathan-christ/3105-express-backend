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
  const start = Date.now();
  const { method, url } = req;

  console.log(`[${formatDate(new Date())}] [REQ] "${method} ${url}"`);

  res.on('finish', () => {
    const duration = Date.now() - start; // Calculate response time
    console.log(`[${formatDate(new Date())}] [RES] "${method} ${url} ${res.statusCode}" [${duration}ms]`);
  });

  next();
}