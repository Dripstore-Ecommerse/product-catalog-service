export const ENVIRONMENT = process.env["APP_ENV"] || "development";
export const PORT = Number(process.env["APP_PORT"]) || 3002;
export const DB_URI =
  process.env["MONGODB_URL"] || "mongodb://product-mongo-srv:27017/";

export default { ENVIRONMENT, PORT, DB_URI };
