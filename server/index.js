import { ApolloServer } from "apollo-server";
import resolvers from "./src/resolvers";
import typeDefs from "./src/schema";
import dotenv from "dotenv";
import dataSources from "./src/dataSources";
import { connectToDB } from "./src/utils";

// loads environment variables from a .env file into process.env
dotenv.config();

// connect to mongodb atalas cluster
const { DB_USERNAME, DB_PASSWORD } = process.env;
connectToDB(DB_USERNAME, DB_PASSWORD);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context: ({ req }) => {
    let token = req.headers.x_auth || "";

    return { token };
  },
});

server.listen(4001).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
