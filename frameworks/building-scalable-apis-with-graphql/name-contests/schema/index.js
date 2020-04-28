const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} = require('graphql');

const MeType = require('./types/user');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',

  fields: {
    me: {
      type: MeType,
      description: 'The current user identified by an API key.',
      args: {
        key: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (obj, args, { loaders }) => {
        return loaders.usersByApiKeys.load(args.key);
      },
    },
  },
});

const ncSchema = new GraphQLSchema({
  query: RootQueryType,
});

module.exports = ncSchema;
