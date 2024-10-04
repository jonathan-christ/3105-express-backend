export const env = {
  JWT_SECRET: process.env.JWT_SECRET || 'CIS_3105-ExPrEssBacKeNd',
  PORT: process.env.PORT || 8080,
  RATE_LIMIT_MAX_REQ: 5,   // max requests per interval (default: 5)
  RATE_LIMIT_WINDOW_MS: 30*1000  //window duration in ms (default: 30s)
}