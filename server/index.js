import { ApolloServer } from "apollo-server";
import resolvers from "./src/resolvers";
import typeDefs from "./src/schema";

const server = new ApolloServer({
  typeDefs,
});

server.listen(4000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
