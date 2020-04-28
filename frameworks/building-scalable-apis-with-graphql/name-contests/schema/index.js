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

const AddContestMutation = require('./mutations/add-contest');
const AddNameMutation = require('./mutations/add-name');

const RootMutationType = new GraphQLObjectType({
  name: 'RootMutationType',

  fields: () => ({
    AddContest: AddContestMutation,
    AddName: AddNameMutation,
  }),
});

const ncSchema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

module.exports = ncSchema;
