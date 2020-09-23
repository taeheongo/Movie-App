import { ApolloServer, ApolloError } from "apollo-server";
import resolvers from "./src/resolvers";
import typeDefs from "./src/schema";
import dotenv from "dotenv";
import dataSources from "./src/dataSources";
import { connectToDB, getMovieNames } from "./src/utils";
import { GraphQLDate } from "graphql-iso-date";
import { GraphQLError } from "graphql";

// loads environment variables from a .env file into process.env
dotenv.config();

// connect to mongodb atalas cluster
const { DB_USERNAME, DB_PASSWORD } = process.env;
connectToDB(DB_USERNAME, DB_PASSWORD);

const resolveFunctions = {
  Date: GraphQLDate,
};

// get the latest movies
let movieNames = [];
getMovieNames().then((response) => (movieNames = response));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context: ({ req }) => {
    let token = req.headers.auth || "";

    return { token, movieNames };
  },
  formatError: (error) => {
    console.error(error);
    let exception = error?.extensions?.exception;

    if (exception) {
      exception["stacktrace"] = null;
    }

    // Don't give the specific errors to the client.
    if (
      !(
        error.originalError instanceof ApolloError ||
        error instanceof GraphQLError
      )
    ) {
      return new Error("Internal server error");
    }
    // Otherwise return the original error.  The error can also
    // be manipulated in other ways, so long as it's returned.
    return error;
  },
  resolveFunctions,
});

server.listen(4001).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
