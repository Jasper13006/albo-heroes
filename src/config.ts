import { config } from "dotenv";

config();

export default {
  PORT: process.env.PORT || 3000,
  MARVEL_API: process.env.MARVEL_API || "http://gateway.marvel.com/v1/public",
  PRIVATE_KEY: process.env.PRIVATE_KEY ,
  PUBLIC_KEY: process.env.PUBLIC_KEY,
  FIREBASE_CREDENTIALS: process.env.FIREBASE_CREDENTIALS
};
