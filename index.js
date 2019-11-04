const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');

const resolvers = {
  Query: {
    info: () => `This is a practice API using graphql-yoga and Prisma!`,
    users: (root, args, context, info) => {
      return context.prisma.users();
    },
    messages: (root, args, context, info) => {
      return context.prisma.messages();
    },
  },
  Mutation: {
    addUser: (root, args, context) => {
      return context.prisma.createUser({
        name: args.name,
      });
    },
    addMessage: (root, args, context) => {
      return context.prisma.createMessage({
        message: args.message,
        from: args.from,
      });
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: { prisma },
});

const options = {
  port: process.env.PORT || 4000,
};

server.start(options, ({ port }) =>
  console.log(
    `\n** Server started, listening on port ${port} for incoming requests **\n`,
  ),
);
