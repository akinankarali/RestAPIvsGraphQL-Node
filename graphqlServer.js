const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    age: Int!
  }

  type Query {
    users: [User]
  }
`;

const resolvers = {
  Query: {
    users: () => [
      { id: 1, name: "John Doe", age: 28 },
      { id: 2, name: "Jane Smith", age: 34 },
    ],
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`GraphQL API running at ${url}`);
});
