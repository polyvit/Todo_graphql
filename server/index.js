import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./typeDefs.js";
import resolvers from "./resolvers.js";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

async function startServer() {
  const app = express();
  app.use(cors());
  dotenv.config();
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });
  app.use((req, res) => {
    res.send("Server started");
  });
  try {
    await mongoose.connect(process.env.mongodb);
    console.log("Connected to mongodb");
  } catch (e) {
    console.log(e);
  }

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`);
  });
}

startServer();
// https://medium.com/@premsuryamj/how-to-setup-a-graphql-with-apollo-server-and-express-in-nodejs-d28bfc231163
