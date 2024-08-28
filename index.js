const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');

// Bu örnekte, REST API ile fazladan veri çekiliyor.
// Örneğin, kullanıcıların sadece name ve email bilgisine ihtiyacımız var ancak tüm kullanıcı bilgileri çekiliyor.

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


const app = express();
app.use(cors());

const server = new ApolloServer({ typeDefs, resolvers });

const startServer = async () => {
  await server.start(); 
  server.applyMiddleware({ app }); 

  app.get('/api/users', (req, res) => {
    res.json([
      { id: 1, name: "John Doe", age: 28 },
      { id: 2, name: "Jane Smith", age: 34 },
    ]);
  });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startServer().catch(err => {
  console.error('Error starting the server:', err);
});




//// Erişim Kontrolü 

//// REST API


// const express = require('express');
// const app = express();
// const port = 3000;

// const checkAuth = (req, res, next) => {
//   const token = req.headers.authorization;
//   if (token === 'valid-token') {
//     next();
//   } else {
//     res.status(403).send('Forbidden');
//   }
// };

//// Rest API ile belirli endpointlere erişimi sınırlandırabiliriz.
// app.get('/rest-users', checkAuth, (req, res) => {
//   res.json([{ id: 1, name: 'John Doe', email: 'john@example.com' }]);
// });

// app.listen(port, () => {
//   console.log(`REST API server listening at http://localhost:${port}`);
// });


//// GraphQL API

// const express = require('express');
// const { ApolloServer, gql } = require('apollo-server-express');
// const app = express();
// const port = 3001;

// const typeDefs = gql`
//   type User {
//     id: ID!
//     name: String!
//     email: String!
//   }

//   type Query {
//     users: [User]
//   }
// `;

// const resolvers = {
//   Query: {
//     users: (parent, args, context) => {
//       if (context.authToken !== 'valid-token') {
//         throw new Error('Unauthorized');
//       }
//       return [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
//     },
//   },
// };


//// GraphQL ile spesifik alanlara erişim kontrolü ekleyebilirsin.
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: ({ req }) => {
//     const authToken = req.headers.authorization || '';
//     return { authToken };
//   },
// });

// server.start().then(() => {
//   server.applyMiddleware({ app });

//   app.listen(port, () => {
//     console.log(`GraphQL server listening at http://localhost:${port}${server.graphqlPath}`);
//   });
// });







//// Versiyonlama



//// REST API

//// Her versiyon için ayrı bir endpoint oluşturabiliriz.

// const express = require('express');
// const app = express();
// const port = 3000;

// app.get('/api/v1/users', (req, res) => {
//   res.json([{ id: 1, name: 'John Doe', email: 'john@example.com' }]);
// });

// app.get('/api/v2/users', (req, res) => {
//   res.json([{ id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' }]);
// });

// app.listen(port, () => {
//   console.log(`REST API server listening at http://localhost:${port}`);
// });


//// GraphQL API

//// Versiyonlamak istediğimizde sorgunun şeklini değiştirmemiz yeterli olacaktır.
//// Örneğin aşağıdaki kod için sonradan istenen phone değişkenini eklemek gerektiğinde sorguyu düzenlememiz yeterli

// const express = require('express');
// const { ApolloServer, gql } = require('apollo-server-express');
// const app = express();
// const port = 3001;

// const typeDefs = gql`
//   type User {
//     id: ID!
//     name: String!
//     email: String!
//     phone: String
//   }

//   type Query {
//     users: [User]
//   }
// `;

// const resolvers = {
//   Query: {
//     users: () => {
//       return [
//         { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
//       ];
//     },
//   },
// };

// const server = new ApolloServer({ typeDefs, resolvers });
// server.start().then(() => {
//   server.applyMiddleware({ app });

//   app.listen(port, () => {
//     console.log(`GraphQL server listening at http://localhost:${port}${server.graphqlPath}`);
//   });
// });




//// Sorgu Karmaşıklığı

//// REST API


//// Almak istediğimiz veri için birden fazla istek atmamız gerekebilir
// const express = require('express');
// const axios = require('axios');
// const app = express();
// const port = 3000;

// app.get('/users/:id/posts', async (req, res) => {
//   const userId = req.params.id;
//   const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
//   const postsResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);

//   res.json({
//     user: userResponse.data,
//     posts: postsResponse.data,
//   });
// });

// app.listen(port, () => {
//   console.log(`REST API server listening at http://localhost:${port}`);
// });


//// GraphQL API

//// GraphQL ile sorgu karmaşıklığını çözmek daha kolaydır.

// const express = require('express');
// const { ApolloServer, gql } = require('apollo-server-express');
// const axios = require('axios');
// const app = express();
// const port = 3001;

// const typeDefs = gql`
//   type Post {
//     id: ID!
//     title: String!
//     body: String!
//   }

//   type User {
//     id: ID!
//     name: String!
//     email: String!
//     posts: [Post]
//   }

//   type Query {
//     user(id: ID!): User
//   }
// `;

// const resolvers = {
//   Query: {
//     user: async (parent, args) => {
//       const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${args.id}`);
//       const postsResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${args.id}`);

//       return {
//         ...userResponse.data,
//         posts: postsResponse.data,
//       };
//     },
//   },
// };

// const server = new ApolloServer({ typeDefs, resolvers });
// server.start().then(() => {
//   server.applyMiddleware({ app });

//   app.listen(port, () => {
//     console.log(`GraphQL server listening at http://localhost:${port}${server.graphqlPath}`);
//   });
// });


//// GraphQL ile bu sorguyu yazabilir ve tüm verileri tek bir istekle alabilirsiniz:

// query {
//     user(id: 1) {
//       name
//       email
//       posts {
//         title
//         body
//       }
//     }
//   }
  