import { config } from "dotenv";

config();

export default {
  MONGO_DATABASE: process.env.MONGO_DATABASE || 'albo-heroes',
  MONGO_USER: process.env.MONGO_USER || "admin",
  MONGO_PASSWORD: process.env.MONGO_PASSWORD || "admin",
  MONGO_HOST: process.env.MONGO_HOST || 'localhost',
  PORT: process.env.PORT || 3000,
  MARVEL_API: process.env.MARVEL_API || "http://gateway.marvel.com/v1/public",
  PRIVATE_KEY: process.env.PRIVATE_KEY ,
  PUBLIC_KEY: process.env.PUBLIC_KEY
};
