import express from "express";
import { ApolloServer, ApolloError } from "apollo-server-express";
import resolvers from "./src/resolvers";
import typeDefs from "./src/schema";
import dotenv from "dotenv";
import dataSources from "./src/dataSources";
import { connectToDB } from "./src/utils";
import { GraphQLDate } from "graphql-iso-date";
import { GraphQLError } from "graphql";
import userRouter from "./src/routes/user";
import cors from "cors";
import cookieParser from "cookie-parser";

// loads environment variables from a .env file into process.env
dotenv.config();

// connect to mongodb atalas cluster
connectToDB();
const resolveFunctions = {
  Date: GraphQLDate,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context: ({ req, res }) => {
    let token = req.cookies?.token || "";
    return { token, res };
  },
  // All errors will come here to be formatted.
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

const app = express();
// enable cors
var corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, // <-- REQUIRED backend setting
};
app.use(cors(corsOptions));
app.use(cookieParser());
server.applyMiddleware({ app, cors: false });

app.use("/api/user", userRouter);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Internal serer error");
});

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
