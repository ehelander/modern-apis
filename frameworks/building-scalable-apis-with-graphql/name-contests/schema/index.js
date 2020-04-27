const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} = require("graphql");

const MeType = require("./types/me");

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",

  fields: {
    me: {
      type: MeType,
      description: "The current user identified by an API key.",
      args: {
        key: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: () => {
        // Read user information from database.
        return {
          id: 42,
          email: "fake@example.com",
        };
      },
    },
  },
});

const ncSchema = new GraphQLSchema({
  query: RootQueryType,
});

module.exports = ncSchema;
