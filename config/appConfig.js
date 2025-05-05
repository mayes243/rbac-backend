import { getEnv } from "../utils/get-env.js";

const config = () => ({
  NODE_ENV: getEnv("NODE_ENV", "development"),
  PORT: getEnv("PORT", "5000"),

  JWT_SECRET: getEnv("JWT_SECRET", "JWT_SECRET"),
  JWT_EXPIRES_IN: getEnv("JWT_EXPIRES_IN", "1d"),
  MONGODB_URI: getEnv("MONGODB_URI", ""),
});

export const appConfig = config();
